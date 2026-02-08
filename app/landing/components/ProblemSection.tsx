"use client";

import { motion } from "framer-motion";
import { Search, Scroll, Tag, AlertCircle } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Reel1 from "@/public/reels/reel1.png";
import Reel2 from "@/public/reels/reel2.png";
import Reel3 from "@/public/reels/reel3.png";
import Reel4 from "@/public/reels/reel4.png";
import Reel5 from "@/public/reels/reel5.png";
import Reel6 from "@/public/reels/reel6.png";
import Reel7 from "@/public/reels/reel7.png";
import Reel8 from "@/public/reels/reel8.png";
import Reel9 from "@/public/reels/reel9.png";
import Reel10 from "@/public/reels/reel10.png";
import Reel11 from "@/public/reels/reel11.png";
import Reel12 from "@/public/reels/reel12.png";
import Reel13 from "@/public/reels/reel13.png";
import Reel14 from "@/public/reels/reel14.png";

const random = (min: number, max: number) => Math.random() * (max - min) + min;

type Props = {
  images: StaticImageData[];
};

const ProblemSection = () => {
  const Reels = [
    Reel1,
    Reel2,
    Reel3,
    Reel4,
    Reel5,
    Reel6,
    Reel7,
    Reel8,
    Reel9,
    Reel10,
    Reel11,
    Reel12,
    Reel13,
    Reel14,
  ];

  return (
    <section id="problem">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Instagram Saves Are a{" "}
            <span className="bg-gradient-to-r from-[#FF4D8D] to-[#FF8A00] bg-clip-text text-transparent">
              Mess
            </span>
          </h2>
        </motion.div>
      </div>
      <div className="flex flex-col gap-32 ">
        <FloatingReels images={Reels} />
        <FrustrationSection />
      </div>
    </section>
  );
};

export default ProblemSection;

const FloatingReels = ({ images }: Props) => {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px] overflow-hidden">
      {images.map((img, index) => {
        const xStart = random(-100, 100);
        const yStart = random(-50, 50);

        const xMove = random(30, 120);
        const yMove = random(20, 80);
        const duration = random(8, 16);

        return (
          <motion.div
            key={index}
            className="
              absolute 
              w-32 h-50         /* mobile */

              md:w-36 md:h-64     /* tablets */
              lg:w-44 lg:h-80     /* desktop */
              xl:w-52 xl:h-96     /* large desktop */
              2xl:w-60 2xl:h-[420px] /* ultra wide */
              rounded-xl overflow-hidden shadow-xl
            "
            style={{
              top: `${random(0, 70)}%`,
              left: `${random(0, 80)}%`,
            }}
            initial={{ x: xStart, y: yStart, rotate: random(-6, 6) }}
            animate={{
              x: [xStart, xStart + xMove, xStart - xMove, xStart],
              y: [yStart, yStart - yMove, yStart + yMove, yStart],
              rotate: [random(-6, 6), random(6, -6), random(-4, 4)],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={`reel-${index}`}
                fill
                className="object-cover"
                sizes="
                  (max-width: 640px) 80px,
                  (max-width: 768px) 112px,
                  (max-width: 1024px) 144px,
                  (max-width: 1280px) 176px,
                  240px
                "
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const FrustrationSection = () => {
  const problems = [
    {
      icon: Search,
      emoji: "🔍",
      title: "No Search",
      description:
        "Can't find that reel you saved last week? Good luck scrolling through hundreds of saves.",
      color: "#FF4D8D",
    },
    {
      icon: Scroll,
      emoji: "📜",
      title: "Endless Scrolling",
      description:
        "Waste time digging through your saved folder instead of finding what you need instantly.",
      color: "#FF8A00",
    },
    {
      icon: Tag,
      emoji: "🏷️",
      title: "No Tagging",
      description:
        "No way to organize or categorize your saved content. Everything just piles up.",
      color: "#6C5CE7",
    },
    {
      icon: AlertCircle,
      emoji: "😵",
      title: "Content Gets Lost",
      description:
        "Important reels disappear in the chaos. Never find that inspiration again.",
      color: "#FF4D8D",
    },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          Saving Reels is Broken
        </h2>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto">
          We've all been there. Here's what makes it frustrating.
        </p>
      </div>

      {/* Cards Container */}
      <div className="max-w-5xl mx-auto flex flex-col gap-20">
        {problems.map((problem, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
            >
              {/* Card */}
              <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-lg">
                {/* Big Emoji */}
                <div className="text-6xl mb-4">{problem.emoji}</div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {problem.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
