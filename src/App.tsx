import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { ProtectedRoute } from './router/ProtectedRoute';

import RootLayout from './layout/RootLayout';
import AppLayout from './layout/AppLayout';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

import VolunteerDashboard from './modules/volunteer/pages/Dashboard';
import CoordinatorDashboard from './modules/coordinator/pages/Dashboard';
import AdminDashboard from './modules/admin/pages/Dashboard';

function HomeRedirect() {
  const { isAuthenticated, hasAnyRole } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (hasAnyRole(['Volunteer', 'Coordinator', 'Admin'])) {
    return <Navigate to="/volunteer" replace />;
  }

  return <Navigate to="/unauthorized" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/volunteer"
              element={
                <ProtectedRoute requiredRoles={['Volunteer', 'Coordinator', 'Admin']}>
                  <VolunteerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coordinator"
              element={
                <ProtectedRoute requiredRoles={['Coordinator', 'Admin']}>
                  <CoordinatorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRoles={['Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
