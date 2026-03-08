"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Testimonial1 from "@/public/testimonials/testimonial1.png";
import Testimonial2 from "@/public/testimonials/testimonial2.png";
import Testimonial3 from "@/public/testimonials/testimonial3.png";
import Testimonial4 from "@/public/testimonials/testimonial4.png";
// import Testimonial6 from "@/public/testimonials/testimonial6.png";
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
    src: Testimonial3.src,
    social: "X",
  },
  {
    src: Testimonial4.src,
    social: "X",
  },
];

const SocialProofSection = () => {
  return (
    <section
      id="testimonials"
      className="relative bg-[#0B0B0F] py-12 md:py-32 "
    >
      <div className="max-w-7xl mx-auto px-6 h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-8">
            Join hundreds of creators, managers, and learners who use JustDM
            daily
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Loved by{" "}
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] bg-clip-text text-transparent">
              Creators
            </span>
          </h2>
        </motion.div>

        <Testimonials />
      </div>
    </section>
  );
};

export default SocialProofSection;

function Testimonials() {
  return (
    <div className="grid grid-cols-1 grid-rows-5  gap-12 md:grid-cols-2 md:grid-rows-2">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          className="relative rounded-xl  z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rotate-180 absolute -top-4 left-4 text-zinc-600 z-1">
            <Quote size={28} />
          </div>

          <div className="absolute -bottom-4 right-4 text-zinc-600 z-1">
            <Quote size={28} />
          </div>

          <div className="absolute -top-5 right-4 text-zinc-200 text-2xl font-bold md:text-2xl">
            {testimonial.social}
          </div>
          <div className="px-2">
            <Image
              src={testimonial.src}
              width={500}
              height={500}
              alt={`testimonial-${index}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
