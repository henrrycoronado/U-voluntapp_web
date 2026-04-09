// Export error handler
export { getErrorMessage } from './errorHandler';

// Export volunteer exceptions
export {
  VolunteerException,
  ProfileException,
  EnrollmentException,
  RoleRequestException,
  ProgramException,
  handleVolunteerError,
} from './volunteerExceptions';

// Export coordinator exceptions
export {
  CoordinatorException,
  ProgramException as CoordinatorProgramException,
  ActivityException,
  CollaboratorException,
  EnrollmentReviewException,
  AdminRoleRequestException,
  handleCoordinatorError,
} from './coordinatorExceptions';

// Export admin exceptions
export {
  AdminException,
  ProgramManagementException,
  ActivityManagementException,
  RoleRequestReviewException,
  CollaboratorManagementException,
  AnalyticsException,
  handleAdminError,
} from './adminExceptions';
