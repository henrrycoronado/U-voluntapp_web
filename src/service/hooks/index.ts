// Generic hooks
export { useForm } from '../../shared/hooks/useForm';
export { useFetch } from '../../shared/hooks/useFetch';

// Domain-specific hooks
export { usePrograms, useProgramById } from '../../features/programas/hooks/usePrograms';
export { useActivities, useActivitiesByProgram, useActivityById } from './useActivities';
export { useEnrollmentById, useEnrollmentsByActivity, useMyEnrollments } from './useEnrollments';
export { usePendingCoordinatorRequests, usePendingAdminRequests } from './useRoleRequests';
export { useCollaboratorById, useCollaboratorsByProgram } from './useCollaborators';
