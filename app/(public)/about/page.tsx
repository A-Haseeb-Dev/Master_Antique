import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Heritage",
  description:
    "Discover the 130+ year heritage of Master Antique — a family legacy of curating, authenticating, and restoring fine antiques since 1892.",
  openGraph: {
    title: "Our Heritage — Master Antique",
    description:
      "Discover the 130+ year heritage of Master Antique — a family legacy of curating, authenticating, and restoring fine antiques since 1892.",
  },
  twitter: {
    title: "Our Heritage — Master Antique",
    description:
      "Discover the 130+ year heritage of Master Antique — a family legacy of curating, authenticating, and restoring fine antiques since 1892.",
  },
};

const TIMELINE = [
  {
    year: "1892",
    title: "The Foundation",
    text: "Elias Vane establishes Master Antique as a cabinetmaking and restoration workshop in Karachi. His reputation for meticulous craftsmanship attracts collectors from across the region.",
  },
  {
    year: "1911",
    title: "First Estate Acquisition",
    text: "Master Antique acquires its first complete estate collection — Georgian furniture and decorative arts from a colonial administrator's residence in Shimla.",
  },
  {
    year: "1935",
    title: "European Network",
    text: "Second generation expands sourcing to Europe, establishing relationships with auction houses in London, Paris, and Florence.",
  },
  {
    year: "1968",
    title: "Restoration Studio",
    text: "Dedicated on-site restoration studio established, staffed by master artisans trained in period-authentic techniques.",
  },
  {
    year: "2003",
    title: "Global Expansion",
    text: "Fourth generation expands sourcing network to 38 countries. Master Antique becomes a destination for international collectors and interior architects.",
  },
  {
    year: "Today",
    title: "Continuing the Legacy",
    text: "Master Antique continues to curate exceptional pieces for discerning collectors worldwide, guided by the same principles established over 130 years ago.",
  },
];

const VALUES = [
  {
    icon: "fas fa-certificate",
    title: "Rigorous Authentication",
    text: "Every piece is examined by period specialists. We provide detailed provenance documentation with every acquisition.",
  },
  {
    icon: "fas fa-tools",
    title: "Master Restoration",
    text: "Our studio uses period-authentic materials and techniques — no modern shortcuts that diminish historical integrity.",
  },
  {
    icon: "fas fa-globe-asia",
    title: "Global Curation",
    text: "We maintain trusted relationships with dealers, estates, and auction houses across 38 countries to source exceptional pieces.",
  },
  {
    icon: "fas fa-hand-holding-heart",
    title: "Legacy Preservation",
    text: "A portion of every sale supports heritage conservation initiatives across South Asia — preserving craftsmanship for future generations.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="page-header">
        <div className="container">
          <span className="section-label reveal">Our Heritage</span>
          <h1 className="section-title reveal reveal-delay-1">
            A Legacy of
            <br />
            Authenticity
          </h1>
          <div
            className="gold-divider reveal reveal-delay-2"
            style={{ margin: "var(--spacing-lg) auto" }}
          ></div>
          <p className="section-subtitle reveal reveal-delay-3">
            For four generations, Master Antique has been defined not by the pieces we
            sell, but by the standards we uphold.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="about-story-grid">
            <div className="story-media reveal">
              <img
                className="about-story-image"
                src="https://images.pexels.com/photos/5490303/pexels-photo-5490303.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Master Antique showroom"
                loading="lazy"
              />
              <div className="story-media-accent"></div>
            </div>
            <div className="about-story-text reveal reveal-delay-1">
              <h3>
                Four Generations of
                <br />
                Uncompromising Standards
              </h3>
              <div className="gold-divider"></div>
              <p>
                Master Antique was founded in 1892 by Elias Vane, a master cabinetmaker who
                believed that the objects we live with should be made with integrity,
                chosen with discernment, and preserved with care. From a small workshop in
                Karachi, he built a reputation for sourcing and restoring pieces of
                exceptional quality.
              </p>
              <p>
                Over the decades, that reputation grew. By the 1920s, Master Antique was
                acquiring estates across the subcontinent. In the post-war years, our
                network expanded to Europe and beyond — establishing relationships with
                auction houses, private collectors, and artisan restorers who shared our
                philosophy.
              </p>
              <p>
                Today, Master Antique is led by the fourth generation of the Vane family.
                We continue to source, authenticate, and restore pieces that embody the
                pinnacle of design and craftsmanship from every era — Victorian, Georgian,
                Art Deco, Mid-Century Modern — with the same exacting standards our
                founder established over 130 years ago.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="heritage-timeline">
        <div className="container">
          <div className="featured-header">
            <span className="section-label reveal">Our Journey</span>
            <h2 className="section-title reveal reveal-delay-1">
              A Timeline of
              <br />
              Dedication
            </h2>
            <div
              className="gold-divider reveal reveal-delay-2"
              style={{ margin: "var(--spacing-xl) auto" }}
            ></div>
          </div>

          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className={`timeline-item reveal${i === 0 ? "" : ` reveal-delay-${Math.min(i, 4)}`}`}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-title">{item.title}</div>
                  <div className="timeline-text">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="featured-header">
            <span className="section-label reveal">Our Principles</span>
            <h2 className="section-title reveal reveal-delay-1">What Distinguishes Us</h2>
            <div
              className="gold-divider reveal reveal-delay-2"
              style={{ margin: "var(--spacing-xl) auto" }}
            ></div>
          </div>

          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className={`value-card reveal${i === 0 ? "" : ` reveal-delay-${i}`}`}
              >
                <div className="value-icon">
                  <i className={v.icon}></i>
                </div>
                <h4>{v.title}</h4>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats">
            <div className="stat-item reveal">
              <div className="stat-number">130+</div>
              <div className="stat-label">Years of Heritage</div>
            </div>
            <div className="stat-item reveal reveal-delay-1">
              <div className="stat-number">4</div>
              <div className="stat-label">Generations</div>
            </div>
            <div className="stat-item reveal reveal-delay-2">
              <div className="stat-number">38</div>
              <div className="stat-label">Countries Sourced</div>
            </div>
            <div className="stat-item reveal reveal-delay-3">
              <div className="stat-number">100%</div>
              <div className="stat-label">Authenticity Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      <section className="scarcity-banner">
        <div className="container">
          <p>
            <span>Inquire about a piece</span> — our curators will provide provenance
            details, condition reports, and arrange a private viewing.
          </p>
        </div>
      </section>
    </main>
  );
}
