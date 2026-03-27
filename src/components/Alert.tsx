interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export default function Alert({ type, message }: AlertProps) {
  const bgColor = {
    success: 'bg-brand-green/10 dark:bg-brand-green/20 border-brand-green',
    error: 'bg-brand-red/10 dark:bg-brand-red/20 border-brand-red',
    warning: 'bg-brand-yellow/10 dark:bg-brand-yellow/20 border-brand-yellow',
    info: 'bg-brand-blue/10 dark:bg-brand-blue/20 border-brand-blue',
  };

  const textColor = {
    success: 'text-brand-green dark:text-brand-green',
    error: 'text-brand-red dark:text-brand-red',
    warning: 'text-brand-yellow dark:text-brand-yellow',
    info: 'text-brand-blue dark:text-brand-blue',
  };

  return (
    <div className={`border ${bgColor[type]} rounded-lg p-4 mb-4`}>
      <p className={`${textColor[type]} text-sm font-medium`}>{message}</p>
    </div>
  );
}
