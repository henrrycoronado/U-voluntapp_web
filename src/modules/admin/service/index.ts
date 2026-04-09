// Admin service barrel exports
export { adminApi } from './api/adminApi';

// Re-export hooks
export {
  useAdminData,
  useProgramAnalytics,
  useActivityAnalytics,
  useVolunteerHistory,
} from './hooks';

// Re-export types
export type {
  AdminData,
  ProgramAnalytics,
  ActivityAnalytics,
  ScholarshipMetrics,
  VolunteerHistory,
  Program,
  Activity,
  Enrollment,
  RoleRequest,
  ProgramCollaborator,
} from './types';
