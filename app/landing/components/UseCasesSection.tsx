"use client";

import { motion } from "framer-motion";
import { Video, Briefcase, GraduationCap, Smile, TrendingUp } from "lucide-react";

const UseCasesSection = () => {
  const useCases = [
    {
      icon: Video,
      title: "Content Creators",
      description: "Save inspiration, track trends, and organize reference content for your next video.",
      color: "#6C5CE7",
    },
    {
      icon: Briefcase,
      title: "Social Media Managers",
      description: "Manage client content, organize campaign ideas, and never lose track of great reels.",
      color: "#FF4D8D",
    },
    {
      icon: GraduationCap,
      title: "Students / Learners",
      description: "Save educational content, organize by subject, and build your personal learning library.",
      color: "#FF8A00",
    },
    {
      icon: Smile,
      title: "Meme Collectors",
      description: "Build your meme collection, tag by category, and find the perfect meme in seconds.",
      color: "#6C5CE7",
    },
    {
      icon: TrendingUp,
      title: "Entrepreneurs / Business Owners",
      description: "Save marketing inspiration, track competitor content, and organize business ideas.",
      color: "#FF4D8D",
    },
  ];

  return (
    <section className="relative py-32 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for{" "}
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto">
            Whether you're a creator, student, or business owner, JustDM helps you stay organized
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-[#16161F] border border-[#23232E] hover:border-opacity-50 transition-all hover:scale-[1.02] group"
              >
                <div
                  className="p-4 rounded-xl bg-[#16161F] border mb-4 w-fit group-hover:border-opacity-50 transition-colors"
                  style={{
                    borderColor: `${useCase.color}40`,
                    backgroundColor: `${useCase.color}10`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: useCase.color }} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-[#A1A1AA] leading-relaxed">{useCase.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;

