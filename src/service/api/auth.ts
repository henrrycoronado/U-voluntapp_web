import type {
  AuthUser,
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  RegisterRequest,
} from '../types/auth';
import { apiClient } from '../client';

export const authApi = {
  login: (payload: LoginRequest): Promise<AuthUser> =>
    apiClient.post('/api/v1/auth/login', payload).then((res) => res.data),

  register: (payload: RegisterRequest): Promise<AuthUser> =>
    apiClient.post('/api/v1/auth/register', payload).then((res) => res.data),

  refresh: (payload: RefreshTokenRequest): Promise<AuthUser> =>
    apiClient.post('/api/v1/auth/refresh', payload).then((res) => res.data),

  logout: (payload: LogoutRequest | string): Promise<void> => {
    const refreshToken = typeof payload === 'string' ? payload : payload.refreshToken;
    return apiClient.post('/api/v1/auth/logout', { refreshToken }).then(() => {});
  },
};
