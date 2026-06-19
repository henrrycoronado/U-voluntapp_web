export interface CreateScholarshipRequestDto {
  scholarshipTypeCode: string;
  reason: string;
  startDate?: string;
  endDate?: string;
}
