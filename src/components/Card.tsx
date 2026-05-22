import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className = '', onClick }: CardProps) => {
  return (
    <div
      className={`bg-[#18181b] border border-zinc-800/80 rounded-xl ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
