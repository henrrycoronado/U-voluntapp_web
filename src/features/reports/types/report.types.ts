export interface ScholarshipReportItem {
  scholarshipType?: string;
  total?: number;
  approved?: number;
  rejected?: number;
  pending?: number;
}

export interface ProgramReportItem {
  programCode?: string;
  programName?: string;
  totalActivities?: number;
  totalEnrollments?: number;
  totalVolunteers?: number;
}

export interface ActivityReportItem {
  activityCode?: string;
  activityName?: string;
  programCode?: string;
  enrollments?: number;
  hours?: number;
}

export interface VolunteerReportItem {
  profileCode?: string;
  profileName?: string;
  email?: string;
  totalHours?: number;
  enrollments?: number;
  scholarships?: number;
}

export interface ReportRefreshResponse {
  success?: boolean;
  message?: string;
}