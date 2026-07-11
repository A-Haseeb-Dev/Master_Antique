"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  href,
  onClick,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      setPosition({
        x: (clientX - centerX) * strength,
        y: (clientY - centerY) * strength,
      });
    },
    [strength]
  );

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, cursor: "pointer" } as React.CSSProperties}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
    >
      {href ? <a href={href} style={{ display: "contents", color: "inherit", textDecoration: "none" }}>{children}</a> : children}
    </motion.div>
  );
}
