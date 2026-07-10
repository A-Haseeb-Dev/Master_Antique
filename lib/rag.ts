import type { Product, AskResult, ChatResult } from "./types";

interface RagDoc {
  id: string;
  type: "product" | "static";
  title: string;
  era?: string;
  price?: number;
  image?: string;
  badge?: string;
  status?: string;
  text: string;
}

interface CorpusDoc {
  id: string;
  tokens: string[];
  vector: Record<string, number>;
}

const KB_STATIC: Array<{ title: string; text: string }> = [
  {
    title: "Victorian Era Antiques",
    text: "The Victorian era 1837 to 1901 produced furniture with dark carved wood, buttoned velvet, fringed lampshades, and ornate silver. Mahogany, rosewood, and walnut were common. Pieces are known for their elaborate decoration and craftsmanship.",
  },
  {
    title: "Georgian Era Antiques",
    text: "The Georgian era 1714 to 1830 emphasized symmetry proportion and classical forms. Mahogany was the wood of choice. Designers like Chippendale, Hepplewhite, and Sheraton defined the period. Pieces feature clean lines, brass hardware, and elegant proportions.",
  },
  {
    title: "Art Deco Antiques",
    text: "Art Deco 1920 to 1939 embraced geometric patterns bold colors and luxurious materials like lacquer, chrome, and exotic woods. French designers like Ruhlmann, Brandt, and Lalique defined the style. Pieces are characterized by stepped forms, chevron patterns, and rich finishes.",
  },
  {
    title: "Mid-Century Modern Antiques",
    text: "Mid-Century Modern 1945 to 1965 focused on organic forms, clean lines, and honest use of materials. Scandinavian designers like Finn Juhl, Hans Wegner, and Arne Jacobsen championed the style. Pieces feature tapered legs, sculptural forms, and warm woods.",
  },
  {
    title: "Antique Authentication",
    text: "Authentication involves analyzing materials, construction techniques, maker marks, and provenance documentation. Period-specific joinery, nail types, and tool marks help date pieces. Master Antique provides full provenance documentation with every acquisition.",
  },
  {
    title: "Antique Restoration",
    text: "Restoration should preserve original material wherever possible. Master Antique uses period-authentic techniques and materials. The goal is conservation first, restoration second. Modern restoration avoids over-finishing and respects the piece history.",
  },
  {
    title: "Caring for Antiques",
    text: "Keep antiques away from direct sunlight, heat vents, and humidity extremes. Dust regularly with soft cloths. Use furniture wax for wood pieces. Silver requires periodic polishing with anti-tarnish cloths. Textiles should be professionally cleaned. Maintain stable temperature and humidity.",
  },
  {
    title: "Investing in Antiques",
    text: "Antiques can appreciate significantly over time. Rarity, provenance, condition, and period popularity affect value. Georgian furniture and Art Deco pieces have shown strong value retention. Master Antique offers authenticity guarantees with every purchase.",
  },
  {
    title: "Antique Porcelain Guide",
    text: "Porcelain is fired at high temperatures creating a hard vitreous body. English porcelain makers include Royal Worcester, Wedgwood, and Spode. Hand-painted decoration and gilding indicate higher quality. Look for maker marks on the base for identification.",
  },
  {
    title: "Antique Silver Hallmarks",
    text: "British silver hallmarks indicate purity, maker, date, and assay office. Sterling silver is 925 parts per thousand. The hallmark system dates to 1300. Victorian silver often features elaborate repoussé and engraving. Garrard & Co. is a renowned London silversmith.",
  },
  {
    title: "Antique Clock Movements",
    text: "English carriage clocks often use 8-day French movements with platform escapements. The quality of the movement indicates the clock value. Brass bushing, jeweled pivots, and maintaining power are marks of quality clocks. Regular servicing preserves mechanical integrity.",
  },
  {
    title: "Master Antique History",
    text: "Master Antique was established in 1892 by a master cabinetmaker. For over 130 years the firm has sourced authenticated antiques from private estates and auctions across 38 countries. Every piece is restored by master craftsmen using era-appropriate techniques.",
  },
];

const SYNONYMS: Record<string, string[]> = {
  chair: ["armchair", "seat", "seating", "chair"],
  desk: ["table", "writing", "bureau", "secretary"],
  vase: ["porcelain", "ceramic", "pottery", "urn", "vessel"],
  lamp: ["light", "lighting", "chandelier", "lantern"],
  clock: ["timepiece", "watch", "chronometer", "carriage"],
  silver: ["sterling", "plate", "hallmark"],
  gold: ["gilt", "gilded", "golden", "gold-leaf"],
  victorian: ["victoria", "19th century", "1800s"],
  georgian: ["george", "18th century", "1700s"],
  deco: ["art deco", "1920s", "1930s", "jazz"],
  modern: ["mid-century", "midcentury", "1950s", "scandinavian"],
  wood: ["mahogany", "oak", "walnut", "teak", "rosewood"],
  valuable: ["expensive", "rare", "precious", "investment", "appreciate"],
  care: ["clean", "maintain", "restore", "preserve", "protect", "polish"],
  buy: ["purchase", "acquire", "invest", "collect", "shop"],
  french: ["paris", "france", "ruhlmann", "brandt", "lalique"],
  english: ["london", "england", "british", "chippendale", "worcester"],
  authentication: ["authentic", "genuine", "real", "verify", "provenance", "certificate"],
  restoration: ["restore", "repair", "conservation", "preserve", "refinish"],
  collection: ["curated", "selection", "gallery", "showroom", "inventory"],
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function termFreq(tokens: string[]): Record<string, number> {
  const tf: Record<string, number> = {};
  tokens.forEach((t) => {
    tf[t] = (tf[t] || 0) + 1;
  });
  const max = Math.max(0, ...Object.values(tf));
  if (max === 0) return tf;
  Object.keys(tf).forEach((k) => {
    tf[k] /= max;
  });
  return tf;
}

function docFreq(corpus: CorpusDoc[]): Record<string, number> {
  const df: Record<string, number> = {};
  corpus.forEach((doc) => {
    const seen: Record<string, boolean> = {};
    doc.tokens.forEach((t) => {
      if (!seen[t]) {
        df[t] = (df[t] || 0) + 1;
        seen[t] = true;
      }
    });
  });
  return df;
}

function buildIndex(docs: RagDoc[]): CorpusDoc[] {
  const corpus = docs.map((d) => ({ id: d.id, tokens: tokenize(d.text), vector: {} as Record<string, number> }));
  const df = docFreq(corpus);
  const N = corpus.length;
  corpus.forEach((doc) => {
    const tf = termFreq(doc.tokens);
    doc.vector = {};
    Object.keys(tf).forEach((term) => {
      const idf = Math.log((N + 1) / ((df[term] || 0) + 1)) + 1;
      doc.vector[term] = tf[term] * idf;
    });
  });
  return corpus;
}

function cosineSim(v1: Record<string, number>, v2: Record<string, number>): number {
  let dot = 0;
  let n1 = 0;
  let n2 = 0;
  const allTerms: Record<string, boolean> = {};
  Object.keys(v1).forEach((k) => (allTerms[k] = true));
  Object.keys(v2).forEach((k) => (allTerms[k] = true));
  Object.keys(allTerms).forEach((term) => {
    const a = v1[term] || 0;
    const b = v2[term] || 0;
    dot += a * b;
    n1 += a * a;
    n2 += b * b;
  });
  if (n1 === 0 || n2 === 0) return 0;
  return dot / (Math.sqrt(n1) * Math.sqrt(n2));
}

function expandTerms(tokens: string[]): string[] {
  const expanded: Record<string, boolean> = {};
  tokens.forEach((t) => {
    expanded[t] = true;
    const syn = SYNONYMS[t];
    if (syn) syn.forEach((s) => (expanded[s] = true));
  });
  return Object.keys(expanded);
}

/**
 * Lightweight, dependency-free RAG engine mirroring the original client-side
 * `rag.js`. Builds a TF-IDF index over the product catalogue plus a curated
 * static knowledge base and answers queries with retrieved context.
 */
export class RagEngine {
  private docs: RagDoc[] = [];
  private index: CorpusDoc[] | null = null;

  constructor(products: Product[]) {
    this.buildKnowledgeBase(products);
  }

  private buildKnowledgeBase(products: Product[]): void {
    this.docs = [];
    products.forEach((p) => {
      const text = [p.name, p.era, p.description, p.provenance, p.badge]
        .filter(Boolean)
        .join(" ");
      this.docs.push({
        id: "p-" + this.docs.length,
        type: "product",
        title: p.name,
        era: p.era,
        price: p.price,
        image: p.image,
        badge: p.badge,
        status: p.status,
        text: text.toLowerCase(),
      });
    });
    KB_STATIC.forEach((kb) => {
      this.docs.push({
        id: "s-" + this.docs.length,
        type: "static",
        title: kb.title,
        text: kb.text.toLowerCase(),
      });
    });
  }

  private retrieve(query: string, topK = 5): Array<{ id: string; score: number }> {
    if (!this.index) this.index = buildIndex(this.docs);
    const qTokens = tokenize(query);
    const qExpanded = expandTerms(qTokens);
    if (qExpanded.length === 0) return [];
    const qTf = termFreq(qExpanded);
    const df: Record<string, number> = {};
    this.index.forEach((doc) => {
      Object.keys(doc.vector).forEach((term) => {
        df[term] = (df[term] || 0) + 1;
      });
    });
    const N = this.docs.length;
    const qVec: Record<string, number> = {};
    Object.keys(qTf).forEach((term) => {
      const idf = Math.log((N + 1) / ((df[term] || 0) + 1)) + 1;
      qVec[term] = qTf[term] * idf;
    });
    const scored = this.index.map((doc) => ({
      id: doc.id,
      score: cosineSim(qVec, doc.vector),
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.filter((s) => s.score > 0).slice(0, topK);
  }

  private generateFallback(query: string, results: Array<{ id: string; score: number }>): string {
    const greeting = /^(hi|hello|hey|greetings)/i.test(query);
    if (greeting) {
      return "Welcome to Master Antique. I can help you explore our collection of fine antiques, learn about different periods, get care tips, or answer questions about authentication and restoration. What would you like to know?";
    }
    if (results.length === 0) {
      return "I couldn't find anything in our collection matching that query. Try asking about a specific era (Victorian, Georgian, Art Deco, Mid-Century), a type of item (furniture, porcelain, silver, clocks, lighting), or care and authentication tips.";
    }
    const topDoc = this.docs.find((d) => d.id === results[0].id);
    const question = query.toLowerCase();
    if (/price|cost|value|worth|invest/i.test(question) && results.length > 0) {
      const items = results
        .slice(0, 3)
        .map((r) => this.docs.find((d) => d.id === r.id))
        .filter((d): d is RagDoc => Boolean(d) && d!.type === "product")
        .map((d) => `${d.title} — $${d.price?.toLocaleString()}`);
      if (items.length > 0)
        return `Here are items from our collection:\n${items.join("\n")}\n\nEach piece comes with full authentication and provenance documentation. Visit our Collection page for more details.`;
    }
    if (topDoc && topDoc.type === "product") {
      const lines = [
        topDoc.title,
        `Era: ${topDoc.era}`,
        `Price: $${topDoc.price?.toLocaleString()}`,
        `Status: ${topDoc.status}`,
      ];
      if (topDoc.badge) lines.push(`Badge: ${topDoc.badge}`);
      if (results.length > 1) {
        const also = results
          .slice(1, 4)
          .map((r) => this.docs.find((d) => d.id === r.id))
          .filter((d): d is RagDoc => Boolean(d))
          .map((d) => d.title);
        if (also.length > 0) lines.push(`\nYou might also be interested in: ${also.join(", ")}`);
      }
      return lines.join("\n");
    }
    if (topDoc && topDoc.type === "static") {
      let text = `${topDoc.title}\n${topDoc.text.charAt(0).toUpperCase() + topDoc.text.slice(1)}`;
      if (results.length > 1) {
        const related = results
          .slice(1, 4)
          .map((r) => this.docs.find((d) => d.id === r.id))
          .filter((d): d is RagDoc => Boolean(d))
          .map((d) => d.title);
        if (related.length > 0) text += `\n\nRelated: ${related.join(", ")}`;
      }
      return text;
    }
    return "I found some relevant information in our knowledge base. Could you be more specific about what you'd like to know?";
  }

  ask(query: string): AskResult {
    if (!query || !query.trim()) return { answer: "", results: [] };
    this.index = null;
    const results = this.retrieve(query, 5);
    const answer = this.generateFallback(query, results);
    const context = results
      .map((r) => this.docs.find((d) => d.id === r.id))
      .filter((d): d is RagDoc => Boolean(d));
    const productContext: ChatResult[] = context
      .filter((c) => c.type === "product")
      .map((c) => ({
        title: c.title,
        era: c.era,
        price: c.price,
        image: c.image,
        badge: c.badge,
        type: "product",
      }));
    return { answer, results: productContext };
  }
}
