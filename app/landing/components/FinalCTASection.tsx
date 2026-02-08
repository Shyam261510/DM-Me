"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { signIn } from "next-auth/react";

const FinalCTASection = () => {
  const handleSignIn = () => {
    signIn("google");
  };

  const benefits = [
    "Easy to use",
    "Instant setup",
    "Your reels never lost",
    "Free from infinite scrolling",
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0B0B0F] to-[#111118] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6C5CE7] rounded-full blur-[200px] opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4D8D] rounded-full blur-[150px] opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Stop Losing Reels.
            <br />
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] bg-clip-text text-transparent">
              Start Organizing.
            </span>
          </h2>
          <p className="text-xl text-[#A1A1AA] mb-12 max-w-2xl mx-auto">
            Save, tag, and find your Instagram reels instantly. Join thousands
            of creators who never lose content again.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={handleSignIn}
              className="group px-8 py-4 text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] transition-all hover:shadow-lg hover:shadow-[#6C5CE7]/50 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleSignIn}
              className="px-8 py-4 text-lg font-semibold text-white rounded-2xl bg-[#16161F] border border-[#23232E] transition-all hover:bg-[#1a1a24] hover:border-[#6C5CE7]/50"
            >
              DM Me
            </button>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-2 text-[#A1A1AA]"
              >
                <Check className="w-5 h-5 text-[#6C5CE7]" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
