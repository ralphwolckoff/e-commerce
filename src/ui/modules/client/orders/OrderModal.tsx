import React from "react";
import { Order } from "@/types/commands";
import Image from "next/image";
import { format } from "date-fns";
import { Modal } from "../../../../components/MyAccount/modal";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

const OrderDetailModal = ({ isOpen, onClose, order }: OrderModalProps) => {
  const isPending = order.status === "PENDING";
  const isShipped = order.status === "SHIPPED";
  const isDelivered = order.status === "DELIVERED";
  const isCanceled = order.status === "CANCELED";

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    // `new Date` peut recevoir une chaîne ISO
    return format(new Date(dateString), "dd MMMM yyyy HH:mm");
  };

  const totalOrderPrice = order.items?.reduce(
    (sum, item) => sum + item.priceAtOrder * item.quantity,
    0
  );

  const phone = order.store.user?.profile?.firstName;
  console.log({ phone });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="bg-white p-8 ">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div className="max-w-[350px]">
            <h2 className="text-xl font-bold truncate ">
              Commande: {order.id}
            </h2>
            <p className="text-gray-500">
              Date de la commande: {formatDate(String(order.createdAt))}
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-full font-semibold ${
              isPending
                ? "bg-yellow-100 text-yellow-800"
                : isShipped
                ? "bg-blue-100 text-blue-800"
                : isDelivered
                ? "bg-green-100 text-green-800"
                : isCanceled
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="flex justify-between items-center relative py-6">
          <div
            className={`flex flex-col items-center z-10 ${
              !isPending ? "text-green-500" : "text-gray-400"
            }`}
          >
            <div className="w-20 h-20 rounded-full flex justify-center  bg-white -z-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-green-500 bg-white">
                ✔
              </div>
            </div>
            <span className="text-sm mt-1">En attente</span>
            <p className="text-xs text-gray-600 mt-1">
              {formatDate(String(order.createdAt))}
            </p>
          </div>

          <div
            className={`flex flex-col items-center z-10 ${
              isShipped || isDelivered
                ? "text-green-500"
                : isCanceled
                ? "border-red-500"
                : "border-gray-400"
            }`}
          >
            <div className="w-20 h-20 rounded-full flex justify-center  bg-white -z-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white ${
                  isShipped || isDelivered
                    ? "border-green-500"
                    : isCanceled
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              >
                ✔
              </div>
            </div>
            <span className="text-sm mt-1">Expédié</span>
            {isShipped && (
              <p className="text-xs text-gray-600 mt-1">
                {formatDate(String(order.updatedAt))}
              </p>
            )}
          </div>

          <div
            className={`flex flex-col items-center z-10 ${
              isDelivered
                ? "text-green-500"
                : isCanceled
                ? "border-red-500"
                : "border-gray-400"
            }`}
          >
            <div className="w-20 h-20 rounded-full flex justify-center  bg-white -z-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white ${
                  isDelivered
                    ? "border-green-500"
                    : isCanceled
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              >
                ✔
              </div>
            </div>
            <span className="text-sm mt-1">Livré</span>
            {isDelivered && (
              <p className="text-xs text-gray-600 mt-1">
                {formatDate(String(order.updatedAt))}
              </p>
            )}
          </div>

          <div
            className={`flex flex-col items-center z-10 ${
              isCanceled ? "text-red-500" : "text-gray-400"
            }`}
          >
            <div className="w-20 h-20 rounded-full flex justify-center  bg-white -z-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white ${
                  isCanceled ? "border-red-500" : "border-gray-400"
                }`}
              >
                ✔
              </div>
            </div>
            <span className="text-sm mt-1">Annulée</span>
            {isCanceled && (
              <p className="text-xs text-gray-600 mt-1">
                {formatDate(String(order.updatedAt))}
              </p>
            )}
          </div>

          <div
            className={`absolute top-1/2 left-[10%] right-[10%] -translate-y-1/2 h-1 bg-gray-200`}
          >
            <div
              className={`h-full transition-all duration-500 ease-in-out ${
                isShipped || isDelivered
                  ? "bg-green-500"
                  : isCanceled
                  ? "bg-red-600"
                  : ""
              }`}
              style={{
                width: isCanceled ? "100%" : isDelivered ? "70%" : "40%",
              }}
            ></div>
          </div>
        </div>

        <div className="mt-8">
          <div>
            <h3 className="text-center text-lg font-bold mb-4">Boutique:</h3>
            <div className="pb-5">
              <div className="flex justify-between">
                <span className="font-bold">Nom:</span>
                <span className="font-bold">Address: </span>
                <span className="font-bold">Contact:</span>
              </div>
              <div className="flex justify-between">
                <span>{order.store.name}</span>
                <span>{order.store.address} </span>
                <span>{order.store.user?.profile?.phoneNumber} </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold mb-4">Articles de la commande</h3>
            <h3 className="text-lg font-bold mb-4">Subtotal</h3>
          </div>

          {order?.items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 mb-4 border-b pb-4"
            >
              <Image
                src={item.product?.images?.[0].url || "/placeholder.jpg"}
                alt="aqw"
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.product?.name}</p>
                <p className="text-sm text-gray-600">
                  Quantité: {item.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  Prix unitaire:
                  {item.priceAtOrder.toFixed(2)} €
                </p>
              </div>
              <p className="font-bold text-lg">
                {(item.priceAtOrder * item.quantity).toFixed(2)} €
              </p>
            </div>
          ))}
        </div>
        <p className="text-lg font-bold text-gray-800">
          Total : {totalOrderPrice?.toFixed(2)} €
        </p>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
