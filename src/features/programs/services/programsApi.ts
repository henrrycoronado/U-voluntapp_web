import { apiClient } from '../../../shared/services/client';
import type {
  ChangeProgramStateRequest,
  CreateProgramRequest,
  Program,
  UpdateProgramRequest,
} from '../types/program.types';

export const programsApi = {
  getAll: () => apiClient.get<Program[]>('/api/v1/programs'),

  getById: (id: string | number) => apiClient.get<Program>(`/api/v1/programs/${id}`),

  create: (data: CreateProgramRequest) =>
    apiClient.post<Program>('/api/v1/programs', data),

  update: (id: string | number, data: UpdateProgramRequest) =>
    apiClient.put<Program>(`/api/v1/programs/${id}`, data),

  changeState: (id: string | number, data: ChangeProgramStateRequest) =>
    apiClient.patch<Program>(`/api/v1/programs/${id}/state`, data),

  delete: (id: string | number) => apiClient.delete<void>(`/api/v1/programs/${id}`),
};

export type { ChangeProgramStateRequest, CreateProgramRequest, Program, UpdateProgramRequest } from '../types/program.types';
