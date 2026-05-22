import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../app/store/authStore';

export const HomeRedirect = () => {
  const { isAuthenticated, hasAnyRole } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (hasAnyRole(['Volunteer', 'Coordinator', 'Admin', 'SuperUser'])) {
    return <Navigate to="/programs" replace />;
  }

  return <Navigate to="/unauthorized" replace />;
};

export default HomeRedirect;
