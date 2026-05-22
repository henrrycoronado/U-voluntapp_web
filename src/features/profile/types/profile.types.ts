export interface Profile {
  uvaCode: string;
  identityUserId: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl?: string;
  phone?: string;
  housingLocation?: string;
  careerCode?: string;
  careerName?: string;
  personalGoalHours: number;
  stateCode: string;
  createdAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  housingLocation?: string;
  careerCode?: string;
  personalGoalHours?: number;
}

export interface UpdateProfilePhotoResponse {
  photoUrl: string;
}
