"use client";

import { motion, Variants } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Typewriter } from "@/app/frontendComponents/Custom/Typewriter";

import Reel2 from "@/public/reels/reel2.webp";
import Reel3 from "@/public/reels/reel3.webp";
import Reel5 from "@/public/reels/reel5.webp";
import Reel6 from "@/public/reels/reel6.webp";
import Reel7 from "@/public/reels/reel7.webp";
import Reel9 from "@/public/reels/reel9.webp";

import Reel13 from "@/public/reels/reel13.webp";
import Reel14 from "@/public/reels/reel14.webp";

import { Instrument_Serif } from "next/font/google";
import { useMemo, useState } from "react";
import ReelSkeleton from "@/app/frontendComponents/Reels/ReelSkeleton";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["italic"],
});
const Categories = [
  {
    search: "Reels regarding content creation.",
    results: [
      {
        image: Reel2.src,
        caption: "Behind the scenes of creating engaging reels ✨📱",
        niche: "Content Creation",
        subNiche: "Behind the Scenes",
      },
      {
        image: Reel3.src,
        caption: "Tips to level up your content creation game 🚀🎬",
        niche: "Content Creation",
        subNiche: "Tips & Growth",
      },
      {
        image: Reel5.src,
        caption: "Editing tricks every content creator should know 🎥⚡",
        niche: "Content Creation",
        subNiche: "Editing Tips",
      },
      {
        image: Reel6.src,
        caption: "From idea to viral reel – the creator journey 💡🔥",
        niche: "Content Creation",
        subNiche: "Creator Journey",
      },
    ],
  },
  {
    search: "Reels regarding video editing.",
    results: [
      {
        image: Reel7.src,
        caption: "Quick video editing tips to make your reels stand out 🎥⚡",
        niche: "Video Editing",
        subNiche: "Quick Tips",
      },
      {
        image: Reel9.src,
        caption: "Transform raw clips into cinematic edits ✂️🔥",
        niche: "Video Editing",
        subNiche: "Cinematic Editing",
      },
      {
        image: Reel13.src,
        caption: "Simple transitions that instantly upgrade your edits 🎬✨",
        niche: "Video Editing",
        subNiche: "Transitions",
      },
      {
        image: Reel14.src,
        caption: "Editing workflow every creator should know 💻🎞️",
        niche: "Video Editing",
        subNiche: "Editing Workflow",
      },
    ],
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
const ProductDemoSection = () => {
  return (
    <section
      id="demo"
      className="relative py-24 bg-gradient-to-b from-black via-zinc-950 to-black space-y-5"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center space-y-6">
          <motion.h2
            variants={item}
            className="text-[11px] sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 border rounded-2xl"
          >
            The Smartest Way to Save
          </motion.h2>

          <motion.h2
            variants={item}
            className="text-5xl md:text-7xl lg:text-8xl tracking-tighter w-full text-center"
          >
            Find any reel in{" "}
            <span
              className={`${instrumentSerif.className} tracking-tight px-1 sm:px-2 bg-gradient-to-r from-[#FF4D8D] to-[#FF8A00] bg-clip-text text-transparent`}
            >
              seconds.
            </span>
          </motion.h2>

          <motion.p
            variants={item}
            className="text-sm sm:text-base lg:text-lg text-zinc-300 text-center w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto"
          >
            Stop scrolling endlessly. JustDM's AI-powered search indexes your
            Instagram saves so you can find that one recipe, workout, or meme
            instantly.
          </motion.p>
        </div>
      </motion.div>

      <IntractiveSection />
    </section>
  );
};

export default ProductDemoSection;

function IntractiveSection() {
  const [displayText, setDisplayText] = useState<string>("");

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6">
      <div className="relative w-[75%] md:w-[70%] lg:w-[55%] xl:w-[30%] flex flex-col items-center justify-center">
        <div className="border w-full px-5 py-2 rounded-lg flex justify-between items-center ">
          <div className="flex items-center gap-6">
            {" "}
            <Search size={15} />
            <Typewriter
              text={Categories.map((c) => c.search)}
              loop={true}
              speed={50}
              displayText={displayText}
              setDisplayText={setDisplayText}
            />
          </div>
          <div className="h-7 w-7 bg-zinc-800 rounded-full flex items-center justify-center ">
            <ArrowRight size={15} />
          </div>
        </div>
      </div>

      <div className="w-[75%] md:w-[70%] lg:w-[65%]  space-y-6">
        <h2 className="text-sm tracking-tight text-zinc-400 font-semibold text-start">
          INSTANT RESULTS
        </h2>

        <ResultSection displayText={displayText} />
      </div>
    </div>
  );
}

function ResultSection({ displayText }: { displayText: string }) {
  const results = useMemo(() => {
    if (Categories.some((c) => c.search === displayText)) {
      return Categories.find((c) => c.search === displayText)?.results;
    }
    return [] as {
      image: string;
      caption: string;
      niche: string;
      subNiche: string;
    }[];
  }, [displayText]);

  return (
    <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 gap-5">
      {results?.length === 0
        ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="">
              <ReelSkeleton aspectRatio="9/12" />
            </div>
          ))
        : results?.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="relative aspect-[9/12] overflow-hidden rounded-xl">
                <Image
                  src={result.image}
                  width={500}
                  height={500}
                  alt={`Reel-${index + 1}`}
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              <div className="p-3 space-y-2">
                <h2 className="text-sm font-medium text-white line-clamp-2">
                  {result.caption}
                </h2>

                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-[#6C5CE7]/15 text-[#6C5CE7] border border-[#6C5CE7]/30">
                    {result.niche}
                  </span>

                  <span className="text-xs px-2 py-1 rounded-full bg-[#FF4D8D]/15 text-[#FF4D8D] border border-[#FF4D8D]/30">
                    {result.subNiche}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
    </div>
  );
}
