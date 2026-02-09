"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import {
  IconSearch,
  IconSwipeDown,
  IconTag,
  IconAlertCircle,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { IconProps } from "@tabler/icons-react";

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
      Icon: IconSearch,
      emoji: "🔍",
      title: "No Search",
      description:
        "Can't find that reel you saved last week? Good luck scrolling through hundreds of saves.",
    },
    {
      Icon: IconSwipeDown,
      emoji: "📜",
      title: "Endless Scrolling",
      description:
        "Waste time digging through your saved folder instead of finding what you need instantly.",
    },
    {
      Icon: IconTag,
      emoji: "🏷️",
      title: "No Tagging",
      description:
        "No way to organize or categorize your saved content. Everything just piles up.",
    },
    {
      Icon: IconAlertCircle,
      emoji: "😵",
      title: "Content Gets Lost",
      description:
        "Important reels disappear in the chaos. Never find that inspiration again.",
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {problems.map((item, index) => (
          <Problem
            key={index}
            title={item.title}
            description={item.description}
            Icon={item.Icon}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

const Problem = ({
  title,
  description,
  Icon,
  index,
}: {
  title: string;
  description: string;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between",
        "p-8 rounded-2xl",
        "bg-white/[0.03] dark:bg-white/[0.02]",
        "border border-white/10",
        "backdrop-blur-xl",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:border-white/20 hover:shadow-xl",
      )}
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-500" />

      {/* Icon */}
      <div className="relative z-10 mb-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-neutral-300 group-hover:text-white transition">
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-lg font-semibold text-neutral-100 mb-2 group-hover:translate-x-1 transition duration-200">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-sm text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
