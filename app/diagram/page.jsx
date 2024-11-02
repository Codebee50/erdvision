'use client'
import React, { useEffect, useState, useRef } from 'react';

const Page = () => {
  const [scale, setScale] = useState(1); // For zooming
  const [translate, setTranslate] = useState({ x: 0, y: 0 }); // For panning
  const containerRef = useRef(null);

  const handleZoom = (e) => {
    e.preventDefault(); // Prevent default zooming behavior
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1; // Zoom in/out
    setScale((prev) => Math.min(Math.max(prev * zoomFactor, 0.5), 3));
  };

  const handleDrag = (e) => {
    if (e.buttons !== 1) return; // Ensure left-click is pressed

    console.log(e.movementX)
    setTranslate((prev) => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }));
    // setTranslate((prev) => ({
    //   x: prev.x + e.movementX,
    //   y: prev.y + e.movementY,
    // }));
  };

  // Add the non-passive event listener manually
  useEffect(() => {
    const container = containerRef.current;

    // Attach wheel event with non-passive option
    container.addEventListener('wheel', handleZoom, { passive: false });
    // Cleanup function to remove the event listener
    return () => {
      container.removeEventListener('wheel', handleZoom);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen overflow-hidden bg-[#F2F4F5] cursor-grab"
      onMouseMove={handleDrag}
    >
      <div
        className="w-full h-full flex items-center justify-center gap-2"
        style={{
          transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
        }}
      >
        <div className="w-24 h-24 bg-blue-500 rounded-lg shadow-lg text-white text-center flex items-center justify-center cursor-move">
            <p>Box 1</p>
            <p className='text-sm'>A first text</p>  
        </div>
        <div className="w-24 h-24 bg-red-500 rounded-lg shadow-lg text-white text-center flex items-center justify-center cursor-pointer">
            <p>Box 2</p>
            <p className='text-sm'>A second text</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
