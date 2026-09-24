import type { Metadata } from 'next'
import { DM_Serif_Display, Manrope } from 'next/font/google'
import { OG_IMAGE_SRC, SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/sanity/queries'
import { DEFAULT_THEME, resolveTheme } from '@/lib/themes'
import './globals.css'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
})

const description =
  'Merchant of Beauty is a leading supplier of premium spa, salon, skincare, and tattoo equipment in Nigeria, with nationwide delivery and a showroom in Lagos.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Merchant of Beauty | Spa, Salon & Tattoo Equipment in Nigeria',
    template: '%s | Merchant of Beauty',
  },
  description,
  keywords: [
    'spa equipment Nigeria',
    'salon equipment Nigeria',
    'tattoo equipment Nigeria',
    'beauty equipment Lagos',
    'salon furniture Nigeria',
    'aesthetic equipment supplier',
  ],
  authors: [{ name: 'Merchant of Beauty' }],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: SITE_URL,
    siteName: 'Merchant of Beauty',
    title: 'Merchant of Beauty | Spa, Salon & Tattoo Equipment in Nigeria',
    description,
    images: [
      {
        url: OG_IMAGE_SRC,
        width: 1200,
        height: 630,
        alt: 'Merchant of Beauty',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merchant of Beauty | Spa, Salon & Tattoo Equipment in Nigeria',
    description,
    images: [OG_IMAGE_SRC],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()
  const theme = resolveTheme(settings?.theme)

  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${manrope.variable}`}
      data-theme={theme === DEFAULT_THEME ? undefined : theme}
    >
      <body>{children}</body>
    </html>
  )
}
