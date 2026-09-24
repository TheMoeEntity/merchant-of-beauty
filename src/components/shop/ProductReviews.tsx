import { StarRating } from '@/components/shop/StarRating'
import { ReviewForm } from '@/components/shop/ReviewForm'
import { ProductRatingSummary, Review } from '@/types/review.types'

interface Props {
  productId: string
  productSlug: string
  productTitle: string
  reviews: Review[]
  summary: ProductRatingSummary
}

export function ProductReviews({
  productId,
  productSlug,
  productTitle,
  reviews,
  summary,
}: Props) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 border-t border-[var(--color-ink)]/10">
      <div className="flex items-center gap-3 mb-10">
        <h2 className="font-display text-2xl text-[var(--color-ink)]">
          Reviews
        </h2>
        {summary.count > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={summary.average} size={16} />
            <span className="text-sm text-[var(--color-muted)]">
              {summary.average.toFixed(1)} ({summary.count} review
              {summary.count === 1 ? '' : 's'})
            </span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          {reviews.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)]">
              No reviews yet — be the first to share your experience.
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review.id}>
                <div className="flex items-center gap-3 mb-1">
                  <StarRating rating={review.rating} />
                  <span className="text-sm font-medium text-[var(--color-ink)]">
                    {review.customerName}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-muted)] mb-2">
                  {new Date(review.createdAt).toLocaleDateString('en-NG', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {review.comment && (
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    {review.comment}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-ink)] mb-4">
            Write a Review
          </h3>
          <ReviewForm
            productId={productId}
            productSlug={productSlug}
            productTitle={productTitle}
          />
        </div>
      </div>
    </div>
  )
}
