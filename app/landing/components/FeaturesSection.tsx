"use client";

import { motion } from "framer-motion";
import {
  Search,
  Tag,
  FolderOpen,
  Zap,
  Cloud,
  Sparkles,
  BookText as Book,
} from "lucide-react";
import { Badge } from "../Bage";
const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Find any reel instantly with powerful search. Search by tags, content, or keywords.",
      color: "#6C5CE7",
      grid: "",
    },
    {
      icon: Tag,
      title: "Auto Tagging",
      description: "AI-powered automatic tagging to save you time.",
      color: "#FF4D8D",
      grid: "row-span-2",
    },
    {
      icon: FolderOpen,
      title: "Organized Library",
      description: "All your saved reels in one beautiful, organized library.",
      color: "#FF8A00",
      grid: "",
    },
    {
      icon: Zap,
      title: "Instant Access",
      description: "Access your saved reels from anywhere, anytime.",
      color: "#6C5CE7",
      grid: "sm:row-span-2",
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      description:
        "Your reels are safely stored in the cloud. Access from any device.",
      color: "#3B82F6",
      grid: "",
    },
    {
      icon: Book,
      title: "Script Generation",
      description: "AI help's you in script generation.",
      color: "#10B981",
      grid: "sm:col-start-2 sm:col-span-2",
      commingSoon: true,
    },
  ];

  return (
    <section
      id="features"
      className="relative py-20 md:py-28 bg-[#111118] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Powerful Features
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-[#6C5CE7] via-[#FF4D8D] to-[#FF8A00] bg-clip-text text-transparent">
              Organize
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#A1A1AA] max-w-2xl mx-auto">
            Powerful features designed for creators and anyone who saves reels
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="flex justify-center  items-center">
          <div className="grid w-[50rem] gap-5 grid-flow-row-dense auto-rows-min">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  whileHover={{ scale: 1.02 }}
                  className={`
                  relative group rounded-2xl
                  p-4 sm:p-5 md:p-6
                  bg-gradient-to-br from-[#16161F] to-[#0F0F14]
                  border border-white/10
                  shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                  hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                  transition-all duration-300
                  overflow-hidden
                  min-h-[120px] sm:min-h-[140px]
                  sm:flex sm:flex-col sm:justify-center sm:items-center 
                  ${feature.grid}
                 
                `}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at top right, ${feature.color}15, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon + Badge */}

                    <div className="flex  items-center gap-3 mb-3 sm:justify-center">
                      <div
                        className="p-2.5 sm:p-3 rounded-xl backdrop-blur-sm"
                        style={{
                          background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}05)`,
                          border: `1px solid ${feature.color}30`,
                        }}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      {feature.commingSoon && (
                        <Badge className="text-xs text-[#FF8A00]">
                          Comming soon
                        </Badge>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-center sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-center sm:text-sm text-[#A1A1AA] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom hover line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
