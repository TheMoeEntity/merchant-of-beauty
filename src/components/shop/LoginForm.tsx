'use client'

import { useActionState } from 'react'
import { loginAction } from '@/actions/auth.actions'

const initialState = { error: null }
const LoginForm = () => {
  const [state, formAction, pending] = useActionState(loginAction, initialState)
  return (
    <>
      {' '}
      {state.error && (
        <div className="mb-4 p-3 bg-[var(--color-status-cancelled-bg)] text-[var(--color-status-cancelled)] text-sm">
          {state.error}
        </div>
      )}
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-[var(--color-ink)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full border border-[var(--color-ink)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-[var(--color-ink)] text-[var(--color-surface)] py-3 text-sm font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors disabled:opacity-50"
        >
          {pending ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </>
  )
}

export default LoginForm
