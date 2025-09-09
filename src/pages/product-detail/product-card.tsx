"use client";

import { Product } from "@/types/products";
import Image from "next/image";
import { useState } from "react";
import ProductModal from "./[id]";
import { Button } from "@/ui/design/button/button";
import { EyeIcon, HeartIcon } from "@/components/icons";
import { Typography } from "@/ui/design/typography/Typography";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/common/role.enum";

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { FaShoppingCart } from "react-icons/fa";
// import { Button } from "@/ui/design/button/button";
// import { Role } from "@/common/role.enum";
// import { useRouter } from "next/router";
// import { useCartStore } from "@/store/cartStore";
// import { Product } from "@/types/products";
// import { toast } from "react-toastify";
// import { Typography } from "@/ui/design/typography/Typography";
// import { useAuth } from "@/context/AuthContext";

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const { authUser, authUserIsLoading } = useAuth();
//   const router = useRouter();
//   const { addItem } = useCartStore();

//   const mainImage =
//     product.images && product.images.length > 0 ? product.images[0] : null;
//   const imageUrl = mainImage?.url || "/assets/imgs/maison.jpg";

//   return (
//     <div className="">
//       <Link href={`/product-detail/${product.id}`}>
//         <div className="relative w-full rounded-lg hover:shadow-md/50 overflow-hidden h-90">
//           <Image
//             src={imageUrl}
//             alt={product.name}
//             layout="fill"
//             objectFit="cover"
//             className=""
//           />
//         </div>
//       </Link>
//       <div className="p-4">
//         <div className="flex justify-between items-start mb-2">
//           <Link href={`/product-detail/${product.id}`}>
//             <Typography
//               variant="lead"
//               component="h5"
//               className=" hover:font-bold"
//             >
//               {product.name}
//             </Typography>
//           </Link>
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <Typography variant="body-sm" component="span">
//             Price
//           </Typography>
//           <Typography variant="body-lg" component="p">
//             ${Number(product.price).toFixed(2)}
//           </Typography>
//         </div>
//         <div className="flex justify-start mb-5">
//           <Typography variant="body-sm" component="p">
//             {product.description}
//           </Typography>
//         </div>
//         <div className="flex justify-start">
//           <Button
//             size="very-small"
//             baseUrl={
//               authUserIsLoading && authUser?.role === Role.CLIENT
//                 ? "/cart"
//                 : "/connexion"
//             }
//             action={() => {
//               addItem(product, 1);
//               toast.success(`${product.name} ajouté au panier !`);
//             }}
//             className="rounded-[10px]"
//           >
//             {router.asPath ==="/" ? "Buy now": "Ajouter au panier"}
            
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }


interface ProductCardProps {
   product: Product;
   viewMode: string;
 }

export const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const { addItem } = useCartStore();
  const {isAuthenticated,  user} = useAuthStore()

   const [isHovered, setIsHovered] = useState(false);
   const [showModal, setShowModal] = useState(false)
   const onOpenModal = () =>{
    setShowModal(true)
   }
   
     const handleAddToCart = (product: Product) =>{
       if (isAuthenticated && user?.role===Role.CLIENT) {
         addItem(product, 1)
       }else{
         return
       }
   
     }

   // Rendu conditionnel des cartes de produits en fonction du mode de vue
   if (viewMode === "list") {
     return (
       <div
         className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 w-full"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
       >
         <div className="relative flex-shrink-0">
           <Image
             src={
               product.images?.[0]?.url ||
               "https://placehold.co/200x200/E2E8F0/1A202C?text=No+Image"
             }
             alt={product.name}
             width={96}
             height={96}
             className="h-50 w-full object-contain rounded-lg"
           />
           <div
             className={`absolute left-0 bottom-0  w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200  ${
               isHovered
                 ? "opacity-100 translate-y-5"
                 : "opacity-0 pointer-events-none translate-y-10"
             } `}
           >
             <button
               onClick={onOpenModal}
               className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-200 transition-colors"
             >
               <EyeIcon className="w-5 h-5" />
             </button>
             <Button action={() => handleAddToCart(product)} size="very-small">Add to cart</Button>
             <button className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-200 transition-colors">
               <HeartIcon className="w-5 h-5" />
             </button>
           </div>
         </div>
         <div className="flex-1">
           <h3 className="text-lg font-semibold text-gray-800">
             {product.name}
           </h3>
           <div className="flex items-center space-x-2 mb-4">
             <span className="text-xl font-bold text-gray-900">
               ${Number(product.price)}
             </span>
           </div>
         </div>
         <ProductModal
           isOpen={showModal}
           onClose={() => setShowModal(false)}
           productId={product.id}
         />
       </div>
     );
   }

   return (
     <div className="group w-full max-w-sm rounded-lg overflow-hidden bg-white shadow-md p-4 flex flex-col items-center">
       <div className="relative overflow-hidden flex items-center justify-center rounded-lg  min-h-[270px] mb-4 w-full">
         <img
           src={product.images?.[0].url}
           alt={product.name}
           width={250}
           height={250}
         />
         <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
             <button
               onClick={onOpenModal}
               aria-label="button for quick view"
               className="flex items-center justify-center w-9 h-9 rounded-full shadow-md transition-colors text-gray-800 bg-white hover:bg-gray-200"
             >
               <EyeIcon className="w-5 h-5" />
             </button>
           <Button action={() => handleAddToCart(product)} size="very-small">Add to cart</Button>
           <button
             aria-label="button for favorite select"
             className="flex items-center justify-center w-9 h-9 rounded-full shadow-md transition-colors text-gray-800 bg-white hover:bg-gray-200"
           >
             <HeartIcon className="w-5 h-5" />
           </button>
         </div>
       </div>
       <div className="text-center">
         <Typography variant="h5" component="h3" className="font-semibold">
           {product.name}
         </Typography>
         <span className="flex items-center justify-center gap-2 font-medium text-lg">
           <Typography
             variant="body-lg"
             component="span"
             theme="secondary"
             className="font-bold"
           >
             ${Number(product.price)}
           </Typography>{" "}
         </span>
       </div>
       <ProductModal isOpen={showModal} onClose={() => setShowModal(false)} productId={product.id} />
     </div>
   );
 };