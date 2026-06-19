import type { CreateActivityGroupDto } from './CreateActivityGroupDto';

export interface CreateActivityRuleDto {
  registrationRadiusMeters: number;
  enrollmentDeadline?: string;
  requiresApproval: boolean;
  totalCapacity?: number;
  groups?: CreateActivityGroupDto[];
}
