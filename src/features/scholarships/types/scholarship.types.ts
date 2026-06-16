export interface Scholarship {
  uvaCode?: string;
  id?: number;
  profileCode?: string;
  profileId?: string;
  scholarshipTypeCode?: string;
  scholarshipType?: string;
  reason?: string;
  requiredHours?: number;
  startDate?: string;
  endDate?: string;
  stateCode?: string;
  state?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateScholarshipRequest {
  scholarshipTypeCode: string;
  reason: string;
  startDate?: string;
  endDate?: string;
}

export interface CreateScholarshipForProfileRequest {
  profileCode: string;
  scholarshipTypeCode: string;
  reason: string;
  requiredHours: number;
  startDate?: string;
  endDate?: string;
}

export interface ReviewScholarshipRequest {
  approve: boolean;
  requiredHours?: number;
  startDate?: string;
  endDate?: string;
}

export interface CompleteScholarshipRequest {
  endDate: string;
}
