"use client";

import { useState } from "react";
import { SOCIAL_LINKS } from "@/lib/site";

export default function SocialFloat() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`social-float${open ? " open" : ""}`}>
      <button
        className="social-toggle"
        aria-label="Toggle social media"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <i className="fas fa-share-alt"></i>
      </button>
      <div className="social-drawer">
        {SOCIAL_LINKS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
            <i className={s.icon}></i>
          </a>
        ))}
      </div>
    </div>
  );
}
