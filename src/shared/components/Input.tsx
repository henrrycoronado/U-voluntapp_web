export const Input = ({ label, className = '', ...props }: any) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && <label className="text-xs text-zinc-400">{label}</label>}
      <input
        className="bg-zinc-900/50 border border-zinc-800 rounded-md p-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors"
        {...props}
      />
    </div>
  );
};
