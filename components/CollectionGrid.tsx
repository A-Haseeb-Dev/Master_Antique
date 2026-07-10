"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_PRODUCTS } from "@/lib/products";
import type { Product } from "@/lib/types";

const STORAGE_KEY = "ma_products";

const ERAS = [
  { key: "all", label: "All Periods" },
  { key: "victorian", label: "Victorian" },
  { key: "georgian", label: "Georgian" },
  { key: "art-deco", label: "Art Deco" },
  { key: "mid-century", label: "Mid-Century" },
];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default function CollectionGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [era, setEra] = useState("all");
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let stored: Product[] | null = null;
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch {
      stored = null;
    }
    if (!stored || stored.length === 0) {
      stored = DEFAULT_PRODUCTS;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    }
    setProducts(stored);
  }, []);

  const filtered = useMemo(
    () => (era === "all" ? products : products.filter((p) => p.era === era)),
    [products, era]
  );

  // Re-run reveal animation for freshly rendered cards
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".product-card"));
    if (!("IntersectionObserver" in window)) {
      cards.forEach((c) => c.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [filtered]);

  return (
    <>
      <div className="product-controls reveal">
        {ERAS.map((e) => (
          <button
            key={e.key}
            className={era === e.key ? "active" : ""}
            data-era={e.key}
            onClick={() => setEra(e.key)}
          >
            {e.label}
          </button>
        ))}
      </div>

      <div className="products-grid" id="products-grid" ref={gridRef}>
        {filtered.map((p, i) => {
          const priceFormatted = `$${p.price.toLocaleString()}`;
          const label = p.label || p.era;
          const origin = p.origin || p.provenance || "Authenticated by Master Antique";
          const badge = p.badge ? (
            <span className="product-card-badge">{escapeHtml(p.badge)}</span>
          ) : null;
          return (
            <div
              key={`${p.name}-${i}`}
              className={`product-card reveal${i % 2 === 0 ? "" : " reveal-delay-1"}`}
              data-era={p.era}
            >
              <div className="product-card-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={escapeHtml(p.name)} loading="lazy" />
                {badge}
              </div>
              <div className="product-card-body">
                <span className="product-card-era">{escapeHtml(label)}</span>
                <h3 className="product-card-title">{escapeHtml(p.name)}</h3>
                <p className="product-card-origin">{escapeHtml(origin)}</p>
                <span className="product-card-price">{priceFormatted}</span>
                <div>
                  <a href="/contact" className="product-card-cta">
                    Inquire <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
