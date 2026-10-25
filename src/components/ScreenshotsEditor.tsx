import React, { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { ScreenshotItem } from '../types/project';

interface ScreenshotsEditorProps {
  screenshots: ScreenshotItem[];
  onChange: (items: ScreenshotItem[]) => void;
}

export const ScreenshotsEditor: React.FC<ScreenshotsEditorProps> = ({ screenshots, onChange }) => {
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;

    const newItem: ScreenshotItem = {
      id: `sc-${Date.now()}`,
      url: url.trim(),
      caption: caption.trim() || 'Project Screenshot',
    };

    onChange([...screenshots, newItem]);
    setUrl('');
    setCaption('');
  };

  const handleRemove = (id: string) => {
    onChange(screenshots.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-3">
      {/* Add Screenshot Form */}
      <form onSubmit={handleAdd} className="space-y-2 p-3 bg-slate-50 dark:bg-surfaceDark/50 rounded-lg border border-slate-200 dark:border-borderDark">
        <div className="text-xs font-medium text-slate-700 dark:text-slate-300">Add New Screenshot / Demo GIF</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Image URL (e.g. https://.../preview.png)"
            className="px-3 py-1.5 text-xs rounded-md bg-white dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption (e.g. App Dashboard)"
            className="px-3 py-1.5 text-xs rounded-md bg-white dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!url.trim()}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Screenshot</span>
          </button>
        </div>
      </form>

      {/* Existing Screenshots List */}
      <div className="space-y-2">
        {screenshots.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-mutedText italic text-center py-2">
            No screenshots added yet. Provide an image or diagram link above.
          </p>
        ) : (
          screenshots.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-surfaceDark/70 border border-slate-200 dark:border-borderDark"
            >
              <div className="w-12 h-10 bg-slate-200 dark:bg-slate-800 rounded overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback on broken image
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <ImageIcon className="w-4 h-4 text-slate-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                  {item.caption || 'Screenshot'}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-mutedText truncate font-mono">
                  {item.url}
                </div>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Open image in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                className="p-1 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400"
                aria-label="Remove screenshot"
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
