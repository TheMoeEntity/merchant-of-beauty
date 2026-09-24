const PRODUCTION_URL = 'https://themerchantofbeauty.com'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_APP_URL ??
  (process.env.NODE_ENV === 'production' ? PRODUCTION_URL : 'http://localhost:3000')
).replace(/\/$/, '')

export const LOGO_SRC = '/logo.png'
export const LOGO_WIDTH = 440
export const LOGO_HEIGHT = 235
export const OG_IMAGE_SRC = '/og-image.jpg'
