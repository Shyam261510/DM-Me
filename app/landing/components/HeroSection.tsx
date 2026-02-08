"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Search, Tag, Send } from "lucide-react";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut", // now properly typed
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C5CE7] rounded-full blur-[120px] opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF4D8D] rounded-full blur-[120px] opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Core Message Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16161F] border border-[#23232E] mb-8"
          >
            <Send className="w-4 h-4 text-[#6C5CE7]" />
            <span className="text-sm text-[#A1A1AA]">DM</span>
            <ArrowRight className="w-4 h-4 text-[#A1A1AA]" />
            <Tag className="w-4 h-4 text-[#FF4D8D]" />
            <ArrowRight className="w-4 h-4 text-[#A1A1AA]" />
            <Search className="w-4 h-4 text-[#6C5CE7]" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Save Instagram Reels
            <br />
            <span className="bg-gradient-to-r from-[#6C5CE7] via-[#FF4D8D] to-[#FF8A00] bg-clip-text text-transparent">
              via DM. Find Them Anytime.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-[#A1A1AA] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            No more endless scrolling through Instagram saves. Just DM a reel,
            organize it with tags, and search it anytime.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
