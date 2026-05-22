import { profilesApi, type UpdateProfileRequest } from './profileApi';

export const volunteerApi = {
  updateMyProfile: async (data: UpdateProfileRequest) => {
    const response = await profilesApi.updateMe(data);
    return response.data;
  },

  deleteMyAccount: async () => {
    throw new Error('Delete account endpoint not implemented yet');
  },
};
