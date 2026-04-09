// Dashboard metrics
export interface CoordinatorData {
  programs: number;
  activeVolunteers: number;
  totalHours: number;
}

// Program & Activity types
export interface Program {
  id: number;
  name: string;
  description?: string;
  acronym?: string;
  color?: string;
  state: string;
  managerProfileId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Activity {
  id: number;
  programId: number;
  activityTypeId: number;
  name: string;
  description?: string;
  programId: number;
  state: string;
  startDate: string;
  endDate: string;
  capacity?: number;
  enrolled?: number;
  requiresApproval: boolean;
  enrollmentDeadline?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Enrollment {
  id: number;
  activityId: number;
  activityName: string;
  programId: number;
  programName: string;
  enrolledProfileId: string;
  enrolledProfileName: string;
  state: string;
  approvalRequired: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Request types
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

export interface CreateActivitySimpleRequest {
  programId: number;
  name: string;
  startDate: string;
  endDate: string;
}

// Role Request types
export interface RoleRequest {
  id: number;
  requestingProfileId: string;
  requestingProfileName: string;
  requestedRole: 'Admin';
  state: string;
  reason?: string;
  createdAt: string;
}

// Collaborator types
export interface ProgramCollaborator {
  id: number;
  programId: number;
  profileId: string;
  profileName: string;
  profileEmail: string;
  accessLevel: number;
  createdAt: string;
}
