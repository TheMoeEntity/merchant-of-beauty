'use server'

import { z } from 'zod'
import { createOrder } from '@/services/order.service'
import { redirect } from 'next/navigation'

const CheckoutSchema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  customerEmail: z.string().email('Valid email is required'),
  customerPhone: z.string().optional(),
  customerAddress: z.string().optional(),
  notes: z.string().optional(),
  items: z.string(), // JSON stringified cart items
})

export async function checkoutAction(
  prevState: { error: string | null },
  formData: FormData
) {
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
