import React, { useState } from 'react';
import { ProgramList } from '../components/ProgramList';
import { ProgramForm } from '../components/ProgramForm';
import { RoleGuard } from '../../../core/components/guards';
import { Button } from '../../../core/components/atoms/Button';
import { Modal } from '../../../core/components/molecules/Modal';

export const ProgramsPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Programas</h2>
          <p className="text-zinc-400">Explora los programas de voluntariado activos.</p>
        </div>
        <RoleGuard requiredRoles={['Admin', 'SuperUser']}>
          <Button variant="primary" onClick={() => setModalOpen(true)}>Nuevo Programa</Button>
        </RoleGuard>
      </div>

      <ProgramList />

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Crear Nuevo Programa">
        <ProgramForm onSuccess={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ProgramsPage;
