import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      admin: null,
      isAuthenticated: false,

      login: (token, admin) => {
        localStorage.setItem('ve_admin_token', token);
        set({ token, admin, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem('ve_admin_token');
        set({ token: null, admin: null, isAuthenticated: false });
      },
    }),
    { name: 've-auth-store' }
  )
);
