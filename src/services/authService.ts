

import api from "./api";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import {
  ForgetPasswordFormType,
  LoginFormType,
  RegisterFormType,
  ResetPasswordFormType,
  UpdateUserFormType,
} from "@/types/form";
import { AxiosError } from "axios";
import { PersonalInfo } from "@/components/MyAccount/edit/edit-personal-infoModal";
import { useStoreStore } from "@/store/storeStore";
import { UpdateProfile } from "@/types/user";
import { useCartStore } from "@/store/cartStore";

export const AuthService = {
  registers: async (userData: RegisterFormType) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  login: async (credentials: LoginFormType) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const token = response.data.accessToken;
      const user = response.data.newUser; 
      const refreshToken = response.data.newUser.refreshToken 
      useAuthStore.getState().setToken(refreshToken)    
      return {access_token: token, user };
    } catch (error: any) {
      toast.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  },

  
  requestPasswordReset: async (email: ForgetPasswordFormType) => {
    const response = await api.post("/users/forgot-password", email);
    return response.data;
  },

  resetPassword: async (token: string, passwords: ResetPasswordFormType) => {
    const payload = { token, passwords };
    const response = await api.post("/users/reset-password", payload);
    return response.data;
  },

  getuser: async () => {
    const response = await api.get("/users/profile");
    const user = response.data;
    return user;
  },

  createUserProfile: async (
    userId: string,
    profileData: PersonalInfo
  ) => {
    try {
      const response = await api.patch(`/users/${userId}/profile`, profileData);
      const user = response.data;
      return user;
    } catch (error) {
      throw error;
    }
  },
  
  getUserProfile: async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    const userProfile = response.data.profile;
    const store = response.data.store
    useStoreStore.getState().setStore(store);
    return response.data;
  },

  updateUserProfile: async (userId: string, profileData: UpdateProfile) => {
    try {
      const response = await api.patch(`/users/${userId}/role`, profileData);
      const userProfile = response.data;
      return userProfile;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (userId: string, userData: UpdateUserFormType) => {
    try {
      const response = await api.patch(`/users/${userId}`, userData);
      const user = response.data;
      return user;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {

      useAuthStore.getState().logout()
      useCartStore.getState().clearCart()
            
     toast.success("Vous avez été déconnecté avec succès.");
    } catch (error ) {
      const axioError = error as AxiosError;
      console.error("Logout failed:", axioError.response?.data || axioError.message);
    }
  },
};
