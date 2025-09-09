// src/app/admin/products/page.tsx
import React from "react";
import Link from "next/link";
import ProductList from "../../../ui/modules/seller/products/list/ProductList";
import { Seo } from "@/components/seo/Seo";
import { UserLayout } from "@/components/layout/user-layout";
import { useProductStore } from "@/store/productStore";

export default function ProductManagementPage() {
  const { products } = useProductStore();

  return (
    <>
      <Seo title="mon espace" description="account" />

      <UserLayout withSidebar pageTitle="Product Management">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              {products.length <= 1
                ? `Vous avez ${products.length} Produit`
                : `Vous avez ${products.length} Produits`}
            </h1>
            <Link href="/seller/product/create">
              <button className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-800 transition-colors">
                Add New Product
              </button>
            </Link>
          </div>

          <ProductList />
        </div>
      </UserLayout>
    </>
  );
}
