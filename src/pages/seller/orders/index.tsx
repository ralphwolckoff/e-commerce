"use client";

import React, { useEffect, useState } from "react";
import { orderService } from "@/services/orderService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Order } from "@/types/commands";
import { useStoreStore } from "@/store/storeStore";
import SellerOrderCard from "@/ui/modules/seller/orders/SellerOrderCard";
import { useOrdersStore } from "@/store/orderStore";

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { store } = useStoreStore();
  // const {orders} = useOrdersStore()
  console.log({orders});
  
  useEffect(() => {
    const fetchVendorOrders = async () => {
      try {
        setLoading(true);
        if (store) {
          const fetchedCommands = await orderService.getStoreCommands(
            store.id
          );
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

  

  // if (loading) {
  //   return <div className="text-center py-10">Chargement des commandes...</div>;
  // }

  if (orders.length===0) {
    return (
      <div className="text-center py-10">
        Vous n'avez aucune commande à gérer.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gestion des commandes</h1>
      <div className="space-y-6">
        {orders.map((order)=>
          <SellerOrderCard
            order={order}
          />)}
      </div>
    </div>
  );
}
