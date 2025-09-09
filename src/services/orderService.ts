import { Order, OrderPayload } from "@/types/commands";
import api from "./api";
import { Status } from "@/common/status.enum";

export const orderService = {
  createCommand: async (payload: OrderPayload) => {
    const response = await api.post("/Orders", payload);
    return response.data;
  },
  // Récupère une commande spécifique par son ID pour le vendeur
  getCommandById: async (commandId: string) => {
    const response = await api.get(`/orders/${commandId}`);
    return response.data;
  },

  // Récupère toutes les commandes pour un client
  getClientCommands: async (userId: string) => {
    const response = await api.get<Order[]>(`/orders/${userId}/client`);
    return response.data;
  },

  // Récupère toutes les commandes d'un vendeur
  getStoreCommands: async (storeId: string) => {
    const response = await api.get(`/orders/${storeId}/store`);
    return response.data;
  },

  // Met à jour le statut d'une commande
  
  updateCommandStatus: async (orderId: string, newStatus: Status,) => {
    const response = await api.patch(`/orders/${orderId}/status`, {
     newStatus
    });
    return response.data;
  },
};
