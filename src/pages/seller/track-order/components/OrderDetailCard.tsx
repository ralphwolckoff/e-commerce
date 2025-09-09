import React from "react";
import { format } from "date-fns";
import Image from "next/image";
import { Status, Statut } from "@/common/status.enum";
import { Order } from "@/types/commands";
import clsx from "clsx";

interface OrderDetailCardProps {
  command: Order;
}

export default function OrderDetailCard({ command }: OrderDetailCardProps) {
  const isPending = command.status === "PENDING";
  const isShipped =command.status === "SHIPPED";
  const isDelivered = command.status === "DELIVERED";
  const isCanceled = command.status === "CANCELED"

  // Fonction utilitaire pour formater les dates de manière élégante
  const formatDate = (dateString: string | undefined) => {
    return dateString
      ? format(new Date(dateString), "dd MMMM yyyy HH:mm")
      : "N/A";
  };
 console.log({command});
  // Définir la couleur du statut
  const getStatusColor = (status: Status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "SHIPPED":
        return "bg-blue-100 text-blue-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold">
              Commande #{command.orderNumber}
            </h2>
            <p className="text-gray-500">
              Date de la commande: {formatDate(String(command?.createdAt))}
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
              command.status
            )}`}
          >
            {command.status}
          </span>
        </div>
      </div>
      <div className=" space-y-10 p-8 rounded-lg shadow-xl">
        {/* Étapes du suivi */}
        <div className="flex justify-between items-center relative py-6">
          <div
            className={`flex flex-col items-center ${
              isPending ? "text-green-500" : "text-gray-400"
            }`}
          >
            <div
              className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 ",
                isPending ? "border-green-500" : "border-gray-500"
              )}
            >
              ✔
            </div>
            <span className="text-sm mt-1">En attente</span>
            <p className="text-gray-500">
              {formatDate(String(command?.createdAt))}
            </p>
          </div>

          <div
            className={`flex flex-col items-center ${
              isShipped ? "text-green-500" : "text-gray-400"
            }`}
          >
            <div
              className={clsx(
                "w-20 h-20 rounded-full flex items-center justify-center border border-white bg-white "
              )}
            >
              <div
                className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 ",
                  isShipped ? "border-green-500" : "border-gray-500"
                )}
              >
                ✔
              </div>
            </div>
            <span className="text-sm mt-1">Expédié</span>
            {isShipped && (
              <p className="text-xs text-gray-600 mt-1">
                {formatDate(String(command.updatedAt))}
              </p>
            )}
          </div>
          <div
            className={`flex flex-col items-center ${
              isDelivered ? "text-green-500" : "text-gray-400"
            }`}
          >
            <div
              className={clsx(
                "w-20 h-20 rounded-full flex items-center justify-center border border-white bg-white "
              )}
            >
              <div
                className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 ",
                  isDelivered ? "border-green-500" : "border-gray-500"
                )}
              >
                ✔
              </div>
            </div>
            <span className="text-sm mt-1">Livrée</span>
            {isDelivered && (
              <p className="text-xs text-gray-600 mt-1">
                {formatDate(String(command.updatedAt))}
              </p>
            )}
          </div>

          <div
            className={`flex flex-col items-center ${
              isCanceled ? "text-green-500" : "text-gray-400"
            }`}
          >
            <div
              className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 ",
                isCanceled ? "border-green-500" : "border-gray-500"
              )}
            >
              ✔
            </div>
            <span className="text-sm mt-1">Annulée</span>
            {isCanceled && (
              <p className="text-xs text-gray-600 mt-1">
                {formatDate(String(command.updatedAt))}
              </p>
            )}
          </div>

          {/* Lignes de progression */}
          <div
            className={`absolute top-1/2 left-[10%] right-[10%] -translate-y-1/2 h-1 bg-gray-200 -z-1`}
          >
            <div
              className={`h-full ${isShipped ? "bg-green-500" : isDelivered ? "bg-green-500" : ""}`}
              style={{ width: isCanceled ? "100%" : isDelivered? "75%" : "40%" }}
            ></div>
          </div>
        </div>
      </div>
      <div className=" space-y-10 p-8 rounded-md shadow-md">
        {/* Détails des articles */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Articles de la commande</h3>
          {command.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 mb-4 border-b pb-4"
            >
              <Image
                src={item.product?.images?.[0].url || "/placeholder.jpg"}
                alt="dert"
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.product?.name}</p>
                <p className="text-sm text-gray-600">
                  Quantité: {item.quantity}
                </p>
                {/* <p className="text-sm text-gray-600">Statut: {item.itemStatus}</p> */}
              </div>
              <p className="font-bold text-lg">
                ${(Number(item.product?.price)*item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
