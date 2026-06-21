'use client'

import { useActionState } from 'react'
import { loginAction } from '@/actions/auth.actions'
import Navbar from '@/components/shop/Navbar'
import { Footer } from '@/components/shop/Footer'

const initialState = { error: null }

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState)

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)] px-6">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl text-[var(--color-ink)] text-center mb-2">
            Merchant of Beauty
          </h1>
          <p className="text-sm text-[var(--color-muted)] text-center mb-8">
            Sign in to manage your store
          </p>

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
        </div>
      </div>
      <Footer />
    </>
  )
}
