import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  admin: Admin | null;
  setAuth: (token: string, admin: Admin) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      admin: null,

      setAuth: (token, admin) => set({ token, admin }),

      logout: () => set({ token: null, admin: null }),

      isAuthenticated: () => {
        const { token } = get();
        if (!token) return false;
        // Decode JWT and check expiry
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.exp * 1000 > Date.now();
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'dms-bo-auth',
      partialize: (state) => ({ token: state.token, admin: state.admin }),
    },
  ),
);
