import Navbar from '@/components/shop/Navbar'
import CartDrawer from '@/components/shop/CartDrawer'
import { Footer } from '@/components/shop/Footer'
import { WhatsAppButtonWrapper } from '@/components/shop/WhatsAppButtonWrapper'
import { ThemeSwitcher } from '@/components/shop/ThemeSwitcher'
import { Toaster } from 'sonner'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="pt-4">{children}</main>
      <Footer />
      <WhatsAppButtonWrapper />
      <ThemeSwitcher />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'var(--font-sans)',
            borderRadius: '0px',
            border: '1px solid #0A0A0A',
            background: '#FFFFFF',
            color: '#0A0A0A',
          },
        }}
      />
    </>
  )
}
