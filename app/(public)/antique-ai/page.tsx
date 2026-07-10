import type { Metadata } from "next";
import AntiqueChat from "@/components/AntiqueChat";

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
          <span className="section-label reveal">Antique AI</span>
          <h1 className="section-title reveal reveal-delay-1">
            Ask the
            <br />
            Curator
          </h1>
          <div
            className="gold-divider reveal reveal-delay-2"
            style={{ margin: "var(--spacing-lg) auto" }}
          ></div>
          <p className="section-subtitle reveal reveal-delay-3">
            Powered by our knowledge base of 130+ years of antique expertise. Ask about
            periods, pieces, care, authentication, or restoration.
          </p>
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
          <p>
            Every answer is grounded in our <span>curated knowledge base</span> of
            authenticated antiques.
          </p>
        </div>
      </section>
    </main>
  );
}
