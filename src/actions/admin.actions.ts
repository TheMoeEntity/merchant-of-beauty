'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { updateOrderStatus } from '@/services/order.service'
import { generateInvoice } from '@/services/invoice.service'

const StatusSchema = z.enum([
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
])

export async function updateOrderStatusAction(
  _prevState: { error: string | null; success: boolean },
  formData: FormData
) {
  const orderId = formData.get('orderId') as string
  const status = StatusSchema.parse(formData.get('status'))

  await updateOrderStatus(orderId, status)

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/orders')
  revalidatePath(`/dashboard/orders/${orderId}`)

  return { error: null, success: true }
}

export async function generateInvoiceAction(
  _prevState: { error: string | null; success: boolean },
  formData: FormData
) {
  const orderId = formData.get('orderId') as string

  await generateInvoice(orderId)
  revalidatePath(`/dashboard/orders/${orderId}`)

  return { error: null, success: true }
}
