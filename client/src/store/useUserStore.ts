import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthUser {
  id: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  modalType: "signin" | "signup" | null;
  setModal: (type: "signin" | "signup" | null) => void;
  logout: () => void;
  closeModal: () => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,
      modalType: null,
      pendingAction: null,
      setModal: (type) => set({ modalType: type }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
      closeModal: () => set({ modalType: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // 🔥 exclude pendingAction khỏi persist
      partialize: (state) => ({
        user: state.user,
        hasHydrated: state.hasHydrated,
        modalType: state.modalType,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
