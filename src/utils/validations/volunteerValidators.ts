import { validators } from './validators';

/**
 * Validation for volunteer profile updates.
 */
export const validateVolunteerProfile = (profile: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  if (profile.firstName !== undefined && profile.firstName !== '') {
    const firstName = profile.firstName as string;
    if (firstName.trim().length === 0) {
      errors.firstName = 'First name is required';
    } else if (firstName.length > 100) {
      errors.firstName = 'First name cannot exceed 100 characters';
    }
  }

  if (profile.lastName !== undefined && profile.lastName !== '') {
    const lastName = profile.lastName as string;
    if (lastName.trim().length === 0) {
      errors.lastName = 'Last name is required';
    } else if (lastName.length > 100) {
      errors.lastName = 'Last name cannot exceed 100 characters';
    }
  }

  if (profile.phone !== undefined && profile.phone !== '') {
    if (!validators.phone(profile.phone)) {
      errors.phone = 'Invalid phone number. It must contain at least 7 digits';
    }
  }

  if (profile.housingLocation !== undefined && profile.housingLocation !== '') {
    const location = profile.housingLocation as string;
    if (location.length > 200) {
      errors.housingLocation = 'Location cannot exceed 200 characters';
    }
  }

  if (profile.personalGoalHours !== undefined) {
    const hours = profile.personalGoalHours as number;
    if (isNaN(hours) || hours < 0) {
      errors.personalGoalHours = 'Goal hours must be a positive number';
    } else if (hours > 10000) {
      errors.personalGoalHours = 'Goal hours cannot exceed 10000';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validation for activity enrollment requests.
 */
export const validateEnrollmentRequest = (enrollment: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  if (!enrollment.activityId) {
    errors.activityId = 'You must select an activity';
  } else if (typeof enrollment.activityId !== 'number' || enrollment.activityId <= 0) {
    errors.activityId = 'The activity ID is not valid';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validation for coordinator role requests.
 */
export const validateRoleRequest = (request: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  if (!request.reason) {
    errors.reason = 'You must provide a reason for the request';
  } else if (typeof request.reason === 'string') {
    if (request.reason.trim().length === 0) {
      errors.reason = 'The reason cannot be empty';
    } else if (request.reason.length < 10) {
      errors.reason = 'The reason must have at least 10 characters';
    } else if (request.reason.length > 1000) {
      errors.reason = 'The reason cannot exceed 1000 characters';
    }
  }

  if (request.months !== undefined) {
    const months = request.months as number;
    if (isNaN(months) || months < 1 || months > 36) {
      errors.months = 'The duration must be between 1 and 36 months';
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Validation for enrollment cancellation.
 */
export const validateCancelEnrollment = (enrollmentId: unknown) => {
  if (!enrollmentId || typeof enrollmentId !== 'number' || enrollmentId <= 0) {
    return 'Invalid enrollment ID';
  }
  return null;
};
