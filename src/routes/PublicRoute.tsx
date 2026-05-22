import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../app/store/authStore';

export const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/programs" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
