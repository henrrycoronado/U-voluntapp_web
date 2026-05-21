import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../app/store/authStore';

export const PublicRoute = () => {
  const { token, user } = useAuthStore();

  if (token) {
    const primaryRole = user?.roles?.[0]?.toLowerCase() || 'volunteer';

    return <Navigate to={`/${primaryRole}`} replace />;
  }

  return <Outlet />;
};
