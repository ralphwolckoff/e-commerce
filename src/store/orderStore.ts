import { Status } from "@/common/status.enum";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Définit les statuts de commande, en accord avec le schéma Prisma

// Définit la structure d'un article de commande
export interface OrderItem {
  id: string;
  quantity: number;
  priceAtOrder: number;
  productId: string;
}

// Définit la structure d'une commande telle que reçue du backend
export interface Order {
  id: string;
  status: Status;
  orderNumber: string
  totalAmount: number;
  userId: string;
  storeId: string;
  addressId: string;
  createdAt: Date;
  items: OrderItem[];
}

// Interface de l'état du store
interface OrderState {
  orders: Order[];
  addOrder: (newOrder: Order) => void;
  setOrders: (orders: Order[]) => void;
  updateOrderStatus: (orderId: string, newStatus: Status) => void;
  clearOrders: () => void;
}

// Crée le store Zustand
export const useOrdersStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      // Ajoute une nouvelle commande à l'état
      addOrder: (newOrder) => {
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
      },

      // Définit l'ensemble des commandes (utile pour le chargement initial)
      setOrders: (orders) => {
        set({ orders });
      },

      // Met à jour le statut d'une commande existante
      updateOrderStatus: (orderId, newStatus) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          ),
        }));
      },

      // Vide l'état des commandes
      clearOrders: () => {
        set({ orders: [] });
      },
    }),
    {
      name: "orders-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
