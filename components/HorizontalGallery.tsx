import React, { useRef, useEffect, useState } from 'react';
import { Project } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HorizontalGalleryProps {
  onSelectCategory: (category: string) => void;
}

const projects: Project[] = [
  {
    id: 1,
    title: "The Big Day",
    category: "Wedding",
    year: "2024",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Celebrations",
    category: "Birthday",
    year: "2024",
    image: "images/birtday_celebration.jpg"
  },
  {
    id: 3,
    title: "Forever & Always",
    category: "Engagement",
    year: "2024",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Motherhood",
    category: "Maternity",
    year: "2024",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Little Stars",
    category: "Kids & Newborn",
    year: "2024",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Cinematic Moments",
    category: "Videography",
    year: "2024",
    image: "images/cinematic.jpg"
  },
];

const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({ onSelectCategory }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const distance = -sectionTop;
      const totalDistance = sectionHeight - windowHeight;

      let percentage = distance / totalDistance;
      percentage = Math.max(0, Math.min(1, percentage));

      setProgress(percentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div ref={sectionRef} className="relative h-[400vh] bg-[#0a0a0a]">
        {/* Background gradient accent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
              transform: `translateX(${-progress * 200}px)`,
            }}
          />
          <div 
            className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
              transform: `translateX(${progress * 100}px)`,
            }}
          />
        </div>

        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
          {/* Section Header */}
          <div 
            className={`pt-12 px-10 md:px-20 z-10 pointer-events-none shrink-0 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-amber-400/60" />
              <span className="text-xs uppercase tracking-[0.3em] text-amber-200/60">Featured Work</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif italic mb-2 text-white">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">Portfolio</span>
            </h2>
            <p className="text-xs uppercase tracking-widest opacity-70 text-white">Curating Heartfelt Experiences</p>
          </div>

          {/* Progress indicator */}
          <div className="absolute top-1/2 right-6 -translate-y-1/2 z-20 hidden md:block">
            <div className="w-[2px] h-32 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="w-full bg-gradient-to-b from-amber-400/80 to-amber-200/40 transition-all duration-100"
                style={{ height: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* The Moving Track */}
          <div className="flex-1 flex items-center w-full">
            <div
              ref={trackRef}
              className="flex gap-10 md:gap-20 px-[20vw] items-center will-change-transform"
              style={{
                transform: `translateX(${-progress * 60}%)`,
                transition: 'transform 0.1s linear'
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="relative shrink-0 group hover-trigger cursor-pointer"
                  onClick={() => onSelectCategory(project.category)}
                  style={{
                    transform: `translateY(${index % 2 === 0 ? '0' : '40px'})`,
                    transition: 'transform 0.5s ease-out',
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Image Container with glassmorphism border */}
                  <div className="relative w-[70vw] md:w-[25vw] aspect-[3/4] overflow-hidden bg-neutral-900 
                    border border-white/10 group-hover:border-amber-400/30 
                    rounded-sm transition-all duration-500 
                    shadow-[0_0_30px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.15)]">
                    
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </div>

                    <img
                      src={project.image}
                      alt={project.title}
                      loading="eager"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 block"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 text-[10px] uppercase tracking-widest bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white/80">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Overlay Text */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                      <div className="bg-black/60 backdrop-blur-md px-6 py-3 border border-amber-400/30 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-xs uppercase tracking-widest text-white">View Gallery</span>
                        <ArrowRight className="w-4 h-4 text-amber-400" />
                      </div>
                    </div>

                    {/* Bottom info always visible */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-xl md:text-2xl font-serif italic text-white mb-1">{project.title}</h3>
                      <p className="text-xs text-white/60 uppercase tracking-wider">{project.year}</p>
                    </div>
                  </div>

                  {/* Decorative line below card */}
                  <div className="mt-6 flex justify-between items-center">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent group-hover:from-amber-400/40 transition-all duration-500" />
                    <span className="ml-4 text-xs text-white/30 font-light">0{index + 1}</span>
                  </div>
                </div>
              ))}

              {/* End Card */}
              <div className="shrink-0 w-[30vw] flex items-center justify-center">
                <div className="text-center group cursor-pointer">
                  <div className="relative w-24 h-24 mx-auto mb-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber-400/40 group-hover:scale-110 transition-all duration-500">
                    <ArrowRight className="w-6 h-6 text-white/50 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" />
                    <div className="absolute inset-0 rounded-full border border-amber-400/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                  </div>
                  <p className="font-serif text-3xl md:text-4xl italic mb-2 text-white/80 group-hover:text-white transition-colors">View All</p>
                  <p className="text-xs uppercase tracking-widest text-white/40">Services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalGallery;
