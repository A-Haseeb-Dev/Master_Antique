"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
  }),
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const priceFormatted = `$${product.price.toLocaleString()}`;
  const label = product.label || product.era;
  const origin = product.origin || product.provenance || "Authenticated by Master Antique";
  const badge = product.badge ? (
    <span className="product-card-badge">{escapeHtml(product.badge)}</span>
  ) : null;

  return (
    <motion.div
      ref={ref}
      className="product-card"
      data-era={product.era}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
    >
      <div className="product-card-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={escapeHtml(product.name)} loading="lazy" />
        {badge}
      </div>
      <div className="product-card-body">
        <span className="product-card-era">{escapeHtml(label)}</span>
        <h3 className="product-card-title">{escapeHtml(product.name)}</h3>
        <p className="product-card-origin">{escapeHtml(origin)}</p>
        <span className="product-card-price">{priceFormatted}</span>
        <div>
          <a href="/contact" className="product-card-cta">
            Inquire <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function CollectionGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [era, setEra] = useState("all");
  const controlsRef = useRef(null);
  const controlsInView = useInView(controlsRef, { once: true, amount: 0.3 });

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

  return (
    <>
      <motion.div
        ref={controlsRef}
        className="product-controls"
        initial={{ opacity: 0, y: 20 }}
        animate={controlsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
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
      </motion.div>

      <div className="products-grid" id="products-grid">
        {filtered.map((p, i) => (
          <ProductCard key={`${p.name}-${i}`} product={p} index={i} />
        ))}
      </div>
    </>
  );
}
