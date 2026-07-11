"use client";

import { useEffect } from "react";

export default function SiteInteractions() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    document.documentElement.classList.add("js-reveal-ready");

    const statEls = Array.from(document.querySelectorAll<HTMLElement>(".stat-number"));
    if (statEls.length === 0) return;

    let statObserver: IntersectionObserver | null = null;

    if (statEls.length > 0 && "IntersectionObserver" in window) {
      statObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const text = el.textContent ?? "";
            const num = parseFloat(text.replace(/[^0-9.]/g, ""));
            const suffix = text.replace(/[0-9.]/g, "");
            if (!isNaN(num) && num < 10000) {
              const duration = 2000;
              const startTime = performance.now();
              const animate = (timestamp: number) => {
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * num) + suffix;
                if (progress < 1) requestAnimationFrame(animate);
                else el.textContent = text;
              };
              requestAnimationFrame(animate);
            }
            statObserver!.unobserve(el);
          });
        },
        { threshold: 0.5 }
      );
      statEls.forEach((el) => statObserver!.observe(el));
    }

    return () => {
      statObserver?.disconnect();
    };
  }, []);

  return null;
}
