import React, { useState, useEffect } from 'react';

// Custom SVG Icons
const Instagram = ({ size = 24, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
</svg>
);

const Youtube = ({ size = 24, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
</svg>
);

const Eye = ({ size = 16, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
</svg>
);

const Footer = () => {
const [views, setViews] = useState(0);
const [isAnimating, setIsAnimating] = useState(false);

useEffect(() => {
    // Get existing views from localStorage atau inisialisasi dengan 0
    let currentViews = 0;
    
    try {
      const storedViews = localStorage.getItem('kajianGenggam_pageViews');
      currentViews = storedViews ? parseInt(storedViews, 10) : 0;
    } catch (error) {
      console.log('localStorage not available, using session storage');
      // Fallback ke window object jika localStorage error
      currentViews = window.pageViewCounter || 0;
    }
    
    // Increment views setiap kali halaman dikunjungi/refresh
    currentViews += 1;
    
    // Save ke localStorage dan window object
    try {
      localStorage.setItem('kajianGenggam_pageViews', currentViews.toString());
    } catch (error) {
      window.pageViewCounter = currentViews;
    }
    
    // Animate the counter
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setViews(currentViews);
      setIsAnimating(false);
    }, 500);

    // Debug log untuk memastikan counter berjalan
    console.log('Page visits:', currentViews);

    return () => {
      clearTimeout(timer);
    };
}, []); // Empty dependency array = runs once on mount (page visit/refresh)

const formatViews = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
};

return (
    <footer className='relative text-white py-16 md:py-20 overflow-hidden' style={{backgroundColor: '#1C6758'}}>
      {/* Decorative Background Elements */}
    <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-white/3 to-transparent rounded-full blur-3xl"></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-8 right-8 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-16 right-24 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-12 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-500"></div>
    </div>

    <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
        
          {/* Left Content */}
        <div className='space-y-8'>
            <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                KajianGenggam
            </h3>
            <p className='text-base md:text-lg leading-relaxed text-white/90 max-w-md'>
                Temukan ilmu, inspirasi, dan ketenangan hati di setiap konten kami. Bersama membangun generasi yang lebih dekat dengan Allah SWT.
            </p>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                Ikuti Kami
            </h4>
            <div className="flex space-x-4">
                
            {/* Instagram */}
            <a 
            href="https://www.instagram.com/xeahz" 
            target="_blank" rel="noopener noreferrer"
            className="group relative p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105 hover:rotate-3"
            aria-label="Follow us on Instagram"
            >
            <Instagram size={24} className="text-white group-hover:text-pink-300 transition-colors duration-300" />
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            {/* YouTube */}
            <a 
            href="https://www.youtube.com/c/umsida1912" 
            target="_blank" rel="noopener noreferrer"
            className="group relative p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105 hover:-rotate-3"
            aria-label="Subscribe to our YouTube channel"
            >
            <Youtube size={24} className="text-white group-hover:text-red-300 transition-colors duration-300" />
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            </div>
            </div>
        </div>

          {/* Right Content - Decorative */}
        <div className="hidden lg:flex justify-end items-center">
            <div className="relative">
              {/* Large decorative circle */}
            <div className="w-64 h-64 rounded-full border border-white/10 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                    <div className="text-4xl text-white/30 font-arabic">
                ﷽
                    </div>
                </div>
                </div>
            </div>
              {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white/5 animate-bounce delay-300"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-white/10 animate-bounce delay-700"></div>
            </div>
        </div>

        </div>

        {/* Views Counter */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
              <Eye size={18} className="text-white/70" />
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white/70 font-medium">Total Kunjungan:</span>
                <div className={`flex items-center transition-all duration-300 ${isAnimating ? 'scale-110 text-green-300' : 'text-white'}`}>
                  <span className="text-lg font-bold tabular-nums">
                    {formatViews(views)}
                  </span>
                  {isAnimating && (
                    <div className="ml-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Glow effect when animating */}
            {isAnimating && (
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        {/* Copyright */}
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
        <p className='text-sm text-white/70'>
            ©2025 KajianGenggam. All Rights Reserved.
        </p>
        <p className='text-xs text-white/50'>
            Xeah
        </p>
        </div>

    </div>
    </footer>
);
};

export default Footer;