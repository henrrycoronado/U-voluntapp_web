export type UserRole = 'Volunteer' | 'Coordinator' | 'Admin' | 'SuperUser';

export interface AuthUser {
  token: string;
  accessTokenExpiresAtUtc: string;
  refreshToken: string;
  uvaCode: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
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
  careerCode?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}
