import React, { useState } from 'react';
import { Play, Clock, Eye, Calendar } from 'lucide-react';

const Kajian = () => {
  // Data contoh video kajian - nanti bisa diganti dengan data dari API atau database
  const [videos] = useState([
    {
      id: 1,
      title: "Kajian 1 Menit - Pentingnya Sholat Berjamaah",
      youtubeId: "ojLsBcjsZuU",
      thumbnail: "https://img.youtube.com/vi/ojLsBcjsZuU/maxresdefault.jpg",
      duration: "0:57",
      views: "104K",
      uploadDate: "2 hari yang lalu",
      category: "Kajian 1 Menit",
      ustadz: "Ustadz Hanan Attaki"
    },
    {
      id: 2,
      title: "Kajian 1 Menit - Bulan Pengampunan",
      youtubeId: "Fhs1_pTnBf0",
      thumbnail: "https://img.youtube.com/vi/Fhs1_pTnBf0/maxresdefault.jpg",
      duration: "1:07",
      views: "7.7K",
      uploadDate: "3 hari yang lalu",
      category: "Kajian 1 Menit",
      ustadz: "Ustadz Adi Hidayat"
    },
    {
      id: 3,
      title: "ADAB KETIKA DZIKIR",
      youtubeId: "zRfAejwsgdo",
      thumbnail: "https://img.youtube.com/vi/zRfAejwsgdo/maxresdefault.jpg",
      duration: "11:37",
      views: "7.5k",
      uploadDate: "2 hari yang lalu",
      category: "Mutiara Hikmah",
      ustadz: "KH. Ahmad Asrori Al Ishaqi"
    },
    {
      id: 4,
      title: "Waktu Bersama: Investasi Terpenting dalam Keluarga",
      youtubeId: "fVvKx3LkLBs",
      thumbnail: "https://img.youtube.com/vi/fVvKx3LkLBs/maxresdefault.jpg",
      duration: "22:01",
      views: "1.6K",
      uploadDate: "1 minggu yang lalu",
      category: "Mutiara Hikmah",
      ustadz: "Buya Yahya"
    },
    {
      id: 5,
      title: "Lupa Sholat",
      youtubeId: "BngWNdsKfxs",
      thumbnail: "https://img.youtube.com/vi/BngWNdsKfxs/maxresdefault.jpg",
      duration: "1:02",
      views: "60K",
      uploadDate: "1 minggu yang lalu",
      category: "Kajian 1 Menit",
      ustadz: "Ustadz Adi Hidayat"
    },
    {
      id: 6,
      title: "Jangan Tinggalkan Salat | umma x Detikcom",
      youtubeId: "lzliehDP6X0",
      thumbnail: "https://img.youtube.com/vi/lzliehDP6X0/maxresdefault.jpg",
      duration: "6:38",
      views: "212K",
      uploadDate: "2 minggu yang lalu",
      category: "Kultum",
      ustadz: "Ustadz Hanan Attaki"
    },
    // Data video tambahan untuk demonstrasi load more
    {
      id: 7,
      title: "Munafik",
      youtubeId: "U_uSXuWNBDk",
      thumbnail: "https://img.youtube.com/vi/U_uSXuWNBDk/maxresdefault.jpg",
      duration: "1:12",
      views: "35K",
      uploadDate: "3 minggu yang lalu",
      category: "Kajian 1 Menit",
      ustadz: "Ustadz Abdul Somad"
    },
    {
      id: 8,
      title: "NIKMAT ISTIQOMAH",
      youtubeId: "AaJWf1Ns1aA",
      thumbnail: "https://img.youtube.com/vi/AaJWf1Ns1aA/maxresdefault.jpg",
      duration: "0:59",
      views: "10K",
      uploadDate: "3 minggu yang lalu",
      category: "Kajian 1 Menit",
      ustadz: "Ustadz Abdul Somad"
    },
    {
      id: 9,
      title: "Kultum Ustaz Hanan Attaki: Belajar Ridho | umma x Detikcom",
      youtubeId: "RbCYCt26vzc",
      thumbnail: "https://img.youtube.com/vi/RbCYCt26vzc/maxresdefault.jpg",
      duration: "9:25",
      views: "24K",
      uploadDate: "1 bulan yang lalu",
      category: "Kultum",
      ustadz: "Ustadz Hanan Attaki"
    },
    {
      id: 10,
      title: "Ada Hikmah Dibalik Ujian",
      youtubeId: "y5MwxBhhxJc",
      thumbnail: "https://img.youtube.com/vi/y5MwxBhhxJc/maxresdefault.jpg",
      duration: "21:34",
      views: "27K",
      uploadDate: "1 bulan yang lalu",
      category: "Mutiara Hikmah",
      ustadz: "Ustadz Hanan Attaki"
    },
    {
      id: 11,
      title: "Mengejar Akhirat, Dunia pun Didapat",
      youtubeId: "gOp846K2C_A",
      thumbnail: "https://img.youtube.com/vi/gOp846K2C_A/maxresdefault.jpg",
      duration: "18:49",
      views: "488K",
      uploadDate: "7 bulan yang lalu",
      category: "Kajian Singkat",
      ustadz: "Ustadz Adi Hidayat"
    },
    {
      id: 12,
      title: "Keutamaan Sholat Tahajud",
      youtubeId: "oKAONPn4tsQ",
      thumbnail: "https://img.youtube.com/vi/oKAONPn4tsQ/maxresdefault.jpg",
      duration: "1:01",
      views: "11K",
      uploadDate: "1 bulan yang lalu",
      category: "Kajian 1 Menit",
      ustadz: "Ustadz Adi Hidayat"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6); // Tampilkan 6 video pertama

  const categories = ['Semua', 'Kajian 1 Menit', 'Kultum', 'Kajian Singkat', 'Mutiara Hikmah'];

  // Filter video berdasarkan kategori yang dipilih
  const filteredAllVideos = selectedCategory === 'Semua' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  // Batasi jumlah video yang ditampilkan
  const filteredVideos = filteredAllVideos.slice(0, visibleCount);

  // Fungsi untuk memuat lebih banyak video (6 video setiap kali)
  const loadMoreVideos = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  // Cek apakah masih ada video yang belum ditampilkan
  const hasMoreVideos = visibleCount < filteredAllVideos.length;

  // Fungsi untuk mengganti kategori dan reset pagination
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(6); // Reset ke 6 video pertama
  };

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const getYouTubeEmbedUrl = (youtubeId) => {
    return `https://www.youtube.com/embed/${youtubeId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            📺 PLATFORM KAJIAN
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Kajian dan <span className="text-green-500">Video Islami</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Kumpulan video kajian islami berkualitas dari ustadz terpercaya untuk memperkaya wawasan spiritual Anda
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video Count Info */}
        <div className="text-center mb-6">
          <p className="text-gray-600 text-sm">
            Menampilkan {filteredVideos.length} dari {filteredAllVideos.length} video
            {selectedCategory !== 'Semua' && ` dalam kategori "${selectedCategory}"`}
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => openVideo(video)}
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-12 h-12 text-white" fill="white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  {video.category}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-green-600 text-sm font-medium mb-2">{video.ustadz}</p>
                <div className="flex items-center justify-between text-gray-500 text-xs">
                  <div className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {video.views} views
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {video.uploadDate}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreVideos && (
          <div className="text-center mt-12">
            <button 
              onClick={loadMoreVideos}
              className="bg-green-500 text-white px-8 py-3 rounded-full font-medium hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Muat Lebih Banyak ({filteredAllVideos.length - visibleCount} video lagi)
            </button>
          </div>
        )}

        {/* No More Videos Message */}
        {!hasMoreVideos && filteredAllVideos.length > 6 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 text-sm">
              ✅ Semua video telah ditampilkan
            </p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">{selectedVideo.title}</h2>
              <button
                onClick={closeVideo}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={getYouTubeEmbedUrl(selectedVideo.youtubeId)}
                title={selectedVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  {selectedVideo.category}
                </span>
                <span className="text-gray-500 text-sm">{selectedVideo.uploadDate}</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{selectedVideo.title}</h3>
              <p className="text-green-600 font-medium mb-2">{selectedVideo.ustadz}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <Eye className="w-4 h-4 mr-1" />
                {selectedVideo.views} views
                <Clock className="w-4 h-4 ml-4 mr-1" />
                {selectedVideo.duration}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kajian;