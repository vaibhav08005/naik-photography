import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onNavClick) onNavClick();
  };

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (onNavClick) onNavClick();

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 10);
  };

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'About Us', id: 'about' },
    { label: 'Visit Us', id: 'visit' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[120] px-6 py-6 transition-all duration-500 flex justify-between items-center ${
        scrolled ? 'backdrop-blur-md bg-black/40 border-b border-white/5' : ''
      }`}>
        <div
          onClick={handleLogoClick}
          className="text-xl md:text-2xl font-serif italic font-bold tracking-tighter hover-trigger cursor-pointer z-50 select-none group"
        >
          <span className="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-amber-200 transition-all duration-300">
            Naik
          </span>
          <span className="text-white/60 group-hover:text-amber-400/60 transition-colors duration-300"> Photography</span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover-trigger z-50 text-white flex items-center gap-3 uppercase text-xs tracking-[0.2em] font-medium group"
        >
          <span className="hidden md:block opacity-70 group-hover:opacity-100 transition-opacity">
            {isOpen ? 'Close' : 'Menu'}
          </span>
          <div className="relative w-8 h-8 flex items-center justify-center rounded-full border border-white/20 group-hover:border-amber-400/40 transition-colors duration-300">
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
              <Menu size={16} strokeWidth={1.5} />
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
              <X size={16} strokeWidth={1.5} />
            </div>
          </div>
        </button>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0a0a0a] z-[115] transition-all duration-700 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)' }}
          />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)' }}
          />
        </div>

        <div className="h-full flex flex-col justify-center items-center relative z-10">
          <ul className="text-center space-y-6 md:space-y-8">
            {menuItems.map((item, index) => (
              <li key={item.label} className="overflow-hidden">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`block font-serif text-5xl md:text-7xl italic transition-all duration-700 group ${
                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100 + 200}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
                  }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-600 group-hover:from-white group-hover:to-amber-200 transition-all duration-300">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Menu footer */}
          <div className={`absolute bottom-12 left-0 right-0 flex justify-center gap-8 transition-all duration-700 delay-700 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <a href="tel:+918401658648" className="text-xs uppercase tracking-widest text-white/40 hover:text-amber-400/70 transition-colors">
              +91 84016 58648
            </a>
            <span className="text-white/20">|</span>
            <span className="text-xs uppercase tracking-widest text-white/40">Nanded, India</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
