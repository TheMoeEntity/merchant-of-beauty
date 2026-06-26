'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOutAction } from '@/actions/auth.actions'
import { SessionUser } from '@/types/auth.types'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/orders', label: 'Orders' },
  { href: '/dashboard/invoices', label: 'Invoices' },
  { href: '/dashboard/staff', label: 'Staff', ownerOnly: true },
]

export function Sidebar({ user }: { user: SessionUser }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[var(--color-sidebar-dark)] text-[var(--color-surface)] flex flex-col">
      <div className="px-6 py-7 border-b border-[var(--color-surface)]/10">
        <p className="font-display text-xl text-[var(--color-gold)]">
          Merchant of Beauty
        </p>
        <p className="text-xs text-[var(--color-surface)]/50 mt-1">Dashboard</p>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {NAV_ITEMS.filter(
          (item) => !item.ownerOnly || user.role === 'owner'
        ).map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2.5 text-sm rounded transition-colors ${
                active
                  ? 'bg-[var(--color-gold)] text-[var(--color-ink)] font-medium'
                  : 'text-[var(--color-surface)]/70 hover:bg-[var(--color-surface)]/5 hover:text-[var(--color-surface)]'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
        <Link
          href="/"
          className="block px-4 py-2.5 text-sm rounded transition-colors text-[var(--color-surface)]/70 hover:bg-[var(--color-surface)]/5 hover:text-[var(--color-surface)]"
        >
          Home
        </Link>
      </nav>

      <div className="px-6 py-5 border-t border-[var(--color-surface)]/10">
        <p className="text-sm text-[var(--color-surface)]">{user.name}</p>
        <p className="text-xs text-[var(--color-surface)]/50 capitalize mb-3">
          {user.role}
        </p>
        <Link
          href="/dashboard/account"
          className="block text-xs text-[var(--color-surface)]/50 hover:text-[var(--color-gold)] transition-colors mb-2"
        >
          Account Settings
        </Link>
        <form action={signOutAction}>
          <button
            type="submit"
            className="text-xs text-[var(--color-surface)]/50 hover:text-[var(--color-gold)] transition-colors"
          >
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
