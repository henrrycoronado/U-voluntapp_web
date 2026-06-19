export interface EnrollmentDto {
  uvaCode: string;
  activityCode: string;
  activityName?: string;
  enrolledProfileCode: string;
  enrolledProfileName?: string;
  stateCode: string;
  state?: string;
  createdAt: string;
  profileCode?: string; // Fallback
}
