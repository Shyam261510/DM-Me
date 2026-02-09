"use client";

import { motion } from "framer-motion";
import { Send, Search, Tag } from "lucide-react";
import Image from "next/image";
import Reel1 from "@/public/reels/reel1.png";
import Reel2 from "@/public/reels/reel2.png";
import Reel3 from "@/public/reels/reel3.png";

const ProductDemoSection = () => {
  const Reels = [Reel1, Reel2, Reel3];
  const Tags = [
    { niche: "Fitness", subNiche: "Bench Press" },
    { niche: "Tech", subNiche: "Interview Prep" },
    { niche: "Book Reading", subNiche: "Self-Motivation" },
  ];
  return (
    <section id="demo" className="relative py-32 bg-[#111118]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            See{" "}
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] bg-clip-text text-transparent">
              JustDM
            </span>{" "}
            in Action
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto">
            Watch how easy it is to save, tag, and find your Instagram reels
          </p>
        </motion.div>

        {/* Step 1: Instagram DM Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16161F] border border-[#23232E] mb-4">
              <Send className="w-4 h-4 text-[#6C5CE7]" />
              <span className="text-sm text-white font-medium">
                Step 1: Send via Instagram DM
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Share any reel to JustDM
            </h3>
            <p className="text-[#A1A1AA]">
              Simply tap the share button and send to your JustDM account
            </p>
          </div>

          {/* Instagram Reel Images Grid - Placeholder for 3 images */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
            {Reels.map((reel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-[9/14] sm:aspect-[9/16] rounded-2xl bg-[#16161F] border border-[#23232E] overflow-hidden group hover:scale-[1.03] transition"
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={reel}
                    alt={`Reel ${index}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Send Button */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] flex items-center justify-center shadow-lg"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Step 2: Organized Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16161F] border border-[#23232E] mb-4">
              <Tag className="w-4 h-4 text-[#FF4D8D]" />
              <span className="text-sm text-white font-medium">
                Step 2: Organized Dashboard
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              All your reels, beautifully organized
            </h3>
            <p className="text-[#A1A1AA]">
              Tag and categorize your saved reels for instant access
            </p>
          </div>

          {/* Dashboard Images Grid - Placeholder for 3 images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {Tags.map((tag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-video rounded-2xl bg-[#16161F] border border-[#23232E] overflow-hidden group hover:border-[#6C5CE7]/50 transition-colors"
              >
                {/* Placeholder for dashboard image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#16161F] to-[#1a1a24] p-6">
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-[#6C5CE7]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#FF4D8D]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#FF8A00]"></div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <div className="bg-[#23232E] rounded-lg"></div>
                      <div className="bg-[#23232E] rounded-lg"></div>
                      <div className="bg-[#23232E] rounded-lg"></div>
                      <div className="bg-[#23232E] rounded-lg"></div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <div className="px-3 py-1 rounded-full bg-[#6C5CE7]/20 border border-[#6C5CE7]/30 text-xs text-[#6C5CE7]">
                        {tag.niche}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-[#FF4D8D]/20 border border-[#FF4D8D]/30 text-xs text-[#FF4D8D]">
                        {tag.subNiche}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Step 3: Share Dialog */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16161F] border border-[#23232E] mb-4">
              <Search className="w-4 h-4 text-[#6C5CE7]" />
              <span className="text-sm text-white font-medium">
                Step 3: Share DM Me
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Share with me or find instantly
            </h3>
            <p className="text-[#A1A1AA]">
              Send reels to me rather than saving them on Instagram saves
            </p>
          </div>

          {/* Share Dialog - Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[9/16] rounded-2xl bg-[#16161F] border border-[#23232E] overflow-hidden"
          >
            <div className="absolute inset-0 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-white font-semibold">Share</h4>
                <div className="w-6 h-6 rounded-full bg-[#23232E]"></div>
              </div>
              <div className="mb-4">
                <label className="text-sm text-[#A1A1AA] mb-2 block">To:</label>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-lg bg-[#0B0B0F] border border-[#23232E] text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#6C5CE7]"
                />
              </div>
              <div className="mb-4">
                <p className="text-sm text-[#A1A1AA] mb-3">Suggested</p>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D]"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-[#23232E] rounded w-24 mb-2"></div>
                        <div className="h-3 bg-[#23232E] rounded w-32"></div>
                      </div>
                      <div className="w-5 h-5 rounded-full border border-[#23232E]"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto">
                <button className="w-full py-3 rounded-lg bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] text-white font-semibold">
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductDemoSection;
