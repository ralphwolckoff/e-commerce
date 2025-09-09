"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/cartStore";
import { orderService } from "@/services/orderService";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/design/button/button";
import { UserLayout } from "@/components/layout/user-layout";
import { useAddressStore } from "@/store/addressStore";
import { useAuth } from "@/context/AuthContext";
import { useStoreStore } from "@/store/storeStore";
import { useProductStore } from "@/store/productStore";

export default function CheckoutPage() {
  const {address} = useAddressStore()
  const {authUser} = useAuth()
  const {products} = useProductStore()
  const [isLoading, setIsLoading] = useState(false);
  const {
    items: cartItems,
    totalPrice: cartTotalPrice,
    clearCart,
  } = useCartStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    shippingAddress: "",
    paymentMethod: "credit_card",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Votre panier est vide. Veuillez y ajouter des articles.");
      return;
    }

    if (!formData.shippingAddress) {
      toast.error("Veuillez renseigner une adresse de livraison.");
      return;
    }

    setIsLoading(true);
    try {
      // Préparation des données pour la commande

      const orderItems = cartItems.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      });
      if (authUser && address) {
        const payload = {
          userId:authUser.id ,
          addressId: address.id,
          items: orderItems,
        }
        console.log({payload});
        await orderService.createCommand(payload);
        toast.success("Commande passée avec succès !");
        clearCart();
        router.push("/client/my-account/commands");
      }else{
        toast.error("veuiller renseigner ces champs");
      };

    } catch (error) {
      console.error("Échec du paiement:", error);
      toast.error("Échec du traitement de la commande. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserLayout withSidebar pageTitle="Payement">
      {cartItems.length === 0 ?(
      <div className="text-center py-10">
        Votre panier est vide. <a href="/products" className="text-2xl font-bold">Retourner à la boutique</a>
      </div>
    ): (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Paiement</h1>
      <form onSubmit={handleCheckout}>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Informations de livraison et de paiement
          </h2>

          <div className="mb-4">
            <label
              htmlFor="shippingAddress"
              className="block text-gray-700 font-bold mb-2"
            >
              Adresse de livraison
            </label>
            <input
              type="text"
              id="shippingAddress"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: 123 Rue de la Commande, 75000 Paris"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="paymentMethod"
              className="block text-gray-700 font-bold mb-2"
            >
              Méthode de paiement
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="credit_card">Carte de crédit</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Récapitulatif de la commande
          </h2>
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center py-2 border-b"
            >
              <span>
                {item.product.name} (x{item.quantity})
              </span>
              <span>{item.priceAtOrder.toFixed(2)}€</span>
            </div>
          ))}
          <div className="flex justify-between items-center py-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold">
              {cartTotalPrice.toFixed(2)}€
            </span>
          </div>
        </div>

        <div className="mt-8">
          <Button
            type="submit"
            disabled={isLoading || cartItems.length === 0}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
          >
            {isLoading
              ? "Traitement..."
              : `Payer ${cartTotalPrice.toFixed(2)}€`}
          </Button>
        </div>
      </form>
    </div>)}
    </UserLayout>
  );
}
