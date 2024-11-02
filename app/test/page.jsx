'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
const Page = () => {
  const [scale, setScale] = useState(1); // For zooming
  const containerRef = useRef(null);


  const handleZoom = (e) => {
    console.log('zooming')
    e.preventDefault(); // Prevent default zooming behavior
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1; // Zoom in/out
    setScale((prev) => Math.min(Math.max(prev * zoomFactor, 0.5), 3));
  };

  // Add the non-passive event listener manually
  useEffect(() => {
    const container = containerRef.current;

    // Attach wheel event with non-passive option
    container.addEventListener("wheel", handleZoom, { passive: false });
    // Cleanup function to remove the event listener
    return () => {
      container.removeEventListener("wheel", handleZoom);
    };
  }, []);

  return (
    <section className="w-screen h-screen bg-white" ref={containerRef}>
      <div className="w-[40000px] h-[40000px] bg-red-400 flex"  style={{
          transform: `scale(${scale})`,
        }}>
        <div className="w-24 h-24 bg-blue-500 rounded-lg shadow-lg text-white text-center flex items-center justify-center cursor-move">
          <p>Box 1</p>
          <p className="text-sm">A first text</p>
        </div>
      </div>
    </section>
  );
};

export default Page;
