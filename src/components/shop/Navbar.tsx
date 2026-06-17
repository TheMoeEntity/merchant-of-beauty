'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cart.store'
import { useCartDrawer } from '@/store/cart-drawer.store'
import { ShoppingBag } from 'lucide-react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About Us' },
]

export default function Navbar() {
  const itemCount = useCartStore((state) => state.itemCount)
  const openCart = useCartDrawer((state) => state.open)

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <nav className="flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="font-display text-2xl text-ink absolute left-1/2 -translate-x-1/2"
        >
          <span className="hidden md:block">Merchant of Beauty</span>
          <span className="md:hidden">M.O.B</span>
        </Link>

        <button
          onClick={openCart}
          className="relative flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-gold"
        >
          <ShoppingBag />
          {itemCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ink">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
