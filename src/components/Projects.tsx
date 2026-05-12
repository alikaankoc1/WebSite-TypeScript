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
    noImageLabel,
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
    <section className={`${isDark ? 'bg-dark' : 'bg-white'} py-12 sm:py-16 md:py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-1 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {sectionTitle} {/* DİNAMİK METİN */}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 px-1">
          {filterKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveFilter(key)}
              className={`
                px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 min-h-[44px] sm:min-h-0
                ${activeFilter === key
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : isDark
                    ? 'bg-dark-secondary text-gray-400 hover:bg-dark-tertiary hover:text-white active:bg-dark-tertiary'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-200'
                }
              `}
            >
              {filterLabels[key]} {/* DİNAMİK METİN */}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`min-w-0 flex flex-col rounded-2xl overflow-hidden shadow-xl transition-shadow duration-300 md:transition-transform md:hover:scale-[1.02] ${
                  isDark ? 'bg-dark-secondary hover:shadow-blue-500/30' : 'bg-white hover:shadow-2xl'
                }`}
              >
                {/* Görsel: tüm genişliklerde alanı doldurur; mobilde biraz daha alçak, tablet+ standart */}
                <div
                  className={`relative aspect-[5/3] w-full min-h-[11.5rem] sm:min-h-[12.5rem] md:aspect-auto md:h-52 overflow-hidden shrink-0 ${
                    isDark ? 'bg-zinc-950' : 'bg-gray-200'
                  }`}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 block h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700/50">
                      <span className="text-sm font-medium text-gray-300">{noImageLabel}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
                  <span
                    className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full mb-2 sm:mb-3 inline-block w-fit max-w-full ${
                      isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {filterLabels[project.category]} {/* Kategori Etiketi (DİNAMİK) */}
                  </span>
                  <h3
                    className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 line-clamp-2 leading-snug ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {project.title} {/* DİNAMİK METİN */}
                  </h3>
                  <p
                    className={`text-sm sm:text-base mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-4 grow leading-relaxed ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {project.description} {/* DİNAMİK METİN */}
                  </p>

                  {/* Buttons: mobilde tam genişlik satır; tablet+ yan yana */}
                  <div className="mt-auto flex flex-col gap-2.5 sm:flex-row sm:gap-3 md:gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors sm:py-2 sm:text-base ${
                          isDark
                            ? 'bg-dark-tertiary hover:bg-dark-tertiary/80 text-gray-300 active:opacity-90'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700 active:opacity-90'
                        }`}
                      >
                        <Github className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" />
                        <span>{codeButton}</span>
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-lg active:opacity-95 sm:py-2 sm:text-base"
                      >
                        <ExternalLink className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" />
                        <span>{visitButton}</span>
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