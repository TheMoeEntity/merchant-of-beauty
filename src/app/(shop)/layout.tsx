import Navbar from '@/components/shop/Navbar'
import CartDrawer from '@/components/shop/CartDrawer'
import { Footer } from '@/components/shop/Footer'
import { WhatsAppButtonWrapper } from '@/components/shop/WhatsAppButtonWrapper'
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
      <main>{children}</main>
      <WhatsAppButtonWrapper />
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
      <Footer />
    </>
  )
}
