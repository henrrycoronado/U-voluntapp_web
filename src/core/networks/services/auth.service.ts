import { apiClient } from '../../../core/networks/api/client';
import { handleApiError } from '../../../core/networks/exceptions/api.exceptions';
import type { LoginRequest, LoginResponse, SignupRequest } from '../types';

export const authService = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>('/v1/auth/login', request);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  signup: async (request: SignupRequest): Promise<void> => {
    try {
      await apiClient.post('/v1/auth/register', request);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  logout: async (refreshToken: string): Promise<void> => {
    try {
      await apiClient.post('/v1/auth/logout', { refreshToken });
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
