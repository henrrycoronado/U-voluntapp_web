export interface TrackingRecordDto {
  uvaCode: string;
  enrollmentCode: string;
  entryTime: string;
  exitTime?: string;
  calculatedHours?: number;
  observations?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
}
