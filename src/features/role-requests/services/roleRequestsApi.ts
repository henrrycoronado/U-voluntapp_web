import { apiClient } from '../../../shared/services/client';
import type { CreateRoleRequestDto, RejectRoleRequestDto, RoleRequestResponse } from '../types/roleRequest.types';

export const roleRequestsApi = {
  getPendingCoordinator: () =>
    apiClient.get<RoleRequestResponse[]>('/api/v1/roles/requests/coordinator'),

  getPendingAdmin: () => apiClient.get<RoleRequestResponse[]>('/api/v1/roles/requests/admin'),

  requestCoordinator: (data: CreateRoleRequestDto) =>
    apiClient.post<RoleRequestResponse>('/api/v1/roles/requests/coordinator', data),

  requestAdmin: (data: CreateRoleRequestDto) =>
    apiClient.post<RoleRequestResponse>('/api/v1/roles/requests/admin', data),

  approveCoordinator: (id: string | number) =>
    apiClient.post<RoleRequestResponse>(`/api/v1/roles/requests/${id}/coordinator/approve`, {}),

  rejectCoordinator: (id: string | number, data?: RejectRoleRequestDto) =>
    apiClient.post<RoleRequestResponse>(`/api/v1/roles/requests/${id}/coordinator/reject`, data),

  approveAdmin: (id: string | number) =>
    apiClient.post<RoleRequestResponse>(`/api/v1/roles/requests/${id}/admin/approve`, {}),

  rejectAdmin: (id: string | number, data?: RejectRoleRequestDto) =>
    apiClient.post<RoleRequestResponse>(`/api/v1/roles/requests/${id}/admin/reject`, data),
};

export type {
  CreateRoleRequestDto,
  RejectRoleRequestDto,
  RequestedRole,
  RoleRequestResponse,
} from '../types/roleRequest.types';
export type { RoleRequestResponse as RoleRequest } from '../types/roleRequest.types';
export type { CreateRoleRequestDto as CreateCoordinatorRoleRequest } from '../types/roleRequest.types';
export type { CreateRoleRequestDto as CreateAdminRoleRequest } from '../types/roleRequest.types';
export type { RejectRoleRequestDto as RejectRoleRequestRequest } from '../types/roleRequest.types';
