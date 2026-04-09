import { apiClient } from '../../../api/client';
import type { EnrollmentResponse } from '../types';

export const enrollmentApi = {
  getMyEnrollments: async (): Promise<EnrollmentResponse[]> => {
    const response = await apiClient.get<{ data: EnrollmentResponse[] }>(
      '/api/v1/enrollments/mine'
    );
    return response.data.data;
  },
  enrollToActivity: async (activityId: number): Promise<EnrollmentResponse> => {
    const response = await apiClient.post<{ data: EnrollmentResponse }>('/api/v1/enrollments', {
      activityId,
    });
    return response.data.data;
  },
  cancelEnrollment: async (id: number): Promise<void> => {
    await apiClient.patch(`/api/v1/enrollments/${id}/cancel`);
  },
};
