import Link from 'next/link'
import { getReviews } from '@/services/review.service'
import { ReviewStatusPill } from '@/components/admin/ReviewStatusPill'
import { ReviewModerationActions } from '@/components/admin/ReviewModerationActions'
import { StarRating } from '@/components/shop/StarRating'
import { ReviewStatus } from '@/types/review.types'

interface Props {
  searchParams: Promise<{ status?: string }>
}

const FILTERS: { label: string; value: ReviewStatus | 'all' }[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'All', value: 'all' },
]

export default async function ReviewsPage({ searchParams }: Props) {
  const { status } = await searchParams
  const activeFilter = (status as ReviewStatus | 'all') ?? 'pending'
  const reviews = await getReviews(
    activeFilter === 'all' ? undefined : activeFilter
  )

  return (
    <div>
      <h1 className="font-display text-3xl text-[var(--color-ink)] mb-1">
        Reviews
      </h1>
      <p className="text-sm text-[var(--color-muted)] mb-6">
        {reviews.length} {activeFilter === 'all' ? 'total' : activeFilter}{' '}
        review{reviews.length === 1 ? '' : 's'}
      </p>

      <div className="flex gap-2 flex-wrap mb-6">
        {FILTERS.map((filter) => {
          const active = activeFilter === filter.value
          return (
            <Link
              key={filter.value}
              href={
                filter.value === 'all'
                  ? '/dashboard/reviews?status=all'
                  : `/dashboard/reviews?status=${filter.value}`
              }
              className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors ${
                active
                  ? 'bg-[var(--color-ink)] text-[var(--color-surface)] border-[var(--color-ink)]'
                  : 'border-[var(--color-ink)]/20 text-[var(--color-muted)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]'
              }`}
            >
              {filter.label}
            </Link>
          )
        })}
      </div>

      {reviews.length === 0 ? (
        <p className="text-sm text-[var(--color-muted)]">No reviews found.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[var(--color-card)] p-5"
              style={{ boxShadow: 'var(--shadow-soft)' }}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">
                    {review.productTitle}
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {review.customerName} · {review.customerEmail}
                  </p>
                </div>
                <ReviewStatusPill status={review.status} />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={review.rating} />
                <span className="text-xs text-[var(--color-muted)]">
                  {new Date(review.createdAt).toLocaleDateString('en-NG')}
                </span>
              </div>

              {review.comment && (
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
                  {review.comment}
                </p>
              )}

              {review.status === 'pending' && (
                <ReviewModerationActions
                  reviewId={review.id}
                  productSlug={review.productSlug}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
