import React, { useState } from 'react';
import { Modal, Input, Button, Alert } from '../../../shared/components';
import apiClient from '../../../shared/services/client';

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateActivityModal = ({ isOpen, onClose }: CreateActivityModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // RUTA Y PAYLOAD CORREGIDOS (Coincide con CreateProgramRequest):
      await apiClient.post('/api/v1/programs', {
        name: formData.name,
        description: formData.description
      });
      
      setFormData({ name: '', description: '' });
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Error interno del servidor al guardar el programa.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Nuevo Programa">
      {error && <Alert variant="error" className="mb-4 bg-red-950 border-red-900 text-red-400 text-xs">{error}</Alert>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input label="Nombre del Programa" type="text" name="name" value={formData.name} onChange={handleChange} required />
        <Input label="Descripción Breve" type="text" name="description" value={formData.description} onChange={handleChange} required />
        <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-zinc-800/50">
          <button type="button" onClick={onClose} className="text-xs px-4 py-2 text-zinc-400 hover:text-white transition-colors">Cancelar</button>
          <Button variant="primary" type="submit" className="!w-auto px-6" disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Crear Programa'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
