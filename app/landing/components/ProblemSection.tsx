"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import {
  IconSearch,
  IconSwipeDown,
  IconTag,
  IconAlertCircle,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes, useMemo } from "react";
import { IconProps } from "@tabler/icons-react";

// Import only 6–8 images (important for performance)
import Reel1 from "@/public/reels/reel1.webp";
import Reel2 from "@/public/reels/reel2.webp";
import Reel3 from "@/public/reels/reel3.webp";
import Reel4 from "@/public/reels/reel4.webp";
import Reel5 from "@/public/reels/reel5.webp";
import Reel6 from "@/public/reels/reel6.webp";
import Reel7 from "@/public/reels/reel7.webp";
import Reel8 from "@/public/reels/reel8.webp";
import Reel9 from "@/public/reels/reel9.webp";
import Reel10 from "@/public/reels/reel10.webp";
import Reel11 from "@/public/reels/reel11.webp";
import Reel12 from "@/public/reels/reel12.webp";
import Reel13 from "@/public/reels/reel13.webp";
import Reel14 from "@/public/reels/reel14.webp";
import { HeadersAdapter } from "next/dist/server/web/spec-extension/adapters/headers";

type Props = {
  images: StaticImageData[];
};

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const ProblemSection = () => {
  const reels = [
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
    <LazyMotion features={domAnimation}>
      <section id="problem" className="py-20">
        <Header />

        <div className="flex flex-col gap-24">
          <FloatingReels images={reels} />
          <FrustrationSection />
        </div>
      </section>
    </LazyMotion>
  );
};

export default ProblemSection;

const Header = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Heading */}
      <m.div
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
      </m.div>
    </div>
  );
};

const FloatingReels = ({ images }: Props) => {
  
  const positions = useMemo(
    () =>
      images.map(() => ({
        top: `${random(0, 70)}%`,
        left: `${random(0, 80)}%`,
        x: random(-80, 80),
        y: random(-40, 40),
        rotate: random(-6, 6),
      })),
    [images],
  );

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {images.map((img, index) => {
        const pos = positions[index];

        return (
          <m.div
            key={index}
            className="absolute w-36 h-64 rounded-xl overflow-hidden shadow-xl"
            style={{ top: pos.top, left: pos.left }}
            initial={{
              opacity: 0,
              x: pos.x,
              y: pos.y,
              rotate: pos.rotate,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: index * 0.08,
              ease: "easeOut",
            }}
          >
            <Image
              src={img}
              alt={`reel-${index}`}
              className="object-cover"
              loading="lazy"
              sizes="200px"
            />
          </m.div>
        );
      })}
    </div>
  );
};

const FrustrationSection = () => {
  const problems = [
    {
      Icon: IconSearch,
      title: "No Search",
      description:
        "Can't find that reel you saved last week? Good luck scrolling through hundreds of saves.",
    },
    {
      Icon: IconSwipeDown,
      title: "Endless Scrolling",
      description:
        "Waste time digging through your saved folder instead of finding what you need instantly.",
    },
    {
      Icon: IconTag,
      title: "No Tagging",
      description:
        "No way to organize or categorize your saved content. Everything just piles up.",
    },
    {
      Icon: IconAlertCircle,
      title: "Content Gets Lost",
      description:
        "Important reels disappear in the chaos. Never find that inspiration again.",
    },
  ];

  return (
    <div className="relative py-20 px-6">
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
    </div>
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
