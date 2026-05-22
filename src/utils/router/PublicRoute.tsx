import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../app/store/authStore';

export function PublicRoute() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/programas" replace />;
  }

  return <Outlet />;
}
