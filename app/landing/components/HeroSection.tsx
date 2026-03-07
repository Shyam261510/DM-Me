"use client";

import { motion, Variants } from "framer-motion";

import ShootingStars from "../ShootingStars";

import { Instrument_Serif } from "next/font/google";

import dynamic from "next/dynamic";
const SetupVideoSection = dynamic(() => import("./SetupVideoSection"));

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["italic"],
});

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
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

const HeroSection = () => {
  return (
    <section className="min-h-screen w-full relative pt-24 sm:pt-32 px-4 sm:px-6">
      <div className="absolute inset-0 w-full mx-auto z-1">
        <ShootingStars />
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col justify-center items-center w-full h-full space-y-4 sm:space-y-8 "
      >
        <motion.h2
          variants={item}
          className="text-[11px] sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 border rounded-2xl"
        >
          THE INSTAGRAM ORGANIZER
        </motion.h2>

        <motion.h2
          variants={item}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-normal w-full text-center"
        >
          Saved a reel.. but{" "}
          <span className="tracking-tight px-1 sm:px-2 bg-gradient-to-r from-[#FF4D8D] to-[#FF8A00] bg-clip-text text-transparent">
            can't <span className="tracking-normal">find</span> it?
          </span>
        </motion.h2>

        <motion.p
          variants={item}
          className="text-sm sm:text-base lg:text-lg text-zinc-300 text-center w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto"
        >
          Stop losing your favorite Instagram reels in the void. JustDM
          organizes your saves into searchable, actionable collections so you
          can actually find them later.
        </motion.p>

        <motion.div variants={item} className="w-full pointer-events-none z-10">
          <SetupVideoSection />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
