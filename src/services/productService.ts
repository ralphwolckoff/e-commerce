import { Product, ProductCreationPayload, ProductUpdatePayload } from "@/types/products";
import api from "./api";
import { useProductStore } from "@/store/productStore";
import { AxiosRequestConfig } from "axios";



export const productService = {
  getProducts: async (params?: {
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<Product[]> => {
    const config: AxiosRequestConfig = { params };
    const response = await api.get("/products", config);
    useProductStore.getState().setProduct(response.data)
    return response.data;
  },

  createProduct: async (payload: ProductCreationPayload): Promise<Product> => {
    try {
      const response = await api.post("/products", payload);
      useProductStore.getState().addProduct(response.data);

      if (!response) {
        throw new Error("Échec de la création du produit.");
      }

      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error);
      throw error;
    }
  },

  getProductById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getStoreProducts: async (storeId: string) => {
    const response = await api.get<Product[]>(`/products/${storeId}/store`);
    useProductStore.getState().setProduct(response.data);

    return response.data;
  },

  getCategoryProducts: async (categoryId: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(
      `/products/${categoryId}/category`
    );
    return response.data;
  },

  updateProduct: async (productId: string, payload: ProductUpdatePayload) => {
    const response = await api.patch(`/products/${productId}`, {
      ...payload,
    });
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  deleteImage: async (id: string) => {
    const response = await api.delete(`/products/image/${id}`);
    return response.data;
  },
};
