/* ============================================================
   ML Revision Lab Kit — shared helpers for the ML interview revision hub
   Header + module switcher, tabs (deep-linked by hash), Python
   highlighting with copy buttons, Q&A accordions, canvas helpers.
   Exposed as window.MR.
   ============================================================ */
(function () {
  'use strict';

  const MODULES = [
    { id: 'gen', num: '01', file: 'mr-01-generalization.html', title: 'Bias–Variance & Generalization', short: 'Under- vs overfitting, regularization, cross-validation, learning curves and data leakage.' },
    { id: 'metrics', num: '02', file: 'mr-02-metrics.html', title: 'Evaluation Metrics', short: 'Confusion matrix, precision/recall/F1, ROC vs PR curves, class imbalance, regression metrics and calibration.' },
    { id: 'optim', num: '03', file: 'mr-03-optimization.html', title: 'Gradient Descent & Training', short: 'Learning rate, SGD vs momentum vs Adam, batch size, vanishing/exploding gradients, dropout and batch norm.' },
    { id: 'models', num: '04', file: 'mr-04-models.html', title: 'Classic Models', short: 'Linear vs logistic regression, decision trees, bagging vs boosting, SVMs and k-NN.' },
    { id: 'unsup', num: '05', file: 'mr-05-unsupervised.html', title: 'Clustering & PCA', short: 'k-means step by step, choosing k, PCA projections and explained variance.' },
    { id: 'features', num: '06', file: 'mr-06-features.html', title: 'Data & Feature Engineering', short: 'Missing values, categorical encoding, scaling, outliers and skew.' },
    { id: 'transformers', num: '07', file: 'mr-07-transformers.html', title: 'Attention & Transformers', short: 'Scaled dot-product attention, positional encoding, encoder vs decoder, the KV cache, MQA/GQA.' },
    { id: 'llm', num: '08', file: 'mr-08-llms.html', title: 'LLMs: Tokens, Decoding & Fine-Tuning', short: 'BPE tokenization, temperature/top-k/top-p, prompt vs RAG vs fine-tune, LoRA, RLHF and DPO.' },
    { id: 'rag', num: '09', file: 'mr-09-rag.html', title: 'RAG Fundamentals', short: 'The pipeline, chunking, embeddings and cosine similarity, BM25 vs dense vs hybrid, re-ranking.' },
    { id: 'rageval', num: '10', file: 'mr-10-rag-eval.html', title: 'RAG Evaluation & Debugging', short: 'Recall@k, MRR, nDCG, faithfulness and context precision, failure-mode debugging, advanced RAG.' },
    { id: 'agents', num: '11', file: 'mr-11-agents.html', title: 'Agents & LLMOps', short: 'The ReAct loop, tool calling, prompt injection, latency and cost levers in production.' },
    { id: 'design', num: '12', file: 'mr-12-system-design.html', title: 'ML System Design', short: 'The design framework, A/B testing and sample size, offline vs online metrics, drift and safe deployment.' },
    { id: 'recsys', num: '13', file: 'mr-13-recsys.html', title: 'Recommender Systems', short: 'Retrieval → ranking → re-ranking, two-tower and collaborative filtering, cold start, labels and negatives, blending objectives, exploration.' },
    { id: 'qa', num: '14', file: 'mr-14-qa-bank.html', title: 'Q&A Bank & Cheat Sheet', short: 'Every question in one place, flashcards, a formula cheat sheet and an answering playbook.' },
  ];

  const ICONS = {
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    step: '<path d="M5 4l10 8-10 8z"/><path d="M19 5v14"/>',
    reset: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    chev: '<path d="m9 18 6-6-6-6"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3"/><path d="M7 15h10"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="m2 12 8.58 3.91a2 2 0 0 0 1.66 0L21 12M2 17l8.58 3.91a2 2 0 0 0 1.66 0L21 17"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    git: '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
    arrowLeft: '<path d="m12 19-7-7 7-7M19 12H5"/>',
    plus: '<path d="M5 12h14M12 5v14"/>',
    trash: '<path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  };

  function icon(name, cls) {
    return '<svg class="' + (cls || '') + '" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.info) + '</svg>';
  }

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ----------------------------------------------------------
     Python highlighter (small, single-pass tokenizer)
     ---------------------------------------------------------- */
  const KW = new Set(('False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield').split(' '));
  const BUILTIN = new Set(('print len range enumerate zip list dict tuple set int float str super isinstance type sum min max abs round sorted map open').split(' '));
  const FA_NAMES = new Set(('np pd torch nn F sklearn LogisticRegression LinearRegression Ridge Lasso RandomForestClassifier GradientBoostingClassifier XGBClassifier KMeans PCA StandardScaler Pipeline ColumnTransformer OneHotEncoder train_test_split cross_val_score GridSearchCV StratifiedKFold TimeSeriesSplit roc_auc_score precision_recall_curve f1_score CalibratedClassifierCV SimpleImputer AutoModelForCausalLM AutoTokenizer LoraConfig get_peft_model').split(' '));
  function highlightJSON(src) {
    return esc(src).replace(/(&quot;(?:\\.|[^&]|&(?!quot;))*?&quot;)(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g, (m, s, colon, b, n) => {
      if (s) return '<span class="' + (colon ? 'json-k' : 'json-s') + '">' + s + '</span>' + (colon || '');
      if (b) return '<span class="json-b">' + b + '</span>';
      return '<span class="json-n">' + n + '</span>';
    });
  }
  function highlight(src) {
    const re = /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|f?"(?:\\.|[^"\\\n])*"|f?'(?:\\.|[^'\\\n])*')|(@[\w.]+)|\b(\d+(?:\.\d+)?(?:e-?\d+)?)\b|\b([A-Za-z_]\w*)\b(\s*\()?/g;
    let out = '';
    let last = 0;
    let m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index));
      if (m[1]) out += '<span class="py-com">' + esc(m[1]) + '</span>';
      else if (m[2]) out += '<span class="py-str">' + esc(m[2]) + '</span>';
      else if (m[3]) out += '<span class="py-dec">' + esc(m[3]) + '</span>';
      else if (m[4]) out += '<span class="py-num">' + m[4] + '</span>';
      else if (m[5]) {
        const w = m[5];
        let cls = '';
        if (KW.has(w)) cls = 'py-kw';
        else if (w === 'self') cls = 'py-self';
        else if (FA_NAMES.has(w)) cls = 'py-torch';
        else if (m[6] || BUILTIN.has(w)) cls = 'py-fn';
        out += cls ? '<span class="' + cls + '">' + w + '</span>' : w;
        if (m[6]) out += esc(m[6]);
      }
      last = re.lastIndex;
    }
    return out + esc(src.slice(last));
  }

  function dedent(text) {
    const lines = text.replace(/^\n+|\s+$/g, '').split('\n');
    const ind = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
    return lines.map((l) => l.slice(ind)).join('\n');
  }

  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1400);
  }

  function copyText(text) {
    const done = () => toast('Copied to clipboard');
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, () => fallback());
    } else fallback();
    function fallback() {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { toast('Press Ctrl/Cmd+C to copy'); }
      ta.remove();
    }
  }

  // Build a code block element from source text.
  function codeBlock(src, opts) {
    const o = opts || {};
    const code = dedent(src);
    const el = document.createElement('div');
    el.className = 'code-block';
    el.innerHTML = '<div class="code-head"><span class="t">' + icon('code') + esc(o.title || 'python') +
      (o.imp ? ' <span class="imp">Must-know</span>' : '') + '</span>' +
      '<button class="copy-btn" type="button">' + icon('copy') + 'Copy</button></div>' +
      '<pre class="code">' + (o.lang === 'json' ? highlightJSON(code) : highlight(code)) + '</pre>' +
      (o.out ? '<pre class="out">' + esc(dedent(o.out)) + '</pre>' : '');
    el.querySelector('.copy-btn').addEventListener('click', () => copyText(code));
    return el;
  }

  // <textarea class="py" data-title=".." data-imp></textarea> [+ <textarea class="py-out">]
  function hydrateCode(root) {
    $$('textarea.py', root).forEach((ta) => {
      const next = ta.nextElementSibling;
      let out = '';
      if (next && next.matches('textarea.py-out')) { out = next.value; next.remove(); }
      const block = codeBlock(ta.value, { title: ta.dataset.title, imp: ta.hasAttribute('data-imp'), out, lang: ta.dataset.lang });
      ta.replaceWith(block);
    });
  }

  function hydrateIcons(root) {
    $$('i[data-icon]', root).forEach((n) => { n.outerHTML = icon(n.dataset.icon, n.className); });
  }

  /* ----------------------------------------------------------
     Q&A rendering — data lives in mr-qa.js (window.MR_QA)
     ---------------------------------------------------------- */
  function qaItem(item, n, showModule) {
    const d = document.createElement('details');
    d.className = 'qa' + (item.imp ? ' imp-q' : '');
    const mod = MODULES.find((x) => x.id === item.m);
    d.innerHTML = '<summary><span class="qn">Q' + n + '</span><span class="qt">' + item.q +
      (item.imp ? ' <span class="imp">Must-know</span>' : '') + '</span>' + icon('chev', 'chev') + '</summary>' +
      '<div class="qa-body">' + item.a +
      (showModule && mod ? '<div class="qa-mod"><a href="' + mod.file + (item.s ? '#' + item.s : '') + '">' + mod.num + ' · ' + esc(mod.title) + ' →</a></div>' : '') +
      '</div>';
    if (item.code) d.querySelector('.qa-body').insertBefore(codeBlock(item.code, { title: item.codeTitle || 'python' }), d.querySelector('.qa-mod'));
    return d;
  }

  function qa(target, filter) {
    const host = typeof target === 'string' ? $(target) : target;
    if (!host) return [];
    const all = window.MR_QA || [];
    const items = all.filter((x) => (!filter.m || x.m === filter.m) && (!filter.s || x.s === filter.s));
    host.classList.add('qa-list');
    host.innerHTML = '';
    items.forEach((it, i) => host.appendChild(qaItem(it, i + 1, filter.showModule)));
    if (!items.length) host.innerHTML = '<p class="muted small">No questions yet.</p>';
    return items;
  }

  // Auto-render <div data-qa="module:section"></div>
  function hydrateQA(root) {
    $$('[data-qa]', root).forEach((el) => {
      const [m, s] = el.dataset.qa.split(':');
      qa(el, { m, s });
    });
  }

  /* ----------------------------------------------------------
     Header, module switcher and pager
     ---------------------------------------------------------- */
  function chrome(moduleId) {
    const idx = MODULES.findIndex((m) => m.id === moduleId);
    const mod = MODULES[idx];
    const top = document.createElement('header');
    top.className = 'lab-top';
    top.innerHTML = '<div class="wrap">' +
      '<a class="lab-back" href="../../index.html#subjects/mlrevision" target="_top"><span class="mark">SV</span><span class="hide-sm">Portfolio</span></a>' +
      '<span class="lab-crumb">/ ML Revision / ' + (mod ? mod.num + ' ' + esc(mod.title) : '') + '</span>' +
      '<span class="spacer"></span>' +
      '<select class="mod-select" aria-label="Jump to module">' +
      MODULES.map((m) => '<option value="' + m.file + '"' + (m.id === moduleId ? ' selected' : '') + '>' + m.num + ' · ' + esc(m.title) + '</option>').join('') +
      '</select></div>';
    document.body.prepend(top);
    top.querySelector('.mod-select').addEventListener('change', (e) => { location.href = e.target.value; });

    const main = $('main') || document.body;
    const shell = document.createElement('div');
    shell.className = 'wrap';
    const pager = document.createElement('nav');
    pager.className = 'pager';
    pager.setAttribute('aria-label', 'Module navigation');
    const prev = MODULES[idx - 1];
    const next = MODULES[idx + 1];
    pager.innerHTML = (prev ? '<a class="prev" href="' + prev.file + '"><small>← Previous</small><b>' + prev.num + ' · ' + esc(prev.title) + '</b></a>' : '<span></span>') +
      (next ? '<a class="next" href="' + next.file + '"><small>Next →</small><b>' + next.num + ' · ' + esc(next.title) + '</b></a>' : '<span></span>');
    shell.appendChild(pager);
    main.appendChild(shell);
    const foot = document.createElement('footer');
    foot.className = 'footer-note';
    foot.innerHTML = 'ML Revision · interview questions with model answers and interactive intuition · <a href="mr-14-qa-bank.html">All questions &amp; cheat sheet</a>';
    shell.appendChild(foot);
  }

  /* ----------------------------------------------------------
     Tabs: <button class="tab" data-tab="x"> / <section class="tab-panel" data-panel="x">
     ---------------------------------------------------------- */
  function tabs(onChange) {
    const btns = $$('.tab[data-tab]');
    const panels = $$('.tab-panel[data-panel]');
    if (!btns.length) return () => {};
    function show(id, fromHash) {
      if (!btns.some((b) => b.dataset.tab === id)) id = btns[0].dataset.tab;
      btns.forEach((b) => { const on = b.dataset.tab === id; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
      panels.forEach((p) => { p.hidden = p.dataset.panel !== id; });
      if (!fromHash && location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
      const active = btns.find((b) => b.dataset.tab === id);
      if (active && active.scrollIntoView) active.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      if (onChange) onChange(id);
    }
    btns.forEach((b) => b.addEventListener('click', () => { show(b.dataset.tab); window.scrollTo({ top: 0, behavior: 'auto' }); }));
    window.addEventListener('hashchange', () => show(location.hash.slice(1), true));
    show(location.hash.slice(1), true);
    return show;
  }

  /* ----------------------------------------------------------
     Canvas helpers
     ---------------------------------------------------------- */
  function canvas(el, h) {
    const dpr = window.devicePixelRatio || 1;
    const w = el.clientWidth || el.parentElement.clientWidth || 600;
    const height = h || el.clientHeight || 260;
    el.width = Math.round(w * dpr);
    el.height = Math.round(height * dpr);
    el.style.height = height + 'px';
    const ctx = el.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h: height };
  }

  // Simple multi-series line chart. series: [{ data:[..], color, label, dash }]
  function lineChart(el, series, opts) {
    const o = Object.assign({ h: 220, pad: 34, ymin: null, ymax: null, xlabel: '', ylabel: '' }, opts);
    const { ctx, w, h } = canvas(el, o.h);
    ctx.clearRect(0, 0, w, h);
    const all = series.flatMap((s) => s.data).filter((v) => isFinite(v));
    if (!all.length) return;
    let ymin = o.ymin != null ? o.ymin : Math.min(...all);
    let ymax = o.ymax != null ? o.ymax : Math.max(...all);
    if (ymax - ymin < 1e-9) { ymax += 1; ymin -= 1; }
    const n = Math.max(...series.map((s) => s.data.length));
    const X = (i) => o.pad + (i / Math.max(1, n - 1)) * (w - o.pad - 12);
    const Y = (v) => h - 22 - ((v - ymin) / (ymax - ymin)) * (h - 36);
    ctx.strokeStyle = '#222939'; ctx.lineWidth = 1;
    ctx.font = '10px JetBrains Mono, monospace'; ctx.fillStyle = '#646d82';
    for (let k = 0; k <= 4; k++) {
      const v = ymin + (k / 4) * (ymax - ymin);
      const y = Y(v);
      ctx.beginPath(); ctx.moveTo(o.pad, y); ctx.lineTo(w - 10, y); ctx.stroke();
      ctx.fillText(Math.abs(v) >= 100 ? v.toFixed(0) : v.toFixed(2), 2, y + 3);
    }
    if (o.xlabel) ctx.fillText(o.xlabel, w - 10 - ctx.measureText(o.xlabel).width, h - 6);
    series.forEach((s) => {
      ctx.strokeStyle = s.color; ctx.lineWidth = s.width || 2;
      ctx.setLineDash(s.dash || []);
      ctx.beginPath();
      s.data.forEach((v, i) => { if (!isFinite(v)) return; const x = X(i), y = Y(Math.min(ymax, Math.max(ymin, v))); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
      ctx.stroke();
      ctx.setLineDash([]);
    });
    if (o.marker != null) {
      ctx.strokeStyle = 'rgba(251,191,36,0.8)'; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(X(o.marker), 8); ctx.lineTo(X(o.marker), h - 22); ctx.stroke(); ctx.setLineDash([]);
    }
  }

  // Deterministic PRNG so demos are reproducible (like torch.manual_seed)

  // XY plot on a canvas. layers: [{ type:'line'|'points'|'area'|'vline'|'hline', data:[[x,y],..] | value, color, width, dash, r, fill, label }]
  // Returns { X, Y, ctx, w, h } so pages can draw extra marks.
  function plot(el, layers, opts) {
    const o = Object.assign({ h: 260, padL: 40, padR: 14, padT: 12, padB: 28, xlabel: '', ylabel: '', grid: true, ticks: 5, xfmt: null, yfmt: null }, opts);
    const { ctx, w, h } = canvas(el, o.h);
    ctx.clearRect(0, 0, w, h);
    const pts = layers.filter((l) => Array.isArray(l.data)).flatMap((l) => l.data);
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const xmin = o.xmin != null ? o.xmin : Math.min(...xs), xmax = o.xmax != null ? o.xmax : Math.max(...xs);
    let ymin = o.ymin != null ? o.ymin : Math.min(...ys), ymax = o.ymax != null ? o.ymax : Math.max(...ys);
    if (ymax - ymin < 1e-9) { ymax += 1; ymin -= 1; }
    const X = (x) => o.padL + ((x - xmin) / (xmax - xmin || 1)) * (w - o.padL - o.padR);
    const Y = (y) => h - o.padB - ((y - ymin) / (ymax - ymin)) * (h - o.padT - o.padB);
    ctx.font = '10.5px JetBrains Mono, monospace'; ctx.fillStyle = '#646d82'; ctx.strokeStyle = '#1d2335'; ctx.lineWidth = 1;
    for (let i = 0; i <= o.ticks; i++) {
      const yv = ymin + (i / o.ticks) * (ymax - ymin), xv = xmin + (i / o.ticks) * (xmax - xmin);
      if (o.grid) { ctx.beginPath(); ctx.moveTo(o.padL, Y(yv)); ctx.lineTo(w - o.padR, Y(yv)); ctx.stroke(); }
      ctx.textAlign = 'right'; ctx.fillText(o.yfmt ? o.yfmt(yv) : fmt(yv, 2), o.padL - 5, Y(yv) + 3);
      ctx.textAlign = 'center'; ctx.fillText(o.xfmt ? o.xfmt(xv) : fmt(xv, 2), X(xv), h - o.padB + 15);
    }
    if (o.xlabel) { ctx.textAlign = 'right'; ctx.fillText(o.xlabel, w - o.padR, h - 2); }
    if (o.ylabel) { ctx.save(); ctx.textAlign = 'left'; ctx.fillText(o.ylabel, o.padL + 4, o.padT + 8); ctx.restore(); }
    layers.forEach((l) => {
      ctx.save(); ctx.strokeStyle = l.color || '#8b8cff'; ctx.fillStyle = l.fill || l.color || '#8b8cff'; ctx.lineWidth = l.width || 2; ctx.setLineDash(l.dash || []);
      if (l.type === 'vline' || l.type === 'hline') {
        ctx.beginPath();
        if (l.type === 'vline') { ctx.moveTo(X(l.data), o.padT); ctx.lineTo(X(l.data), h - o.padB); } else { ctx.moveTo(o.padL, Y(l.data)); ctx.lineTo(w - o.padR, Y(l.data)); }
        ctx.stroke();
      } else if (l.type === 'points') {
        l.data.forEach((p) => { ctx.globalAlpha = l.alpha || 0.9; ctx.fillStyle = p[2] || l.color || '#8b8cff'; ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]), l.r || 3.5, 0, Math.PI * 2); ctx.fill(); });
      } else {
        const d = l.data.filter((p) => isFinite(p[1]));
        if (!d.length) { ctx.restore(); return; }
        ctx.beginPath(); d.forEach((p, i) => (i ? ctx.lineTo(X(p[0]), Y(Math.max(ymin, Math.min(ymax, p[1])))) : ctx.moveTo(X(p[0]), Y(Math.max(ymin, Math.min(ymax, p[1]))))));
        if (l.type === 'area') { ctx.lineTo(X(d[d.length - 1][0]), Y(ymin)); ctx.lineTo(X(d[0][0]), Y(ymin)); ctx.closePath(); ctx.globalAlpha = l.alpha || 0.18; ctx.fill(); ctx.globalAlpha = 1; }
        else ctx.stroke();
      }
      ctx.restore();
    });
    return { X, Y, ctx, w, h, xmin, xmax, ymin, ymax };
  }

  function rng(seed) {
    let s = seed >>> 0 || 1;
    const next = () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
    next.normal = () => { const u = Math.max(1e-9, next()), v = next(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
    return next;
  }

  function fmt(v, d) {
    if (typeof v !== 'number') return String(v);
    const p = d == null ? 2 : d;
    const r = Number(v.toFixed(p));
    return Object.is(r, -0) ? '0' : String(r);
  }

  // Render a 1-D or 2-D array as a grid of cells.
  function tensorGrid(arr, opts) {
    const o = opts || {};
    const rows = Array.isArray(arr[0]) ? arr : [arr];
    const cols = rows[0].length;
    let html = '<div class="tgrid" style="grid-template-columns:repeat(' + cols + ', minmax(38px, auto))">';
    rows.forEach((r, i) => r.forEach((v, j) => {
      const cls = o.cls ? o.cls(i, j, v) : '';
      html += '<span class="tcell ' + cls + '">' + (typeof v === 'number' ? fmt(v, o.d) : esc(v)) + '</span>';
    }));
    return html + '</div>';
  }

  /* ----------------------------------------------------------
     Maths: KaTeX auto-render for \( … \) and \[ … \]
     ---------------------------------------------------------- */
  const KATEX = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/';
  let mathReady = null;
  function loadMath() {
    if (mathReady) return mathReady;
    mathReady = new Promise((resolve) => {
      const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = KATEX + 'katex.min.css'; document.head.appendChild(css);
      const a = document.createElement('script'); a.src = KATEX + 'katex.min.js';
      a.onload = () => { const b = document.createElement('script'); b.src = KATEX + 'contrib/auto-render.min.js'; b.onload = () => resolve(true); b.onerror = () => resolve(false); document.head.appendChild(b); };
      a.onerror = () => resolve(false);
      document.head.appendChild(a);
    });
    return mathReady;
  }
  function math(el) {
    loadMath().then((ok) => {
      if (!ok || !window.renderMathInElement) return;
      window.renderMathInElement(el || document.body, { delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }], throwOnError: false, ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'] });
    });
  }

  function init(moduleId, onTab) {
    const run = () => {
      chrome(moduleId);
      hydrateIcons(document);
      hydrateCode(document);
      hydrateQA(document);
      tabs(onTab);
      math(document.body);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
  }

  window.MR = { plot, math, highlightJSON,  MODULES, icon, esc, $, $$, highlight, codeBlock, hydrateCode, hydrateIcons, qa, qaItem, tabs, canvas, lineChart, rng, fmt, tensorGrid, copyText, toast, init };
})();
