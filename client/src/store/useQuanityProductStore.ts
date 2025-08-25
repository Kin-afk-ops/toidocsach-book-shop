import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface QuantityType {
  bookId: string;
  quantity: number;
}

interface QuantityState {
  quantityProduct: QuantityType | null;
  setQuantityProduct: (quantity: QuantityType) => void;
  clear: () => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useQuantityProduct = create<QuantityState>()(
  persist(
    (set) => ({
      quantityProduct: null,
      hasHydrated: false,
      setQuantityProduct: (quantityProduct) => set({ quantityProduct }),
      clear: () => set({ quantityProduct: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "quantity-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
