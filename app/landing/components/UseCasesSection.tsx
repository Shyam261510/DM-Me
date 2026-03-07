"use client";

import RadialOrbitalTimeline from "@/app/landing/RadialOrbitTimeLine";
import {
  Video,
  Briefcase,
  GraduationCap,
  Smile,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const useCases = [
  {
    id: 1,
    icon: Video,
    title: "Content Creators",
    description:
      "Save inspiration, track trends, and organize reference content for your next video.",
  },
  {
    id: 2,
    icon: Briefcase,
    title: "Social Media Managers",
    description:
      "Manage client content, organize campaign ideas, and never lose track of great reels.",
  },
  {
    id: 3,
    icon: GraduationCap,
    title: "Students / Learners",
    description:
      "Save educational content, organize by subject, and build your personal learning library.",
  },
  {
    id: 4,
    icon: Smile,
    title: "Meme Collectors",
    description:
      "Build your meme collection, tag by category, and find the perfect meme in seconds.",
  },
  {
    id: 5,
    icon: TrendingUp,
    title: "Entrepreneurs / Business Owners",
    description:
      "Save marketing inspiration, track competitor content, and organize business ideas.",
  },
];

export const UseCasesSection = () => {
  return (
    <section id="build-for-everyone" className="bg-black py-8">
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
          Whether you're a creator, student, or business owner, JustDM helps you
          stay organized
        </p>
      </motion.div>

      <RadialOrbitalTimeline timelineData={useCases} />
    </section>
  );
};
