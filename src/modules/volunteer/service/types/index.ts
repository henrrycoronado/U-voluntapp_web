// User profile types
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl?: string;
  phone?: string;
  housingLocation?: string;
  careerId?: number;
  careerName?: string;
  personalGoalHours?: number;
  state: string;
  createdAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  housingLocation?: string;
  careerId?: number;
  personalGoalHours?: number;
}

// Program types
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

// Activity types
export interface Activity {
  id: number;
  programId: number;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  state: string;
  capacity?: number;
  enrolled?: number;
  requiresApproval: boolean;
  locationLatitude?: number;
  locationLongitude?: number;
  createdAt: string;
}

// Enrollment types
export interface Enrollment {
  id: number;
  activityId: number;
  activityName: string;
  programId: number;
  programName: string;
  enrolledProfileId: string;
  state: string;
  createdAt: string;
}

export interface CreateEnrollmentRequest {
  activityId: number;
}

// Role Request types
export interface RoleRequest {
  id: number;
  requestingProfileId: string;
  requestingProfileName: string;
  requestedRole: 'Coordinator';
  state: string;
  reason?: string;
  createdAt: string;
}

// Dashboard types
export interface VolunteerDashboard {
  hoursServed: number;
  programsJoined: number;
  activitiesCompleted: number;
  upcomingActivities: Activity[];
  myEnrollments: Enrollment[];
}
