import { apiClient } from '../../../shared/services/client';
import type { Profile, UpdateProfileRequest } from '../types/profile.types';

export const profilesApi = {
  getMe: () => apiClient.get<Profile>('/api/v1/profiles/me'),

  getById: (id: string | number) => apiClient.get<Profile>(`/api/v1/profiles/${id}`),

  updateMe: (payload: UpdateProfileRequest) =>
    apiClient.put<Profile>('/api/v1/profiles/me', payload),

  updatePhoto: (file: File) => {
    const formData = new FormData();
    formData.append('photo', file);
    return apiClient.patch<{ photoUrl: string }>('/api/v1/profiles/me/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deleteMe: () => apiClient.delete<null>('/api/v1/profiles/me'),
};

export type { Profile, UpdateProfilePhotoResponse, UpdateProfileRequest } from '../types/profile.types';
export type { Profile as UserProfile } from '../types/profile.types';
