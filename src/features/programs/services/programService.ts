import { apiClient } from '../../../core/networks/api/client';
import type {
  ProgramDto,
  CreateProgramDto,
  UpdateProgramDto,
  ChangeVolProgramStateDto,
} from '../types';

export const programService = {
  getAll: async (): Promise<ProgramDto[]> =>
    apiClient.get<ProgramDto[]>('/v1/programs').then(r => r.data),

  getByCode: async (uvaCode: string): Promise<ProgramDto> =>
    apiClient.get<ProgramDto>(`/v1/programs/${uvaCode}`).then(r => r.data),

  create: async (data: CreateProgramDto): Promise<void> => {
    await apiClient.post('/v1/programs', data);
  },

  update: async (uvaCode: string, data: UpdateProgramDto): Promise<void> => {
    await apiClient.put(`/v1/programs/${uvaCode}`, data);
  },

  delete: async (uvaCode: string): Promise<void> => {
    await apiClient.delete(`/v1/programs/${uvaCode}`);
  },

  changeState: async (uvaCode: string, data: ChangeVolProgramStateDto): Promise<void> => {
    await apiClient.patch(`/v1/programs/${uvaCode}/state`, data);
  },
};
