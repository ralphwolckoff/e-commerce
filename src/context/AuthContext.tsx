"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User} from "@/types/user";
import { AuthService } from "@/services/authService";
import { LoginFormType } from "@/types/form";
import { useAuthStore } from "@/store/authStore";
import { addressService } from "@/services/addressService";
import { useAddressStore } from "@/store/addressStore";

interface AuthContextType {
  authUser: User | null;
  authUserIsLoading: boolean;
  login: (credentials: LoginFormType) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authUserIsLoading, setAuthUserIsLoading] = useState<boolean>(true);
  const {
    user: authUser,
    token,
    logout: storeLogout,
  } = useAuthStore();


  const login = async (credentials: LoginFormType) => {
    try {
      await AuthService.login(credentials);
      
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    storeLogout();
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      if (authUser && token) {
        try {
          const user = await AuthService.getUserProfile(authUser.id);
          useAuthStore.getState().setUserProfile(user)
          const adress = await addressService.getAddress()
          useAddressStore.getState().setAddress(adress)
          console.log("Utilisateur restauré depuis le store persistant.");

        } catch (error) {
          console.error("Token expiré ou invalide, déconnexion...");
          storeLogout();
        }
      }else{
        setAuthUserIsLoading(false);
        return;
      }
      setAuthUserIsLoading(false);
    };

    checkUserStatus();
  }, [authUser, token, storeLogout]);

  const value = {
    authUser,
    authUserIsLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
}
