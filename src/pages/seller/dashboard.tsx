// app/seller/dashboard.tsx
import React, { useEffect } from "react";
import Link from "next/link";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { useProductStore } from "@/store/productStore";
import { useCategoryStore } from "@/store/categoryStore";
import { useOrdersStore } from "@/store/orderStore";

export default function SellerDashboardPage() { 
    const { products } = useProductStore();
    const { category } = useCategoryStore();
    const {orders} = useOrdersStore();
    

    const totalProducts = products.length;
    const totalCategories = category.length;
    const totalOrders = orders.length;

    const data = [
      { name: "Lun", Ventes: 4000 },
      { name: "Mar", Ventes: 3000 },
      { name: "Mer", Ventes: 2000 },
      { name: "Jeu", Ventes: 2780 },
      { name: "Ven", Ventes: 1890 },
      { name: "Sam", Ventes: 2390 },
      { name: "Dim", Ventes: 3490 },
    ];

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Welcome to your seller dashboard. Here's a quick overview of your
        business.
      </p>

      <div className="grid grid-cols-12 gap-6 bg-white rounded-lg shadow-md ">
        <div className="col-span-9 md:col-span-8 sm:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 p-6 rounded-lg shadow-sm text-blue-800">
              <h3 className="text-lg font-medium mb-1">Total des produits</h3>
              <p className="text-3xl font-bold">{totalProducts}</p>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg shadow-sm text-purple-800">
              <h3 className="text-lg font-medium mb-1">Total des catégories</h3>
              <p className="text-3xl font-bold">{totalCategories}</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-sm text-green-800">
              <h3 className="text-lg font-medium mb-1">Total des commandes</h3>
              <p className="text-3xl font-bold">{totalOrders}</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Statistiques de vente (Dernière semaine)
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Ventes"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-span-3 md:col-span-4 sm:col-span-4">
          <div className="flex flex-col items-center space-y-10">
            <Link
              href="/seller/product"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-green-700">
                Manage Products
              </h2>
              <p className="text-gray-500 mt-2">
                View, edit, and add new products to your store.
              </p>
            </Link>

            <Link
              href="/seller/my-account/commands"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-green-700">
                Manage Orders
              </h2>
              <p className="text-gray-500 mt-2">
                Track and update the status of customer orders.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
