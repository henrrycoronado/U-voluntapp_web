import { apiClient } from './client';
import type { ApiResponse } from '../types/api';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  housingLocation?: string;
  careerId?: number;
  careerName?: string;
  personalGoalHours?: number;
  state: string;
  createdAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  housingLocation?: string;
  careerId?: number;
  personalGoalHours?: number;
}

export const profilesApi = {
  // Get authenticated user profile
  getMe: () => apiClient.get<ApiResponse<UserProfile>>('/api/v1/profiles/me'),

  // Get any user profile
  getById: (id: string) => apiClient.get<ApiResponse<UserProfile>>(`/api/v1/profiles/${id}`),

  // Update own profile
  updateMe: (payload: UpdateProfileRequest) =>
    apiClient.put<ApiResponse<UserProfile>>('/api/v1/profiles/me', payload),

  // Upload profile photo
  updatePhoto: (file: File) => {
    const formData = new FormData();
    formData.append('photo', file);
    return apiClient.patch<ApiResponse<{ photoUrl: string }>>(
      '/api/v1/profiles/me/photo',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  },

  // Delete own account
  deleteMe: () => apiClient.delete<ApiResponse<null>>('/api/v1/profiles/me'),
};
