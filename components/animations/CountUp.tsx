"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
  once = true,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const [value, setValue] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    if (!isInView || animated.current) return;
    animated.current = true;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(end);
    };

    requestAnimationFrame(tick);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
