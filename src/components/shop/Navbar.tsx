'use client'

import Link from 'next/link'
import { useUIStore } from '@/store/ui.store'
import { useCartStore } from '@/store/cart.store'
import { ShoppingBag } from 'lucide-react'

export default function Navbar() {
    const { toggleCart } = useUIStore()
    const totalItems = useCartStore((s) => s.totalItems)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-ivory)] border-b border-[var(--color-brass)]/20">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-display text-xl text-[var(--color-plum)]">
                    Merchant of Beauty
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm text-[var(--color-plum)]/70 hover:text-[var(--color-plum)] transition-colors">Home</Link>
                    <Link href="/shop" className="text-sm text-[var(--color-plum)]/70 hover:text-[var(--color-plum)] transition-colors">Shop</Link>
                    <Link href="/about" className="text-sm text-[var(--color-plum)]/70 hover:text-[var(--color-plum)] transition-colors">About</Link>
                </nav>

                <button
                    onClick={toggleCart}
                    className="relative p-2 text-[var(--color-plum)] hover:text-[var(--color-brass)] transition-colors"
                >
                    <ShoppingBag size={22} />
                    {totalItems() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[var(--color-brass)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {totalItems()}
                        </span>
                    )}
                </button>
            </div>
        </header>
    )
}