import type { Metadata } from "next";
import CollectionGrid from "@/components/CollectionGrid";
import { Reveal } from "@/components/animations";

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
          <Reveal>
            <span className="section-label">The Collection</span>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="section-title">
              Curated
              <br />
              Masterpieces
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <div
              className="gold-divider"
              style={{ margin: "var(--spacing-lg) auto" }}
            ></div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="section-subtitle">
              Every piece authenticated, restored, and presented with full provenance. Each
              is one of a kind — once acquired, it may never return.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CollectionGrid />
        </div>
      </section>

      <section className="scarcity-banner">
        <div className="container">
          <Reveal>
            <p>
              All pieces come with a <span>Certificate of Authenticity</span> and detailed
              provenance documentation.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
