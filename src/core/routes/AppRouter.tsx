import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from '../../layout/PublicLayout';
import PrivateLayout from '../../layout/PrivateLayout';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import SignUpPage from '../../pages/SignUpPage';
import NotFoundPage from '../../pages/NotFoundPage';
import UnauthorizedPage from '../../pages/UnauthorizedPage';

import DashboardPage from '../../features/dashboard/pages/DashboardPage';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
