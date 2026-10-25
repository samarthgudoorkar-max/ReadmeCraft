import { GitHubRepoMetadata, TechItem } from '../types/project';
import { findPredefinedTech, createCustomTech } from './technologies';

export interface ParsedGitHubUrl {
  owner: string;
  repo: string;
}

/**
 * Parses and validates GitHub repository URL or slug.
 * Supports:
 * - https://github.com/owner/repo
 * - http://github.com/owner/repo
 * - github.com/owner/repo
 * - git@github.com:owner/repo.git
 * - owner/repo
 */
export function parseGitHubUrl(input: string): ParsedGitHubUrl | null {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();

  // Pattern for git@github.com:owner/repo(.git)
  const sshMatch = trimmed.match(/^git@github\.com:([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+?)(?:\.git)?$/);
  if (sshMatch) {
    return { owner: sshMatch[1], repo: sshMatch[2] };
  }

  // Pattern for web URLs and owner/repo
  // Normalizes optional protocol, trailing slashes, and github.com host
  const clean = trimmed
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/^github\.com\//i, '')
    .replace(/\/+$/, '')
    .replace(/\.git$/i, '')
    .replace(/\/+$/, '');

  const parts = clean.split('/');
  if (parts.length === 2 && parts[0].length > 0 && parts[1].length > 0) {
    // Validate characters are typical github username and repo chars
    const ownerRegex = /^[a-zA-Z0-9_.-]+$/;
    const repoRegex = /^[a-zA-Z0-9_.-]+$/;
    if (ownerRegex.test(parts[0]) && repoRegex.test(parts[1])) {
      return { owner: parts[0], repo: parts[1] };
    }
  }

  return null;
}

export interface GitHubImportResult {
  success: boolean;
  data?: GitHubRepoMetadata;
  suggestedTechs?: TechItem[];
  error?: string;
}

export async function fetchGitHubRepoData(urlOrSlug: string): Promise<GitHubImportResult> {
  const parsed = parseGitHubUrl(urlOrSlug);
  if (!parsed) {
    return {
      success: false,
      error: 'Please enter a valid GitHub repository URL or "owner/repo" path (e.g., https://github.com/facebook/react).',
    };
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (response.status === 404) {
      return {
        success: false,
        error: `Repository "${parsed.owner}/${parsed.repo}" was not found. Please make sure the repository is public and the name is spelled correctly.`,
      };
    }

    if (response.status === 403) {
      return {
        success: false,
        error: 'GitHub API rate limit exceeded. Please wait a few moments or enter your project details manually.',
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: `GitHub API returned error ${response.status}: ${response.statusText}`,
      };
    }

    const data: GitHubRepoMetadata = await response.json();

    // Suggest technologies based on primary language and topics without fabricating stack
    const suggestedTechs: TechItem[] = [];
    if (data.language) {
      const match = findPredefinedTech(data.language);
      if (match) {
        suggestedTechs.push(match);
      } else {
        suggestedTechs.push(createCustomTech(data.language));
      }
    }

    if (Array.isArray(data.topics)) {
      data.topics.forEach(topic => {
        const match = findPredefinedTech(topic);
        if (match && !suggestedTechs.some(t => t.name.toLowerCase() === match.name.toLowerCase())) {
          suggestedTechs.push(match);
        }
      });
    }

    return {
      success: true,
      data,
      suggestedTechs,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown network failure';
    return {
      success: false,
      error: `Could not connect to GitHub API: ${message}. Check your internet connection.`,
    };
  }
}
