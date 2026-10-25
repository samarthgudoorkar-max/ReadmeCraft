import { TechItem, TechCategory } from '../types/project';

export interface TechDefinition {
  name: string;
  category: TechCategory;
  badgeSlug: string;
  badgeColor: string;
  badgeLogo: string;
}

export const PREDEFINED_TECHNOLOGIES: TechDefinition[] = [
  // Frontend
  { name: 'React', category: 'frontend', badgeSlug: 'React', badgeColor: '20232A', badgeLogo: 'react' },
  { name: 'Vue.js', category: 'frontend', badgeSlug: 'Vue.js', badgeColor: '35495E', badgeLogo: 'vuedotjs' },
  { name: 'Angular', category: 'frontend', badgeSlug: 'Angular', badgeColor: 'DD0031', badgeLogo: 'angular' },
  { name: 'Next.js', category: 'frontend', badgeSlug: 'Next.js', badgeColor: '000000', badgeLogo: 'nextdotjs' },
  { name: 'HTML5', category: 'frontend', badgeSlug: 'HTML5', badgeColor: 'E34F26', badgeLogo: 'html5' },
  { name: 'CSS3', category: 'frontend', badgeSlug: 'CSS3', badgeColor: '1572B6', badgeLogo: 'css3' },
  { name: 'Tailwind CSS', category: 'frontend', badgeSlug: 'Tailwind_CSS', badgeColor: '38B2AC', badgeLogo: 'tailwind-css' },
  { name: 'Svelte', category: 'frontend', badgeSlug: 'Svelte', badgeColor: 'FF3E00', badgeLogo: 'svelte' },
  { name: 'Vite', category: 'frontend', badgeSlug: 'Vite', badgeColor: '646CFF', badgeLogo: 'vite' },
  { name: 'Astro', category: 'frontend', badgeSlug: 'Astro', badgeColor: 'BC52EE', badgeLogo: 'astro' },

  // Backend
  { name: 'Node.js', category: 'backend', badgeSlug: 'Node.js', badgeColor: '43853D', badgeLogo: 'node.js' },
  { name: 'Express', category: 'backend', badgeSlug: 'Express.js', badgeColor: '404D59', badgeLogo: 'express' },
  { name: 'Django', category: 'backend', badgeSlug: 'Django', badgeColor: '092E20', badgeLogo: 'django' },
  { name: 'Flask', category: 'backend', badgeSlug: 'Flask', badgeColor: '000000', badgeLogo: 'flask' },
  { name: 'FastAPI', category: 'backend', badgeSlug: 'FastAPI', badgeColor: '005571', badgeLogo: 'fastapi' },
  { name: 'NestJS', category: 'backend', badgeSlug: 'NestJS', badgeColor: 'E0234E', badgeLogo: 'nestjs' },
  { name: 'Spring Boot', category: 'backend', badgeSlug: 'Spring_Boot', badgeColor: '6DB33F', badgeLogo: 'springboot' },

  // Languages
  { name: 'TypeScript', category: 'languages', badgeSlug: 'TypeScript', badgeColor: '007ACC', badgeLogo: 'typescript' },
  { name: 'JavaScript', category: 'languages', badgeSlug: 'JavaScript', badgeColor: 'F7DF1E', badgeLogo: 'javascript' },
  { name: 'Python', category: 'languages', badgeSlug: 'Python', badgeColor: '3776AB', badgeLogo: 'python' },
  { name: 'Java', category: 'languages', badgeSlug: 'Java', badgeColor: 'ED8B00', badgeLogo: 'openjdk' },
  { name: 'C++', category: 'languages', badgeSlug: 'C++', badgeColor: '00599C', badgeLogo: 'cplusplus' },
  { name: 'Go', category: 'languages', badgeSlug: 'Go', badgeColor: '00ADD8', badgeLogo: 'go' },
  { name: 'Rust', category: 'languages', badgeSlug: 'Rust', badgeColor: '000000', badgeLogo: 'rust' },
  { name: 'PHP', category: 'languages', badgeSlug: 'PHP', badgeColor: '777BB4', badgeLogo: 'php' },

  // Database
  { name: 'PostgreSQL', category: 'database', badgeSlug: 'PostgreSQL', badgeColor: '316192', badgeLogo: 'postgresql' },
  { name: 'MongoDB', category: 'database', badgeSlug: 'MongoDB', badgeColor: '4EA94B', badgeLogo: 'mongodb' },
  { name: 'MySQL', category: 'database', badgeSlug: 'MySQL', badgeColor: '00000F', badgeLogo: 'mysql' },
  { name: 'SQLite', category: 'database', badgeSlug: 'SQLite', badgeColor: '07405E', badgeLogo: 'sqlite' },
  { name: 'Supabase', category: 'database', badgeSlug: 'Supabase', badgeColor: '3ECF8E', badgeLogo: 'supabase' },
  { name: 'Redis', category: 'database', badgeSlug: 'Redis', badgeColor: 'DC382D', badgeLogo: 'redis' },

  // Other / DevOps / Cloud
  { name: 'Docker', category: 'other', badgeSlug: 'Docker', badgeColor: '2496ED', badgeLogo: 'docker' },
  { name: 'Git', category: 'other', badgeSlug: 'Git', badgeColor: 'F05032', badgeLogo: 'git' },
  { name: 'GitHub Actions', category: 'other', badgeSlug: 'GitHub_Actions', badgeColor: '2088FF', badgeLogo: 'githubactions' },
  { name: 'Firebase', category: 'other', badgeSlug: 'Firebase', badgeColor: '039BE5', badgeLogo: 'firebase' },
  { name: 'Vercel', category: 'other', badgeSlug: 'Vercel', badgeColor: '000000', badgeLogo: 'vercel' },
  { name: 'GraphQL', category: 'other', badgeSlug: 'GraphQL', badgeColor: 'E10098', badgeLogo: 'graphql' },
  { name: 'Linux', category: 'other', badgeSlug: 'Linux', badgeColor: 'FCC624', badgeLogo: 'linux' },
];

export const CATEGORY_LABELS: Record<TechCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  languages: 'Languages',
  database: 'Database',
  other: 'DevOps & Tools',
  custom: 'Custom',
};

export function createCustomTech(name: string): TechItem {
  const cleanName = name.trim();
  const slug = encodeURIComponent(cleanName.replace(/\s+/g, '_'));
  return {
    id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: cleanName,
    category: 'custom',
    badgeSlug: slug,
    badgeColor: '6366F1',
    badgeLogo: 'code',
  };
}

export function findPredefinedTech(name: string): TechItem | null {
  const normalized = name.toLowerCase().trim();
  const found = PREDEFINED_TECHNOLOGIES.find(
    t => t.name.toLowerCase() === normalized || t.badgeSlug.toLowerCase() === normalized
  );
  if (!found) return null;
  return {
    id: `predefined-${found.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: found.name,
    category: found.category,
    badgeSlug: found.badgeSlug,
    badgeColor: found.badgeColor,
    badgeLogo: found.badgeLogo,
  };
}
