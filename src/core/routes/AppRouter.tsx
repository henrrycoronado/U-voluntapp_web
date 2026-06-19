import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PublicLayout } from '../components/layout/PublicLayout';
import { PrivateLayout } from '../components/layout/PrivateLayout';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import SignUpPage from '../../pages/SignUpPage';
import NotFoundPage from '../../pages/NotFoundPage';
import UnauthorizedPage from '../../pages/UnauthorizedPage';

import DashboardPage from '../../features/dashboard/pages/DashboardPage';
import ProfilePage from '../../features/profiles/pages/ProfilePage';
import ProgramsPage from '../../features/programs/pages/ProgramsPage';
import ProgramDetailPage from '../../features/programs/pages/ProgramDetailPage';
import ProgramActivitiesPage from '../../features/programs/pages/ProgramActivitiesPage';
import ActivitiesPage from '../../features/activities/pages/ActivitiesPage';
import ActivityDetailPage from '../../features/activities/pages/ActivityDetailPage';
import RoleRequestsPage from '../../features/roles/pages/RoleRequestsPage';
import TrackingPage from '../../features/tracking/pages/TrackingPage';
import ReportsPage from '../../features/reports/pages/ReportsPage';

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
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs/:id" element={<ProgramDetailPage />} />
            <Route path="/programs/:id/activities" element={<ProgramActivitiesPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetailPage />} />
            <Route path="/requests" element={<RoleRequestsPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
