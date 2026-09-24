'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { createReview } from '@/services/review.service'
import { checkRateLimit } from '@/lib/rate-limit'

const ReviewSchema = z.object({
  productId: z.string().min(1),
  productSlug: z.string().min(1),
  productTitle: z.string().min(1),
  customerName: z.string().min(2, 'Name is required'),
  customerEmail: z.string().email('Valid email is required'),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().max(2000).optional(),
})

interface ReviewFormState {
  error: string | null
  success: boolean
}

export async function submitReviewAction(
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headersList.get('x-real-ip') ??
    'anonymous'

  const { allowed, resetMs } = await checkRateLimit({
    key: `review:${ip}`,
    limit: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  })

  if (!allowed) {
    const minutesLeft = Math.ceil(resetMs / 60000)
    return {
      error: `Too many reviews submitted from your connection. Please try again in ${minutesLeft} minute${minutesLeft === 1 ? '' : 's'}.`,
      success: false,
    }
  }

  const parsed = ReviewSchema.safeParse({
    productId: formData.get('productId'),
    productSlug: formData.get('productSlug'),
    productTitle: formData.get('productTitle'),
    customerName: formData.get('customerName'),
    customerEmail: formData.get('customerEmail'),
    rating: formData.get('rating'),
    comment: formData.get('comment') || undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message, success: false }
  }

  await createReview(parsed.data)

  revalidatePath(`/products/${parsed.data.productSlug}`)

  return { error: null, success: true }
}
