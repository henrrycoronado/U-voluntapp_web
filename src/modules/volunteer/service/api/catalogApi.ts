import { apiClient } from '../../../../shared/services/client';
import type { Program, Activity } from '../types';

export const catalogApi = {
  getPrograms: async (): Promise<Program[]> => {
    const response = await apiClient.get<Program[]>('/api/v1/programs');
    return response.data;
  },

  getActivitiesByProgram: async (programId: number): Promise<Activity[]> => {
    const response = await apiClient.get<Activity[]>(`/api/v1/activities/by-program/${programId}`);
    return response.data;
  },
};
