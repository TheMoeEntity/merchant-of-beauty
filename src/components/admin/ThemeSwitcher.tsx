'use client'

import { useState, useEffect } from 'react'

const THEMES = [
  { id: 'default', label: 'Default (White)' },
  { id: 'warm-cream', label: 'A — Warm Cream' },
  { id: 'dark-sections', label: 'B — Dark Sections' },
  { id: 'gold-tint', label: 'C — Gold Tint' },
  { id: 'full-dark', label: 'D — Full Dark' },
  { id: 'combined', label: 'E — Combined (B+C)' },
  { id: 'dashboard-warm', label: 'F — Dashboard Warm' },
  { id: 'charcoal-gold', label: 'G — Charcoal Gold' },
  { id: 'midnight-gold', label: 'H — Midnight Gold' },
  { id: 'deep-navy', label: 'I — Deep Navy' },
  { id: 'mob-signature', label: 'J — MOB Signature ⭐' },
]

export function ThemeSwitcher() {
  const [active, setActive] = useState('default')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    if (active === 'default') {
      html.removeAttribute('data-theme')
    } else {
      html.setAttribute('data-theme', active)
    }
  }, [active])

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {open && (
        <div className="mb-2 bg-white border border-black/10 shadow-lifted rounded overflow-hidden">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                setActive(theme.id)
                setOpen(false)
              }}
              className={`block w-full text-left px-4 py-2.5 text-xs font-medium transition-colors ${
                active === theme.id
                  ? 'bg-[#C9A24B] text-white'
                  : 'text-black hover:bg-black/5'
              }`}
            >
              {theme.label}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-black text-white px-4 py-2.5 text-xs font-medium shadow-lifted hover:bg-[#C9A24B] transition-colors"
      >
        🎨 Theme
      </button>
    </div>
  )
}
