import { apiClient } from '../../../../service/api/client';
import {
  programsApi,
  activitiesApi,
  enrollmentsApi,
  roleRequestsApi,
  collaboratorsApi,
} from '../../../../service/api';
import type { AdminData, ProgramAnalytics, ActivityAnalytics, VolunteerHistory } from '../types';
import type { ApiResponse } from '../../../../service/types/api';

export const adminApi = {
  // Dashboard
  getDashboardData: () => apiClient.get<ApiResponse<AdminData>>('/api/v1/reports/programs'),

  // Programs - CRUD operations
  getAllPrograms: () => programsApi.getAll(),
  getProgramById: (id: number) => programsApi.getById(id),
  createProgram: (data: Record<string, unknown>) =>
    programsApi.create(data as unknown as Parameters<typeof programsApi.create>[0]),
  updateProgram: (id: number, data: Record<string, unknown>) =>
    programsApi.update(id, data as unknown as Parameters<typeof programsApi.update>[1]),
  deleteProgramById: (id: number) => programsApi.delete(id),

  // Programs - State management (SuperUser)
  changeProgramState: (id: number, stateId: number) => programsApi.changeState(id, { stateId }),

  // Activities - CRUD operations (via global API)
  getActivityById: (id: number) => activitiesApi.getById(id),
  getActivitiesByProgram: (programId: number) => activitiesApi.getByProgram(programId),
  createActivity: (data: Record<string, unknown>) =>
    activitiesApi.create(data as unknown as Parameters<typeof activitiesApi.create>[0]),
  updateActivity: (id: number, data: Record<string, unknown>) =>
    activitiesApi.update(id, data as unknown as Parameters<typeof activitiesApi.update>[1]),
  deleteActivity: (id: number) => activitiesApi.delete(id),
  changeActivityState: (id: number, stateId: number) => activitiesApi.changeState(id, { stateId }),

  // Enrollments - View & Review
  getEnrollmentById: (id: number) => enrollmentsApi.getById(id),
  getEnrollmentsByActivity: (activityId: number) => enrollmentsApi.getByActivity(activityId),
  reviewEnrollment: (enrollmentId: number, approved: boolean) =>
    enrollmentsApi.review(enrollmentId, { approved }),

  // Analytics - Reports
  getProgramAnalytics: () =>
    apiClient.get<ApiResponse<ProgramAnalytics[]>>('/api/v1/reports/programs'),

  getActivityAnalytics: () =>
    apiClient.get<ApiResponse<ActivityAnalytics[]>>('/api/v1/reports/activities'),

  getProgramAnalyticsById: (programId: number) =>
    apiClient.get<ApiResponse<ProgramAnalytics>>(`/api/v1/reports/programs/${programId}`),

  getActivityAnalyticsByProgram: (programId: number) =>
    apiClient.get<ApiResponse<ActivityAnalytics[]>>(
      `/api/v1/reports/activities/by-program/${programId}`
    ),

  getVolunteerHistory: () =>
    apiClient.get<ApiResponse<VolunteerHistory[]>>('/api/v1/reports/volunteers'),

  getVolunteerHistoryById: (profileId: string) =>
    apiClient.get<ApiResponse<VolunteerHistory>>(`/api/v1/reports/volunteers/${profileId}`),

  // Role Requests - Admin approval workflow
  getPendingCoordinatorRequests: () => roleRequestsApi.getPendingCoordinator(),

  getPendingAdminRequests: () => roleRequestsApi.getPendingAdmin(),

  approveCoordinatorRequest: (id: number) => roleRequestsApi.approveCoordinator(id),

  rejectCoordinatorRequest: (id: number, reason?: string) =>
    roleRequestsApi.rejectCoordinator(id, { reason }),

  approveAdminRequest: (id: number) => roleRequestsApi.approveAdmin(id),

  rejectAdminRequest: (id: number, reason?: string) => roleRequestsApi.rejectAdmin(id, { reason }),

  // Program Collaborators - Team management
  getCollaboratorsByProgram: (programId: number) => collaboratorsApi.getByProgram(programId),

  getCollaboratorById: (id: number) => collaboratorsApi.getById(id),

  addProgramCollaborator: (data: Record<string, unknown>) =>
    collaboratorsApi.create(data as unknown as Parameters<typeof collaboratorsApi.create>[0]),

  updateCollaborator: (id: number, accessLevel: number) =>
    collaboratorsApi.update(id, { accessLevel }),

  removeCollaborator: (id: number) => collaboratorsApi.delete(id),
};
