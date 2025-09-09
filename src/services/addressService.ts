import api from "./api";
import { AxiosError } from "axios";
import { Address, CreateAddressDto } from "@/types/address";

// Assurez-vous que le type `Address` correspond à votre modèle Prisma Address et
// que le type `CreateAddressDto` est le même que dans votre backend.

export const addressService = {
 
  async createOrUpdateAddress(data: CreateAddressDto): Promise<Address> {
    try {
      const response = await api.post("/addresses", data);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'adresse :", error);
      throw error;
    }
  },

  
  async getAddress(): Promise<Address | null> {
    try {
      const response = await api.get<Address>("/addresses/me");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        return null; // Retourne null si l'adresse n'existe pas
      }
      console.error(
        "Erreur lors de la récupération de l'adresse :",
        axiosError.message
      );
      throw axiosError;
    }
  },
};
