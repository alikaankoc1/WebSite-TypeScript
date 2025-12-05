// Certificates.tsx

import { Award, Download } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useCallback } from 'react';

interface CertificatesProps {
  isDark: boolean;
}

export function Certificates({ isDark }: CertificatesProps) {
  const { certificatesContent } = useLanguage();
  const { sectionTitle, certificates, cvDownloadButton } = certificatesContent;

  // CV indirme fonksiyonu
  const handleDownloadCV = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/Ali_Kaan_Koc_Computer_Engineer.pdf"; 
    link.download = "Ali_Kaan_Koc_Computer_Engineer.pdf";
    link.click();
  }, []);

  return (
    <section className={`${isDark ? "bg-dark" : "bg-white"} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {sectionTitle}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${
                isDark
                  ? "bg-dark-secondary hover:shadow-blue-500/30"
                  : "bg-white hover:shadow-xl"
              }`}
            >
              {/* Image and Icon */}
              <div className="relative aspect-video bg-gray-200">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />

                <div
                  className={`absolute top-4 left-4 w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDark ? "bg-blue-500/20" : "bg-blue-100"
                  }`}
                >
                  <Award
                    className={isDark ? "text-blue-400" : "text-blue-600"}
                    size={20}
                  />
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-6">
                <h3
                  className={`text-lg font-bold mb-2 line-clamp-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {cert.title}
                </h3>

                <p
                  className={`text-sm mb-3 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {cert.issuer}
                </p>

                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                  {cert.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CV Download Button */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={handleDownloadCV}
            aria-label={cvDownloadButton}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-2xl text-white font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            {cvDownloadButton}
            <Download size={24} />
          </button>
        </div>

      </div>
    </section>
  );
}
