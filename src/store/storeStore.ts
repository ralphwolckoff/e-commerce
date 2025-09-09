import { Store } from "@/types/store";
import { create } from "zustand";

// Interface pour la structure d'une boutique
export interface StoreState {
  store: Store | null;
  loading: boolean;
  error: string | null;
  setStore: (store: Store | null) => void;
}

export const useStoreStore = create<StoreState>((set) => ({
  store: null,
  loading: false,
  error: null,

  setStore: (store) => set({ store: store }),
}));
