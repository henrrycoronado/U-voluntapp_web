export interface ActivityDto {
  uvaCode: string;
  programCode: string;
  name: string;
  description?: string;
  photoUrl?: string;
  startDate: string;
  endDate: string;
  activityTypeCode: string;
  stateCode: string;
  locationLatitude?: number;
  locationLongitude?: number;
  requiresEnrollment: boolean;
  countsVolunteerHours?: boolean;
  isMandatory?: boolean;
  isPublicDropin?: boolean;
  costAmount?: number;
  costCurrency?: string;
  createdAt: string;
}
