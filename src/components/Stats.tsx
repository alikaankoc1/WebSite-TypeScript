// Stats.tsx

import { useLanguage } from './LanguageContext';
interface StatsProps {
  isDark: boolean;
}

export function Stats({ isDark }: StatsProps) {
  const { statsContent } = useLanguage();
  const { stats } = statsContent;

  return (
    <section className={`${isDark ? 'bg-dark-secondary' : 'bg-white'} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
                {stat.number} {/* DİNAMİK METİN */}
              </div>
              <div className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label} {/* DİNAMİK METİN */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}