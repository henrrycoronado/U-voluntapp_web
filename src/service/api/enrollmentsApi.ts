import { apiClient } from './client';
import type { ApiResponse } from '../types/api';

export interface Enrollment {
  id: number;
  activityId: number;
  activityName: string;
  programId: number;
  programName: string;
  enrolledProfileId: string;
  enrolledProfileName: string;
  state: string;
  approvalRequired: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateEnrollmentRequest {
  activityId: number;
}

export interface ReviewEnrollmentRequest {
  approved: boolean;
}

export interface CancelEnrollmentRequest {
  reason?: string;
}

export const enrollmentsApi = {
  // Get enrollment details
  getById: (id: number) => apiClient.get<ApiResponse<Enrollment>>(`/api/v1/enrollments/${id}`),

  // List enrollments by activity
  getByActivity: (activityId: number) =>
    apiClient.get<ApiResponse<Enrollment[]>>(`/api/v1/enrollments/by-activity/${activityId}`),

  // Get user's own enrollments (Volunteer)
  getMine: () => apiClient.get<ApiResponse<Enrollment[]>>('/api/v1/enrollments/mine'),

  // Create enrollment (Volunteer)
  create: (data: CreateEnrollmentRequest) =>
    apiClient.post<ApiResponse<Enrollment>>('/api/v1/enrollments', data),

  // Review enrollment (Coordinator, Admin)
  review: (id: number, data: ReviewEnrollmentRequest) =>
    apiClient.patch<ApiResponse<Enrollment>>(`/api/v1/enrollments/${id}/review`, data),

  // Cancel enrollment (Volunteer)
  cancel: (id: number, data?: CancelEnrollmentRequest) =>
    apiClient.patch<ApiResponse<Enrollment>>(`/api/v1/enrollments/${id}/cancel`, data),
};
