// Coordinator service barrel exports
export { coordinatorApi } from './api/coordinatorApi';

// Re-export hooks
export {
  useCoordinatorData,
  useMyPrograms,
  useActivitiesByProgram,
  useEnrollmentsByActivity,
} from './hooks';

// Re-export types
export type {
  CoordinatorData,
  Program,
  Activity,
  Enrollment,
  CreateProgramRequest,
  CreateActivityRequest,
  CreateActivitySimpleRequest,
  RoleRequest,
  ProgramCollaborator,
} from './types';
