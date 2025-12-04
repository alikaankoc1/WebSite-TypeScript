import { Calendar, ArrowRight } from 'lucide-react';

import { useLanguage } from './LanguageContext'; 
interface BlogProps {
  isDark: boolean;
}
export function Blog({ isDark }: BlogProps) {
  const { blogContent, language } = useLanguage();
  const blogPosts = blogContent.blogPosts;
  const locale = language === 'tr' ? 'tr-TR' : 'en-US';

  return (
    <section className={`${isDark ? 'bg-dark' : 'bg-white'} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {/* Dinamik Başlık */}
            {blogContent.sectionTitle} 
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {/* Dinamik Açıklama */}
            {blogContent.sectionDescription}
          </p>
        </div>

        {/* Blog Posts */}
        {blogPosts.length > 0 ? (
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className={`rounded-2xl overflow-hidden border transition-all hover:shadow-xl group cursor-pointer ${
                  isDark
                    ? 'bg-dark-tertiary border-dark-tertiary'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="grid md:grid-cols-3 gap-0">
                  {/* Image */}
                  <div className={`md:col-span-1 h-48 md:h-56 lg:h-64 overflow-hidden relative ${
                    isDark ? 'bg-dark-secondary' : 'bg-gray-300'
                  }`}>
                    {post.image ? (
                      <>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* subtle overlay to keep text-readable and add polish */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        📝
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          isDark
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {post.category}
                        </span>
                        <span className={`text-xs flex items-center gap-1 ${
                          isDark ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          <Calendar size={14} />
                          {/* Tarihi dinamik olarak dile göre formatlıyoruz */}
                          {new Date(post.date).toLocaleDateString(locale, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className={`text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {post.title}
                      </h3>

                      <p className={`text-base leading-relaxed mb-4 ${
                        isDark ? 'text-gray-400' : 'text-gray-700'
                      }`}>
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/20">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                          {post.author.charAt(0)}
                        </div>
                        <span className={`text-sm font-semibold ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {post.author}
                        </span>
                      </div>
                      <button
                        className={"inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"}
                     
                        aria-label={`${blogContent.readButton}: ${post.title}`}
                      >
                        {/* Dinamik Oku Butonu */}
                        {blogContent.readButton}
                        <ArrowRight size={16} className="ml-1 transform transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {/* Dinamik Blog Yazısı Yok Mesajı */}
              {blogContent.noPostsMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}