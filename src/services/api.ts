// import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
// import { toast } from "react-toastify";
// import { useAuthStore } from "../store/authStore";

// interface AxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
//   _retry?: boolean;
// }

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let isRefreshing = false;
// let failedQueue: {
//   resolve: (value: unknown) => void;
//   reject: (reason?: any) => void;
// }[] = [];

// const processQueue = (
//   error: AxiosError | null,
//   token: string | null = null
// ) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// api.interceptors.request.use(
//   (config) => {
//     const authStore = useAuthStore.getState();
//     const accessToken = authStore.token;

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfigWithRetry;

//     if (
//       error.response?.status === 401 &&
//       originalRequest &&
//       !originalRequest._retry
//     ) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             if (originalRequest.headers) {
//               originalRequest.headers.Authorization = `Bearer ${token}`;
//             }
//             return api(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         // AJOUT: Récupérer le refreshToken depuis le store Zustand persistant
//         const authStore = useAuthStore.getState();
//         const refreshToken = authStore.refreshToken;

//         if (!refreshToken) {
//           throw new Error("No refresh token found.");
//         }

//         const response = await axios.post(
//           `${API_BASE_URL}/auth/refresh`,
//           { refreshToken },
//           { withCredentials: true }
//         );

//         const { access_token: newAccessToken, refreshToken: newRefreshToken } =
//           response.data;

//         // MISE À JOUR: Stocker le nouveau refreshToken dans le store
//         authStore.setAuth(
//           true,
//           newAccessToken,
//           authStore.user,
//           newRefreshToken
//         );

//         processQueue(null, newAccessToken);

//         if (originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         }
//         return api(originalRequest);
//       } catch (err: any) {
//         processQueue(err, null);
//         useAuthStore.getState().logout();
//         toast.error("Votre session a expiré. Veuillez vous reconnecter.");
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;


// api.ts

import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

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