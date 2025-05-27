import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isAxiosError } from "axios";
import { LoginUsuario } from "@/api/users/login-users";

import { User } from "@/interfaces/users/user.interface";
import { ResponseLogin } from "@/interfaces/users/login-response-user.interface";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<ResponseLogin>;
  logout: () => void;
  hasRole: (role: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response: ResponseLogin = await LoginUsuario(credentials);

          set({
            user: response,
            isAuthenticated: true,
            isLoading: false,
          });

          return response;
        } catch (error) {
          let errorMessage = "Error al iniciar sesión";
          if (isAxiosError(error)) {
            errorMessage = error.response?.data?.message || errorMessage;
          }
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });

        localStorage.removeItem("auth-storage");
      },

      hasRole: (role) => {
        const currentUser = get().user;

        if (!currentUser?.rol) return false;

        const hasAccess = currentUser.rol === role;

        return hasAccess;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,

        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoading = false;
        }
      },
    }
  )
);
