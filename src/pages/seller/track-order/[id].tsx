"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { orderService } from "@/services/orderService";
import OrderDetailCard from "./components/OrderDetailCard";
import { Button } from "@/ui/design/button/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Order } from "@/types/commands";

export default function SellerTrackOrderPage() {
  // useAuthRedirect({ isPublicPage: false, allowedRoles: Role.VENDOR });
  const params = useParams();
  const commandId = params.id as string;
  const [command, setCommand] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCommand = async () => {
    try {
      setLoading(true);
      const fetchedCommand = await orderService.getCommandById(commandId);
      setCommand(fetchedCommand);
    } catch (error) {
      console.error("Échec du chargement de la commande:", error);
      toast.error("Échec du chargement des détails de la commande.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (commandId) {
      fetchCommand();
    }
  }, [commandId]);

  const handleUpdateStatus = async (newStatus: "SHIPPED" | "DELIVERED") => {
    if (!command) return;
    try {
      await orderService.updateCommandStatus(command.id, newStatus);
      toast.success(`Statut de la commande mis à jour vers ${newStatus}.`);
      fetchCommand(); // Recharge la commande pour obtenir les nouvelles dates
    } catch (error) {
      console.error("Échec de la mise à jour du statut:", error);
      toast.error("Échec de la mise à jour du statut de la commande.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Chargement des détails de la commande...
      </div>
    );
  }

  if (!command) {
    return <div className="text-center py-10">Commande non trouvée.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Suivi de la Commande #{command.id}
      </h1>
      <OrderDetailCard command={command} />

      {/* Boutons de mise à jour du statut pour le vendeur */}
      <div className="mt-8 flex justify-center space-x-4">
        {command.status === "PENDING" && (
          <Button
            action={() => handleUpdateStatus("SHIPPED")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Marquer comme expédié
          </Button>
        )}
        {command.status === "SHIPPED" && (
          <Button
            action={() => handleUpdateStatus("DELIVERED")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Marquer comme livré
          </Button>
        )}
      </div>
    </div>
  );
}
