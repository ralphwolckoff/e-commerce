import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";

const API_BASE_URL = "https://pubs-r135.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Configuration par défaut pour les appels via 'api'
});

type FailedRequestPromise = {
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (reason?: any) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequestPromise[] = [];

const processQueue = (error: any, token: string | null = null) => {
  if (error) {
    failedQueue.forEach((prom) => prom.reject(error));
  } else if (token) {
    failedQueue.forEach((prom) => prom.resolve(token));
  }
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Vérification de la réponse HTTP et du statut 401
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise<string>(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers!.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      const store = useAuthStore.getState();
      const refreshToken = store.refreshToken;

      if (!refreshToken) {
        store.logout();
        processQueue(new Error("Refresh token missing, logging out."));
        return Promise.reject(error);
      }

      try {
        // CORRECTION MAJEURE: S'assurer que withCredentials est défini 
        // pour que les cookies (où est souvent stocké le Refresh Token) soient envoyés.
        const response = await axios.post(
            `${API_BASE_URL}/auth/refresh`, 
            { refreshToken }, 
            { withCredentials: true } 
        ); 
        
        const { accessToken, newRefreshToken } = response.data; 

        // Mettre à jour le token dans le store et les en-têtes
        store.setAuth(true, accessToken, store.user);
        store.setToken(newRefreshToken || refreshToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        processQueue(null, accessToken);
        
        originalRequest.headers!.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        store.logout();
        console.error("Token refresh failed, logging out:", refreshError);
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Gérer les erreurs non-401 ou les erreurs réseau sans réponse
    return Promise.reject(error);
  }
);

export default api;