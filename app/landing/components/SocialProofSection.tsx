"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Testimonial1 from "@/public/testimonials/testimonial1.png";
import Testimonial2 from "@/public/testimonials/testimonial2.png";
import Testimonial3 from "@/public/testimonials/testimonial3.png";
import Testimonial4 from "@/public/testimonials/testimonial4.png";
import Testimonial5 from "@/public/testimonials/testimonial5.png";

import { Quote } from "lucide-react";

const testimonials = [
  {
    src: Testimonial1.src,
    social: "Reddit",
  },
  {
    src: Testimonial2.src,
    social: "X",
  },
  {
    src: Testimonial5.src,
    social: "Reddit",
  },
  {
    src: Testimonial3.src,
    social: "X",
  },
  {
    src: Testimonial4.src,
    social: "X",
  },
];
const duplicated = [...testimonials, ...testimonials];

const SocialProofSection = () => {
  return (
    <section id="testimonials" className="relative py-32 bg-[#0B0B0F]">
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
            Join hundreds of creators, managers, and learners who use JustDM
            daily
          </p>
        </motion.div>

        <InfiniteTestimonials />
      </div>
    </section>
  );
};

export default SocialProofSection;

const InfiniteTestimonials = () => {
  return (
    <div className="relative w-full overflow-hidden py-10">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-[#0B0B0F] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-[#0B0B0F] to-transparent" />

      <motion.div
        className="flex gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 15,
          repeat: Infinity,
        }}
      >
        {duplicated.map((testimonial, index) => (
          <div
            key={index}
            className="relative min-w-[300px] border border-zinc-800 rounded-xl  bg-black z-0"
          >
            {/* Quote icons */}
            <div className="rotate-180 absolute -top-4 left-4 text-zinc-600 z-1">
              <Quote size={28} />
            </div>

            <div className="absolute -bottom-4 right-4 text-zinc-600 z-1">
              <Quote size={28} />
            </div>
            <div className="absolute -top-5 right-4 text-zinc-200 text-2xl font-bold">
              {testimonial.social}
            </div>

            {/* Image */}
            <Image
              src={testimonial.src}
              width={400}
              height={400}
              alt={`testimonial-${index}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
