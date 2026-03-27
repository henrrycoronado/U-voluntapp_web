export type UserRole = 'Volunteer' | 'Coordinator' | 'Admin' | 'SuperUser';

export interface AuthUser {
  token: string;
  profileId: string;
  email: string;
  firstName: string;
  lastName: string;
  roles?: UserRole[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  careerId?: number;
}

export interface AuthResponse {
  success: boolean;
  data: AuthUser;
  message: string | null;
  items: unknown[];
}
