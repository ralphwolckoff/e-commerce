// import { useAuthStore } from "../store/authStore";
// import { Role } from "@/common/role.enum";
// import { toast } from "react-toastify";
// import api from "./api";
// import { ForgetPasswordFormType, LoginFormType, RegisterFormType, ResetPasswordFormType, UpdateUserProfileFormType } from "@/types/form";


// export const AuthService = {
//   registers: async (userData: RegisterFormType) => {
//     try {
//       const response = await api.post("/auth/register", userData);
//       return response.data;
//     } catch (error: any) {
//       throw error;
//     }
//   },

//   login: async (credentials: LoginFormType) => {
//     try {
//       const response = await api.post("/auth/login", credentials);
//       const user = response.data.user;
//       const token = response.data.access_token;
//       const res = response.data.refreshToken
//     localStorage.setItem("refreshToken" , res)
//       useAuthStore.getState().setAuth(true, token, user);
//       return response.data;
//     } catch (error: any) {
//       toast.error("Login failed:", error.response?.data || error.message);
//       throw error;
//     }
//   },

//   logout: async () => {
//     try {
//       await api.post("/auth/logout");
//       useAuthStore.getState().logout();
//     } catch (error: any) {
//       toast.error("Logout failed:", error.response?.data || error.message);
//       throw error;
//     }
//   },

//   // checkAuthStatus: async () => {
//   //   try {
//   //     const response = await api.get("/auth/status");
//   //     const user = response.data.user;
//   //     if (user) {
//   //       useAuthStore.getState().setAuth(true, user.access_token , );
//   //       return true;
//   //     }
//   //     useAuthStore.getState().setAuth(false, 
//   //       '' ,null);
//   //     return false;
//   //   } catch (error) {
//   //     useAuthStore.getState().setAuth(false, '', null);
//   //     return false;
//   //   }
//   // },

//   requestPasswordReset: async (email: ForgetPasswordFormType) =>{
//     const response = await api.post("/users/forgot-password", email);
//     return response.data
//   },

//   resetPassword: async (token:string, passwords: ResetPasswordFormType ) =>{
//     const payload = {token, passwords}
//     const response = await api.post("/users/reset-password", payload)
//     return response.data
//   },

//   getuser: async () => { 
//     const response = await api.get("/auth/user")
//     const user = response.data
//     return user
//   } ,

//   createUserProfile: async (userId: string , profileData: UpdateUserProfileFormType) => {
//     try {
      
//       const response = await api.post(`/auth/${userId}/profile`, profileData);
//       const user = response.data;
//       return user;
//     } catch (error) {
//       throw error
//     }
//   },

//   getUserProfile: async (userId:string) => {
//     const response = await api.get(`/users/${userId}`)
//     const userProfile = response.data.profile
//     useAuthStore.getState().setUserProfile(userProfile)
//     return userProfile
//   },
// }; 

import api from "./api";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import {
  ForgetPasswordFormType,
  LoginFormType,
  RegisterFormType,
  ResetPasswordFormType,
  UpdateUserFormType,
  UpdateUserProfileFormType,
} from "@/types/form";
import { AxiosError } from "axios";
import { error } from "console";
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
      // const profile = response.data.newUser.profile;
      
      return { access_token: token, user: user };
    } catch (error: any) {
      toast.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  },

  // logout: async () => {
  //   try {
  //     await api.post("/auth/logout");
  //     useAuthStore.getState().logout();
  //   } catch (error: any) {
  //     toast.error("Logout failed:", error.response?.data || error.message);
  //     throw error;
  //   }
  // },

  
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
    return userProfile;
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

      await api.post("/auth/logout");

      
      toast.success("Vous avez été déconnecté avec succès.");
    } catch (error ) {
      const axioError = error as AxiosError;
      console.error("Logout failed:", axioError.response?.data || axioError.message);
      // toast.error("Échec de la déconnexion côté serveur.");
    }
  },
};
