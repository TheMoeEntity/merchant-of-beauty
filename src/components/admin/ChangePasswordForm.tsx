'use client'

import { useActionState, useEffect } from 'react'
import { changePasswordAction } from '@/actions/staff.actions'
import { toast } from 'sonner'

const initialState = { error: null, success: false }

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(
    changePasswordAction,
    initialState
  )

  useEffect(() => {
    if (state.success) toast.success('Password updated successfully')
    if (state.error) toast.error(state.error)
  }, [state])

  return (
    <form action={formAction} className="space-y-3">
      {state.error && (
        <div className="p-3 bg-[var(--color-status-cancelled-bg)] text-[var(--color-status-cancelled)] text-sm">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="p-3 bg-[var(--color-success-light)] text-[var(--color-success)] text-sm">
          Password updated successfully.
        </div>
      )}

      <div>
        <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
          Current Password
        </label>
        <input
          name="currentPassword"
          type="password"
          required
          className="w-full border border-[var(--color-ink)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
          New Password
        </label>
        <input
          name="newPassword"
          type="password"
          required
          className="w-full border border-[var(--color-ink)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[var(--color-ink)] text-[var(--color-surface)] py-2.5 text-sm font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors disabled:opacity-50"
      >
        {pending ? 'Updating...' : 'Update Password'}
      </button>
    </form>
  )
}
