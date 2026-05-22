// This file is now empty or minimal as the API no longer uses envelopes
// We keep it for potential future generic types if needed, or for errors.

export interface ApiError {
  success: false;
  message: string;
  errors?: string[] | Record<string, string[]>;
}
