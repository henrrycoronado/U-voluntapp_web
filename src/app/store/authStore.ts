import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser, UserRole } from '../../service/types/auth';
import { authApi } from '../../service/api/auth';

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
  role: UserRole | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser) => void;
  logout: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,

      setAuth: (user: AuthUser) => {
        const resolvedRoles =
          user.roles && user.roles.length > 0
            ? (user.roles as UserRole[])
            : parseRolesFromToken(user.token);
        const primaryRole = resolvedRoles.length > 0 ? resolvedRoles[0] : null;

        set({
          user: {
            ...user,
            roles: resolvedRoles,
          },
          token: user.token,
          role: primaryRole,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        const { user } = get();

        if (user?.refreshToken) {
          try {
            await authApi.logout({ refreshToken: user.refreshToken });
          } catch (error) {
            console.error('Error signing out on the server:', error);
          }
        }

        set({
          user: null,
          token: null,
          role: null,
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
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
