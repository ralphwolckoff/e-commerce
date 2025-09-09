import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "@/types/products";

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
  priceAtOrder: number;
  sellerId?: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, quantity: number, sellerId?: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.priceAtOrder, 0);
  return { totalItems, totalPrice };
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product, quantity) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productId === product.id
          );
          let newItems;
          if (existingItem) {
            newItems = state.items.map((i) =>
              i.productId === product.id
                ? {
                    ...i,
                    quantity: i.quantity + quantity,
                    priceAtOrder: (i.quantity + quantity) * Number(product.price),
                  }
                : i
            );
          } else {
            newItems = [
              ...state.items,
              {
                productId: product.id,
                quantity,
                product,
                priceAtOrder: quantity * Number(product.price),
                sellerId: product.store?.userId,
              },
            ];
          }

          const { totalItems, totalPrice } = calculateTotals(newItems);
          return { items: newItems, totalItems, totalPrice };
        }),

      updateItemQuantity: (productId, quantity) =>
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity,
                  priceAtOrder: quantity * Number(item.product.price),
                }
              : item
          );
          const { totalItems, totalPrice } = calculateTotals(updatedItems);
          return { items: updatedItems, totalItems, totalPrice };
        }),

      removeItem: (productId) =>
        set((state) => {
          const updatedItems = state.items.filter(
            (i) => i.productId !== productId
          );
          const { totalItems, totalPrice } = calculateTotals(updatedItems);
          return { items: updatedItems, totalItems, totalPrice };
        }),

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
