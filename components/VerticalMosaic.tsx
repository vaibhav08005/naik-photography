import React, { useRef, useEffect, useState } from 'react';
import { useScroll } from '../hooks/useScroll';

const VerticalMosaic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const scrollY = useScroll();

  useEffect(() => {
    if(!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Simple check if in view to calculate relative parallax
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        const speed = 0.1;
        setOffset((window.scrollY - containerRef.current.offsetTop) * speed);
    }
  }, [scrollY]);

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-12 bg-[#0f0f0f] overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto relative">
        
        {/* Column 1 - Moves Up faster */}
        <div 
            className="flex-1 flex flex-col gap-8 md:mt-0"
            style={{ transform: `translateY(${-offset}px)` }}
        >
          <div className="w-full aspect-[4/5] bg-gray-900 overflow-hidden group hover-trigger">
            <img src="https://picsum.photos/600/800?random=20" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
          </div>
          <div className="w-full aspect-[3/4] bg-gray-900 overflow-hidden group hover-trigger">
             <img src="https://picsum.photos/600/800?random=21" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
          </div>
        </div>

        {/* Column 2 - Static or slower */}
        <div className="flex-1 flex flex-col gap-8 md:pt-32">
          <div className="w-full aspect-[3/4] bg-gray-900 overflow-hidden group hover-trigger">
            <img src="https://picsum.photos/600/800?random=22" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
          </div>
          <div className="p-8 border border-white/10 flex flex-col justify-center text-center aspect-[4/3]">
             <h3 className="font-serif italic text-4xl mb-4">Visit Us</h3>
             <p className="text-sm text-gray-400 font-light mb-4 leading-relaxed">
               First Floor Shop No 2, Bypass Road,<br/>
               Rajesh Nagar, Opp. Budha Vihar,<br/>
               Taroda Khurd, Nanded - 431605
             </p>
             <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-white/60">Open Daily: Until 10:00 PM</p>
             </div>
          </div>
        </div>

        {/* Column 3 - Moves Up slower */}
        <div 
            className="flex-1 flex flex-col gap-8 md:pt-16"
            style={{ transform: `translateY(${-offset * 0.5}px)` }}
        >
          <div className="w-full aspect-[4/5] bg-gray-900 overflow-hidden group hover-trigger">
            <img src="https://picsum.photos/600/800?random=23" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
          </div>
           <div className="w-full aspect-square bg-gray-900 overflow-hidden group hover-trigger">
            <img src="https://picsum.photos/600/600?random=24" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default VerticalMosaic;