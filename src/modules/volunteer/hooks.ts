import { useFetch } from '../../hooks/useFetch';
import { apiClient } from '../../api/client';

export const useProfile = () => {
  return useFetch(`/profiles/me`);
};

export const usePrograms = () => {
  return useFetch(`/programs`);
};

export const useActivitiesByProgram = (programId: number | null) => {
  const url = programId ? `/activities/by-program/${programId}` : null;
  return useFetch(url || '', { enabled: !!programId });
};

export const useMyEnrollments = () => {
  return useFetch(`/enrollments/mine`);
};

export const useEnrollmentDetails = (enrollmentId: number | null) => {
  const url = enrollmentId ? `/enrollments/${enrollmentId}` : null;
  return useFetch(url || '', { enabled: !!enrollmentId });
};

export const useEnrollProgram = () => {
  return async (programId: number, activityId: number) => {
    const response = await apiClient.post('/enrollments', {
      programId,
      activityId,
    });
    return response.data;
  };
};

export const useRequestCoordinatorRole = () => {
  return async (email: string, reason: string, durationInMonths: number) => {
    const response = await apiClient.post('/api/v1/roles/requests/coordinator', {
      email,
      reason,
      durationInMonths,
    });
    return response.data;
  };
};
