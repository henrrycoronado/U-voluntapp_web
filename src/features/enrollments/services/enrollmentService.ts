import { apiClient } from '../../../core/networks/api/client';
import type { EnrollmentDto, CreateEnrollmentDto, ReviewEnrollmentDto } from '../types';

export const enrollmentService = {
  create: async (data: CreateEnrollmentDto): Promise<void> => {
    await apiClient.post('/v1/enrollments', data);
  },

  getByCode: async (uvaCode: string): Promise<EnrollmentDto> =>
    apiClient.get<EnrollmentDto>(`/v1/enrollments/${uvaCode}`).then(r => r.data),

  getByActivity: async (activityCode: string): Promise<EnrollmentDto[]> =>
    apiClient.get<EnrollmentDto[]>(`/v1/enrollments/by-activity/${activityCode}`).then(r => r.data),

  getMine: async (): Promise<EnrollmentDto[]> =>
    apiClient.get<EnrollmentDto[]>('/v1/enrollments/mine').then(r => r.data),

  review: async (uvaCode: string, data: ReviewEnrollmentDto): Promise<void> => {
    await apiClient.patch(`/v1/enrollments/${uvaCode}/review`, data);
  },

  cancel: async (uvaCode: string): Promise<void> => {
    await apiClient.patch(`/v1/enrollments/${uvaCode}/cancel`);
  },
};
