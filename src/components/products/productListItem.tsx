"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/products";
import { Button } from "@/ui/design/button/button";
import { Typography } from "@/ui/design/typography/Typography";
import ProductModal from "@/components/products/product-detail/[id]";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/router";
import { useCartStore } from "@/store/cartStore";
import { Role } from "@/common/role.enum";
import { toast } from "react-toastify";
import { EyeIcon, HeartIcon } from "../icons";

const ProductListItem = ({ item }: { item: Product }) => {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const { addItem } = useCartStore();

  const onOpenModal = () => {
    setShowModal(true);
  };

  // add to cart
  const handleAddToCart = () => {
    if (isAuthenticated && user?.role === Role.CLIENT) {
      addItem(item, 1);
    } else if (isAuthenticated && user?.role === Role.VENDOR) {
      return;
    } else {
      toast.info("Veuillez vous connecter pour ajouter au panier.");
      router.push("/connexion");
    }
  };

  return (
    <div className="group bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 w-full">
      <div className="relative flex-shrink-0 overflow-hidden rounded-lg ">
        {item.images && (
          <Image
            src={item.images[0].url}
            alt={item.name}
            width={250}
            height={250}
            className="h-[90%] w-70 "
          />
        )}
        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button
            onClick={onOpenModal}
            className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-200 transition-colors"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
          <Button action={() => handleAddToCart()} size="very-small">
            Add to cart
          </Button>
          <button className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-200 transition-colors">
            <HeartIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-1">
        <Typography
          variant="body-lg"
          component="h3"
          className="ease-out text-start hover:text-primary-700"
        >
          <Link href={`/shop/ShowDetails/${item.id}`}>{item.name}</Link>
        </Typography>

        <span className="flex items-center gap-2 font-medium text-lg">
          <Typography variant="body-lg" component="span" theme="gray">
            {Number(item.price)} €
          </Typography>
        </span>
      </div>
      <ProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        productId={item.id}
      />
    </div>
  );
};

export default ProductListItem;
