import { apiClient } from '../../../api/client';
import type { ProfileResponse, UpdateProfileRequest } from '../types';
export const profileApi = {
  getMe: async (): Promise<ProfileResponse> => {
    const response = await apiClient.get<{ data: ProfileResponse }>('/api/v1/profiles/me');
    return response.data.data;
  },

  updateMe: async (payload: UpdateProfileRequest): Promise<ProfileResponse> => {
    const response = await apiClient.put<{ data: ProfileResponse }>('/api/v1/profiles/me', payload);
    return response.data.data;
  },

  deleteMe: async (): Promise<void> => {
    await apiClient.delete('/api/v1/profiles/me');
  },
};
