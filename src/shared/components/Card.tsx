export const Card = ({ children, className = '' }: any) => {
  return (
    <div className={`bg-[#18181b] border border-zinc-800/80 rounded-xl ${className}`}>
      {children}
    </div>
  );
};
