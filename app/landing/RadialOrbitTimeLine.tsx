"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const randomIndex = Math.floor(Math.random() * timelineData.length);
  const randomId = timelineData[randomIndex]?.id;

  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    randomId ? { [randomId]: true } : {},
  );
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [radius, setRadius] = useState(220);
  const [orbitSize, setOrbitSize] = useState(440);

  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  /* ---------------- Responsive Sizes ---------------- */
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setRadius(130);
        setOrbitSize(260);
        setAutoRotate(false); // better UX on mobile
      } else if (width < 1024) {
        setRadius(180);
        setOrbitSize(360);
        setAutoRotate(true);
      } else {
        setRadius(220);
        setOrbitSize(440);
        setAutoRotate(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------------- Auto Rotation ---------------- */
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.3) % 360);
      }, 40);
    }

    return () => clearInterval(timer);
  }, [autoRotate]);

  /* ---------------- Center Node ---------------- */
  const centerViewOnNode = (nodeId: number) => {
    const index = timelineData.findIndex((i) => i.id === nodeId);
    const total = timelineData.length;
    const targetAngle = (index / total) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      newState[id] = !prev[id];

      if (!prev[id]) {
        setAutoRotate(false);
        centerViewOnNode(id);
      } else {
        setAutoRotate(true);
      }

      return newState;
    });
  };

  const handleContainerClick = () => {
    setExpandedItems({});
    setAutoRotate(true);
  };

  /* ---------------- Position Calculation ---------------- */
  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)),
    );

    return { x, y, zIndex, opacity };
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="w-full h-[600px] sm:h-[700px] lg:h-screen flex items-center justify-center overflow-hidden mt-[-6rem]"
    >
      <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
        {/* ---------------- Center Orb ---------------- */}
        <div className="absolute z-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
          <div className="absolute rounded-full border border-white/10 animate-ping w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
          <div
            className="absolute rounded-full border border-white/5 animate-ping w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36"
            style={{ animationDelay: "0.6s" }}
          />
          <div className="bg-white rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
        </div>

        {/* ---------------- Orbit Ring ---------------- */}
        <div
          className="absolute rounded-full border border-white/10"
          style={{
            width: orbitSize,
            height: orbitSize,
          }}
        />

        {/* ---------------- Nodes ---------------- */}
        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isExpanded = expandedItems[item.id];
          const Icon = item.icon;

          const nodeStyle = {
            transform: `translate(${position.x}px, ${position.y}px)`,
            zIndex: isExpanded ? 200 : position.zIndex,
            opacity: isExpanded ? 1 : position.opacity,
          };

          return (
            <div
              key={item.id}
              ref={(el) => {
                nodeRefs.current[item.id] = el;
              }}
              className="absolute transition-all duration-700 cursor-pointer group"
              style={nodeStyle}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
            >
              {/* Glow when active */}
              {isExpanded && (
                <div className="absolute -inset-4 rounded-full bg-white/10 blur-xl animate-pulse" />
              )}

              {/* Node Circle */}
              <div
                className={`
                  flex items-center justify-center rounded-full backdrop-blur-xl border transition-all duration-300
                  w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12
                  ${
                    isExpanded
                      ? "bg-white text-black border-white scale-125 shadow-lg shadow-white/30"
                      : "bg-white/5 text-white border-white/20 group-hover:bg-white/10"
                  }
                `}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[18px] lg:h-[18px]" />
              </div>

              {/* Label (hidden on mobile) */}
              <div
                className={`
                  hidden sm:block
                  absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs tracking-wide transition-all duration-300
                  ${
                    isExpanded
                      ? "text-white font-semibold scale-110"
                      : "text-white/60 group-hover:text-white"
                  }
                `}
              >
                {item.title}
              </div>

              {/* Expanded Card */}
              {isExpanded && (
                <Card className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 w-56 sm:w-64 max-w-[80vw] bg-[rgba(0,0,0,0.7)] backdrop-blur-xs border border-white/20 shadow-2xl shadow-black/50 ">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-white/40" />

                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-white">
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-xs text-white/70 leading-relaxed">
                    {item.description}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
