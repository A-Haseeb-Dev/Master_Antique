"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DEFAULT_PRODUCTS } from "@/lib/products";
import type { Product, Inquiry } from "@/lib/types";

const LOGIN_KEY = "ma_admin_logged_in";
const PRODUCTS_KEY = "ma_products";
const MESSAGES_KEY = "ma_inquiries";
const CREDS_KEY = "ma_admin_credentials";

const SECTIONS = ["overview", "products", "messages", "settings"] as const;
type Section = (typeof SECTIONS)[number];

const NAV = [
  { page: "overview", icon: "fas fa-chart-simple", label: "Overview" },
  { page: "products", icon: "fas fa-couch", label: "Products" },
  { page: "messages", icon: "fas fa-envelope", label: "Inquiries" },
  { page: "settings", icon: "fas fa-gear", label: "Settings" },
] as const;

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
function save<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState<Section>("overview");
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<Inquiry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // form fields
  const [fName, setFName] = useState("");
  const [fEra, setFEra] = useState("");
  const [fPrice, setFPrice] = useState("");
  const [fStatus, setFStatus] = useState<"available" | "sold">("available");
  const [fImage, setFImage] = useState("");
  const [fBadge, setFBadge] = useState("");
  const [fDescription, setFDescription] = useState("");
  const [fProvenance, setFProvenance] = useState("");

  const [sUser, setSUser] = useState("");
  const [sPass, setSPass] = useState("");

  useEffect(() => {
    if (localStorage.getItem(LOGIN_KEY) !== "true") {
      router.replace("/admin/login");
      return;
    }
    setAuthed(true);
    const storedProducts = load<Product[]>(PRODUCTS_KEY, []);
    setProducts(storedProducts.length > 0 ? storedProducts : DEFAULT_PRODUCTS);
    if (storedProducts.length === 0) save(PRODUCTS_KEY, DEFAULT_PRODUCTS);
    setMessages(load<Inquiry[]>(MESSAGES_KEY, []));
  }, [router]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const stats = useMemo(() => {
    const unread = messages.filter((m) => !m.read).length;
    const inStock = products.filter((p) => p.status === "available").length;
    return { total: products.length, messages: messages.length, unread, inStock };
  }, [products, messages]);

  if (!authed) return null;

  const showToast = (msg: string, type: "success" | "error") => setToast({ msg, type });

  const persistProducts = (next: Product[]) => {
    setProducts(next);
    save(PRODUCTS_KEY, next);
  };
  const persistMessages = (next: Inquiry[]) => {
    setMessages(next);
    save(MESSAGES_KEY, next);
  };

  const openModal = (idx: number) => {
    setEditingIndex(idx);
    if (idx >= 0) {
      const p = products[idx];
      setFName(p.name);
      setFEra(p.era);
      setFPrice(String(p.price));
      setFStatus(p.status);
      setFImage(p.image || "");
      setFDescription(p.description || "");
      setFProvenance(p.provenance || "");
      setFBadge(p.badge || "");
    } else {
      setFName("");
      setFEra("");
      setFPrice("");
      setFStatus("available");
      setFImage("");
      setFDescription("");
      setFProvenance("");
      setFBadge("");
    }
    setModalOpen(true);
  };

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const name = fName.trim();
    const era = fEra.trim();
    const price = parseFloat(fPrice);
    if (!name || !era || isNaN(price)) {
      showToast("Name, Era and Price are required.", "error");
      return;
    }
    const product: Product = {
      name,
      era,
      price,
      image:
        fImage.trim() ||
        "https://images.pexels.com/photos/18424382/pexels-photo-18424382.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: fDescription.trim() || "A fine antique piece from our collection.",
      provenance: fProvenance.trim() || "Authenticated by Master Antique",
      badge: fBadge.trim(),
      status: fStatus,
    };
    const next = [...products];
    if (editingIndex >= 0) next[editingIndex] = product;
    else next.push(product);
    persistProducts(next);
    setModalOpen(false);
    showToast(editingIndex >= 0 ? "Product updated." : "Product added.", "success");
  };

  const deleteProduct = (idx: number) => {
    if (!confirm("Delete this product?")) return;
    const next = products.filter((_, i) => i !== idx);
    persistProducts(next);
    showToast("Product deleted.", "success");
  };

  const markRead = (realIdx: number) => {
    const next = messages.map((m, i) => (i === realIdx ? { ...m, read: true } : m));
    persistMessages(next);
  };
  const deleteMessage = (realIdx: number) => {
    if (!confirm("Delete this message?")) return;
    const next = messages.filter((_, i) => i !== realIdx);
    persistMessages(next);
    showToast("Message deleted.", "success");
  };

  const updateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sUser.trim() || !sPass.trim()) {
      showToast("Both fields are required.", "error");
      return;
    }
    save(CREDS_KEY, { username: sUser.trim(), password: sPass.trim() });
    showToast("Credentials updated. Use new credentials on next login.", "success");
  };

  return (
    <div className="dashboard">
      <div id="toast" className={`toast${toast ? " toast-" + toast.type + " show" : ""}`}>
        {toast?.msg}
      </div>

      <aside className="sidebar">
        <div className="sidebar-header">
          <Link href="/">
            Master&nbsp;<span>Antique</span>
          </Link>
        </div>
        <ul className="sidebar-nav">
          {NAV.map((n) => (
            <li key={n.page}>
              <a
                href="#"
                data-page={n.page}
                className={section === n.page ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setSection(n.page as Section);
                }}
              >
                <i className={n.icon}></i>
                <span>{n.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <Link href="/" target="_blank">
            <i className="fas fa-external-link-alt"></i>
            <span>View Site</span>
          </Link>
          <a
            href="#"
            style={{ marginTop: 8 }}
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem(LOGIN_KEY);
              router.replace("/admin/login");
            }}
          >
            <i className="fas fa-right-from-bracket"></i>
            <span>Logout</span>
          </a>
        </div>
      </aside>

      <main className="main-content">
        <div className="page-header">
          <div>
            <h1 id="page-title">{NAV.find((n) => n.page === section)?.label}</h1>
            <p>Manage your antique collection</p>
          </div>
        </div>

        {/* Overview */}
        <section id="section-overview" style={{ display: section === "overview" ? "block" : "none" }}>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-couch"></i>
              </div>
              <h3>{stats.total}</h3>
              <p>Total Products</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>{stats.messages}</h3>
              <p>Total Inquiries</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-envelope-open"></i>
              </div>
              <h3>{stats.unread}</h3>
              <p>Unread</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>{stats.inStock}</h3>
              <p>In Stock</p>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="section-products" style={{ display: section === "products" ? "block" : "none" }}>
          <div className="content-card">
            <div className="content-card-header">
              <h2>All Products</h2>
              <button className="btn btn-gold" onClick={() => openModal(-1)}>
                <i className="fas fa-plus"></i> Add Product
              </button>
            </div>
            <div className="content-card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: 50 }}>Image</th>
                    <th>Name</th>
                    <th>Era</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th style={{ width: 110 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        <div className="empty-state">
                          <i className="fas fa-box-open"></i>
                          <p>No products yet. Click &quot;Add Product&quot; to get started.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    products.map((p, i) => (
                      <tr key={i}>
                        <td>
                          {p.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.image}
                              alt=""
                              style={{
                                width: 40,
                                height: 40,
                                objectFit: "cover",
                                borderRadius: 4,
                                display: "block",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                background: "#D4C9B5",
                                borderRadius: 4,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.7rem",
                                color: "#7A6B5A",
                              }}
                            >
                              No img
                            </div>
                          )}
                        </td>
                        <td>
                          <strong>{p.name}</strong>
                        </td>
                        <td>{p.era}</td>
                        <td>${p.price.toLocaleString()}</td>
                        <td>
                          <span
                            className={`badge ${
                              p.status === "available" ? "badge-success" : "badge-warning"
                            }`}
                          >
                            {p.status === "available" ? "Available" : "Sold"}
                          </span>
                        </td>
                        <td className="actions">
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => openModal(i)}
                            aria-label={`Edit ${p.name}`}
                          >
                            <i className="fas fa-pen"></i>
                          </button>{" "}
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteProduct(i)}
                            aria-label={`Delete ${p.name}`}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Messages */}
        <section id="section-messages" style={{ display: section === "messages" ? "block" : "none" }}>
          <div className="content-card">
            <div className="content-card-header">
              <h2>Customer Inquiries</h2>
            </div>
            <div className="content-card-body">
              {messages.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-envelope-open"></i>
                  <p>No inquiries yet.</p>
                </div>
              ) : (
                [...messages].reverse().map((m, ri) => {
                  const realIdx = messages.length - 1 - ri;
                  return (
                    <div className="message-item" key={realIdx}>
                      <h4>{m.name}</h4>
                      <div className="meta">
                        <span>
                          <i className="fas fa-envelope"></i> {m.email}
                        </span>
                        {m.phone && (
                          <span>
                            <i className="fas fa-phone"></i> {m.phone}
                          </span>
                        )}
                        <span>
                          <i className="fas fa-clock"></i> {m.date}
                        </span>
                        {!m.read && <span className="badge badge-warning">New</span>}
                      </div>
                      <p>{m.message}</p>
                      {m.reference && (
                        <p style={{ fontSize: "0.8rem", color: "#B8860B", marginTop: 4 }}>
                          Ref: {m.reference}
                        </p>
                      )}
                      <div className="actions">
                        {!m.read && (
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => markRead(realIdx)}
                          >
                            <i className="fas fa-check"></i> Mark Read
                          </button>
                        )}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteMessage(realIdx)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* Settings */}
        <section id="section-settings" style={{ display: section === "settings" ? "block" : "none" }}>
          <div className="content-card">
            <div className="content-card-header">
              <h2>Admin Credentials</h2>
            </div>
            <div className="content-card-body">
              <form id="settings-form" style={{ maxWidth: 400 }} onSubmit={updateCredentials}>
                <div className="form-group">
                  <label htmlFor="s-username">New Username</label>
                  <input
                    type="text"
                    id="s-username"
                    className="form-input"
                    placeholder="Enter new username"
                    required
                    value={sUser}
                    onChange={(e) => setSUser(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="s-password">New Password</label>
                  <input
                    type="password"
                    id="s-password"
                    className="form-input"
                    placeholder="Enter new password"
                    required
                    value={sPass}
                    onChange={(e) => setSPass(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-gold">
                  Update Credentials
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Product Modal */}
      <div className={`modal-overlay${modalOpen ? " open" : ""}`} id="product-modal">
        <div className="modal">
          <div className="modal-header">
            <h2>{editingIndex >= 0 ? "Edit Product" : "Add Product"}</h2>
            <button className="modal-close" onClick={() => setModalOpen(false)}>
              &times;
            </button>
          </div>
          <form id="product-form" onSubmit={saveProduct}>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="p-name">Product Name *</label>
                  <input
                    type="text"
                    id="p-name"
                    className="form-input"
                    placeholder="e.g. Victorian Mahogany Desk"
                    required
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="p-era">Era *</label>
                  <input
                    type="text"
                    id="p-era"
                    className="form-input"
                    placeholder="e.g. Victorian"
                    required
                    value={fEra}
                    onChange={(e) => setFEra(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="p-price">Price ($) *</label>
                  <input
                    type="number"
                    id="p-price"
                    className="form-input"
                    placeholder="e.g. 4500"
                    min={0}
                    step="0.01"
                    required
                    value={fPrice}
                    onChange={(e) => setFPrice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="p-status">Status</label>
                  <select
                    id="p-status"
                    className="form-input"
                    style={{ cursor: "pointer" }}
                    value={fStatus}
                    onChange={(e) => setFStatus(e.target.value as "available" | "sold")}
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="p-image">Image URL</label>
                <input
                  type="url"
                  id="p-image"
                  className="form-input"
                  placeholder="https://images.pexels.com/..."
                  value={fImage}
                  onChange={(e) => setFImage(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="p-badge">Badge (optional)</label>
                <input
                  type="text"
                  id="p-badge"
                  className="form-input"
                  placeholder="e.g. One of One, Rare, Recently Acquired"
                  value={fBadge}
                  onChange={(e) => setFBadge(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="p-description">Description</label>
                <textarea
                  id="p-description"
                  className="form-input"
                  rows={3}
                  placeholder="Describe the piece..."
                  value={fDescription}
                  onChange={(e) => setFDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="p-provenance">Provenance</label>
                <input
                  type="text"
                  id="p-provenance"
                  className="form-input"
                  placeholder="e.g. Estate of Lady Margaret Whitmore"
                  value={fProvenance}
                  onChange={(e) => setFProvenance(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-gold">
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
