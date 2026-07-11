"use client";

import { useRef, type ElementType, type ComponentPropsWithoutRef } from "react";
import { motion, useInView, type Variant } from "framer-motion";

interface RevealProps<T extends ElementType = "div"> {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  threshold?: number;
  as?: T;
  style?: React.CSSProperties;
}

const directionMap: Record<string, { hidden: Variant; visible: Variant }> = {
  up: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
};

export default function Reveal<T extends ElementType = "div">({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 60,
  once = true,
  threshold = 0.15,
  as,
  style,
}: RevealProps<T>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const base = directionMap[direction];
  const hidden = {
    ...base.hidden,
    ...(direction === "up" || direction === "down"
      ? { y: direction === "up" ? distance : -distance }
      : { x: direction === "left" ? -distance : distance }),
  };
  const visible = base.visible;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ hidden, visible }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      {children}
    </motion.div>
  );
}
