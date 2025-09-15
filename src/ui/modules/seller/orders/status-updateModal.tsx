import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "./modal";
import { Status } from "@/common/status.enum";
import { Order } from "@/types/commands";
import Image from "next/image";
import { Button } from "@/ui/design/button/button";
import { Typography } from "@/ui/design/typography/Typography";
import { Address } from "@/types/address";
import { addressService } from "@/services/addressService";

interface StatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onsave: (status: Status)=>void
 
}

export const StatusUpdateModal = ({
  isOpen,
  onClose,
  onsave,
  order,
}: StatusUpdateModalProps) => {
  // const [address , setAddress] = useState<Address| null>(null)
  const [newStatus, setNewStatus] = useState<Status>(
    order?.status || "PENDING"
  );

  

  // const fetchAddress =async ()=>{
  //   try {
  //     if (order?.addressId) {
  //       const addressId = order.userId
  //       const address = await addressService.getAddressById(addressId)
  //       console.log({address});
  //       setAddress(address)
  //     }
  //   } catch (error) {
  //     console.log("echec de recuperation de l'address");
  //   }
  // }

  useEffect(() => {
    if (order) {
      // fetchAddress()
      setNewStatus(order.status);
      // setDeliveryDate(order.deliveryDate || "");
    }
  }, [order]);

  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault();
    onsave(newStatus)
  }
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Order #{order?.orderNumber}
      </h3>
      <div className="space-y-4 mb-6">
        {order?.items?.map((item) => (
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
                stock actuel : {item.product?.stock}
              </p>
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-4">
          <Typography variant="caption3" component="span">
            <span className="font-semibold text-gray-800">
              Address de livraison:
            </span>
            {order?.address
              ? `${order.address.street} - ${order.address.city}`
              : order?.shippingAddress
                ? order.shippingAddress
                : "Adresse non disponible"}
          </Typography>
          <Typography variant="caption3" component="span">
            <span className="font-semibold text-gray-800">
              Contact du client:{" "}
            </span>
            {order?.user?.profile?.phoneNumber}
          </Typography>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Nouvelle Status
          </label>
          <select
            id="status"
            name="status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as Status)}
            className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="PENDING">En Attente</option>
            <option value="SHIPPED">Expédiée</option>
            <option value="DELIVERED">Livrée</option>
            <option value="CANCELED">Annulée</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            size="small"
            type="button"
            variant="outline"
            action={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Annuler
          </Button>
          <Button
            size="small"
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 transition-colors"
          >
            Enregistrer
          </Button>
        </div>
      </form>
    </Modal>
  );
};
