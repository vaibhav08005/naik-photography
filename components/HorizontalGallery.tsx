import React, { useRef, useEffect, useState } from 'react';
import { Project } from '../types';

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
    image: "public/images/birtday_celebration.jpg"
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
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

          {/* Section Header */}
          <div className="pt-12 px-10 md:px-20 z-10 pointer-events-none shrink-0">
            <h2 className="text-4xl md:text-6xl font-serif italic mb-2 text-white">Our Portfolio</h2>
            <p className="text-xs uppercase tracking-widest opacity-70 text-white">Curating Heartfelt Experiences</p>
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
                    // Parallax effect on y-axis for odd/even items for organic feel
                    transform: `translateY(${index % 2 === 0 ? '0' : '40px'})`
                  }}
                >
                  {/* Image Container */}
                  <div className="relative w-[70vw] md:w-[25vw] aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 group-hover:border-white/20">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="eager"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 block"
                    />

                    {/* Dark overlay that fades out on hover - Reduced opacity for better visibility */}
                    <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                    {/* Hover Overlay Text */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                      <div className="bg-black/50 backdrop-blur-sm px-6 py-3 border border-white/20 rounded-full">
                        <span className="text-xs uppercase tracking-widest text-white">View Gallery</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-end border-b border-white/20 pb-4 group-hover:border-white/50 transition-colors">
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest mb-1 text-gray-400 group-hover:text-white transition-colors">{project.category}</span>
                      <h3 className="text-2xl md:text-3xl font-serif italic">{project.title}</h3>
                    </div>
                    <span className="text-sm font-light opacity-50 group-hover:opacity-100 transition-opacity">{project.year}</span>
                  </div>
                </div>
              ))}

              {/* End Card */}
              <div className="shrink-0 w-[30vw] flex items-center justify-center">
                <div className="text-center opacity-50">
                  <p className="font-serif text-4xl italic mb-4">View All Services</p>
                  <div className="w-16 h-[1px] bg-white mx-auto"></div>
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