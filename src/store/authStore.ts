import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'Admin' | 'Coordinator' | 'Volunteer';

interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
  role: UserRole | null;
  token: string | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userEmail: null,
      role: null,
      token: null,

      login: (email, role) =>
        set({
          isAuthenticated: true,
          userEmail: email,
          role: role,
          token: 'mock-jwt-token-12345',
        }),
      logout: () => set({ isAuthenticated: false, userEmail: null, role: null, token: null }),
    }),
    {
      name: 'u-voluntapp-session',
    }
  )
);
