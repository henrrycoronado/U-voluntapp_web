import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../app/store/authStore';
import type { UserRole } from '../service/types/auth';

interface GuardRoleProps {
  requiredRoles?: UserRole[];
}

const allowedRoleSets: UserRole[][] = [
  ['Coordinator', 'Admin', 'SuperUser'],
  ['Admin', 'SuperUser'],
  ['SuperUser'],
];

const setsEqual = (a: UserRole[], b: UserRole[]) => {
  if (a.length !== b.length) return false;
  return a.every((x) => b.includes(x));
};

export const GuardRole = ({ requiredRoles }: GuardRoleProps) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && requiredRoles.length > 0) {
    if (requiredRoles.includes('Volunteer')) {
      return <Navigate to="/unauthorized" replace />;
    }

    const matches = allowedRoleSets.some((set) => setsEqual(set, requiredRoles));
    if (!matches) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
};
