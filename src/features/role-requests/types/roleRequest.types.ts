export type RequestedRole = 'Coordinator' | 'Admin';

export interface RoleRequestResponse {
  uvaCode?: string;
  id?: number;
  requesterProfileCode?: string;
  requesterProfileId?: string;
  requestedRole?: RequestedRole | string;
  reason?: string;
  durationInMonths?: number;
  stateCode?: string;
  state?: string;
  resolvedByProfileCode?: string;
  resolvedByProfileId?: string;
  createdAt?: string;
  resolvedAt?: string;
}

export interface CreateRoleRequestDto {
  email: string;
  reason: string;
  durationInMonths?: number;
}

export interface RejectRoleRequestDto {
  reason?: string;
}