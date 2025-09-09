"use client";

import React, { useState, useEffect, use } from "react";
import { Product, ProductSortKey } from "@/types/products";
import { productService } from "@/services/productService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductSearchAndSort from "@/ui/modules/seller/products/search-and-sort/ProductSearchAndSort";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useStoreStore } from "@/store/storeStore";
import { categoryService } from "@/services/categoryService";
import { Category } from "@/types/category";
import { useProductStore } from "@/store/productStore";
import { useCategoryStore } from "@/store/categoryStore";

export default function ProductList() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { authUser, authUserIsLoading } = useAuth();
  const { store } = useStoreStore();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchUserProducts = async () => {
    if (!authUserIsLoading && store) {
      try {
        const res = await productService.getStoreProducts(store.id);
        useProductStore.getState().setProduct(res);
        setAllProducts(res);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        toast.error("Failed to load products.");
      } finally {
        setLoadingProducts(false);
      }
    } else if (loading) {
      setLoadingProducts(false);
      toast.error("You must be logged in to view your products.");
    }
  };

  const fetchCategories = async () => {
    if (store?.id) {
      try {
        const fetchedCategories = await categoryService.getCategoriesByStoreId(
          store.id
        );
        useCategoryStore.getState().setCategory(fetchedCategories);
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        toast.error("Failed to load categories.");
      }
    }
  };

  useEffect(() => {
    if ( !authUserIsLoading) {
      fetchUserProducts();
    }
  }, [authUserIsLoading, authUser, loading]);

  useEffect(() => {
    if (store?.id) {
      fetchCategories();
    }
  }, [store?.id]);

  useEffect(() => {
    const filterAndSortProducts = () => {
      let filtered = [...allProducts];

      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter(
          (product) => product.categoryId === selectedCategory
        );
      }

      const sortKey = sortBy as ProductSortKey;
      const sorted = filtered.sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      setDisplayedProducts(sorted);
    };

    filterAndSortProducts();
  }, [allProducts, searchTerm, sortBy, sortOrder, selectedCategory]);

  console.log({allProducts});
  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleEdit = (productId: string) => {
    router.push(`/seller/product/edit/${productId}`);
    console.log(`Editing product with ID: ${productId}`);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await productService.deleteProduct(productId);
      console.log(`Deleting product with ID: ${productId}`);
      const updatedList = allProducts.filter((p) => p.id !== productId);
      setAllProducts(updatedList);
      toast.success("Product deleted successfully!");
    }
  };

  // if (loading || loadingProducts) {
  //   return <div className="text-center py-10">Loading products...</div>;
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <ProductSearchAndSort
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={handleSortOrderChange}
        />
        <div className="mt-4 md:mt-0 md:ml-4">
          <label htmlFor="category-select" className="sr-only">
            Filtrer par catégorie
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {displayedProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                  Image
                </th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                  Stock
                </th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="py-2 px-4">
                    <div className="flex-shrink-0 h-10 w-10 relative">
                      <Image
                        className="rounded-md"
                        src={
                          product.images?.[0]?.url || "/assets/imgs/maison.jpg"
                        }
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">${Number(product.price)}</td>
                  <td className="py-2 px-4">{product.stock}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          Vous n'avez aucun produit pour le moment
        </div>
      )}
    </div>
  );
}
