import React, { useRef, useEffect, useState } from 'react';
import { useScroll } from '../hooks/useScroll';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const VerticalMosaic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollY = useScroll();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const speed = 0.1;
      setOffset((window.scrollY - containerRef.current.offsetTop) * speed);
    }
  }, [scrollY]);

  const contactInfo = [
    { icon: MapPin, label: "Address", value: "Near Sant Ganudas Maharaj High School, Shirur Tanda, Bhokar Umri Road, Umri, Nanded - 431807" },
    { icon: Clock, label: "Hours", value: "Mon - Tue: 7:15 AM - 11:00 PM" },
    { icon: Phone, label: "Phone", value: "+91 XXXXX XXXXX" },
    { icon: Mail, label: "Email", value: "contact@naikphotography.com" },
  ];

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-12 bg-[#0a0a0a] overflow-hidden relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Section Header */}
      <div className={`max-w-7xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-amber-400/50 to-transparent" />
          <span className="text-xs uppercase tracking-[0.3em] text-amber-200/60">Gallery</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif italic text-white">
          Captured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">Moments</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto relative">
        {/* Column 1 - Moves Up faster */}
        <div
          className="flex-1 flex flex-col gap-6 md:mt-0"
          style={{ transform: `translateY(${-offset}px)` }}
        >
          <div className={`w-full aspect-[4/5] bg-gray-900 overflow-hidden group hover-trigger rounded-sm border border-white/5 hover:border-amber-400/20 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '100ms' }}>
            <div className="relative w-full h-full">
              <img src="https://picsum.photos/600/800?random=20" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-xs uppercase tracking-widest text-amber-200/80">Wedding</span>
              </div>
            </div>
          </div>
          <div className={`w-full aspect-[3/4] bg-gray-900 overflow-hidden group hover-trigger rounded-sm border border-white/5 hover:border-amber-400/20 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}>
            <div className="relative w-full h-full">
              <img src="https://picsum.photos/600/800?random=21" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-xs uppercase tracking-widest text-amber-200/80">Portrait</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2 - Static with Contact Card */}
        <div className="flex-1 flex flex-col gap-6 md:pt-24">
          <div className={`w-full aspect-[3/4] bg-gray-900 overflow-hidden group hover-trigger rounded-sm border border-white/5 hover:border-amber-400/20 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '300ms' }}>
            <div className="relative w-full h-full">
              <img src="https://picsum.photos/600/800?random=22" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-xs uppercase tracking-widest text-amber-200/80">Engagement</span>
              </div>
            </div>
          </div>
          
          {/* Contact Info Card */}
          <div className={`p-8 rounded-sm border border-white/10 bg-white/[0.02] backdrop-blur-sm flex flex-col justify-center aspect-[4/3] hover:border-amber-400/20 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '400ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-amber-400/30 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-amber-400/70" />
              </div>
              <h3 className="font-serif italic text-3xl text-white">Visit Us</h3>
            </div>
            
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={item.label} className="flex items-start gap-3 group">
                  <item.icon className="w-4 h-4 text-amber-400/50 mt-1 flex-shrink-0 group-hover:text-amber-400/70 transition-colors" />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">{item.label}</span>
                    <span className="text-sm text-gray-300 font-light leading-relaxed">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full py-3 border border-white/20 rounded-full text-xs uppercase tracking-widest text-white/70 hover:border-amber-400/40 hover:text-white hover:bg-amber-400/5 transition-all duration-300">
              Get Directions
            </button>
          </div>
        </div>

        {/* Column 3 - Moves Up slower */}
        <div
          className="flex-1 flex flex-col gap-6 md:pt-12"
          style={{ transform: `translateY(${-offset * 0.5}px)` }}
        >
          <div className={`w-full aspect-[4/5] bg-gray-900 overflow-hidden group hover-trigger rounded-sm border border-white/5 hover:border-amber-400/20 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '500ms' }}>
            <div className="relative w-full h-full">
              <img src="https://picsum.photos/600/800?random=23" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-xs uppercase tracking-widest text-amber-200/80">Maternity</span>
              </div>
            </div>
          </div>
          <div className={`w-full aspect-square bg-gray-900 overflow-hidden group hover-trigger rounded-sm border border-white/5 hover:border-amber-400/20 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '600ms' }}>
            <div className="relative w-full h-full">
              <img src="https://picsum.photos/600/600?random=24" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-xs uppercase tracking-widest text-amber-200/80">Kids</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerticalMosaic;
