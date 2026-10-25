import React, { useState } from 'react';
import {
  FileText,
  Layers,
  CheckSquare,
  Terminal,
  Code,
  Image as ImageIcon,
  Settings,
  ChevronDown,
  RotateCcw,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { ProjectState } from '../types/project';
import { TechStackSelector } from './TechStackSelector';
import { FeaturesEditor } from './FeaturesEditor';
import { ScreenshotsEditor } from './ScreenshotsEditor';
import { OptionalSections } from './OptionalSections';

interface EditorPanelProps {
  state: ProjectState;
  onChange: (updater: (prev: ProjectState) => ProjectState) => void;
  onReset: () => void;
  onLoadSample: () => void;
}

type TabSection = 'basic' | 'tech' | 'features' | 'install' | 'usage' | 'screenshots' | 'optional';

export const EditorPanel: React.FC<EditorPanelProps> = ({
  state,
  onChange,
  onReset,
  onLoadSample,
}) => {
  const [openSections, setOpenSections] = useState<Record<TabSection, boolean>>({
    basic: true,
    tech: true,
    features: true,
    install: false,
    usage: false,
    screenshots: false,
    optional: false,
  });

  const toggleSection = (section: TabSection) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateField = <K extends keyof ProjectState>(key: K, value: ProjectState[K]) => {
    onChange((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-darkBg border-r border-slate-200 dark:border-borderDark overflow-hidden">
      {/* Panel Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-borderDark flex items-center justify-between bg-white dark:bg-darkBg sticky top-0 z-10">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-lightText">
            README Editor
          </h2>
          <p className="text-xs text-slate-500 dark:text-mutedText">
            Configure your project documentation details
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Auto-saved</span>
        </div>
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
        
        {/* 1. Basic Information */}
        <div className="rounded-xl border border-slate-200 dark:border-borderDark overflow-hidden bg-white dark:bg-surfaceDark/30">
          <button
            type="button"
            onClick={() => toggleSection('basic')}
            className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-surfaceDark/60 hover:bg-slate-100 dark:hover:bg-surfaceDark/80 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-semibold text-slate-800 dark:text-lightText">
                Basic Project Information
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                openSections.basic ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.basic && (
            <div className="p-4 space-y-3.5 border-t border-slate-200 dark:border-borderDark">
              {/* Project Name */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Project Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={state.projectName}
                  onChange={(e) => updateField('projectName', e.target.value)}
                  placeholder="e.g. ReadmeCraft"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Short Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  value={state.shortDescription}
                  onChange={(e) => updateField('shortDescription', e.target.value)}
                  placeholder="e.g. Beautiful GitHub READMEs, without the hassle."
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Detailed Description & Overview
                </label>
                <textarea
                  rows={3}
                  value={state.detailedDescription}
                  onChange={(e) => updateField('detailedDescription', e.target.value)}
                  placeholder="Provide an overview of what the application solves, the target audience, and key value propositions..."
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Repository & Demo URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    value={state.githubUrl}
                    onChange={(e) => updateField('githubUrl', e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Live Demo / Website URL
                  </label>
                  <input
                    type="url"
                    value={state.demoUrl}
                    onChange={(e) => updateField('demoUrl', e.target.value)}
                    placeholder="https://my-app.vercel.app"
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={state.authorName}
                    onChange={(e) => updateField('authorName', e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Author GitHub Username
                  </label>
                  <input
                    type="text"
                    value={state.authorGithub}
                    onChange={(e) => updateField('authorGithub', e.target.value)}
                    placeholder="e.g. janedoe"
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Include Badges Toggle */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Include GitHub badges (Stars, Forks, Issues, License)
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.includeBadges}
                    onChange={(e) => updateField('includeBadges', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* 2. Technology Stack */}
        <div className="rounded-xl border border-slate-200 dark:border-borderDark overflow-hidden bg-white dark:bg-surfaceDark/30">
          <button
            type="button"
            onClick={() => toggleSection('tech')}
            className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-surfaceDark/60 hover:bg-slate-100 dark:hover:bg-surfaceDark/80 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-semibold text-slate-800 dark:text-lightText">
                Technologies & Badges
              </span>
              <span className="text-xs text-slate-400 dark:text-mutedText">
                ({state.technologies.length})
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                openSections.tech ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.tech && (
            <div className="p-4 border-t border-slate-200 dark:border-borderDark">
              <TechStackSelector
                selectedTechs={state.technologies}
                onChange={(techs) => updateField('technologies', techs)}
                badgeStyle={state.badgeStyle}
                onBadgeStyleChange={(style) => updateField('badgeStyle', style)}
              />
            </div>
          )}
        </div>

        {/* 3. Features Editor */}
        <div className="rounded-xl border border-slate-200 dark:border-borderDark overflow-hidden bg-white dark:bg-surfaceDark/30">
          <button
            type="button"
            onClick={() => toggleSection('features')}
            className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-surfaceDark/60 hover:bg-slate-100 dark:hover:bg-surfaceDark/80 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <CheckSquare className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-semibold text-slate-800 dark:text-lightText">
                Key Features
              </span>
              <span className="text-xs text-slate-400 dark:text-mutedText">
                ({state.features.length})
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                openSections.features ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.features && (
            <div className="p-4 border-t border-slate-200 dark:border-borderDark">
              <FeaturesEditor
                features={state.features}
                onChange={(features) => updateField('features', features)}
              />
            </div>
          )}
        </div>

        {/* 4. Installation & Getting Started */}
        <div className="rounded-xl border border-slate-200 dark:border-borderDark overflow-hidden bg-white dark:bg-surfaceDark/30">
          <button
            type="button"
            onClick={() => toggleSection('install')}
            className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-surfaceDark/60 hover:bg-slate-100 dark:hover:bg-surfaceDark/80 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-semibold text-slate-800 dark:text-lightText">
                Installation & Setup
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                openSections.install ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.install && (
            <div className="p-4 space-y-3.5 border-t border-slate-200 dark:border-borderDark">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Prerequisites
                </label>
                <textarea
                  rows={2}
                  value={state.installation.prerequisites}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      installation: { ...prev.installation, prerequisites: e.target.value },
                    }))
                  }
                  placeholder="e.g. Node.js 18.0+, npm / pnpm / yarn"
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Clone Command
                </label>
                <input
                  type="text"
                  value={state.installation.cloneCommand}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      installation: { ...prev.installation, cloneCommand: e.target.value },
                    }))
                  }
                  placeholder="git clone https://github.com/... && cd ..."
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Install Command
                </label>
                <input
                  type="text"
                  value={state.installation.installCommand}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      installation: { ...prev.installation, installCommand: e.target.value },
                    }))
                  }
                  placeholder="npm install"
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Environment Setup (optional)
                </label>
                <input
                  type="text"
                  value={state.installation.envSetup}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      installation: { ...prev.installation, envSetup: e.target.value },
                    }))
                  }
                  placeholder="cp .env.example .env"
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Start Development Server Command
                </label>
                <input
                  type="text"
                  value={state.installation.devCommand}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      installation: { ...prev.installation, devCommand: e.target.value },
                    }))
                  }
                  placeholder="npm run dev"
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* 5. Usage & Examples */}
        <div className="rounded-xl border border-slate-200 dark:border-borderDark overflow-hidden bg-white dark:bg-surfaceDark/30">
          <button
            type="button"
            onClick={() => toggleSection('usage')}
            className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-surfaceDark/60 hover:bg-slate-100 dark:hover:bg-surfaceDark/80 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <Code className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-semibold text-slate-800 dark:text-lightText">
                Usage & Code Examples
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                openSections.usage ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.usage && (
            <div className="p-4 space-y-3.5 border-t border-slate-200 dark:border-borderDark">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Usage Instructions
                </label>
                <textarea
                  rows={3}
                  value={state.usage.instructions}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      usage: { ...prev.usage, instructions: e.target.value },
                    }))
                  }
                  placeholder="Describe how to use the project, navigate features, or run key workflows..."
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Optional Code Snippet / CLI Example
                  </label>
                  <select
                    value={state.usage.codeLanguage}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        usage: { ...prev.usage, codeLanguage: e.target.value },
                      }))
                    }
                    className="text-[11px] bg-slate-100 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-800 dark:text-lightText rounded px-1.5 py-0.5"
                  >
                    <option value="bash">bash</option>
                    <option value="typescript">typescript</option>
                    <option value="javascript">javascript</option>
                    <option value="python">python</option>
                    <option value="json">json</option>
                    <option value="yaml">yaml</option>
                  </select>
                </div>
                <textarea
                  rows={4}
                  value={state.usage.codeExample}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      usage: { ...prev.usage, codeExample: e.target.value },
                    }))
                  }
                  placeholder="# Run production build&#10;npm run build"
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* 6. Screenshots & Media */}
        <div className="rounded-xl border border-slate-200 dark:border-borderDark overflow-hidden bg-white dark:bg-surfaceDark/30">
          <button
            type="button"
            onClick={() => toggleSection('screenshots')}
            className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-surfaceDark/60 hover:bg-slate-100 dark:hover:bg-surfaceDark/80 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <ImageIcon className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-semibold text-slate-800 dark:text-lightText">
                Screenshots & Media
              </span>
              <span className="text-xs text-slate-400 dark:text-mutedText">
                ({state.sections.screenshots.items.length})
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                openSections.screenshots ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.screenshots && (
            <div className="p-4 border-t border-slate-200 dark:border-borderDark space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Enable Screenshots section in README
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.sections.screenshots.enabled}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          screenshots: {
                            ...prev.sections.screenshots,
                            enabled: e.target.checked,
                          },
                        },
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {state.sections.screenshots.enabled && (
                <ScreenshotsEditor
                  screenshots={state.sections.screenshots.items}
                  onChange={(items) =>
                    onChange((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        screenshots: {
                          ...prev.sections.screenshots,
                          items,
                        },
                      },
                    }))
                  }
                />
              )}
            </div>
          )}
        </div>

        {/* 7. Optional Sections (Structure, Contributing, License, Contact, Roadmap) */}
        <div className="rounded-xl border border-slate-200 dark:border-borderDark overflow-hidden bg-white dark:bg-surfaceDark/30">
          <button
            type="button"
            onClick={() => toggleSection('optional')}
            className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-surfaceDark/60 hover:bg-slate-100 dark:hover:bg-surfaceDark/80 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-semibold text-slate-800 dark:text-lightText">
                Additional Sections & Metadata
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                openSections.optional ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.optional && (
            <div className="p-4 border-t border-slate-200 dark:border-borderDark">
              <OptionalSections state={state} onChange={onChange} />
            </div>
          )}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="px-6 py-3 border-t border-slate-200 dark:border-borderDark bg-slate-50 dark:bg-surfaceDark/40 flex items-center justify-between">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors border border-transparent hover:border-rose-200 dark:hover:border-rose-900"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Draft</span>
        </button>

        <button
          type="button"
          onClick={onLoadSample}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Load TaskFlow Sample</span>
        </button>
      </div>
    </div>
  );
};
