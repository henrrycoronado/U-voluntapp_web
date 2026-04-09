import { apiClient } from '../../../../service/api/client';
import {
  programsApi,
  activitiesApi,
  enrollmentsApi,
  roleRequestsApi,
  collaboratorsApi,
} from '../../../../service/api';
import type { CoordinatorData, CreateProgramRequest, CreateActivityRequest } from '../types';
import type { ApiResponse } from '../../../../service/types/api';

export const coordinatorApi = {
  // Dashboard
  getDashboardData: () => apiClient.get<ApiResponse<CoordinatorData>>('/api/v1/programs'),

  // Programs - CRUD (can create/edit own programs)
  getMyPrograms: () => programsApi.getAll(),

  getProgramById: (id: number) => programsApi.getById(id),

  createProgram: (data: CreateProgramRequest) => programsApi.create(data),

  updateProgram: (id: number, data: Partial<CreateProgramRequest>) =>
    programsApi.update(id, data as CreateProgramRequest),

  // Activities - CRUD operations
  getActivityById: (id: number) => activitiesApi.getById(id),

  getActivitiesByProgram: (programId: number) => activitiesApi.getByProgram(programId),

  createActivity: (data: CreateActivityRequest) => activitiesApi.create(data),

  createActivitySimple: (data: Record<string, unknown>) =>
    activitiesApi.createSimple(data as Parameters<typeof activitiesApi.createSimple>[0]),

  updateActivity: (id: number, data: Partial<CreateActivityRequest>) =>
    activitiesApi.update(id, data as CreateActivityRequest),

  deleteActivity: (id: number) => activitiesApi.delete(id),

  changeActivityState: (id: number, stateId: number) => activitiesApi.changeState(id, { stateId }),

  // Enrollments - Review & Management
  getEnrollmentById: (id: number) => enrollmentsApi.getById(id),

  getEnrollmentsByActivity: (activityId: number) => enrollmentsApi.getByActivity(activityId),

  reviewEnrollment: (enrollmentId: number, approved: boolean) =>
    enrollmentsApi.review(enrollmentId, { approved }),

  cancelEnrollment: (enrollmentId: number, reason?: string) =>
    enrollmentsApi.cancel(enrollmentId, { reason }),

  // Role Requests - Request escalation to Admin
  requestAdminRole: (payload: { email: string; reason: string; durationInMonths?: number }) =>
    roleRequestsApi.requestAdmin(payload),

  getPendingCoordinatorRequests: () => roleRequestsApi.getPendingCoordinator(),

  approveCoordinatorRequest: (id: number) => roleRequestsApi.approveCoordinator(id),

  rejectCoordinatorRequest: (id: number, reason?: string) =>
    roleRequestsApi.rejectCoordinator(id, { reason }),

  // Program Collaborators - Team management
  getCollaboratorsByProgram: (programId: number) => collaboratorsApi.getByProgram(programId),

  getCollaboratorById: (id: number) => collaboratorsApi.getById(id),

  addProgramCollaborator: (data: Record<string, unknown>) =>
    collaboratorsApi.create(data as Parameters<typeof collaboratorsApi.create>[0]),

  updateCollaborator: (id: number, accessLevel: number) =>
    collaboratorsApi.update(id, { accessLevel }),

  removeCollaborator: (id: number) => collaboratorsApi.delete(id),
};
