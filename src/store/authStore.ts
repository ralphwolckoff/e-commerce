import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Profile, User } from "@/types/user";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  profile: Profile | null;
  token: string | null;
  error: string | null;
  refreshToken:string |null
  setToken: (refreshToken: string| null) =>void
  setUserProfile: (profile: Profile | null) => void;
  setAuth: (
    isAuthenticated: boolean,
    token: string,
    user: User | null,
  ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      profile: null,
      user: null,
      token: null,
      refreshToken: null,
      error: null,
      setToken : (refreshToken) => set ({
        refreshToken
      }),
      setUserProfile: (profile) => set({ profile }),
      setAuth: (isAuthenticated, token, user) =>
        set({ isAuthenticated, token, user }), 
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
