// Volunteer service barrel exports
export { volunteerApi } from './api/volunteerApi';

// Re-export hooks
export {
  useMyProfile,
  useAvailablePrograms,
  useActivitiesByProgram,
  useMyEnrollments,
  useEnrollmentById,
  useVolunteerDashboard,
} from './hooks';

// Re-export types
export type {
  UserProfile,
  UpdateProfileRequest,
  Program,
  Activity,
  Enrollment,
  CreateEnrollmentRequest,
  RoleRequest,
  VolunteerDashboard,
} from './types';
