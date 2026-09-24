'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { updateOrderStatus } from '@/services/order.service'
import { generateInvoice } from '@/services/invoice.service'
import { updateReviewStatus } from '@/services/review.service'
import { auth } from '@/lib/auth'

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

const ReviewModerationSchema = z.object({
  reviewId: z.string().min(1),
  productSlug: z.string().min(1),
  status: z.enum(['approved', 'rejected']),
})

export async function moderateReviewAction(
  _prevState: { error: string | null; success: boolean },
  formData: FormData
) {
  // Server actions are called directly from client components and
  // aren't covered by the /dashboard layout's route-level auth
  // redirect, so a moderation action that mutates data checks the
  // session itself rather than trusting the caller.
  const session = await auth()
  if (!session?.user) {
    return { error: 'Unauthorized', success: false }
  }

  const parsed = ReviewModerationSchema.safeParse({
    reviewId: formData.get('reviewId'),
    productSlug: formData.get('productSlug'),
    status: formData.get('status'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message, success: false }
  }

  await updateReviewStatus(parsed.data.reviewId, parsed.data.status)

  revalidatePath('/dashboard/reviews')
  revalidatePath(`/products/${parsed.data.productSlug}`)

  return { error: null, success: true }
}
