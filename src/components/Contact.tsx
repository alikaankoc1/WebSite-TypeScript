import { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Send, GraduationCap, Phone } from 'lucide-react';
import { useLanguage } from './LanguageContext'; 

interface ContactProps {
  isDark: boolean;
}

export function Contact({ isDark }: ContactProps) {
  const { contactContent, aboutContent } = useLanguage(); 
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
  const encode = (data: { [key: string]: string }) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === 'loading') return; 

    setStatus('loading'); 
    const formName = "contact";
    const dataToSend = {
      "form-name": formName, 
      ...formData 
    };

    try {
        const response = await fetch("/", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
            body: encode(dataToSend), 
        });

        if (response.ok) {
            setStatus('success');
            // Formu temizle
            setFormData({ name: '', email: '', subject: '', message: '' }); 
        } else {
            setStatus('error');
            console.error('Netlify Form Hatası:', response.statusText);
            alert('Mesaj gönderilemedi: Netlify Form servisinde bir hata oluştu.'); 
        }
    } catch (error) {
        setStatus('error');
        console.error('Ağ Hatası:', error);
        alert('Mesaj gönderilemedi: Lütfen internet bağlantınızı kontrol edin.');
    }
    if (status === 'success') { 
        setTimeout(() => {
            setStatus('idle');
        }, 4000);
    }
  };
  
  
  const getButtonText = () => {
    if (status === 'loading') return 'Gönderiliyor...';
    if (status === 'success') return 'Mesaj İletildi! ✅';
    if (status === 'error') return 'Tekrar Dene ❌';
    return contactContent.submitButton;
  };

  const contactInfo = [
    
    {
      icon: <Mail size={24} />,
      title: contactContent.emailLabel,
      value: 'alikaansoftdev@gmail.com',
      link: 'mailto:alikaansoftdev@gmail.com',
    },
    {
      icon: <Github size={24} />,
      title: 'GitHub',
      value: 'github.com/alikaankoc1',
      link: 'https://github.com/alikaankoc1',
    },
    {
      icon: <Linkedin size={24} />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/alikaankoc',
      link: 'https://linkedin.com/in/alikaankoc',
    },
    {
      icon: <GraduationCap size={24} />,
     
      title: aboutContent.educationTitle, 
      value: aboutContent.educationUniversity,
      link: '#', 
    },
    {
      icon: <MapPin size={24} />,
      title: contactContent.infoLocation,
      value: contactContent.address,
      link: '#',
    },
    // {
    //   icon: <Phone size={24} />,
    //   title: 'Telefon', 
    //   value: contactContent.phone,
    //   link: `tel:${contactContent.phone}`,
    // },
  ];

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
              {contactInfo.map((info, index) => (
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
                    {info.icon}
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
              ))}
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
              <form 
                  name="contact"
                  data-netlify="true" 
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit} 
                  className="space-y-4 md:space-y-6"
              >
                
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                    <label>
                        Don’t fill this out if you’re human: <input name="bot-field" onChange={handleChange} />
                    </label>
                </p>

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
                  className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    status === 'success' 
                      ? 'bg-green-500 text-white hover:shadow-lg hover:-translate-y-1'
                      : status === 'error' 
                      ? 'bg-red-500 text-white hover:shadow-lg hover:-translate-y-1'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:-translate-y-1'
                  }`}
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