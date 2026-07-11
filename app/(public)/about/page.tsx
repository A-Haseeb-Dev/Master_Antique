import type { Metadata } from "next";
import { Reveal, StaggerReveal, CountUp } from "@/components/animations";

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
          <Reveal>
            <span className="section-label">Our Heritage</span>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="section-title">
              A Legacy of
              <br />
              Authenticity
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
              For four generations, Master Antique has been defined not by the pieces we
              sell, but by the standards we uphold.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="about-story-grid">
            <Reveal direction="left" className="story-media">
              <img
                className="about-story-image"
                src="https://images.pexels.com/photos/5490303/pexels-photo-5490303.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Master Antique showroom"
                loading="lazy"
              />
              <div className="story-media-accent"></div>
            </Reveal>
            <Reveal delay={0.2} direction="right" className="about-story-text">
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
            </Reveal>
          </div>
        </div>
      </section>

      <section className="heritage-timeline">
        <div className="container">
          <div className="featured-header">
            <Reveal>
              <span className="section-label">Our Journey</span>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="section-title">
                A Timeline of
                <br />
                Dedication
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <div
                className="gold-divider"
                style={{ margin: "var(--spacing-xl) auto" }}
              ></div>
            </Reveal>
          </div>

          <StaggerReveal
            className="timeline"
            staggerDelay={0.15}
            childDistance={40}
          >
            {TIMELINE.map((item) => (
              <div
                key={item.year}
                className="timeline-item"
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-title">{item.title}</div>
                  <div className="timeline-text">{item.text}</div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="featured-header">
            <Reveal>
              <span className="section-label">Our Principles</span>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="section-title">What Distinguishes Us</h2>
            </Reveal>
            <Reveal delay={0.25}>
              <div
                className="gold-divider"
                style={{ margin: "var(--spacing-xl) auto" }}
              ></div>
            </Reveal>
          </div>

          <StaggerReveal
            className="values-grid"
            staggerDelay={0.12}
            as="div"
          >
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="value-card"
              >
                <div className="value-icon">
                  <i className={v.icon}></i>
                </div>
                <h4>{v.title}</h4>
                <p>{v.text}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <StaggerReveal className="stats" staggerDelay={0.1}>
            <div className="stat-item">
              <div className="stat-number">
                <CountUp end={130} suffix="+" />
              </div>
              <div className="stat-label">Years of Heritage</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <CountUp end={4} />
              </div>
              <div className="stat-label">Generations</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <CountUp end={38} />
              </div>
              <div className="stat-label">Countries Sourced</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <CountUp end={100} suffix="%" />
              </div>
              <div className="stat-label">Authenticity Guaranteed</div>
            </div>
          </StaggerReveal>
        </div>
      </section>

      <section className="scarcity-banner">
        <div className="container">
          <Reveal>
            <p>
              <span>Inquire about a piece</span> — our curators will provide provenance
              details, condition reports, and arrange a private viewing.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
