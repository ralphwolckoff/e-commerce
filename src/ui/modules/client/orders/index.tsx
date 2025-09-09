import { FilterIcon } from "@/components/icons";
import OrderDetailModal from "@/ui/modules/client/orders/OrderModal";
import { Order } from "@/types/commands";
import { Button } from "@/ui/design/button/button";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";

interface ClientProps {
  orders: Order;
}

export const ClientOrderList = ({ orders }: ClientProps) => {
  const isShipped = orders.status === "SHIPPED";
  const isDelivered = orders.status === "DELIVERED";
  const isCanceled = orders.status === "CANCELED";

  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => {
    setShowModal(true);
  };

  console.log({ orders });

  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b border-gray-200 mb-4">
        <div>
          <p className="text-gray-500 text-sm">Order ID</p>
          <p className="font-bold text-gray-800">#{orders.id}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Date</p>
          <p className="font-bold text-gray-800">
            {format(new Date(orders.createdAt), "dd MMMM yyyy")}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Boutique</p>
          {/* Assurez-vous que l'objet customer est accessible, sinon ajustez cette ligne */}
          <p className="font-bold text-gray-800">
            {orders.store.name || "Boutique inconnu"}
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
            {orders.status}
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {orders.items?.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 p-2 bg-gray-50 rounded-md"
          >
            <div className="flex-1">
              <h3 className="text-md font-semibold text-gray-800">
                {item.product?.name}
              </h3>
              <p className="text-sm text-gray-600">
                Quantité : {item.quantity}
              </p>
              {/* Le prix unitaire est calculé à partir du priceAtOrder */}
              <p className="text-sm text-gray-600">
                Prix : ${item.priceAtOrder.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center space-x-4">
        <p className="text-lg font-bold text-gray-800">
          Total : ${orders.totalAmount?.toFixed(2)}
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
      <OrderDetailModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        order={orders}
      />
    </div>
  );
};
