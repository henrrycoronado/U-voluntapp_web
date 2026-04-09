import { apiClient } from './client';
import type { ApiResponse } from '../types/api';

export interface ActivityShift {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  capacity: number;
  enrolled: number;
}

export interface Activity {
  id: number;
  programId: number;
  activityTypeId: number;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  state: string;
  capacity?: number;
  enrolled?: number;
  requiresEnrollment: boolean;
  requiresApproval: boolean;
  enrollmentDeadline?: string;
  locationLatitude?: number;
  locationLongitude?: number;
  photo?: string;
  shifts?: ActivityShift[];
  createdAt: string;
  updatedAt?: string;
}

export interface CreateActivityRequest {
  programId: number;
  activityTypeId: number;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  locationLatitude?: number;
  locationLongitude?: number;
  requiresEnrollment: boolean;
  requiresApproval: boolean;
  capacity?: number;
  enrollmentDeadline?: string;
}

export interface CreateActivitySimpleRequest {
  programId: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface ChangeActivityStateRequest {
  stateId: number;
}

export const activitiesApi = {
  // Get activity details
  getById: (id: number) => apiClient.get<ApiResponse<Activity>>(`/api/v1/activities/${id}`),

  // List activities by program
  getByProgram: (programId: number) =>
    apiClient.get<ApiResponse<Activity[]>>(`/api/v1/activities/by-program/${programId}`),

  // Create activity (Admin, Coordinator)
  create: (data: CreateActivityRequest) =>
    apiClient.post<ApiResponse<Activity>>('/api/v1/activities', data),

  // Create activity simplified (Admin, Coordinator)
  createSimple: (data: CreateActivitySimpleRequest) =>
    apiClient.post<ApiResponse<Activity>>('/api/v1/activities/simple', data),

  // Update activity (Admin, Coordinator)
  update: (id: number, data: CreateActivityRequest) =>
    apiClient.put<ApiResponse<Activity>>(`/api/v1/activities/${id}`, data),

  // Change activity state (Admin, Coordinator)
  changeState: (id: number, data: ChangeActivityStateRequest) =>
    apiClient.patch<ApiResponse<Activity>>(`/api/v1/activities/${id}/state`, data),

  // Delete activity (Admin, Coordinator)
  delete: (id: number) => apiClient.delete<ApiResponse<void>>(`/api/v1/activities/${id}`),
};
