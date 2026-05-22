import { apiClient } from '../../../shared/services/client';
import type {
  CompleteScholarshipRequest,
  CreateScholarshipForProfileRequest,
  CreateScholarshipRequest,
  ReviewScholarshipRequest,
  Scholarship,
} from '../types/scholarship.types';

export const scholarshipsApi = {
  create: (data: CreateScholarshipRequest) =>
    apiClient.post<Scholarship>('/api/v1/scholarships', data),

  assign: (data: CreateScholarshipForProfileRequest) =>
    apiClient.post<Scholarship>('/api/v1/scholarships/assign', data),

  getById: (id: string | number) => apiClient.get<Scholarship>(`/api/v1/scholarships/${id}`),

  getMine: () => apiClient.get<Scholarship[]>('/api/v1/scholarships/mine'),

  getByProfile: (profileCode: string | number) =>
    apiClient.get<Scholarship[]>(`/api/v1/scholarships/by-profile/${profileCode}`),

  review: (id: string | number, data: ReviewScholarshipRequest) =>
    apiClient.patch<Scholarship>(`/api/v1/scholarships/${id}/review`, data),

  complete: (id: string | number, data: CompleteScholarshipRequest) =>
    apiClient.patch<Scholarship>(`/api/v1/scholarships/${id}/complete`, data),
};

export type {
  CompleteScholarshipRequest,
  CreateScholarshipForProfileRequest,
  CreateScholarshipRequest,
  ReviewScholarshipRequest,
  Scholarship,
} from '../types/scholarship.types';
