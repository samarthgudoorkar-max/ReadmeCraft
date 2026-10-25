import React, { useState } from 'react';
import {
  FolderTree,
  Users,
  Shield,
  Mail,
  ListTodo,
  Heart,
  Plus,
  Trash2,
} from 'lucide-react';
import { ProjectState, RoadmapItem } from '../types/project';

interface OptionalSectionsProps {
  state: ProjectState;
  onChange: (updater: (prev: ProjectState) => ProjectState) => void;
}

export const OptionalSections: React.FC<OptionalSectionsProps> = ({ state, onChange }) => {
  const [newRoadmapText, setNewRoadmapText] = useState('');
  const [newAckText, setNewAckText] = useState('');

  const toggleSection = (sectionKey: keyof ProjectState['sections']) => {
    onChange((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          enabled: !prev.sections[sectionKey].enabled,
        },
      },
    }));
  };

  const handleInsertSampleTree = () => {
    const sampleTree = `my-project/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── README.md`;
    onChange((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        projectStructure: {
          ...prev.sections.projectStructure,
          enabled: true,
          tree: sampleTree,
        },
      },
    }));
  };

  const handleAddRoadmap = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newRoadmapText.trim()) return;
    const newItem: RoadmapItem = {
      id: `rm-${Date.now()}`,
      text: newRoadmapText.trim(),
      completed: false,
    };
    onChange((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        roadmap: {
          ...prev.sections.roadmap,
          items: [...prev.sections.roadmap.items, newItem],
        },
      },
    }));
    setNewRoadmapText('');
  };

  const handleToggleRoadmapItem = (id: string) => {
    onChange((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        roadmap: {
          ...prev.sections.roadmap,
          items: prev.sections.roadmap.items.map((i) =>
            i.id === id ? { ...i, completed: !i.completed } : i
          ),
        },
      },
    }));
  };

  const handleRemoveRoadmapItem = (id: string) => {
    onChange((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        roadmap: {
          ...prev.sections.roadmap,
          items: prev.sections.roadmap.items.filter((i) => i.id !== id),
        },
      },
    }));
  };

  const handleAddAck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newAckText.trim()) return;
    onChange((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        acknowledgements: {
          ...prev.sections.acknowledgements,
          items: [...prev.sections.acknowledgements.items, newAckText.trim()],
        },
      },
    }));
    setNewAckText('');
  };

  const handleRemoveAck = (index: number) => {
    onChange((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        acknowledgements: {
          ...prev.sections.acknowledgements,
          items: prev.sections.acknowledgements.items.filter((_, i) => i !== index),
        },
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* 1. Project Structure Section */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-borderDark bg-white dark:bg-surfaceDark/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-semibold text-slate-800 dark:text-lightText">
              Project Structure
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={state.sections.projectStructure.enabled}
              onChange={() => toggleSection('projectStructure')}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {state.sections.projectStructure.enabled && (
          <div className="space-y-2 mt-3 pt-3 border-t border-slate-200 dark:border-borderDark">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500 dark:text-mutedText">
                ASCII directory tree or file breakdown:
              </span>
              <button
                type="button"
                onClick={handleInsertSampleTree}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Insert Sample Tree
              </button>
            </div>
            <textarea
              rows={6}
              value={state.sections.projectStructure.tree}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  sections: {
                    ...prev.sections,
                    projectStructure: {
                      ...prev.sections.projectStructure,
                      tree: e.target.value,
                    },
                  },
                }))
              }
              placeholder="project-root/&#10;├── src/&#10;└── package.json"
              className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        )}
      </div>

      {/* 2. Contributing Section */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-borderDark bg-white dark:bg-surfaceDark/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-semibold text-slate-800 dark:text-lightText">
              Contributing Guidelines
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={state.sections.contributing.enabled}
              onChange={() => toggleSection('contributing')}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {state.sections.contributing.enabled && (
          <div className="space-y-3 mt-3 pt-3 border-t border-slate-200 dark:border-borderDark">
            <textarea
              rows={4}
              value={state.sections.contributing.text}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  sections: {
                    ...prev.sections,
                    contributing: {
                      ...prev.sections.contributing,
                      text: e.target.value,
                    },
                  },
                }))
              }
              placeholder="Explain how developers can contribute, open issues, or submit PRs..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={state.sections.contributing.includeCodeOfConduct}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    sections: {
                      ...prev.sections,
                      contributing: {
                        ...prev.sections.contributing,
                        includeCodeOfConduct: e.target.checked,
                      },
                    },
                  }))
                }
                className="rounded border-slate-300 dark:border-borderDark text-indigo-600 focus:ring-indigo-500"
              />
              <span>Include Contributor Code of Conduct pledge</span>
            </label>
          </div>
        )}
      </div>

      {/* 3. License Section */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-borderDark bg-white dark:bg-surfaceDark/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-semibold text-slate-800 dark:text-lightText">
              License Information
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={state.sections.license.enabled}
              onChange={() => toggleSection('license')}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {state.sections.license.enabled && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-200 dark:border-borderDark">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                License Type
              </label>
              <select
                value={state.sections.license.type}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    sections: {
                      ...prev.sections,
                      license: {
                        ...prev.sections.license,
                        type: e.target.value,
                      },
                    },
                  }))
                }
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="MIT">MIT License</option>
                <option value="Apache-2.0">Apache 2.0</option>
                <option value="GPL-3.0">GNU GPL v3</option>
                <option value="BSD-3-Clause">BSD 3-Clause</option>
                <option value="Unlicense">Unlicense</option>
                <option value="None">None (All Rights Reserved)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Copyright Year
              </label>
              <input
                type="text"
                value={state.sections.license.year}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    sections: {
                      ...prev.sections,
                      license: {
                        ...prev.sections.license,
                        year: e.target.value,
                      },
                    },
                  }))
                }
                placeholder={new Date().getFullYear().toString()}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Author / Organization
              </label>
              <input
                type="text"
                value={state.sections.license.author}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    sections: {
                      ...prev.sections,
                      license: {
                        ...prev.sections.license,
                        author: e.target.value,
                      },
                    },
                  }))
                }
                placeholder={state.authorName || 'Project Author'}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* 4. Contact & Socials */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-borderDark bg-white dark:bg-surfaceDark/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-semibold text-slate-800 dark:text-lightText">
              Contact & Socials
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={state.sections.contact.enabled}
              onChange={() => toggleSection('contact')}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {state.sections.contact.enabled && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-200 dark:border-borderDark">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={state.sections.contact.email}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    sections: {
                      ...prev.sections,
                      contact: {
                        ...prev.sections.contact,
                        email: e.target.value,
                      },
                    },
                  }))
                }
                placeholder="developer@example.com"
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Twitter / X Handle
              </label>
              <input
                type="text"
                value={state.sections.contact.twitter}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    sections: {
                      ...prev.sections,
                      contact: {
                        ...prev.sections.contact,
                        twitter: e.target.value,
                      },
                    },
                  }))
                }
                placeholder="@username"
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                LinkedIn Profile / Username
              </label>
              <input
                type="text"
                value={state.sections.contact.linkedin}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    sections: {
                      ...prev.sections,
                      contact: {
                        ...prev.sections.contact,
                        linkedin: e.target.value,
                      },
                    },
                  }))
                }
                placeholder="linkedin-username"
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Personal / Company Website
              </label>
              <input
                type="url"
                value={state.sections.contact.website}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    sections: {
                      ...prev.sections,
                      contact: {
                        ...prev.sections.contact,
                        website: e.target.value,
                      },
                    },
                  }))
                }
                placeholder="https://mysite.com"
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. Roadmap Section */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-borderDark bg-white dark:bg-surfaceDark/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-semibold text-slate-800 dark:text-lightText">
              Roadmap & Milestones
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={state.sections.roadmap.enabled}
              onChange={() => toggleSection('roadmap')}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {state.sections.roadmap.enabled && (
          <div className="space-y-3 mt-3 pt-3 border-t border-slate-200 dark:border-borderDark">
            <form onSubmit={handleAddRoadmap} className="flex gap-2">
              <input
                type="text"
                value={newRoadmapText}
                onChange={(e) => setNewRoadmapText(e.target.value)}
                placeholder="Add milestone (e.g. Multi-language i18n support)..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={!newRoadmapText.trim()}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            <div className="space-y-1.5">
              {state.sections.roadmap.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-borderDark"
                >
                  <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleRoadmapItem(item.id)}
                      className="rounded border-slate-300 dark:border-borderDark text-indigo-600 focus:ring-indigo-500"
                    />
                    <span
                      className={`text-xs truncate ${
                        item.completed
                          ? 'line-through text-slate-400 dark:text-mutedText'
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {item.text}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveRoadmapItem(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 6. Acknowledgements */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-borderDark bg-white dark:bg-surfaceDark/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-semibold text-slate-800 dark:text-lightText">
              Acknowledgements & Credits
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={state.sections.acknowledgements.enabled}
              onChange={() => toggleSection('acknowledgements')}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {state.sections.acknowledgements.enabled && (
          <div className="space-y-3 mt-3 pt-3 border-t border-slate-200 dark:border-borderDark">
            <form onSubmit={handleAddAck} className="flex gap-2">
              <input
                type="text"
                value={newAckText}
                onChange={(e) => setNewAckText(e.target.value)}
                placeholder="e.g. Shields.io for dynamic status badges..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-borderDark text-slate-900 dark:text-lightText placeholder-slate-400 dark:placeholder-mutedText focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={!newAckText.trim()}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            <div className="space-y-1.5">
              {state.sections.acknowledgements.items.map((ack, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-borderDark text-xs text-slate-700 dark:text-slate-300"
                >
                  <span className="truncate">{ack}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAck(index)}
                    className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
