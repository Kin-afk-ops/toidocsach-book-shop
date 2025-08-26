import { CartInterface, CartItemWithCheck } from "./../interface/cart.i";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartState {
  cart: CartInterface | null;
  setCart: (cart: CartInterface) => void;
  cartItems: CartItemWithCheck[];
  setCartItems: (cartItems: CartItemWithCheck[]) => void;
  toggleItemCheck: (id: string) => void;
  toggleAllCheck: (checked: boolean) => void;
  clear: () => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: null,
      setCart: (cart) => set({ cart }),
      cartItems: [],
      setCartItems: (cartItems) => set({ cartItems }),
      clear: () => set({ cart: null, cartItems: [] }),
      toggleItemCheck: (id) =>
        set((state) => ({
          cartItems:
            state.cartItems?.map((item) =>
              item.book?.id === id ? { ...item, checked: !item.checked } : item
            ) || null,
        })),

      toggleAllCheck: (checked) =>
        set((state) => ({
          cartItems:
            state.cartItems?.map((item) => ({
              ...item,
              checked,
            })) || null,
        })),
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "cart-items-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
