"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Slide {
  image: string;
  alt: string;
  badge: string;
  title: React.ReactNode;
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

const SLIDES: Slide[] = [
  {
    image:
      "https://images.pexels.com/photos/18424382/pexels-photo-18424382.jpeg?auto=compress&cs=tinysrgb&w=1500",
    alt: "Curated antique collection on mahogany shelves",
    badge: "Est. 1892",
    title: (
      <>
        Where History
        <br />
        Finds a <em>Home</em>
      </>
    ),
    text: "Each piece in our collection is handpicked, authenticated, and restored — a tangible connection to the craftsmanship of generations past.",
    primary: { label: "Explore the Collection", href: "/collection" },
    secondary: { label: "Our Heritage", href: "/about" },
  },
  {
    image:
      "https://images.pexels.com/photos/18448275/pexels-photo-18448275.jpeg?auto=compress&cs=tinysrgb&w=1500",
    alt: "Mid-century armchair in olive velvet",
    badge: "One of a Kind",
    title: (
      <>
        Own a Piece
        <br />
        of <em>History</em>
      </>
    ),
    text: "From Victorian heirlooms to Art Deco masterpieces — every item tells a story that could be yours.",
    primary: { label: "View Recent Acquisitions", href: "/collection" },
    secondary: { label: "Book a Viewing", href: "/contact" },
  },
  {
    image:
      "https://images.pexels.com/photos/5490303/pexels-photo-5490303.jpeg?auto=compress&cs=tinysrgb&w=1500",
    alt: "Georgian mahogany armchair with carved details",
    badge: "Master Craftsmanship",
    title: (
      <>
        Treasures
        <br />
        That <em>Endure</em>
      </>
    ),
    text: "Restored by master artisans using period-authentic techniques — preserving beauty for generations to come.",
    primary: { label: "Discover Masterpieces", href: "/collection" },
    secondary: { label: "Our Restoration Ethos", href: "/about" },
  },
];

const AUTOPLAY_MS = 6000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  const count = SLIDES.length;

  const goTo = useCallback((index: number) => {
    setCurrent(((index % count) + count) % count);
  }, [count]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (progressRef.current) progressRef.current.style.width = "0%";
  }, []);

  const startAutoplay = useCallback(() => {
    if (reducedMotion.current) return;
    stopAutoplay();
    if (progressRef.current) {
      const start = Date.now();
      const frame = () => {
        const elapsed = Date.now() - start;
        const pct = Math.min((elapsed / AUTOPLAY_MS) * 100, 100);
        if (progressRef.current) progressRef.current.style.width = `${pct}%`;
        if (pct < 100) rafRef.current = requestAnimationFrame(frame);
      };
      rafRef.current = requestAnimationFrame(frame);
    }
    autoplayRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, AUTOPLAY_MS);
  }, [count, stopAutoplay]);

  const restartAutoplay = useCallback(() => {
    stopAutoplay();
    startAutoplay();
  }, [startAutoplay, stopAutoplay]);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  // Touch / pointer drag
  const touch = useRef({ startX: 0, active: false });

  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { startX: e.touches[0].clientX, active: true };
    setDragOffset(0);
    stopAutoplay();
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touch.current.active) return;
    const delta = e.touches[0].clientX - touch.current.startX;
    setDragOffset(delta);
  };
  const onTouchEnd = () => {
    if (!touch.current.active) return;
    touch.current.active = false;
    if (Math.abs(dragOffset) > 50) {
      goTo(dragOffset > 0 ? current - 1 : current + 1);
    } else {
      goTo(current);
    }
    setDragOffset(0);
    startAutoplay();
  };

  const trackStyle: React.CSSProperties = {
    transform: `translateX(calc(-${current * 100}% + ${dragOffset}px))`,
  };

  return (
    <div
      className="hero"
      id="hero"
      tabIndex={0}
      role="region"
      aria-label="Featured antiques carousel"
      ref={heroRef}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      onFocus={stopAutoplay}
      onBlur={startAutoplay}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          goTo(current - 1);
          restartAutoplay();
        }
        if (e.key === "ArrowRight") {
          goTo(current + 1);
          restartAutoplay();
        }
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="hero-track" style={trackStyle}>
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide${i === current ? " active" : ""}`}
            aria-hidden={i !== current}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.image} alt={slide.alt} loading={i === 0 ? "eager" : "lazy"} />
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <span className="hero-badge">{slide.badge}</span>
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
              <div className="hero-actions">
                <a href={slide.primary.href} className="btn-primary">
                  {slide.primary.label} <i className="fas fa-arrow-right"></i>
                </a>
                <a href={slide.secondary.href} className="btn-secondary">
                  {slide.secondary.label}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-controls">
        <button
          className="hero-btn prev"
          aria-label="Previous slide"
          onClick={() => {
            goTo(current - 1);
            restartAutoplay();
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="hero-btn next"
          aria-label="Next slide"
          onClick={() => {
            goTo(current + 1);
            restartAutoplay();
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className="hero-indicators">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero-dot${i === current ? " active" : ""}`}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === current}
            onClick={() => {
              goTo(i);
              restartAutoplay();
            }}
          ></button>
        ))}
      </div>

      <div className="hero-progress" ref={progressRef}></div>
    </div>
  );
}
