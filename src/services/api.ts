import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://pubs-r135.onrender.com"  ;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
      // Assurez-vous que l'en-tête 'Authorization' est toujours défini
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
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      const store = useAuthStore.getState();

      try {
        // Appel à l'endpoint de rafraîchissement
        const payload = store.refreshToken
        const response = await api.post("/auth/refresh", {payload});
        const { accessToken } = response.data;
        console.log({payload, accessToken});

        // Mettre à jour le token dans le store et les en-têtes
        store.setAuth(true, accessToken, store.user);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        processQueue(null, accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        store.logout();
        console.log({refreshError});
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;