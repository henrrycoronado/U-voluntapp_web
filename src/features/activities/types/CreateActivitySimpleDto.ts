export interface CreateActivitySimpleDto {
  programCode?: string;
  activityTypeCode?: string;
  name?: string;
  description?: string;
  startDate: string;
  endDate: string;
  locationLatitude?: number;
  locationLongitude?: number;
  requiresEnrollment: boolean;
  requiresApproval: boolean;
  capacity?: number;
  enrollmentDeadline?: string;
}
