import { Navbar, Hero, Experience, Stats, CTA, Footer } from '../components';

interface HomePageProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export function HomePage({ isDark, setIsDark }: HomePageProps) {
  return (
    <div className={isDark ? 'dark' : ''}>
      <div className={`${isDark ? 'bg-dark text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <Hero isDark={isDark} profileImage="/profile.jpg" />
        <Experience isDark={isDark} />
        <Stats isDark={isDark} />
        <CTA isDark={isDark} />
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}
