import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../app/store/authStore';
import type { UserRole } from '../service/types/auth';

interface GuardRoleProps {
  requiredRoles?: UserRole[];
}

export const GuardRole = ({ requiredRoles }: GuardRoleProps) => {
  const { isAuthenticated, hasAnyRole } = useAuthStore();

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si se especificaron roles requeridos y el usuario no los tiene
  if (requiredRoles && requiredRoles.length > 0) {
    if (!hasAnyRole(requiredRoles)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Si pasa todas las validaciones, renderizar el outlet anidado
  return <Outlet />;
};
