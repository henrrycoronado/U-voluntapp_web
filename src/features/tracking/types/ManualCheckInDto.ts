export interface ManualCheckInDto {
  enrollmentCode?: string;
  entryTime: string;
  exitTime?: string;
  calculatedHours: number;
  observations?: string;
  latitude?: number;
  longitude?: number;
}
