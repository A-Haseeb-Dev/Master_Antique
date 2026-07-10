"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DEFAULT_CREDS = { username: "admin", password: "admin123" };
const CREDS_KEY = "ma_admin_credentials";
const LOGIN_KEY = "ma_admin_logged_in";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let creds = DEFAULT_CREDS;
    try {
      const stored = localStorage.getItem(CREDS_KEY);
      if (stored) creds = JSON.parse(stored);
    } catch {
      /* ignore */
    }
    if (username.trim() === creds.username && password.trim() === creds.password) {
      localStorage.setItem(LOGIN_KEY, "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <Link href="/" className="login-logo">
            Master&nbsp;<span>Antique</span>
          </Link>
          <p className="login-subtitle">Administrator Access</p>

          <form id="login-form" autoComplete="off" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="form-input"
                placeholder="Enter username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div id="login-error" className="login-error">
              {error}
            </div>
            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>

          <p className="login-hint">Default: admin / admin123</p>
        </div>
      </div>
    </div>
  );
}
