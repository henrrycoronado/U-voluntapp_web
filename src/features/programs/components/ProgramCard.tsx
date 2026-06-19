import React from 'react';
import type { ProgramDto } from '../types';
import { Button } from '../../../core/components/atoms/Button';
import { RoleGuard } from '../../../core/components/guards/RoleGuard';
import ProfileProgram from '../../../core/assets/ProfileProgram.svg';
import { getFullImageUrl } from '../../../core/utils/imageUtils';

export const ProgramCard: React.FC<{ program: ProgramDto }> = ({ program }) => {
  const isDefaultImage = !program.coverPhotoUrl || program.coverPhotoUrl.toLowerCase().includes('default') || program.coverPhotoUrl.toLowerCase().includes('deault');
  const imageSrc = isDefaultImage ? ProfileProgram : getFullImageUrl(program.coverPhotoUrl);

  return (
    <div className="flex flex-col overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md rounded-xl hover:bg-white/10 transition-all duration-300 shadow-lg group">
      <div className="h-32 w-full overflow-hidden bg-zinc-900 border-b border-white/5 relative">
        <img src={imageSrc} alt={program.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/90 text-zinc-950 font-bold shadow-lg">{program.stateCode}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-2">{program.name}</h3>
        <p className="text-zinc-400 text-sm mb-4 flex-1 line-clamp-2">{program.description}</p>
        <div className="flex gap-2 mt-auto pt-4 border-t border-white/10">
          <Button size="sm" variant="outline" className="w-full">Ver Detalles</Button>
          <RoleGuard requiredRoles={['Admin', 'SuperUser']}>
            <Button size="sm" variant="primary" className="w-full">Editar</Button>
          </RoleGuard>
        </div>
      </div>
    </div>
  );
};