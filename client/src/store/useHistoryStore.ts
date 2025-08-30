import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface HistoryState {
  history: string[];
  setHistory: (history: string[]) => void;
  addHistory: (item: string) => void;
  removeHistory: (item: string) => void;
  clear: () => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      setHistory: (history) => set({ history }),
      removeHistory: (item: string) => {
        const state = get();
        let history = state.history ?? [];

        history = history.filter((h) => h !== item); // loại bỏ phần tử
        set({ history });
      },
      addHistory: (item: string) => {
        const state = get();
        let history = state.history ?? [];

        // Xóa phần tử trùng
        history = history.filter((h) => h !== item);

        // Thêm item mới lên đầu
        history = [item, ...history];

        set({ history });
      },
      clear: () => set({ history: [] }),

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
