import type { UserRole } from './UserRole.type';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles?: UserRole[];
  token: string;
  refreshToken?: string;
}
