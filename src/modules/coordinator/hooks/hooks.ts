import { useFetch } from '../../../hooks/useFetch';
import { apiClient } from '../../../api/client';

export const useMyPrograms = () => {
  return useFetch(`/programs`);
};

export const useActivitiesByProgram = (programId: number | null) => {
  const url = programId ? `/activities/by-program/${programId}` : null;
  return useFetch(url || '', { enabled: !!programId });
};

export const useEnrollmentsByActivity = (activityId: number | null) => {
  const url = activityId ? `/enrollments/by-activity/${activityId}` : null;
  return useFetch(url || '', { enabled: !!activityId });
};

export const useCreateProgram = () => {
  return async (data: Record<string, unknown>) => {
    const response = await apiClient.post('/programs', data);
    return response.data;
  };
};

export const useUpdateProgram = () => {
  return async (programId: number, data: Record<string, unknown>) => {
    const response = await apiClient.put(`/programs/${programId}`, data);
    return response.data;
  };
};

export const useCreateActivity = () => {
  return async (data: Record<string, unknown>) => {
    const response = await apiClient.post('/activities', data);
    return response.data;
  };
};

export const useUpdateActivity = () => {
  return async (activityId: number, data: Record<string, unknown>) => {
    const response = await apiClient.put(`/activities/${activityId}`, data);
    return response.data;
  };
};

export const useReviewEnrollment = () => {
  return async (enrollmentId: number, approved: boolean) => {
    const response = await apiClient.patch(`/enrollments/${enrollmentId}/review`, {
      approved,
    });
    return response.data;
  };
};

export const useRequestAdminRole = () => {
  return async (email: string, reason: string) => {
    const response = await apiClient.post('/api/v1/roles/requests/admin', {
      email,
      reason,
      durationInMonths: null,
    });
    return response.data;
  };
};
