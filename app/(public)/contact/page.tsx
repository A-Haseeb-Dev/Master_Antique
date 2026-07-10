import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Master Antique to arrange a private viewing, request provenance information, or inquire about a specific piece.",
  openGraph: {
    title: "Contact — Master Antique",
    description:
      "Contact Master Antique to arrange a private viewing, request provenance information, or inquire about a specific piece.",
  },
  twitter: {
    title: "Contact — Master Antique",
    description:
      "Contact Master Antique to arrange a private viewing, request provenance information, or inquire about a specific piece.",
  },
};

const CONTACT_CARDS = [
  {
    icon: "fas fa-map-marker-alt",
    title: "Our Showroom",
    lines: ["42 Heritage Lane, Saddar", "Karachi 74200, Pakistan"],
  },
  {
    icon: "fas fa-phone-alt",
    title: "Telephone",
    lines: ["+92 300 123 4567", "+92 21 3456 7890"],
  },
  {
    icon: "fas fa-envelope",
    title: "Email",
    lines: ["hello@masterantique.com", "appraisals@masterantique.com"],
  },
  {
    icon: "fas fa-clock",
    title: "Opening Hours",
    lines: ["Monday–Saturday: 10:00 AM – 7:00 PM", "Sunday: By appointment only"],
    note: "Private viewings arranged upon request",
  },
  {
    icon: "fas fa-search",
    title: "Appraisal Services",
    lines: [
      "Our period specialists offer confidential appraisal and authentication services. Please email or call to schedule.",
    ],
  },
];

export default function ContactPage() {
  return (
    <main>
      <section className="page-header">
        <div className="container">
          <span className="section-label reveal">Get in Touch</span>
          <h1 className="section-title reveal reveal-delay-1">
            Arrange a
            <br />
            Private Viewing
          </h1>
          <div
            className="gold-divider reveal reveal-delay-2"
            style={{ margin: "var(--spacing-lg) auto" }}
          ></div>
          <p className="section-subtitle reveal reveal-delay-3">
            We welcome collectors and enthusiasts by appointment. Our curators will be
            delighted to assist you.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="reveal">
              <div className="contact-form-wrap">
                <ContactForm />
              </div>
            </div>

            <div className="contact-info-list">
              {CONTACT_CARDS.map((c, i) => (
                <div
                  key={c.title}
                  className={`contact-info-card reveal${i === 0 ? "" : ` reveal-delay-${Math.min(i, 3)}`}`}
                >
                  <div className="contact-info-icon">
                    <i className={c.icon}></i>
                  </div>
                  <div>
                    <h4>{c.title}</h4>
                    {c.lines.map((line, li) => (
                      <p key={li}>{line}</p>
                    ))}
                    {c.note && (
                      <p
                        style={{
                          marginTop: "var(--spacing-sm)",
                          color: "var(--text-muted)",
                          fontStyle: "italic",
                          fontSize: "0.8rem",
                        }}
                      >
                        {c.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="scarcity-banner">
        <div className="container">
          <p>
            <span>Appointments recommended.</span> We dedicate our full attention to each
            visitor to ensure a meaningful experience.
          </p>
        </div>
      </section>
    </main>
  );
}
