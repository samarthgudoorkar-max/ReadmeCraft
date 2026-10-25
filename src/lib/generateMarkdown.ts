import { ProjectState } from '../types/project';
import { parseGitHubUrl } from './github';

/**
 * Cleanly collapses excessive blank lines into standard markdown spacing (max 2 newlines).
 */
function cleanSpacing(markdown: string): string {
  return markdown
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';
}

/**
 * Creates shields.io tech badge markdown string
 */
function getTechBadge(tech: { name: string; badgeSlug?: string; badgeColor?: string; badgeLogo?: string }, style: string): string {
  const slug = tech.badgeSlug || encodeURIComponent(tech.name.replace(/\s+/g, '_'));
  const color = tech.badgeColor || '6366F1';
  const logo = tech.badgeLogo ? `&logo=${encodeURIComponent(tech.badgeLogo)}&logoColor=white` : '';
  const url = `https://img.shields.io/badge/${slug}-${color}?style=${style}${logo}`;
  return `![${tech.name}](${url})`;
}

/**
 * Primary Markdown Generation Engine
 */
export function generateMarkdown(state: ProjectState): string {
  const template = state.template || 'professional';

  switch (template) {
    case 'minimal':
      return generateMinimalMarkdown(state);
    case 'opensource':
      return generateOpenSourceMarkdown(state);
    case 'professional':
    default:
      return generateProfessionalMarkdown(state);
  }
}

/**
 * MINIMAL TEMPLATE
 */
function generateMinimalMarkdown(state: ProjectState): string {
  const sections: string[] = [];
  const title = state.projectName.trim() || 'Project Title';

  // Title
  sections.push(`# ${title}`);

  // Short & Detailed Description
  if (state.shortDescription.trim()) {
    sections.push(`> ${state.shortDescription.trim()}`);
  }

  if (state.detailedDescription.trim()) {
    sections.push(state.detailedDescription.trim());
  }

  // Quick links if available
  const links: string[] = [];
  if (state.demoUrl.trim()) links.push(`[Live Demo](${state.demoUrl.trim()})`);
  if (state.githubUrl.trim()) links.push(`[GitHub Repository](${state.githubUrl.trim()})`);
  if (links.length > 0) {
    sections.push(`**Quick Links:** ${links.join(' • ')}`);
  }

  // Features
  const activeFeatures = state.features.filter(f => f.trim().length > 0);
  if (activeFeatures.length > 0) {
    const list = activeFeatures.map(f => `- ${f.trim()}`).join('\n');
    sections.push(`## Features\n\n${list}`);
  }

  // Installation
  const installBlocks: string[] = [];
  if (state.installation.prerequisites.trim()) {
    installBlocks.push(`**Prerequisites:**\n\n${state.installation.prerequisites.trim()}`);
  }
  if (state.installation.cloneCommand.trim()) {
    installBlocks.push(`\`\`\`bash\n# Clone the repository\n${state.installation.cloneCommand.trim()}\n\`\`\``);
  }
  if (state.installation.installCommand.trim()) {
    installBlocks.push(`\`\`\`bash\n# Install dependencies\n${state.installation.installCommand.trim()}\n\`\`\``);
  }
  if (state.installation.devCommand.trim()) {
    installBlocks.push(`\`\`\`bash\n# Start development server\n${state.installation.devCommand.trim()}\n\`\`\``);
  }

  if (installBlocks.length > 0) {
    sections.push(`## Installation\n\n${installBlocks.join('\n\n')}`);
  }

  // Usage
  if (state.usage.instructions.trim() || state.usage.codeExample.trim()) {
    const usageParts: string[] = [];
    if (state.usage.instructions.trim()) {
      usageParts.push(state.usage.instructions.trim());
    }
    if (state.usage.codeExample.trim()) {
      const lang = state.usage.codeLanguage || 'bash';
      usageParts.push(`\`\`\`${lang}\n${state.usage.codeExample.trim()}\n\`\`\``);
    }
    sections.push(`## Usage\n\n${usageParts.join('\n\n')}`);
  }

  // License
  if (state.sections.license.enabled && state.sections.license.type && state.sections.license.type !== 'None') {
    const year = state.sections.license.year || new Date().getFullYear().toString();
    const author = state.sections.license.author || state.authorName || 'the project authors';
    sections.push(`## License\n\nDistributed under the ${state.sections.license.type} License. Copyright © ${year} ${author}.`);
  }

  return cleanSpacing(sections.join('\n\n'));
}

/**
 * PROFESSIONAL TEMPLATE (Default)
 */
function generateProfessionalMarkdown(state: ProjectState): string {
  const sections: string[] = [];
  const title = state.projectName.trim() || 'Project Name';
  const badgeStyle = state.badgeStyle || 'flat-square';
  const gh = parseGitHubUrl(state.githubUrl);

  // Header Section with Badges
  const badgesRow: string[] = [];
  if (state.includeBadges && gh) {
    badgesRow.push(`[![GitHub Stars](https://img.shields.io/github/stars/${gh.owner}/${gh.repo}?style=${badgeStyle})](https://github.com/gh.owner/gh.repo/stargazers)`);
    badgesRow.push(`[![GitHub Forks](https://img.shields.io/github/forks/${gh.owner}/${gh.repo}?style=${badgeStyle})](https://github.com/gh.owner/gh.repo/network/members)`);
    badgesRow.push(`[![GitHub Issues](https://img.shields.io/github/issues/${gh.owner}/${gh.repo}?style=${badgeStyle})](https://github.com/gh.owner/gh.repo/issues)`);
    if (state.sections.license.enabled && state.sections.license.type !== 'None') {
      badgesRow.push(`[![License](https://img.shields.io/badge/license-${encodeURIComponent(state.sections.license.type)}-blue.svg?style=${badgeStyle})](#-license)`);
    }
  }

  let header = `# ${title}`;
  if (badgesRow.length > 0) {
    header = `${badgesRow.join(' ')}\n\n# ${title}`;
  }
  sections.push(header);

  // Short & Detailed Description
  if (state.shortDescription.trim()) {
    sections.push(`> ${state.shortDescription.trim()}`);
  }

  if (state.detailedDescription.trim()) {
    sections.push(state.detailedDescription.trim());
  }

  // Action Buttons / Links
  const quickLinks: string[] = [];
  if (state.demoUrl.trim()) {
    quickLinks.push(`[**Live Demo**](${state.demoUrl.trim()})`);
  }
  if (state.githubUrl.trim()) {
    quickLinks.push(`[**View Code**](${state.githubUrl.trim()})`);
  }
  if (state.authorGithub.trim()) {
    quickLinks.push(`[**Author Profile**](https://github.com/${state.authorGithub.trim()})`);
  }
  if (quickLinks.length > 0) {
    sections.push(quickLinks.join(' • '));
  }

  // Screenshots
  if (state.sections.screenshots.enabled && state.sections.screenshots.items.length > 0) {
    const scParts = state.sections.screenshots.items
      .filter(item => item.url.trim().length > 0)
      .map(item => {
        const caption = item.caption.trim() ? `\n*${item.caption.trim()}*` : '';
        return `![${item.caption.trim() || 'Screenshot'}](${item.url.trim()})${caption}`;
      });
    if (scParts.length > 0) {
      sections.push(`## 📸 Screenshots\n\n${scParts.join('\n\n')}`);
    }
  }

  // Tech Stack
  if (state.technologies.length > 0) {
    const badges = state.technologies.map(t => getTechBadge(t, badgeStyle)).join(' ');
    const list = state.technologies.map(t => `- **${t.name}**`).join('\n');
    sections.push(`## 🛠️ Built With\n\n${badges}\n\n${list}`);
  }

  // Key Features
  const activeFeatures = state.features.filter(f => f.trim().length > 0);
  if (activeFeatures.length > 0) {
    const featureList = activeFeatures.map(f => `- **${f.trim()}**`).join('\n');
    sections.push(`## ✨ Key Features\n\n${featureList}`);
  }

  // Getting Started / Installation
  const installBlocks: string[] = [];
  if (state.installation.prerequisites.trim()) {
    installBlocks.push(`### Prerequisites\n\n${state.installation.prerequisites.trim()}`);
  }

  const codeSteps: string[] = [];
  if (state.installation.cloneCommand.trim()) {
    codeSteps.push(`1. Clone the repository:\n\`\`\`bash\n${state.installation.cloneCommand.trim()}\n\`\`\``);
  }
  if (state.installation.installCommand.trim()) {
    codeSteps.push(`2. Install dependencies:\n\`\`\`bash\n${state.installation.installCommand.trim()}\n\`\`\``);
  }
  if (state.installation.envSetup.trim()) {
    codeSteps.push(`3. Configure environment variables:\n\`\`\`bash\n${state.installation.envSetup.trim()}\n\`\`\``);
  }
  if (state.installation.devCommand.trim()) {
    codeSteps.push(`4. Start development server:\n\`\`\`bash\n${state.installation.devCommand.trim()}\n\`\`\``);
  }

  if (codeSteps.length > 0) {
    installBlocks.push(`### Quickstart\n\n${codeSteps.join('\n\n')}`);
  }

  if (installBlocks.length > 0) {
    sections.push(`## 🚀 Getting Started\n\n${installBlocks.join('\n\n')}`);
  }

  // Usage
  if (state.usage.instructions.trim() || state.usage.codeExample.trim()) {
    const usageParts: string[] = [];
    if (state.usage.instructions.trim()) {
      usageParts.push(state.usage.instructions.trim());
    }
    if (state.usage.codeExample.trim()) {
      const lang = state.usage.codeLanguage || 'bash';
      usageParts.push(`\`\`\`${lang}\n${state.usage.codeExample.trim()}\n\`\`\``);
    }
    sections.push(`## 💻 Usage\n\n${usageParts.join('\n\n')}`);
  }

  // Project Structure
  if (state.sections.projectStructure.enabled && state.sections.projectStructure.tree.trim()) {
    sections.push(`## 📁 Project Structure\n\n\`\`\`\n${state.sections.projectStructure.tree.trim()}\n\`\`\``);
  }

  // Roadmap
  if (state.sections.roadmap.enabled && state.sections.roadmap.items.length > 0) {
    const items = state.sections.roadmap.items
      .filter(item => item.text.trim().length > 0)
      .map(item => `- [${item.completed ? 'x' : ' '}] ${item.text.trim()}`);
    if (items.length > 0) {
      sections.push(`## 🗺️ Roadmap\n\n${items.join('\n')}`);
    }
  }

  // Contributing
  if (state.sections.contributing.enabled && state.sections.contributing.text.trim()) {
    let contrib = state.sections.contributing.text.trim();
    if (state.sections.contributing.includeCodeOfConduct) {
      contrib += '\n\n### Code of Conduct\nPlease note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.';
    }
    sections.push(`## 🤝 Contributing\n\n${contrib}`);
  }

  // License
  if (state.sections.license.enabled && state.sections.license.type && state.sections.license.type !== 'None') {
    const year = state.sections.license.year || new Date().getFullYear().toString();
    const author = state.sections.license.author || state.authorName || 'the authors';
    sections.push(`## 📝 License\n\nDistributed under the **${state.sections.license.type}** License. See \`LICENSE\` for more information.\n\nCopyright © ${year} ${author}`);
  }

  // Contact
  if (state.sections.contact.enabled) {
    const contactLinks: string[] = [];
    if (state.authorName.trim()) contactLinks.push(`**Author:** ${state.authorName.trim()}`);
    if (state.sections.contact.email.trim()) contactLinks.push(`**Email:** [${state.sections.contact.email.trim()}](mailto:${state.sections.contact.email.trim()})`);
    if (state.sections.contact.twitter.trim()) {
      const handle = state.sections.contact.twitter.replace(/^@/, '').trim();
      contactLinks.push(`**Twitter / X:** [@${handle}](https://twitter.com/${handle})`);
    }
    if (state.sections.contact.linkedin.trim()) {
      const handle = state.sections.contact.linkedin.replace(/^https?:\/\/([a-z.]+\.)?linkedin\.com\/in\//, '').replace(/\/$/, '').trim();
      contactLinks.push(`**LinkedIn:** [${handle}](https://linkedin.com/in/${handle})`);
    }
    if (state.sections.contact.website.trim()) {
      contactLinks.push(`**Website:** [${state.sections.contact.website.trim()}](${state.sections.contact.website.trim()})`);
    }
    if (contactLinks.length > 0) {
      sections.push(`## 📬 Contact & Support\n\n${contactLinks.map(c => `- ${c}`).join('\n')}`);
    }
  }

  // Acknowledgements
  if (state.sections.acknowledgements.enabled && state.sections.acknowledgements.items.length > 0) {
    const acks = state.sections.acknowledgements.items
      .filter(item => item.trim().length > 0)
      .map(item => `- ${item.trim()}`);
    if (acks.length > 0) {
      sections.push(`## 🙏 Acknowledgements\n\n${acks.join('\n')}`);
    }
  }

  return cleanSpacing(sections.join('\n\n'));
}

/**
 * OPEN SOURCE TEMPLATE
 */
function generateOpenSourceMarkdown(state: ProjectState): string {
  const sections: string[] = [];
  const title = state.projectName.trim() || 'Project Title';
  const badgeStyle = state.badgeStyle || 'flat-square';
  const gh = parseGitHubUrl(state.githubUrl);

  // Open Source Header with Shields.io badges
  const badges: string[] = [];
  if (gh) {
    badges.push(`[![CI/CD](https://img.shields.io/github/actions/workflow/status/${gh.owner}/${gh.repo}/ci.yml?branch=main&style=${badgeStyle})](https://github.com/${gh.owner}/${gh.repo}/actions)`);
    badges.push(`[![GitHub Stars](https://img.shields.io/github/stars/${gh.owner}/${gh.repo}?style=${badgeStyle})](https://github.com/${gh.owner}/${gh.repo}/stargazers)`);
    badges.push(`[![GitHub Forks](https://img.shields.io/github/forks/${gh.owner}/${gh.repo}?style=${badgeStyle})](https://github.com/${gh.owner}/${gh.repo}/network/members)`);
    badges.push(`[![Open Issues](https://img.shields.io/github/issues-raw/${gh.owner}/${gh.repo}?style=${badgeStyle})](https://github.com/${gh.owner}/${gh.repo}/issues)`);
    badges.push(`[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=${badgeStyle})](https://github.com/${gh.owner}/${gh.repo}/pulls)`);
  }
  if (state.sections.license.enabled && state.sections.license.type !== 'None') {
    badges.push(`[![License](https://img.shields.io/badge/license-${encodeURIComponent(state.sections.license.type)}-blue.svg?style=${badgeStyle})](#-license)`);
  }

  let topHeader = `# ${title}`;
  if (badges.length > 0) {
    topHeader = `${badges.join(' ')}\n\n# ${title}`;
  }
  sections.push(topHeader);

  // Short & Detailed Description
  if (state.shortDescription.trim()) {
    sections.push(`> ${state.shortDescription.trim()}`);
  }

  // Table of Contents
  const tocItems: { label: string; anchor: string }[] = [];
  tocItems.push({ label: 'Overview', anchor: '#-overview' });
  if (state.features.some(f => f.trim().length > 0)) tocItems.push({ label: 'Features', anchor: '#-features' });
  if (state.technologies.length > 0) tocItems.push({ label: 'Built With', anchor: '#-built-with' });
  tocItems.push({ label: 'Getting Started', anchor: '#-getting-started' });
  if (state.usage.instructions.trim() || state.usage.codeExample.trim()) tocItems.push({ label: 'Usage', anchor: '#-usage' });
  if (state.sections.projectStructure.enabled && state.sections.projectStructure.tree.trim()) tocItems.push({ label: 'Architecture', anchor: '#-architecture' });
  if (state.sections.roadmap.enabled && state.sections.roadmap.items.some(i => i.text.trim())) tocItems.push({ label: 'Roadmap', anchor: '#-roadmap' });
  if (state.sections.contributing.enabled) tocItems.push({ label: 'Contributing', anchor: '#-contributing' });
  if (state.sections.license.enabled && state.sections.license.type !== 'None') tocItems.push({ label: 'License', anchor: '#-license' });
  if (state.sections.acknowledgements.enabled && state.sections.acknowledgements.items.length > 0) tocItems.push({ label: 'Acknowledgements', anchor: '#-acknowledgements' });

  const tocMarkdown = `## 📑 Table of Contents\n\n${tocItems.map(item => `- [${item.label}](${item.anchor})`).join('\n')}`;
  sections.push(tocMarkdown);

  // Overview
  if (state.detailedDescription.trim()) {
    sections.push(`## 📖 Overview\n\n${state.detailedDescription.trim()}`);
  } else if (state.shortDescription.trim()) {
    sections.push(`## 📖 Overview\n\n${state.shortDescription.trim()}`);
  }

  // Features
  const activeFeatures = state.features.filter(f => f.trim().length > 0);
  if (activeFeatures.length > 0) {
    const list = activeFeatures.map(f => `- **${f.trim()}**`).join('\n');
    sections.push(`## ✨ Features\n\n${list}`);
  }

  // Tech Stack
  if (state.technologies.length > 0) {
    const badges = state.technologies.map(t => getTechBadge(t, badgeStyle)).join(' ');
    const tableHeader = '| Technology | Category |\n| :--- | :--- |';
    const tableRows = state.technologies
      .map(t => `| **${t.name}** | \`${t.category.toUpperCase()}\` |`)
      .join('\n');
    sections.push(`## 🛠️ Built With\n\n${badges}\n\n${tableHeader}\n${tableRows}`);
  }

  // Getting Started
  const gsBlocks: string[] = [];
  if (state.installation.prerequisites.trim()) {
    gsBlocks.push(`### Prerequisites\n\n${state.installation.prerequisites.trim()}`);
  }
  if (state.installation.cloneCommand.trim()) {
    gsBlocks.push(`### 1. Clone Repository\n\`\`\`bash\n${state.installation.cloneCommand.trim()}\n\`\`\``);
  }
  if (state.installation.installCommand.trim()) {
    gsBlocks.push(`### 2. Install Dependencies\n\`\`\`bash\n${state.installation.installCommand.trim()}\n\`\`\``);
  }
  if (state.installation.envSetup.trim()) {
    gsBlocks.push(`### 3. Environment Variables\n\`\`\`bash\n${state.installation.envSetup.trim()}\n\`\`\``);
  }
  if (state.installation.devCommand.trim()) {
    gsBlocks.push(`### 4. Running the Project\n\`\`\`bash\n${state.installation.devCommand.trim()}\n\`\`\``);
  }

  if (gsBlocks.length > 0) {
    sections.push(`## 🏁 Getting Started\n\n${gsBlocks.join('\n\n')}`);
  }

  // Usage
  if (state.usage.instructions.trim() || state.usage.codeExample.trim()) {
    const usageParts: string[] = [];
    if (state.usage.instructions.trim()) {
      usageParts.push(state.usage.instructions.trim());
    }
    if (state.usage.codeExample.trim()) {
      const lang = state.usage.codeLanguage || 'bash';
      usageParts.push(`\`\`\`${lang}\n${state.usage.codeExample.trim()}\n\`\`\``);
    }
    sections.push(`## 💡 Usage\n\n${usageParts.join('\n\n')}`);
  }

  // Project Structure / Architecture
  if (state.sections.projectStructure.enabled && state.sections.projectStructure.tree.trim()) {
    sections.push(`## 🏗️ Architecture\n\n\`\`\`\n${state.sections.projectStructure.tree.trim()}\n\`\`\``);
  }

  // Roadmap
  if (state.sections.roadmap.enabled && state.sections.roadmap.items.length > 0) {
    const items = state.sections.roadmap.items
      .filter(item => item.text.trim().length > 0)
      .map(item => `- [${item.completed ? 'x' : ' '}] ${item.text.trim()}`);
    if (items.length > 0) {
      sections.push(`## 🗺️ Roadmap\n\n${items.join('\n')}`);
    }
  }

  // Contributing
  if (state.sections.contributing.enabled && state.sections.contributing.text.trim()) {
    let contrib = state.sections.contributing.text.trim();
    if (state.sections.contributing.includeCodeOfConduct) {
      contrib += '\n\n### 🛡️ Code of Conduct\nThis project adheres to the Contributor Covenant Code of Conduct. By participating, you are expected to uphold this code.';
    }
    sections.push(`## 🤝 Contributing\n\n${contrib}`);
  }

  // License
  if (state.sections.license.enabled && state.sections.license.type && state.sections.license.type !== 'None') {
    const year = state.sections.license.year || new Date().getFullYear().toString();
    const author = state.sections.license.author || state.authorName || 'the community';
    sections.push(`## 📜 License\n\nReleased under the **${state.sections.license.type}** License.\n\nCopyright (c) ${year} ${author}`);
  }

  // Acknowledgements
  if (state.sections.acknowledgements.enabled && state.sections.acknowledgements.items.length > 0) {
    const acks = state.sections.acknowledgements.items
      .filter(item => item.trim().length > 0)
      .map(item => `- ${item.trim()}`);
    if (acks.length > 0) {
      sections.push(`## 💖 Acknowledgements\n\n${acks.join('\n')}`);
    }
  }

  return cleanSpacing(sections.join('\n\n'));
}
