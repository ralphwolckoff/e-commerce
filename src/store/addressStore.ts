import { create } from "zustand";
import { addressService } from "@/services/addressService";
import { Address, CreateAddressDto } from "@/types/address";

interface AddressStoreState {
  address: Address | null;
  isLoading: boolean;
  error: string | null;
  setAddress: (address: Address | null) =>void
  fetchAddress: () => Promise<void>;
  saveAddress: (data: CreateAddressDto) => Promise<void>;
}

export const useAddressStore = create<AddressStoreState>((set) => ({
  address: null,
  isLoading: false,
  error: null,

  setAddress: (address) => set({address}),
  fetchAddress: async () => {
    set({ isLoading: true, error: null });
    try {
      const address = await addressService.getAddress();
      set({ address, isLoading: false });
    } catch (err) {
      set({
        error: "Échec de la récupération de l'adresse.",
        isLoading: false,
      });
    }
  },

  saveAddress: async (data: CreateAddressDto) => {
    set({ isLoading: true, error: null });
    try {
      const updatedAddress = await addressService.createOrUpdateAddress(data);
      set({ address: updatedAddress, isLoading: false });
    } catch (err) {
      set({ error: "Échec de la sauvegarde de l'adresse.", isLoading: false });
    }
  },
}));
