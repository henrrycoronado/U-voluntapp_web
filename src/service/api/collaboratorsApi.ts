import { apiClient } from './client';
import type { ApiResponse } from '../types/api';

export interface ProgramCollaborator {
  id: number;
  programId: number;
  profileId: string;
  profileName: string;
  profileEmail: string;
  accessLevel: number; // 1: Manager, 2: Editor, 3: Viewer
  createdAt: string;
  updatedAt?: string;
}

export interface CreateProgramCollaboratorRequest {
  programId: number;
  profileEmail: string;
  accessLevel: number;
}

export interface UpdateProgramCollaboratorRequest {
  accessLevel: number;
}

export const collaboratorsApi = {
  // Get collaborator details
  getById: (id: number) =>
    apiClient.get<ApiResponse<ProgramCollaborator>>(`/api/v1/collaborators/${id}`),

  // Get collaborators for program
  getByProgram: (programId: number) =>
    apiClient.get<ApiResponse<ProgramCollaborator[]>>(`/api/v1/collaborators/program/${programId}`),

  // Add collaborator to program
  create: (data: CreateProgramCollaboratorRequest) =>
    apiClient.post<ApiResponse<ProgramCollaborator>>('/api/v1/collaborators', data),

  // Update collaborator access level
  update: (id: number, data: UpdateProgramCollaboratorRequest) =>
    apiClient.put<ApiResponse<ProgramCollaborator>>(`/api/v1/collaborators/${id}`, data),

  // Remove collaborator from program
  delete: (id: number) => apiClient.delete<ApiResponse<void>>(`/api/v1/collaborators/${id}`),
};
