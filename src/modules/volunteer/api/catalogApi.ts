import { apiClient } from '../../../api/client';
import type { ProgramResponse, ActivityResponse } from '../types';

export const catalogApi = {
  getPrograms: async (): Promise<ProgramResponse[]> => {
    const response = await apiClient.get<ProgramResponse[]>('/api/v1/programs');
    return response.data;
  },

  getActivitiesByProgram: async (programId: number): Promise<ActivityResponse[]> => {
    const response = await apiClient.get<ActivityResponse[]>(
      `/api/v1/activities/by-program/${programId}`
    );
    return response.data;
  },
};
