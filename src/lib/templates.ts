import { TemplateType } from '../types/project';

export interface TemplateInfo {
  id: TemplateType;
  name: string;
  tagline: string;
  description: string;
  recommendedFor: string;
  iconName: string;
}

export const TEMPLATES: Record<TemplateType, TemplateInfo> = {
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    tagline: 'Clean & focused',
    description: 'A concise README containing only essential information: title, description, features, installation, and license.',
    recommendedFor: 'Small utilities, CLI tools, libraries, and micro-packages.',
    iconName: 'Minimize2',
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    tagline: 'Modern SaaS & portfolio standard',
    description: 'Comprehensive structure with tech stack badges, screenshots, detailed features, installation, usage, and social links.',
    recommendedFor: 'Full-stack applications, SaaS products, portfolio projects, and commercial repositories.',
    iconName: 'Sparkles',
  },
  opensource: {
    id: 'opensource',
    name: 'Open Source',
    tagline: 'Community & contributor ready',
    description: 'Battle-tested open source layout with Table of Contents, build badges, contribution guidelines, Code of Conduct, and acknowledgements.',
    recommendedFor: 'Community-driven open source repositories, frameworks, and public tools.',
    iconName: 'Globe',
  },
};
