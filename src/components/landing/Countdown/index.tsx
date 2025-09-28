"use client";

import CountdownCarousel from "./CountdownCarousel";
import { Promotion } from "@/types/promotion";
import promotionService from "@/services/promotionService";
import { useEffect, useState } from "react";


const App = () => {
const [promotions, setPromotions] = useState<Promotion[]>([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const data = await promotionService.findAll();
      setPromotions(data);
    } catch (error) {
      console.error("Failed to fetch promotions:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchPromotions();
}, []);

if (loading) return <div>Chargement des promotions...</div>;
    
  return (
    <main className="bg-white min-h-screen py-12">
      <CountdownCarousel promotions={promotions} />
    </main>
  );
};

export default App;
