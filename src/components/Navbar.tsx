import React from 'react';
import { Sparkles, Sun, Moon, Layers } from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons';
import { TemplateType } from '../types/project';
import { TEMPLATES } from '../lib/templates';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  selectedTemplate: TemplateType;
  onSelectTemplate: (template: TemplateType) => void;
  onLoadSample: () => void;
  onOpenGitHubImport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  selectedTemplate,
  onSelectTemplate,
  onLoadSample,
  onOpenGitHubImport,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-borderDark bg-white/95 dark:bg-darkBg/95 backdrop-blur-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm ring-1 ring-indigo-500/20">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
              <path d="M8 13h2"/>
              <path d="M8 17h8"/>
              <path d="M14 13h2"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg tracking-tight text-slate-900 dark:text-lightText">
                ReadmeCraft
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-mutedText hidden sm:block">
              Beautiful GitHub READMEs, without the hassle.
            </p>
          </div>
        </div>

        {/* Center: Template Switcher */}
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-surfaceDark p-1 rounded-lg border border-slate-200 dark:border-borderDark">
          <Layers className="w-3.5 h-3.5 ml-2 text-slate-400 dark:text-mutedText" />
          <span className="text-xs font-medium text-slate-500 dark:text-mutedText ml-1.5 mr-2">Template:</span>
          {(Object.keys(TEMPLATES) as TemplateType[]).map((tKey) => {
            const isSelected = selectedTemplate === tKey;
            return (
              <button
                key={tKey}
                onClick={() => onSelectTemplate(tKey)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={TEMPLATES[tKey].description}
              >
                {TEMPLATES[tKey].name}
              </button>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          {/* Load Sample Button */}
          <button
            onClick={onLoadSample}
            type="button"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-surfaceDark dark:hover:bg-slate-700 border border-slate-200 dark:border-borderDark transition-colors"
            title="Load the TaskFlow sample project"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">Load Sample</span>
          </button>

          {/* Import GitHub Repo Button */}
          <button
            onClick={onOpenGitHubImport}
            type="button"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-surfaceDark dark:hover:bg-slate-700 border border-slate-200 dark:border-borderDark transition-colors"
            title="Import metadata from a public GitHub repository"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Import GitHub</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            type="button"
            aria-label="Toggle color theme"
            className="p-2 text-slate-500 dark:text-mutedText hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-surfaceDark transition-colors"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* External GitHub link */}
          <a
            href="https://github.com/samarthgudoorkar-max/ReadmeCraft"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className="p-2 text-slate-500 dark:text-mutedText hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-surfaceDark transition-colors"
            title="View ReadmeCraft repository on GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Mobile Template Selector Strip */}
      <div className="md:hidden px-4 py-2 border-t border-slate-200 dark:border-borderDark flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
        <span className="text-xs font-medium text-slate-500 dark:text-mutedText">Template:</span>
        <div className="flex space-x-1">
          {(Object.keys(TEMPLATES) as TemplateType[]).map((tKey) => {
            const isSelected = selectedTemplate === tKey;
            return (
              <button
                key={tKey}
                onClick={() => onSelectTemplate(tKey)}
                className={`px-2 py-1 text-xs font-medium rounded ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {TEMPLATES[tKey].name}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
