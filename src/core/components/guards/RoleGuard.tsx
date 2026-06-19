import React, { type ReactNode } from 'react';
import { useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../networks/types';

interface RoleGuardProps {
  children: ReactNode;
  requiredRoles: UserRole[];
  fallback?: ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ children, requiredRoles, fallback = null }) => {
  const hasAnyRole = useAuthStore((state) => state.hasAnyRole);

  if (!hasAnyRole(requiredRoles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
