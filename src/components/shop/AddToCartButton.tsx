'use client'

import { useCartStore } from '@/store/cart.store'
import { useCartDrawer } from '@/store/cart-drawer.store'
import { SanityProduct } from '@/types/sanity.types'
import { toast } from 'sonner'

interface Props {
  product: SanityProduct
}

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartDrawer((s) => s.open)

  function handleAdd() {
    addItem(product)
    openCart()
    toast.success(`${product.title} added to cart`)
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-[var(--color-ink)] text-[var(--color-surface)] py-3 px-6 text-sm font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-colors"
    >
      Add to Cart
    </button>
  )
}
