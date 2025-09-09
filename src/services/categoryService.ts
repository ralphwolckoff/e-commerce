
import api from "./api"; 
import { AxiosError } from "axios";
import { Categorie } from "@/types/category";



interface CreateCategoryPayload {
  name: string;
  storeId: string;
}

interface UpdateCategoryPayload {
  name: string;
}


export const categoryService = {

  async getCategoriesByStoreId(storeId: string): Promise<Categorie[]> {
    try {
      const response = await api.get<Categorie[]>(`/categories?storeId=${storeId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "Erreur lors de la récupération des catégories:",
        axiosError.response?.data || axiosError.message
      );
      throw axiosError;
    }
  },

  async createCategory(payload: CreateCategoryPayload): Promise<Categorie> {
    try {
      const response = await api.post<Categorie>("/categories", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateCategory(
    categoryId: string,
    payload: UpdateCategoryPayload
  ): Promise<Categorie> {
    try {
      const response = await api.patch<Categorie>(
        `/categories/${categoryId}`,
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteCategory(categoryId: string): Promise<{ message: string }> {
    try {
      const response = await api.delete<{ message: string }>(
        `/categories/${categoryId}`
      );
      return response.data;
    } catch (error) {
      throw error
    }
  },
};