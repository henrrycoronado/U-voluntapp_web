import { isValidEmail } from './isValidEmail';

export const isInstitutionalEmail = (email: string): boolean => {
  return isValidEmail(email) && email.endsWith('.edu.bo');
};
