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
      <section id="problem" className="py-0 md:py-20">
        <Header />

        <div className="flex flex-col gap-24">
          <FloatingReels images={reels} />
          {/* <FrustrationSection /> */}
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
