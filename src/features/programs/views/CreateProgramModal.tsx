import React, { useState } from 'react';
import { Modal, Input, Button, Alert } from '../../../components';
import { useCreateProgram } from '../hooks/usePrograms';

interface CreateProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CreateProgramModal = ({ isOpen, onClose, onSuccess }: CreateProgramModalProps) => {
  const { createProgram, isLoading, error: createError } = useCreateProgram();
  const [formData, setFormData] = useState({ name: '', description: '', acronym: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createProgram({
        name: formData.name,
        description: formData.description,
        acronym: formData.acronym
      });
      
      setFormData({ name: '', description: '', acronym: '' });
      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Program">
      {createError && (
        <Alert variant="error" className="mb-4">
          {createError}
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input 
          label="Program Name" 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="e.g. Environmental Awareness"
          required 
        />
        <Input 
          label="Acronym" 
          type="text" 
          name="acronym" 
          value={formData.acronym} 
          onChange={handleChange} 
          placeholder="e.g. ENV-01"
        />
        <Input 
          label="Brief Description" 
          type="text" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          placeholder="Describe the main goal of this program"
          required 
        />
        <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-zinc-800/50">
          <button 
            type="button" 
            onClick={onClose} 
            className="text-xs px-4 py-2 text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <Button variant="primary" type="submit" className="!w-auto px-6" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Program'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
