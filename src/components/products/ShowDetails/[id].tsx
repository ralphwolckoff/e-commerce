"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import RecentlyViewdItems from "./RecentlyViewd";
import { productService } from "@/services/productService";
import { Product } from "@/types/products";
import { useRouter } from "next/router";
import { Button } from "@/ui/design/button/button";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/common/role.enum";
import { Typography } from "@/ui/design/typography/Typography";
import ProductModal from "../product-detail/[id]";
import AdditionalInfo from "./additionalInfo";
import { MinusIcon, PlusIcon } from "@/components/icons";

const ShopDetails = () => {
  const { addItem } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const { id } = router.query;
  const productId = id as string;

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [product, setproduct] = useState<Product>();
  const [previewImg, setPreviewImg] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const product = await productService.getProductById(productId);
      setproduct(product);
      setLoading(false);
    } catch (error) {
      console.log("erreur de recuperation du produit");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Fonction pour fermer la modale
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleProcessOrder = (buyNow: boolean) => {
    if (!product) {
      toast.error("Produit non valide.");
      return;
    }

    if (quantity <= 0) {
      toast.error("Veuillez sélectionner une quantité valide.");
      return;
    }

    // Ajouter le produit au panier

    if (isAuthenticated && user?.role === Role.CLIENT) {
      addItem(product, quantity);
      toast.success(`${quantity} ${product.name} ajouté(s) au panier !`);
      if (buyNow) {
        router.push("/cart/checkout");
      }
    } else if (isAuthenticated && user?.role === Role.VENDOR) {
      return;
    } else {
      toast.info("Veuillez vous connecter pour ajouter au panier.");
      router.push("/connexion");
    }
  };

  const c = product?.category?.name;
  if (!c) {
    return;
  }
  const handleAddToCart = () => handleProcessOrder(false);
  const handleBuyNow = () => handleProcessOrder(true);

  const handleZoomImage = () => {
    setIsZoomed(true);
  };

  const handlePrevImage = () => {
    setPreviewImg((prev) =>
      prev === 0
        ? product?.images?.length
          ? product.images.length - 1
          : 0
        : prev - 1
    );
  };

  // Fonction pour l'image suivante
  const handleNextImage = () => {
    setPreviewImg((prev) =>
      prev === (product?.images?.length ? product.images.length - 1 : 0)
        ? 0
        : prev + 1
    );
  };

  if (isZoomed && product?.images?.[previewImg]?.url) {
    return (
      <div className="fixed inset-0 z-100 bg-white/50 flex items-center justify-center p-4">
        <button
          onClick={() => setIsZoomed(false)}
          className="absolute top-4 right-4 text-black text-3xl font-bold p-2"
        >
          &times;
        </button>
        <div className="relative w-full h-full max-w-[90vw] max-h-[90vh]">
          <Image
            fill
            src={product.images[previewImg].url}
            alt="Full-screen product image"
            className="object-contain w-full h-full"
          />

          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    <div>chargement...</div>;
  }

  return (
    <>
      {product?.name === "" ? (
        "Please add product"
      ) : (
        <>
          <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
              <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">
                <div className="lg:max-w-[570px] w-full">
                  <div className="lg:min-h-[512px] sm:min-h-[556px] rounded-lg border border-primary-700 shadow-1 bg-gray-2 p-4 sm:p-7.5 relative flex items-center justify-center">
                    <div>
                      <button
                        onClick={handleZoomImage}
                        aria-label="button for zoom"
                        className="gallery__Image w-11 h-11 rounded-[5px] bg-gray-1 shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-primary-700 absolute top-4 lg:top-6 right-4 lg:right-6 z-10"
                      >
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.11493 1.14581L9.16665 1.14581C9.54634 1.14581 9.85415 1.45362 9.85415 1.83331C9.85415 2.21301 9.54634 2.52081 9.16665 2.52081C7.41873 2.52081 6.17695 2.52227 5.23492 2.64893C4.31268 2.77292 3.78133 3.00545 3.39339 3.39339C3.00545 3.78133 2.77292 4.31268 2.64893 5.23492C2.52227 6.17695 2.52081 7.41873 2.52081 9.16665C2.52081 9.54634 2.21301 9.85415 1.83331 9.85415C1.45362 9.85415 1.14581 9.54634 1.14581 9.16665L1.14581 9.11493C1.1458 7.43032 1.14579 6.09599 1.28619 5.05171C1.43068 3.97699 1.73512 3.10712 2.42112 2.42112C3.10712 1.73512 3.97699 1.43068 5.05171 1.28619C6.09599 1.14579 7.43032 1.1458 9.11493 1.14581ZM16.765 2.64893C15.823 2.52227 14.5812 2.52081 12.8333 2.52081C12.4536 2.52081 12.1458 2.21301 12.1458 1.83331C12.1458 1.45362 12.4536 1.14581 12.8333 1.14581L12.885 1.14581C14.5696 1.1458 15.904 1.14579 16.9483 1.28619C18.023 1.43068 18.8928 1.73512 19.5788 2.42112C20.2648 3.10712 20.5693 3.97699 20.7138 5.05171C20.8542 6.09599 20.8542 7.43032 20.8541 9.11494V9.16665C20.8541 9.54634 20.5463 9.85415 20.1666 9.85415C19.787 9.85415 19.4791 9.54634 19.4791 9.16665C19.4791 7.41873 19.4777 6.17695 19.351 5.23492C19.227 4.31268 18.9945 3.78133 18.6066 3.39339C18.2186 3.00545 17.6873 2.77292 16.765 2.64893ZM1.83331 12.1458C2.21301 12.1458 2.52081 12.4536 2.52081 12.8333C2.52081 14.5812 2.52227 15.823 2.64893 16.765C2.77292 17.6873 3.00545 18.2186 3.39339 18.6066C3.78133 18.9945 4.31268 19.227 5.23492 19.351C6.17695 19.4777 7.41873 19.4791 9.16665 19.4791C9.54634 19.4791 9.85415 19.787 9.85415 20.1666C9.85415 20.5463 9.54634 20.8541 9.16665 20.8541H9.11494C7.43032 20.8542 6.09599 20.8542 5.05171 20.7138C3.97699 20.5693 3.10712 20.2648 2.42112 19.5788C1.73512 18.8928 1.43068 18.023 1.28619 16.9483C1.14579 15.904 1.1458 14.5696 1.14581 12.885L1.14581 12.8333C1.14581 12.4536 1.45362 12.1458 1.83331 12.1458ZM20.1666 12.1458C20.5463 12.1458 20.8541 12.4536 20.8541 12.8333V12.885C20.8542 14.5696 20.8542 15.904 20.7138 16.9483C20.5693 18.023 20.2648 18.8928 19.5788 19.5788C18.8928 20.2648 18.023 20.5693 16.9483 20.7138C15.904 20.8542 14.5696 20.8542 12.885 20.8541H12.8333C12.4536 20.8541 12.1458 20.5463 12.1458 20.1666C12.1458 19.787 12.4536 19.4791 12.8333 19.4791C14.5812 19.4791 15.823 19.4777 16.765 19.351C17.6873 19.227 18.2186 18.9945 18.6066 18.6066C18.9945 18.2186 19.227 17.6873 19.351 16.765C19.4777 15.823 19.4791 14.5812 19.4791 12.8333C19.4791 12.4536 19.787 12.1458 20.1666 12.1458Z"
                            fill=""
                          />
                        </svg>
                      </button>

                      <Image
                        src={product?.images?.[previewImg].url || ""}
                        alt="products-details"
                        fill
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
                    {product?.images?.map((item, key) => (
                      <button
                        onClick={() => setPreviewImg(key)}
                        key={key}
                        className={`flex items-center justify-center w-15 sm:w-25 h-15 sm:h-25 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border-2 hover:border-primary ${
                          key === previewImg
                            ? "border-primary"
                            : "border-transparent"
                        }`}
                      >
                        <Image
                          width={50}
                          height={50}
                          src={item.url || ""}
                          alt="thumbnail"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* <!-- product content --> */}
                <div className="max-w-[539px] w-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <Typography
                      variant="lead"
                      component="h3"
                      theme="gray"
                      className="font-blod"
                    >
                      {product?.name}
                    </Typography>

                    <div className="inline-flex font-medium text-custom-sm text-white bg-blue rounded py-0.5 px-2.5">
                      30% OFF
                    </div>
                  </div>
                  <div className="flex items-center gap-10 mb-4">
                    <Typography
                      variant="lead"
                      component="h3"
                      className="font-blod"
                    >
                      Boutique :
                    </Typography>
                    <Typography
                      variant="caption2"
                      component="span"
                      weight="medium"
                    >
                      {product.store?.name}
                    </Typography>
                  </div>

                  <h3 className="font-medium text-custom-1 mb-4.5">
                    <span className="text-sm sm:text-base text-dark">
                      Price: {Number(product?.price)} €
                    </span>
                  </h3>
                  <div className="flex items-center gap-2">
                    {product.stock > 10 ? (
                      <>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_375_9221)">
                            <path
                              d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.78125 19.4688 10 19.4688C15.2188 19.4688 19.4688 15.2188 19.4688 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.59375 18.0625 10.0312C18.0625 14.4375 14.4375 18.0625 10 18.0625Z"
                              fill="#22AD5C"
                            />
                            <path
                              d="M12.6875 7.09374L8.9688 10.7187L7.2813 9.06249C7.00005 8.78124 6.56255 8.81249 6.2813 9.06249C6.00005 9.34374 6.0313 9.78124 6.2813 10.0625L8.2813 12C8.4688 12.1875 8.7188 12.2812 8.9688 12.2812C9.2188 12.2812 9.4688 12.1875 9.6563 12L13.6875 8.12499C13.9688 7.84374 13.9688 7.40624 13.6875 7.12499C13.4063 6.84374 12.9688 6.84374 12.6875 7.09374Z"
                              fill="#22AD5C"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_375_9221">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="font-medium text-dark">
                          {" "}
                          En Stock{" "}
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-6 w-6 text-red-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="font-medium text-red-700">
                          Rupture de Stock
                        </span>
                      </>
                    )}
                  </div>
                  <ul className="flex flex-col gap-2">
                    <li className="flex items-center gap-2.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3589 8.35863C13.603 8.11455 13.603 7.71882 13.3589 7.47475C13.1149 7.23067 12.7191 7.23067 12.4751 7.47475L8.75033 11.1995L7.5256 9.97474C7.28152 9.73067 6.8858 9.73067 6.64172 9.97474C6.39764 10.2188 6.39764 10.6146 6.64172 10.8586L8.30838 12.5253C8.55246 12.7694 8.94819 12.7694 9.19227 12.5253L13.3589 8.35863Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.0003 1.04169C5.05277 1.04169 1.04199 5.05247 1.04199 10C1.04199 14.9476 5.05277 18.9584 10.0003 18.9584C14.9479 18.9584 18.9587 14.9476 18.9587 10C18.9587 5.05247 14.9479 1.04169 10.0003 1.04169ZM2.29199 10C2.29199 5.74283 5.74313 2.29169 10.0003 2.29169C14.2575 2.29169 17.7087 5.74283 17.7087 10C17.7087 14.2572 14.2575 17.7084 10.0003 17.7084C5.74313 17.7084 2.29199 14.2572 2.29199 10Z"
                          fill="#3C50E0"
                        />
                      </svg>
                      Free delivery available
                    </li>

                    <li className="flex items-center gap-2.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3589 8.35863C13.603 8.11455 13.603 7.71882 13.3589 7.47475C13.1149 7.23067 12.7191 7.23067 12.4751 7.47475L8.75033 11.1995L7.5256 9.97474C7.28152 9.73067 6.8858 9.73067 6.64172 9.97474C6.39764 10.2188 6.39764 10.6146 6.64172 10.8586L8.30838 12.5253C8.55246 12.7694 8.94819 12.7694 9.19227 12.5253L13.3589 8.35863Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.0003 1.04169C5.05277 1.04169 1.04199 5.05247 1.04199 10C1.04199 14.9476 5.05277 18.9584 10.0003 18.9584C14.9479 18.9584 18.9587 14.9476 18.9587 10C18.9587 5.05247 14.9479 1.04169 10.0003 1.04169ZM2.29199 10C2.29199 5.74283 5.74313 2.29169 10.0003 2.29169C14.2575 2.29169 17.7087 5.74283 17.7087 10C17.7087 14.2572 14.2575 17.7084 10.0003 17.7084C5.74313 17.7084 2.29199 14.2572 2.29199 10Z"
                          fill="#3C50E0"
                        />
                      </svg>
                      Sales 30% Off Use Code: PROMO30
                    </li>
                  </ul>

                  <div className="mt-10">
                    <h4 className="font-semibold text-lg text-dark mb-3.5">
                      Quantité
                    </h4>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                        aria-label="button for remove product"
                        className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-primary-600"
                        disabled={quantity < 0 && true}
                      >
                        <MinusIcon />
                      </button>

                      <span
                        className="flex items-center justify-center w-20 h-10 rounded-[5px] border border-gray-4 bg-white font-medium text-dark"
                        x-text="quantity"
                      >
                        {quantity}
                      </span>

                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        aria-label="button for add product"
                        className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-primary-600"
                        disabled={product && quantity > product.stock - 1}
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center mt-10 justify-between gap-4">
                    <Button
                      size="small"
                      disabled={loading}
                      action={() => handleAddToCart()}
                    >
                      ajouter au panier
                    </Button>

                    <Button
                      size="small"
                      action={() => handleBuyNow()}
                      variant="outline"
                    >
                      Acheter maintenant
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <AdditionalInfo />

          <RecentlyViewdItems categoryName={c} onQuickView={handleQuickView} />
        </>
      )}
      {selectedProduct && (
        <ProductModal
          isOpen={showModal}
          onClose={handleCloseModal}
          productId={selectedProduct.id}
        />
      )}
    </>
  );
};

export default ShopDetails;
