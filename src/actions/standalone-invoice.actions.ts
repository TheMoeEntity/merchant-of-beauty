'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  createStandaloneInvoice,
  markStandaloneInvoiceAsSent,
} from '@/services/standalone-invoice.service'
import { standardizeWhatsappNumber } from '@/lib/utils'

const ItemSchema = z.object({
  productId: z.string(),
  productTitle: z.string(),
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),
})

const CreateInvoiceSchema = z.object({
  customerName: z.string().min(2, 'Customer name is required'),
  customerEmail: z.string().email().optional().or(z.literal('')),
  customerPhone: z.string().optional(),
  customerAddress: z.string().optional(),
  notes: z.string().optional(),
  items: z.string(), // JSON stringified array of ItemSchema
})

export async function createStandaloneInvoiceAction(
  prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const parsed = CreateInvoiceSchema.safeParse({
    customerName: formData.get('customerName'),
    customerEmail: formData.get('customerEmail'),
    customerPhone: formData.get('customerPhone'),
    customerAddress: formData.get('customerAddress'),
    number: formData.get('number'),
    notes: formData.get('notes'),
    items: formData.get('items'),
  })
  const customerPhone = parsed.data?.customerPhone || ''

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  let items
  try {
    items = z.array(ItemSchema).parse(JSON.parse(parsed.data.items))
  } catch {
    return { error: 'Invalid items data' }
  }

  if (!items.length) {
    return { error: 'Add at least one item to the invoice' }
  }

  const id = await createStandaloneInvoice({
    customerName: parsed.data.customerName,
    customerEmail: parsed.data.customerEmail || undefined,
    customerPhone: parsed.data.customerPhone || undefined,
    customerAddress: parsed.data.customerAddress || undefined,
    notes: parsed.data.notes || undefined,
    items,
  })

  revalidatePath('/dashboard/invoices')
  redirect(`/dashboard/invoices/${id}?number=${customerPhone}`)
}

export async function markAsSentAction(formData: FormData) {
  const id = formData.get('id') as string
  await markStandaloneInvoiceAsSent(id)
  revalidatePath(`/dashboard/invoices/${id}`)
  revalidatePath('/dashboard/invoices')
}
