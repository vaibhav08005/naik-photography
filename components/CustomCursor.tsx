import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a') || target.closest('button') || target.closest('.hover-trigger');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      {/* Main Dot */}
      <div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${position.x - 6}px, ${position.y - 6}px) scale(${isHovering ? 0 : 1})`,
        }}
      />
      {/* Follower Ring */}
      <div
        className={`fixed top-0 left-0 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference transition-all duration-300 ease-out flex items-center justify-center`}
        style={{
          width: isHovering ? '60px' : '30px',
          height: isHovering ? '60px' : '30px',
          transform: `translate(${position.x - (isHovering ? 30 : 15)}px, ${position.y - (isHovering ? 30 : 15)}px)`,
          backgroundColor: isHovering ? 'white' : 'transparent',
        }}
      >
        {isHovering && <span className="text-black text-[10px] font-bold tracking-widest uppercase">View</span>}
      </div>
    </>
  );
};

export default CustomCursor;
