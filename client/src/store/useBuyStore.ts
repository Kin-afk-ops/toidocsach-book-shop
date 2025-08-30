import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ToBuyState {
  book: {
    book_id: string;
    quantity: number;
  } | null;
  setBook: (cart: { book_id: string; quantity: number }) => void;

  clear: () => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useBuyStore = create<ToBuyState>()(
  persist(
    (set) => ({
      book: null,
      setBook: (book) => set({ book }),
      clear: () => set({ book: null }),

      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "to-buy-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
