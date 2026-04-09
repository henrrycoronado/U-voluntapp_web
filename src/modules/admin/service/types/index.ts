export interface AdminData {
  totalUsers: number;
  activePrograms: number;
  totalHours: number;
}

export interface ProgramAnalytics {
  id: number;
  name: string;
  activeCount: number;
  totalVolunteers: number;
}

export interface ActivityAnalytics {
  id: number;
  name: string;
  enrollmentCount: number;
  completionRate: number;
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
  lastActivityDate: string;
}
