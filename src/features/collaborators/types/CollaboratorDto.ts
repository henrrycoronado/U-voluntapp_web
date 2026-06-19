export interface CollaboratorDto {
  uvaCode: string;
  programCode: string;
  profileCode: string;
  profileName?: string;
  assignedByProfileCode?: string;
  assignedByName?: string;
  stateCode: string;
  stateName?: string;
  createdAt: string;
  updatedAt?: string;
}
