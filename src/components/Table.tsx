import React from 'react';

export const Table = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`w-full overflow-x-auto rounded-xl border border-zinc-800/80 bg-[#121214] ${className}`}
  >
    <table className="w-full text-left text-sm text-zinc-300 whitespace-nowrap">{children}</table>
  </div>
);

export const Thead = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-[#18181b] text-xs uppercase text-zinc-500 border-b border-zinc-800/80">
    {children}
  </thead>
);

export const Tbody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-zinc-800/80">{children}</tbody>
);

export const Tr = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <tr className={`hover:bg-[#18181b]/50 transition-colors ${className}`}>{children}</tr>;

export const Th = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <th className={`px-6 py-4 font-semibold tracking-wider ${className}`}>{children}</th>;

export const Td = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <td className={`px-6 py-4 ${className}`}>{children}</td>;
