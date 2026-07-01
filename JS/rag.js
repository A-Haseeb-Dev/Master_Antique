(function () {
  'use strict';

  /* ─── API config ─── */
  var API_BASE = (window.location.protocol === 'file:' ? 'http://localhost:3000' : window.location.origin) + '/api';

  /* ─── Knowledge Base (local fallback) ─── */
  var docs = [];
  var USE_API = true;

  function ingestProduct(p) {
    var text = (p.name || '') + ' ' + (p.era || '') + ' ' + (p.description || '') + ' ' + (p.provenance || '') + ' ' + (p.badge || '');
    docs.push({
      id: 'p-' + docs.length,
      type: 'product',
      title: p.name,
      era: p.era,
      price: p.price,
      image: p.image,
      badge: p.badge,
      status: p.status,
      text: text.toLowerCase()
    });
  }

  function ingestStatic(title, text) {
    docs.push({
      id: 's-' + docs.length,
      type: 'static',
      title: title,
      text: text.toLowerCase()
    });
  }

  function buildKnowledgeBase() {
    docs = [];
    var products = [];
    try { products = JSON.parse(localStorage.getItem('ma_products')) || []; } catch (e) {}
    if (products.length === 0) {
      products = [
        { name: 'Velvet Armchair', era: 'mid-century', description: 'Mid-Century Modern armchair attributed to Finn Juhl. Olive velvet upholstery with teak armrests.', provenance: 'Copenhagen, Denmark', badge: 'One of One', price: 2800, image: 'https://images.pexels.com/photos/18448275/pexels-photo-18448275.jpeg?auto=compress&cs=tinysrgb&w=600', status: 'available' },
        { name: 'Porcelain & Gold Vase', era: 'victorian', description: 'Hand-painted porcelain vase with intricate 24k gold leaf detailing. Royal Worcester manufacture.', provenance: 'Worcester, England', badge: 'Rare', price: 1950, image: 'https://images.pexels.com/photos/18424382/pexels-photo-18424382.jpeg?auto=compress&cs=tinysrgb&w=600', status: 'available' },
        { name: 'Stained Glass Lamp', era: 'art-deco', description: 'Art Deco figural table lamp with handcrafted stained glass shade. Attributed to Edgar Brandt.', provenance: 'Paris, France', badge: 'One of One', price: 3200, image: 'https://images.pexels.com/photos/18160202/pexels-photo-18160202.jpeg?auto=compress&cs=tinysrgb&w=600', status: 'available' },
        { name: 'Brass Carriage Clock', era: 'georgian', description: 'Fine brass carriage clock with 8-day French movement. White porcelain dial with Roman numerals.', provenance: 'John Grant & Son, London', badge: 'Recently Acquired', price: 4500, image: 'https://images.pexels.com/photos/18602910/pexels-photo-18602910.jpeg?auto=compress&cs=tinysrgb&w=600', status: 'available' },
        { name: 'Mahogany Writing Desk', era: 'georgian', description: 'Georgian mahogany pedestal writing desk with leather insert top and brass handles.', provenance: 'Thomas Chippendale school, London', badge: 'One of One', price: 5600, image: 'https://images.pexels.com/photos/5490303/pexels-photo-5490303.jpeg?auto=compress&cs=tinysrgb&w=600', status: 'available' },
        { name: 'Studio Pottery Bowl', era: 'mid-century', description: 'Mid-century studio pottery bowl with organic glazes. Lucie Rie studio.', provenance: 'London, England', badge: 'Rare', price: 1200, image: 'https://images.pexels.com/photos/15211802/pexels-photo-15211802.jpeg?auto=compress&cs=tinysrgb&w=600', status: 'available' },
        { name: 'Crystal & Bronze Chandelier', era: 'art-deco', description: 'Art Deco crystal and bronze chandelier with six lights. Atelier Ruhlmann.', provenance: 'Paris, France', badge: 'Recently Acquired', price: 12500, image: 'https://images.pexels.com/photos/11418721/pexels-photo-11418721.jpeg?auto=compress&cs=tinysrgb&w=600', status: 'available' },
        { name: 'Silver Tea Service', era: 'victorian', description: 'Victorian silver tea service with ornate repoussé detailing. Garrard & Co.', provenance: 'London, England', badge: 'One of One', price: 8900, image: 'https://images.pexels.com/photos/7303847/pexels-photo-7303847.jpeg?auto=compress&cs=tinysrgb&w=600', status: 'available' }
      ];
    }
    products.forEach(ingestProduct);
    ingestStatic('Victorian Era Antiques', 'The Victorian era 1837 to 1901 produced furniture with dark carved wood, buttoned velvet, fringed lampshades, and ornate silver. Mahogany, rosewood, and walnut were common. Pieces are known for their elaborate decoration and craftsmanship.');
    ingestStatic('Georgian Era Antiques', 'The Georgian era 1714 to 1830 emphasized symmetry proportion and classical forms. Mahogany was the wood of choice. Designers like Chippendale, Hepplewhite, and Sheraton defined the period. Pieces feature clean lines, brass hardware, and elegant proportions.');
    ingestStatic('Art Deco Antiques', 'Art Deco 1920 to 1939 embraced geometric patterns bold colors and luxurious materials like lacquer, chrome, and exotic woods. French designers like Ruhlmann, Brandt, and Lalique defined the style. Pieces are characterized by stepped forms, chevron patterns, and rich finishes.');
    ingestStatic('Mid-Century Modern Antiques', 'Mid-Century Modern 1945 to 1965 focused on organic forms, clean lines, and honest use of materials. Scandinavian designers like Finn Juhl, Hans Wegner, and Arne Jacobsen championed the style. Pieces feature tapered legs, sculptural forms, and warm woods.');
    ingestStatic('Antique Authentication', 'Authentication involves analyzing materials, construction techniques, maker marks, and provenance documentation. Period-specific joinery, nail types, and tool marks help date pieces. Master Antique provides full provenance documentation with every acquisition.');
    ingestStatic('Antique Restoration', 'Restoration should preserve original material wherever possible. Master Antique uses period-authentic techniques and materials. The goal is conservation first, restoration second. Modern restoration avoids over-finishing and respects the piece history.');
    ingestStatic('Caring for Antiques', 'Keep antiques away from direct sunlight, heat vents, and humidity extremes. Dust regularly with soft cloths. Use furniture wax for wood pieces. Silver requires periodic polishing with anti-tarnish cloths. Textiles should be professionally cleaned. Maintain stable temperature and humidity.');
    ingestStatic('Investing in Antiques', 'Antiques can appreciate significantly over time. Rarity, provenance, condition, and period popularity affect value. Georgian furniture and Art Deco pieces have shown strong value retention. Master Antique offers authenticity guarantees with every purchase.');
    ingestStatic('Antique Porcelain Guide', 'Porcelain is fired at high temperatures creating a hard vitreous body. English porcelain makers include Royal Worcester, Wedgwood, and Spode. Hand-painted decoration and gilding indicate higher quality. Look for maker marks on the base for identification.');
    ingestStatic('Antique Silver Hallmarks', 'British silver hallmarks indicate purity, maker, date, and assay office. Sterling silver is 925 parts per thousand. The hallmark system dates to 1300. Victorian silver often features elaborate repoussé and engraving. Garrard & Co. is a renowned London silversmith.');
    ingestStatic('Antique Clock Movements', 'English carriage clocks often use 8-day French movements with platform escapements. The quality of the movement indicates the clock value. Brass bushing, jeweled pivots, and maintaining power are marks of quality clocks. Regular servicing preserves mechanical integrity.');
    ingestStatic('Master Antique History', 'Master Antique was established in 1892 by a master cabinetmaker. For over 130 years the firm has sourced authenticated antiques from private estates and auctions across 38 countries. Every piece is restored by master craftsmen using era-appropriate techniques.');
  }

  /* ─── Tokenizer ─── */
  function tokenize(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
  }

  function termFreq(tokens) {
    var tf = {};
    tokens.forEach(function (t) { tf[t] = (tf[t] || 0) + 1; });
    var max = Math.max.apply(null, Object.values(tf));
    if (max === 0) return tf;
    Object.keys(tf).forEach(function (k) { tf[k] /= max; });
    return tf;
  }

  function docFreq(corpus) {
    var df = {};
    var N = corpus.length;
    corpus.forEach(function (doc) {
      var seen = {};
      doc.tokens.forEach(function (t) {
        if (!seen[t]) { df[t] = (df[t] || 0) + 1; seen[t] = true; }
      });
    });
    return { df: df, N: N };
  }

  function buildIndex() {
    var corpus = docs.map(function (d) { return { id: d.id, tokens: tokenize(d.text) }; });
    var dfData = docFreq(corpus);
    var N = dfData.N;
    var df = dfData.df;
    corpus.forEach(function (doc) {
      var tf = termFreq(doc.tokens);
      doc.vector = {};
      Object.keys(tf).forEach(function (term) {
        var idf = Math.log((N + 1) / ((df[term] || 0) + 1)) + 1;
        doc.vector[term] = tf[term] * idf;
      });
    });
    return corpus;
  }

  function cosineSim(v1, v2) {
    var dot = 0, n1 = 0, n2 = 0;
    var allTerms = {};
    Object.keys(v1).forEach(function (k) { allTerms[k] = true; });
    Object.keys(v2).forEach(function (k) { allTerms[k] = true; });
    Object.keys(allTerms).forEach(function (term) {
      var a = v1[term] || 0, b = v2[term] || 0;
      dot += a * b;
      n1 += a * a;
      n2 += b * b;
    });
    if (n1 === 0 || n2 === 0) return 0;
    return dot / (Math.sqrt(n1) * Math.sqrt(n2));
  }

  var SYNONYMS = {
    chair: ['armchair', 'seat', 'seating', 'chair'],
    desk: ['table', 'writing', 'bureau', 'secretary'],
    vase: ['porcelain', 'ceramic', 'pottery', 'urn', 'vessel'],
    lamp: ['light', 'lighting', 'chandelier', 'lantern'],
    clock: ['timepiece', 'watch', 'chronometer', 'carriage'],
    silver: ['sterling', 'plate', 'hallmark'],
    gold: ['gilt', 'gilded', 'golden', 'gold-leaf'],
    victorian: ['victoria', '19th century', '1800s'],
    georgian: ['george', '18th century', '1700s'],
    deco: ['art deco', '1920s', '1930s', 'jazz'],
    modern: ['mid-century', 'midcentury', '1950s', 'scandinavian'],
    wood: ['mahogany', 'oak', 'walnut', 'teak', 'rosewood'],
    valuable: ['expensive', 'rare', 'precious', 'investment', 'appreciate'],
    care: ['clean', 'maintain', 'restore', 'preserve', 'protect', 'polish'],
    buy: ['purchase', 'acquire', 'invest', 'collect', 'shop'],
    french: ['paris', 'france', 'ruhlmann', 'brandt', 'lalique'],
    english: ['london', 'england', 'british', 'chippendale', 'worcester'],
    authentication: ['authentic', 'genuine', 'real', 'verify', 'provenance', 'certificate'],
    restoration: ['restore', 'repair', 'conservation', 'preserve', 'refinish'],
    collection: ['curated', 'selection', 'gallery', 'showroom', 'inventory']
  };

  function expandTerms(tokens) {
    var expanded = {};
    tokens.forEach(function (t) {
      expanded[t] = true;
      var syn = SYNONYMS[t];
      if (syn) syn.forEach(function (s) { expanded[s] = true; });
    });
    return Object.keys(expanded);
  }

  var index = null;

  function retrieve(query, topK) {
    topK = topK || 5;
    if (!index) index = buildIndex();
    var qTokens = tokenize(query);
    var qExpanded = expandTerms(qTokens);
    if (qExpanded.length === 0) return [];
    var qTf = termFreq(qExpanded);
    var dfData = { df: {}, N: docs.length };
    index.forEach(function (doc) {
      Object.keys(doc.vector).forEach(function (term) {
        dfData.df[term] = (dfData.df[term] || 0) + 1;
      });
    });
    var N = dfData.N;
    var df = dfData.df;
    var qVec = {};
    Object.keys(qTf).forEach(function (term) {
      var idf = Math.log((N + 1) / ((df[term] || 0) + 1)) + 1;
      qVec[term] = qTf[term] * idf;
    });
    var scored = index.map(function (doc) {
      return { id: doc.id, score: cosineSim(qVec, doc.vector) };
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.filter(function (s) { return s.score > 0; }).slice(0, topK);
  }

  function generateFallback(query, results) {
    var greeting = query.match(/^(hi|hello|hey|greetings)/i) ? true : false;
    if (greeting) {
      return 'Welcome to Master Antique. I can help you explore our collection of fine antiques, learn about different periods, get care tips, or answer questions about authentication and restoration. What would you like to know?';
    }
    if (results.length === 0) {
      return 'I couldn\'t find anything in our collection matching that query. Try asking about a specific era (Victorian, Georgian, Art Deco, Mid-Century), a type of item (furniture, porcelain, silver, clocks, lighting), or care and authentication tips.';
    }
    var topDoc = docs.filter(function (d) { return d.id === results[0].id; })[0];
    var question = query.toLowerCase();
    if (/price|cost|value|worth|invest/i.test(question) && results.length > 0) {
      var items = results.slice(0, 3).map(function (r) {
        var d = docs.filter(function (doc) { return doc.id === r.id; })[0];
        if (!d || d.type !== 'product') return null;
        return d.title + ' — $' + d.price.toLocaleString();
      }).filter(Boolean);
      if (items.length > 0) return 'Here are items from our collection:\n' + items.join('\n') + '\n\nEach piece comes with full authentication and provenance documentation. Visit our Collection page for more details.';
    }
    if (topDoc && topDoc.type === 'product') {
      var p = topDoc;
      var lines = [
        p.title,
        'Era: ' + p.era,
        'Price: $' + p.price.toLocaleString(),
        'Status: ' + p.status
      ];
      if (p.badge) lines.push('Badge: ' + p.badge);
      if (results.length > 1) {
        var also = results.slice(1, 4).map(function (r) {
          var d = docs.filter(function (doc) { return doc.id === r.id; })[0];
          return d ? d.title : null;
        }).filter(Boolean);
        if (also.length > 0) lines.push('\nYou might also be interested in: ' + also.join(', '));
      }
      return lines.join('\n');
    }
    if (topDoc && topDoc.type === 'static') {
      var s = topDoc;
      var text = s.title + '\n' + s.text.charAt(0).toUpperCase() + s.text.slice(1);
      if (results.length > 1) {
        var related = results.slice(1, 4).map(function (r) {
          var d = docs.filter(function (doc) { return doc.id === r.id; })[0];
          return d ? d.title : null;
        }).filter(Boolean);
        if (related.length > 0) text += '\n\nRelated: ' + related.join(', ');
      }
      return text;
    }
    return 'I found some relevant information in our knowledge base. Could you be more specific about what you\'d like to know?';
  }

  /* ─── Ask: API first, fallback to local ─── */
  function ask(query) {
    if (!query || !query.trim()) return Promise.resolve(null);
    return askViaAPI(query).catch(function () {
      return askLocal(query);
    });
  }

  function askLocal(query) {
    buildKnowledgeBase();
    index = null;
    var results = retrieve(query, 5);
    var answer = generateFallback(query, results);
    var context = results.map(function (r) {
      var d = docs.filter(function (doc) { return doc.id === r.id; })[0];
      return d ? { title: d.title, type: d.type, score: r.score, image: d.image, price: d.price, era: d.era } : null;
    }).filter(Boolean);
    var productContext = context.filter(function (c) { return c.type === 'product'; });
    return Promise.resolve({ answer: answer, results: productContext });
  }

  function askViaAPI(query) {
    return fetch(API_BASE + '/query?q=' + encodeURIComponent(query))
      .then(function (res) {
        if (!res.ok) throw new Error('API error ' + res.status);
        return res.json();
      }).then(function (data) {
        return {
          answer: data.answer,
          results: (data.results || []).map(function (r) {
            return { title: r.title, era: r.era, price: r.price, image: r.image, badge: r.badge, type: 'product' };
          })
        };
      }).catch(function (err) {
        console.error('RAG API failed, using local fallback:', err && err.message);
        return askLocal(query);
      });
  }

  /* ─── Chat UI Controller ─── */
  function initChatUI() {
    var chatContainer = document.getElementById('rag-chat');
    var input = document.getElementById('rag-input');
    var sendBtn = document.getElementById('rag-send');
    var suggestions = document.querySelectorAll('.rag-suggestion');
    if (!chatContainer || !input || !sendBtn) return;

    addMessage('Welcome to Master Antique. Ask me anything about our collection, antique eras, care tips, authentication, or restoration.', 'bot');

    var isThinking = false;

    function handleQuery(q) {
      if (!q.trim() || isThinking) return;
      addMessage(q, 'user');
      input.value = '';
      isThinking = true;
      var thinking = addMessage('Thinking...', 'bot');
      ask(q).then(function (result) {
        thinking.remove();
        isThinking = false;
        if (result) {
          addMessage(result.answer, 'bot', result.results);
        } else {
          addMessage('Please enter a question.', 'bot');
        }
      }).catch(function () {
        thinking.remove();
        isThinking = false;
        addMessage('Sorry, something went wrong. Please try again.', 'bot');
      });
    }

    sendBtn.addEventListener('click', function () { handleQuery(input.value); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') handleQuery(input.value); });
    suggestions.forEach(function (btn) {
      btn.addEventListener('click', function () { handleQuery(btn.textContent); });
    });
  }

  function addMessage(text, sender, results) {
    var container = document.getElementById('rag-chat');
    var msg = document.createElement('div');
    msg.className = 'rag-msg rag-' + sender;
    var inner = document.createElement('div');
    inner.className = 'rag-msg-inner';
    if (sender === 'bot') {
      var icon = document.createElement('div');
      icon.className = 'rag-msg-icon';
      icon.innerHTML = '<i class="fas fa-robot"></i>';
      inner.appendChild(icon);
    }
    var bubble = document.createElement('div');
    bubble.className = 'rag-bubble';
    bubble.textContent = text;
    inner.appendChild(bubble);
    msg.appendChild(inner);

    if (results && results.length > 0) {
      var cards = document.createElement('div');
      cards.className = 'rag-cards';
      results.forEach(function (r) {
        if (!r.image) return;
        var card = document.createElement('div');
        card.className = 'rag-card';
        card.innerHTML =
          '<img src="' + r.image + '" alt="' + r.title + '" loading="lazy">' +
          '<div class="rag-card-body">' +
            '<strong>' + r.title + '</strong>' +
            (r.era ? '<span>' + r.era + '</span>' : '') +
            (r.price ? '<span class="rag-price">$' + r.price.toLocaleString() + '</span>' : '') +
          '</div>';
        cards.appendChild(card);
      });
      msg.appendChild(cards);
    }

    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
    return msg;
  }

  /* ─── Init ─── */
  if (document.getElementById('rag-chat')) {
    buildKnowledgeBase();
    initChatUI();
  }

})();
