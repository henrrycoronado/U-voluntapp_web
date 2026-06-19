export interface ScholarshipDto {
  uvaCode: string;
  profileCode: string;
  scholarshipTypeCode: string;
  stateCode: string;
  reason?: string;
  requiredHours: number;
  completedHours?: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}
