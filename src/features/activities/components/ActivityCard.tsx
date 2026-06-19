import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ActivityDto } from '../types';
import { Button } from '../../../core/components/atoms/Button';
import ProfileActivity from '../../../core/assets/ProfileActivity.svg';
import { getFullImageUrl } from '../../../core/utils/imageUtils';

export const ActivityCard: React.FC<{ activity: ActivityDto }> = ({ activity }) => {
  const navigate = useNavigate();
  const isDefaultImage =
    !activity.photoUrl ||
    activity.photoUrl.toLowerCase().includes('default') ||
    activity.photoUrl.toLowerCase().includes('deault');
  const imageSrc = isDefaultImage ? ProfileActivity : getFullImageUrl(activity.photoUrl);

  return (
    <div className="flex flex-col overflow-hidden bg-zinc-900/50 border border-white/5 rounded-xl hover:border-yellow-500/30 transition-colors group">
      <div
        className="h-28 w-full overflow-hidden bg-zinc-950 border-b border-white/5 relative cursor-pointer"
        onClick={() => navigate(`/activities/${activity.uvaCode}`)}
      >
        <img
          src={imageSrc}
          alt={activity.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h4
          className="text-md font-semibold text-white mb-1 cursor-pointer hover:text-yellow-500"
          onClick={() => navigate(`/activities/${activity.uvaCode}`)}
        >
          {activity.name}
        </h4>
        <p className="text-sm text-zinc-400 mb-3 line-clamp-2">{activity.description}</p>
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-white/10">
          <span className="text-xs text-zinc-500">
            {new Date(activity.startDate).toLocaleDateString()}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/activities/${activity.uvaCode}`)}
          >
            Ver Detalles
          </Button>
        </div>
      </div>
    </div>
  );
};
