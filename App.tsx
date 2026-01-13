import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HorizontalGallery from './components/HorizontalGallery';
import Statement from './components/Statement';
import VerticalMosaic from './components/VerticalMosaic';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import GenreGallery from './components/GenreGallery';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
        <div className="flex flex-col items-center">
            <div className="font-serif italic text-4xl text-white animate-pulse">Chikya Photography</div>
            <div className="w-32 h-[1px] bg-white/20 mt-4 overflow-hidden">
                <div className="w-full h-full bg-white animate-[loading_1.5s_ease-in-out_infinite] transform -translate-x-full"></div>
            </div>
        </div>
        <style>{`
            @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `}</style>
      </div>
    );
  }

  return (
    <div className="relative bg-[#0a0a0a] min-h-screen text-[#f5f5f5]">
      {/* Custom Cursor is only visible on non-touch devices ideally, but included here for the demo */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      <Navbar onNavClick={() => setSelectedCategory(null)} />
      
      <main className="relative z-10 bg-[#0a0a0a] mb-[70vh] shadow-[0_50px_50px_-12px_rgba(0,0,0,1)]">
        <div id="home">
          <Hero />
        </div>
        <div id="about">
          <Statement />
        </div>
        <div id="portfolio">
          <HorizontalGallery onSelectCategory={setSelectedCategory} />
        </div>
        <div id="visit">
          <VerticalMosaic />
        </div>
        <section className="h-[50vh] flex items-center justify-center bg-[#0a0a0a]">
           <div className="text-center hover-trigger">
              <p className="text-xs uppercase tracking-widest mb-4">Your Story, Beautifully Told</p>
              <h2 className="text-5xl md:text-8xl font-serif italic cursor-pointer hover:opacity-50 transition-opacity">Let's Create Memories</h2>
           </div>
        </section>
      </main>

      {/* Footer acts as a parallax reveal from behind */}
      <div className="fixed bottom-0 left-0 w-full h-[70vh] z-0">
         <Footer />
      </div>

      {/* Full Screen Genre Gallery Overlay */}
      {selectedCategory && (
        <GenreGallery 
            category={selectedCategory} 
            onClose={() => setSelectedCategory(null)} 
        />
      )}
    </div>
  );
};

export default App;