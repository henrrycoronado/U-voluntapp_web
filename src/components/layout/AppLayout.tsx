import React from 'react';
import { Sidebar } from '../../shared/components/Sidebar';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className="flex h-screen w-full bg-[#0a0a0b] overflow-hidden font-sans text-white">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto custom-scrollbar relative">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
