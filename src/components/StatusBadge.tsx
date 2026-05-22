interface StatusBadgeProps {
  text: string;
  type?: 'default' | 'warning';
}

export const StatusBadge = ({ text, type = 'default' }: StatusBadgeProps) => {
  const styles = {
    default: 'border-zinc-700 text-zinc-300',
    warning: 'border-yellow-600/50 text-yellow-500 bg-yellow-500/10',
  };

  return (
    <span
      className={`text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full border w-fit ${styles[type]}`}
    >
      {text}
    </span>
  );
};
