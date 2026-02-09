"use client";

import { motion } from "framer-motion";

const stars = Array.from({ length: 40 });
const meteors = Array.from({ length: 7 });

export default function ShootingStars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Twinkling background stars */}
      {stars.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting meteors: Top-left → Bottom-right */}
      {meteors.map((_, i) => {
        const startTop = Math.random() * 40; // start near top
        const startLeft = Math.random() * 40; // start near left

        return (
          <motion.div
            key={`meteor-${i}`}
            className="absolute pointer-events-none"
            style={{
              top: `${startTop}%`,
              left: `${startLeft}%`,
            }}
            initial={{
              x: -200,
              y: -200,
              opacity: 0,
            }}
            animate={{
              x: 600, // move right
              y: 600, // move down
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.2,
              delay: Math.random() * 6,
              repeat: Infinity,
              repeatDelay: Math.random() * 8 + 4,
              ease: "easeOut",
            }}
          >
            {/* Meteor tail */}
            <div className="w-[2px] h-[100px] bg-gradient-to-b from-white via-white/80 to-transparent rotate-45 blur-[0.5px]" />
          </motion.div>
        );
      })}
    </div>
  );
}
