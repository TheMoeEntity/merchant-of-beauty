import type { Metadata } from 'next'
import { DM_Serif_Display, Manrope } from 'next/font/google'
import './globals.css'
// import Navbar from '@/components/Navbar'
// import CartDrawer from '@/components/CartDrawer'
import Navbar from '@/components/shop/Navbar'
import CartDrawer from '@/components/shop/CartDrawer'
import { Footer } from '@/components/shop/Footer'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Merchant of Beauty',
  description: 'Professional spa, salon & tattoo equipment',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${manrope.variable}`}>
      <body>
        <Navbar />
        <CartDrawer />
        <main className="pt-16">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}