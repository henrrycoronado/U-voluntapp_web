export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string | null;
  items: unknown[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  message: string | null;
  items: T[];
}
