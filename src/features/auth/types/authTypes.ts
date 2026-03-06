export interface User {
  id: string;
  name: string;
  role: 'admin' | 'volunteer';
  token: string;
}
