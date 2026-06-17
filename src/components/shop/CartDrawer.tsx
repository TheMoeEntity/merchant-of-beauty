'use client'

import { useUIStore } from '@/store/ui.store'
import { useCartStore } from '@/store/cart.store'
import { formatNaira } from '@/lib/utils'
import { X, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'

export default function CartDrawer() {
    const { cartOpen, closeCart } = useUIStore()
    const { items, removeItem, updateQty, totalPrice } = useCartStore()

    return (
        <>
            {cartOpen && (
                <div className="fixed inset-0 bg-black/40 z-40" onClick={closeCart} />
            )}

            <aside className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[var(--color-ivory)] z-50 shadow-2xl transition-transform duration-300 flex flex-col ${cartOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-brass)]/20">
                    <h2 className="font-display text-lg text-[var(--color-plum)]">Your Cart</h2>
                    <button onClick={closeCart} className="text-[var(--color-plum)]/60 hover:text-[var(--color-plum)]">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {items.length === 0 ? (
                        <p className="text-sm text-[var(--color-plum)]/50 text-center mt-12">Your cart is empty</p>
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
                                    <p className="text-sm font-medium text-[var(--color-plum)] truncate">{product.title}</p>
                                    <p className="text-xs text-[var(--color-plum)]/60 mb-2">{formatNaira(product.price)}</p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQty(product._id, quantity - 1)}
                                            className="w-6 h-6 border border-[var(--color-plum)]/20 text-sm flex items-center justify-center"
                                        >−</button>
                                        <span className="text-sm w-4 text-center">{quantity}</span>
                                        <button
                                            onClick={() => updateQty(product._id, quantity + 1)}
                                            className="w-6 h-6 border border-[var(--color-plum)]/20 text-sm flex items-center justify-center"
                                        >+</button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeItem(product._id)}
                                    className="text-[var(--color-plum)]/40 hover:text-red-500 transition-colors self-start"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="px-6 py-4 border-t border-[var(--color-brass)]/20 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-[var(--color-plum)]/70">Total</span>
                            <span className="font-medium text-[var(--color-plum)]">{formatNaira(totalPrice())}</span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={closeCart}
                            className="block w-full bg-[var(--color-plum)] text-[var(--color-ivory)] text-center py-3 text-sm font-medium hover:bg-[var(--color-brass)] transition-colors"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                )}
            </aside>
        </>
    )
}