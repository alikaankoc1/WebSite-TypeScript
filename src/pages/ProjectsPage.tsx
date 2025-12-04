import { Navbar, Projects, Footer } from '../components';

interface ProjectsPageProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export function ProjectsPage({ isDark, setIsDark }: ProjectsPageProps) {
  return (
    <div className={isDark ? 'dark' : ''}>
      <div className={`${isDark ? 'bg-dark text-white' : 'bg-white text-gray-900'} transition-colors duration-300 min-h-screen flex flex-col`}>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <div className="flex-1">
          <Projects isDark={isDark} />
        </div>
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}
