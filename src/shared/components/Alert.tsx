export const Alert = ({ children, variant = 'success', className = '' }: any) => {
  const variants: any = {
    success: "bg-[#062c14] border border-[#166534] text-[#4ade80]",
    error: "bg-red-950 border border-red-900 text-red-400",
  };

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};
