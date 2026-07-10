import { NextResponse } from "next/server";
import { RagEngine } from "@/lib/rag";
import { DEFAULT_PRODUCTS } from "@/lib/products";
import type { AskResult } from "@/lib/types";

export const runtime = "nodejs";

/**
 * Local RAG endpoint. Mirrors the original `server/index.js` `/api/query`
 * route without the external OpenRouter dependency — it answers from the
 * curated TF-IDF knowledge base so the Antique AI works offline.
 */
export async function POST(request: Request): Promise<NextResponse<AskResult>> {
  let query = "";
  try {
    const body = (await request.json()) as { query?: string };
    query = body.query ?? "";
  } catch {
    query = "";
  }

  if (!query || !query.trim()) {
    return NextResponse.json({ answer: "", results: [] }, { status: 400 });
  }

  const result = new RagEngine(DEFAULT_PRODUCTS).ask(query);
  return NextResponse.json(result);
}

export async function GET(request: Request): Promise<NextResponse<AskResult>> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  if (!query || !query.trim()) {
    return NextResponse.json({ answer: "", results: [] }, { status: 400 });
  }

  const result = new RagEngine(DEFAULT_PRODUCTS).ask(query);
  return NextResponse.json(result);
}
