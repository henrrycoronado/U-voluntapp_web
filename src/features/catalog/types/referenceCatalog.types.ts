export interface ReferenceState {
  stateGroup?: string;
  uvaCode?: string;
  name?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReferenceType {
  typeGroup?: string;
  uvaCode?: string;
  name?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReferenceTypeRequest {
  name: string;
  isActive?: boolean;
}

export interface UpdateReferenceStateNameRequest {
  name: string;
}

export interface UpdateReferenceTypeRequest {
  name?: string;
  isActive?: boolean;
}