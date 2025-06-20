import React, { useState, useEffect, useRef } from 'react';

const AlQuranPage = () => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingVerses, setLoadingVerses] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [audioLoading, setAudioLoading] = useState(null);
  const [showTajweed, setShowTajweed] = useState(false);
  const audioRef = useRef(null);
  const versesPerPage = 10;

  // Fetch daftar surah menggunakan API baru
  useEffect(() => {
    fetchSurahs();
  }, []);

  const fetchSurahs = async () => {
    try {
      setLoading(true);
      // Langsung menggunakan API yang sudah terbukti bekerja
      const response = await fetch('https://api.alquran.cloud/v1/meta');
      const data = await response.json();
      if (data.status === 'OK' && data.data && data.data.surahs) {
        setSurahs(data.data.surahs.references);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error fetching surahs:', error);
      // Fallback data jika API gagal
      const fallbackSurahs = [
        { number: 1, englishName: "Al-Fatihah", name: "الفاتحة", englishNameTranslation: "The Opening", numberOfAyahs: 7, revelationType: "Meccan" },
        { number: 2, englishName: "Al-Baqarah", name: "البقرة", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "Medinan" },
        { number: 3, englishName: "Ali 'Imran", name: "آل عمران", englishNameTranslation: "Family of Imran", numberOfAyahs: 200, revelationType: "Medinan" },
        { number: 4, englishName: "An-Nisa", name: "النساء", englishNameTranslation: "The Women", numberOfAyahs: 176, revelationType: "Medinan" },
        { number: 5, englishName: "Al-Ma'idah", name: "المائدة", englishNameTranslation: "The Table Spread", numberOfAyahs: 120, revelationType: "Medinan" }
      ];
      setSurahs(fallbackSurahs);
    } finally {
      setLoading(false);
    }
  };

  const fetchVerses = async (surahNumber) => {
    try {
      setLoadingVerses(true);
      
      // Menggunakan API alquran.cloud yang sudah terbukti bekerja
      const [arabicResponse, translationResponse, audioResponse] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`),
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/id.indonesian`),
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`)
      ]);

      const arabicData = await arabicResponse.json();
      const translationData = await translationResponse.json();
      const audioData = await audioResponse.json();

      if (arabicData.status !== 'OK' || translationData.status !== 'OK') {
        throw new Error('API response error');
      }

      // Combine data
      const combinedVerses = arabicData.data.ayahs.map((ayah, index) => ({
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        text: ayah.text,
        translation: translationData.data.ayahs[index]?.text || 'Terjemahan tidak tersedia',
        audio: audioData.data?.ayahs[index]?.audio || null,
        words: []
      }));

      setSelectedSurah({
        number: arabicData.data.number,
        name: arabicData.data.name,
        englishName: arabicData.data.englishName,
        englishNameTranslation: arabicData.data.englishNameTranslation,
        numberOfAyahs: arabicData.data.numberOfAyahs,
        revelationType: arabicData.data.revelationType
      });
      
      setVerses(combinedVerses);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching verses:', error);
      alert('Gagal memuat ayat-ayat. Silakan coba lagi.');
    } finally {
      setLoadingVerses(false);
    }
  };

  // Fungsi yang tidak digunakan lagi - hapus
  // const fetchVersesOldAPI = async (surahNumber) => { ... }

  const handleSurahClick = (surahNumber) => {
    fetchVerses(surahNumber);
  };

  const handleBackToSurahs = () => {
    setSelectedSurah(null);
    setVerses([]);
    setSearchTerm('');
    setCurrentPage(1);
    stopAudio();
  };

  const playAudio = async (audioUrl, ayahNumber) => {
    try {
      if (playingAudio === ayahNumber) {
        stopAudio();
        return;
      }

      stopAudio();
      setAudioLoading(ayahNumber);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.onloadstart = () => setAudioLoading(ayahNumber);
        audioRef.current.oncanplay = () => setAudioLoading(null);
        audioRef.current.onended = () => setPlayingAudio(null);
        audioRef.current.onerror = () => {
          setAudioLoading(null);
          setPlayingAudio(null);
          alert('Gagal memuat audio');
        };
        
        await audioRef.current.play();
        setPlayingAudio(ayahNumber);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setAudioLoading(null);
      setPlayingAudio(null);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingAudio(null);
    setAudioLoading(null);
  };

  // Filter surah berdasarkan pencarian
  const filteredSurahs = surahs.filter(surah => {
    const name = surah.englishName || '';
    const arabicName = surah.name || '';
    const translation = surah.englishNameTranslation || '';
    
    const searchLower = searchTerm.toLowerCase();
    return name.toLowerCase().includes(searchLower) ||
           arabicName.includes(searchTerm) ||
           translation.toLowerCase().includes(searchLower);
  });

  // Pagination untuk ayat
  const indexOfLastVerse = currentPage * versesPerPage;
  const indexOfFirstVerse = indexOfLastVerse - versesPerPage;
  const currentVerses = verses.slice(indexOfFirstVerse, indexOfLastVerse);
  const totalPages = Math.ceil(verses.length / versesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fungsi untuk menampilkan bismillah yang benar
  const shouldShowBismillah = (surahNumber) => {
    return surahNumber !== 1 && surahNumber !== 9;
  };

  // Simple tajweed highlighting (basic implementation)
  const highlightTajweed = (text) => {
    if (!showTajweed) return text;
    
    // Basic tajweed rules with colors
    const rules = [
      { pattern: /ٱللَّهُ/g, color: '#dc2626', rule: 'Lafzhul Jalalah' },
      { pattern: /مِن/g, color: '#059669', rule: 'Idgham' },
      { pattern: /أَن/g, color: '#7c3aed', rule: 'Hamzah' },
      { pattern: /لَّا/g, color: '#ea580c', rule: 'Tasydid' }
    ];

    let highlightedText = text;
    rules.forEach(rule => {
      highlightedText = highlightedText.replace(rule.pattern, 
        `<span style="color: ${rule.color}; font-weight: bold;" title="${rule.rule}">$&</span>`
      );
    });

    return highlightedText;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat Al-Qur'an...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="alquran" className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <audio ref={audioRef} preload="none" />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-16 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {selectedSurah ? selectedSurah.englishName : 'Al-Qur\'an Al-Kareem'}
            </h1>
            <p className="text-xl opacity-90">
              {selectedSurah 
                ? `${selectedSurah.englishNameTranslation} • ${selectedSurah.numberOfAyahs} Ayat • ${selectedSurah.revelationType}`
                : 'القرآن الكريم - Kitab Suci Umat Islam'
              }
            </p>
            {selectedSurah && (
              <div className="mt-6 flex items-center justify-center space-x-4">
                <button
                  onClick={handleBackToSurahs}
                  className="inline-flex items-center bg-white bg-opacity-20 text-emerald-600 px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Kembali ke Daftar Surah
                </button>
                
                <button
                  onClick={() => setShowTajweed(!showTajweed)}
                  className={`inline-flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                    showTajweed 
                      ? 'bg-amber-500 text-white hover:bg-amber-600' 
                      : 'bg-white bg-opacity-20 text-emerald-600 hover:bg-opacity-30'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5H9a2 2 0 00-2 2v12a4 4 0 004 4h6a2 2 0 002-2V7a2 2 0 00-2-2z" />
                  </svg>
                  {showTajweed ? 'Sembunyikan Tajweed' : 'Tampilkan Tajweed'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-8">
        {!selectedSurah ? (
          // Tampilan Daftar Surah
          <div>
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari surah..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSurahs.map((surah) => (
                <div
                  key={surah.number}
                  onClick={() => handleSurahClick(surah.number)}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                      {surah.number}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-arabic text-emerald-700 mb-1">{surah.name}</div>
                      <div className="text-sm text-gray-500">{surah.numberOfAyahs} Ayat</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{surah.englishName}</h3>
                    <p className="text-gray-600 mb-2">{surah.englishNameTranslation}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{surah.revelationType}</span>
                      <span>No. {surah.number}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Tampilan Ayat-ayat
          <div>
            {loadingVerses ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat ayat-ayat...</p>
              </div>
            ) : (
              <>
                {/* Bismillah - hanya tampil jika bukan Al-Fatihah dan At-Taubah */}
                {shouldShowBismillah(selectedSurah.number) && (
                  <div className="text-center mb-12 p-8 bg-white rounded-xl shadow-lg">
                    <div className="text-3xl font-arabic text-emerald-700 mb-4">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </div>
                    <div className="text-gray-600">
                      Dengan nama Allah Yang Maha Pengasih, Maha Penyayang
                    </div>
                  </div>
                )}

                {/* Tajweed Legend */}
                {showTajweed && (
                  <div className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
                    <h3 className="text-lg font-semibold text-amber-800 mb-4">Petunjuk Warna Tajweed:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-600 rounded mr-2"></div>
                        <span>Lafzhul Jalalah</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-600 rounded mr-2"></div>
                        <span>Idgham</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-purple-600 rounded mr-2"></div>
                        <span>Hamzah</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-orange-600 rounded mr-2"></div>
                        <span>Tasydid</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ayat-ayat */}
                <div className="space-y-6 mb-8">
                  {currentVerses.map((verse) => (
                    <div key={verse.number} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {verse.numberInSurah}
                        </div>
                        
                        {verse.audio && (
                          <button
                            onClick={() => playAudio(verse.audio, verse.number)}
                            disabled={audioLoading === verse.number}
                            className="flex items-center space-x-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                          >
                            {audioLoading === verse.number ? (
                              <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : playingAudio === verse.number ? (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            )}
                            <span className="text-sm font-medium">
                              {audioLoading === verse.number ? 'Loading...' : 
                               playingAudio === verse.number ? 'Pause' : 'Play'}
                            </span>
                          </button>
                        )}
                      </div>
                      
                      <div className="mb-6">
                        <div 
                          className="text-2xl md:text-3xl font-arabic text-right text-gray-800 leading-loose mb-4"
                          dangerouslySetInnerHTML={{ 
                            __html: highlightTajweed(verse.text) 
                          }}
                        />
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {verse.translation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mb-8">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                    >
                      Sebelumnya
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              currentPage === pageNumber
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return <span key={pageNumber} className="px-2">...</span>;
                      }
                      return null;
                    })}
                    
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                    >
                      Selanjutnya
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .font-arabic {
          font-family: 'Amiri', 'Times New Roman', serif;
        }
      `}</style>
    </div>
  );
};

export default AlQuranPage;