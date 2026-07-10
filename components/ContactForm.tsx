"use client";

import { useState } from "react";
import type { Inquiry } from "@/lib/types";

const STORAGE_KEY = "ma_inquiries";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reference: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }
    const inquiry: Inquiry = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      reference: form.reference.trim(),
      message: form.message.trim(),
      date: new Date().toLocaleString(),
      read: false,
    };
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as Inquiry[];
      existing.push(inquiry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch {
      /* ignore storage errors */
    }
    setStatus("success");
    setForm({ name: "", email: "", phone: "", reference: "", message: "" });
  };

  return (
    <form id="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="contact-name">Full Name</label>
        <input
          type="text"
          id="contact-name"
          placeholder="Your full name"
          required
          value={form.name}
          onChange={update("name")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-email">Email Address</label>
        <input
          type="email"
          id="contact-email"
          placeholder="your@email.com"
          required
          value={form.email}
          onChange={update("email")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-phone">Phone (optional)</label>
        <input
          type="tel"
          id="contact-phone"
          placeholder="+92 300 123 4567"
          value={form.phone}
          onChange={update("phone")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-reference">Piece Reference (optional)</label>
        <input
          type="text"
          id="contact-reference"
          placeholder="e.g. Victorian porcelain vase"
          value={form.reference}
          onChange={update("reference")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          placeholder="Please describe the piece you are interested in or the type of collection you are building..."
          required
          value={form.message}
          onChange={update("message")}
        ></textarea>
      </div>
      <button type="submit" className="submit-btn">
        Send Inquiry
      </button>
      {status === "success" && (
        <p role="status" style={{ color: "var(--gold)", marginTop: "var(--spacing-md)", fontSize: "0.85rem" }}>
          Thank you for your inquiry. Our team will respond within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p role="alert" style={{ color: "#C0392B", marginTop: "var(--spacing-md)", fontSize: "0.85rem" }}>
          Please fill in name, email, and message.
        </p>
      )}
    </form>
  );
}
