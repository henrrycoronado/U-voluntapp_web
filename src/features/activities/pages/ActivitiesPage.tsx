import React, { useState } from 'react';
import { ActivityList } from '../components/ActivityList';
import { ActivityForm } from '../components/ActivityForm';
import { RoleGuard } from '../../../core/components/guards';
import { Button } from '../../../core/components/atoms/Button';
import { Modal } from '../../../core/components/molecules/Modal';
import { usePrograms } from '../../programs/hooks/useProgramHooks';

export const ActivitiesPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const { data: programs, isLoading: programsLoading } = usePrograms();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Actividades</h2>
          <p className="text-zinc-400">Listado de actividades en curso y disponibles.</p>
        </div>
        <RoleGuard requiredRoles={['Admin', 'SuperUser', 'Coordinator']}>
          <Button variant="primary" onClick={() => setModalOpen(true)}>Nueva Actividad</Button>
        </RoleGuard>
      </div>

      <div className="w-full md:w-1/3">
        <label className="block text-sm font-medium text-zinc-300 mb-2">Selecciona un Programa</label>
        <select 
          className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
          disabled={programsLoading}
        >
          <option value="">-- Elija un Programa --</option>
          {programs?.map(p => (
            <option key={p.uvaCode} value={p.uvaCode}>{p.name}</option>
          ))}
        </select>
      </div>

      <ActivityList programCode={selectedProgram} />

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Programar Actividad">
        <ActivityForm onSuccess={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ActivitiesPage;
