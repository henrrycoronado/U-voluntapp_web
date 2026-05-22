import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../app/store/authStore';

export function PublicRoute() {
  const { isAuthenticated } = useAuthStore();

  // Si el usuario ya está logueado, sin importar su rol,
  // lo redirigimos al dominio principal de la nueva arquitectura.
  if (isAuthenticated) {
    return <Navigate to="/programas" replace />;
  }

  // Si no está logueado, le permitimos ver la pantalla (Outlet renderiza el Login o Signup)
  return <Outlet />;
}
