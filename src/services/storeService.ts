// src/services/storeService.ts
import api from "./api"; // Importation de l'instance Axios configurée
import { Store, StoreWithProducts } from "@/types/store";
import { handleApiError } from "@/utils/handleApiError";
import { OnboardingFormFeildType } from "@/types/form";
import { useAuthStore } from "@/store/authStore";

export const storeService = {
  createStore: async (data: OnboardingFormFeildType): Promise<Store> => {
    try {
      const response = await api.post<Store>("/stores", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getStoreById(storeId: string): Promise<Store | null> {
    try {
      const response = await api.get<Store>(`/stores/${storeId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getUserStore: async (): Promise<Store | null> => {
    try {
      const response = await api.get("/stores/me");
      const store = response.data;
      return store;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getStoreWithProducts: async (
    storeId: string
  ): Promise<StoreWithProducts | null> => {
    try {
      const response = await api.get<StoreWithProducts>(
        `/stores/${storeId}?includeProducts=true`
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },




  updateStore: async (storeId: string, data: Partial<Store>): Promise<Store> => {
    try {
      const response = await api.patch<Store>(`/stores/${storeId}`, data);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour de la boutique avec l'ID ${storeId}:`,
        error
      );
      throw error;
    }
  },

  deleteStore: async (storeId: string): Promise<void> => {
    try {
      await api.delete(`/stores/${storeId}`);
    } catch (error) {
      console.error(
        `Erreur lors de la suppression de la boutique avec l'ID ${storeId}:`,
        error
      );
      throw error;
    }
  },
};



