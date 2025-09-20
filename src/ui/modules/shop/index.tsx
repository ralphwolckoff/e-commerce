"use client";

import React, { useState, useEffect} from "react";
import { productService } from "@/services/productService";
import { Product } from "@/types/products";
import { toast } from "react-toastify";
import { ChevronUpIcon, GridIcon, ListIcon } from "@/components/icons";
import { Pagination } from "./pagination";
import { Button } from "@/ui/design/button/button";
import ProductItem from "@/components/products/ProductItem";
import ProductListItem from "@/components/products/productListItem";

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

  const productsPerPage = 9;

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
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col items-center gap-7"
            }`}
          >
            {currentProducts.map((product, key) =>
              viewMode === "grid" ? (
                <ProductItem key={key} item={product} />
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
