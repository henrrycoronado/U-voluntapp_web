// Global API barrel exports
export { authApi } from './auth';
export { profilesApi } from '../../features/miembros/services/profileApi';
export { programsApi } from '../../features/programas/services/programsApi';
export { activitiesApi } from '../../features/actividades/services/activitiesApi';
export { enrollmentsApi } from './enrollmentsApi';
export { roleRequestsApi } from '../../features/miembros/services/roleRequestsApi';
export { collaboratorsApi } from '../../features/miembros/services/collaboratorsApi';

// Re-export types from individual APIs
export type {
  UserProfile,
  UpdateProfileRequest,
} from '../../features/miembros/services/profileApi';
export type { Program, CreateProgramRequest } from '../../features/programas/services/programsApi';
export type {
  Activity,
  ActivityShift,
  CreateActivityRequest,
  CreateActivitySimpleRequest,
} from '../../features/actividades/services/activitiesApi';
export type {
  Enrollment,
  CreateEnrollmentRequest,
  ReviewEnrollmentRequest,
  CancelEnrollmentRequest,
} from './enrollmentsApi';
export type {
  RoleRequest,
  CreateCoordinatorRoleRequest,
  CreateAdminRoleRequest,
  RejectRoleRequestRequest,
} from '../../features/miembros/services/roleRequestsApi';
export type {
  ProgramCollaborator,
  CreateProgramCollaboratorRequest,
  UpdateProgramCollaboratorRequest,
} from '../../features/miembros/services/collaboratorsApi';
