import React, { useEffect, useRef, useState } from "react";
import { Video, buildSrc } from "@imagekit/next";
import { Play } from "lucide-react";
import { VideoSkeleton } from "./VideoSkeleton";

interface VideoComponentProps {
  url: string;
  thumbnail?: string;
}

export const VideoComponent = ({ url, thumbnail }: VideoComponentProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

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

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const poster = thumbnail
    ? buildSrc({ urlEndpoint: thumbnail, src: thumbnail })
    : undefined;

  return (
    <div
      ref={ref}
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
          <Video
            urlEndpoint={url}
            src={url}
            controls
            preload="metadata"
            poster={poster}
            onLoadedData={() => setLoaded(true)}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Hover Overlay Gradient */}
          <div
            className="
            pointer-events-none absolute inset-0
            opacity-0 group-hover:opacity-100
            transition
            bg-gradient-to-t from-black/60 via-black/20 to-transparent
          "
          />

          {/* Play Button */}
          <div
            className="
            pointer-events-none absolute inset-0
            flex items-center justify-center
            opacity-0 group-hover:opacity-100
            transition-all duration-300
            group-hover:scale-100 scale-90
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
        </>
      )}
    </div>
  );
};
