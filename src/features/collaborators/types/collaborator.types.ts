export interface ProgramCollaborator {
  id?: number;
  uvaCode?: string;
  programCode?: string;
  programId?: number;
  profileCode?: string;
  profileId?: string;
  profileName?: string;
  profileEmail?: string;
  stateCode?: string;
  state?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProgramCollaboratorRequest {
  programCode?: string;
  programId?: number;
  profileCode?: string;
  profileId?: string;
  stateCode: string;
}

export interface UpdateProgramCollaboratorRequest {
  stateCode: string;
}