"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  childDirection?: "up" | "down" | "left" | "right";
  childDistance?: number;
  once?: boolean;
  threshold?: number;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

const dirVariants = {
  up: (d: number) => ({ hidden: { opacity: 0, y: d }, visible: { opacity: 1, y: 0 } }),
  down: (d: number) => ({ hidden: { opacity: 0, y: -d }, visible: { opacity: 1, y: 0 } }),
  left: (d: number) => ({ hidden: { opacity: 0, x: -d }, visible: { opacity: 1, x: 0 } }),
  right: (d: number) => ({ hidden: { opacity: 0, x: d }, visible: { opacity: 1, x: 0 } }),
};

export default function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.12,
  childDirection = "up",
  childDistance = 50,
  once = true,
  threshold = 0.1,
  style,
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const variants = dirVariants[childDirection](childDistance);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const items = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={container}
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          variants={variants}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
