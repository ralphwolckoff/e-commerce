"use client";

import React, { useEffect, useState } from "react";
import { orderService } from "@/services/orderService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Order } from "@/types/commands";
import { useOrdersStore } from "@/store/orderStore";
import { useAuth } from "@/context/AuthContext";
import { ClientOrderList } from "@/ui/modules/client/orders/ClientOrderList";

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const {authUser} = useAuth()

  useEffect(() => {
    const fetchVendorOrders = async () => {
      try {
        setLoading(true);
        if (authUser) {
          const fetchedCommands = await orderService.getClientCommands(authUser.id);
          useOrdersStore.getState().setOrders(fetchedCommands);
          setOrders(fetchedCommands);
        }
        setLoading(false);
      } catch (error) {
        console.error("Échec du chargement des commandes:", error);
        toast.error("Échec du chargement des commandes.");
      } finally {
        setLoading(false);
      }
    };
    fetchVendorOrders();
  }, []);

   const groupedOrders: Record<string, typeof orders> = orders.reduce(
     (groups, order) => {
       const storeName = order.store.name || "Boutique inconnue";
       if (!groups[storeName]) {
         groups[storeName] = [];
       }
       groups[storeName].push(order);
       return groups;
     },
     {} as Record<string, typeof orders>
   );


   if (loading) {
    return <div className="text-center py-10">Chargement des commandes...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        Vous n'avez aucune commande à gérer.
      </div>
    );
  }



  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mes Commandes</h1>
        {Object.keys(groupedOrders).map((storeName) => {
          // Sort orders for the current store by date descending
          const sortedOrders = groupedOrders[storeName].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          return (
            <div key={storeName} className="mb-8">
              <h2 className="text-center text-2xl font-semibold mb-4 text-gray-700">
                De la Boutique: {storeName}
              </h2>
              {sortedOrders.map((order) => (
                <ClientOrderList key={order.id} orders={order} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
