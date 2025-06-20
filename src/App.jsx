import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Import Pages
import Home from './pages/Home';
import AlQuranPage from './pages/AlQuran';
import KajianPage from './pages/Kajian';
import DonasiPage from './pages/Donasi';
import TentangKamiPage from './pages/TentangKami';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar selalu tampil di semua halaman */}
        <Navbar />
        
        {/* Konten berubah sesuai route */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/al-quran" element={<AlQuranPage />} />
            <Route path="/kajian" element={<KajianPage />} />
            <Route path="/donasi" element={<DonasiPage />} />
            <Route path="/tentang-kami" element={<TentangKamiPage />} />
          </Routes>
        </main>
        
        {/* Footer selalu tampil di semua halaman */}
        <Footer />
      </div>
    </Router>
  )
}

export default App