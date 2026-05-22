export interface ActivityShift {
  id?: number;
  uvaCode?: string;
  name?: string;
  startTime?: string;
  endTime?: string;
  capacity?: number;
  enrolled?: number;
}

export interface ActivityGroupResponse {
  uvaCode: string;
  name: string;
  details?: string;
  startDate: string;
  endDate: string;
  capacity?: number;
}

export interface CreateActivityGroupRequest {
  name: string;
  details?: string;
  startDate: string;
  endDate: string;
  capacity?: number;
}

export interface ActivityRuleResponse {
  uvaCode: string;
  registrationRadiusMeters: number;
  enrollmentDeadline?: string;
  requiresApproval: boolean;
  totalCapacity?: number;
  groups: ActivityGroupResponse[];
}

export interface CreateActivityRuleRequest {
  registrationRadiusMeters: number;
  enrollmentDeadline?: string;
  requiresApproval: boolean;
  totalCapacity?: number;
  groups: CreateActivityGroupRequest[];
}

export interface Activity {
  uvaCode: string;
  programCode: string;
  programName: string;
  name: string;
  description?: string;
  photoUrl?: string;
  startDate: string;
  endDate: string;
  locationLatitude?: number;
  locationLongitude?: number;
  requiresEnrollment: boolean;
  state: string;
  stateCode: string;
  rule?: ActivityRuleResponse;
  createdAt: string;
  updatedAt: string;
  lastModifiedByCode?: string;
  lastModifiedAt?: string;
  lastModifiedByName?: string;
}

export interface CreateActivityRequest {
  programCode: string;
  activityTypeCode: string;
  name: string;
  description?: string;
  photoUrl?: string;
  startDate: string;
  endDate: string;
  locationLatitude?: number;
  locationLongitude?: number;
  requiresEnrollment: boolean;
  countsVolunteerHours?: boolean;
  isMandatory?: boolean;
  isPublicDropin?: boolean;
  costAmount?: number;
  costCurrency?: string;
  rule?: CreateActivityRuleRequest;
}

export interface CreateActivitySimpleRequest {
  programCode: string;
  activityTypeCode: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  locationLatitude?: number;
  locationLongitude?: number;
  requiresEnrollment: boolean;
  requiresApproval: boolean;
  capacity?: number;
  enrollmentDeadline?: string;
}

export interface UpdateActivityRequest {
  name?: string;
  description?: string;
  photoUrl?: string;
  startDate?: string;
  endDate?: string;
  locationLatitude?: number;
  locationLongitude?: number;
  activityTypeCode?: string;
  countsVolunteerHours?: boolean;
  isMandatory?: boolean;
  isPublicDropin?: boolean;
  costAmount?: number;
  costCurrency?: string;
}

export interface ChangeActivityStateRequest {
  stateCode: string;
}
