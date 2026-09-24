export type ThemeId =
  | 'default'
  | 'warm-cream'
  | 'dark-sections'
  | 'gold-tint'
  | 'full-dark'
  | 'combined'
  | 'dashboard-warm'
  | 'charcoal-gold'
  | 'midnight-gold'
  | 'deep-navy'
  | 'mob-signature'

export interface ThemeOption {
  id: ThemeId
  label: string
}
