import type { CreateActivityRuleDto } from './CreateActivityRuleDto';

export interface CreateActivityDto {
  programCode?: string;
  activityTypeCode?: string;
  name?: string;
  description?: string;
  photoUrl?: string;
  startDate: string;
  endDate: string;
  locationLatitude?: number;
  locationLongitude?: number;
  requiresEnrollment: boolean;
  countsVolunteerHours?: boolean;
  isMandatory?: boolean;
  isPublicDropin?: boolean;
  costAmount?: number;
  costCurrency?: string;
  rule: CreateActivityRuleDto;
}
