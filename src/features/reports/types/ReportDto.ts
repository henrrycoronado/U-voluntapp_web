export interface ProgramAnalyticsDto {
  programCode: string;
  programName: string;
  totalActivities: number;
  totalUniqueVolunteers: number;
  totalGeneratedHours: number;
}

export interface ActivityAnalyticsDto {
  activityCode: string;
  programCode: string;
  programName: string;
  activityName: string;
  startDate: string;
  endDate: string;
  totalCapacity: number;
  totalEnrolled: number;
  totalAttended: number;
  totalActivityHours: number;
}

export interface ScholarshipPerformanceDto {
  profileCode: string;
  fullName: string;
  scholarshipType: string;
  requiredHours: number;
  completedHours: number;
  remainingHours: number;
  completionPercentage: number;
  contractState: string;
  endDate: string | null;
}

export interface VolunteerHistoryDto {
  profileCode: string;
  fullName: string;
  careerName: string | null;
  personalGoalHours: number;
  totalActivitiesParticipated: number;
  validatedHours: number;
  totalLoggedHours: number;
  lastActivityDate: string | null;
}
