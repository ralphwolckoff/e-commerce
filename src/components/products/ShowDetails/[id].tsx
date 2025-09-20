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

const ShopDetails = () => {
  const { addItem } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const { id } = router.query;
  const productId = id as string;

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("tabOne");
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
    } else if (isAuthenticated && user?.role === Role.VENDOR) {
      return;
    } else {
      toast.info("Veuillez vous connecter pour ajouter au panier.");
      router.push("/connexion");
    }

    if (buyNow) {
      router.push("/checkout");
    } else {
      toast.success(`${quantity} ${product.name} ajouté(s) au panier !`);
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
      <div className="fixed inset-0 z-[100] bg-white/50 flex items-center justify-center p-4">
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

  const tabs = [
    {
      id: "tabOne",
      title: "Description",
    },
    {
      id: "tabTwo",
      title: "Additional Information",
    },
    {
      id: "tabThree",
      title: "Reviews",
    },
  ];

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
                        className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
                        disabled={quantity < 0 && true}
                      >
                        <svg
                          className="fill-current"
                          width="16"
                          height="2"
                          viewBox="0 0 16 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-8.548e-08 0.977778C-3.82707e-08 0.437766 0.437766 3.82707e-08 0.977778 8.548e-08L15.0222 1.31328e-06C15.5622 1.36049e-06 16 0.437767 16 0.977779C16 1.51779 15.5622 1.95556 15.0222 1.95556L0.977778 1.95556C0.437766 1.95556 -1.32689e-07 1.51779 -8.548e-08 0.977778Z"
                            fill=""
                          />
                        </svg>
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
                        className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
                        disabled={product && quantity > product.stock - 1}
                      >
                        <svg
                          className="fill-current"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.08889 0C8.6289 2.36047e-08 9.06667 0.437766 9.06667 0.977778L9.06667 15.0222C9.06667 15.5622 8.6289 16 8.08889 16C7.54888 16 7.11111 15.5622 7.11111 15.0222L7.11111 0.977778C7.11111 0.437766 7.54888 -2.36047e-08 8.08889 0Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 7.91111C4.72093e-08 7.3711 0.437766 6.93333 0.977778 6.93333L15.0222 6.93333C15.5622 6.93333 16 7.3711 16 7.91111C16 8.45112 15.5622 8.88889 15.0222 8.88889L0.977778 8.88889C0.437766 8.88889 -4.72093e-08 8.45112 0 7.91111Z"
                            fill=""
                          />
                        </svg>
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

          <section className="overflow-hidden bg-gray-200/50 py-20">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
              {/* <!--== tab header start ==--> */}
              <div className="flex flex-wrap items-center bg-white rounded-[10px] shadow-1 gap-5 xl:gap-12.5 py-4.5 px-4 sm:px-6">
                {tabs.map((item, key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(item.id)}
                    className={`font-medium lg:text-lg ease-out duration-200 hover:text-primary relative before:h-0.5 before:bg-primary before:absolute before:left-0 before:bottom-0 before:ease-out before:duration-200 hover:before:w-full ${
                      activeTab === item.id
                        ? "text-primary before:w-full"
                        : "text-gray before:w-0"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
              {/* <!--== tab header end ==--> */}

              {/* <!--== tab content start ==--> */}
              {/* <!-- tab content one start --> */}
              <div>
                <div
                  className={`flex-col sm:flex-row gap-7.5 xl:gap-12.5 mt-12.5 ${
                    activeTab === "tabOne" ? "flex" : "hidden"
                  }`}
                >
                  <div className="max-w-[670px] w-full">
                    <h2 className="font-medium text-2xl text-dark mb-7">
                      Specifications:
                    </h2>

                    <p className="mb-6">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the
                      industry&apos;s standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book.
                    </p>
                    <p className="mb-6">
                      It has survived not only five centuries, but also the leap
                      into electronic typesetting, remaining essentially
                      unchanged. It was popularised in the 1960s.
                    </p>
                    <p>
                      with the release of Letraset sheets containing Lorem Ipsum
                      passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions.
                    </p>
                  </div>

                  <div className="max-w-[447px] w-full">
                    <h2 className="font-medium text-2xl text-dark mb-7">
                      Care & Maintenance:
                    </h2>

                    <p className="mb-6">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the
                      industry&apos;s standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book.
                    </p>
                    <p>
                      It has survived not only five centuries, but also the leap
                      into electronic typesetting, remaining essentially
                      unchanged. It was popularised in the 1960s.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- tab content one end --> */}

              {/* <!-- tab content two start --> */}
              <div>
                <div
                  className={`rounded-xl bg-white shadow-1 p-4 sm:p-6 mt-10 ${
                    activeTab === "tabTwo" ? "block" : "hidden"
                  }`}
                >
                  {/* <!-- info item --> */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">Brand</p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">Apple</p>
                    </div>
                  </div>

                  {/* <!-- info item --> */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">Model</p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        iPhone 14 Plus
                      </p>
                    </div>
                  </div>

                  {/* <!-- info item --> */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">
                        Display Size
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        6.7 inches
                      </p>
                    </div>
                  </div>

                  {/* <!-- info item --> */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">
                        Display Type
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        Super Retina XDR OLED, HDR10, Dolby Vision, 800 nits
                        (HBM), 1200 nits (peak)
                      </p>
                    </div>
                  </div>

                  {/* <!-- info item --> */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">
                        Display Resolution
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        1284 x 2778 pixels, 19.5:9 ratio
                      </p>
                    </div>
                  </div>

                  {/* <!-- info item --> */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">Chipset</p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        Apple A15 Bionic (5 nm)
                      </p>
                    </div>
                  </div>

                  {/* <!-- info item --> */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">Memory</p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        128GB 6GB RAM | 256GB 6GB RAM | 512GB 6GB RAM
                      </p>
                    </div>
                  </div>

                  {/* <!-- info item --> */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">
                        Main Camera
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        12MP + 12MP | 4K@24/25/30/60fps, stereo sound rec.
                      </p>
                    </div>
                  </div>

                  {/* <!-- info item --> */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">
                        Selfie Camera
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        12 MP | 4K@24/25/30/60fps, 1080p@25/30/60/120fps,
                        gyro-EIS
                      </p>
                    </div>
                  </div>

                  {/* <!-- info item --> */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">
                        Battery Info
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        Li-Ion 4323 mAh, non-removable | 15W wireless (MagSafe),
                        7.5W wireless (Qi)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- tab content two end --> */}

              {/* <!-- tab content three start --> */}
              <div>
                <div
                  className={`flex-col sm:flex-row gap-7.5 xl:gap-12.5 mt-12.5 ${
                    activeTab === "tabThree" ? "flex" : "hidden"
                  }`}
                >
                  <div className="max-w-[570px] w-full">
                    <h2 className="font-medium text-2xl text-dark mb-9">
                      03 Review for this product
                    </h2>

                    <div className="flex flex-col gap-6">
                      {/* <!-- review item --> */}
                      <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                          <a href="#" className="flex items-center gap-4">
                            <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
                              <Image
                                src="/images/users/user-01.jpg"
                                alt="author"
                                className="w-12.5 h-12.5 rounded-full overflow-hidden"
                                width={50}
                                height={50}
                              />
                            </div>

                            <div>
                              <h3 className="font-medium text-dark">
                                Davis Dorwart
                              </h3>
                              <p className="text-custom-sm">
                                Serial Entrepreneur
                              </p>
                            </div>
                          </a>

                          <div className="flex items-center gap-1">
                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>

                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>

                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>

                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>

                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>
                          </div>
                        </div>

                        <p className="text-dark mt-6">
                          “Lorem ipsum dolor sit amet, adipiscing elit. Donec
                          malesuada justo vitaeaugue suscipit beautiful
                          vehicula’’
                        </p>
                      </div>

                      {/* <!-- review item --> */}
                      <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                          <a href="#" className="flex items-center gap-4">
                            <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
                              <Image
                                src="/images/users/user-01.jpg"
                                alt="author"
                                className="w-12.5 h-12.5 rounded-full overflow-hidden"
                                width={50}
                                height={50}
                              />
                            </div>

                            <div>
                              <h3 className="font-medium text-dark">
                                Davis Dorwart
                              </h3>
                              <p className="text-custom-sm">
                                Serial Entrepreneur
                              </p>
                            </div>
                          </a>

                          <div className="flex items-center gap-1">
                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>

                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>

                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>

                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>

                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>
                          </div>
                        </div>

                        <p className="text-dark mt-6">
                          “Lorem ipsum dolor sit amet, adipiscing elit. Donec
                          malesuada justo vitaeaugue suscipit beautiful
                          vehicula’’
                        </p>
                      </div>

                      {/* <!-- review item --> */}
                      <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                          <a href="#" className="flex items-center gap-4">
                            <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
                              <Image
                                src="/images/users/user-01.jpg"
                                alt="author"
                                className="w-12.5 h-12.5 rounded-full overflow-hidden"
                                width={50}
                                height={50}
                              />
                            </div>

                            <div>
                              <h3 className="font-medium text-dark">
                                Davis Dorwart
                              </h3>
                              <p className="text-custom-sm">
                                Serial Entrepreneur
                              </p>
                            </div>
                          </a>

                          <div className="flex items-center gap-1">
                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>

                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>

                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>

                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>

                            <span className="cursor-pointer text-[#FBB040]">
                              <svg
                                className="fill-current"
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                  fill=""
                                />
                              </svg>
                            </span>
                          </div>
                        </div>

                        <p className="text-dark mt-6">
                          “Lorem ipsum dolor sit amet, adipiscing elit. Donec
                          malesuada justo vitaeaugue suscipit beautiful
                          vehicula’’
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="max-w-[550px] w-full">
                    <form>
                      <h2 className="font-medium text-2xl text-dark mb-3.5">
                        Add a Review
                      </h2>

                      <p className="mb-6">
                        Your email address will not be published. Required
                        fields are marked *
                      </p>

                      <div className="flex items-center gap-3 mb-7.5">
                        <span>Your Rating*</span>

                        <div className="flex items-center gap-1">
                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-[#FBB040]">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-gray-5">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>

                          <span className="cursor-pointer text-gray-5">
                            <svg
                              className="fill-current"
                              width="15"
                              height="16"
                              viewBox="0 0 15 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                fill=""
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                        <div className="mb-5">
                          <label htmlFor="comments" className="block mb-2.5">
                            Comments
                          </label>

                          <textarea
                            name="comments"
                            id="comments"
                            rows={5}
                            placeholder="Your comments"
                            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                          ></textarea>

                          <span className="flex items-center justify-between mt-2.5">
                            <span className="text-custom-sm text-dark-4">
                              Maximum
                            </span>
                            <span className="text-custom-sm text-dark-4">
                              0/250
                            </span>
                          </span>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-5 sm:gap-7.5 mb-5.5">
                          <div>
                            <label htmlFor="name" className="block mb-2.5">
                              Name
                            </label>

                            <input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Your name"
                              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="block mb-2.5">
                              Email
                            </label>

                            <input
                              type="email"
                              name="email"
                              id="email"
                              placeholder="Your email"
                              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
                        >
                          Submit Reviews
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* <!-- tab content three end --> */}
              {/* <!--== tab content end ==--> */}
            </div>
          </section>

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
