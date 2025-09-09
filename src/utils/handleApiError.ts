// utils/handleApiError.ts
import { AxiosError } from "axios";

export const handleApiError = (error: unknown) => {
  const axiosError = error as AxiosError;
  if (axiosError.response?.status === 404) {
    return null;
  }
  throw axiosError;
};
