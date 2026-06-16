import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'disabled';
}

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyle =
    'w-full rounded-md py-2.5 px-4 font-semibold transition-colors text-sm flex items-center justify-center gap-2';
  const variants = {
    primary: 'bg-yellow-500 text-black hover:bg-yellow-400',
    outline: 'border border-zinc-800 text-white hover:bg-zinc-800',
    disabled: 'bg-zinc-900 text-zinc-500 cursor-not-allowed border border-zinc-800',
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
