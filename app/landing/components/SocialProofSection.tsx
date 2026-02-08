"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const SocialProofSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator",
      avatar: "SC",
      text: "JustDM has completely changed how I organize my inspiration. Finding reels is now instant!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Social Media Manager",
      avatar: "MJ",
      text: "Managing client content is so much easier now. The tagging system is a game-changer.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Student",
      avatar: "PS",
      text: "I save so many educational reels. JustDM helps me organize them by subject perfectly.",
      rating: 5,
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Loved by{" "}
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] bg-clip-text text-transparent">
              Creators
            </span>
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-8">
            Join hundreds of creators, managers, and learners who use JustDM daily
          </p>

          {/* Animated Counter */}
          <div ref={ref} className="flex items-center justify-center gap-2 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-6xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] bg-clip-text text-transparent"
            >
              {isInView ? "500+" : "0"}
            </motion.div>
            <span className="text-2xl text-[#A1A1AA]">creators</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-[#16161F] border border-[#23232E] hover:border-[#6C5CE7]/50 transition-all"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FF8A00] text-[#FF8A00]" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-[#A1A1AA] mb-6 leading-relaxed">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-[#A1A1AA]">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;

