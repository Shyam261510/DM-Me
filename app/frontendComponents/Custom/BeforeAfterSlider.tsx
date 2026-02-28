"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className: string;
}

function BeforeAfterSlider({
  beforeImage,
  afterImage,
  className = "",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(50);

  // Initialize center position
  useEffect(() => {
    updateStyles(50);
  }, []);

  const updateStyles = (percentage: number) => {
    setPosition(percentage);

    if (handleRef.current) handleRef.current.style.left = `${percentage}%`;

    if (lineRef.current) lineRef.current.style.left = `${percentage}%`;

    if (beforeRef.current)
      beforeRef.current.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;

    if (afterRef.current)
      afterRef.current.style.clipPath = `inset(0 0 0 ${percentage}%)`;
  };

  const moveSlider = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let offsetX = clientX - rect.left;

    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    updateStyles(percentage);
  };

  // Mouse / Touch listeners
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) moveSlider(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging) moveSlider(e.touches[0].clientX);
    };

    const stopDragging = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`w-5xl mx-auto h-[30rem] mt-[5rem] relative rounded-5xl  ${className}`}
    >
      <div
        ref={beforeRef}
        className="w-5xl h-full absolute top-0 left-0 flex items-center justify-center overflow-hidden"
      >
        <Image
          className="object-cover"
          src={beforeImage}
          alt="Before Image"
          fill
        />
      </div>

      <div
        ref={afterRef}
        className="w-5xl h-full absolute top-0 left-0 flex items-center justify-center overflow-hidden"
      >
        <Image
          className="object-cover"
          src={afterImage}
          alt="After Image"
          fill
        />
      </div>

      <div
        ref={handleRef}
        className="absolute top-0 left-1/2 w-0 h-full bg-white cursor-pointer z-20"
        id="sliderHandle"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      ></div>

      <div
        ref={lineRef}
        className="slider-line"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div className="pulse-container">
          <svg
            role="presentation"
            focusable="false"
            fill="none"
            width="50"
            height="50"
            viewBox="0 0 50 50"
          >
            <g>
              <rect width="50" height="50" rx="25" fill="#ffffff"></rect>
              <path
                d="m19.25 19-6 6 6 6m11.5 0 6-6-6-6"
                stroke="#000000"
                strokeWidth=".75"
                strokeLinecap="square"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default BeforeAfterSlider;
