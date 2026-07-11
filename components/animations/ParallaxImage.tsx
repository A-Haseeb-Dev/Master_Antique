"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  style?: React.CSSProperties;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.15,
  style,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow: "hidden", ...style }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y, width: "100%", height: "120%", objectFit: "cover" }}
      />
    </div>
  );
}
