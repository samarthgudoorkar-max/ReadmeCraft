import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Copy,
  Check,
  Download,
  Eye,
  Code2,
} from 'lucide-react';

interface PreviewPanelProps {
  markdown: string;
  projectName: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ markdown, projectName }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'raw'>('preview');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Compute metrics
  const wordCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  const charCount = markdown.length;
  const sectionCount = (markdown.match(/^##?\s+/gm) || []).length;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(markdown);
      } else {
        // Fallback for older browsers or restricted environments
        const textArea = document.createElement('textarea');
        textArea.value = markdown;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy markdown:', err);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    try {
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'README.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download README:', err);
    } finally {
      setTimeout(() => setDownloading(false), 600);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-darkBg overflow-hidden">
      {/* Top Header & Toolbar */}
      <div className="px-6 py-3.5 border-b border-slate-200 dark:border-borderDark flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-darkBg sticky top-0 z-10">
        
        {/* Left: Tab Switcher (Preview vs Raw) */}
        <div className="flex items-center space-x-1 p-1 bg-slate-100 dark:bg-surfaceDark rounded-lg border border-slate-200 dark:border-borderDark">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'preview'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('raw')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'raw'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Raw Markdown</span>
          </button>
        </div>

        {/* Right: Export Actions */}
        <div className="flex items-center space-x-2">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              copied
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                : 'bg-white dark:bg-surfaceDark text-slate-700 dark:text-slate-200 border-slate-200 dark:border-borderDark hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
            title="Copy formatted Markdown to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-mutedText" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Download README.md Button */}
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-darkBg"
            title="Download README.md file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download README.md</span>
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-6 py-2 bg-slate-100/70 dark:bg-surfaceDark/40 border-b border-slate-200 dark:border-borderDark/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-mutedText">
        <div className="flex items-center gap-3">
          <span className="font-medium text-slate-700 dark:text-slate-300">{projectName || 'Project'}</span>
          <span>•</span>
          <span>{sectionCount} sections</span>
          <span>•</span>
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} characters</span>
        </div>
        <div className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
          README.md
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8">
        {activeTab === 'preview' ? (
          <div className="max-w-4xl mx-auto bg-white dark:bg-surfaceDark p-6 sm:p-10 rounded-xl border border-slate-200 dark:border-borderDark shadow-sm">
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl border border-slate-200 dark:border-borderDark bg-[#0d1117] text-[#e6edf3] p-5 font-mono text-xs overflow-x-auto shadow-sm">
              <pre className="whitespace-pre-wrap break-all select-all leading-relaxed font-mono">
                {markdown}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
