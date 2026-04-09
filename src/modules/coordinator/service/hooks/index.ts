import { useFetch } from '../../../../service/hooks/useFetch';
import { coordinatorApi } from '../api/coordinatorApi';
import type { CoordinatorData, Program, Activity, Enrollment } from '../types';

export function useCoordinatorData() {
  return useFetch<CoordinatorData>(() => coordinatorApi.getDashboardData());
}

export function useMyPrograms() {
  return useFetch<Program[]>(() => coordinatorApi.getMyPrograms());
}

export function useActivitiesByProgram(programId: number | null) {
  return useFetch<Activity[]>(
    programId ? () => coordinatorApi.getActivitiesByProgram(programId) : null
  );
}

export function useEnrollmentsByActivity(activityId: number | null) {
  return useFetch<Enrollment[]>(
    activityId ? () => coordinatorApi.getEnrollmentsByActivity(activityId) : null
  );
}

export function useRequestAdminRole() {
  return async (email: string, reason: string) => {
    return await coordinatorApi.requestAdminRole(email, reason);
  };
}
