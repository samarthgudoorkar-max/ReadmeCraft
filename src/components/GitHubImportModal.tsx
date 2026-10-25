import React, { useState } from 'react';
import {
  X,
  Search,
  Loader2,
  CheckCircle,
  AlertCircle,
  Star,
  GitFork,
} from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons';
import { fetchGitHubRepoData, GitHubImportResult } from '../lib/github';
import { GitHubRepoMetadata, TechItem } from '../types/project';

interface GitHubImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: {
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
  }) => void;
}

export const GitHubImportModal: React.FC<GitHubImportModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [repoInput, setRepoInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importResult, setImportResult] = useState<GitHubImportResult | null>(null);

  // Field selection toggles
  const [selectedFields, setSelectedFields] = useState({
    name: true,
    description: true,
    githubUrl: true,
    demoUrl: true,
    license: true,
    technologies: true,
  });

  if (!isOpen) return null;

  const handleFetch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!repoInput.trim()) return;

    setLoading(true);
    setError(null);
    setImportResult(null);

    const result = await fetchGitHubRepoData(repoInput);
    setLoading(false);

    if (!result.success || !result.data) {
      setError(result.error || 'Failed to fetch repository details.');
    } else {
      setImportResult(result);
    }
  };

  const handleApply = () => {
    if (!importResult?.data) return;
    onApply({
      metadata: importResult.data,
      suggestedTechs: importResult.suggestedTechs || [],
      applyFields: selectedFields,
    });
    onClose();
    // reset state
    setImportResult(null);
    setRepoInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-darkBg rounded-2xl border border-slate-200 dark:border-borderDark shadow-2xl overflow-hidden transition-all">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-borderDark flex items-center justify-between bg-slate-50 dark:bg-surfaceDark/50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <GithubIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-lightText">
                Import Public GitHub Repository
              </h3>
              <p className="text-xs text-slate-500 dark:text-mutedText">
                Fetch repository metadata via public GitHub REST API
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-surfaceDark transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Input Form */}
          <form onSubmit={handleFetch} className="space-y-2">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              GitHub Repository URL or Slug
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                placeholder="https://github.com/facebook/react or owner/repo"
                className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surfaceDark border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={loading || !repoInput.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Fetching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>Fetch</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-mutedText">
              Example: <code className="bg-slate-100 dark:bg-surfaceDark px-1 py-0.5 rounded">samarthgudoorkar-max/campus-portal</code>
            </p>
          </form>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Fetched Data Preview */}
          {importResult?.data && (
            <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-borderDark">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-surfaceDark/70 border border-slate-200 dark:border-borderDark space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={importResult.data.owner.avatar_url}
                      alt={importResult.data.owner.login}
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="text-xs font-semibold text-slate-900 dark:text-lightText">
                      {importResult.data.owner.login} / {importResult.data.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-mutedText">
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {importResult.data.stargazers_count}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <GitFork className="w-3 h-3" />
                      {importResult.data.forks_count}
                    </span>
                  </div>
                </div>

                {importResult.data.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {importResult.data.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                  {importResult.data.language && (
                    <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {importResult.data.language}
                    </span>
                  )}
                  {importResult.data.license && (
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      License: {importResult.data.license.spdx_id || importResult.data.license.name}
                    </span>
                  )}
                  {importResult.data.topics && importResult.data.topics.length > 0 && (
                    <span className="text-slate-400 dark:text-mutedText">
                      Topics: {importResult.data.topics.slice(0, 4).join(', ')}
                    </span>
                  )}
                </div>
              </div>

              {/* Checkboxes to apply fields */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-lightText mb-2">
                  Select fields to import into your README:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFields.name}
                      onChange={(e) =>
                        setSelectedFields((prev) => ({ ...prev, name: e.target.checked }))
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Project Name</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFields.description}
                      onChange={(e) =>
                        setSelectedFields((prev) => ({ ...prev, description: e.target.checked }))
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Description</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFields.githubUrl}
                      onChange={(e) =>
                        setSelectedFields((prev) => ({ ...prev, githubUrl: e.target.checked }))
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Repository URL</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFields.demoUrl}
                      disabled={!importResult.data.homepage}
                      onChange={(e) =>
                        setSelectedFields((prev) => ({ ...prev, demoUrl: e.target.checked }))
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500 disabled:opacity-40"
                    />
                    <span className={!importResult.data.homepage ? 'opacity-40' : ''}>
                      Demo URL {importResult.data.homepage ? '' : '(N/A)'}
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFields.license}
                      disabled={!importResult.data.license}
                      onChange={(e) =>
                        setSelectedFields((prev) => ({ ...prev, license: e.target.checked }))
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500 disabled:opacity-40"
                    />
                    <span className={!importResult.data.license ? 'opacity-40' : ''}>
                      License {importResult.data.license ? '' : '(N/A)'}
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFields.technologies}
                      onChange={(e) =>
                        setSelectedFields((prev) => ({ ...prev, technologies: e.target.checked }))
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Tech Stack Suggestions</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-borderDark bg-slate-50 dark:bg-surfaceDark/50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!importResult?.data}
            onClick={handleApply}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Apply to Project</span>
          </button>
        </div>
      </div>
    </div>
  );
};
