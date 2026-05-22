import { apiClient } from '../../../shared/services/client';
import type { CreateProgramCollaboratorRequest, ProgramCollaborator, UpdateProgramCollaboratorRequest } from '../types/collaborator.types';

export const collaboratorsApi = {
  getById: (id: string | number) =>
    apiClient.get<ProgramCollaborator>(`/api/v1/collaborators/${id}`),

  getByProgram: (programCode: string | number) =>
    apiClient.get<ProgramCollaborator[]>(`/api/v1/collaborators/program/${programCode}`),

  create: (data: CreateProgramCollaboratorRequest) =>
    apiClient.post<ProgramCollaborator>('/api/v1/collaborators', data),

  update: (id: string | number, data: UpdateProgramCollaboratorRequest) =>
    apiClient.put<ProgramCollaborator>(`/api/v1/collaborators/${id}`, data),

  delete: (id: string | number) => apiClient.delete<void>(`/api/v1/collaborators/${id}`),
};

export type {
  CreateProgramCollaboratorRequest,
  ProgramCollaborator,
  UpdateProgramCollaboratorRequest,
} from '../types/collaborator.types';
