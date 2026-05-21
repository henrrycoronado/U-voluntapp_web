import { apiClient } from '../../../../shared/services/client';
import type { Enrollment } from '../types';

export const enrollmentApi = {
  getMyEnrollments: async (): Promise<Enrollment[]> => {
    const response = await apiClient.get<{ data: Enrollment[] }>('/api/v1/enrollments/mine');
    return response.data.data;
  },
  enrollToActivity: async (activityId: number): Promise<Enrollment> => {
    const response = await apiClient.post<{ data: Enrollment }>('/api/v1/enrollments', {
      activityId,
    });
    return response.data.data;
  },
  cancelEnrollment: async (id: number): Promise<void> => {
    await apiClient.patch(`/api/v1/enrollments/${id}/cancel`);
  },
};
