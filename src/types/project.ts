export type TemplateType = 'minimal' | 'professional' | 'opensource';

export type TechCategory = 'frontend' | 'backend' | 'languages' | 'database' | 'other' | 'custom';

export interface TechItem {
  id: string;
  name: string;
  category: TechCategory;
  badgeSlug?: string;
  badgeColor?: string;
  badgeLogo?: string;
}

export interface ScreenshotItem {
  id: string;
  url: string;
  caption: string;
}

export interface RoadmapItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface ProjectState {
  // Template & Meta
  template: TemplateType;
  badgeStyle: 'flat' | 'flat-square' | 'for-the-badge';

  // Basic Info
  projectName: string;
  shortDescription: string;
  detailedDescription: string;
  githubUrl: string;
  demoUrl: string;
  authorName: string;
  authorGithub: string;

  // Repository Badges Toggle
  includeBadges: boolean;

  // Tech Stack
  technologies: TechItem[];

  // Features
  features: string[];

  // Installation
  installation: {
    prerequisites: string;
    cloneCommand: string;
    installCommand: string;
    envSetup: string;
    devCommand: string;
  };

  // Usage
  usage: {
    instructions: string;
    codeExample: string;
    codeLanguage: string;
  };

  // Optional Sections
  sections: {
    screenshots: {
      enabled: boolean;
      items: ScreenshotItem[];
    };
    projectStructure: {
      enabled: boolean;
      tree: string;
    };
    contributing: {
      enabled: boolean;
      text: string;
      includeCodeOfConduct: boolean;
    };
    license: {
      enabled: boolean;
      type: string; // 'MIT' | 'Apache 2.0' | 'GPL-3.0' | 'BSD-3-Clause' | 'None'
      year: string;
      author: string;
    };
    acknowledgements: {
      enabled: boolean;
      items: string[];
    };
    contact: {
      enabled: boolean;
      email: string;
      twitter: string;
      linkedin: string;
      website: string;
    };
    roadmap: {
      enabled: boolean;
      items: RoadmapItem[];
    };
  };
}

export interface GitHubRepoMetadata {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  license: {
    key: string;
    name: string;
    spdx_id: string;
  } | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}
