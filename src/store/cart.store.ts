import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SanityProduct } from '@/types/sanity.types'

interface CartItem {
  product: SanityProduct
  quantity: number
}

interface CartStore {
  items: CartItem[]
  itemCount: number
  total: number
  addItem: (product: SanityProduct) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, quantity: number) => void
  clearCart: () => void
}

function deriveTotals(items: CartItem[]) {
  return {
    itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
    total: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      total: 0,

      addItem: (product) => {
        const existing = get().items.find((i) => i.product._id === product._id)
        const items = existing
          ? get().items.map((i) =>
              i.product._id === product._id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          : [...get().items, { product, quantity: 1 }]

        set({ items, ...deriveTotals(items) })
      },

      removeItem: (productId) => {
        const items = get().items.filter((i) => i.product._id !== productId)
        set({ items, ...deriveTotals(items) })
      },

      updateQty: (productId, quantity) => {
        if (quantity < 1) return
        const items = get().items.map((i) =>
          i.product._id === productId ? { ...i, quantity } : i
        )
        set({ items, ...deriveTotals(items) })
      },

      clearCart: () => set({ items: [], itemCount: 0, total: 0 }),
    }),
    { name: 'mob-cart' }
  )
)
