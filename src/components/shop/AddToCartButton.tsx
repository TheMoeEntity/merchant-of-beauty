'use client'

import { useCartDrawer } from '@/store/cart-drawer.store'
import { useCartStore } from '@/store/cart.store'
import { SanityProduct } from '@/types/sanity.types'

interface Props {
  product: SanityProduct
}

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartDrawer((s) => s.open)

  function handleAdd() {
    addItem(product)
    openCart()
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-[var(--color-plum)] text-[var(--color-ivory)] py-3 px-6 text-sm font-medium hover:bg-[var(--color-brass)] transition-colors"
    >
      Add to Cart
    </button>
  )
}
