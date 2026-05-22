export interface TrackingLog {
  uvaCode?: string;
  enrollmentCode?: string;
  trackingLogCode?: string;
  entryTime?: string;
  exitTime?: string;
  calculatedHours?: number;
  observations?: string;
  latitude?: number;
  longitude?: number;
  stateCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ManualCheckInRequest {
  enrollmentCode?: string;
  entryTime?: string;
  exitTime?: string;
  calculatedHours?: number;
  observations?: string;
  latitude?: number;
  longitude?: number;
}

export interface ManualCheckOutRequest {
  trackingLogCode?: string;
  exitTime?: string;
  observations?: string;
}

export type CheckInRequest = ManualCheckInRequest;
export type CheckOutRequest = ManualCheckOutRequest;