import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let trailId = 0;
    
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add trail point
      trailId++;
      setTrail(prev => [...prev.slice(-5), { x: e.clientX, y: e.clientY, id: trailId }]);
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a') || target.closest('button') || target.closest('.hover-trigger');
      setIsHovering(!!isClickable);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      {/* Trail dots */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed top-0 left-0 w-1 h-1 bg-amber-400/30 rounded-full pointer-events-none z-[9997]"
          style={{
            transform: `translate(${point.x - 2}px, ${point.y - 2}px)`,
            opacity: (index + 1) / trail.length * 0.5,
          }}
        />
      ))}

      {/* Main Dot */}
      <div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${position.x - 6}px, ${position.y - 6}px) scale(${isHovering ? 0 : 1}) scale(${isClicking ? 0.8 : 1})`,
        }}
      />
      
      {/* Follower Ring */}
      <div
        className={`fixed top-0 left-0 border rounded-full pointer-events-none z-[9998] mix-blend-difference transition-all duration-300 ease-out flex items-center justify-center ${
          isHovering ? 'border-transparent' : 'border-white/50'
        }`}
        style={{
          width: isHovering ? '80px' : '40px',
          height: isHovering ? '80px' : '40px',
          transform: `translate(${position.x - (isHovering ? 40 : 20)}px, ${position.y - (isHovering ? 40 : 20)}px) scale(${isClicking ? 0.9 : 1})`,
          backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.9)' : 'transparent',
          boxShadow: isHovering ? '0 0 30px rgba(212, 175, 55, 0.3)' : 'none',
        }}
      >
        {isHovering && (
          <span className="text-black text-[10px] font-bold tracking-widest uppercase animate-pulse">
            View
          </span>
        )}
      </div>

      {/* Outer glow ring */}
      <div
        className="fixed top-0 left-0 border border-amber-400/20 rounded-full pointer-events-none z-[9996] transition-all duration-500 ease-out"
        style={{
          width: isHovering ? '100px' : '60px',
          height: isHovering ? '100px' : '60px',
          transform: `translate(${position.x - (isHovering ? 50 : 30)}px, ${position.y - (isHovering ? 50 : 30)}px)`,
          opacity: isHovering ? 0.6 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
