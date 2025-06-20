import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navlinks = [
        { to: "/", label: "Home"},
        { to: "/kajian", label: "Kajian"},
        { to: "/al-quran", label: "Al-Qur'an"},
        { to: "/donasi", label: "Donasi"},
        { to: "/tentang-kami", label: "Tentang Kami"}
    ]

    const handleLinkClick = () => {
        setIsMenuOpen(false); 
    }

    return (
        <nav className='fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm'>
            <div className='w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16'>
                {/* Logo */}
                <Link to="/" className='flex items-center gap-1 cursor-pointer'>
                    <img src='/src/img/logos.png' alt='Logo' className='h-8 w-8' />
                    <span className='text-xl font-semibold text-gray-800'>Kajian Genggam</span>
                </Link>

                {/* Desktop nav-item */}
                <div className="hidden md:flex items-center gap-10">
                    {
                        navlinks.map((link, index) => (
                        <Link 
                            key={index} 
                            to={link.to}
                            onClick={handleLinkClick}
                            className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                            after:w-0 hover:after:w-full after:bg-emerald-600 after:transition-all ${location.pathname === link.to 
                            ? "text-emerald-600 after:w-full" : "text-gray-600 hover:text-gray-900"}`}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile hamburger button */}
                <button 
                    className='md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                        isMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}></span>
                    <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                        isMenuOpen ? 'opacity-0' : ''
                    }`}></span>
                    <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                        isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}></span>
                </button>
            </div>

            {/* Mobile menu items */}
            <div className={`md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 transition-all duration-300 ${
                isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
                <div className='px-4 py-4 space-y-3'>
                    {navlinks.map((link, index) => (
                        <Link 
                            to={link.to} 
                            key={index}
                            onClick={handleLinkClick}
                            className={`block text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                                location.pathname === link.to 
                                ? 'text-blue-600 bg-blue-50' 
                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar