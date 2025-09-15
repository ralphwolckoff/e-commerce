import OrderDetailModal from "@/ui/modules/client/orders/OrderModal";
import { Order } from "@/types/commands";
import { Button } from "@/ui/design/button/button";
import { format } from "date-fns";
import { useState } from "react";

interface ClientProps {
  orders: Order;
}

export const ClientOrderList = ({ orders }: ClientProps) => {
  const isShipped = orders.status === "SHIPPED";
  const isDelivered = orders.status === "DELIVERED";
  const isCanceled = orders.status === "CANCELED";

  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => {
    setShowModal(true);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b border-gray-200 mb-4">
        <div>
          <p className="text-gray-500 text-sm">Order ID</p>
          <p className="font-bold text-gray-800">#{orders.id}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Date</p>
          <p className="font-bold text-gray-800">
            {format(new Date(orders.createdAt), "dd MMMM yyyy")}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Boutique</p>
          {/* Assurez-vous que l'objet customer est accessible, sinon ajustez cette ligne */}
          <p className="font-bold text-gray-800">
            {orders.store.name || "Boutique inconnu"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Statut</p>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              isShipped
                ? "bg-blue-100 text-blue-800"
                : isDelivered
                ? "bg-green-100 text-green-800"
                : isCanceled
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {orders.status}
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {orders.items?.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 p-2 bg-gray-50 rounded-md"
          >
            <div className="flex-1">
              <h3 className="text-md font-semibold text-gray-800">
                {item.product?.name}
              </h3>
              <p className="text-sm text-gray-600">
                Quantité : {item.quantity}
              </p>
              {/* Le prix unitaire est calculé à partir du priceAtOrder */}
              <p className="text-sm text-gray-600">
                Prix : {item.priceAtOrder.toFixed(2)} €
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center space-x-4">
        <p className="text-lg font-bold text-gray-800">
          Total : {orders.totalAmount?.toFixed(2)} €
        </p>
        <Button
          size="small"
          action={openModal}
          // baseUrl={`/seller/track-order/${order.id}`}
          className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md font-semibold hover:bg-gray-300 transition duration-300"
          variant="outline"
        >
          Détails de la commande
        </Button>
      </div>
      <OrderDetailModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        order={orders}
      />
    </div>
  );
};


// "use client";

// import { Order } from "@/types/commands";
// import { Button } from "@/ui/design/button/button";
// import { format } from "date-fns";
// import React, { useState } from "react";


// interface Props{
//   isOpen:boolean
//   onClose:()=>void
//   order: Order
// }


// const OrderDetailModal = ({ isOpen, onClose, order }: Props) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
//         <h2 className="text-2xl font-bold mb-4">
//           Détails de la commande #{order.id}
//         </h2>
//         <div className="space-y-2">
//           <p>
//             <strong>Boutique:</strong> {order.store.name}
//           </p>
//           <p>
//             <strong>Date:</strong> {format(order.createdAt, "dd MMMM yyyy")}
//           </p>
//           <p>
//             <strong>Statut:</strong> {order.status}
//           </p>
//           <p>
//             <strong>Total:</strong> {order.totalAmount.toFixed(2)} €
//           </p>
//           <h3 className="text-lg font-semibold mt-4">Articles:</h3>
//           <ul className="list-disc list-inside">
//             {order.items.map((item) => (
//               <li key={item.id}>
//                 {item.product?.name} - {item.quantity} x{" "}
//                 {item.priceAtOrder.toFixed(2)} €
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="text-right mt-6">
//           <Button
//             action={onClose}
//             className="bg-gray-200 text-gray-800 hover:bg-gray-300"
//           >
//             Fermer
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Original component modified to be self-contained
// interface PProps{
//   orders: Order
// }
// const ClientOrderList = ({ orders }: PProps) => {
//   const isShipped = orders.status === "SHIPPED";
//   const isDelivered = orders.status === "DELIVERED";
//   const isCanceled = orders.status === "CANCELED";
//   const [showModal, setShowModal] = useState(false);

//   const openModal = () => {
//     setShowModal(true);
//   };

//   return (
//     <div className="bg-white p-6  shadow-md mb-6 rounded-xl">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b border-gray-200 mb-4">
//         <div>
//           <p className="text-gray-500 text-sm">Order ID</p>
//           <p className="font-bold text-gray-800">#{orders.id}</p>
//         </div>
//         <div>
//           <p className="text-gray-500 text-sm">Date</p>
//           <p className="font-bold text-gray-800">
//             {format(orders.createdAt, "dd MMMM yyyy")}
//           </p>
//         </div>
//         <div>
//           <p className="text-gray-500 text-sm">Boutique</p>
//           <p className="font-bold text-gray-800">
//             {orders.store?.name || "Boutique inconnue"}
//           </p>
//         </div>
//         <div>
//           <p className="text-gray-500 text-sm">Statut</p>
//           <span
//             className={`px-3 py-1 text-xs font-semibold rounded-full ${
//               isShipped
//                 ? "bg-blue-100 text-blue-800"
//                 : isDelivered
//                 ? "bg-green-100 text-green-800"
//                 : isCanceled
//                 ? "bg-red-100 text-red-800"
//                 : "bg-yellow-100 text-yellow-800"
//             }`}
//           >
//             {orders.status}
//           </span>
//         </div>
//       </div>
//       <div className="space-y-4 mb-6">
//         {orders.items?.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center space-x-4 p-2 bg-gray-50  rounded-xl"
//           >
//             <div className="flex-1">
//               <h3 className="text-md font-semibold text-gray-800">
//                 {item.product?.name}
//               </h3>
//               <p className="text-sm text-gray-600">
//                 Quantité : {item.quantity}
//               </p>
//               <p className="text-sm text-gray-600">
//                 Prix : {item.priceAtOrder?.toFixed(2)} €
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-between items-center space-x-4">
//         <p className="text-lg font-bold text-gray-800">
//           Total : {orders.totalAmount?.toFixed(2)} €
//         </p>
//         <Button
//           action={openModal}
//           className="bg-gray-200 text-gray-800 hover:bg-gray-300"
//         >
//           Détails de la commande
//         </Button>
//       </div>
//       <OrderDetailModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         order={orders}
//       />
//     </div>
//   );
// };

// // New parent component to handle grouping and sorting
// export default function ClientOrderGroupedList() {
//   const mockOrders = [
//     {
//       id: "ord-1",
//       orderNumber: "1001",
//       status: "DELIVERED",
//       createdAt: "2024-05-15T10:00:00Z",
//       updatedAt: "2024-05-16T10:00:00Z",
//       userId: "user-1",
//       storeId: "store-1",
//       store: { name: "Boutique de Mode" },
//       totalAmount: 120.0,
//       items: [
//         {
//           id: "item-1",
//           product: { name: "Robe d'été" },
//           quantity: 1,
//           priceAtOrder: 120.0,
//         },
//       ],
//       shippingAddress: "123 Rue de Paris",
//       billingAddress: "123 Rue de Paris",
//       paymentStatus: "PAID",
//       shipmentTracking: "TRACK123",
//       notes: "",
//     },
//     {
//       id: "ord-2",
//       orderNumber: "1002",
//       status: "SHIPPED",
//       createdAt: "2024-05-20T14:30:00Z",
//       updatedAt: "2024-05-21T14:30:00Z",
//       userId: "user-2",
//       storeId: "store-2",
//       store: { name: "Boutique d'Électronique" },
//       totalAmount: 500.0,
//       items: [
//         {
//           id: "item-2",
//           product: { name: "Casque sans fil" },
//           quantity: 1,
//           priceAtOrder: 500.0,
//         },
//       ],
//       shippingAddress: "456 Avenue Tech",
//       billingAddress: "456 Avenue Tech",
//       paymentStatus: "PAID",
//       shipmentTracking: "TRACK456",
//       notes: "",
//     },
//     {
//       id: "ord-3",
//       orderNumber: "1003",
//       status: "PENDING",
//       createdAt: "2024-05-22T08:15:00Z",
//       updatedAt: "2024-05-22T08:15:00Z",
//       userId: "user-1",
//       storeId: "store-1",
//       store: { name: "Boutique de Mode" },
//       totalAmount: 75.0,
//       items: [
//         {
//           id: "item-3",
//           product: { name: "T-shirt graphique" },
//           quantity: 2,
//           priceAtOrder: 37.5,
//         },
//       ],
//       shippingAddress: "123 Rue de Paris",
//       billingAddress: "123 Rue de Paris",
//       paymentStatus: "PENDING",
//       shipmentTracking: "",
//       notes: "",
//     },
//     {
//       id: "ord-4",
//       orderNumber: "1004",
//       status: "DELIVERED",
//       createdAt: "2024-05-18T18:45:00Z",
//       updatedAt: "2024-05-19T18:45:00Z",
//       userId: "user-2",
//       storeId: "store-2",
//       store: { name: "Boutique d'Électronique" },
//       totalAmount: 99.99,
//       items: [
//         {
//           id: "item-4",
//           product: { name: "Souris de jeu" },
//           quantity: 1,
//           priceAtOrder: 99.99,
//         },
//       ],
//       shippingAddress: "456 Avenue Tech",
//       billingAddress: "456 Avenue Tech",
//       paymentStatus: "PAID",
//       shipmentTracking: "TRACK789",
//       notes: "",
//     },
//     {
//       id: "ord-5",
//       orderNumber: "1005",
//       status: "CANCELED",
//       createdAt: "2024-05-21T11:00:00Z",
//       updatedAt: "2024-05-21T11:00:00Z",
//       userId: "user-3",
//       storeId: "store-3",
//       store: { name: "Librairie du Coin" },
//       totalAmount: 25.0,
//       items: [
//         {
//           id: "item-5",
//           product: { name: "Livre de science-fiction" },
//           quantity: 1,
//           priceAtOrder: 25.0,
//         },
//       ],
//       shippingAddress: "789 Boulevard Livres",
//       billingAddress: "789 Boulevard Livres",
//       paymentStatus: "REFUNDED",
//       shipmentTracking: "",
//       notes: "",
//     },
//   ];

//   // Group orders by store name
//   const groupedOrders: Record<string, typeof mockOrders> = mockOrders.reduce(
//     (groups, order) => {
//       const storeName = order.store.name || "Boutique inconnue";
//       if (!groups[storeName]) {
//         groups[storeName] = [];
//       }
//       groups[storeName].push(order);
//       return groups;
//     },
//     {} as Record<string, typeof mockOrders>
//   );

//   return (
//     <div className="p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8">Mes Commandes</h1>
//         {Object.keys(groupedOrders).map((storeName) => {
//           // Sort orders for the current store by date descending
//           const sortedOrders = groupedOrders[storeName].sort(
//             (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//           );

//           return (
//             <div key={storeName} className="mb-8">
//               {sortedOrders.map((order) => (
//                 <ClientOrderList key={order.id} orders={order} />
//               ))}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
