import React, { useState, useEffect } from 'react';

const Hero = () => {
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

    const section = document.getElementById('hero-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="hero-section"
      className='relative min-h-[600px] md:h-[700px] bg-gradient-to-br from-slate-50 to-white overflow-hidden'
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 to-transparent"></div>
        {/* Animated Background Shapes */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-emerald-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-teal-200 rounded-full opacity-30 animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-emerald-300 rounded-full opacity-10 animate-ping delay-500"></div>
        
        {/* Islamic Pattern Overlay */}
        <img 
          src="/images/islamic-pattern.png" 
          alt="Background Pattern" 
          className="absolute inset-0 w-full h-full object-cover opacity-3 scale-110"
          onError={(e) => e.target.style.display = 'none'}
        />
      </div>

      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center min-h-[600px] md:h-[700px] px-4 sm:px-6 lg:px-8 relative z-10 py-16'>
        
        {/* Left Column - Content */}
        <div className={`w-full md:w-1/2 space-y-8 mb-16 md:mb-0 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}>
          
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-emerald-700 text-sm font-semibold tracking-wide uppercase">
              Platform Islami
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-800 bg-clip-text text-transparent">
              Ceramah
            </span>{' '}
            <span className="text-gray-800">dan</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-800 bg-clip-text text-transparent">
              Kajian Islami
            </span>
          </h1>
          
          {/* Description */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Platform digital yang menyajikan <span className="font-semibold text-emerald-700">ceramah dan kajian Islam</span> berkualitas untuk menemani perjalanan hijrahmu.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Dapatkan akses ke ribuan konten islami dari 
              <span className="font-semibold text-teal-700"> ustadz terpercaya</span>, 
              kapan saja dan di mana saja dalam genggamanmu.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <a 
              href="/kajian" 
              className="inline-flex items-center bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <span className="mr-3 text-xl">🕌</span>
              Mulai Belajar
              <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column - Decorative Elements */}
        <div className={`w-full md:w-1/2 flex justify-center md:justify-end transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          
          <div className="relative max-w-md w-full">
            
            {/* Main Decorative Circle */}
            <div className="relative w-80 h-80 mx-auto">
              
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-emerald-200 opacity-30 animate-spin-slow"></div>
              
              {/* Middle Ring */}
              <div className="absolute inset-8 rounded-full border-2 border-teal-300 opacity-40 animate-spin-reverse"></div>
              
              {/* Inner Circle */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shadow-xl">
                
                {/* Islamic Star */}
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-80 animate-pulse" 
                     style={{
                       clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                     }}>
                </div>
                
                {/* Small Decorative Dots */}
                <div className="absolute top-4 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-4 w-3 h-3 bg-teal-400 rounded-full animate-ping delay-1000"></div>
                <div className="absolute left-4 w-3 h-3 bg-emerald-400 rounded-full animate-ping delay-500"></div>
                <div className="absolute right-4 w-3 h-3 bg-teal-400 rounded-full animate-ping delay-1500"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-200 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-teal-300 rounded-full opacity-70 animate-bounce delay-700"></div>
              <div className="absolute top-1/4 -left-8 w-6 h-6 bg-emerald-300 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute bottom-1/4 -right-8 w-10 h-10 bg-teal-200 rounded-full opacity-60 animate-pulse delay-300"></div>
            </div>

            {/* Background decorative shapes */}
            <div className="absolute top-1/4 -left-12 w-16 h-16 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-full opacity-30 animate-pulse delay-300"></div>
            <div className="absolute -top-8 -right-8 w-10 h-10 bg-gradient-to-br from-teal-300 to-teal-400 rounded-full opacity-40 animate-bounce delay-1500"></div>
            <div className="absolute bottom-1/4 -right-6 w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full opacity-25 animate-pulse delay-800"></div>
          </div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#10B081"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#10B081"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#10B081"></path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;