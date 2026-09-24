'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { moderateReviewAction } from '@/actions/admin.actions'

interface Props {
  reviewId: string
  productSlug: string
}

const initialState = { error: null, success: false }

export function ReviewModerationActions({ reviewId, productSlug }: Props) {
  const [state, formAction, pending] = useActionState(
    moderateReviewAction,
    initialState
  )

  useEffect(() => {
    if (state.error) toast.error(state.error)
  }, [state])

  return (
    <div className="flex gap-2">
      <form action={formAction}>
        <input type="hidden" name="reviewId" value={reviewId} />
        <input type="hidden" name="productSlug" value={productSlug} />
        <input type="hidden" name="status" value="approved" />
        <button
          type="submit"
          disabled={pending}
          className="px-3 py-1.5 text-xs uppercase tracking-wider bg-[var(--color-ink)] text-[var(--color-surface)] hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors disabled:opacity-50"
        >
          Approve
        </button>
      </form>
      <form action={formAction}>
        <input type="hidden" name="reviewId" value={reviewId} />
        <input type="hidden" name="productSlug" value={productSlug} />
        <input type="hidden" name="status" value="rejected" />
        <button
          type="submit"
          disabled={pending}
          className="px-3 py-1.5 text-xs uppercase tracking-wider border border-[var(--color-ink)]/20 text-[var(--color-muted)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition-colors disabled:opacity-50"
        >
          Reject
        </button>
      </form>
    </div>
  )
}
