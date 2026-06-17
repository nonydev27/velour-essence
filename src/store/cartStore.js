import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, qty = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.id === product.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === product.id ? { ...i, qty: i.qty + qty } : i
            ),
          });
        } else {
          set({ items: [...items, { ...product, qty }] });
        }
      },

      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

      updateQty: (id, qty) => {
        if (qty < 1) {
          set({ items: get().items.filter((i) => i.id !== id) });
        } else {
          set({ items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)) });
        }
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      get totalItems() { return get().items.reduce((s, i) => s + i.qty, 0); },
      get totalPrice() { return get().items.reduce((s, i) => s + i.effectivePrice * i.qty, 0); },
    }),
    { name: 've-cart-store' }
  )
);
