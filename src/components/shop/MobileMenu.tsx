'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About Us' },
]

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="text-ink p-1 hover:text-gold transition-colors"
      >
        <Menu size={22} />
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`h-screen z-100 fixed inset-0 bg-black/30 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ zIndex: 999 }}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 z-101 left-0 h-screen w-[280px] max-w-[80vw] flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundColor: '#FFFFFF',
          zIndex: 1000,
          //   boxShadow: '2px 0 20px rgba(0,0,0,0.15)',
        }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10">
          <span className="font-display text-xl text-ink">M.O.B</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-ink p-1 hover:text-gold transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-8 gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-ink hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
