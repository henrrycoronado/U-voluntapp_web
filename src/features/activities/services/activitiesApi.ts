import { apiClient } from '../../../shared/services/client';
import type {
  Activity,
  ChangeActivityStateRequest,
  CreateActivityRequest,
  CreateActivitySimpleRequest,
  UpdateActivityRequest,
} from '../types/activity.types';

export const activitiesApi = {
  getById: (uvaCode: string) => apiClient.get<Activity>(`/api/v1/activities/${uvaCode}`),

  getByProgram: (programCode: string) =>
    apiClient.get<Activity[]>(`/api/v1/activities/by-program/${programCode}`),

  create: (data: CreateActivityRequest) =>
    apiClient.post<Activity>('/api/v1/activities', data),

  createSimple: (data: CreateActivitySimpleRequest) =>
    apiClient.post<Activity>('/api/v1/activities/simple', data),

  update: (uvaCode: string, data: UpdateActivityRequest) =>
    apiClient.put<Activity>(`/api/v1/activities/${uvaCode}`, data),

  changeState: (uvaCode: string, data: ChangeActivityStateRequest) =>
    apiClient.patch<Activity>(`/api/v1/activities/${uvaCode}/state`, data),

  delete: (uvaCode: string) => apiClient.delete<void>(`/api/v1/activities/${uvaCode}`),
};

export type {
  Activity,
  CreateActivityGroupRequest,
  ActivityShift,
  ChangeActivityStateRequest,
  CreateActivityRequest,
  CreateActivityRuleRequest,
  CreateActivitySimpleRequest,
  UpdateActivityRequest,
} from '../types/activity.types';
