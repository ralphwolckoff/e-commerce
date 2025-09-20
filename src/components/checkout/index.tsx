"use client";

import { UserLayout } from "@/components/layout/user-layout";
import { useAuth } from "@/context/AuthContext";
import { orderService } from "@/services/orderService";
import { useAddressStore } from "@/store/addressStore";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/ui/design/button/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import {
  CreditCardIcon,
  CurrencyEuroIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/solid";
import { Typography } from "@/ui/design/typography/Typography";

export default function CheckoutPage() {
  const { address } = useAddressStore();
  const { authUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    items: cartItems,
    totalPrice: cartTotalPrice,
    clearCart,
  } = useCartStore();
  const [useSavedAddress, setUseSavedAddress] = useState(!!address);
  const [orderComplete, setOrderComplete] = useState(false);
  const fullAddress = address
    ? `${address.street || ""}-${address.city || ""}`.trim()
    : "";

  const [formData, setFormData] = useState({
    shippingAddress: fullAddress,
    paymentMethod: "credit_card",
    mobileMoneyNumber: "",
  });
  useEffect(() => {
    if (address) {
      setFormData((prev) => ({
        ...prev,
        shippingAddress: fullAddress,
      }));
      setUseSavedAddress(true);
    }
  }, [address]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSaved = e.target.value === "saved";
    setUseSavedAddress(isSaved);
    if (isSaved) {
      setFormData((prev) => ({
        ...prev,
        shippingAddress: fullAddress || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        shippingAddress: "",
      }));
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Votre panier est vide. Veuillez y ajouter des articles.");
      return;
    }

    if (useSavedAddress && !address) {
      toast.error(
        "Vous n'avez pas d'adresse enregistrée. Veuillez en saisir une nouvelle."
      );
      return;
    }

    if (!formData.shippingAddress) {
      toast.error("Veuillez renseigner une adresse de livraison.");
      return;
    }

    setIsLoading(true);
    try {
      const orderItems = cartItems.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      });

      let payload;
      if (useSavedAddress && address && authUser) {
        payload = {
          userId: authUser.id,
          addressId: address.id,
          mobileMoneyNumber: Number(formData.mobileMoneyNumber),
          paymentMethod: formData.paymentMethod,
          items: orderItems,
        };
      } else if (authUser) {
        payload = {
          userId: authUser.id,
          shippingAddress: formData.shippingAddress,
          paymentMethod: formData.paymentMethod,
          mobileMoneyNumber: 0,
          items: orderItems,
        };
        if (
          formData.paymentMethod === "orange_money" ||
          formData.paymentMethod === "mtn_money"
        ) {
          if (!formData.mobileMoneyNumber) {
            toast.error(
              "Veuillez entrer votre numéro de téléphone mobile money."
            );
            setIsLoading(false);
            return;
          }
          payload.mobileMoneyNumber = Number(formData.mobileMoneyNumber);
        }
      }

      if (!payload) {
        toast.error(
          "Impossible de traiter la commande. Veuillez vérifier les informations."
        );
        setIsLoading(false);
        return;
      }

      await orderService.createCommand(payload);
      toast.success("Commande passée avec succès !");
      clearCart();
      setOrderComplete(true);
    } catch (error) {
      console.error("Échec du paiement:", error);
      toast.error("Échec du traitement de la commande. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserLayout withSidebar pageTitle="Paiement">
           {" "}
      {orderComplete ? (
        <div className="text-center py-20">
                   {" "}
          <h2 className="text-2xl font-bold text-green-600 mb-4">
                        Commande passée avec succès !          {" "}
          </h2>
                   {" "}
          <p className="text-gray-600 mb-6">
                        Merci pour votre achat. Vous recevrez bientôt une
            confirmation.          {" "}
          </p>
                   {" "}
          <Link
            href="/products"
            className="text-lg font-bold text-primary-800 hover:underline"
          >
                        Retourner à la boutique
          </Link>
                 {" "}
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-10">
                    <p>Aucune transaction à effectuer.</p>         {" "}
          <Link
            href="/products"
            className="text-lg font-bold text-primary-800 hover:underline"
          >
                        Retourner à la boutique          {" "}
          </Link>
                 {" "}
        </div>
      ) : (
        <div className=" mx-auto px-4  w-full">
             
          <form onSubmit={handleCheckout}>
            {/* SECTION 1: Adresse de livraison */} 
            <div className="flex ">
              <div className="p-6 shadow-md mb-6 rounded-xl">
                <Typography
                  variant="lead"
                  component="h2"
                  className="font-semibold mb-4"
                >
                  Informations de livraison
                </Typography>
                <div className="mb-4 pb-5">
                  <Typography
                    variant="caption3"
                    component="h3"
                    theme="gray"
                    className="font-bold mb-2 pb-5"
                  >
                    Adresse de livraison
                  </Typography>
                  {address && (
                    <div className="mb-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="addressChoice"
                          value="saved"
                          checked={useSavedAddress}
                          onChange={handleAddressChoice}
                          className="form-radio text-green-600 rounded-full"
                        />
                        <span className="ml-2">
                          Utiliser mon adresse enregistrée
                        </span>
                      </label>
                      <div className="ml-6 mt-2 p-3 bg-gray-100 rounded-xl">
                        {fullAddress}
                      </div>
                    </div>
                  )}
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="addressChoice"
                        value="new"
                        checked={!useSavedAddress}
                        onChange={handleAddressChoice}
                        className="form-radio text-green-600 rounded-full"
                      />
                      <span className="ml-2">Entrer une nouvelle adresse</span> 
                    </label>
                  </div>
                </div>
                {!useSavedAddress && (
                  <div className="mb-4">
                    <label
                      htmlFor="shippingAddress"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Nouvelle adresse
                    </label>
                    <input
                      type="text"
                      id="shippingAddress"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-green-500 rounded-xl"
                      placeholder="Ex: 123 Rue de la Commande, 75000 Paris"
                    />
                  </div>
                )}
                           
              </div>
              {/* SECTION 2: Méthodes de paiement */}             
              <div className="p-6 shadow-md mb-6 rounded-xl">
                <Typography
                  variant="lead"
                  component="h2"
                  className="font-semibold mb-4"
                >
                  Informations de paiement
                </Typography>
                <div className="mb-4 pb-5 ">
                               
                  <label
                    htmlFor="paymentMethod"
                    className="block text-gray-700 font-bold mb-2 pb-4"
                  >
                    Méthode de paiement              
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-green-500 rounded-xl"
                  >
                    <option value="credit_card">Carte de crédit</option>       
                    <option value="paypal">PayPal</option>           
                    <option value="cash">Paiement à la livraison (Cash)</option>
                    <option value="orange_money">Orange Money</option>         
                    <option value="mtn_money">MTN Mobile Money</option> 
                  </select>
                </div>
                {/* Champs conditionnels en fonction de la méthode de paiement */}
                <div className="mt-4 p-4 border rounded-xl bg-gray-50">
                  <div className="space-x-2 mb-2">
                                     
                    {formData.paymentMethod === "credit_card" && (
                      <CreditCardIcon className="h-6 w-6 text-gray-500" />
                    )}
                    {formData.paymentMethod === "cash" && (
                      <CurrencyEuroIcon className="h-6 w-6 text-gray-500" />
                    )}
                    {(formData.paymentMethod === "orange_money" ||
                      formData.paymentMethod === "mtn_money") && (
                      <DevicePhoneMobileIcon className="h-6 w-6 text-gray-500" />
                    )}
                    <Typography
                      variant="caption3"
                      component="h3"
                      theme="gray"
                      className="font-bold mb-2 pb-5"
                    >
                      Détails de paiement
                    </Typography>
                  </div>
                  {(() => {
                    switch (formData.paymentMethod) {
                      case "credit_card":
                        return (
                          <div className="text-gray-500 text-sm">
                            Entrez les informations de votre carte de crédit.
                          </div>
                        );
                      case "paypal":
                        return (
                          <div className="text-gray-500 text-sm">
                            Vous serez redirigé vers le site de PayPal pour
                            finaliser votre paiement.
                          </div>
                        );
                      case "cash":
                        return (
                          <div className="text-gray-500 text-sm">
                            Le paiement sera effectué en espèces à la livraison.
                          </div>
                        );
                      case "orange_money":
                      case "mtn_money":
                        return (
                          <div className="space-y-2">
                            <label
                              htmlFor="mobileMoneyNumber"
                              className="block text-gray-700 font-medium"
                            >
                              Numéro de téléphone Mobile Money                  
                            </label>
                            <input
                              type="text"
                              id="mobileMoneyNumber"
                              name="mobileMoneyNumber"
                              value={formData.mobileMoneyNumber}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="Ex: 699 99 99 99"
                            />
                          </div>
                        );
                      default:
                        return null;
                    }
                  })()}
                </div>
              </div>
            </div>
                        {/* SECTION 3: Récapitulatif de la commande */}         
             
            <div className="bg-white p-6 shadow-md rounded-xl mt-6">
              <Typography
                variant="lead"
                component="h2"
                className="font-semibold mb-4"
              >
                Récapitulatif de la commande
              </Typography>
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <Typography variant="caption3" component="span">
                    {item.product.name} (x{item.quantity})
                  </Typography>
                  <Typography variant="caption3" component="span" theme="gray">
                    {item.priceAtOrder.toFixed(2)}€
                  </Typography>
                </div>
              ))}
              <div className="flex justify-between items-center py-4">
                <Typography
                  theme="gray"
                  variant="body-lg"
                  component="span"
                  className="font-bold"
                >
                  Total:
                </Typography>
                <Typography
                  theme="gray"
                  variant="body-lg"
                  component="span"
                  className="font-bold"
                >
                  {cartTotalPrice.toFixed(2)}€
                </Typography>
              </div>
              <Button
                type="submit"
                disabled={isLoading || cartItems.length === 0}
                className="w-full rounded-xl transition-all duration-200"
              >
                {isLoading
                  ? "Traitement..."
                  : `Payer ${cartTotalPrice.toFixed(2)}€`}
              </Button>
            </div>
          </form>
        </div>
      )}
    </UserLayout>
  );
}
