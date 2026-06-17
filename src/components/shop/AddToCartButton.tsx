'use client'

import { useCartStore } from '@/store/cart.store'
import { useUIStore } from '@/store/ui.store'
import { SanityProduct } from '@/types/sanity.types'

interface Props {
    product: SanityProduct
}

export default function AddToCartButton({ product }: Props) {
    const addItem = useCartStore((s) => s.addItem)
    const openCart = useUIStore((s) => s.openCart)

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