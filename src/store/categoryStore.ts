import { Categorie } from "@/types/category";
import { create } from "zustand";



interface CategoryState {
  category: Categorie[];
  loading: boolean;
  error: string | null;
  setCategory: (category:Categorie[]) => void
  addCategory: (newCategory: Categorie) => void;
  updateCategory: (updatedCategory: Categorie) => void;
  deleteCategory: (categoryId: string) => void;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  category: [],
  loading: false,
  error: null,

  setCategory: (category) => set({ category: category }),

  addCategory: (newCategory) =>
    set((state) => ({
      category: [...state.category, newCategory],
    })),

  updateCategory: (updatedCategory) =>
    set((state) => ({
      category: state.category.map((p) =>
        p.id === updatedCategory.id ? updatedCategory : p
      ),
    })),

  deleteCategory: (categoryId) =>
    set((state) => ({
      category: state.category.filter((p) => p.id !== categoryId),
    })),
}));
