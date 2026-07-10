"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <form className="newsletter-form" onSubmit={onSubmit} noValidate>
      <input
        type="email"
        placeholder="Enter your email address"
        required
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Subscribe</button>
      {submitted && (
        <p role="status" className="sr-only" style={{ position: "absolute", left: "-9999px" }}>
          Thank you. You will receive an invitation to our next private viewing.
        </p>
      )}
    </form>
  );
}
