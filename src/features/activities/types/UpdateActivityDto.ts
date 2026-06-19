export interface UpdateActivityDto {
  name?: string;
  description?: string;
  photoUrl?: string;
  startDate?: string;
  endDate?: string;
  locationLatitude?: number;
  locationLongitude?: number;
  activityTypeCode?: string;
  countsVolunteerHours?: boolean;
  isMandatory?: boolean;
  isPublicDropin?: boolean;
  costAmount?: number;
  costCurrency?: string;
}
