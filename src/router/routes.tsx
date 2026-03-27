import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import RootLayout from '../layout/RootLayout';
import AppLayout from '../layout/AppLayout';

import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import NotFoundPage from '../pages/NotFoundPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';

import VolunteerDashboard from '../modules/volunteer/pages/Dashboard';
import CoordinatorDashboard from '../modules/coordinator/pages/Dashboard';
import AdminDashboard from '../modules/admin/pages/Dashboard';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'unauthorized',
        element: <UnauthorizedPage />,
      },
      {
        path: '',
        element: <AppLayout />,
        children: [
          {
            path: 'volunteer',
            element: (
              <ProtectedRoute requiredRoles={['Volunteer', 'Coordinator', 'Admin']}>
                <VolunteerDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: 'coordinator',
            element: (
              <ProtectedRoute requiredRoles={['Coordinator', 'Admin']}>
                <CoordinatorDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: 'admin',
            element: (
              <ProtectedRoute requiredRoles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
