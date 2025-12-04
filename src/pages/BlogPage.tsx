import { Navbar, Blog, Footer } from '../components';

interface BlogPageProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export function BlogPage({ isDark, setIsDark }: BlogPageProps) {
  return (
    <div className={isDark ? 'dark' : ''}>
      <div className={`${isDark ? 'bg-dark text-white' : 'bg-white text-gray-900'} transition-colors duration-300 min-h-screen flex flex-col`}>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <div className="flex-1">
          <Blog isDark={isDark} />
        </div>
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}
