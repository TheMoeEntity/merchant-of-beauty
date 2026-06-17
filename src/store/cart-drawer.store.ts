import { create } from 'zustand'

// ----------------------------------------------------------------
// Cart Drawer Store
// Pure UI state — is the slide-out cart open or closed.
// Kept SEPARATE from the cart data store (cart.store.ts) on
// purpose: opening the drawer shouldn't be coupled to cart data,
// and components that toggle the drawer shouldn't re-render when
// cart items change. Single responsibility per store.
// ----------------------------------------------------------------

type CartDrawerStore = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export const useCartDrawer = create<CartDrawerStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))
