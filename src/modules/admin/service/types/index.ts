// Dashboard metrics
export interface AdminData {
  totalUsers: number;
  activePrograms: number;
  totalHours: number;
}

// Analytics interfaces
export interface ProgramAnalytics {
  id: number;
  name: string;
  activeCount: number;
  totalVolunteers: number;
  totalHoursServed: number;
  createdAt: string;
}

export interface ActivityAnalytics {
  id: number;
  programId: number;
  programName: string;
  name: string;
  enrollmentCount: number;
  completionRate: number;
  totalHours: number;
  createdAt: string;
}

export interface ScholarshipMetrics {
  totalRequests: number;
  approvedCount: number;
  rejectedCount: number;
  pendingCount: number;
}

export interface VolunteerHistory {
  profileId: string;
  name: string;
  email: string;
  hoursServed: number;
  programsJoined: number;
  activitiesCompleted: number;
  lastActivityDate: string;
}

// Program & Activity types (re-exported for convenience)
export interface Program {
  id: number;
  name: string;
  description?: string;
  acronym?: string;
  color?: string;
  state: string;
  managerProfileId: string;
  createdAt: string;
}

export interface Activity {
  id: number;
  programId: number;
  name: string;
  description?: string;
  state: string;
  startDate: string;
  endDate: string;
  capacity?: number;
  enrolled?: number;
  createdAt: string;
}

export interface Enrollment {
  id: number;
  activityId: number;
  enrolledProfileId: string;
  enrolledProfileName: string;
  state: string;
  createdAt: string;
}

export interface RoleRequest {
  id: number;
  requestingProfileId: string;
  requestingProfileName: string;
  requestedRole: 'Coordinator' | 'Admin';
  state: string;
  createdAt: string;
}

export interface ProgramCollaborator {
  id: number;
  programId: number;
  profileId: string;
  profileName: string;
  accessLevel: number;
  createdAt: string;
}
