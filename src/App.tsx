import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './features/auth/blocks/login/login';
import { AdminDashboard } from './features/dashboard/AdminDashboard/AdminDashboard';
import { VolunteerDashboard } from './features/volunteer/VolunteerDashboard';
import { ProtectedRoute } from './features/auth/ProtectedRoute';
import { Register } from './features/auth/blocks/register/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* manda al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMINS y COLABORADORES */}
        <Route element={<ProtectedRoute allowedRoles={['Admin', 'Coordinator']} />}>
          <Route path="/dashboard" element={<AdminDashboard moduleName="Programas" />} />
          <Route path="/reportes" element={<AdminDashboard moduleName="Reportes" />} />
          <Route path="/becas" element={<AdminDashboard moduleName="Becas" />} />
          <Route path="/seguimientos" element={<AdminDashboard moduleName="Seguimientos" />} />
          <Route path="/solicitudes" element={<AdminDashboard moduleName="Solicitudes" />} />
          <Route path="/perfil-admin" element={<AdminDashboard moduleName="Perfil" />} />
          <Route
            path="/configuracion-admin"
            element={<AdminDashboard moduleName="Configuración" />}
          />
        </Route>

        {/* VOLUNTARIOS */}
        <Route element={<ProtectedRoute allowedRoles={['Volunteer']} />}>
          <Route path="/volunteer" element={<VolunteerDashboard moduleName="Programas" />} />
          <Route path="/mi-dashboard" element={<VolunteerDashboard moduleName="Dashboard" />} />
          <Route path="/mis-reportes" element={<VolunteerDashboard moduleName="Reportes" />} />
          <Route path="/historial" element={<VolunteerDashboard moduleName="Historial" />} />
          <Route path="/mis-becas" element={<VolunteerDashboard moduleName="Becas" />} />
          <Route path="/perfil" element={<VolunteerDashboard moduleName="Perfil" />} />
          <Route
            path="/configuracion"
            element={<VolunteerDashboard moduleName="Configuración" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
