"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "@/types/user";
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
  const [authUser, setAuthUser] = useState<User | null>(null);
  const { user, token, logout: storeLogout } = useAuthStore();
  const { setAddress } = useAddressStore.getState();

  const checkUserStatus = async () => {
    if (user && token) {
      try {
        const response = await AuthService.getUserProfile(user.id);
        const profile = response.profile;
        const users = {
          id: response.id,
          email: response.email,
          onboardingIsCompleted: response.onboardingIsCompleted,
          role: response.role,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        };
        setAuthUser(users);
        useAuthStore.getState().setUserProfile(profile);
        const adress = await addressService.getAddress();
        setAddress(adress);
        console.log("Utilisateur restauré depuis le store persistant.", users);
      } catch (error) {
        console.error("Token expiré ou invalide, déconnexion...");
        storeLogout();
        setAuthUser(null);
      }
    } else {
      setAuthUser(null);
    }
    setAuthUserIsLoading(false);
  };

  const login = async (credentials: LoginFormType) => {
    try {
      const {access_token, user }= await AuthService.login(credentials);
      useAuthStore.getState().setAuth(true, access_token, user)
      await checkUserStatus();
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    storeLogout();
    setAuthUser(null);
    setAuthUserIsLoading(false);
  };

  useEffect(() => {
    checkUserStatus();
  }, [token]);

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
