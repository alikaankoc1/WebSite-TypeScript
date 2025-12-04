// About.tsx

import { GraduationCap, Zap } from 'lucide-react';

import { useLanguage } from './LanguageContext'; 

interface AboutProps {
  isDark: boolean;
}

export function About({ isDark }: AboutProps) {
  const { aboutContent } = useLanguage();

  return (
    <section className={`${isDark ? 'bg-dark' : 'bg-white'} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-5xl font-bold mb-6 mt-1 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {aboutContent.sectionTitle} {/* DİNAMİK METİN */}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left - Who Am I */}
          <div>
            <h3 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {aboutContent.whoAmI} {/* DİNAMİK METİN */}
            </h3>
            <p className={`text-lg mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              {aboutContent.descriptionPara1} {/* DİNAMİK METİN */}
            </p>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              {aboutContent.descriptionPara2} {/* DİNAMİK METİN */}
            </p>
          </div>

          {/* Right - Education & Skills */}
          <div className="space-y-6">
            {/* Education Card */}
            <div className={`${isDark ? 'bg-dark-tertiary' : 'bg-gray-50'} rounded-2xl p-6 border ${isDark ? 'border-dark-tertiary' : 'border-gray-200'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isDark ? 'bg-blue-500/20' : 'bg-blue-100'
                }`}>
                  <GraduationCap className={isDark ? 'text-blue-400' : 'text-blue-600'} size={24} />
                </div>
                <div>
                  <h4 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {aboutContent.educationTitle} {/* DİNAMİK METİN */}
                  </h4>
                  <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {aboutContent.educationUniversity} {/* DİNAMİK METİN */}
                  </p>
                  <p className={`text-md ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {aboutContent.educationDegree} {/* DİNAMİK METİN */}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className={`${isDark ? 'bg-dark-tertiary' : 'bg-gray-50'} rounded-2xl p-6 border ${isDark ? 'border-dark-tertiary' : 'border-gray-200'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isDark ? 'bg-blue-500/20' : 'bg-blue-100'
                }`}>
                  <Zap className={isDark ? 'text-blue-400' : 'text-blue-600'} size={24} />
                </div>
                <div>
                  <h4 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {aboutContent.skillsTitle} {/* DİNAMİK METİN */}
                  </h4>
                  <ul className={`space-y-1 text-md ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• {aboutContent.skillWebDev}</li> {/* DİNAMİK METİN */}
                    <li>• {aboutContent.skillFrontend}</li> {/* DİNAMİK METİN */}
                    <li>• {aboutContent.skillBackend}</li> {/* DİNAMİK METİN */}
                    <li>• {aboutContent.skillArchitecture}</li> {/* DİNAMİK METİN */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}