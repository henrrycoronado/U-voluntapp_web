export interface CreateScholarshipForProfileDto {
  profileCode: string;
  scholarshipTypeCode: string;
  reason: string;
  requiredHours: number;
  startDate?: string;
  endDate?: string;
}
