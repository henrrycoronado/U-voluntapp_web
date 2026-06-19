export interface VolunteerHistoryDto {
  profileCode: string;
  fullName: string;
  careerName?: string;
  personalGoalHours: number;
  totalActivitiesParticipated: number;
  validatedHours: number;
  totalLoggedHours: number;
  lastActivityDate?: string;
}
