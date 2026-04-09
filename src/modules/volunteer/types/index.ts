export interface ProfileResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl?: string;
  phone?: string;
  housingLocation?: string;
  careerId?: number;
  careerName?: string;
  personalGoalHours: number;
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

export interface ActivityResponse {
  id: number;
  programId: number;
  name: string;
  description: string;
  date: string;
  totalHours: number;
  state: string;
}

export interface EnrollmentResponse {
  id: number;
  volunteerId: string;
  activityId: number;
  activityName: string;
  enrollmentDate: string;
  state: string;
  pointsEarned: number;
}

export interface ProgramResponse {
  id: number;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  state: string;
}
