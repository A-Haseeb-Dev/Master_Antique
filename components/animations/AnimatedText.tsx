"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  splitBy?: "words" | "chars";
  staggerDelay?: number;
  once?: boolean;
  style?: React.CSSProperties;
}

export default function AnimatedText({
  text,
  className = "",
  as = "h2",
  splitBy = "words",
  staggerDelay = 0.06,
  once = true,
  style,
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const items = splitBy === "words" ? text.split(" ") : text.split("");
  const Tag = motion[as] as typeof motion.h2;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.15,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={text}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={child}
          style={{ display: "inline-block", whiteSpace: splitBy === "words" ? "pre" : undefined }}
        >
          {item}
        </motion.span>
      ))}
    </Tag>
  );
}
