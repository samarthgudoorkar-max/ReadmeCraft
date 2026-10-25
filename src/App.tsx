import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { EditorPanel } from './components/EditorPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { GitHubImportModal } from './components/GitHubImportModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { Toast, ToastMessage } from './components/Toast';
import { ProjectState, TemplateType, GitHubRepoMetadata, TechItem } from './types/project';
import { SAMPLE_PROJECT, INITIAL_EMPTY_PROJECT } from './constants/sampleProject';
import { generateMarkdown } from './lib/generateMarkdown';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Edit3, Eye } from 'lucide-react';

export const App: React.FC = () => {
  // Theme state: dark mode is default per design specification
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('readmecraft_theme', 'dark');

  // Synchronize document theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Project state stored in localStorage; defaults to realistic TaskFlow sample
  const [projectState, setProjectState] = useLocalStorage<ProjectState>(
    'readmecraft_draft_v1',
    SAMPLE_PROJECT
  );

  // Modals and Toasts
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Mobile layout tab: 'editor' | 'preview'
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({
      id: `toast-${Date.now()}`,
      message,
      type,
    });
  };

  // Generate markdown in real time
  const generatedMarkdown = useMemo(() => {
    return generateMarkdown(projectState);
  }, [projectState]);

  // Template switch handler
  const handleSelectTemplate = (template: TemplateType) => {
    setProjectState((prev) => ({
      ...prev,
      template,
    }));
    showToast(`Switched to "${template.toUpperCase()}" template`, 'info');
  };

  // Load Sample Project
  const handleLoadSample = () => {
    setProjectState(SAMPLE_PROJECT);
    showToast('Loaded "TaskFlow" sample project', 'success');
  };

  // Reset Project
  const handleResetConfirm = () => {
    setProjectState(INITIAL_EMPTY_PROJECT);
    showToast('Draft has been reset', 'info');
  };

  // GitHub Import Apply handler
  const handleApplyGitHubData = ({
    metadata,
    suggestedTechs,
    applyFields,
  }: {
    metadata: GitHubRepoMetadata;
    suggestedTechs: TechItem[];
    applyFields: {
      name: boolean;
      description: boolean;
      githubUrl: boolean;
      demoUrl: boolean;
      license: boolean;
      technologies: boolean;
    };
  }) => {
    setProjectState((prev) => {
      const next = { ...prev };

      if (applyFields.name && metadata.name) {
        // Convert kebab-case / snake_case into readable Title Case if appropriate
        const formattedName = metadata.name
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
        next.projectName = formattedName;
      }

      if (applyFields.description && metadata.description) {
        next.shortDescription = metadata.description;
        next.detailedDescription = metadata.description;
      }

      if (applyFields.githubUrl && metadata.html_url) {
        next.githubUrl = metadata.html_url;
      }

      if (applyFields.demoUrl && metadata.homepage) {
        next.demoUrl = metadata.homepage;
      }

      if (metadata.owner?.login) {
        next.authorGithub = metadata.owner.login;
        if (!next.authorName) {
          next.authorName = metadata.owner.login;
        }
      }

      if (applyFields.license && metadata.license) {
        next.sections.license.enabled = true;
        next.sections.license.type = metadata.license.spdx_id || metadata.license.name;
      }

      if (applyFields.technologies && suggestedTechs.length > 0) {
        // Merge without duplicates
        const existingNames = new Set(next.technologies.map((t) => t.name.toLowerCase()));
        const newTechs = suggestedTechs.filter(
          (t) => !existingNames.has(t.name.toLowerCase())
        );
        next.technologies = [...next.technologies, ...newTechs];
      }

      // Pre-fill sensible clone command if empty
      if (metadata.html_url) {
        next.installation.cloneCommand = `git clone ${metadata.html_url}.git\ncd ${metadata.name}`;
      }

      return next;
    });

    showToast(`Successfully imported ${metadata.name} repository!`, 'success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-lightBg dark:bg-darkBg text-slate-800 dark:text-lightText transition-colors">
      {/* Top Navigation */}
      <Navbar
        darkMode={theme === 'dark'}
        onToggleDarkMode={toggleDarkMode}
        selectedTemplate={projectState.template}
        onSelectTemplate={handleSelectTemplate}
        onLoadSample={handleLoadSample}
        onOpenGitHubImport={() => setIsGitHubModalOpen(true)}
      />

      {/* Mobile Tab Toggle Bar (visible only on mobile) */}
      <div className="lg:hidden flex items-center justify-around border-b border-slate-200 dark:border-borderDark bg-white dark:bg-surfaceDark p-2 sticky top-16 z-30">
        <button
          type="button"
          onClick={() => setMobileTab('editor')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            mobileTab === 'editor'
              ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Details</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            mobileTab === 'preview'
              ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main Workspace (Two-column layout on desktop) */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Column: Editor */}
        <div
          className={`w-full lg:w-1/2 h-[calc(100vh-4rem)] overflow-hidden ${
            mobileTab === 'editor' ? 'block' : 'hidden lg:block'
          }`}
        >
          <EditorPanel
            state={projectState}
            onChange={setProjectState}
            onReset={() => setIsResetModalOpen(true)}
            onLoadSample={handleLoadSample}
          />
        </div>

        {/* Right Column: Live Preview */}
        <div
          className={`w-full lg:w-1/2 h-[calc(100vh-4rem)] overflow-hidden ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          <PreviewPanel
            markdown={generatedMarkdown}
            projectName={projectState.projectName}
          />
        </div>
      </main>

      {/* GitHub Repository Import Modal */}
      <GitHubImportModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        onApply={handleApplyGitHubData}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetConfirm}
      />

      {/* Notification Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default App;
