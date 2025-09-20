import React from "react";
import Image from "next/image";
import { CartItem, useCartStore } from "@/store/cartStore";
import { MinusIcon, PlusIcon } from "../icons";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Typography } from "@/ui/design/typography/Typography";

interface SingleItemProps {
  item: CartItem;
}

const SingleItem = ({ item }: SingleItemProps) => {
  const { items, removeItem, updateItemQuantity } = useCartStore();

  const handleRemoveFromCart = () => {
    removeItem(item.productId);
  };

  const handleQuantityChange = (productId: string, amount: number) => {
      const item = items.find((i) => i.productId === productId);
      if (item) {
        const newQuantity = item.quantity + amount;
  
        if (newQuantity <= 0) {
          removeItem(productId);
          toast.info("Article retiré du panier.");
          return;
        }
  
        updateItemQuantity(productId, newQuantity);
      }
    };

  return (
    <div
      key={item.productId}
      className="flex items-center justify-between overflow-auto border-b border-gray-300"
    >
      <div className="flex items-center space-x-2">
        <Image
          src={
            item.product?.images?.[0].url ||
            "https://placehold.co/80x80/E2E8F0/A0AEC0?text=Image"
          }
          alt={item.product.name}
          width={80}
          height={80}
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 ">
        <p className="font-semibold">{item.product.name}</p>
        <div className="flex gap-5">
          <Typography variant="caption3" component="span">quantite: {item.quantity}</Typography>
          
          <div className="flex items-center justify-start">
            <button
              onClick={() => handleQuantityChange(item.productId, -1)}
              className="px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-l-md"
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1}
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="px-3 py-1 border-t border-b border-gray-300 text-sm font-semibold text-gray-800">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.productId, 1)}
              className="px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-r-md"
              aria-label="Increase quantity"
              disabled={item.quantity >= item.product.stock}
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pr-4">
        <button
          onClick={() => handleRemoveFromCart()}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
