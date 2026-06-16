export interface Program {
  uvaCode: string;
  name: string;
  description?: string;
  acronym?: string;
  color?: string;
  profilePhotoUrl?: string;
  coverPhotoUrl?: string;
  managerProfileId: string;
  managerName: string;
  state: string;
  stateCode: string;
  createdAt: string;
}

export interface CreateProgramRequest {
  name: string;
  description?: string;
  acronym?: string;
}

export interface UpdateProgramRequest {
  name?: string;
  description?: string;
  acronym?: string;
  color?: string;
  profilePhotoUrl?: string;
  coverPhotoUrl?: string;
}

export interface ChangeProgramStateRequest {
  stateCode: string;
}
