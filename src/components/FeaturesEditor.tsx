import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, CheckSquare } from 'lucide-react';

interface FeaturesEditorProps {
  features: string[];
  onChange: (features: string[]) => void;
}

export const FeaturesEditor: React.FC<FeaturesEditorProps> = ({ features, onChange }) => {
  const [newFeatureText, setNewFeatureText] = useState('');

  const handleAddFeature = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = newFeatureText.trim();
    if (!clean) return;
    onChange([...features, clean]);
    setNewFeatureText('');
  };

  const handleUpdateFeature = (index: number, text: string) => {
    const updated = [...features];
    updated[index] = text;
    onChange(updated);
  };

  const handleRemoveFeature = (index: number) => {
    onChange(features.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...features];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onChange(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === features.length - 1) return;
    const updated = [...features];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-borderDark">
        <label className="text-sm font-semibold text-slate-800 dark:text-lightText flex items-center gap-1.5">
          <CheckSquare className="w-4 h-4 text-indigo-500" />
          Project Features
          <span className="text-xs font-normal text-slate-500 dark:text-mutedText">
            ({features.length} listed)
          </span>
        </label>
      </div>

      {/* Add Feature Form */}
      <form onSubmit={handleAddFeature} className="flex gap-2">
        <input
          type="text"
          value={newFeatureText}
          onChange={(e) => setNewFeatureText(e.target.value)}
          placeholder="e.g. Real-time collaboration with WebSockets..."
          className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={!newFeatureText.trim()}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </form>

      {/* Features List */}
      <div className="space-y-2">
        {features.length === 0 ? (
          <div className="p-4 text-xs text-slate-500 dark:text-mutedText bg-slate-50 dark:bg-surfaceDark/60 rounded-lg border border-dashed border-slate-200 dark:border-borderDark text-center">
            No features added yet. Type your key features above and press Enter.
          </div>
        ) : (
          features.map((feature, index) => (
            <div
              key={index}
              className="group flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 dark:bg-surfaceDark/60 border border-slate-200 dark:border-borderDark hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
            >
              <div className="flex flex-col text-slate-400 dark:text-slate-500">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-0.5 hover:text-indigo-500 disabled:opacity-20 disabled:hover:text-slate-400"
                  aria-label="Move feature up"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === features.length - 1}
                  className="p-0.5 hover:text-indigo-500 disabled:opacity-20 disabled:hover:text-slate-400"
                  aria-label="Move feature down"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>

              <span className="text-xs font-mono text-slate-400 dark:text-slate-500 w-4 text-right">
                {index + 1}.
              </span>

              <input
                type="text"
                value={feature}
                onChange={(e) => handleUpdateFeature(index, e.target.value)}
                className="flex-1 px-2 py-1 text-xs bg-transparent border-none text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded"
              />

              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="p-1 text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 transition-colors"
                aria-label="Remove feature"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
