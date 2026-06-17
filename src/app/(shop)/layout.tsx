import Navbar from '@/components/shop/Navbar'
import CartDrawer from '@/components/shop/CartDrawer'
import { Footer } from '@/components/shop/Footer'

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
      <Footer />
    </>
  )
}
