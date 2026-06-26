'use client'

import { useActionState, useState } from 'react'
import { toast } from 'sonner'
import { createStandaloneInvoiceAction } from '@/actions/standalone-invoice.actions'
import { SanityProduct } from '@/types/sanity.types'
import { StandaloneInvoiceItem } from '@/types/standalone-invoice.types'
import { formatNaira } from '@/lib/utils'

interface Props {
  products: SanityProduct[]
}

const initialState = { error: null }

export function InvoiceBuilder({ products }: Props) {
  const [items, setItems] = useState<StandaloneInvoiceItem[]>([])
  const [search, setSearch] = useState('')
  const [state, formAction, pending] = useActionState(
    createStandaloneInvoiceAction,
    initialState
  )

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)

  function addProduct(product: SanityProduct) {
    const existing = items.find((i) => i.productId === product._id)
    if (existing) {
      setItems(
        items.map((i) =>
          i.productId === product._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      )
    } else {
      setItems([
        ...items,
        {
          productId: product._id,
          productTitle: product.title,
          quantity: 1,
          unitPrice: product.price,
        },
      ])
    }
    toast.success(`${product.title} added`)
  }

  function updateQty(productId: string, quantity: number) {
    if (quantity < 1) return
    setItems(
      items.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    )
  }

  function removeItem(productId: string) {
    setItems(items.filter((i) => i.productId !== productId))
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left — Product Picker */}
      <div>
        <h2 className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
          Select Products
        </h2>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-[var(--color-ink)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] transition-colors mb-4"
        />

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {filtered.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between p-3 border border-[var(--color-ink)]/10 hover:border-[var(--color-gold)] transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-[var(--color-ink)]">
                  {product.title}
                </p>
                <p className="text-xs text-[var(--color-muted)]">
                  {formatNaira(product.price)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => addProduct(product)}
                className="text-xs px-3 py-1.5 bg-[var(--color-ink)] text-[var(--color-surface)] hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors"
              >
                + Add
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-[var(--color-muted)] text-center py-8">
              No products found
            </p>
          )}
        </div>
      </div>

      {/* Right — Invoice Form */}
      <div>
        <h2 className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-4">
          Invoice Details
        </h2>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="items" value={JSON.stringify(items)} />

          {[
            {
              name: 'customerName',
              label: 'Customer Name',
              type: 'text',
              required: true,
            },
            {
              name: 'customerEmail',
              label: 'Email',
              type: 'email',
              required: false,
            },
            {
              name: 'customerPhone',
              label: 'Phone',
              type: 'tel',
              required: false,
            },
            {
              name: 'customerAddress',
              label: 'Address',
              type: 'text',
              required: false,
            },
          ].map(({ name, label, type, required }) => (
            <div key={name}>
              <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
                {label}{' '}
                {required && (
                  <span className="text-[var(--color-gold-dark)]">*</span>
                )}
              </label>
              <input
                name={name}
                type={type}
                required={required}
                className="w-full border border-[var(--color-ink)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              rows={2}
              className="w-full border border-[var(--color-ink)]/20 bg-transparent px-4 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
            />
          </div>

          {/* Selected items summary */}
          {items.length > 0 && (
            <div className="border border-[var(--color-ink)]/10 p-4 space-y-2">
              <p className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-3">
                Selected Items
              </p>
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-[var(--color-ink)] truncate flex-1">
                    {item.productTitle}
                  </span>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      type="button"
                      onClick={() =>
                        updateQty(item.productId, item.quantity - 1)
                      }
                      className="w-6 h-6 border border-[var(--color-ink)]/20 flex items-center justify-center text-sm hover:border-[var(--color-gold)] transition-colors"
                    >
                      −
                    </button>
                    <span className="w-4 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQty(item.productId, item.quantity + 1)
                      }
                      className="w-6 h-6 border border-[var(--color-ink)]/20 flex items-center justify-center text-sm hover:border-[var(--color-gold)] transition-colors"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="text-[var(--color-status-cancelled)] text-xs ml-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="border-t border-[var(--color-ink)]/10 pt-3 flex justify-between font-medium">
                <span className="text-sm text-[var(--color-ink)]">Total</span>
                <span className="font-display text-base text-[var(--color-ink)]">
                  {formatNaira(total)}
                </span>
              </div>
            </div>
          )}

          {state.error && (
            <p className="text-sm text-[var(--color-status-cancelled)]">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending || items.length === 0}
            className="w-full bg-[var(--color-ink)] text-[var(--color-surface)] py-3 text-sm font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? 'Creating Invoice...' : 'Create Invoice'}
          </button>
        </form>
      </div>
    </div>
  )
}
