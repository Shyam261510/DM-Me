"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Search, Tag, Send } from "lucide-react";
import ShootingStars from "../ShootingStars";
import { useState, useMemo, useEffect } from "react";
const HeroSection = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Becomes A Mess.", "via DM. Find Them Anytime."],
    [],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <ShootingStars />
      </div>

      <div className="relative z-10  mx-auto px-6 py-20 md:w-7xl">
        <div className="text-center">
          {/* Core Message Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16161F] border border-[#23232E] mb-8">
            <Send className="w-4 h-4 text-[#6C5CE7]" />
            <span className="text-sm text-[#A1A1AA]">DM</span>
            <ArrowRight className="w-4 h-4 text-[#A1A1AA]" />
            <Tag className="w-4 h-4 text-[#FF4D8D]" />
            <ArrowRight className="w-4 h-4 text-[#A1A1AA]" />
            <Search className="w-4 h-4 text-[#6C5CE7]" />
          </div>

          {/* Headline */}
          <h1 className="text-[5vw] sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Save Instagram Reels
            <br />
            <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
              &nbsp;
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-semibold bg-gradient-to-r from-[#6C5CE7] via-[#FF4D8D] to-[#FF8A00] bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: "-100" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? {
                          y: 0,
                          opacity: 1,
                        }
                      : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#A1A1AA] mb-10 max-w-2xl mx-auto leading-relaxed">
            No more endless scrolling through Instagram saves. Just DM a reel,
            organize it with tags, and search it anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
