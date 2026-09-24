import { db } from '@/lib/db'
import { reviews } from '@/lib/db/schema'
import {
  CreateReviewInput,
  ProductRatingSummary,
  Review,
  ReviewStatus,
} from '@/types/review.types'
import { generateReviewId } from '@/lib/utils'
import { and, avg, count, desc, eq } from 'drizzle-orm'

export async function createReview(input: CreateReviewInput): Promise<string> {
  const id = generateReviewId()

  await db.insert(reviews).values({
    id,
    productId: input.productId,
    productSlug: input.productSlug,
    productTitle: input.productTitle,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    rating: input.rating,
    comment: input.comment ?? null,
    status: 'pending',
  })

  return id
}

export async function getApprovedReviewsForProduct(
  productId: string
): Promise<Review[]> {
  const rows = await db.query.reviews.findMany({
    where: and(eq(reviews.productId, productId), eq(reviews.status, 'approved')),
    orderBy: [desc(reviews.createdAt)],
  })
  return rows as Review[]
}

export async function getRatingSummaryForProduct(
  productId: string
): Promise<ProductRatingSummary> {
  const [row] = await db
    .select({ average: avg(reviews.rating), count: count(reviews.rating) })
    .from(reviews)
    .where(and(eq(reviews.productId, productId), eq(reviews.status, 'approved')))

  return {
    average: row?.average ? Number(row.average) : 0,
    count: row?.count ?? 0,
  }
}

export async function getReviews(status?: ReviewStatus): Promise<Review[]> {
  const rows = await db.query.reviews.findMany({
    where: status ? eq(reviews.status, status) : undefined,
    orderBy: [desc(reviews.createdAt)],
  })
  return rows as Review[]
}

export async function updateReviewStatus(
  id: string,
  status: ReviewStatus
): Promise<void> {
  await db.update(reviews).set({ status }).where(eq(reviews.id, id))
}
