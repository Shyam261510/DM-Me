"use client";

import Video from "next-video";
import SetupVideo from "@/videos/Just-DM-Setup-tutorial.mp4";

export default function SetupVideoSection() {
  return (
    <section className="flex flex-col items-center px-4 mb-10">
      {/* Video */}
      <div className="w-full max-w-5xl rounded-xl overflow-hidden border shadow">
        <Video
          src={SetupVideo}
          controls
          thumbnailTime={0}
          preload="none"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
