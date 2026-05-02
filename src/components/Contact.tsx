import { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Send, GraduationCap } from 'lucide-react';
import { useLanguage } from './LanguageContext'; 

interface ContactProps {
  isDark: boolean;
}

const contactIconMap = {
  Mail,
  Github,
  Linkedin,
  MapPin,
  GraduationCap,
} as const;

export function Contact({ isDark }: ContactProps) {
  const { contactContent } = useLanguage(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const contactEndpoint = (() => {
    const base = import.meta.env.VITE_CONTACT_API_URL?.trim();
    if (base) {
      return `${base.replace(/\/$/, '')}/api/gonder`;
    }
    return '/api/gonder';
  })();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setStatus('error');
        return;
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3500);
    } catch {
      setStatus('error');
    }
  };

  const getButtonText = () => {
    if (status === 'loading') return contactContent.formSending;
    if (status === 'success') return contactContent.submittedMessage;
    if (status === 'error') return contactContent.formRetry;
    return contactContent.submitButton;
  };

  return (
    <section className={`${isDark ? 'bg-dark' : 'bg-white'} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {/* Dinamik Başlık */}
            {contactContent.sectionTitle} 
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {/* Dinamik Açıklama */}
            {contactContent.description} 
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {contactContent.contactInfo.map((info, index) => {
                const Icon = contactIconMap[info.iconType];
                return (
                <a
                  key={index}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-lg ${
                    isDark
                      ? 'bg-dark-tertiary border-dark-tertiary hover:border-blue-500/50'
                      : 'bg-gray-50 border-gray-200 hover:border-blue-500'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {info.title}
                    </h3>
                    <p className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {info.value}
                    </p>
                  </div>
                </a>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl border p-6 md:p-8 ${
              isDark
                ? 'bg-dark-tertiary border-dark-tertiary'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {/* Dinamik Form Başlığı */}
                {contactContent.formTitle}
              </h3>

              {/* FORM ETİKETİ */}
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {/* Dinamik Label */}
                      {contactContent.nameLabel} *
                    </label>
                    <input
                      type="text"
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      // Dinamik Placeholder
                      placeholder={contactContent.namePlaceholder}
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark
                          ? 'bg-dark-secondary border-dark-tertiary text-white placeholder-gray-500'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {/* Dinamik Label */}
                      {contactContent.emailLabel} *
                    </label>
                    <input
                      type="email"
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      // Dinamik Placeholder
                      placeholder={contactContent.emailPlaceholder}
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark
                          ? 'bg-dark-secondary border-dark-tertiary text-white placeholder-gray-500'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {/* Dinamik Label */}
                    {contactContent.subjectLabel} *
                  </label>
                  <input
                    type="text"
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    // Dinamik Placeholder
                    placeholder={contactContent.subjectPlaceholder}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark
                        ? 'bg-dark-secondary border-dark-tertiary text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {/* Dinamik Label */}
                    {contactContent.messageLabel} *
                  </label>
                  <textarea
                    name="message" // KRİTİK
                    value={formData.message}
                    onChange={handleChange}
                    // Dinamik Placeholder
                    placeholder={contactContent.messagePlaceholder}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      isDark
                        ? 'bg-dark-secondary border-dark-tertiary text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:-translate-y-1"
                >
                  <Send size={18} />
                  {/* Dinamik Buton Metni */}
                  {getButtonText()} 
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}