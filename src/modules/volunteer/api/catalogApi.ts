import { apiClient } from '../../../api/client';
import type { ProgramResponse, ActivityResponse } from '../types';

export const catalogApi = {
  getPrograms: async (): Promise<ProgramResponse[]> => {
    const response = await apiClient.get<{ data: ProgramResponse[] }>('/api/v1/programs');
    return response.data.data;
  },

  getActivitiesByProgram: async (programId: number): Promise<ActivityResponse[]> => {
    const response = await apiClient.get<{ data: ActivityResponse[] }>(
      `/api/v1/activities/by-program/${programId}`
    );
    return response.data.data;
  },
};
