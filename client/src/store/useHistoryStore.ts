import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface HistoryState {
  history: string[] | null;
  setHistory: (history: string[]) => void;

  clear: () => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: null,
      setHistory: (history) => set({ history }),

      clear: () => set({ history: null }),

      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "history-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
