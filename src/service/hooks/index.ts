// Generic hooks
export { useForm } from '../../shared/hooks/useForm';
export { useFetch } from '../../shared/hooks/useFetch';

// Domain-specific hooks
export { usePrograms, useProgramById } from '../../features/programas/hooks/usePrograms';
export {
  useActivities,
  useActivitiesByProgram,
  useActivityById,
} from '../../features/actividades/hooks/useActivities';
export { useEnrollmentById, useEnrollmentsByActivity, useMyEnrollments } from './useEnrollments';
export {
  usePendingCoordinatorRequests,
  usePendingAdminRequests,
} from '../../features/miembros/hooks/useRoleRequests';
export {
  useCollaboratorById,
  useCollaboratorsByProgram,
} from '../../features/miembros/hooks/useCollaborators';
