import { apiClient } from '../../../../service/api/client';
import {
  profilesApi,
  programsApi,
  activitiesApi,
  enrollmentsApi,
  roleRequestsApi,
} from '../../../../service/api';
import type { CreateEnrollmentRequest, VolunteerDashboard, UpdateProfileRequest } from '../types';
import type { ApiResponse } from '../../../../service/types/api';

export const volunteerApi = {
  // Profile management
  getMyProfile: () => profilesApi.getMe(),

  getProfileById: (id: string) => profilesApi.getById(id),

  updateMyProfile: (data: UpdateProfileRequest) => profilesApi.updateMe(data),

  uploadProfilePhoto: (file: File) => profilesApi.updatePhoto(file),

  deleteMyAccount: () => profilesApi.deleteMe(),

  // Program discovery
  getAllPrograms: () => programsApi.getAll(),

  getProgramById: (id: number) => programsApi.getById(id),

  // Activity discovery & browsing
  getActivityById: (id: number) => activitiesApi.getById(id),

  getActivitiesByProgram: (programId: number) => activitiesApi.getByProgram(programId),

  // Enrollment management (Volunteer operations)
  enrollInActivity: (data: CreateEnrollmentRequest) => enrollmentsApi.create(data),

  getMyEnrollments: () => enrollmentsApi.getMine(),

  getEnrollmentById: (id: number) => enrollmentsApi.getById(id),

  cancelMyEnrollment: (id: number, reason?: string) => enrollmentsApi.cancel(id, { reason }),

  // Role requests (request to become coordinator)
  requestCoordinatorRole: (reason?: string) => roleRequestsApi.requestCoordinator({ reason }),

  // Dashboard
  getDashboardData: () => apiClient.get<ApiResponse<VolunteerDashboard>>('/api/v1/programs'),
};
