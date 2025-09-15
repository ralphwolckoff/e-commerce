// "use client";

import { UserLayout } from "@/components/layout/user-layout";
import { useAuth } from "@/context/AuthContext";
import { orderService } from "@/services/orderService";
import { useAddressStore } from "@/store/addressStore";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/ui/design/button/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// import { useState } from "react";
// import { toast } from "react-toastify";
// import { useCartStore } from "@/store/cartStore";
// import { orderService } from "@/services/orderService";
// import { useRouter } from "next/navigation";
// import { Button } from "@/ui/design/button/button";
// import { UserLayout } from "@/components/layout/user-layout";
// import { useAddressStore } from "@/store/addressStore";
// import { useAuth } from "@/context/AuthContext";

// export default function CheckoutPage() {
//   const {address} = useAddressStore()
//   const {authUser} = useAuth()
//   const [isLoading, setIsLoading] = useState(false);
//   const {
//     items: cartItems,
//     totalPrice: cartTotalPrice,
//     clearCart,
//   } = useCartStore();
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     shippingAddress: "",
//     paymentMethod: "credit_card",
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleCheckout = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (cartItems.length === 0) {
//       toast.error("Votre panier est vide. Veuillez y ajouter des articles.");
//       return;
//     }

//     if (!formData.shippingAddress) {
//       toast.error("Veuillez renseigner une adresse de livraison.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Préparation des données pour la commande

//       const orderItems = cartItems.map((item) => {
//         return {
//           productId: item.productId,
//           quantity: item.quantity,
//         };
//       });
//       if (authUser && address) {
//         const payload = {
//           userId:authUser.id ,
//           addressId: address.id,
//           items: orderItems,
//         }
//         console.log({payload});
//         await orderService.createCommand(payload);
//         toast.success("Commande passée avec succès !");
//         clearCart();
//         router.push("/client/my-account/commands");
//       }else{
//         toast.error("veuiller renseigner ces champs");
//       };

//     } catch (error) {
//       console.error("Échec du paiement:", error);
//       toast.error("Échec du traitement de la commande. Veuillez réessayer.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <UserLayout withSidebar pageTitle="Payement">
//       {cartItems.length === 0 ?(
//       <div className="text-center py-10">
//         Votre panier est vide. <a href="/products" className="text-2xl font-bold">Retourner à la boutique</a>
//       </div>
//     ): (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Paiement</h1>
//       <form onSubmit={handleCheckout}>
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <h2 className="text-xl font-semibold mb-4">
//             Informations de livraison et de paiement
//           </h2>

//           <div className="mb-4">
//             <label
//               htmlFor="shippingAddress"
//               className="block text-gray-700 font-bold mb-2"
//             >
//               Adresse de livraison
//             </label>
//             <input
//               type="text"
//               id="shippingAddress"
//               name="shippingAddress"
//               value={formData.shippingAddress}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Ex: 123 Rue de la Commande, 75000 Paris"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="paymentMethod"
//               className="block text-gray-700 font-bold mb-2"
//             >
//               Méthode de paiement
//             </label>
//             <select
//               id="paymentMethod"
//               name="paymentMethod"
//               value={formData.paymentMethod}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             >
//               <option value="credit_card">Carte de crédit</option>
//               <option value="paypal">PayPal</option>
//             </select>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">
//             Récapitulatif de la commande
//           </h2>
//           {cartItems.map((item) => (
//             <div
//               key={item.productId}
//               className="flex justify-between items-center py-2 border-b"
//             >
//               <span>
//                 {item.product.name} (x{item.quantity})
//               </span>
//               <span>{item.priceAtOrder.toFixed(2)}€</span>
//             </div>
//           ))}
//           <div className="flex justify-between items-center py-4">
//             <span className="text-lg font-bold">Total:</span>
//             <span className="text-lg font-bold">
//               {cartTotalPrice.toFixed(2)}€
//             </span>
//           </div>
//         </div>

//         <div className="mt-8">
//           <Button
//             type="submit"
//             disabled={isLoading || cartItems.length === 0}
//             className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
//           >
//             {isLoading
//               ? "Traitement..."
//               : `Payer ${cartTotalPrice.toFixed(2)}€`}
//           </Button>
//         </div>
//       </form>
//     </div>)}
//     </UserLayout>
//   );
// }


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
  const fullAddress = address ? `${address.street || ""}-${address.city || ""}`.trim() : ""

  const [formData, setFormData] = useState({
    shippingAddress: fullAddress,
    paymentMethod: "credit_card",
  });
  const ad = authUser?.address?.state
  console.log({ad});
  useEffect(() => {
    if (address) {
      setFormData((prev) => ({
        ...prev,
        shippingAddress: fullAddress
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

  const handleCheckout = async () => {

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
          items: orderItems,
        };
      } else if (authUser){
        payload = {
          userId: authUser.id,
          shippingAddress: formData.shippingAddress,
          items: orderItems,
        };
      }

      if (!payload) {
        toast.error("Impossible de traiter la commande. Veuillez vérifier les informations.");
        setIsLoading(false);
        return;
      }
      console.log({payload});
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
      {orderComplete ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Commande passée avec succès !
          </h2>
          <p className="text-gray-600 mb-6">
            Merci pour votre achat. Vous recevrez bientôt une confirmation.
          </p>
          <a
            href="/products"
            className="text-lg font-bold text-primary-800 hover:underline"
          >
            Retourner à la boutique
          </a>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p>Votre panier est vide.</p>

          <a
            href="/products"
            className="text-lg font-bold text-primary-800 hover:underline"
          >
            Retourner à la boutique
          </a>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <form onSubmit={handleCheckout}>
            <div className="bg-white p-6  shadow-md mb-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">
                Informations de livraison et de paiement
              </h2>

              <div className="mb-4">
                <h3 className="block text-gray-700 font-bold mb-2">
                  Adresse de livraison
                </h3>
                {address && (
                  <div className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="addressChoice"
                        value="saved"
                        checked={useSavedAddress}
                        onChange={handleAddressChoice}
                        className="form-radio text-green-600"
                      />
                      <span className="ml-2">
                        Utiliser mon adresse enregistrée
                      </span>
                    </label>
                    <div className="ml-6 mt-2 p-3 bg-gray-100  rounded-xl">
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
                      className="form-radio text-green-600"
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
                    className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-green-500 rounded-xl"
                    placeholder="Ex: 123 Rue de la Commande, 75000 Paris"
                  />
                </div>
              )}

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
                  className="w-full px-3 py-2 border  focus:outline-none focus:ring-2 focus:ring-green-500 rounded-xl"
                >
                  <option value="credit_card">Carte de crédit</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
            </div>

            <div className="bg-white p-6 shadow-md rounded-xl">
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
                action={handleCheckout}
                disabled={isLoading || cartItems.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200"
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
