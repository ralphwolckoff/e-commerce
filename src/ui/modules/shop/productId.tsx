import React, { useState } from "react";
import { useParams } from "next/navigation";
import { XIcon, EnlargeIcon, MinusIcon, PlusIcon, ShoppingCartIcon, HeartIcon } from "@/components/icons";

// Données de produits simulées
const productsData = [
  {
    id: "1",
    name: "Havit HV-G69 USB Gamepad",
    category: "Gamepad",
    originalPrice: 59,
    salePrice: 29,
    rating: 4.7,
    reviews: 5,
    image: "https://placehold.co/500x500/E2E8F0/1A202C?text=Gamepad",
    variants: "USB",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s...",
    isSale: true,
    salePercent: 20,
    isStock: true,
    additionalImages: [
      "https://placehold.co/100x100/E2E8F0/1A202C?text=Gamepad+1",
      "https://placehold.co/100x100/E2E8F0/1A202C?text=Gamepad+2",
    ],
  },
  {
    id: "2",
    name: "iPhone 14 Plus",
    category: "Phone",
    originalPrice: 899,
    salePrice: 99,
    rating: 4.5,
    reviews: 5,
    image: "https://placehold.co/500x500/E2E8F0/1A202C?text=iPhone",
    variants: "6/128GB",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    isSale: true,
    salePercent: 15,
    isStock: false,
    additionalImages: [],
  },
  {
    id: "3",
    name: "Apple iMac M1 24-inch 2021",
    category: "Desktop",
    originalPrice: 999,
    salePrice: 29,
    rating: 5,
    reviews: 10,
    image: "https://placehold.co/500x500/E2E8F0/1A202C?text=iMac",
    variants: "24-inch",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    isSale: false,
    salePercent: 0,
    isStock: true,
    additionalImages: [],
  },
];

export default function App() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === id);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Placeholder for the main shop page content */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Détails du produit</h1>
          <p>
            Le contenu principal de la page de la boutique irait ici. La modale
            s'ouvrirait en cliquant sur un produit.
          </p>
        </div>
      </div>
      {product && (
        <ProductModal
          product={product}
          onClose={() => {
            /* Gérer la fermeture de la modale */
          }}
        />
      )}
    </div>
  );
}

// Composant de la boîte modale du produit
const ProductModal = ({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 relative max-w-5xl w-full flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XIcon className="w-6 h-6" />
        </button>

        {/* Section gauche : Images */}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 items-center lg:items-start w-full lg:w-1/2">
          {/* Images miniatures */}
          <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 order-2 lg:order-1">
            <div
              className={`p-2 border rounded-lg cursor-pointer ${
                activeImage === product.image
                  ? "border-indigo-600"
                  : "border-gray-200"
              }`}
              onClick={() => setActiveImage(product.image)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-contain"
              />
            </div>
            {product.additionalImages.map((img: string) => (
              <div
                key={img}
                className={`p-2 border rounded-lg cursor-pointer ${
                  activeImage === img ? "border-indigo-600" : "border-gray-200"
                }`}
                onClick={() => setActiveImage(img)}
              >
                <img
                  src={img}
                  alt={product.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
            ))}
          </div>
          {/* Image principale */}
          <div className="relative border border-gray-200 rounded-lg p-4 order-1 lg:order-2 w-full lg:w-auto">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-auto object-contain max-h-96"
            />
            <button className="absolute bottom-4 right-4 p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
              <EnlargeIcon className="w-5 h-5" />
            </button>
            {product.isSale && (
              <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                SALE {product.salePercent}% OFF
              </div>
            )}
          </div>
        </div>

        {/* Section droite : Détails du produit */}
        <div className="flex-1 w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <div className="flex items-center space-x-4">
            <div className="flex text-yellow-400 text-sm">
              {"⭐".repeat(Math.min(Math.round(product.rating), 5))}
              {"☆".repeat(5 - Math.min(Math.round(product.rating), 5))}
            </div>
            <span className="text-gray-500 font-semibold">
              {product.rating} Rating
            </span>
            <span className="text-gray-500 font-semibold">
              ({product.reviews} reviews)
            </span>
            <div
              className={`font-semibold ml-auto px-2 py-1 rounded-full text-sm ${
                product.isStock
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.isStock ? "In Stock" : "Out of Stock"}
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-gray-700">Price:</span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-indigo-600">
                ${product.salePrice}
              </span>
              <span className="text-md text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-gray-700">
              Quantity:
            </span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={handleDecrease}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border-x border-gray-300 focus:outline-none"
              />
              <button
                onClick={handleIncrease}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button className="flex items-center justify-center flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors shadow-md">
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button className="flex items-center justify-center flex-1 px-6 py-3 bg-white text-indigo-600 border border-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition-colors shadow-md">
              <HeartIcon className="w-5 h-5 mr-2" />
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composants SVG pour les icônes

