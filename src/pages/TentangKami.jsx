import React, { useState, useEffect, useRef } from 'react';

const TentangKami = () => {
  const [counters, setCounters] = useState({
    users: 0,
    videos: 0,
    ustadz: 0,
    rating: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  const stats = [
    { key: 'users', target: 10000, suffix: 'K+', label: 'Total Pengguna', symbol: '' },
    { key: 'videos', target: 500, suffix: '+', label: 'Video Kajian', symbol: '' },
    { key: 'ustadz', target: 50, suffix: '+', label: 'Ustadz Partner', symbol: '' },
    { key: 'rating', target: 4.8, suffix: '', label: 'Rating Aplikasi', symbol: '' }
  ];

const teamMembers = [
  {
    name: "TRI WAHYUDI HA EX SAPUTRA",
    role: "Full Stack Developer",
    description: "Menginisiasi dan membangun platform dari sisi frontend dan backend, serta memastikan keberlangsungan teknis dan visi dakwah digital.",
    image: "https://images.unsplash.com/photo-1720722023459-5f2a8c8815af?q=300&h=300&fit=crop&crop=face"
  },
  {
    name: "HABIB FIKRI NURSIFA ALI",
    role: "Full Stack Developer",
    description: "Mendesain antarmuka yang menarik secara visual dan konsisten dengan identitas brand untuk meningkatkan kenyamanan pengguna.",
    image: "https://images.unsplash.com/photo-1720722023459-5f2a8c8815af?q=300&h=300&fit=crop&crop=face"
  },
  {
    name: "SUKMA DWI NUR INSANI",
    role: "UX Researcher",
    description: "Melakukan riset kebutuhan pengguna dan mengembangkan solusi berbasis pengalaman nyata demi interaksi yang optimal.",
    image: "https://images.unsplash.com/photo-1720722023459-5f2a8c8815af?q=300&h=300&fit=crop&crop=face"
  },
  {
    name: "MUHAMMAD ZAKY RAMADHANI",
    role: "Quality Assurance & Project Coordinator",
    description: "Mengatur timeline proyek, berkoordinasi antar tim, dan memastikan kualitas aplikasi tetap terjaga sebelum rilis.",
    image: "https://images.unsplash.com/photo-1720722023459-5f2a8c8815af?q=300&h=300&fit=crop&crop=face"
  }
];


  // const rawstats = [
  //   { number: "10K+", label: "Total Pengguna" },
  //   { number: "500+", label: "Video Kajian" },
  //   { number: "50+", label: "Ustadz Partner" },
  //   { number: "4.8", label: "Rating Aplikasi" }
  // ];

  // Intersection Observer untuk trigger animasi
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    const duration = 2000; // 2 detik
    const steps = 60; // 60 frame
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      // Easing function untuk smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCounters({
        users: Math.floor(10000 * easeOutQuart),
        videos: Math.floor(500 * easeOutQuart),
        ustadz: Math.floor(50 * easeOutQuart),
        rating: Math.floor(4.8 * easeOutQuart * 10) / 10
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        // Set nilai final
        setCounters({
          users: 10000,
          videos: 500,
          ustadz: 50,
          rating: 4.8
        });
      }
    }, stepDuration);
  };

  const formatNumber = (num, stat) => {
    if (stat.key === 'users') {
      return Math.floor(num / 1000) + 'K+';
    } else if (stat.key === 'rating') {
      return num.toFixed(1);
    } else {
      return num + stat.suffix;
    }
  };
  const values = [
    {
      icon: "🤲",
      title: "Dakwah Digital",
      description: "Menyebarkan ajaran Islam melalui platform digital yang mudah diakses"
    },
    {
      icon: "📚",
      title: "Pendidikan Berkualitas",
      description: "Menyediakan konten edukasi islami dari ustadz-ustadz terpercaya"
    },
    {
      icon: "🌍",
      title: "Akses Global",
      description: "Memungkinkan siapa saja, di mana saja untuk belajar agama Islam"
    },
    {
      icon: "💖",
      title: "Kemudahan Belajar",
      description: "Interface yang user-friendly untuk semua kalangan umur"
    }
  ];

  // const stats = [
  //   { number: "10K+", label: "Total Pengguna" },
  //   { number: "500+", label: "Video Kajian" },
  //   { number: "50+", label: "Ustadz Partner" },
  //   { number: "4.8", label: "Rating Aplikasi" }
  // ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🌟 TENTANG KAMI
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Kajian <span className="text-green-500">Genggam</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Platform digital yang menyajikan ceramah dan kajian Islam berkualitas untuk 
            menemani perjalanan hijrah Anda. Akses ribuan konten islami dari ustadz terpercaya, 
            kapan saja dan di mana saja.
          </p>
          
          {/* Decorative Elements */}
          <div className="flex justify-center items-center space-x-8 mt-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📖</span>
            </div>
            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
              <span className="text-xl">🕌</span>
            </div>
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-3xl">⭐</span>
            </div>
            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
              <span className="text-xl">🤲</span>
            </div>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💚</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`text-3xl md:text-4xl font-bold text-green-500 mb-2 transition-all duration-1000 ${
                  isVisible ? 'transform scale-100 opacity-100' : 'transform scale-50 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}>
                  {formatNumber(counters[stat.key], stat)}
                </div>
                <div className={`text-gray-600 font-medium transition-all duration-500 ${
                  isVisible ? 'transform translateY-0 opacity-100' : 'transform translateY-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200 + 300}ms` }}>
                  {stat.label}
                </div>
                {/* Decorative pulse effect */}
                <div className={`w-8 h-1 bg-green-500 mx-auto mt-3 rounded-full transition-all duration-700 ${
                  isVisible ? 'transform scaleX-100 opacity-100' : 'transform scaleX-0 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200 + 600}ms` }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Misi Kami
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Kami percaya bahwa setiap Muslim berhak mendapatkan akses mudah terhadap 
                ilmu agama yang berkualitas. Melalui Kajian Genggam, kami berkomitmen untuk:
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Menyediakan konten kajian islami yang autentik dan mudah dipahami</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Memfasilitasi pembelajaran agama untuk semua kalangan</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Menghubungkan umat dengan para ustadz terpercaya</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Membangun komunitas muslim yang saling mendukung</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Prinsip-prinsip yang menjadi fondasi dalam setiap langkah pengembangan platform kami
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors duration-300">
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tim Kami
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Orang-orang hebat di balik layar yang berdedikasi untuk kemajuan dakwah digital
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TentangKami;