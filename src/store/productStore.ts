import { Product } from "@/types/products";
import { create } from "zustand";



interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  setProduct: (products:Product[]) => void
  addProduct: (newProduct: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: string) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  setProduct: (products) => set({ products: products }),

  addProduct: (newProduct) =>
    set((state) => ({
      products: [...state.products, newProduct], 
    })),

  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      ),
    })),

  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),
}));
