import React, { useEffect, useState } from 'react';
import { ArrowLeft, Sparkles, Camera } from 'lucide-react';

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
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const images = getImages(category, 9);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500);
  };

  return (
    <div className={`fixed inset-0 z-[100] bg-[#0a0a0a] transition-all duration-700 ease-in-out overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background ambient effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)' }}
        />
      </div>
       
      {/* Navigation / Header */}
      <div className="absolute top-0 left-0 w-full z-50">
        <div className="absolute inset-0 h-[300px] bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />
        
        <div className="relative pt-28 px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between">
          {/* Back Button */}
          <button 
            onClick={handleClose} 
            className="hover-trigger text-white flex items-center gap-3 group z-50 mb-6 md:mb-0"
          >
            <div className="p-3 border border-white/20 rounded-full group-hover:border-amber-400/50 group-hover:bg-amber-400/10 transition-all duration-300">
              <ArrowLeft size={20} className="text-white/70 group-hover:text-amber-400 transition-all group-hover:-translate-x-1" />
            </div>
            <span className="uppercase tracking-widest text-xs md:text-sm font-medium text-white/70 group-hover:text-white transition-colors">
              Back to Portfolio
            </span>
          </button>

          {/* Title */}
          <div className="w-full md:absolute md:left-1/2 md:-translate-x-1/2 md:top-28 z-40 text-center pointer-events-none">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Camera className="w-5 h-5 text-amber-400/60" />
              <span className="text-xs uppercase tracking-[0.3em] text-amber-200/60">Gallery</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-amber-200">
              {category}
            </h2>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="h-full overflow-y-auto overflow-x-hidden pt-64 px-4 pb-20 scroll-smooth">
        <div className="max-w-[1600px] mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((src, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedImage(idx)}
                className={`break-inside-avoid relative group overflow-hidden rounded-sm cursor-pointer transition-all duration-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${100 + idx * 100}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Image container with border */}
                <div className="aspect-[auto] w-full bg-gray-900 overflow-hidden border border-white/5 group-hover:border-amber-400/30 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.15)]">
                  <img 
                    src={src} 
                    alt={`${category} ${idx}`} 
                    className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110" 
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Hover content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-amber-200/80">{category}</span>
                    <span className="text-xs text-white/50">0{idx + 1}</span>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-amber-400/0 group-hover:border-amber-400/40 transition-all duration-500 rounded-tr" />
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className={`mt-32 mb-10 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-amber-400/60" />
            <span className="text-xs uppercase tracking-[0.3em] text-amber-200/60">Let's Create Together</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-serif italic mb-8 text-white">
            Capture your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">{category}</span> moment
          </h3>
          <button className="hover-trigger relative px-10 py-4 overflow-hidden group border border-amber-400/30 rounded-full bg-amber-400/5 hover:bg-amber-400/10 transition-all duration-500">
            <span className="relative text-xs uppercase tracking-[0.2em] text-white group-hover:text-amber-100 transition-colors duration-300 flex items-center gap-2">
              Book This Session
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <span className="text-xs uppercase tracking-widest">Close</span>
          </button>
          <img 
            src={images[selectedImage]} 
            alt={`${category} ${selectedImage}`}
            className="max-w-full max-h-full object-contain animate-[fadeIn_0.3s_ease-out]"
          />
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default GenreGallery;
