// Projects.tsx

import { useState, useMemo } from 'react'; // useMemo eklendi
import { Github, ExternalLink } from 'lucide-react';
import { useLanguage } from './LanguageContext';
type ProjectCategoryKey = 'All' | 'Web' | 'Mobile' | 'Backend' | 'Full Stack';

interface ProjectsProps {
  isDark: boolean;
}

export function Projects({ isDark }: ProjectsProps) {
  const { projectsContent } = useLanguage();
  const { 
    sectionTitle, 
    filterLabels, 
    codeButton, 
    visitButton, 
    noProjectsMessage, 
    projects 
  } = projectsContent;

  const [activeFilter, setActiveFilter] = useState<ProjectCategoryKey>('All');
  const filterKeys: ProjectCategoryKey[] = ['All', 'Web', 'Mobile', 'Backend', 'Full Stack'];
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter(project => project.category === activeFilter);
  }, [projects, activeFilter]);
  return (
    <section className={`${isDark ? 'bg-dark' : 'bg-white'} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {sectionTitle} {/* DİNAMİK METİN */}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`
                px-5 py-2 rounded-full font-medium transition-all duration-300
                ${activeFilter === key
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : isDark
                    ? 'bg-dark-secondary text-gray-400 hover:bg-dark-tertiary hover:text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {filterLabels[key]} {/* DİNAMİK METİN */}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  isDark ? 'bg-dark-secondary hover:shadow-blue-500/30' : 'bg-white hover:shadow-2xl'
                }`}
              >
                {/* Image */}
                <div className="w-full h-52 overflow-hidden rounded-t-2xl bg-gray-200">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700/50">
                        <span className="text-sm font-medium text-gray-300">Resim Yok</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 inline-block ${
                    isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {filterLabels[project.category]} {/* Kategori Etiketi (DİNAMİK) */}
                  </span>
                  <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title} {/* DİNAMİK METİN */}
                  </h3>
                  <p className={`mb-6 line-clamp-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description} {/* DİNAMİK METİN */}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors font-semibold ${
                          isDark
                            ? 'bg-dark-tertiary hover:bg-dark-tertiary/80 text-gray-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                      >
                        <Github size={16} />
                        <span className="hidden sm:inline">{codeButton}</span> {/* DİNAMİK METİN */}
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all font-semibold"
                      >
                        <ExternalLink size={16} />
                        <span className="hidden sm:inline">{visitButton}</span> {/* DİNAMİK METİN */}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {noProjectsMessage} {/* DİNAMİK METİN */}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}