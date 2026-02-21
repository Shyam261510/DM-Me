import React, { useEffect, useRef, useState } from "react";

import { Play } from "lucide-react";
import { VideoSkeleton } from "./VideoSkeleton";

interface VideoComponentProps {
  url: string;
}

export const VideoComponent = ({ url }: VideoComponentProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<any>(null);

  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Lazy load when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Pause when out of view (nice UX)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePlayClick = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="
        group relative w-full aspect-[9/16]
        overflow-hidden rounded-xl
        bg-[#0B0B0F]
        border border-[#23232E]
        transition-all duration-300
        hover:border-[#6C5CE7]/40
      "
    >
      {/* Skeleton before visible */}
      {!visible && <VideoSkeleton />}

      {visible && (
        <>
          {!loaded && <VideoSkeleton />}

          {/* Video */}
          <video
            ref={videoRef}
            src={url}
            controls={playing}
            controlsList="nofullscreen"
            preload="metadata"
            onLoadedData={() => setLoaded(true)}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onClick={(e: React.MouseEvent<HTMLVideoElement>) => {
              e.stopPropagation();
              const video = videoRef.current;
              if (!video) return;

              if (video.paused) {
                video.play();
                setPlaying(true);
              } else {
                video.pause();
                setPlaying(false);
              }
            }}
          />

          {/* Hover Gradient */}
          <div
            className="
              pointer-events-none absolute inset-0
              opacity-0 group-hover:opacity-100
              transition
              bg-gradient-to-t from-black/60 via-black/20 to-transparent
            "
          />

          {/* Play Button */}
          {!playing && (
            <div
              onClick={handlePlayClick}
              className="
                absolute inset-0
                flex items-center justify-center
                opacity-0 group-hover:opacity-100
                transition-all duration-300
                group-hover:scale-100 scale-90
                cursor-pointer
              "
            >
              <div
                className="
                  flex h-14 w-14 items-center justify-center
                  rounded-full
                  bg-[#16161F]/80
                  border border-[#23232E]
                  backdrop-blur
                  shadow-[0_0_30px_rgba(108,92,231,0.25)]
                "
              >
                <Play size={22} className="text-white ml-0.5" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
