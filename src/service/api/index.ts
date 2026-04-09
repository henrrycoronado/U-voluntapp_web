// Global API barrel exports
export { authApi } from './auth';
export { profilesApi } from './profileApi';
export { programsApi } from './programsApi';
export { activitiesApi } from './activitiesApi';
export { enrollmentsApi } from './enrollmentsApi';
export { roleRequestsApi } from './roleRequestsApi';
export { collaboratorsApi } from './collaboratorsApi';

// Re-export types from individual APIs
export type { UserProfile, UpdateProfileRequest } from './profileApi';
export type { Program, CreateProgramRequest } from './programsApi';
export type {
  Activity,
  ActivityShift,
  CreateActivityRequest,
  CreateActivitySimpleRequest,
} from './activitiesApi';
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
} from './roleRequestsApi';
export type {
  ProgramCollaborator,
  CreateProgramCollaboratorRequest,
  UpdateProgramCollaboratorRequest,
} from './collaboratorsApi';
