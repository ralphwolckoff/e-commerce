"use client";

import React, { useState, useEffect, useCallback } from "react";
import { productService } from "@/services/productService";
import { Product } from "@/types/products";
import { toast } from "react-toastify";
import { Category } from "@/types/category";
import { ChevronUpIcon } from "@/components/icons";
import ProductCard from "@/ui/modules/shop/product-detail/product-card";
import { Pagination } from "./pagination";
import { Button } from "@/ui/design/button/button";

const GridIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);
const ListIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" x2="21" y1="6" y2="6" />
    <line x1="8" x2="21" y1="12" y2="12" />
    <line x1="8" x2="21" y1="18" y2="18" />
    <line x1="3" x2="3.01" y1="6" y2="6" />
    <line x1="3" x2="3.01" y1="12" y2="12" />
    <line x1="3" x2="3.01" y1="18" y2="18" />
  </svg>
);

export const ShopPage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");

  const productsPerPage = 6;

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const productsData = await productService.getProducts();
        setAllProducts(productsData);
        const categories = [
          ...new Set(productsData.map((p) => p.category?.name)),
        ].filter((c): c is string => typeof c === "string");
        setUniqueCategories(categories);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Échec du chargement des produits.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // Gère l'ajout/suppression d'une catégorie au filtre
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  // Réinitialise tous les filtres
  const handleCleanAll = () => {
    setSelectedCategories([]);
    setSearchTerm("");
    setSortOption("latest");
    setCurrentPage(1);
  };

  // Étape 2: Filtrer et trier les produits à chaque changement des critères
  useEffect(() => {
    let filtered = allProducts;

    // Filtrage par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrage par catégorie
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product?.category?.name ?? "")
      );
    }

    // Tri des produits filtrés
    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortOption === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      if (sortOption === "price-asc") {
        return Number(a.price) - Number(b.price);
      }
      if (sortOption === "price-desc") {
        return Number(b.price) - Number(a.price);
      }
      // Tri par défaut (latest)
      return 0;
    });

    setDisplayedProducts(sorted);
  }, [allProducts, searchTerm, selectedCategories, sortOption]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
      {/* Panneau latéral de filtres */}
      <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-6 h-fit">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Filtres:</h2>
          <Button
            action={handleCleanAll}
            size="very-small"
            className=" font-semibold"
          >
            Réinitialiser
          </Button>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center justify-between cursor-pointer">
            Catégorie
            <ChevronUpIcon className="w-5 h-5" />
          </h3>
          <div className="mt-4 space-y-2">
            {uniqueCategories &&
              uniqueCategories.map((category) => (
                <label
                  key={category}
                  className="flex items-center text-gray-600"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">{category}</span>
                  <span className="ml-auto text-gray-400 text-sm">
                    {
                      allProducts.filter((p) => p.category?.name === category)
                        .length
                    }
                  </span>
                </label>
              ))}
          </div>
        </div>
      </div>

      {/* Liste des produits */}
      <div className="w-full md:w-3/4">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-lg shadow-md p-4 mb-6 space-y-4 sm:space-y-0">
          <input
            type="text"
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md p-2 w-full sm:w-1/3"
          />
          <div className="flex items-center space-x-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 p-3 focus:ring-indigo-500 text-sm"
            >
              <option value="latest">Nouveautés</option>
              <option value="oldest">Produits les plus anciens</option>
              <option value="best-selling">Meilleures ventes</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name-asc">Nom (A-Z)</option>
              <option value="name-desc">Nom (Z-A)</option>
            </select>
            <span className="text-gray-600 text-sm hidden sm:block">
              Affichage de {indexOfFirstProduct + 1} -{" "}
              {Math.min(indexOfLastProduct, displayedProducts.length)} sur{" "}
              {displayedProducts.length} produits
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${
                viewMode === "grid"
                  ? "text-primary-600 bg-primary-100"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <GridIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${
                viewMode === "list"
                  ? "text-primary-600 bg-primary-100"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Chargement des produits...</div>
        ) : currentProducts.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col items-center gap-7"
            }`}
          >
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            Aucun produit ne correspond à votre recherche.
          </div>
        )}

        {/* Composant de pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

// "use client";

// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";

// // Définitions de types et services simulés pour rendre le composant autonome
// export type Product = {
//   id: string;
//   name: string;
//   description?: string;
//   price: number;
//   category?: {
//     name: string;
//   };
// };

// const productService = {
//   getProducts: async (): Promise<Product[]> => {
//     // Simuler un délai réseau
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     return [
//       {
//         id: "1",
//         name: "Chaussures de course",
//         description: "Chaussures de sport confortables et durables.",
//         price: 99.99,
//         category: { name: "Sports" },
//       },
//       {
//         id: "2",
//         name: "Livre sur la programmation",
//         description: "Apprenez les bases de la programmation avec ce guide.",
//         price: 29.99,
//         category: { name: "Livres" },
//       },
//       {
//         id: "3",
//         name: "Casque Bluetooth",
//         description: "Son de haute qualité pour la musique et les appels.",
//         price: 149.99,
//         category: { name: "Électronique" },
//       },
//       {
//         id: "4",
//         name: "Livre de recettes",
//         description: "Des recettes simples et délicieuses pour tous.",
//         price: 19.5,
//         category: { name: "Livres" },
//       },
//       {
//         id: "5",
//         name: "Tapis de yoga",
//         description: "Conçu pour la pratique du yoga et du fitness.",
//         price: 49.99,
//         category: { name: "Sports" },
//       },
//       {
//         id: "6",
//         name: "Ordinateur portable",
//         description: "Performances exceptionnelles pour le travail et le jeu.",
//         price: 1200.0,
//         category: { name: "Électronique" },
//       },
//       {
//         id: "7",
//         name: "Vélo de montagne",
//         description: "Parfait pour les sentiers accidentés.",
//         price: 550.0,
//         category: { name: "Sports" },
//       },
//       {
//         id: "8",
//         name: "Souris sans fil",
//         description: "Ergonomique et précise pour une utilisation quotidienne.",
//         price: 35.0,
//         category: { name: "Électronique" },
//       },
//       {
//         id: "9",
//         name: "Roman de science-fiction",
//         description: "Plongez dans un univers futuriste captivant.",
//         price: 15.75,
//         category: { name: "Livres" },
//       },
//     ];
//   },
// };

// // Composants et icônes simulés
// const ChevronUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="18 15 12 9 6 15" />
//   </svg>
// );

// const ProductCard = ({ product, viewMode }) => {
//   return (
//     <div
//       className={`bg-white rounded-lg shadow-md overflow-hidden ${
//         viewMode === "list"
//           ? "flex flex-col md:flex-row items-center space-x-4 p-4"
//           : ""
//       }`}
//     >
//       <div
//         className={`w-full ${
//           viewMode === "list" ? "md:w-1/3" : "h-48"
//         } bg-gray-200 flex items-center justify-center text-gray-500`}
//       >
//         <div className="text-center p-4">Image non disponible</div>
//       </div>
//       <div className={`p-4 ${viewMode === "list" ? "w-full md:w-2/3" : ""}`}>
//         <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
//         <p className="text-gray-600 my-2">{product.description}</p>
//         <p className="text-xl font-semibold text-gray-900">
//           {product.price.toFixed(2)}€
//         </p>
//       </div>
//     </div>
//   );
// };

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
//   return (
//     <div className="flex justify-center items-center space-x-2 mt-8">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-4 py-2 border rounded-md text-gray-700 disabled:opacity-50"
//       >
//         Précédent
//       </button>
//       {pages.map((page) => (
//         <button
//           key={page}
//           onClick={() => onPageChange(page)}
//           className={`px-4 py-2 border rounded-md ${
//             currentPage === page
//               ? "bg-indigo-600 text-white"
//               : "bg-white text-gray-700"
//           }`}
//         >
//           {page}
//         </button>
//       ))}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-4 py-2 border rounded-md text-gray-700 disabled:opacity-50"
//       >
//         Suivant
//       </button>
//     </div>
//   );
// };

// const GridIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect width="7" height="7" x="3" y="3" rx="1" />
//     <rect width="7" height="7" x="14" y="3" rx="1" />
//     <rect width="7" height="7" x="14" y="14" rx="1" />
//     <rect width="7" height="7" x="3" y="14" rx="1" />
//   </svg>
// );
// const ListIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="8" x2="21" y1="6" y2="6" />
//     <line x1="8" x2="21" y1="12" y2="12" />
//     <line x1="8" x2="21" y1="18" y2="18" />
//     <line x1="3" x2="3.01" y1="6" y2="6" />
//     <line x1="3" x2="3.01" y1="12" y2="12" />
//     <line x1="3" x2="3.01" y1="18" y2="18" />
//   </svg>
// );

// export const ShopPage = () => {
//   const [allProducts, setAllProducts] = useState<Product[]>([]);
//   const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
//   const [sortOption, setSortOption] = useState("latest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewMode, setViewMode] = useState("grid");

//   const productsPerPage = 6;

//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       try {
//         setLoading(true);
//         const productsData = await productService.getProducts();
//         setAllProducts(productsData);
//         // Filtre les valeurs "undefined" et gère les catégories comme des chaînes de caractères
//         const categories = [
//           ...new Set(productsData.map((p) => p.category?.name).filter(Boolean)),
//         ];
//         setUniqueCategories(categories);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         toast.error("Échec du chargement des produits.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAllProducts();
//   }, []);

//   const handleCategoryChange = (categoryName: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(categoryName)
//         ? prev.filter((c) => c !== categoryName)
//         : [...prev, categoryName]
//     );
//     setCurrentPage(1);
//   };

//   const handleCleanAll = () => {
//     setSelectedCategories([]);
//     setSearchTerm("");
//     setSortOption("latest");
//     setCurrentPage(1);
//   };

//   useEffect(() => {
//     let filtered = allProducts;

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (product) =>
//           product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           product.description?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (selectedCategories.length > 0) {
//       filtered = filtered.filter((product) =>
//         selectedCategories.includes(product?.category?.name || "")
//       );
//     }

//     const sorted = [...filtered].sort((a, b) => {
//       if (sortOption === "name-asc") {
//         return a.name.localeCompare(b.name);
//       }
//       if (sortOption === "name-desc") {
//         return b.name.localeCompare(a.name);
//       }
//       if (sortOption === "price-asc") {
//         return Number(a.price) - Number(b.price);
//       }
//       if (sortOption === "price-desc") {
//         return Number(b.price) - Number(a.price);
//       }
//       return 0;
//     });

//     setDisplayedProducts(sorted);
//   }, [allProducts, searchTerm, selectedCategories, sortOption]);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = displayedProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );
//   const totalPages = Math.ceil(displayedProducts.length / productsPerPage);

//   const handlePageChange = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
//       {/* Panneau latéral de filtres */}
//       <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-6 h-fit">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800">Filtres:</h2>
//           <button
//             onClick={handleCleanAll}
//             className="text-indigo-600 hover:underline text-sm font-semibold"
//           >
//             Réinitialiser
//           </button>
//         </div>
//         <div className="border-t border-gray-200 pt-4">
//           <h3 className="text-lg font-semibold text-gray-700 flex items-center justify-between cursor-pointer">
//             Catégorie
//             <ChevronUpIcon className="w-5 h-5" />
//           </h3>
//           <div className="mt-4 space-y-2">
//             {uniqueCategories &&
//               uniqueCategories.map((category) => (
//                 <label
//                   key={category}
//                   className="flex items-center text-gray-600"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedCategories.includes(category)}
//                     onChange={() => handleCategoryChange(category)}
//                     className="rounded text-indigo-600 focus:ring-indigo-500"
//                   />
//                   <span className="ml-2">{category}</span>
//                   <span className="ml-auto text-gray-400 text-sm">
//                     {
//                       allProducts.filter((p) => p.category?.name === category)
//                         .length
//                     }
//                   </span>
//                 </label>
//               ))}
//           </div>
//         </div>
//       </div>

//       {/* Liste des produits */}
//       <div className="w-full md:w-3/4">
//         <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-lg shadow-md p-4 mb-6 space-y-4 sm:space-y-0">
//           <input
//             type="text"
//             placeholder="Rechercher des produits..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border rounded-md p-2 w-full sm:w-1/3"
//           />
//           <div className="flex items-center space-x-4">
//             <select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 p-3 focus:ring-indigo-500 text-sm"
//             >
//               <option value="latest">Nouveautés</option>
//               <option value="oldest">Produits les plus anciens</option>
//               <option value="best-selling">Meilleures ventes</option>
//               <option value="price-asc">Prix croissant</option>
//               <option value="price-desc">Prix décroissant</option>
//               <option value="name-asc">Nom (A-Z)</option>
//               <option value="name-desc">Nom (Z-A)</option>
//             </select>
//             <span className="text-gray-600 text-sm hidden sm:block">
//               Affichage de {indexOfFirstProduct + 1} -{" "}
//               {Math.min(indexOfLastProduct, displayedProducts.length)} sur{" "}
//               {displayedProducts.length} produits
//             </span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => setViewMode("grid")}
//               className={`p-2 rounded-md ${
//                 viewMode === "grid"
//                   ? "text-primary-600 bg-primary-100"
//                   : "text-gray-400 hover:text-gray-600"
//               }`}
//             >
//               <GridIcon className="w-5 h-5" />
//             </button>
//             <button
//               onClick={() => setViewMode("list")}
//               className={`p-2 rounded-md ${
//                 viewMode === "list"
//                   ? "text-primary-600 bg-primary-100"
//                   : "text-gray-400 hover:text-gray-600"
//               }`}
//             >
//               <ListIcon className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-center py-10">Chargement des produits...</div>
//         ) : currentProducts.length > 0 ? (
//           <div
//             className={`grid gap-6 ${
//               viewMode === "grid"
//                 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
//                 : "flex flex-col items-center gap-7"
//             }`}
//           >
//             {currentProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 viewMode={viewMode}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10 text-gray-500">
//             Aucun produit ne correspond à votre recherche.
//           </div>
//         )}

//         {/* Composant de pagination */}
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// };
