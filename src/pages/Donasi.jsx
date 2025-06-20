import React, { useState, useEffect } from 'react';

const Donasi = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showQRIS, setShowQRIS] = useState(false);

  const donationAmounts = [
    { amount: 25000, label: 'Rp 25.000' },
    { amount: 50000, label: 'Rp 50.000' },
    { amount: 100000, label: 'Rp 100.000' },
    { amount: 250000, label: 'Rp 250.000' },
    { amount: 500000, label: 'Rp 500.000' },
    { amount: 1000000, label: 'Rp 1.000.000' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleShowQRIS = () => {
    setShowQRIS(true);
  };

  const handleCloseQRIS = () => {
    setShowQRIS(false);
  };

  const getCurrentAmount = () => {
    return selectedAmount || (customAmount ? parseInt(customAmount) : 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 to-transparent"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-emerald-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-teal-200 rounded-full opacity-30 animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-emerald-300 rounded-full opacity-10 animate-ping delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-emerald-700 text-sm font-semibold tracking-wide uppercase">
              Donasi & Infaq
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-800 bg-clip-text text-transparent">
              Berdonasi
            </span>{' '}
            <span className="text-gray-800">untuk</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-800 bg-clip-text text-transparent">
              Dakwah Islam
            </span>
          </h1>

          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Dukungan Anda membantu kami menyebarkan <span className="font-semibold text-emerald-700">ilmu agama</span> dan 
              <span className="font-semibold text-teal-700"> dakwah islamiyah</span> kepada umat muslim di seluruh Indonesia.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              "Barang siapa yang menunjukkan kepada kebaikan, maka dia akan mendapat pahala seperti pahala orang yang mengerjakannya." - HR. Muslim
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Left Column - Donation Form */}
            <div className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
                
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-3">💝</span>
                  Pilih Nominal Donasi
                </h2>

                {/* Predefined Amounts */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {donationAmounts.map((item) => (
                    <button
                      key={item.amount}
                      onClick={() => handleAmountSelect(item.amount)}
                      className={`p-4 rounded-xl border-2 font-semibold transition-all duration-300 ${
                        selectedAmount === item.amount
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Atau masukkan nominal lain:
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="0"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none text-lg font-semibold"
                    />
                  </div>
                  {customAmount && (
                    <p className="mt-2 text-sm text-emerald-600 font-medium">
                      {formatCurrency(parseInt(customAmount))}
                    </p>
                  )}
                </div>

                {/* Payment Method Info */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Metode Pembayaran</h3>
                  <div className="flex items-center p-4 border-2 border-emerald-200 bg-emerald-50 rounded-xl">
                    <span className="text-3xl mr-4">📲</span>
                    <div>
                      <h4 className="font-semibold text-emerald-800">QRIS</h4>
                      <p className="text-sm text-emerald-600">Scan QR Code untuk donasi</p>
                    </div>
                  </div>
                </div>

                {/* Show QRIS Button */}
                <button 
                  onClick={handleShowQRIS}
                  className="w-full bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  disabled={!selectedAmount && !customAmount}
                >
                  <span className="mr-3 text-xl">🤲</span>
                  Tampilkan QRIS
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Column - Info & Impact */}
            <div className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              
              {/* Impact Stats */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Dampak Donasi Anda
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-emerald-50 rounded-xl">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl">🎓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800">1,000+ Kajian</h4>
                      <p className="text-sm text-emerald-600">Ceramah berkualitas tersedia</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-teal-50 rounded-xl">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl">👥</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-800">50,000+ Pengguna</h4>
                      <p className="text-sm text-teal-600">Muslim telah terbantu</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-emerald-50 rounded-xl">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl">🕌</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800">100+ Ustadz</h4>
                      <p className="text-sm text-emerald-600">Ulama terpercaya berpartisipasi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donation Usage */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-3">💰</span>
                  Penggunaan Dana
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Produksi Konten</span>
                    <span className="font-semibold text-emerald-600">60%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Teknologi Platform</span>
                    <span className="font-semibold text-teal-600">25%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Operasional</span>
                    <span className="font-semibold text-emerald-600">15%</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
                  <p className="text-sm text-emerald-700 text-center italic">
                    "Setiap rupiah yang Anda donasikan akan dikelola dengan amanah untuk kemajuan dakwah Islam"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-8 w-16 h-16 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-full opacity-30 animate-pulse delay-300"></div>
        <div className="absolute top-1/3 right-12 w-12 h-12 bg-gradient-to-br from-teal-300 to-teal-400 rounded-full opacity-40 animate-bounce delay-1500"></div>
        <div className="absolute bottom-1/4 right-8 w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full opacity-25 animate-pulse delay-800"></div>
      </div>

      {/* QRIS Popup Modal */}
      {showQRIS && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="text-2xl mr-3">📲</span>
                QRIS Donasi
              </h3>
              <button 
                onClick={handleCloseQRIS}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 text-center">
              
              {/* Amount Display */}
              <div className="bg-emerald-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-emerald-600 mb-1">Nominal Donasi</p>
                <p className="text-2xl font-bold text-emerald-800">
                  {formatCurrency(getCurrentAmount())}
                </p>
              </div>

              {/* QR Code Placeholder */}
              <div className="bg-gray-100 rounded-xl p-8 mb-6">
                <div className="w-48 h-48 mx-auto bg-white rounded-lg shadow-inner flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-6xl mb-2">📲</div>
                    <p className="text-sm text-gray-600 font-medium">QR Code QRIS</p>
                    <p className="text-xs text-gray-500 mt-1">Scan untuk donasi</p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="text-left space-y-3 mb-6">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <span className="text-lg mr-2">📝</span>
                  Cara Donasi:
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>1. Buka aplikasi e-wallet atau mobile banking</p>
                  <p>2. Pilih menu "Scan QR" atau "QRIS"</p>
                  <p>3. Arahkan kamera ke QR Code di atas</p>
                  <p>4. Masukkan nominal: <span className="font-semibold text-emerald-600">{formatCurrency(getCurrentAmount())}</span></p>
                  <p>5. Konfirmasi pembayaran</p>
                </div>
              </div>

              {/* Screenshot Info */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-700 flex items-center justify-center">
                  <span className="mr-2">💡</span>
                  Anda dapat screenshot QR Code ini untuk donasi nanti
                </p>
              </div>

              {/* Close Button */}
              <button 
                onClick={handleCloseQRIS}
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#10B081"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#10B081"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#10B081"></path>
        </svg>
      </div>
    </div>
  );
};

export default Donasi;