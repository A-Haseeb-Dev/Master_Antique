"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [text, setText] = useState("");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const dotX = useSpring(cursorX, { damping: 35, stiffness: 350 });
  const dotY = useSpring(cursorY, { damping: 35, stiffness: 350 });

  const move = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [cursorX, cursorY, visible]
  );

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    window.addEventListener("mousemove", move);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("a, button, [data-cursor]");
      if (el) {
        setHovering(true);
        const c = el.getAttribute("data-cursor");
        if (c) setText(c);
      }
    };
    const handleOut = () => {
      setHovering(false);
      setText("");
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [move]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <motion.div
        className="custom-cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x,
          y,
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          borderRadius: "50%",
          border: "1px solid var(--gold)",
          pointerEvents: "none",
          zIndex: 10000,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? (hovering ? 0.8 : 0.4) : 0,
          transition: "width 0.3s, height 0.3s, opacity 0.3s",
          mixBlendMode: "difference",
        }}
      />
      <motion.div
        className="custom-cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--gold)",
          pointerEvents: "none",
          zIndex: 10001,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      <AnimatePresence>
        {hovering && text && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              x: dotX,
              y: dotY,
              pointerEvents: "none",
              zIndex: 10002,
              translateX: "-50%",
              translateY: "-50%",
              fontFamily: "var(--font-display)",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#FAF6F0",
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
