"use client";

import Video from "next-video";
import SetupVideo from "@/videos/Just-DM-Setup-tutorial.mp4";
import { LazyMotion, domAnimation, m } from "framer-motion";

function SetupVideoSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10 flex justify-center flex-col items-center mb-10">
        {/* Heading */}
        <m.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-2 text-3xl sm:text-4xl tracking-tight font-bold mb-4 text-center"
        >
          A Quick Setup With{" "}
          <span>
            Just
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] bg-clip-text text-transparent">
              DM
            </span>
          </span>
        </m.h2>

        <div className="w-full max-w-5xl">
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative w-full rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden bg-white dark:bg-black"
          >
            <Video
              src={SetupVideo}
              className="w-full h-auto"
              thumbnailTime={0}
              controls
              preload="none"
            />
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}

export default SetupVideoSection;
