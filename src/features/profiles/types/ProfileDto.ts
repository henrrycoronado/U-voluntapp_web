export interface ProfileDto {
  uvaCode: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  housingLocation?: string;
  careerCode?: string;
  personalGoalHours?: number;
  photoUrl?: string;
  roles: string[];
  stateCode: string;
  createdAt: string;
}
