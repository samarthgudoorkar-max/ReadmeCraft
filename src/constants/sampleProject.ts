import { ProjectState } from '../types/project';
import { findPredefinedTech } from '../lib/technologies';

export const SAMPLE_PROJECT: ProjectState = {
  template: 'professional',
  badgeStyle: 'flat-square',
  projectName: 'TaskFlow',
  shortDescription: 'A lightweight task management application for organizing daily work.',
  detailedDescription:
    'TaskFlow is an intuitive, distraction-free productivity dashboard built to help individuals streamline their daily tasks, prioritize objectives, and track completion progress with real-time feedback and offline persistence.',
  githubUrl: 'https://github.com/example/taskflow',
  demoUrl: 'https://taskflow-demo.example.com',
  authorName: 'Alex Rivers',
  authorGithub: 'alexrivers',
  includeBadges: true,
  technologies: [
    findPredefinedTech('React')!,
    findPredefinedTech('TypeScript')!,
    findPredefinedTech('Tailwind CSS')!,
    findPredefinedTech('Vite')!,
  ].filter(Boolean),
  features: [
    'Create and manage tasks with title, description, and tags',
    'Set task priorities (High, Medium, Low) with visual indicators',
    'Filter tasks by completion status, urgency, and category',
    'Save tasks locally with automatic browser storage sync',
    'Responsive interface optimized for desktop, tablet, and mobile',
  ],
  installation: {
    prerequisites: 'Node.js 18.0 or higher\nnpm or yarn package manager',
    cloneCommand: 'git clone https://github.com/example/taskflow.git\ncd taskflow',
    installCommand: 'npm install',
    envSetup: 'cp .env.example .env.local',
    devCommand: 'npm run dev',
  },
  usage: {
    instructions:
      'Launch the development server and open your browser at the local URL. Start by clicking "+ New Task" to create your first item, assign priority levels, and drag-and-drop or click to mark tasks as completed.',
    codeExample: '# Run unit tests\nnpm run test\n\n# Build optimized production bundle\nnpm run build',
    codeLanguage: 'bash',
  },
  sections: {
    screenshots: {
      enabled: true,
      items: [
        {
          id: 'sc-1',
          url: 'https://raw.githubusercontent.com/example/taskflow/main/assets/dashboard.png',
          caption: 'TaskFlow Interactive Dashboard',
        },
      ],
    },
    projectStructure: {
      enabled: true,
      tree: `taskflow/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── TaskCard.tsx
│   │   ├── TaskList.tsx
│   │   └── TaskModal.tsx
│   ├── hooks/
│   │   └── useTasks.ts
│   ├── types/
│   │   └── task.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts`,
    },
    contributing: {
      enabled: true,
      text: 'Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.\n\n1. Fork the Project\n2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)\n3. Commit your Changes (`git commit -m "Add some AmazingFeature"`)\n4. Push to the Branch (`git push origin feature/AmazingFeature`)\n5. Open a Pull Request',
      includeCodeOfConduct: true,
    },
    license: {
      enabled: true,
      type: 'MIT',
      year: new Date().getFullYear().toString(),
      author: 'Alex Rivers',
    },
    acknowledgements: {
      enabled: true,
      items: [
        'Lucide Icons for the clean UI iconography',
        'Tailwind CSS team for the modern styling engine',
        'Vite for instantaneous HMR and lightning builds',
      ],
    },
    contact: {
      enabled: true,
      email: 'alex.rivers@example.com',
      twitter: 'alexrivers_dev',
      linkedin: 'alex-rivers-dev',
      website: 'https://alexrivers.example.com',
    },
    roadmap: {
      enabled: true,
      items: [
        { id: 'rm-1', text: 'Cloud synchronization with Supabase backend', completed: false },
        { id: 'rm-2', text: 'Custom recurring task intervals', completed: false },
        { id: 'rm-3', text: 'Dark and light high-contrast themes', completed: true },
        { id: 'rm-4', text: 'Keyboard shortcuts for rapid task creation', completed: true },
      ],
    },
  },
};

export const INITIAL_EMPTY_PROJECT: ProjectState = {
  template: 'professional',
  badgeStyle: 'flat-square',
  projectName: '',
  shortDescription: '',
  detailedDescription: '',
  githubUrl: '',
  demoUrl: '',
  authorName: '',
  authorGithub: '',
  includeBadges: true,
  technologies: [],
  features: [],
  installation: {
    prerequisites: 'Node.js (v18.0 or later)\nnpm / pnpm / yarn',
    cloneCommand: 'git clone https://github.com/username/project-name.git\ncd project-name',
    installCommand: 'npm install',
    envSetup: '',
    devCommand: 'npm run dev',
  },
  usage: {
    instructions: '',
    codeExample: '',
    codeLanguage: 'bash',
  },
  sections: {
    screenshots: {
      enabled: false,
      items: [],
    },
    projectStructure: {
      enabled: false,
      tree: '',
    },
    contributing: {
      enabled: true,
      text: 'Contributions, issues, and feature requests are welcome! Feel free to check the issues page.',
      includeCodeOfConduct: false,
    },
    license: {
      enabled: true,
      type: 'MIT',
      year: new Date().getFullYear().toString(),
      author: '',
    },
    acknowledgements: {
      enabled: false,
      items: [],
    },
    contact: {
      enabled: false,
      email: '',
      twitter: '',
      linkedin: '',
      website: '',
    },
    roadmap: {
      enabled: false,
      items: [],
    },
  },
};
