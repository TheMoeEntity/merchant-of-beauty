import type { ThemeId, ThemeOption } from '../types/theme.types'

export const DEFAULT_THEME: ThemeId = 'default'

export const THEMES: ThemeOption[] = [
  { id: 'default', label: 'Classic White' },
  { id: 'warm-cream', label: 'Warm Cream' },
  { id: 'dark-sections', label: 'Dark Sections' },
  { id: 'gold-tint', label: 'Gold Tint' },
  { id: 'full-dark', label: 'Full Dark' },
  { id: 'combined', label: 'Combined (Dark + Gold Tint)' },
  { id: 'dashboard-warm', label: 'Warm Charcoal' },
  { id: 'charcoal-gold', label: 'Charcoal Gold' },
  { id: 'midnight-gold', label: 'Midnight Gold' },
  { id: 'deep-navy', label: 'Deep Navy' },
  { id: 'mob-signature', label: 'MOB Signature (Black & Gold)' },
]

export const THEME_IDS = THEMES.map((t) => t.id) as [ThemeId, ...ThemeId[]]

export function resolveTheme(value: string | null | undefined): ThemeId {
  return THEME_IDS.find((id) => id === value) ?? DEFAULT_THEME
}
