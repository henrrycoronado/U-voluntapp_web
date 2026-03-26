import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './features/auth/blocks/login/login';
import { AdminDashboard } from './features/dashboard/AdminDashboard/AdminDashboard';
import { ProtectedRoute } from './features/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* si entran a la raíz, se manda al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
