// src/app/admin/products/page.tsx
import React from "react";
import Link from "next/link";
import ProductList from "../../../ui/modules/seller/products/list/ProductList";
import { Seo } from "@/components/seo/Seo";
import { UserLayout } from "@/components/layout/user-layout";
import { useProductStore } from "@/store/productStore";
import PromotionList from "@/ui/modules/seller/promotion/list-promotion";
import { usePromotionStore } from "@/store/promotionStore";

export default function ProductManagementPage() {
  const { promotions } = usePromotionStore();

  return (
    <>
      <Seo title="Shop Online | mon espace" description="account" />

      <UserLayout withSidebar pageTitle="Product Management">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              {promotions.length <= 1
                ? `Vous avez ${promotions.length} Promotion`
                : `Vous avez ${promotions.length} Promotions`}
            </h1>
            <Link href="/mon-espace/promotions/create">
              <button className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-800 transition-colors">
                Add New Promotion
              </button>
            </Link>
          </div>

          <PromotionList />
        </div>
      </UserLayout>
    </>
  );
}
