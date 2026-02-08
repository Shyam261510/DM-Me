"use client";

import { motion } from "framer-motion";
import { Search, Tag, FolderOpen, Zap, Cloud, Sparkles } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find any reel instantly with powerful search. Search by tags, content, or keywords.",
      color: "#6C5CE7",
    },
    {
      icon: Tag,
      title: "Tag & Categorize",
      description: "Organize your reels with custom tags. Create categories that make sense for you.",
      color: "#FF4D8D",
    },
    {
      icon: FolderOpen,
      title: "Organized Reel Library",
      description: "All your saved reels in one beautiful, organized library. Never lose content again.",
      color: "#FF8A00",
    },
    {
      icon: Zap,
      title: "Instant Access",
      description: "Access your saved reels from anywhere, anytime. No more endless scrolling.",
      color: "#6C5CE7",
    },
    {
      icon: Cloud,
      title: "Cloud Storage",
      description: "Your reels are safely stored in the cloud. Access them from any device.",
      color: "#FF4D8D",
    },
    {
      icon: Sparkles,
      title: "AI Auto Tagging",
      description: "Coming soon: AI-powered automatic tagging to save you even more time.",
      color: "#FF8A00",
      comingSoon: true,
    },
  ];

  return (
    <section id="features" className="relative py-32 bg-[#111118]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] bg-clip-text text-transparent">
              Organize
            </span>
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto">
            Powerful features designed for creators, managers, and anyone who saves reels
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-[#16161F] border border-[#23232E] hover:border-opacity-50 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6C5CE7]/10 group relative"
              >
                {feature.comingSoon && (
                  <div className="absolute top-4 right-4 px-2 py-1 text-xs font-semibold text-[#FF8A00] bg-[#FF8A00]/10 rounded-full border border-[#FF8A00]/30">
                    Coming Soon
                  </div>
                )}
                <div
                  className="p-4 rounded-xl bg-[#16161F] border mb-4 w-fit group-hover:border-opacity-50 transition-colors"
                  style={{
                    borderColor: `${feature.color}40`,
                    backgroundColor: `${feature.color}10`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[#A1A1AA] leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

