import { Status } from "@/common/status.enum";
import { useAuth } from "@/context/AuthContext";
import { orderService } from "@/services/orderService";
import { useAuthStore } from "@/store/authStore";
import { useOrdersStore } from "@/store/orderStore";
import { Order } from "@/types/commands";
import { Typography } from "@/ui/design/typography/Typography";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ClientDashboardPage() {
 const [commands, setCommands] = useState<Order[]>([]);
 const [loading, setLoading] = useState(true);
 const { authUser } = useAuth();

 useEffect(() => {
   const fetchCommands = async () => {
     try {
       setLoading(true);
       if (authUser) {
         const fetchedCommands = await orderService.getClientCommands(
           authUser.id
         );
         useOrdersStore.getState().setOrders(fetchedCommands);
         setCommands(fetchedCommands);
       }
       setLoading(false);
     } catch (error) {
       console.error("Échec du chargement des commandes:", error);
       toast.error("Échec du chargement de l'historique des commandes.");
     } finally {
       setLoading(false);
     }
   };
   fetchCommands();
 }, []);

 if (loading) {
   return (
     <div className="text-center py-10">Chargement de vos commandes...</div>
   );
 }

 if (commands.length === 0) {
   return (
     <div className="text-center py-10">
       Vous n'avez pas encore passé de commande.
     </div>
   );
 }
  const getOrderStatusCount = (status: Status) =>
    commands?.filter((order) => order.status === status).length;

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <Typography variant="caption1" component="p" className="mb-10">
        Welcome to your personal account. Here you can manage your orders and
        profile.
      </Typography>

      <div
        id="overview-content"
        className="tab-content active bg-white p-6 md:p-8 rounded-2xl shadow-lg"
      >
        <Typography variant="h2" component="h2" theme="gray" className="mb-6">
          Aperçu
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <Typography
              variant="body-base"
              component="h3"
              theme="gray"
              className="text-lg font-medium text-blue-800"
            >
              Commandes totales
            </Typography>
            <p
              id="totalOrders"
              className="text-4xl font-extrabold text-blue-600 mt-2"
            >
              {commands?.length}
            </p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <Typography
              variant="body-base"
              component="h3"
              theme="gray"
              className="text-lg font-medium text-yellow-800"
            >
              En attente
            </Typography>
            <p
              id="pendingOrders"
              className="text-4xl font-extrabold text-yellow-600 mt-2"
            >
              {getOrderStatusCount("PENDING")}
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <Typography
              variant="body-base"
              component="h3"
              theme="gray"
              className="text-lg font-medium text-green-800"
            >
              Expédiée
            </Typography>
            <p
              id="deliveredOrders"
              className="text-4xl font-extrabold text-green-600 mt-2"
            >
              {getOrderStatusCount("SHIPPED")}
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <Typography
              variant="body-base"
              component="h3"
              theme="gray"
              className="text-lg font-medium text-green-800"
            >
              Livrés
            </Typography>
            <p
              id="deliveredOrders"
              className="text-4xl font-extrabold text-green-600 mt-2"
            >
              {getOrderStatusCount("DELIVERED")}
            </p>
          </div>
          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <Typography
              variant="body-base"
              component="h3"
              theme="gray"
              className="text-lg font-medium text-red-800"
            >
              Annulées
            </Typography>
            <p
              id="deliveredOrders"
              className="text-4xl font-extrabold text-red-600 mt-2"
            >
              {getOrderStatusCount("CANCELED")}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/client/my-account/commands"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-green-700">
            Mes commandes
          </h2>
          <p className="text-gray-500 mt-2">
            View the status and history of your orders.
          </p>
        </Link>
      </div>
    </div>
  );
}
