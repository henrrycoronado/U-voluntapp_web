import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProgramDto } from '../types';
import ProfileProgram from '../../../core/assets/ProfileProgram.svg';
import { getFullImageUrl } from '../../../core/utils/imageUtils';

export const ProgramCard: React.FC<{ program: ProgramDto }> = ({ program }) => {
  const navigate = useNavigate();
  const isDefaultImage =
    !program.coverPhotoUrl ||
    program.coverPhotoUrl.toLowerCase().includes('default') ||
    program.coverPhotoUrl.toLowerCase().includes('deault');
  const imageSrc = isDefaultImage ? ProfileProgram : getFullImageUrl(program.coverPhotoUrl);

  return (
    <div
      onClick={() => navigate(`/programs/${program.uvaCode}`)}
      className="flex flex-col overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md rounded-xl hover:bg-white/10 hover:border-yellow-500/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-all duration-300 shadow-lg group cursor-pointer"
    >
      <div className="h-40 w-full overflow-hidden bg-zinc-900 border-b border-white/5 relative">
        <img
          src={imageSrc}
          alt={program.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-1 items-center justify-center text-center">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-500 transition-colors">
          {program.name}
        </h3>
        {/* Usamos stateCode temporalmente si el backend no trae el acrónimo explícito, o si lo trae lo reemplazamos */}
        <p className="text-zinc-400 text-sm font-medium tracking-wider uppercase">
          {program.acronym || 'PROGRAMA'}
        </p>
      </div>
    </div>
  );
};
