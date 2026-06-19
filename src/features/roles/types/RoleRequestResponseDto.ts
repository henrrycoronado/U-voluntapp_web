export interface RoleRequestResponseDto {
  uvaCode?: string;
  requesterProfileCode?: string;
  requestedRole?: string;
  reason?: string;
  durationInMonths?: number;
  stateCode?: string;
  resolvedByProfileCode?: string;
  createdAt: string;
  resolvedAt?: string;
}
