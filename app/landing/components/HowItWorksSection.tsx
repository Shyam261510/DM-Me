"use client";

import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Send, Save, Tag } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stepsData = [
  {
    id: 2,
    icon: Save,
    title: "Automatically saved to your library",
    description:
      "The reel is instantly saved to your organized library. No manual work needed.",
    color: "#FF4D8D",
  },
  {
    id: 1,
    icon: Send,
    title: "Send reel via Instagram DM",
    description:
      "Simply share any Instagram reel to your JustDM account via direct message.",
    color: "#6C5CE7",
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
  { scale: 0.9, rotate: -8, x: -120, y: 20, zIndex: 10 },
  { scale: 1, rotate: 0, x: 0, y: 0, zIndex: 30 },
  { scale: 0.9, rotate: 8, x: 120, y: 20, zIndex: 10 },
];

const HowItWorksSection = () => {
  const [steps, setSteps] = useState(stepsData);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Run animation only when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.4 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Rotate cards only when visible
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setSteps((prev) => {
        const arr = [...prev];
        const first = arr.shift();
        arr.push(first!);
        return arr;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        className="relative py-32 bg-[#0B0B0F] overflow-hidden"
        id="how-it-works"
      >
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            How JustDM Works
          </m.h2>

          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#A1A1AA] max-w-2xl mx-auto"
          >
            Three simple steps to transform how you save and find Instagram
            reels
          </m.p>
        </div>

        {/* Stack Area */}
        <div className="relative h-[420px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const pos = positions[index];

              return (
                <m.div
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
                    duration: 0.6,
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
                </m.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    </LazyMotion>
  );
};

export default HowItWorksSection;
