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

export async function updateOrderStatusAction(formData: FormData) {
  const orderId = formData.get('orderId') as string
  const status = StatusSchema.parse(formData.get('status'))

  await updateOrderStatus(orderId, status)

  // Revalidate every page that shows this order's status so the
  // dashboard overview, orders list, and this detail page all stay
  // in sync without the admin needing to manually refresh.
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/orders')
  revalidatePath(`/dashboard/orders/${orderId}`)
}

export async function generateInvoiceAction(formData: FormData) {
  const orderId = formData.get('orderId') as string

  await generateInvoice(orderId)
  revalidatePath(`/dashboard/orders/${orderId}`)
}
