"use client";

import React, { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/ui/design/button/button";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";



export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateItemQuantity } =
    useCartStore();

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<{
    productId: string;
    newQuantity: number;
    productName: string;
  } | null>(null);

  if (items.length === 0) {
    return <div className="text-center py-10">Votre panier est vide.</div>;
  }

  const handleQuantityChange = (productId: string, amount: number) => {
    const item = items.find((i) => i.productId === productId);
    if (item) {
      const newQuantity = item.quantity + amount;
      const availableStock = item.product.stock;

      if (newQuantity <= 0) {
        removeItem(productId);
        toast.info("Article retiré du panier.");
        return;
      }

      if (newQuantity > availableStock) {
        setModalData({
          productId: productId,
          newQuantity: availableStock,
          productName: item.product.name,
        });
        setShowModal(true);
        return;
      }

      updateItemQuantity(productId, newQuantity);
    }
  };

  const handleConfirmModal = () => {
    if (modalData) {
      updateItemQuantity(modalData.productId, modalData.newQuantity);
      toast.info(
        `La quantité de ${modalData.productName} a été ajustée au stock maximal.`
      );
      setModalData(null);
      setShowModal(false);
    }
  };

  const handleCancelModal = () => {
    setModalData(null);
    setShowModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mon Panier</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="hidden md:grid grid-cols-5 gap-4 py-3 border-b border-gray-200 font-semibold text-gray-600 text-sm">
          <div>Produit</div>
          <div className="text-center">Prix</div>
          <div className="text-center">Quantité</div>
          <div className="text-center">Sous-total</div>
          <div className="text-right">Action</div>
        </div>

        {items.map((item) => (
          <div
            key={item.productId}
            className="grid grid-cols-6 items-center border-b border-gray-300"
          >
            <div className="col-span-2 flex items-center space-x-4">
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
              <p className="font-semibold">{item.product.name}</p>
            </div>

            <div className="text-left text-gray-600">
              ${Number(item.product.price).toFixed(2)}
            </div>

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

            <div className="text-center font-bold text-gray-800">
              ${(Number(item.product.price) * item.quantity).toFixed(2)}
            </div>

            <div className="flex justify-end pr-4">
              <button
                onClick={() => removeItem(item.productId)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary Section */}
      <div className="flex flex-col md:flex-row justify-between gap-8 mt-8">
        <div className="w-full md:w-1/2">
          {/* Placeholder for shipping/coupon */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Résumé de la commande
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Article</span>
              {totalItems < 2 ? (
                <span className="font-semibold text-gray-800">
                  {totalItems} article
                </span>
              ) : (
                <span> {totalItems} articles</span>
              )}
            </div>
            {/* You can add shipping, tax here */}
            <div className="flex justify-between items-center py-2 pt-4 border-t border-gray-200">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <Link href="/checkout">
            <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors">
              Procéder au paiement
            </Button>
          </Link>
        </div>
      </div>

      <Modal
        show={showModal && modalData !== null}
        title="Stock insuffisant"
        message={
          modalData
            ? `Il ne reste que ${modalData.newQuantity} articles de ${modalData.productName} en stock. Voulez-vous ajuster la quantité à ce maximum ?`
            : ""
        }
        onConfirm={handleConfirmModal}
        onCancel={handleCancelModal}
      />
    </div>
  );
}

interface ModalProps {
  show:boolean
  title:string
  message:string
  onConfirm:()=>void
  onCancel: () => void

}
const Modal = ({ show, title, message, onConfirm, onCancel }:ModalProps) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="relative p-8 bg-white w-96 rounded-lg shadow-xl">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};
