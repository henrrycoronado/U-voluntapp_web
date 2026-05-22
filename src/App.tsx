import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './app/store/authStore';
import { PublicRoute } from './utils/router/PublicRoute';
import { GuardRole } from './routes/GuardRole';

import RootLayout from './components/layout/RootLayout';
import AppLayout from './components/layout/AppLayout';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

// VISTAS DE TUS NUEVOS DOMINIOS (Features)
import { ProgramList } from './features/programas/views/ProgramList';
import { ProgramDetails } from './features/programas/views/ProgramDetails';
import { ProfileForm } from './features/miembros/views/ProfileForm';

function HomeRedirect() {
  const { isAuthenticated, hasAnyRole } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (hasAnyRole(['Volunteer', 'Coordinator', 'Admin', 'SuperUser'])) {
    return <Navigate to="/programas" replace />;
  }

  return <Navigate to="/unauthorized" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomeRedirect />} />

          {/* 1. RUTAS PÚBLICAS */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>

          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* 2. RUTAS DE NEGOCIO (Domain-Driven) */}
          <Route element={<AppLayout />}>
            {/* Dominio: Programas */}
            <Route element={<GuardRole requiredRoles={['Volunteer', 'Coordinator', 'Admin', 'SuperUser']} />}>
              <Route path="/programas" element={<ProgramList />} />
              <Route path="/programas/:id" element={<ProgramDetails />} />
            </Route>

            {/* Dominio: Miembros (Perfil) */}
            <Route element={<GuardRole requiredRoles={['Volunteer', 'Coordinator', 'Admin', 'SuperUser']} />}>
              <Route path="/perfil" element={<ProfileForm />} />
            </Route>

          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
