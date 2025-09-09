import { create } from "zustand";

interface ImageState {
  userAvatarUrl: string | null;
  productGallery: string[];
  mainProductImage: string | null;
  setUserAvatar: (url: string) => void;
  setProductGallery: (urls: string[]) => void;
  setMainProductImage: (url: string) => void;
}

export const useImageStore = create<ImageState>((set) => ({
  userAvatarUrl: null,
  productGallery: [],
  mainProductImage: null,
  setUserAvatar: (url) => set({ userAvatarUrl: url }),
  setProductGallery: (urls) => set({ productGallery: urls }),
  setMainProductImage: (url) => set({ mainProductImage: url }),
}));
