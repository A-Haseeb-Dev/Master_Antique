import type { Metadata } from "next";
import AntiqueChat from "@/components/AntiqueChat";
import { Reveal } from "@/components/animations";

export const metadata: Metadata = {
  title: "Antique AI",
  description:
    "Ask Master Antique's AI about our collection, antique eras, care tips, authentication, and restoration.",
  openGraph: {
    title: "Antique AI — Master Antique",
    description:
      "Ask Master Antique's AI about our collection, antique eras, care tips, authentication, and restoration.",
  },
  twitter: {
    title: "Antique AI — Master Antique",
    description:
      "Ask Master Antique's AI about our collection, antique eras, care tips, authentication, and restoration.",
  },
};

export default function AntiqueAiPage() {
  return (
    <main>
      <section className="page-header">
        <div className="container">
          <Reveal>
            <span className="section-label">Antique AI</span>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="section-title">
              Ask the
              <br />
              Curator
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
              Powered by our knowledge base of 130+ years of antique expertise. Ask about
              periods, pieces, care, authentication, or restoration.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section rag-section">
        <div className="container">
          <div className="rag-layout">
            <AntiqueChat />
          </div>
        </div>
      </section>

      <section className="scarcity-banner">
        <div className="container">
          <Reveal>
            <p>
              Every answer is grounded in our <span>curated knowledge base</span> of
              authenticated antiques.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
