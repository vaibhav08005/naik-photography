import React, { useRef } from 'react';
import { useScroll } from '../hooks/useScroll';

const Hero: React.FC = () => {
  const scrollY = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation values
  const opacity = Math.max(0, 1 - scrollY / 700);
  const scale = Math.max(0.8, 1 - scrollY / 2000);
  const textTranslate = scrollY * 0.5;

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Video that reveals */}
      <div
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          transform: `scale(${1 + scrollY * 0.0005})`, // Subtle zoom in on scroll
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          // Placeholder poster image while video loads
          poster="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1920&auto=format&fit=crop"
        >
          {/* Using a high-quality stock video of Indian wedding hands/details as a placeholder. 
                 You can replace the src below with your local video file path. */}
          <source src="/videos/136132-764371500_small.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center flex flex-col items-center px-4">
        <h1
          className="font-serif text-[12vw] md:text-[14vw] leading-[0.8] tracking-tighter mix-blend-overlay opacity-90 whitespace-nowrap"
          style={{
            transform: `translateY(${textTranslate}px) scale(${scale})`,
            opacity: opacity
          }}
        >
          Chikya
        </h1>
        <p
          className="mt-8 text-sm md:text-base uppercase tracking-[0.3em] font-light max-w-lg mx-auto"
          style={{
            transform: `translateY(${textTranslate * 0.8}px)`,
            opacity: opacity
          }}
        >
          Authentic Event Photography • Since 2024
        </p>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
        >
          <div className="w-[1px] h-12 bg-white/50 animate-pulse"></div>
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;