import React from 'react';
import { Button } from '../../../core/components/atoms/Button';
import { useReviewEnrollment } from '../hooks';
import type { EnrollmentDto } from '../types';

export const EnrollmentReviewCard: React.FC<{ enrollment: EnrollmentDto }> = ({ enrollment }) => {
  const review = useReviewEnrollment();
  return (
    <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg">
      <div>
        <p className="text-white font-medium">Perfil: {enrollment.profileCode}</p>
        <p className="text-sm text-zinc-400">Actividad: {enrollment.activityCode}</p>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="primary" onClick={() => review.mutate({ uvaCode: enrollment.uvaCode, data: { approved: true } })}>Aprobar</Button>
        <Button size="sm" variant="danger" onClick={() => review.mutate({ uvaCode: enrollment.uvaCode, data: { approved: false } })}>Rechazar</Button>
      </div>
    </div>
  );
};