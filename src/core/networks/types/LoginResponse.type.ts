export interface LoginResponse {
  token: string;
  accessTokenExpiresAtUtc: string;
  refreshToken: string;
  uvaCode: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}
