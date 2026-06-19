import { apiClient } from '../../../core/networks/api/client';
import type {
  LoginRequest,
  RegisterRequest,
  RefreshTokenRequest,
  LogoutRequest,
  AuthResponse,
} from '../types';

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> =>
    apiClient.post<AuthResponse>('/v1/auth/login', data).then(r => r.data),

  register: async (data: RegisterRequest): Promise<AuthResponse> =>
    apiClient.post<AuthResponse>('/v1/auth/register', data).then(r => r.data),

  refresh: async (data: RefreshTokenRequest): Promise<AuthResponse> =>
    apiClient.post<AuthResponse>('/v1/auth/refresh', data).then(r => r.data),

  logout: async (data: LogoutRequest): Promise<void> => {
    await apiClient.post('/v1/auth/logout', data);
  },
};
