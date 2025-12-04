// Footer.tsx

import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext'; // Dosya yolunuza göre ayarlayın (genellikle doğru)

export function Footer({ isDark }: { isDark: boolean }) {
  const { navContent, footerContent } = useLanguage(); 
  const navItems = [
    { label: navContent.home, href: '/' },
    { label: navContent.about, href: '/hakkimda' },
    { label: navContent.projects, href: '/projeler' },
    { label: navContent.blog, href: '/blog' },
    { label: navContent.contact, href: '/iletisim' },
  ];

  return (
    <footer className={`${isDark ? 'bg-dark-secondary' : 'bg-gray-900'} py-16 border-t ${isDark ? 'border-dark-tertiary' : 'border-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
              Ali Kaan Koç
            </h3>
            {/* DİNAMİK METİN: Tagline */}
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-300'}`}>
              {footerContent.tagline} 
            </p>
          </div>

          {/* Quick Links */}
          <div>
            {/* DİNAMİK METİN: Hızlı Bağlantılar Başlığı */}
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-100'}`}>
              {footerContent.quickLinks} 
            </h4>
            <ul className="space-y-2">
      
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`transition-colors hover:text-blue-400 ${
                      isDark ? 'text-gray-400' : 'text-gray-300'
                    }`}
                  >
                    {item.label} {/* DİNAMİK METİN */}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
           
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-100'}`}>
              İletişim
            </h4>
            <div className="flex gap-4">
          
              <a
                href="https://github.com/alikaankoc1"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  isDark
                    ? 'bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white'
                    : 'bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white'
                }`}
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/alikaankoc"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  isDark
                    ? 'bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white'
                    : 'bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white'
                }`}
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:alikaansoftdev@gmail.com"
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  isDark
                    ? 'bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white'
                    : 'bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white'
                }`}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${isDark ? 'border-dark-tertiary' : 'border-gray-800'} py-8`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* DİNAMİK METİN: Copyright */}
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {footerContent.copyRight} 
            </p>
            {/* <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Geliştirici: Ali Kaan Koç
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}