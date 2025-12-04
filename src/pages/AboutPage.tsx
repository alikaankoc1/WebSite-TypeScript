import { Navbar, Stats, About, Experiences, Certificates, Footer } from '../components';

interface AboutPageProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export function AboutPage({ isDark, setIsDark }: AboutPageProps) {
  return (
    <div className={isDark ? 'dark' : ''}>
      <div className={`${isDark ? 'bg-dark text-white' : 'bg-white text-gray-900'} transition-colors duration-300 min-h-screen flex flex-col`}>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <div className="flex-1">
          <About isDark={isDark} />
          <Experiences isDark={isDark} />
          <Certificates isDark={isDark} />
        </div>
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}
