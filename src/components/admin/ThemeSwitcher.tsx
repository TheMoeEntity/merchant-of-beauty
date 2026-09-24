'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { updateThemeAction } from '@/actions/theme.actions'
import { DEFAULT_THEME, THEMES } from '@/lib/themes'
import { ThemeId } from '@/types/theme.types'

interface Props {
  currentTheme: ThemeId
}

export function ThemeSwitcher({ currentTheme }: Props) {
  const [active, setActive] = useState<ThemeId>(currentTheme)
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()

  function applyToPage(theme: ThemeId) {
    const html = document.documentElement
    if (theme === DEFAULT_THEME) html.removeAttribute('data-theme')
    else html.setAttribute('data-theme', theme)
  }

  function handleSelect(theme: ThemeId) {
    const previous = active
    setActive(theme)
    setOpen(false)
    applyToPage(theme)

    startTransition(async () => {
      const result = await updateThemeAction(theme)
      if (result.error) {
        setActive(previous)
        applyToPage(previous)
        toast.error(result.error)
        return
      }
      toast.success('Website theme updated for all visitors')
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-2 bg-white border border-black/10 shadow-lifted rounded overflow-hidden">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleSelect(theme.id)}
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
        disabled={pending}
        className="flex items-center gap-2 bg-black text-white px-4 py-2.5 text-xs font-medium shadow-lifted hover:bg-[#C9A24B] transition-colors disabled:opacity-60"
      >
        {pending ? 'Saving...' : 'Website Theme'}
      </button>
    </div>
  )
}
