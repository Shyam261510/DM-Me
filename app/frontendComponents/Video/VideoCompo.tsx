import React, { useEffect, useRef, useState } from "react";
import { Video, buildSrc } from "@imagekit/next";
import { Play } from "lucide-react";
import { VideoSkeleton } from "./VideoSkeleton";

interface VideoComponentProps {
  url: string;
  thumbnail?: string;
}

export const VideoComponent = ({

  url,
  thumbnail,
}: VideoComponentProps) => {
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
      { rootMargin: "200px" }, // preload slightly before visible
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
      className="group relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-black"
    >
      {!visible && <VideoSkeleton />}

      {visible && (
        <>
          {!loaded && <VideoSkeleton />}

          <Video
            urlEndpoint={url}
            src={url}
            controls
            preload="metadata"
            poster={poster}
            onLoadedData={() => setLoaded(true)}
            className={`h-full w-full object-cover transition-opacity ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Hover Play */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 backdrop-blur">
              <Play size={20} className="text-white ml-0.5" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
