import { apiClient } from '../../../shared/services/client';
import type {
  CancelEnrollmentRequest,
  CreateEnrollmentRequest,
  Enrollment,
  ReviewEnrollmentRequest,
} from '../types/enrollment.types';

export const enrollmentsApi = {
  getById: (uvaCode: string) => apiClient.get<Enrollment>(`/api/v1/enrollments/${uvaCode}`),

  getByActivity: (activityCode: string) =>
    apiClient.get<Enrollment[]>(`/api/v1/enrollments/by-activity/${activityCode}`),

  getMine: () => apiClient.get<Enrollment[]>('/api/v1/enrollments/mine'),

  create: (data: CreateEnrollmentRequest) =>
    apiClient.post<Enrollment>('/api/v1/enrollments', data),

  review: (uvaCode: string, data: ReviewEnrollmentRequest) =>
    apiClient.patch<Enrollment>(`/api/v1/enrollments/${uvaCode}/review`, data),

  cancel: (uvaCode: string, data?: CancelEnrollmentRequest) =>
    apiClient.patch<Enrollment>(`/api/v1/enrollments/${uvaCode}/cancel`, data),
};

export type {
  CancelEnrollmentRequest,
  CreateEnrollmentRequest,
  Enrollment,
  ReviewEnrollmentRequest,
} from '../types/enrollment.types';
