export type ReviewStatus = 'pending' | 'approved' | 'rejected'

export interface CreateReviewInput {
  productId: string
  productSlug: string
  productTitle: string
  customerName: string
  customerEmail: string
  rating: number
  comment?: string
}

export interface Review {
  id: string
  productId: string
  productSlug: string
  productTitle: string
  customerName: string
  customerEmail: string
  rating: number
  comment: string | null
  status: ReviewStatus
  createdAt: Date
}

export interface ProductRatingSummary {
  average: number
  count: number
}
