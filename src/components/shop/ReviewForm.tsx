'use client'

import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { submitReviewAction } from '@/actions/review.actions'

interface Props {
  productId: string
  productSlug: string
  productTitle: string
}

const initialState = { error: null, success: false }

export function ReviewForm({ productId, productSlug, productTitle }: Props) {
  const [state, formAction, pending] = useActionState(
    submitReviewAction,
    initialState
  )
  const [rating, setRating] = useState(5)
  const [hovered, setHovered] = useState(0)

  useEffect(() => {
    if (state.success) toast.success('Thanks! Your review will appear once approved.')
    if (state.error) toast.error(state.error)
  }, [state])

  if (state.success) {
    return (
      <p className="text-sm text-[var(--color-muted)]">
        Thanks for your feedback — it will show up here once an admin approves
        it.
      </p>
    )
  }

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="productSlug" value={productSlug} />
      <input type="hidden" name="productTitle" value={productTitle} />
      <input type="hidden" name="rating" value={rating} />

      <div>
        <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">
          Your Rating
        </label>
        <div
          className="flex gap-1"
          onMouseLeave={() => setHovered(0)}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onMouseEnter={() => setHovered(value)}
              onClick={() => setRating(value)}
              className="p-0.5"
              aria-label={`${value} star${value === 1 ? '' : 's'}`}
            >
              <svg
                width={22}
                height={22}
                viewBox="0 0 20 20"
                fill={value <= (hovered || rating) ? 'var(--color-gold)' : 'none'}
                stroke="var(--color-gold)"
                strokeWidth={1}
              >
                <path d="M10 1.5l2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6-4.5-4.1 6-.7z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
          Name
        </label>
        <input
          name="customerName"
          type="text"
          required
          className="w-full border border-[var(--color-ink)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
          Email
        </label>
        <input
          name="customerEmail"
          type="email"
          required
          className="w-full border border-[var(--color-ink)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
          Review (optional)
        </label>
        <textarea
          name="comment"
          rows={4}
          maxLength={2000}
          className="w-full border border-[var(--color-ink)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-[var(--color-ink)] text-[var(--color-surface)] px-6 py-2.5 text-sm font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors disabled:opacity-50"
      >
        {pending ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}
