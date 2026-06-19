import React from 'react';
import { Card } from '../../../core/components/atoms/Card';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Bienvenido al Dashboard</h2>
        <p className="text-zinc-400">Resumen operativo de tu participación en U-VoluntApp.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <h3 className="text-xl font-semibold text-zinc-100">Horas Totales</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">0</p>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold text-zinc-100">Actividades Próximas</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">0</p>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold text-zinc-100">Estado de Beca</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">Inactivo</p>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
