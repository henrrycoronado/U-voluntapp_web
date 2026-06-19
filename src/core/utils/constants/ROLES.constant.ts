export const ROLES = {
  SUPERUSER: 'SuperUser',
  ADMIN: 'Admin',
  COORDINATOR: 'Coordinator',
  VOLUNTEER: 'Volunteer',
} as const;

export type AppRole = (typeof ROLES)[keyof typeof ROLES];
