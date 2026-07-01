const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

/* ─── Config ─── */
const PORT = process.env.PORT || 3000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const EMBEDDING_MODEL = 'text-embedding-3-small';
const CHAT_MODEL = 'nvidia/nemotron-3-ultra-550b-a55b:free';

if (!OPENROUTER_API_KEY) {
  console.error('ERROR: OPENROUTER_API_KEY environment variable is required.');
  console.error('Set it with:  $env:OPENROUTER_API_KEY="sk-or-v1-..."');
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

/* ─── Products / Knowledge Base ─── */
const productsPath = path.join(__dirname, 'products.json');
let products = [];
try {
  products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
} catch (e) {
  console.error('Failed to load products.json', e.message);
  process.exit(1);
}

const KB_ENTRIES = [
  { title: 'Victorian Era Antiques', text: 'The Victorian era 1837 to 1901 produced furniture with dark carved wood, buttoned velvet, fringed lampshades, and ornate silver. Mahogany, rosewood, and walnut were common. Pieces are known for their elaborate decoration and craftsmanship.' },
  { title: 'Georgian Era Antiques', text: 'The Georgian era 1714 to 1830 emphasized symmetry proportion and classical forms. Mahogany was the wood of choice. Designers like Chippendale, Hepplewhite, and Sheraton defined the period. Pieces feature clean lines, brass hardware, and elegant proportions.' },
  { title: 'Art Deco Antiques', text: 'Art Deco 1920 to 1939 embraced geometric patterns bold colors and luxurious materials like lacquer, chrome, and exotic woods. French designers like Ruhlmann, Brandt, and Lalique defined the style. Pieces are characterized by stepped forms, chevron patterns, and rich finishes.' },
  { title: 'Mid-Century Modern Antiques', text: 'Mid-Century Modern 1945 to 1965 focused on organic forms, clean lines, and honest use of materials. Scandinavian designers like Finn Juhl, Hans Wegner, and Arne Jacobsen championed the style. Pieces feature tapered legs, sculptural forms, and warm woods.' },
  { title: 'Antique Authentication', text: 'Authentication involves analyzing materials, construction techniques, maker marks, and provenance documentation. Period-specific joinery, nail types, and tool marks help date pieces. Master Antique provides full provenance documentation with every acquisition.' },
  { title: 'Antique Restoration', text: 'Restoration should preserve original material wherever possible. Master Antique uses period-authentic techniques and materials. The goal is conservation first, restoration second. Modern restoration avoids over-finishing and respects the piece history.' },
  { title: 'Caring for Antiques', text: 'Keep antiques away from direct sunlight, heat vents, and humidity extremes. Dust regularly with soft cloths. Use furniture wax for wood pieces. Silver requires periodic polishing with anti-tarnish cloths. Textiles should be professionally cleaned. Maintain stable temperature and humidity.' },
  { title: 'Investing in Antiques', text: 'Antiques can appreciate significantly over time. Rarity, provenance, condition, and period popularity affect value. Georgian furniture and Art Deco pieces have shown strong value retention. Master Antique offers authenticity guarantees with every purchase.' },
  { title: 'Antique Porcelain Guide', text: 'Porcelain is fired at high temperatures creating a hard vitreous body. English porcelain makers include Royal Worcester, Wedgwood, and Spode. Hand-painted decoration and gilding indicate higher quality. Look for maker marks on the base for identification.' },
  { title: 'Antique Silver Hallmarks', text: 'British silver hallmarks indicate purity, maker, date, and assay office. Sterling silver is 925 parts per thousand. The hallmark system dates to 1300. Victorian silver often features elaborate repoussé and engraving. Garrard & Co. is a renowned London silversmith.' },
  { title: 'Antique Clock Movements', text: 'English carriage clocks often use 8-day French movements with platform escapements. The quality of the movement indicates the clock value. Brass bushing, jeweled pivots, and maintaining power are marks of quality clocks. Regular servicing preserves mechanical integrity.' },
  { title: 'Master Antique History', text: 'Master Antique was established in 1892 by a master cabinetmaker. For over 130 years the firm has sourced authenticated antiques from private estates and auctions across 38 countries. Every piece is restored by master craftsmen using era-appropriate techniques.' }
];

/* Build all chunks: product + static KB */
function buildChunks() {
  const chunks = [];
  products.forEach(p => {
    const text = [p.name, p.era, p.description, p.provenance, p.badge].filter(Boolean).join('. ');
    chunks.push({
      id: 'p-' + chunks.length,
      type: 'product',
      title: p.name,
      era: p.era,
      price: p.price,
      image: p.image,
      badge: p.badge,
      status: p.status,
      text
    });
  });
  KB_ENTRIES.forEach(kb => {
    chunks.push({
      id: 'k-' + chunks.length,
      type: 'knowledge',
      title: kb.title,
      text: kb.text
    });
  });
  return chunks;
}

let chunks = buildChunks();
let chunkEmbeddings = null;

/* ─── OpenRouter API helper ─── */
async function callOpenRouter(endpoint, body) {
  const res = await fetch('https://openrouter.ai/api/v1/' + endpoint, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + OPENROUTER_API_KEY,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:' + PORT,
      'X-Title': 'Master Antique RAG'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error('OpenRouter error ' + res.status + ': ' + err);
  }
  return res.json();
}

/* ─── Embeddings ─── */
async function embed(text) {
  const data = await callOpenRouter('embeddings', {
    model: EMBEDDING_MODEL,
    input: text
  });
  return data.data[0].embedding;
}

function cosineSim(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

/* ─── Initialize embeddings on startup ─── */
async function initEmbeddings() {
  console.log('Generating embeddings for ' + chunks.length + ' chunks...');
  const texts = chunks.map(c => c.text);
  const all = [];
  for (let i = 0; i < texts.length; i++) {
    process.stdout.write('\r  Embedding ' + (i + 1) + '/' + texts.length);
    all.push(await embed(texts[i]));
  }
  chunkEmbeddings = all;
  console.log('\nEmbeddings ready.');
}

/* ─── Retrieve ─── */
async function retrieve(query, topK) {
  topK = topK || 5;
  const qVec = await embed(query);
  const scored = chunks.map((c, i) => ({
    index: i,
    score: chunkEmbeddings ? cosineSim(qVec, chunkEmbeddings[i]) : 0
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.filter(s => s.score > 0.1).slice(0, topK).map(s => ({
    chunk: chunks[s.index],
    score: s.score
  }));
}

/* ─── Generate Answer ─── */
async function generateAnswer(query, retrieved) {
  if (retrieved.length === 0) {
    return 'I couldn\'t find anything in our collection matching that query. Try asking about a specific era (Victorian, Georgian, Art Deco, Mid-Century), a type of item, or care and authentication tips.';
  }

  const context = retrieved.map(r => {
    const c = r.chunk;
    let prefix = '';
    if (c.type === 'product') {
      prefix = 'PRODUCT: ' + c.title;
      if (c.era) prefix += ' (' + c.era + ')';
      if (c.price) prefix += ' - $' + c.price;
    } else {
      prefix = 'KNOWLEDGE: ' + c.title;
    }
    return prefix + '\n' + c.text;
  }).join('\n\n---\n\n');

  const messages = [
    {
      role: 'system',
      content: 'You are the Master Antique curator, a knowledgeable antique expert. Answer the user\'s question using ONLY the provided context about products and antique knowledge. If the context doesn\'t contain enough information, say so. Be concise but informative. Mention specific pieces, prices, and eras when relevant. Format prices with $. Keep responses under 250 words.'
    },
    {
      role: 'user',
      content: 'Context:\n' + context + '\n\nQuestion: ' + query
    }
  ];

  const data = await callOpenRouter('chat/completions', {
    model: CHAT_MODEL,
    messages,
    max_tokens: 512,
    temperature: 0.3
  });

  return data.choices[0].message.content.trim();
}

/* ─── CORS headers for all /api routes ─── */
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

/* ─── API Routes ─── */

app.get('/api/query', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query || !query.trim()) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const retrieved = await retrieve(query, 5);
    const answer = await generateAnswer(query, retrieved);
    const productResults = retrieved
      .filter(r => r.chunk.type === 'product')
      .slice(0, 5)
      .map(r => ({
        title: r.chunk.title,
        era: r.chunk.era,
        price: r.chunk.price,
        image: r.chunk.image,
        badge: r.chunk.badge,
        status: r.chunk.status
      }));
    res.json({ answer, results: productResults });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: 'Failed to process query', detail: err.message });
  }
});

app.post('/api/query', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || !query.trim()) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const retrieved = await retrieve(query, 5);
    const answer = await generateAnswer(query, retrieved);
    const productResults = retrieved
      .filter(r => r.chunk.type === 'product')
      .slice(0, 5)
      .map(r => ({
        title: r.chunk.title,
        era: r.chunk.era,
        price: r.chunk.price,
        image: r.chunk.image,
        badge: r.chunk.badge,
        status: r.chunk.status
      }));
    res.json({ answer, results: productResults });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: 'Failed to process query', detail: err.message });
  }
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/sync-products', (req, res) => {
  try {
    const incoming = req.body;
    if (!Array.isArray(incoming) || incoming.length === 0) {
      return res.status(400).json({ error: 'Products array required' });
    }
    products = incoming;
    fs.writeFileSync(productsPath, JSON.stringify(incoming, null, 2), 'utf8');
    chunks = buildChunks();
    chunkEmbeddings = null;
    res.json({ ok: true, count: products.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ─── Serve static frontend ─── */
const frontendPath = path.resolve(__dirname, '..');
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return;
  res.sendFile(path.join(frontendPath, 'Index.html'));
});

/* ─── Start ─── */
async function start() {
  await initEmbeddings();
  app.listen(PORT, () => {
    console.log('Master Antique RAG running at http://localhost:' + PORT);
    console.log('API endpoint: POST http://localhost:' + PORT + '/api/query');
  });
}

start().catch(err => {
  console.error('Startup failed:', err);
  process.exit(1);
});
