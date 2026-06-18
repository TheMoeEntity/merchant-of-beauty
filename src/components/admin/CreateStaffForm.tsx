'use client'

import { useActionState } from 'react'
import { createStaffAction } from '@/actions/staff.actions'

const initialState = { error: null }

export function CreateStaffForm() {
  const [state, formAction, pending] = useActionState(
    createStaffAction,
    initialState
  )

  return (
    <form action={formAction} className="space-y-3">
      {state.error && (
        <div className="p-3 bg-[var(--color-status-cancelled-bg)] text-[var(--color-status-cancelled)] text-sm">
          {state.error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-3">
        <input
          name="name"
          placeholder="Full Name"
          required
          className="border border-[var(--color-ink)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          required
          className="border border-[var(--color-ink)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
        <input
          name="password"
          type="password"
          placeholder="Temporary Password"
          required
          className="border border-[var(--color-ink)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-[var(--color-ink)] text-[var(--color-surface)] px-6 py-2.5 text-sm font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors disabled:opacity-50"
      >
        {pending ? 'Adding...' : 'Add Staff Member'}
      </button>
    </form>
  )
}
