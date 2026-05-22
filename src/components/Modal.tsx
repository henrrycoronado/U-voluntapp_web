import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className={`bg-[#18181b] border border-zinc-800/80 rounded-2xl w-full ${maxWidth} shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-800/80">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors bg-zinc-900 hover:bg-zinc-800 p-1 rounded-md"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar">{children}</div>
      </div>
    </div>
  );
};
