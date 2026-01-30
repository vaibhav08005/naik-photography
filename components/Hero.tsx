import React, { useRef, useEffect, useState } from 'react';
import { useScroll } from '../hooks/useScroll';

// Floating particle component
const FloatingParticle: React.FC<{ delay: number; size: number; left: string; duration: number }> = ({ 
  delay, size, left, duration 
}) => (
  <div
    className="absolute rounded-full bg-white/10 pointer-events-none"
    style={{
      width: size,
      height: size,
      left,
      bottom: '-20px',
      animation: `floatUp ${duration}s ease-in-out ${delay}s infinite`,
    }}
  />
);

const Hero: React.FC = () => {
  const scrollY = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Animation values
  const opacity = Math.max(0, 1 - scrollY / 700);
  const scale = Math.max(0.8, 1 - scrollY / 2000);
  const textTranslate = scrollY * 0.5;

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate random particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    size: Math.random() * 4 + 2,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full flex items-center justify-center overflow-hidden">
      {/* Animated gradient background overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      
      {/* Animated aurora effect */}
      <div 
        className="absolute inset-0 z-[2] opacity-30"
        style={{
          background: `radial-gradient(ellipse at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(255,215,0,0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-[3] overflow-hidden">
        {particles.map((p) => (
          <FloatingParticle key={p.id} {...p} />
        ))}
      </div>

      {/* Background Video that reveals */}
      <div
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          transform: `scale(${1 + scrollY * 0.0005}) translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1920&auto=format&fit=crop"
        >
          <source src="videos/136132-764371500_small.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Content */}
      <div 
        className="relative z-20 text-center flex flex-col items-center px-4"
        style={{
          transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
        }}
      >
        {/* Decorative line above */}
        <div 
          className="w-[1px] h-16 bg-gradient-to-b from-transparent via-amber-200/50 to-transparent mb-8"
          style={{
            transform: `translateY(${textTranslate * 0.3}px)`,
            opacity: opacity * 0.6,
          }}
        />

        <h1
          className="font-serif text-[12vw] md:text-[14vw] leading-[0.8] tracking-tighter whitespace-nowrap bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #d4af37 100%)',
            transform: `translateY(${textTranslate}px) scale(${scale})`,
            opacity: opacity,
            textShadow: '0 0 80px rgba(212, 175, 55, 0.3)',
          }}
        >
          Naik
        </h1>

        {/* Decorative underline */}
        <div 
          className="w-32 h-[2px] mt-6 mb-8 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
          style={{
            transform: `translateY(${textTranslate * 0.8}px) scaleX(${scale})`,
            opacity: opacity,
          }}
        />

        <p
          className="text-sm md:text-base uppercase tracking-[0.4em] font-light max-w-lg mx-auto text-white/90"
          style={{
            transform: `translateY(${textTranslate * 0.8}px)`,
            opacity: opacity,
          }}
        >
          Capturing Moments with Precision and Passion
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 mt-12"
          style={{
            transform: `translateY(${textTranslate * 0.9}px)`,
            opacity: opacity,
          }}
        >
          <button className="group relative px-8 py-3 overflow-hidden rounded-full border border-white/30 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-amber-400/50 hover:bg-white/10">
            <span className="relative z-10 text-xs uppercase tracking-widest text-white group-hover:text-amber-200 transition-colors duration-300">
              View Portfolio
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>
          
          <button className="group px-8 py-3 rounded-full border border-transparent hover:border-white/20 transition-all duration-300">
            <span className="text-xs uppercase tracking-widest text-white/70 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
              Contact Us
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-[20vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
      >
        <div className="relative w-[1px] h-16 bg-white/20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-200/80 to-transparent animate-[scrollIndicator_2s_ease-in-out_infinite]" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/10 z-20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/10 z-20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/10 z-20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/10 z-20" />

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-120vh) scale(0.5);
            opacity: 0;
          }
        }
        @keyframes scrollIndicator {
          0%, 100% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
