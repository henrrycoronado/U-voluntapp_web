import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../store/authStore';
interface Props {
  allowedRoles: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    return role === 'Volunteer' ? (
      <Navigate to="/volunteer" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    );
  }

  return <Outlet />;
};
