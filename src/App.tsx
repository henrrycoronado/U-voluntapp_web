import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './features/auth/blocks/login/login';
import { AdminDashboard } from './features/dashboard/AdminDashboard/AdminDashboard';
import { VolunteerDashboard } from './features/volunteer/VolunteerDashboard';
import { ProtectedRoute } from './features/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*manda al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ruta pública */}
        <Route path="/login" element={<Login />} />

        {/*ADMINS y COLABORADORES */}
        <Route element={<ProtectedRoute allowedRoles={['Admin', 'Coordinator']} />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>

        {/*VOLUNTARIOS */}
        <Route element={<ProtectedRoute allowedRoles={['Volunteer']} />}>
          <Route path="/volunteer" element={<VolunteerDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
