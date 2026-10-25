import React, { useState } from 'react';
import { Plus, X, Layers } from 'lucide-react';
import { TechItem, TechCategory } from '../types/project';
import {
  PREDEFINED_TECHNOLOGIES,
  CATEGORY_LABELS,
  createCustomTech,
  findPredefinedTech,
} from '../lib/technologies';

interface TechStackSelectorProps {
  selectedTechs: TechItem[];
  onChange: (techs: TechItem[]) => void;
  badgeStyle: 'flat' | 'flat-square' | 'for-the-badge';
  onBadgeStyleChange: (style: 'flat' | 'flat-square' | 'for-the-badge') => void;
}

export const TechStackSelector: React.FC<TechStackSelectorProps> = ({
  selectedTechs,
  onChange,
  badgeStyle,
  onBadgeStyleChange,
}) => {
  const [activeCategory, setActiveCategory] = useState<TechCategory | 'all'>('all');
  const [customInput, setCustomInput] = useState('');

  const isSelected = (techName: string) => {
    return selectedTechs.some((t) => t.name.toLowerCase() === techName.toLowerCase());
  };

  const handleTogglePredefined = (techName: string) => {
    if (isSelected(techName)) {
      onChange(selectedTechs.filter((t) => t.name.toLowerCase() !== techName.toLowerCase()));
    } else {
      const match = findPredefinedTech(techName);
      if (match) {
        onChange([...selectedTechs, match]);
      }
    }
  };

  const handleAddCustom = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = customInput.trim();
    if (!clean) return;

    if (isSelected(clean)) {
      setCustomInput('');
      return;
    }

    const predefinedMatch = findPredefinedTech(clean);
    if (predefinedMatch) {
      onChange([...selectedTechs, predefinedMatch]);
    } else {
      onChange([...selectedTechs, createCustomTech(clean)]);
    }
    setCustomInput('');
  };

  const handleRemove = (id: string) => {
    onChange(selectedTechs.filter((t) => t.id !== id));
  };

  const categories: (TechCategory | 'all')[] = [
    'all',
    'frontend',
    'backend',
    'languages',
    'database',
    'other',
  ];

  const filteredPredefined = PREDEFINED_TECHNOLOGIES.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  return (
    <div className="space-y-4">
      {/* Header & Badge Style */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-borderDark">
        <label className="text-sm font-semibold text-slate-800 dark:text-lightText flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-indigo-500" />
          Technology Stack
          <span className="text-xs font-normal text-slate-500 dark:text-mutedText">
            ({selectedTechs.length} selected)
          </span>
        </label>

        {/* Badge Style Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500 dark:text-mutedText">Badge Style:</span>
          <select
            value={badgeStyle}
            onChange={(e) => onBadgeStyleChange(e.target.value as any)}
            className="text-xs bg-slate-100 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-800 dark:text-lightText rounded px-2 py-1 outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="flat-square">Flat Square (Modern)</option>
            <option value="flat">Flat (Rounded)</option>
            <option value="for-the-badge">For The Badge (Bold)</option>
          </select>
        </div>
      </div>

      {/* Selected Tech Chips List */}
      <div>
        {selectedTechs.length === 0 ? (
          <div className="p-3 text-xs text-slate-500 dark:text-mutedText bg-slate-50 dark:bg-surfaceDark/60 rounded-lg border border-dashed border-slate-200 dark:border-borderDark text-center">
            No technologies selected. Click the chips below or type a custom one.
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 dark:bg-surfaceDark/60 rounded-lg border border-slate-200 dark:border-borderDark">
            {selectedTechs.map((tech) => (
              <span
                key={tech.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/60"
              >
                <span>{tech.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(tech.id)}
                  aria-label={`Remove ${tech.name}`}
                  className="text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Custom Tech Input */}
      <form onSubmit={handleAddCustom} className="flex gap-2">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Add custom technology (e.g. Prisma, Tailwind UI, Redis)..."
          className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={!customInput.trim()}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </form>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              activeCategory === cat
                ? 'bg-slate-900 dark:bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-surfaceDark text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Predefined Tech Chips */}
      <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
        {filteredPredefined.map((tech) => {
          const selected = isSelected(tech.name);
          return (
            <button
              key={tech.name}
              type="button"
              onClick={() => handleTogglePredefined(tech.name)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                selected
                  ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-500'
                  : 'bg-white dark:bg-surfaceDark text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-borderDark hover:border-indigo-400 dark:hover:border-indigo-500'
              }`}
            >
              <span>{tech.name}</span>
              {selected ? <X className="w-3 h-3 ml-0.5" /> : <Plus className="w-3 h-3 ml-0.5 opacity-60" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
