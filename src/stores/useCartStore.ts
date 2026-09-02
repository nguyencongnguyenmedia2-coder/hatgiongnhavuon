import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  appliedCouponCode: string | null;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setAppliedCoupon: (code: string | null) => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      appliedCouponCode: null,

      addItem: (product, quantity = 1) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((i) => i.product.id === product.id);

        if (existingIndex > -1) {
          const updatedItems = [...currentItems];
          const newQty = updatedItems[existingIndex].quantity + quantity;
          const maxStock = product.stock || 999;
          updatedItems[existingIndex].quantity = Math.min(newQty, maxStock);
          set({ items: updatedItems, isDrawerOpen: true });
        } else {
          set({
            items: [...currentItems, { product, quantity: Math.min(quantity, product.stock || 999) }],
            isDrawerOpen: true,
          });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const updatedItems = get().items.map((i) => {
          if (i.product.id === productId) {
            const maxStock = i.product.stock || 999;
            return { ...i, quantity: Math.min(quantity, maxStock) };
          }
          return i;
        });

        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [], appliedCouponCode: null });
      },

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      setAppliedCoupon: (code) => set({ appliedCouponCode: code }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
    }),
    {
      name: 'hat_giong_nha_vuon_cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, appliedCouponCode: state.appliedCouponCode }),
    }
  )
);
