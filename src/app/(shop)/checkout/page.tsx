'use client'

import { useActionState, useEffect } from 'react'
import { useCartStore } from '@/store/cart.store'
import { useCartDrawer } from '@/store/cart-drawer.store'
import { checkoutAction } from '@/actions/order.actions'
import { formatNaira } from '@/lib/utils'
import Link from 'next/link'

const initialState = { error: null }

export default function CheckoutPage() {
  const { items, total } = useCartStore()
  const closeCart = useCartDrawer((s) => s.close)
  const [state, formAction, pending] = useActionState(
    checkoutAction,
    initialState
  )

  useEffect(() => {
    closeCart()
  }, [closeCart])

  if (!items.length) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <p className="font-display text-2xl text-[var(--color-plum)] mb-4">
          Your cart is empty
        </p>
        <Link
          href="/products"
          className="text-sm text-[var(--color-brass)] hover:underline"
        >
          Continue Shopping →
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
      {/* Order Summary */}
      <div>
        <h2 className="font-display text-2xl text-[var(--color-plum)] mb-6">
          Order Summary
        </h2>
        <div className="space-y-4 mb-6">
          {items.map(({ product, quantity }) => (
            <div key={product._id} className="flex justify-between text-sm">
              <span className="text-[var(--color-ink)]">
                {product.title}{' '}
                <span className="text-[var(--color-muted)]">× {quantity}</span>
              </span>
              <span className="text-[var(--color-ink)]">
                {formatNaira(product.price * quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--color-plum)]/10 pt-4 flex justify-between">
          <span className="font-medium text-[var(--color-plum)]">Total</span>
          <span className="font-display text-xl text-[var(--color-plum)]">
            {formatNaira(total)}
          </span>
        </div>
      </div>

      {/* Checkout Form */}
      <div>
        <h2 className="font-display text-2xl text-[var(--color-plum)] mb-6">
          Your Details
        </h2>

        {state.error && (
          <div className="mb-4 p-3 bg-[var(--color-status-cancelled-bg)] text-[var(--color-status-cancelled)] text-sm">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input
            type="hidden"
            name="items"
            value={JSON.stringify(
              items.map(({ product, quantity }) => ({
                productId: product._id,
                productTitle: product.title,
                productImage: product.images?.[0]
                  ? product.images[0].asset._ref
                  : null,
                quantity,
                unitPrice: product.price,
              }))
            )}
          />

          {[
            {
              name: 'customerName',
              label: 'Full Name',
              type: 'text',
              required: true,
            },
            {
              name: 'customerEmail',
              label: 'Email Address',
              type: 'email',
              required: true,
            },
            {
              name: 'customerPhone',
              label: 'Phone Number',
              type: 'tel',
              required: false,
            },
            {
              name: 'customerAddress',
              label: 'Delivery Address',
              type: 'text',
              required: false,
            },
          ].map(({ name, label, type, required }) => (
            <div key={name}>
              <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
                {label}{' '}
                {required && (
                  <span className="text-[var(--color-brass)]">*</span>
                )}
              </label>
              <input
                name={name}
                type={type}
                required={required}
                className="w-full border border-[var(--color-plum)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brass)] transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              rows={3}
              className="w-full border border-[var(--color-plum)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brass)] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-[var(--color-plum)] text-[var(--color-ivory)] py-3 text-sm font-medium hover:bg-[var(--color-brass)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  )
}
