import { apiClient } from './client';
import type { ApiResponse } from '../types/api';

export interface Program {
  id: number;
  name: string;
  description?: string;
  acronym?: string;
  color?: string;
  state: string;
  managerProfileId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateProgramRequest {
  name: string;
  description?: string;
  acronym?: string;
  color?: string;
}

export interface ChangeProgramStateRequest {
  stateId: number;
}

export const programsApi = {
  // List all programs (filtered by role)
  getAll: () => apiClient.get<ApiResponse<Program[]>>('/api/v1/programs'),

  // Get specific program
  getById: (id: number) => apiClient.get<ApiResponse<Program>>(`/api/v1/programs/${id}`),

  // Create program (Admin only)
  create: (data: CreateProgramRequest) =>
    apiClient.post<ApiResponse<Program>>('/api/v1/programs', data),

  // Update program (Admin only)
  update: (id: number, data: CreateProgramRequest) =>
    apiClient.put<ApiResponse<Program>>(`/api/v1/programs/${id}`, data),

  // Change program state (SuperUser only)
  changeState: (id: number, data: ChangeProgramStateRequest) =>
    apiClient.patch<ApiResponse<Program>>(`/api/v1/programs/${id}/state`, data),

  // Delete program (Admin only)
  delete: (id: number) => apiClient.delete<ApiResponse<void>>(`/api/v1/programs/${id}`),
};
