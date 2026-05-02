import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components';
import { useLanguage } from '../components/LanguageContext';

interface NotFoundPageProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export function NotFoundPage({ isDark, setIsDark }: NotFoundPageProps) {
  const { notFoundContent } = useLanguage();

  return (
    <div className={isDark ? 'dark' : ''}>
      <div
        className={`${isDark ? 'bg-dark text-white' : 'bg-white text-gray-900'} transition-colors duration-300 min-h-screen flex flex-col`}
      >
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <div className="flex-1 flex items-center justify-center px-4 py-24">
          <div className="text-center max-w-md">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-500 mb-2">
              404
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{notFoundContent.title}</h1>
            <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {notFoundContent.description}
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all"
            >
              {notFoundContent.homeLink}
            </Link>
          </div>
        </div>
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}
