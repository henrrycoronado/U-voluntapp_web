export interface CoordinatorData {
  programs: number;
  activeVolunteers: number;
  totalHours: number;
}

export interface Program {
  id: number;
  name: string;
  description?: string;
  state: string;
  managerProfileId: string;
}

export interface Activity {
  id: number;
  name: string;
  programId: number;
  state: string;
  startDate: string;
  endDate: string;
  capacity?: number;
  requiresApproval: boolean;
}

export interface Enrollment {
  id: number;
  activityId: number;
  activityName: string;
  enrolledProfileId: string;
  enrolledProfileName: string;
  state: string;
  createdAt: string;
}

export interface CreateProgramRequest {
  name: string;
  description?: string;
  acronym?: string;
  color?: string;
}

export interface CreateActivityRequest {
  programId: number;
  activityTypeId: number;
  name: string;
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
