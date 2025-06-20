import React, { useState, useEffect } from 'react';

const TentangKamiSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('tentang-kami');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="tentang-kami"
      className='relative min-h-[600px] md:h-[700px] bg-gradient-to-br from-gray-50 to-white overflow-hidden'
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-50/30 to-transparent"></div>
        {/* Animated Background Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-teal-200 rounded-full opacity-30 animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-teal-300 rounded-full opacity-10 animate-ping delay-500"></div>
        
        {/* Pattern Overlay (untuk gambar pattern nanti) */}
        <img 
          src="/src/img/islamic-pattern.png" 
          alt="Background Pattern" 
          className="absolute inset-0 w-full h-full object-cover opacity-3 scale-110"
          onError={(e) => e.target.style.display = 'none'}
        />
      </div>

      <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center min-h-[600px] md:h-[700px] px-4 sm:px-6 lg:px-8 relative z-10 py-16'>
        
        {/* Left Column - Content */}
        <div className={`w-full lg:w-1/2 space-y-8 mb-16 lg:mb-0 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}>
          
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-teal-100 rounded-full">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-teal-700 text-sm font-semibold tracking-wide uppercase">
              Tentang Kami
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              Kajian
            </span>
            <br />
            <span className="text-gray-800">Genggam</span>
          </h1>
          
          {/* Description */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Kami percaya bahwa <span className="font-semibold text-teal-700">ilmu agama</span> seharusnya mudah diakses oleh siapa saja.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              KajianGenggam hadir untuk menyajikan ceramah dan kajian Islami secara ringkas, 
              terpercaya, dan praktis—langsung dari genggaman Anda di mana pun dan kapan pun.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-gray-600 font-medium">Mudah Diakses</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-gray-600 font-medium">Terpercaya</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-gray-600 font-medium">Praktis</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-gray-600 font-medium">Inspiratif</span>
            </div>
          </div>
        </div>
        {/* Right Column - Images */}
        <div className={`w-full lg:w-1/2 flex justify-center lg:justify-end relative transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          
          <div className="relative flex flex-col items-center space-y-6 w-full max-w-sm">
            
            {/* Top Image - Woman */}
            <div className="relative transform hover:scale-105 transition-transform duration-500 -mr-50 -mt-2.5">
              <div className="relative overflow-hidden rounded-3xl shadow-xl bg-white p-3">
                <img 
                  src="/src/img/women.png" 
                  alt="Woman in hijab studying" 
                  className="w-35 h-35 md:w-40 md:h-40 object-cover rounded-xl"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzEyNy45MDkgMTAwIDExMCAxMTcuOTA5IDExMCAxNDBTMTI3LjkwOSAxODAgMTUwIDE4MFMxOTAgMTYyLjA5MSAxOTAgMTQwUzE3Mi4wOTEgMTAwIDE1MCAxMDBaIiBmaWxsPSIjMTRCOEE2Ii8+CjxwYXRoIGQ9Ik0xNTAgMjAwQzEyMi4zODYgMjAwIDEwMCAyMjIuMzg2IDEwMCAyNTBIMjAwQzIwMCAyMjIuMzg2IDE3Ny42MTQgMjAwIDE1MCAyMDBaIiBmaWxsPSIjMTRCOEE2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3Mjg0IiBmb250LXNpemU9IjE0Ij5Xb21hbiBpbiBoaWphYjwvdGV4dD4KPHN2Zz4K';
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-3 rounded-2xl bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Decorative elements for main image */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-teal-400 rounded-full animate-bounce delay-700"></div>
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-teal-300 rounded-full animate-pulse delay-1000"></div>
            </div>

            {/* Bottom Image - Mosque */}
            <div className={`relative transform transition-all duration-700 delay-500 hover:scale-105 -ml-50 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white p-2">
                <img 
                  src="/src/img/mosque.jpg" 
                  alt="Beautiful mosque" 
                  className="w-35 h-35 md:w-40 md:h-40 object-cover rounded-xl"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNDBMMTIwIDEwTDEwMCAwTDgwIDEwTDEwMCA0MFoiIGZpbGw9IiMxNEI4QTYiLz4KPHJlY3QgeD0iNDAiIHk9IjQwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMTRCOEE2IiBvcGFjaXR5PSIwLjciLz4KPGNpcmNsZSBjeD0iNjAiIGN5PSIxMDAiIHI9IjE1IiBmaWxsPSIjMURBMTg4Ii8+CjxjaXJjbGUgY3g9IjE0MCIgY3k9IjEwMCIgcj0iMTUiIGZpbGw9IiMxREExODgiLz4KPHJlY3QgeD0iODAiIHk9IjEyMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMUJBMTg5Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3Mjg0IiBmb250LXNpemU9IjEyIj5Nb3NxdWU8L3RleHQ+Cjwvc3ZnPgo=';
                  }}
                />
                <div className="absolute inset-2 rounded-xl bg-gradient-to-t from-teal-900/20 to-transparent pointer-events-none"></div>
              </div>
              {/* Small decorative dot */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-teal-500 rounded-full animate-ping"></div>
            </div>

            {/* Background decorative shapes */}
            <div className="absolute top-1/4 -right-12 w-16 h-16 bg-gradient-to-br from-teal-200 to-teal-300 rounded-full opacity-30 animate-pulse delay-300"></div>
            <div className="absolute -top-8 -left-8 w-10 h-10 bg-gradient-to-br from-teal-300 to-teal-400 rounded-full opacity-40 animate-bounce delay-1500"></div>
            <div className="absolute bottom-1/4 -left-6 w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full opacity-25 animate-pulse delay-800"></div>
          </div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#14B8A6"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#14B8A6"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#14B8A6"></path>
        </svg>
      </div>
    </section>
  );
};

export default TentangKamiSection;