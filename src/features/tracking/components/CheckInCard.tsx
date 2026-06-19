import React from 'react';
import { Button } from '../../../core/components/atoms/Button';
import { useCheckIn, useCheckOut } from '../hooks';

export const CheckInCard: React.FC = () => {
  const checkIn = useCheckIn();
  const checkOut = useCheckOut();

  return (
    <div className="p-6 bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-xl text-center shadow-2xl">
      <h3 className="text-lg font-semibold text-white mb-4">Registro de Asistencia</h3>
      <div className="flex gap-4 justify-center">
        <Button onClick={() => checkIn.mutate()} isLoading={checkIn.isPending} className="w-32 bg-green-500 hover:bg-green-600 border-green-400 text-white">Entrada</Button>
        <Button onClick={() => checkOut.mutate()} isLoading={checkOut.isPending} className="w-32 bg-red-500 hover:bg-red-600 border-red-400 text-white">Salida</Button>
      </div>
    </div>
  );
};