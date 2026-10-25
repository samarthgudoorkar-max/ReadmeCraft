import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    error: <AlertCircle className="w-4 h-4 text-rose-500" />,
    info: <Info className="w-4 h-4 text-indigo-500" />,
  };

  const bgStyles = {
    success: 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200',
    error: 'bg-rose-50 dark:bg-rose-950/80 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200',
    info: 'bg-slate-900 dark:bg-surfaceDark text-white border-slate-700',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border shadow-lg text-xs font-medium animate-slide-up backdrop-blur-md">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${bgStyles[toast.type]}`}>
        {icons[toast.type]}
        <span>{toast.message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
