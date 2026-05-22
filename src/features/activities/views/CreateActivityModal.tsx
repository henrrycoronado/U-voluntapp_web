import React, { useState } from 'react';
import { 
  Modal, 
  Input, 
  Button, 
  Alert, 
  Select 
} from '../../../components';
import { useCreateActivity } from '../hooks/useActivities';
import { useTypesByGroup } from '../../catalog/hooks/useCatalog';

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  programCode: string;
  onSuccess?: () => void;
}

export const CreateActivityModal = ({ 
  isOpen, 
  onClose, 
  programCode, 
  onSuccess 
}: CreateActivityModalProps) => {
  const { createActivity, isLoading, error: createError } = useCreateActivity();
  const { data: activityTypes, loading: isLoadingTypes } = useTypesByGroup('activity');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    activityTypeCode: '',
    startDate: '',
    endDate: '',
    requiresEnrollment: true,
    requiresApproval: false,
    registrationRadiusMeters: 50,
    totalCapacity: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : (name === 'registrationRadiusMeters' || name === 'totalCapacity' ? Number(value) : value)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createActivity({
        programCode,
        name: formData.name,
        description: formData.description,
        activityTypeCode: formData.activityTypeCode,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        requiresEnrollment: formData.requiresEnrollment,
        rule: {
          registrationRadiusMeters: formData.registrationRadiusMeters,
          requiresApproval: formData.requiresApproval,
          totalCapacity: formData.totalCapacity || undefined,
          groups: [] // Simple creation for now, groups can be added in edit
        }
      });
      
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const typeOptions = activityTypes?.map(t => ({
    value: t.uvaCode || '',
    label: t.name || ''
  })) || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule New Activity" maxWidth="max-w-2xl">
      {createError && <Alert variant="error" className="mb-6">{createError}</Alert>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="Activity Name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="e.g. Tree Planting Day"
            required 
          />
          <Select 
            label="Activity Type"
            name="activityTypeCode"
            value={formData.activityTypeCode}
            onChange={handleChange}
            options={typeOptions}
            disabled={isLoadingTypes}
            required
          />
        </div>

        <Input 
          label="Description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          placeholder="What will volunteers do?"
          required 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="Start Date & Time" 
            type="datetime-local"
            name="startDate" 
            value={formData.startDate} 
            onChange={handleChange} 
            required 
          />
          <Input 
            label="End Date & Time" 
            type="datetime-local"
            name="endDate" 
            value={formData.endDate} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="h-px bg-zinc-800" />

        <div className="space-y-4">
           <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Registration Rules</h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Check-in Radius (meters)" 
                type="number"
                name="registrationRadiusMeters" 
                value={formData.registrationRadiusMeters} 
                onChange={handleChange} 
                required 
              />
              <Input 
                label="Total Capacity (0 for unlimited)" 
                type="number"
                name="totalCapacity" 
                value={formData.totalCapacity} 
                onChange={handleChange} 
              />
           </div>
           
           <div className="flex flex-col gap-4 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  name="requiresApproval"
                  checked={formData.requiresApproval}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-yellow-500 focus:ring-yellow-500/20"
                />
                <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">Requires coordinator approval for enrollment</span>
              </label>
           </div>
        </div>

        <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-zinc-800">
          <button 
            type="button" 
            onClick={onClose} 
            className="text-xs px-6 py-2 text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <Button variant="primary" type="submit" className="!w-auto px-10" disabled={isLoading}>
            {isLoading ? 'Scheduling...' : 'Schedule Activity'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
