import { apiClient } from '../../../core/networks/api/client';
import type { ProfileDto, UpdateProfileDto } from '../types';

export const profileService = {
  getMe: async (): Promise<ProfileDto> =>
    apiClient.get<ProfileDto>('/v1/profiles/me').then((r) => r.data),

  updateMe: async (data: UpdateProfileDto): Promise<void> => {
    await apiClient.put('/v1/profiles/me', data);
  },

  deleteMe: async (): Promise<void> => {
    await apiClient.delete('/v1/profiles/me');
  },

  getByCode: async (uvaCode: string): Promise<ProfileDto> =>
    apiClient.get<ProfileDto>(`/v1/profiles/${uvaCode}`).then((r) => r.data),

  updatePhoto: async (photo: File): Promise<void> => {
    const formData = new FormData();
    formData.append('photo', photo);
    await apiClient.patch('/v1/profiles/me/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
