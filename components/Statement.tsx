import React, { useEffect, useRef, useState } from 'react';
import { Camera, Sparkles, Heart } from 'lucide-react';

const Statement: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { 
      icon: Camera, 
      title: "Diverse Specialization", 
      desc: "From professional portfolios and drone shoots to lifestyle, maternity, and kids photography, we offer a wide range of creative services." 
    },
    { 
      icon: Sparkles, 
      title: "Creative Hub", 
      desc: "Located in Nanded, we are recognized for our quality and creativity, positioning us as one of the best photo studios in the area." 
    },
    { 
      icon: Heart, 
      title: "Precision & Passion", 
      desc: "Every project is handled with a focus on technical excellence and artistic vision to create lasting visual legacies." 
    }
  ];

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center bg-[#0a0a0a] py-32 px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
            transform: `translateY(${scrollProgress * 50}px)`,
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, transparent 70%)',
            transform: `translateY(${-scrollProgress * 30}px)`,
          }}
        />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Section label */}
        <div 
          className={`flex items-center justify-center gap-3 mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400/50" />
          <span className="text-xs uppercase tracking-[0.3em] text-amber-200/60">About Us</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400/50" />
        </div>

        {/* Main statement */}
        <p 
          className={`font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.3] transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-amber-100">
            Naik Photography
          </span>
          <span className="text-white/40">, established in </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">2024</span>
          <span className="text-white/40">, is Nanded's creative photography hub.
          We capture </span>
          <span className="italic text-white relative group cursor-default">
            timeless memories
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-200 group-hover:w-full transition-all duration-500" />
          </span>
          <span className="text-white/40"> with precision and passion through modern shoots and creative storytelling.</span>
        </p>

        {/* Features grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((item, index) => (
            <div 
              key={item.title} 
              className={`group relative p-8 rounded-lg border border-white/5 bg-white/[0.02] backdrop-blur-sm
                hover:border-amber-400/20 hover:bg-white/[0.04] transition-all duration-500
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-full border border-amber-400/30 flex items-center justify-center
                  group-hover:border-amber-400/50 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-5 h-5 text-amber-400/70 group-hover:text-amber-400 transition-colors duration-300" />
                </div>

                <h4 className="text-sm uppercase tracking-widest mb-4 text-white group-hover:text-amber-100 transition-colors duration-300">
                  {item.title}
                </h4>
                
                <p className="text-gray-400 font-light leading-relaxed text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-amber-400/0 group-hover:border-amber-400/30 rounded-tr-lg transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-amber-400/0 group-hover:border-amber-400/30 rounded-bl-lg transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div 
          className={`mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: "500+", label: "Projects Completed" },
            { value: "50+", label: "Happy Clients" },
            { value: "6+", label: "Service Categories" },
            { value: "1", label: "Creative Vision" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center group">
              <div className="text-3xl md:text-4xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 mb-2
                group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statement;
