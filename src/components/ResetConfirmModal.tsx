import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-darkBg rounded-2xl border border-slate-200 dark:border-borderDark shadow-2xl overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-lightText">
                Reset Project Draft?
              </h3>
              <p className="text-xs text-slate-500 dark:text-mutedText">
                This action will clear all current inputs.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Are you sure you want to reset all fields to a blank project? Any unsaved edits or custom sections will be removed from your local storage.
          </p>

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surfaceDark transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-1.5 text-xs font-medium rounded-lg text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm"
            >
              Yes, Reset Everything
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
