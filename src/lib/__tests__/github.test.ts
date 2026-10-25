import { describe, it, expect } from 'vitest';
import { parseGitHubUrl } from '../github';

describe('parseGitHubUrl', () => {
  it('parses full https URL', () => {
    const result = parseGitHubUrl('https://github.com/facebook/react');
    expect(result).toEqual({ owner: 'facebook', repo: 'react' });
  });

  it('parses URL with .git extension and trailing slash', () => {
    const result = parseGitHubUrl('https://github.com/torvalds/linux.git/');
    expect(result).toEqual({ owner: 'torvalds', repo: 'linux' });
  });

  it('parses domain and repo without protocol', () => {
    const result = parseGitHubUrl('github.com/vercel/next.js');
    expect(result).toEqual({ owner: 'vercel', repo: 'next.js' });
  });

  it('parses owner/repo shorthand', () => {
    const result = parseGitHubUrl('tailwindlabs/tailwindcss');
    expect(result).toEqual({ owner: 'tailwindlabs', repo: 'tailwindcss' });
  });

  it('parses ssh git URL', () => {
    const result = parseGitHubUrl('git@github.com:owner/repo.git');
    expect(result).toEqual({ owner: 'owner', repo: 'repo' });
  });

  it('returns null for empty or invalid input', () => {
    expect(parseGitHubUrl('')).toBeNull();
    expect(parseGitHubUrl('   ')).toBeNull();
    expect(parseGitHubUrl('https://gitlab.com/owner/repo')).toBeNull();
    expect(parseGitHubUrl('https://bitbucket.org/owner/repo')).toBeNull();
    expect(parseGitHubUrl('justastring')).toBeNull();
    expect(parseGitHubUrl('invalid/repo/extra/path')).toBeNull();
    expect(parseGitHubUrl('http://')).toBeNull();
  });
});
