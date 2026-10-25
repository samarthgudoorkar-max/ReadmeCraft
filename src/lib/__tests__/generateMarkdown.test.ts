import { describe, it, expect } from 'vitest';
import { generateMarkdown } from '../generateMarkdown';
import { SAMPLE_PROJECT, INITIAL_EMPTY_PROJECT } from '../../constants/sampleProject';
import { ProjectState } from '../../types/project';

describe('generateMarkdown', () => {
  it('generates valid markdown for Professional template with sample project', () => {
    const md = generateMarkdown(SAMPLE_PROJECT);
    expect(md).toContain('# TaskFlow');
    expect(md).toContain('> A lightweight task management application');
    expect(md).toContain('## 🛠️ Built With');
    expect(md).toContain('![React]');
    expect(md).toContain('## ✨ Key Features');
    expect(md).toContain('Create and manage tasks');
    expect(md).toContain('## 🚀 Getting Started');
    expect(md).toContain('npm install');
    expect(md).toContain('## 💻 Usage');
    expect(md).toContain('## 📁 Project Structure');
    expect(md).toContain('## 🗺️ Roadmap');
    expect(md).toContain('## 🤝 Contributing');
    expect(md).toContain('## 📝 License');
    expect(md).toContain('## 📬 Contact & Support');
    expect(md).toContain('## 🙏 Acknowledgements');
  });

  it('generates Minimal template with concise layout and excludes optional sections', () => {
    const minimalState: ProjectState = {
      ...SAMPLE_PROJECT,
      template: 'minimal',
    };
    const md = generateMarkdown(minimalState);
    expect(md).toContain('# TaskFlow');
    expect(md).toContain('## Features');
    expect(md).toContain('## Installation');
    expect(md).toContain('## Usage');
    expect(md).toContain('## License');
    // Minimal template should not contain screenshots, structure, roadmap, or acknowledgements
    expect(md).not.toContain('## 📸 Screenshots');
    expect(md).not.toContain('## 📁 Project Structure');
    expect(md).not.toContain('## 🗺️ Roadmap');
  });

  it('generates Open Source template with Table of Contents and community sections', () => {
    const osState: ProjectState = {
      ...SAMPLE_PROJECT,
      template: 'opensource',
    };
    const md = generateMarkdown(osState);
    expect(md).toContain('## 📑 Table of Contents');
    expect(md).toContain('## 📖 Overview');
    expect(md).toContain('## ✨ Features');
    expect(md).toContain('## 🛠️ Built With');
    expect(md).toContain('## 🏁 Getting Started');
    expect(md).toContain('## 🏗️ Architecture');
    expect(md).toContain('## 🤝 Contributing');
    expect(md).toContain('Contributor Covenant Code of Conduct');
  });

  it('handles empty project gracefully without broken headings or empty sections', () => {
    const md = generateMarkdown(INITIAL_EMPTY_PROJECT);
    expect(md).toContain('# Project Name');
    expect(md).not.toContain('## 📸 Screenshots');
    expect(md).not.toContain('## 📁 Project Structure');
    expect(md).not.toContain('## 🗺️ Roadmap');
  });

  it('excludes disabled sections when toggled off', () => {
    const state: ProjectState = {
      ...SAMPLE_PROJECT,
      sections: {
        ...SAMPLE_PROJECT.sections,
        screenshots: { enabled: false, items: [] },
        projectStructure: { enabled: false, tree: '' },
        roadmap: { enabled: false, items: [] },
        contact: { enabled: false, email: '', twitter: '', linkedin: '', website: '' },
      },
    };
    const md = generateMarkdown(state);
    expect(md).not.toContain('## 📸 Screenshots');
    expect(md).not.toContain('## 📁 Project Structure');
    expect(md).not.toContain('## 🗺️ Roadmap');
    expect(md).not.toContain('## 📬 Contact & Support');
  });

  it('correctly formats custom technologies and badge styles', () => {
    const customState: ProjectState = {
      ...SAMPLE_PROJECT,
      badgeStyle: 'for-the-badge',
      technologies: [
        {
          id: 'custom-1',
          name: 'CustomLib 3.0',
          category: 'custom',
          badgeSlug: 'CustomLib_3.0',
          badgeColor: 'FF0055',
        },
      ],
    };
    const md = generateMarkdown(customState);
    expect(md).toContain('![CustomLib 3.0](https://img.shields.io/badge/CustomLib_3.0-FF0055?style=for-the-badge)');
    expect(md).toContain('- **CustomLib 3.0**');
  });

  it('renders roadmap checkboxes correctly based on completion state', () => {
    const state: ProjectState = {
      ...SAMPLE_PROJECT,
      sections: {
        ...SAMPLE_PROJECT.sections,
        roadmap: {
          enabled: true,
          items: [
            { id: '1', text: 'Completed Feature', completed: true },
            { id: '2', text: 'Pending Feature', completed: false },
          ],
        },
      },
    };
    const md = generateMarkdown(state);
    expect(md).toContain('- [x] Completed Feature');
    expect(md).toContain('- [ ] Pending Feature');
  });
});
