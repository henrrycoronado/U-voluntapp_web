import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser, UserRole } from '../types/auth';

function parseRolesFromToken(token: string): UserRole[] {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const roleClaim = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (!roleClaim) {
      return [];
    }

    if (Array.isArray(roleClaim)) {
      return roleClaim as UserRole[];
    }

    return [roleClaim as UserRole];
  } catch {
    return [];
  }
}

interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser) => void;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user: AuthUser) => {
        const resolvedRoles = user.roles?.length ? user.roles : parseRolesFromToken(user.token);

        set({
          user: {
            ...user,
            roles: resolvedRoles,
          },
          token: user.token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      hasRole: (role: UserRole) => {
        const { user } = get();
        return user?.roles?.includes(role) ?? false;
      },

      hasAnyRole: (roles: UserRole[]) => {
        const { user } = get();
        return roles.some((role) => user?.roles?.includes(role)) ?? false;
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
