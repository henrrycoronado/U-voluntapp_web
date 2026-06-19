import { apiClient } from '../../../core/networks/api/client';
import type { CreateRoleRequestDto, RoleRequestResponseDto } from '../types';

export const roleService = {
  requestCoordinator: async (data: CreateRoleRequestDto): Promise<RoleRequestResponseDto> =>
    apiClient.post<RoleRequestResponseDto>('/v1/roles/requests/coordinator', data).then(r => r.data),

  getCoordinatorRequests: async (): Promise<RoleRequestResponseDto[]> =>
    apiClient.get<RoleRequestResponseDto[]>('/v1/roles/requests/coordinator').then(r => r.data),

  requestAdmin: async (data: CreateRoleRequestDto): Promise<RoleRequestResponseDto> =>
    apiClient.post<RoleRequestResponseDto>('/v1/roles/requests/admin', data).then(r => r.data),

  getAdminRequests: async (): Promise<RoleRequestResponseDto[]> =>
    apiClient.get<RoleRequestResponseDto[]>('/v1/roles/requests/admin').then(r => r.data),

  approveCoordinator: async (uvaCode: string): Promise<string> =>
    apiClient.post<string>(`/v1/roles/requests/${uvaCode}/coordinator/approve`).then(r => r.data),

  rejectCoordinator: async (uvaCode: string): Promise<string> =>
    apiClient.post<string>(`/v1/roles/requests/${uvaCode}/coordinator/reject`).then(r => r.data),

  approveAdmin: async (uvaCode: string): Promise<string> =>
    apiClient.post<string>(`/v1/roles/requests/${uvaCode}/admin/approve`).then(r => r.data),

  rejectAdmin: async (uvaCode: string): Promise<string> =>
    apiClient.post<string>(`/v1/roles/requests/${uvaCode}/admin/reject`).then(r => r.data),
};
