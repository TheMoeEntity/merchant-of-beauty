'use server'

import { z } from 'zod'
import { createOrder } from '@/services/order.service'
import { redirect } from 'next/navigation'
import { checkRateLimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

const CheckoutSchema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  customerEmail: z.string().email('Valid email is required'),
  customerPhone: z.string().optional(),
  customerAddress: z.string().optional(),
  notes: z.string().optional(),
  items: z.string(),
})

export async function checkoutAction(
  prevState: { error: string | null },
  formData: FormData
) {
  // ----------------------------------------------------------------
  // Rate limiting — 3 orders per hour per IP address.
  // This is the first thing we check, before ANY business logic,
  // so we're not doing expensive DB work for requests we'll reject.
  // ----------------------------------------------------------------
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headersList.get('x-real-ip') ??
    'anonymous'

  const { allowed, resetMs } = await checkRateLimit({
    key: `checkout:${ip}`,
    limit: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  })

  if (!allowed) {
    const minutesLeft = Math.ceil(resetMs / 60000)
    return {
      error: `Too many orders from your connection. Please try again in ${minutesLeft} minute${minutesLeft === 1 ? '' : 's'}.`,
    }
  }

  const raw = {
    customerName: formData.get('customerName'),
    customerEmail: formData.get('customerEmail'),
    customerPhone: formData.get('customerPhone'),
    customerAddress: formData.get('customerAddress'),
    notes: formData.get('notes'),
    items: formData.get('items'),
  }

  const parsed = CheckoutSchema.safeParse(raw)

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const items = JSON.parse(parsed.data.items)

  if (!items.length) {
    return { error: 'Your cart is empty' }
  }

  const orderId = await createOrder({
    customerName: parsed.data.customerName,
    customerEmail: parsed.data.customerEmail,
    customerPhone: parsed.data.customerPhone,
    customerAddress: parsed.data.customerAddress,
    notes: parsed.data.notes,
    items,
  })

  redirect(
    `/order-confirmed?orderId=${orderId}&customerName=${encodeURIComponent(parsed.data.customerName)}`
  )
}
