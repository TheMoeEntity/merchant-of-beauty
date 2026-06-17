'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cart.store'
import { useCartDrawer } from '@/store/cart-drawer.store'
import { formatNaira } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { X, Trash2 } from 'lucide-react'

export default function CartDrawer() {
  const { isOpen, close } = useCartDrawer()
  const { items, total, updateQty, removeItem } = useCartStore()

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-ink/30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-surface shadow-lifted transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink">
            Your Cart
          </h2>
          <button
            onClick={close}
            className="text-muted transition-colors hover:text-ink"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-sm text-muted text-center mt-12">
              Your cart is empty
            </p>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product._id} className="flex gap-3">
                {product.images?.[0] && (
                  <Image
                    src={urlFor(product.images[0]).width(80).height(80).url()}
                    alt={product.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">
                    {product.title}
                  </p>
                  <p className="text-xs text-muted mb-2">
                    {formatNaira(product.price)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(product._id, quantity - 1)}
                      className="w-6 h-6 border border-ink/20 text-sm flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-sm w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQty(product._id, quantity + 1)}
                      className="w-6 h-6 border border-ink/20 text-sm flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(product._id)}
                  className="text-muted hover:text-status-cancelled transition-colors self-start"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-ink/10 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Total</span>
              <span className="font-medium text-ink">{formatNaira(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="block w-full bg-plum text-surface text-center py-3 text-sm font-medium hover:bg-brass transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
