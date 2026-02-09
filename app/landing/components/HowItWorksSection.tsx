"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Save, Tag } from "lucide-react";
import { useEffect, useState } from "react";

const initialSteps = [
  {
    id: 1,
    icon: Send,
    title: "Send reel via Instagram DM",
    description:
      "Simply share any Instagram reel to your JustDM account via direct message.",
    color: "#6C5CE7",
  },
  {
    id: 2,
    icon: Save,
    title: "Automatically saved to your library",
    description:
      "The reel is instantly saved to your organized library. No manual work needed.",
    color: "#FF4D8D",
  },
  {
    id: 3,
    icon: Tag,
    title: "Add tags and search anytime",
    description:
      "Organize with custom tags and find any reel in seconds with powerful search.",
    color: "#FF8A00",
  },
];

const positions = [
  {
    scale: 0.9,
    rotate: -8,
    x: -120,
    y: 20,
    zIndex: 10,
  },
  {
    scale: 1,
    rotate: 0,
    x: 0,
    y: 0,
    zIndex: 30,
  },
  {
    scale: 0.9,
    rotate: 8,
    x: 120,
    y: 20,
    zIndex: 10,
  },
];

const HowItWorksSection = () => {
  const [steps, setSteps] = useState(initialSteps);

  // Infinite swap every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setSteps((prev) => {
        const newArr = [...prev];
        const first = newArr.shift();
        newArr.push(first!);
        return newArr;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 bg-[#0B0B0F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          How JustDM Works
        </h2>
        <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto">
          Three simple steps to transform how you save and find Instagram reels
        </p>
      </div>

      {/* Stack Area */}
      <div className="relative h-[420px] flex items-center justify-center">
        <AnimatePresence>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const pos = positions[index];

            return (
              <motion.div
                key={step.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  scale: pos.scale,
                  rotate: pos.rotate,
                  x: pos.x,
                  y: pos.y,
                  zIndex: pos.zIndex,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
                className="absolute w-[320px] p-8 rounded-2xl bg-[#16161F] border border-[#23232E]"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="p-4 rounded-2xl border"
                    style={{
                      borderColor: `${step.color}40`,
                      backgroundColor: `${step.color}10`,
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: step.color }} />
                  </div>
                  <span className="text-4xl font-bold text-[#A1A1AA] opacity-30">
                    0{step.id}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-[#A1A1AA] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HowItWorksSection;
