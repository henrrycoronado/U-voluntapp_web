type Status = 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'completed';

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      bg: 'bg-brand-green/10 dark:bg-brand-green/20',
      text: 'text-brand-green',
      label: 'Activo',
    },
    inactive: {
      bg: 'bg-gray-100 dark:bg-gray-700',
      text: 'text-gray-600 dark:text-gray-400',
      label: 'Inactivo',
    },
    pending: {
      bg: 'bg-brand-yellow/10 dark:bg-brand-yellow/20',
      text: 'text-brand-yellow',
      label: 'Pendiente',
    },
    approved: {
      bg: 'bg-brand-green/10 dark:bg-brand-green/20',
      text: 'text-brand-green',
      label: 'Aprobado',
    },
    rejected: {
      bg: 'bg-brand-red/10 dark:bg-brand-red/20',
      text: 'text-brand-red',
      label: 'Rechazado',
    },
    completed: {
      bg: 'bg-brand-blue/10 dark:bg-brand-blue/20',
      text: 'text-brand-blue',
      label: 'Completado',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}
    >
      {label || config.label}
    </span>
  );
}
