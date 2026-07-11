"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg-deep)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              color: "var(--text-primary)",
              letterSpacing: "6px",
              textAlign: "center",
            }}
          >
            Master&nbsp;<span style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 300 }}>Antique</span>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 80,
              height: 1,
              background: "var(--gold)",
              marginTop: "var(--spacing-lg)",
              transformOrigin: "left",
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginTop: "var(--spacing-lg)",
            }}
          >
            Est. 1892
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
