"use client";

import { useEffect, useRef, useState } from "react";
import { RagEngine } from "@/lib/rag";
import { DEFAULT_PRODUCTS } from "@/lib/products";
import type { AskResult, ChatResult, Product } from "@/lib/types";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
  results?: ChatResult[];
}

const SUGGESTIONS = [
  "Show me Victorian pieces under $3000",
  "How do I care for antique silver?",
  "What is Georgian furniture known for?",
  "Tell me about Art Deco style",
  "How to authenticate a porcelain vase",
  "What is Mid-Century Modern design?",
];

async function askServer(query: string): Promise<AskResult | null> {
  try {
    const res = await fetch("/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error("API error " + res.status);
    return (await res.json()) as AskResult;
  } catch {
    return null;
  }
}

function askLocal(query: string): AskResult {
  let products: Product[] = DEFAULT_PRODUCTS;
  try {
    const stored = JSON.parse(localStorage.getItem("ma_products") || "null");
    if (Array.isArray(stored) && stored.length > 0) products = stored;
  } catch {
    /* ignore */
  }
  return new RagEngine(products).ask(query);
}

export default function AntiqueChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(0);

  useEffect(() => {
    setMessages([
      {
        id: idRef.current++,
        sender: "bot",
        text: "Welcome to Master Antique. Ask me anything about our collection, antique eras, care tips, authentication, or restoration.",
      },
    ]);
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const handleQuery = async (raw: string) => {
    const q = raw.trim();
    if (!q || thinking) return;
    setInput("");
    setMessages((m) => [...m, { id: idRef.current++, sender: "user", text: q }]);
    setThinking(true);
    const thinkingId = idRef.current++;
    setMessages((m) => [...m, { id: thinkingId, sender: "bot", text: "Thinking..." }]);

    const serverResult = await askServer(q);
    const result = serverResult ?? askLocal(q);

    setMessages((m) =>
      m.map((msg) =>
        msg.id === thinkingId
          ? { ...msg, text: result.answer || "Please enter a question.", results: result.results }
          : msg
      )
    );
    setThinking(false);
  };

  return (
    <>
      <div className="rag-suggestions reveal">
        {SUGGESTIONS.map((s) => (
          <button key={s} className="rag-suggestion" onClick={() => handleQuery(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="rag-chat-wrap reveal reveal-delay-1">
        <div className="rag-chat" id="rag-chat" role="log" aria-live="polite" aria-label="Chat messages" ref={chatRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`rag-msg rag-${msg.sender}`}>
              <div className="rag-msg-inner">
                {msg.sender === "bot" && (
                  <div className="rag-msg-icon">
                    <i className="fas fa-robot"></i>
                  </div>
                )}
                <div className="rag-bubble">{msg.text}</div>
              </div>
              {msg.results && msg.results.length > 0 && (
                <div className="rag-cards">
                  {msg.results
                    .filter((r) => r.image)
                    .map((r, i) => (
                      <div className="rag-card" key={`${r.title}-${i}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={r.image} alt={r.title} loading="lazy" />
                        <div className="rag-card-body">
                          <strong>{r.title}</strong>
                          {r.era && <span>{r.era}</span>}
                          {r.price && <span className="rag-price">${r.price.toLocaleString()}</span>}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="rag-input-wrap">
          <input
            type="text"
            id="rag-input"
            className="rag-input"
            placeholder="Ask about our collection, eras, care, authentication..."
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleQuery(input);
            }}
            aria-label="Ask the curator"
          />
          <button
            id="rag-send"
            className="rag-send"
            aria-label="Send question"
            onClick={() => handleQuery(input)}
          >
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </>
  );
}
