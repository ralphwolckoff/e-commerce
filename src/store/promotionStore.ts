import { Promotion } from "@/types/promotion";
import { create } from "zustand";


interface PromotionState {
  promotions: Promotion[];
storePromotion: Promotion[];    
  setPromotions: (promotions: Promotion[]) => void;
  addPromotion: (newPromotion: Promotion) => void;
  updatePromotion: (updatedPromotion: Promotion) => void;
  deletePromotion: (promotionId: string) => void;
}

// Création du Store Zustand pour les promotions
export const usePromotionStore = create<PromotionState>((set) => ({
  // --- État Initial ---
  promotions: [],
  storePromotion: [],
  setPromotions: (promotions) => set({ promotions: promotions }),
  addPromotion: (newPromotion) =>
    set((state) => ({
      promotions: [...state.promotions, newPromotion],
    })),
  updatePromotion: (updatedPromotion) =>
    set((state) => ({
      promotions: state.promotions.map((p) =>
        p.id === updatedPromotion.id ? updatedPromotion : p
      ),
    })),
  deletePromotion: (promotionId) =>
    set((state) => ({
      promotions: state.promotions.filter((p) => p.id !== promotionId),
    })),
}));
