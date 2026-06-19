import { apiClient } from '../../../core/networks/api/client';
import type {
  CollaboratorDto,
  AddProgramCollaboratorDto,
  UpdateProgramCollaboratorDto,
} from '../types';

export const collaboratorService = {
  create: async (data: AddProgramCollaboratorDto): Promise<void> => {
    await apiClient.post('/v1/collaborators', data);
  },

  getByProgram: async (programCode: string, stateCode?: string): Promise<CollaboratorDto[]> =>
    apiClient.get<CollaboratorDto[]>(`/v1/collaborators/program/${programCode}`, {
      params: stateCode ? { stateCode } : undefined,
    }).then(r => r.data),

  getByCode: async (uvaCode: string): Promise<CollaboratorDto> =>
    apiClient.get<CollaboratorDto>(`/v1/collaborators/${uvaCode}`).then(r => r.data),

  update: async (uvaCode: string, data: UpdateProgramCollaboratorDto): Promise<void> => {
    await apiClient.put(`/v1/collaborators/${uvaCode}`, data);
  },

  delete: async (uvaCode: string): Promise<void> => {
    await apiClient.delete(`/v1/collaborators/${uvaCode}`);
  },
};
