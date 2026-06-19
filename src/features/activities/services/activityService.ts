import { apiClient } from '../../../core/networks/api/client';
import type {
  ActivityDto,
  CreateActivityDto,
  CreateActivitySimpleDto,
  UpdateActivityDto,
  ChangeActivityStateDto,
} from '../types';

export const activityService = {
  create: async (data: CreateActivityDto): Promise<void> => {
    await apiClient.post('/v1/activities', data);
  },

  createSimple: async (data: CreateActivitySimpleDto): Promise<void> => {
    await apiClient.post('/v1/activities/simple', data);
  },

  getByCode: async (uvaCode: string): Promise<ActivityDto> =>
    apiClient.get<ActivityDto>(`/v1/activities/${uvaCode}`).then(r => r.data),

  getByProgram: async (programCode: string): Promise<ActivityDto[]> =>
    apiClient.get<ActivityDto[]>(`/v1/activities/by-program/${programCode}`).then(r => r.data),

  update: async (uvaCode: string, data: UpdateActivityDto): Promise<void> => {
    await apiClient.put(`/v1/activities/${uvaCode}`, data);
  },

  delete: async (uvaCode: string): Promise<void> => {
    await apiClient.delete(`/v1/activities/${uvaCode}`);
  },

  changeState: async (uvaCode: string, data: ChangeActivityStateDto): Promise<void> => {
    await apiClient.patch(`/v1/activities/${uvaCode}/state`, data);
  },
};
