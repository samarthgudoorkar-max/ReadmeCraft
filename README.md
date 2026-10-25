# ReadmeCraft

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Deployment: GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Live_Demo-2ea44f?style=flat-square&logo=github&logoColor=white)](https://samarthgudoorkar-max.github.io/ReadmeCraft/)

**Beautiful GitHub READMEs, without the hassle.**

A modern, fast, and accessible developer productivity tool to design, customize, and export professional GitHub README documentation through a real-time split-screen interface.

[**Live Demo**](https://samarthgudoorkar-max.github.io/ReadmeCraft/) • [**Report Bug**](https://github.com/samarthgudoorkar-max/ReadmeCraft/issues) • [**Request Feature**](https://github.com/samarthgudoorkar-max/ReadmeCraft/issues)

</div>

---

## 📖 Overview

Writing a compelling, clean, and comprehensive `README.md` is often time-consuming. Developers frequently copy outdated snippets, struggle with Markdown formatting tables or Shields.io badge URLs, or forget crucial sections such as prerequisites, environmental setup, contribution rules, or license disclaimers.

**ReadmeCraft** solves this by providing a clean, distraction-free visual builder inspired by high-end developer tools like Linear, Raycast, and Vercel. With interactive categorized technology pickers, feature reordering, live GitHub repository metadata import, instant Markdown generation, and real-time live preview, creating an industry-standard open source or portfolio README takes under two minutes.

---

## ✨ Features

- **⚡ Real-Time Split Workspace:** Side-by-side editing and GitHub-styled Markdown preview that updates keystroke-by-keystroke.
- **🎨 3 Distinct Templates:**
  - **Minimal:** Focused, concise README for micro-packages, scripts, and libraries.
  - **Professional (Default):** Complete portfolio/SaaS showcase with badges, screenshots, architecture tree, features, and social contact.
  - **Open Source:** Contributor-first format featuring a dynamic Table of Contents, build badges, contribution guidelines, Code of Conduct, and acknowledgements.
- **🔍 Public GitHub Repository Import:**
  - Paste any public repository link or `owner/repo` slug (e.g., `facebook/react`, `samarthgudoorkar-max/campus-portal`).
  - Fetches repository name, description, primary language, license, stargazers, and topics using the public GitHub REST API without requiring any auth token.
  - Granular control over which imported fields to merge.
- **🛠️ Categorized Tech Stack Selector:**
  - 30+ predefined technologies (React, Vue, Next.js, FastAPI, Node.js, PostgreSQL, Docker, etc.) across Frontend, Backend, Languages, Databases, and DevOps.
  - Custom technology input with auto-generated Shields.io badges.
  - 3 badge styling modes: `flat-square`, `flat`, and `for-the-badge`.
- **🔀 Reorderable Feature List:** Add, edit, remove, and reorder features using up/down arrow controls.
- **🖼️ Screenshots & Media Gallery:** Add screenshots and GIF demonstrations with captions and image preview thumbnails.
- **📂 Architecture Tree & Optional Sections:**
  - ASCII project directory tree with a one-click sample template generator.
  - Contribution guidelines with optional Contributor Code of Conduct pledge.
  - License selector (MIT, Apache 2.0, GPL-3.0, BSD-3-Clause, Unlicense) with year and author attribution.
  - Interactive Roadmap checklist with completion status.
  - Social media and developer contact links (Email, Twitter/X, LinkedIn, Website).
  - Acknowledgements and credits list.
- **📋 Single-Click Copy & Download:**
  - Copy formatted Markdown directly to clipboard with visual feedback.
  - Download valid UTF-8 `README.md` files ready to commit to GitHub.
- **💾 Local Draft Persistence:** Automatic real-time save to browser `localStorage` with draft restoration and safe reset confirmation.
- **🌓 Dark & Light Mode:** Tailored slate & indigo developer aesthetic with persistent theme preference.
- **📱 Fully Responsive:** Clean dual-column layout on desktop and fluid tab-based switcher on mobile devices.

---

## 📸 Screenshots

```
+---------------------------------------------------------------------------------------+
|  ReadmeCraft PRO      [ Template: Professional ]  [ Load Sample ] [ Import GitHub ] 🌓 |
+-------------------------------------------+-------------------------------------------+
|  README EDITOR                            |  LIVE PREVIEW                             |
|                                           |                                           |
|  > Basic Project Information              |  # TaskFlow                               |
|    Project Name: TaskFlow                 |  > A lightweight task management app...   |
|    Tagline: ...                           |                                           |
|                                           |  ## 🛠️ Built With                         |
|  > Technologies & Badges (4)              |  [React] [TypeScript] [Tailwind] [Vite]   |
|    [React x] [TypeScript x]               |                                           |
|                                           |  ## ✨ Key Features                        |
|  > Key Features (5)                       |  - Create and manage tasks                |
|    1. [^][v] Create and manage tasks...   |  - Set task priorities                    |
|                                           |                                           |
|  > Installation & Setup                   |  ## 🚀 Getting Started                    |
|    Clone: git clone ...                   |  ```bash                                  |
|    Install: npm install                   |  npm install                              |
|                                           |  npm run dev                              |
|  [ Reset Draft ]  [ Load TaskFlow Sample] |  [ Copy Markdown ] [ Download README.md ] |
+-------------------------------------------+-------------------------------------------+
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Declarative user interface with functional components and hooks |
| **TypeScript 5.6** | Static typing, interface definitions, and compile-time correctness |
| **Vite 5.4** | Ultra-fast modern build tooling and Hot Module Replacement (HMR) |
| **Tailwind CSS 3.4** | Utility-first styling engine with slate-and-indigo developer design system |
| **Lucide React** | Consistent, lightweight SVG iconography |
| **react-markdown** | Safe Markdown rendering engine |
| **remark-gfm** | GitHub Flavored Markdown (GFM) tables, strikethrough, and task lists |
| **Vitest** | Unit testing for URL parsing and Markdown generation engines |

---

## 🚀 Installation & Setup

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm** (comes with Node), **pnpm**, or **yarn**

### Quickstart

1. **Clone the repository:**
   ```bash
   git clone https://github.com/samarthgudoorkar-max/ReadmeCraft.git
   cd ReadmeCraft
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Run unit tests:**
   ```bash
   npm test
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 💡 Usage Guide

1. **Start with Sample Data or Empty Draft:**
   - Click **Load Sample** in the top navigation to explore with the realistic **TaskFlow** project.
   - Or click **Reset Draft** to start from a clean slate.
2. **Import an Existing GitHub Repo (Optional):**
   - Click **Import GitHub** in the top bar.
   - Enter any public repository URL (e.g. `https://github.com/facebook/react` or `owner/repo`).
   - Click **Fetch** and select the fields you wish to import.
3. **Customize Sections:**
   - Add technologies from predefined chips or type custom libraries.
   - Reorder features using the up/down arrows.
   - Configure prerequisites, clone steps, and dev server commands.
   - Toggle optional sections: Project Architecture Tree, Contributing guidelines, Roadmap, and Social Contact info.
4. **Choose Template:**
   - Switch between **Minimal**, **Professional**, and **Open Source** from the top bar.
5. **Export Your README:**
   - Click **Copy** to copy formatted Markdown straight to your clipboard.
   - Click **Download README.md** to download the ready-to-commit file.

---

## 🏗️ Architecture Overview

The codebase is organized cleanly according to single-responsibility and modular design principles:

```
ReadmeCraft/
├── public/
│   └── favicon.svg           # Custom branded vector favicon
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   └── BrandIcons.tsx        # High-precision SVG brand icons (GitHub, Twitter)
│   │   ├── EditorPanel.tsx           # Accordion editor orchestrator
│   │   ├── FeaturesEditor.tsx        # Reorderable bullet points manager
│   │   ├── GitHubImportModal.tsx     # GitHub REST API fetch & merge dialog
│   │   ├── Navbar.tsx                # Brand header, template picker, actions
│   │   ├── OptionalSections.tsx      # Structure, License, Contact, Roadmap toggles
│   │   ├── PreviewPanel.tsx          # Dual-tab live markdown preview & raw code
│   │   ├── ResetConfirmModal.tsx     # Safe draft reset confirmation
│   │   ├── ScreenshotsEditor.tsx     # Image media manager
│   │   ├── TechStackSelector.tsx     # Categorized tech picker & badge generator
│   │   └── Toast.tsx                 # Non-blocking user notifications
│   ├── constants/
│   │   └── sampleProject.ts          # TaskFlow sample & initial state defaults
│   ├── hooks/
│   │   └── useLocalStorage.ts        # Typed, safe localStorage hook
│   ├── lib/
│   │   ├── __tests__/                # Vitest unit test suite
│   │   │   ├── generateMarkdown.test.ts
│   │   │   └── github.test.ts
│   │   ├── generateMarkdown.ts       # Pure TypeScript Markdown generation engine
│   │   ├── github.ts                 # URL parser & GitHub REST API client
│   │   ├── technologies.ts           # Predefined tech database & shields specs
│   │   └── templates.ts              # Template definitions & metadata
│   ├── types/
│   │   └── project.ts                # TypeScript domain models & interfaces
│   ├── App.tsx                       # Root container, layout & state orchestrator
│   ├── index.css                     # Tailwind layers & GitHub markdown theme
│   └── main.tsx                      # React DOM mounting entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚢 Deployment on Vercel

ReadmeCraft is fully optimized for static zero-configuration deployment on [Vercel](https://vercel.com).

### Deploy with Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Deploy via GitHub:
1. Push your repository to GitHub.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
3. Import `ReadmeCraft`.
4. Keep the default settings:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**.

---

## 🗺️ Future Improvements

- [ ] Export directly to GitHub as a pull request or commit via GitHub OAuth
- [ ] Drag-and-drop section reordering
- [ ] Export as HTML and PDF documentation
- [ ] Live preview comparison with actual repository issues and releases
- [ ] Additional specialized templates (e.g. AI/ML Model Card, Data Science Notebook, Browser Extension)

---

## 📜 License

Distributed under the **MIT** License. See `LICENSE` for more information.

Copyright (c) 2026 ReadmeCraft Authors.
