import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface GenreGalleryProps {
  category: string;
  onClose: () => void;
}

// Helper to get random images for demo purposes with consistent seeds per category
const getImages = (seed: string, count: number) => 
  Array.from({ length: count }).map((_, i) => 
    `https://picsum.photos/800/${i % 2 === 0 ? 1000 : 600}?random=${seed}${i}`
  );

const GenreGallery: React.FC<GenreGalleryProps> = ({ category, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const images = getImages(category, 9); // Generate 9 images

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => setIsVisible(true));
    
    // Lock body scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500); // Wait for transition to finish
  };

  return (
    <div className={`fixed inset-0 z-[100] bg-[#0a0a0a] transition-opacity duration-500 ease-in-out overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
       
       {/* Navigation / Header */}
       <div className="absolute top-0 left-0 w-full z-50">
          {/* Gradient background for text readability */}
          <div className="absolute inset-0 h-[300px] bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />
          
          <div className="relative pt-28 px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between">
              {/* Back Button */}
              <button 
                onClick={handleClose} 
                className="hover-trigger text-white flex items-center gap-3 group mix-blend-difference z-50 mb-6 md:mb-0"
              >
                 <div className="p-2 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                 </div>
                 <span className="uppercase tracking-widest text-xs md:text-sm font-medium">Back to Portfolio</span>
              </button>

              {/* Title - Absolutely centered on desktop */}
              <div className="w-full md:absolute md:left-1/2 md:-translate-x-1/2 md:top-28 z-40 text-center pointer-events-none">
                <div className="text-4xl md:text-6xl font-serif italic text-white/90 drop-shadow-2xl">
                    {category}
                </div>
              </div>
          </div>
       </div>

       {/* Scrollable Content */}
       <div className="h-full overflow-y-auto overflow-x-hidden pt-64 px-4 pb-20 scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                  {images.map((src, idx) => (
                      <div 
                        key={idx} 
                        className={`break-inside-avoid relative group overflow-hidden transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}
                        style={{ transitionDelay: `${100 + idx * 100}ms` }}
                      >
                          <div className="aspect-[auto] w-full bg-gray-900 overflow-hidden">
                            <img 
                                src={src} 
                                alt={`${category} ${idx}`} 
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                                loading="lazy"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
                      </div>
                  ))}
              </div>
          </div>
          
          <div className={`mt-32 mb-10 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
             <p className="text-gray-500 uppercase tracking-widest text-[10px] mb-4">You've reached the end</p>
             <h3 className="text-3xl md:text-5xl font-serif italic mb-8 text-white">Capture your {category} moment</h3>
             <button className="hover-trigger relative px-8 py-3 overflow-hidden group border border-white/30 rounded-full">
                <span className="absolute inset-0 w-full h-full bg-white transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
                <span className="relative text-xs uppercase tracking-widest group-hover:text-black transition-colors duration-300">
                    Book This Session
                </span>
             </button>
          </div>
       </div>
    </div>
  );
};

export default GenreGallery;