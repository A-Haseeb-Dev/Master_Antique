"use client";

import { useEffect } from "react";

/**
 * Client-side behavioural layer that mirrors the original `app.js`:
 *  - IntersectionObserver reveal animations for `.reveal` elements
 *  - Animated count-up for `.stat-number` elements
 * Mounted once in the root layout.
 */
export default function SiteInteractions() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ── Reveal on scroll ── */
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (revealEls.length > 0 && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );
      revealEls.forEach((el) => observer.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("visible"));
    }

    /* ── Animated stat counters ── */
    const statEls = Array.from(document.querySelectorAll<HTMLElement>(".stat-number"));
    if (
      statEls.length > 0 &&
      "IntersectionObserver" in window &&
      !reducedMotion
    ) {
      const statObserver = new IntersectionObserver(
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
            statObserver.unobserve(el);
          });
        },
        { threshold: 0.5 }
      );
      statEls.forEach((el) => statObserver.observe(el));
    }

    return () => {
      // Observers are scoped to this effect lifecycle implicitly.
    };
  }, []);

  return null;
}
