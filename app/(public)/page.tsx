import HeroCarousel from "@/components/HeroCarousel";
import NewsletterForm from "@/components/NewsletterForm";

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />

      <section className="featured">
        <div className="container">
          <div className="featured-header">
            <span className="section-label reveal">Curator&apos;s Selection</span>
            <h2 className="section-title reveal reveal-delay-1">
              Exceptional Pieces,
              <br />
              Handpicked for You
            </h2>
            <div
              className="gold-divider reveal reveal-delay-2"
              style={{ margin: "var(--spacing-xl) auto" }}
            ></div>
            <p
              className="section-subtitle reveal reveal-delay-2"
              style={{ margin: "0 auto", maxWidth: 600 }}
            >
              Every item in our collection undergoes rigorous authentication by period
              specialists. These are not mere objects — they are heirlooms, investments,
              and works of art.
            </p>
          </div>

          <div className="featured-grid">
            <div className="featured-card reveal">
              <img
                className="featured-card-image"
                src="https://images.pexels.com/photos/18424382/pexels-photo-18424382.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Victorian hand-painted porcelain vase with gold leaf"
                loading="lazy"
              />
              <div className="featured-card-body">
                <span className="featured-card-number">01</span>
                <span className="featured-card-era">Victorian Era, Circa 1880</span>
                <h3 className="featured-card-title">
                  Porcelain &amp; Gold
                  <br />
                  Leaf Vase
                </h3>
                <p className="featured-card-text">
                  Hand-painted porcelain with intricate 24k gold leaf detailing. Sourced
                  from a private estate in Somerset, England.
                </p>
                <span className="featured-card-cta">
                  Inquire <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </div>

            <div className="featured-card reveal reveal-delay-1">
              <img
                className="featured-card-image"
                src="https://images.pexels.com/photos/18160202/pexels-photo-18160202.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Art Deco figural table lamp with stained glass shade"
                loading="lazy"
              />
              <div className="featured-card-body">
                <span className="featured-card-number">02</span>
                <span className="featured-card-era">Art Deco, Circa 1925</span>
                <h3 className="featured-card-title">
                  Stained Glass
                  <br />
                  Table Lamp
                </h3>
                <p className="featured-card-text">
                  Original Art Deco figural lamp with handcrafted stained glass shade.
                  Attributed to the Atelier of Edgar Brandt, Paris.
                </p>
                <span className="featured-card-cta">
                  Inquire <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </div>

            <div className="featured-card reveal reveal-delay-2">
              <img
                className="featured-card-image"
                src="https://images.pexels.com/photos/18602910/pexels-photo-18602910.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Georgian longcase grandfather clock in figured oak"
                loading="lazy"
              />
              <div className="featured-card-body">
                <span className="featured-card-number">03</span>
                <span className="featured-card-era">Georgian, Circa 1790</span>
                <h3 className="featured-card-title">
                  Longcase
                  <br />
                  Grandfather Clock
                </h3>
                <p className="featured-card-text">
                  Figured oak longcase clock with brass moon phase dial and original
                  winding key. Fully restored movement by our master clockmaker.
                </p>
                <span className="featured-card-cta">
                  Inquire <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="story">
        <div className="container">
          <div className="story-grid">
            <div className="story-media reveal">
              <img
                className="story-image"
                src="https://images.pexels.com/photos/5490303/pexels-photo-5490303.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Master Antique showroom interior with curated displays"
                loading="lazy"
              />
              <div className="story-media-accent"></div>
            </div>

            <div className="story-content">
              <span className="section-label reveal">Since 1892</span>
              <h2 className="section-title reveal reveal-delay-1">
                A Legacy of
                <br />
                Discernment
              </h2>
              <div className="gold-divider reveal reveal-delay-2"></div>
              <p className="reveal reveal-delay-2">
                For generations, Master Antique has served as a destination for those who
                recognise that true beauty transcends time. Our founder, a master
                cabinetmaker, began with a simple belief: that the objects we surround
                ourselves with should be made to last — not just for a lifetime, but for
                centuries.
              </p>
              <p className="reveal reveal-delay-3">
                Today, that philosophy endures. We travel the world to source exceptional
                pieces from private estates, auction houses, and artisan workshops. Each
                acquisition is authenticated by period specialists, restored using
                era-appropriate techniques, and presented with full provenance
                documentation.
              </p>
              <div className="story-signature reveal reveal-delay-4">
                — Curated with conviction, preserved with care
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats">
            <div className="stat-item reveal">
              <div className="stat-number">130+</div>
              <div className="stat-label">Years of Curation</div>
            </div>
            <div className="stat-item reveal reveal-delay-1">
              <div className="stat-number">2,400+</div>
              <div className="stat-label">Authenticated Pieces</div>
            </div>
            <div className="stat-item reveal reveal-delay-2">
              <div className="stat-number">38</div>
              <div className="stat-label">Countries Sourced</div>
            </div>
            <div className="stat-item reveal reveal-delay-3">
              <div className="stat-number">100%</div>
              <div className="stat-label">Authenticity Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="featured-header">
            <span className="section-label reveal">Collector&apos;s Voices</span>
            <h2 className="section-title reveal reveal-delay-1">
              Trusted by Discerning
              <br />
              Collectors Worldwide
            </h2>
            <div
              className="gold-divider reveal reveal-delay-2"
              style={{ margin: "var(--spacing-xl) auto" }}
            ></div>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card reveal">
              <div className="testimonial-quote">&quot;</div>
              <p className="testimonial-text">
                Master Antique sourced a Victorian writing desk for my study that had
                belonged to a minor noble family in Kent. The provenance documentation was
                meticulous, and the restoration work is invisible — it looks exactly as it
                would have in 1860.
              </p>
              <div className="testimonial-author">
                <img
                  className="testimonial-avatar"
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="James H."
                  loading="lazy"
                />
                <div>
                  <div className="testimonial-name">James H.</div>
                  <div className="testimonial-role">Collector, London</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card reveal reveal-delay-1">
              <div className="testimonial-quote">&quot;</div>
              <p className="testimonial-text">
                I have purchased from auction houses across Europe, but nowhere have I
                experienced the level of expertise and genuine passion that the team at
                Master Antique brings. Their knowledge of Georgian furniture is
                unparalleled.
              </p>
              <div className="testimonial-author">
                <img
                  className="testimonial-avatar"
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Eleanor V."
                  loading="lazy"
                />
                <div>
                  <div className="testimonial-name">Eleanor V.</div>
                  <div className="testimonial-role">Interior Architect, Dubai</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card reveal reveal-delay-2">
              <div className="testimonial-quote">&quot;</div>
              <p className="testimonial-text">
                The brass carriage clock I acquired has become the centrepiece of my
                collection. Every time I wind it, I am reminded that some things are made
                with a permanence that modern manufacturing has forgotten.
              </p>
              <div className="testimonial-author">
                <img
                  className="testimonial-avatar"
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Marcus L."
                  loading="lazy"
                />
                <div>
                  <div className="testimonial-name">Marcus L.</div>
                  <div className="testimonial-role">Private Collector, New York</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scarcity-banner">
        <div className="container">
          <p>
            Each piece is <span>one of a kind</span> — once acquired, it may never return
            to the market.
          </p>
        </div>
      </section>

      <section className="newsletter">
        <div className="container">
          <div className="reveal">
            <span className="section-label">Private Viewings</span>
            <h2 className="section-title">Join the Collector&apos;s Circle</h2>
            <p className="section-subtitle">
              Receive curated previews of new acquisitions, exclusive invitations to
              private viewings, and insights from our restoration studio.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </main>
  );
}
