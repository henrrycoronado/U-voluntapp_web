import React, { useState } from 'react';
import { Button, Input, Card, Alert, Select, SkeletonList } from '../../../components';
import { useMyProfile } from '../hooks/useMyProfile';
import { useTypesByGroup } from '../../catalog/hooks/useCatalog';
import { User, MapPin, GraduationCap, Target } from 'lucide-react';
import { getErrorMessage } from '../../../utils/exceptions/errorHandler';
import type { Profile, UpdateProfileRequest } from '../types/profile.types';
import type { ReferenceType } from '../../catalog/types/referenceCatalog.types';

interface ProfileFormInnerProps {
  profile: Profile | null;
  updateProfile: (payload: UpdateProfileRequest) => Promise<Profile>;
  isUpdating: boolean;
  profileError: string | null;
  careers: ReferenceType[] | null;
  isLoadingCareers: boolean;
}

const ProfileFormInner = ({
  profile,
  updateProfile,
  isUpdating,
  profileError,
  careers,
  isLoadingCareers,
}: ProfileFormInnerProps) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    phone: profile?.phone || '',
    housingLocation: profile?.housingLocation || '',
    careerCode: profile?.careerCode || '',
    personalGoalHours: profile?.personalGoalHours || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'personalGoalHours' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setError(null);

    // Check if changes were actually made to avoid "No changes" 400 error
    const hasChanges =
      formData.firstName !== profile?.firstName ||
      formData.lastName !== profile?.lastName ||
      formData.phone !== profile?.phone ||
      formData.housingLocation !== profile?.housingLocation ||
      formData.careerCode !== profile?.careerCode ||
      formData.personalGoalHours !== profile?.personalGoalHours;

    if (!hasChanges) {
      setSuccessMessage('No changes detected.');
      return;
    }

    try {
      // Sanitize: Convert empty strings to undefined for optional fields to avoid backend validation issues
      const payload: UpdateProfileRequest = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        careerCode: formData.careerCode || undefined,
        phone: formData.phone || undefined,
        housingLocation: formData.housingLocation || undefined,
        personalGoalHours: formData.personalGoalHours,
      };

      await updateProfile(payload);
      setSuccessMessage('Profile updated successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const careerOptions =
    careers?.map((c) => ({
      value: c.uvaCode || '',
      label: c.name || '',
    })) || [];

  return (
    <div className="p-4 md:p-10 w-full max-w-4xl mx-auto text-white animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">My Profile</h1>
        <p className="text-zinc-400 text-sm">
          Manage your personal information and volunteer goals.
        </p>
      </div>

      {successMessage && (
        <Alert variant="success" className="mb-8 shadow-lg shadow-green-500/5">
          {successMessage}
        </Alert>
      )}

      {(error || profileError) && (
        <Alert variant="error" className="mb-8">
          {error || profileError}
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-8 border-zinc-800/50 bg-[#121214]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-yellow-500 mb-2">
                  <User size={18} />
                  <h3 className="text-sm font-bold uppercase tracking-wider">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+591 ..."
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-zinc-500">Email Address</label>
                    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-md p-2.5 text-sm text-zinc-500 cursor-not-allowed">
                      {profile?.email}
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-zinc-800/50" />

              <div className="space-y-6">
                <div className="flex items-center gap-2 text-yellow-500 mb-2">
                  <GraduationCap size={18} />
                  <h3 className="text-sm font-bold uppercase tracking-wider">
                    Academic & Location
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Career / Study Program"
                    name="careerCode"
                    value={formData.careerCode}
                    onChange={handleChange}
                    options={careerOptions}
                    disabled={isLoadingCareers}
                  />
                  <Input
                    label="Housing Area / Zone"
                    name="housingLocation"
                    value={formData.housingLocation}
                    onChange={handleChange}
                    placeholder="e.g. South Zone, Obrajes"
                  />
                </div>
              </div>

              <div className="h-px bg-zinc-800/50" />

              <div className="space-y-6">
                <div className="flex items-center gap-2 text-yellow-500 mb-2">
                  <Target size={18} />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Volunteer Goals</h3>
                </div>

                <div className="max-w-xs">
                  <Input
                    label="Personal Goal (Total Hours)"
                    type="number"
                    name="personalGoalHours"
                    value={formData.personalGoalHours}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4 pt-6 border-t border-zinc-800/80">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isUpdating}
                  className="!w-auto px-10 py-3 font-bold"
                >
                  {isUpdating ? 'Saving Changes...' : 'Save Profile'}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-8 text-center bg-[#18181b] border-yellow-500/10">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center text-yellow-500 text-4xl font-bold border-2 border-yellow-500/20">
                {profile?.firstName?.charAt(0)}
                {profile?.lastName?.charAt(0)}
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-[#18181b] rounded-full" />
            </div>

            <h2 className="text-xl font-bold text-white mb-1">
              {profile?.firstName} {profile?.lastName}
            </h2>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-6">
              Active UCB Volunteer
            </p>

            <div className="flex flex-col gap-3 pt-6 border-t border-zinc-800/50 text-left">
              <div className="flex items-center gap-3 text-zinc-400">
                <MapPin size={14} className="text-yellow-500" />
                <span className="text-xs">{profile?.housingLocation || 'Location not set'}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <GraduationCap size={14} className="text-yellow-500" />
                <span className="text-xs">
                  {careers?.find((c: ReferenceType) => c.uvaCode === profile?.careerCode)?.name ||
                    'Career not set'}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-zinc-900/30 border-zinc-800/50">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
              Account Status
            </h4>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Verified</span>
              <span className="text-green-500 font-medium">Yes</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-3">
              <span className="text-zinc-400">Joined Date</span>
              <span className="text-white">
                {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const ProfileForm = () => {
  const {
    data: profile,
    loading: isLoadingProfile,
    updateProfile,
    isUpdating,
    error: profileError,
  } = useMyProfile();
  const { data: careers, loading: isLoadingCareers } = useTypesByGroup('career');

  if (isLoadingProfile && !profile) {
    return (
      <div className="p-10 max-w-3xl mx-auto">
        <SkeletonList count={5} />
      </div>
    );
  }

  return (
    <ProfileFormInner
      key={profile?.uvaCode || 'loading'}
      profile={profile}
      updateProfile={updateProfile}
      isUpdating={isUpdating}
      profileError={profileError}
      careers={careers}
      isLoadingCareers={isLoadingCareers}
    />
  );
};
