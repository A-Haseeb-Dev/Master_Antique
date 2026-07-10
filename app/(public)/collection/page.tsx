import type { Metadata } from "next";
import CollectionGrid from "@/components/CollectionGrid";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Explore Master Antique's curated collection of authenticated antiques — Victorian, Georgian, Art Deco and Mid-Century furniture, ceramics, lighting and decorative arts.",
  openGraph: {
    title: "The Collection — Master Antique",
    description:
      "Explore Master Antique's curated collection of authenticated antiques — Victorian, Georgian, Art Deco and Mid-Century furniture, ceramics, lighting and decorative arts.",
  },
  twitter: {
    title: "The Collection — Master Antique",
    description:
      "Explore Master Antique's curated collection of authenticated antiques — Victorian, Georgian, Art Deco and Mid-Century furniture, ceramics, lighting and decorative arts.",
  },
};

export default function CollectionPage() {
  return (
    <main>
      <section className="page-header">
        <div className="container">
          <span className="section-label reveal">The Collection</span>
          <h1 className="section-title reveal reveal-delay-1">
            Curated
            <br />
            Masterpieces
          </h1>
          <div
            className="gold-divider reveal reveal-delay-2"
            style={{ margin: "var(--spacing-lg) auto" }}
          ></div>
          <p className="section-subtitle reveal reveal-delay-3">
            Every piece authenticated, restored, and presented with full provenance. Each
            is one of a kind — once acquired, it may never return.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CollectionGrid />
        </div>
      </section>

      <section className="scarcity-banner">
        <div className="container">
          <p>
            All pieces come with a <span>Certificate of Authenticity</span> and detailed
            provenance documentation.
          </p>
        </div>
      </section>
    </main>
  );
}
