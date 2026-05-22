export interface Enrollment {
  uvaCode: string;
  activityCode: string;
  activityName: string;
  enrolledProfileCode: string;
  enrolledProfileName: string;
  activityGroupCode?: string;
  state: string;
  stateCode: string;
  createdAt: string;
}

export interface CreateEnrollmentRequest {
  activityCode: string;
  activityGroupCode?: string;
}

export interface ReviewEnrollmentRequest {
  approved: boolean;
}

export interface CancelEnrollmentRequest {
  reason?: string;
}
