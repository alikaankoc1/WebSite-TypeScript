import { GraduationCap, Code2, Briefcase, Icon } from 'lucide-react'; 
import { useLanguage } from './LanguageContext'; 

interface ExperienceCardProps {
  isDark: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
}

function ExperienceCard({ isDark, icon, title, description, details }: ExperienceCardProps) {
  return (
    <div className={`relative group rounded-3xl overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl ${isDark ? '' : ''}`}>
      {/* thin gradient bar at the very top that appears on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Make every card the same height so the 'Eğitim' card won't be taller than the others */}
      <div className={`p-6 md:p-8 h-64 md:h-72 flex flex-col justify-between ${isDark ? 'bg-dark-tertiary' : 'bg-white'} border ${isDark ? 'border-dark-tertiary' : 'border-gray-200'} rounded-2xl`}>
        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 ${isDark ? 'bg-blue-500/20' : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'}`}>
          <div className={isDark ? 'text-blue-400' : 'text-white'}>
            {icon}
          </div>
        </div>

        <div className="flex-1">
          <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {details}
          </p>
          {/* <span className="text-sm opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity duration-300">Daha fazla</span> */}
        </div>
      </div>
    </div>
  );
}
const getIconComponent = (iconType: string): Icon => {
  switch (iconType) {
    case 'GraduationCap': return GraduationCap;
    case 'Code2': return Code2;
    case 'Briefcase': return Briefcase;
    default: return Code2;
  }
};

interface ExperienceProps {
  isDark: boolean;
}

export function Experience({ isDark }: ExperienceProps) {
  // Context'ten dinamik kart verilerini çekiyoruz
  const { experienceCardsContent } = useLanguage();
  const experiences = experienceCardsContent.cards;

  return (
    <section className={`${isDark ? 'bg-dark-secondary' : 'bg-gray-50'} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => {
            const IconComponent = getIconComponent(exp.iconType);
            return (
              <ExperienceCard
                key={index}
                isDark={isDark}
                // DİNAMİK İKON EKLEME
                icon={<IconComponent size={28} />}
                // DİNAMİK METİNLER
                title={exp.title} 
                description={exp.description} 
                details={exp.details}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}