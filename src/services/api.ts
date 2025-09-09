// api.ts

import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";


// Configuration de base d'Axios
const api = axios.create({
  baseURL: API_BASE_URL, // Assurez-vous que cette variable est configurée
  withCredentials: true,
});

// Intercepteur pour ajouter le token d'accès aux requêtes sortantes
api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      // Assurez-vous que l'en-tête 'Authorization' est toujours défini
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer le rafraîchissement du token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Vérifier si la requête n'est pas déjà en train d'être retentée
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        

        // Tenter de rafraîchir le token
        const response = await api.post("/auth/refresh");
        const { accessToken} = response.data;

        // Mettre à jour le store
        useAuthStore.getState().setAuth(true, accessToken, useAuthStore.getState().user);

        // Réassigner le nouveau token à la requête originale et la retenter
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // En cas d'échec du rafraîchissement, se déconnecter
        console.error("Échec du rafraîchissement du token", refreshError);
        // useAuthStore.getState().logout();
        // toast.error("Session expirée. Veuillez vous reconnecter.");
        return Promise.reject(refreshError);
      }
    }
    // Gérer spécifiquement l'erreur 401 sur la déconnexion
    if (error.response?.status === 401 && originalRequest.url?.includes("/auth/logout")) {
      // Si on essaie de se déconnecter avec un token expiré,
      // on ignore l'erreur car la déconnexion locale a déjà eu lieu.
      return Promise.resolve({ data: { message: "Logout successful despite expired token." } });
    }

    return Promise.reject(error);
  }
);

export default api;


// import axios from "axios";
// import { useAuthStore } from "@/store/authStore";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// type FailedRequestPromise = {
//   resolve: (value: string | PromiseLike<string>) => void;
//   reject: (reason?: any) => void;
// };

// let isRefreshing = false;
// let failedQueue: FailedRequestPromise[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   if (error) {
//     failedQueue.forEach((prom) => prom.reject(error));
//   } else if (token) {
//     failedQueue.forEach((prom) => prom.resolve(token));
//   }
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return api(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;
//       const store = useAuthStore.getState();

//       try {
//         // Appel à l'endpoint de rafraîchissement
//         const response = await api.post("/auth/refresh");
//         const { accessToken } = response.data;

//         // Mettre à jour le token dans le store et les en-têtes
//         store.setAuth(true, accessToken, store.user);
//         api.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${accessToken}`;

//         processQueue(null, accessToken);
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Si le rafraîchissement échoue, déconnecter l'utilisateur
//         store.logout();
//         processQueue(refreshError, null);
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;