// Hero.tsx

import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext'; 

interface HeroProps {
  isDark: boolean;
  profileImage: string;
}

export function Hero({ isDark, profileImage }: HeroProps) {
  const { heroContent } = useLanguage(); 

  return (
    <section className={`${isDark ? 'bg-dark' : 'bg-gradient-to-br from-gray-50 to-gray-100'} min-h-screen flex items-center`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Greeting Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              isDark ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-blue-100 border border-blue-200'
            }`}>
              <span className="text-2xl">👋</span>
              <span className={`font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {heroContent.greeting} {/* DİNAMİK METİN */}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className={`text-5xl md:text-6xl font-bold leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {heroContent.titleFirstName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">{heroContent.titleLastName}</span> {/* DİNAMİK METİN */}
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {heroContent.titleProfession} {/* DİNAMİK METİN */}
              </p>
            </div>

            {/* Description */}
            <p className={`text-lg leading-relaxed max-w-lg ${
              isDark ? 'text-gray-400' : 'text-gray-700'
            }`}>
              {heroContent.description} {/* DİNAMİK METİN */}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/projeler" 
                className="group btn-primary flex items-center justify-center gap-2"
              >
                {heroContent.buttonProjects} {/* DİNAMİK METİN */}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/iletisim" 
                className={`btn-secondary flex items-center justify-center ${isDark ? 'text-white' : 'text-black'}`}
              >
                {heroContent.buttonContact} {/* DİNAMİK METİN */}
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
              <a href="https://github.com/alikaankoc1" target='blank' className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-blue-600 text-white' 
                  : 'bg-gray-200 hover:bg-blue-600 text-gray-700 hover:text-white'
              }`}>
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/alikaankoc/" target='blank' className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-blue-600 text-white' 
                  : 'bg-gray-200 hover:bg-blue-600 text-gray-700 hover:text-white'
              }`}>
                <Linkedin size={24} />
              </a>
              <a href="mailto:alikaansoftdev@gmail.com"  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-blue-600 text-white' 
                  : 'bg-gray-200 hover:bg-blue-600 text-gray-700 hover:text-white'
              }`}>
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className={`relative w-full max-w-md aspect-square ${isDark ? 'bg-dark-tertiary' : 'bg-gray-200'} rounded-3xl overflow-hidden shadow-2xl border-2 ${
              isDark ? 'border-dark-tertiary' : 'border-gray-300'
            }`}>
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Ali Kaan Koç"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center text-6xl ${isDark ? 'bg-dark-secondary' : 'bg-gray-300'}`}>
                  📸
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}