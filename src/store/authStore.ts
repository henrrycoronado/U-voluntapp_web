import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'Admin' | 'Coordinator' | 'Volunteer';

interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
  role: UserRole | null;
  token: string | null;

  // --- NUEVOS CAMPOS DEL BACKEND ---
  profileId: string | null;
  firstName: string | null;
  lastName: string | null;

  // Hacemos que los nuevos campos sean opcionales por ahora para no romper tu login actual
  login: (
    email: string,
    role: UserRole,
    token?: string,
    profileId?: string,
    firstName?: string,
    lastName?: string
  ) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userEmail: null,
      role: null,
      token: null,
      profileId: null,
      firstName: null,
      lastName: null,

      login: (email, role, token, profileId, firstName, lastName) =>
        set({
          isAuthenticated: true,
          userEmail: email,
          role: role,
          // Si nos pasan el dato real del backend, lo usamos. Si no, usamos este mock.
          token: token || 'mock-jwt-token-12345',
          profileId: profileId || 'mock-uuid-98765',
          firstName: firstName || 'Usuario',
          lastName: lastName || 'Prueba',
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          userEmail: null,
          role: null,
          token: null,
          profileId: null,
          firstName: null,
          lastName: null,
        }),
    }),
    {
      name: 'u-voluntapp-session',
    }
  )
);
