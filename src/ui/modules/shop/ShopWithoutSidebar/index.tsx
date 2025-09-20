"use client";

import React, { useState, useEffect } from "react";
import { productService } from "@/services/productService";
import { Product } from "@/types/products";
import { toast } from "react-toastify";
import { Pagination } from "@/ui/modules/shop/pagination";
import ProductListItem from "../../../../components/products/productListItem";
import SingleItem from "../../../../components/products/SingleItem";

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

export const ShopWithoutSidebar = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");

  const productsPerPage = 8;

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const productsData = await productService.getProducts();
        setAllProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Échec du chargement des produits.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tri des produits filtrés
    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === "latest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortOption === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
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
  }, [allProducts, searchTerm, sortOption]);

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
    <div className=" mx-auto px-4 py-8 md:flex-row space-y-6 md:space-y-0 md:space-x-8">
      {/* Liste des produits */}
      <div className="px-4 py-8">
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
              className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 p-3 focus:ring-primary-500 text-sm"
            >
              <option className="hover:bg-primary" value="latest">
                Nouveautés
              </option>
              <option className="hover:bg-primary" value="oldest">
                Produits les plus anciens
              </option>
              <option className="hover:bg-primary" value="price-asc">
                Prix croissant
              </option>
              <option className="hover:bg-primary" value="price-desc">
                Prix décroissant
              </option>
              <option className="hover:bg-primary" value="name-asc">
                A-Z
              </option>
              <option className="hover:bg-primary" value="name-desc">
                Z-A
              </option>
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
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "flex flex-col items-center lg:grid-cols-2 gap-7"
            }`}
          >
            {currentProducts.map((product, key) =>
              viewMode === "grid" ? (
                <SingleItem key={key} item={product} />
              ) : (
                <ProductListItem key={key} item={product} />
              )
            )}
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
