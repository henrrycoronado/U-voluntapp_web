import { apiClient } from '../../../../service/api/client';
import type {
  AdminData,
  ProgramAnalytics,
  ActivityAnalytics,
  ScholarshipMetrics,
  VolunteerHistory,
} from '../types';

export const adminApi = {
  // Dashboard
  getDashboardData: () => apiClient.get<AdminData>('/api/v1/reports/programs'),

  // Programs
  getAllPrograms: () => apiClient.get('/api/v1/programs'),

  getProgramById: (id: number) => apiClient.get(`/api/v1/programs/${id}`),

  createProgram: (data: Record<string, unknown>) => apiClient.post('/api/v1/programs', data),

  updateProgram: (id: number, data: Record<string, unknown>) =>
    apiClient.put(`/api/v1/programs/${id}`, data),

  // Analytics
  getProgramAnalytics: () => apiClient.get<ProgramAnalytics[]>('/api/v1/reports/programs'),

  getActivityAnalytics: () => apiClient.get<ActivityAnalytics[]>('/api/v1/reports/activities'),

  getScholarshipAnalytics: () => apiClient.get<ScholarshipMetrics>('/api/v1/reports/scholarships'),

  getVolunteerHistory: () => apiClient.get<VolunteerHistory[]>('/api/v1/reports/volunteers'),

  // Role Requests
  getPendingCoordinatorRequests: () => apiClient.get('/api/v1/roles/requests/coordinator'),

  approveCoordinatorRequest: (id: number) =>
    apiClient.post(`/api/v1/roles/requests/${id}/coordinator/approve`),

  rejectCoordinatorRequest: (id: number) =>
    apiClient.post(`/api/v1/roles/requests/${id}/coordinator/reject`),

  // Collaborators
  addProgramCollaborator: (data: Record<string, unknown>) =>
    apiClient.post('/api/v1/collaborators', data),

  getCollaboratorsByProgram: (programId: number) =>
    apiClient.get(`/api/v1/collaborators/program/${programId}`),

  updateCollaborator: (id: number, data: Record<string, unknown>) =>
    apiClient.put(`/api/v1/collaborators/${id}`, data),

  removeCollaborator: (id: number) => apiClient.delete(`/api/v1/collaborators/${id}`),
};
