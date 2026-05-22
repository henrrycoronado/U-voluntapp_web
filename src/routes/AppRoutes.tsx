import { Routes, Route } from 'react-router-dom';

import { RootLayout, AppLayout } from '../shared/layout';

import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import NotFoundPage from '../pages/NotFoundPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';

import { ProgramList } from '../features/programs/views/ProgramList';
import { ProgramDetails } from '../features/programs/views/ProgramDetails';
import { ProfileForm } from '../features/profile/views/ProfileForm';
import { ActivityDetails } from '../features/activities/views/ActivityDetails';
import { MyEnrollments } from '../features/enrollments/views/MyEnrollments';
import { ReviewEnrollments } from '../features/enrollments/views/ReviewEnrollments';

import PublicRoute from './PublicRoute.tsx';
import PrivateRoute from './PrivateRoute.tsx';
import HomeRedirect from './HomeRedirect';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomeRedirect />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/programs" element={<ProgramList />} />
            <Route path="/programs/:id" element={<ProgramDetails />} />
            <Route path="/activities/:code" element={<ActivityDetails />} />
            <Route path="/activities/:activityCode/review" element={<ReviewEnrollments />} />
            <Route path="/participations" element={<MyEnrollments />} />
            <Route path="/profile" element={<ProfileForm />} />

            {/* Example of a role-guarded route (keep GuardRole for high-authority screens)
                <Route element={<GuardRole requiredRoles={["Admin","SuperUser"]} />}>
                  <Route path="/catalogs/:id/edit" element={<CatalogEdit />} />
                </Route>
            */}
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
