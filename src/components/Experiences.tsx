// Experiences.tsx

import { MapPin, Calendar } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface ExperiencesProps {
  isDark: boolean;
}

export function Experiences({ isDark }: ExperiencesProps) {
  const { experiencesContent } = useLanguage();
  const { sectionTitle, experiences } = experiencesContent;

  return (
    <section className={`${isDark ? 'bg-dark-secondary' : 'bg-gray-50'} py-20`}>
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

        {/* Experience Timeline */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-l-4 transition-all duration-300 ${
                isDark
                  ? 'bg-dark-tertiary/50 border-blue-500 hover:bg-dark-tertiary'
                  : 'bg-white border-blue-600 hover:shadow-xl'
              }`}
            >
              {/* Header with Title and Date */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {exp.title} {/* DİNAMİK METİN */}
                  </h3>
                  <a
                    href=""
                    
                    className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
                  >
                    {exp.company} {/* DİNAMİK METİN */}
                  </a>
                </div>
                <div className={`flex items-center gap-2 whitespace-nowrap ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Calendar size={18} />
                  <span className="font-medium">{exp.date}</span> {/* DİNAMİK METİN */}
                </div>
              </div>

              {/* Location */}
              <div className={`flex items-center gap-2 mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <MapPin size={18} />
                <span>{exp.location}</span> {/* DİNAMİK METİN */}
              </div>

              {/* Description */}
              <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                {exp.description} {/* DİNAMİK METİN */}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}