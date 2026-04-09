import { apiClient } from '../../../../service/api/client';
import type {
  CoordinatorData,
  Program,
  Activity,
  Enrollment,
  CreateProgramRequest,
  CreateActivityRequest,
} from '../types';

export const coordinatorApi = {
  // Dashboard
  getDashboardData: () => apiClient.get<CoordinatorData>('/api/v1/programs'),

  // Programs
  getMyPrograms: () => apiClient.get<Program[]>('/api/v1/programs'),

  getProgramById: (id: number) => apiClient.get<Program>(`/api/v1/programs/${id}`),

  createProgram: (data: CreateProgramRequest) => apiClient.post<Program>('/api/v1/programs', data),

  updateProgram: (id: number, data: Partial<CreateProgramRequest>) =>
    apiClient.put<Program>(`/api/v1/programs/${id}`, data),

  // Activities
  getActivitiesByProgram: (programId: number) =>
    apiClient.get<Activity[]>(`/api/v1/activities/by-program/${programId}`),

  getActivityById: (id: number) => apiClient.get<Activity>(`/api/v1/activities/${id}`),

  createActivity: (data: CreateActivityRequest) =>
    apiClient.post<Activity>('/api/v1/activities', data),

  updateActivity: (id: number, data: Partial<CreateActivityRequest>) =>
    apiClient.put<Activity>(`/api/v1/activities/${id}`, data),

  changeActivityState: (id: number, stateId: number) =>
    apiClient.patch(`/api/v1/activities/${id}/state`, { stateId }),

  // Enrollments
  getEnrollmentsByActivity: (activityId: number) =>
    apiClient.get<Enrollment[]>(`/api/v1/enrollments/by-activity/${activityId}`),

  reviewEnrollment: (enrollmentId: number, approved: boolean) =>
    apiClient.patch(`/api/v1/enrollments/${enrollmentId}/review`, { approved }),

  // Role Requests
  requestAdminRole: (email: string, reason: string) =>
    apiClient.post('/api/v1/roles/requests/admin', { email, reason }),

  // Collaborators
  addProgramCollaborator: (data: Record<string, unknown>) =>
    apiClient.post('/api/v1/collaborators', data),

  getCollaboratorsByProgram: (programId: number) =>
    apiClient.get(`/api/v1/collaborators/program/${programId}`),

  updateCollaborator: (id: number, data: Record<string, unknown>) =>
    apiClient.put(`/api/v1/collaborators/${id}`, data),

  removeCollaborator: (id: number) => apiClient.delete(`/api/v1/collaborators/${id}`),
};
