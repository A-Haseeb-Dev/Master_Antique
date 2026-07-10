import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              Master&nbsp;<span>Antique</span>
            </Link>
            <p>
              Since 1892, we have been curating the world&apos;s finest antiques for
              discerning collectors who value authenticity, craftsmanship, and
              enduring beauty.
            </p>
            <div className="footer-social">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}>
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4>Navigate</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">Our Heritage</Link>
              </li>
              <li>
                <Link href="/collection">The Collection</Link>
              </li>
              <li>
                <Link href="/antique-ai">Antique AI</Link>
              </li>
              <li>
                <Link href="/contact">Contact &amp; Viewings</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Periods</h4>
            <ul>
              <li>
                <Link href="/collection">Victorian</Link>
              </li>
              <li>
                <Link href="/collection">Georgian</Link>
              </li>
              <li>
                <Link href="/collection">Art Deco</Link>
              </li>
              <li>
                <Link href="/collection">Mid-Century</Link>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Visit Our Showroom</h4>
            <p>
              <i className="fas fa-map-marker-alt"></i> {SITE.address}
            </p>
            <p>
              <i className="fas fa-phone"></i> {SITE.phone}
            </p>
            <p>
              <i className="fas fa-envelope"></i> {SITE.email}
            </p>
            <p style={{ marginTop: "var(--spacing-sm)", fontStyle: "italic", fontSize: "0.8rem" }}>
              Viewings by appointment preferred
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2025 Master Antique. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Sale</a>
            <Link href={SITE.adminHref} style={{ opacity: 0.35, fontSize: "0.7rem" }}>
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
