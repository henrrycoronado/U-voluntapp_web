import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth';
import { apiClient } from './client';

export const authApi = {
  login: (payload: LoginRequest): Promise<AuthResponse> =>
    apiClient.post('/api/v1/auth/login', payload).then((res) => res.data),

  register: (payload: RegisterRequest): Promise<AuthResponse> =>
    apiClient.post('/api/v1/auth/register', payload).then((res) => res.data),

  logout: (userId: string): Promise<void> =>
    apiClient.post('/api/v1/auth/logout', null, { params: { userId } }).then(() => {}),
};
