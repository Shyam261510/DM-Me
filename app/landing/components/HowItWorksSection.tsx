"use client";

import { motion } from "framer-motion";
import { Send, Save, Tag, Search } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: Send,
      title: "Send reel via Instagram DM",
      description: "Simply share any Instagram reel to your JustDM account via direct message.",
      color: "#6C5CE7",
    },
    {
      number: "02",
      icon: Save,
      title: "Automatically saved to your library",
      description: "The reel is instantly saved to your organized library. No manual work needed.",
      color: "#FF4D8D",
    },
    {
      number: "03",
      icon: Tag,
      title: "Add tags and search anytime",
      description: "Organize with custom tags and find any reel in seconds with powerful search.",
      color: "#FF8A00",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-32 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How <span className="bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] bg-clip-text text-transparent">JustDM</span> Works
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto">
            Three simple steps to transform how you save and find Instagram reels
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Connection Line (Desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] opacity-20 -z-10" />
                )}

                <div className="p-8 rounded-2xl bg-[#16161F] border border-[#23232E] hover:border-opacity-50 transition-all hover:scale-[1.02] group h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="p-4 rounded-2xl bg-[#16161F] border transition-colors"
                      style={{
                        borderColor: `${step.color}40`,
                        backgroundColor: `${step.color}10`,
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: step.color }} />
                    </div>
                    <span className="text-4xl font-bold text-[#A1A1AA] opacity-30">{step.number}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-[#A1A1AA] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

