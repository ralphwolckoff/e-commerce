"use client";

import React, { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/ui/design/button/button";
import { Order } from "@/types/commands";
import { Status, Statuts } from "@/common/status.enum";
import { StatusUpdateModal } from "./status-updateModal";
import { orderService } from "@/services/orderService";
import { toast } from "react-toastify";

// Mise à jour de l'interface pour correspondre au type Commands
interface SellerOrderCardProps {
  order: Order;
}

export default function SellerOrderCard({ order }: SellerOrderCardProps) {
  const isShipped = order.status === "SHIPPED";
  const isDelivered = order.status === "DELIVERED";
  const isCanceled = order.status === "CANCELED";

  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => {
    setShowModal(true);
  };

  const handleUpdateStatus = async (newStatus: Status) => {
    const orderId = order?.id;
    if (orderId) {
      try {
        await orderService.updateCommandStatus(orderId, newStatus);
        toast.success(
          `Commande #${orderId} mise à jour avec le statut : ${newStatus}`
        );
      } catch (error) {
        console.error(
          "Échec de la mise à jour du statut de la commande:",
          error
        );
        toast.error("Échec de la mise à jour du statut de la commande.");
      }
    }
  };

  // Utilisation de Number() pour s'assurer que les calculs de prix sont corrects
  const totalOrderPrice = order.items?.reduce(
    (sum, item) => sum + item.priceAtOrder * item.quantity,
    0
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b border-gray-200 mb-4">
        <div>
          <p className="text-gray-500 text-sm">Order ID:</p>
          <p className="font-bold text-gray-800">{order.id}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Date</p>
          <p className="font-bold text-gray-800">
            {format(new Date(order.createdAt), "dd MMMM yyyy")}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Client</p>
          {/* Assurez-vous que l'objet customer est accessible, sinon ajustez cette ligne */}
          <p className="font-bold text-gray-800">
            {order.user?.profile?.firstName || "Client inconnu"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Statut</p>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              isShipped
                ? "bg-blue-100 text-blue-800"
                : isDelivered
                ? "bg-green-100 text-green-800"
                : isCanceled
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {order.items?.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 p-2 bg-gray-50 rounded-md"
          >
            <Image
              src={item.product?.images?.[0].url || "/placeholder.jpg"}
              alt="asd"
              width={64}
              height={64}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="text-md font-semibold text-gray-800">
                {item.product?.name}
              </h3>
              <p className="text-sm text-gray-600">
                Quantité : {item.quantity}
              </p>
              {/* Le prix unitaire est calculé à partir du priceAtOrder */}
              <p className="text-sm text-gray-600">
                Prix : {item.priceAtOrder.toFixed(2)} €
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center space-x-4">
        <p className="text-lg font-bold text-gray-800">
          Total : {totalOrderPrice.toFixed(2)} €
        </p>
        <Button
          size="small"
          action={openModal}
          // baseUrl={`/seller/track-order/${order.id}`}
          className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md font-semibold hover:bg-gray-300 transition duration-300"
          variant="outline"
        >
          Détails de la commande
        </Button>
      </div>
      <StatusUpdateModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        order={order}
        onsave={handleUpdateStatus}
      />
    </div>
  );
}
