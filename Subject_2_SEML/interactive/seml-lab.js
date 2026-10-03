/* ============================================================
   SEML Lab Kit — shared helpers for Software Engineering for ML labs
   (icons, JSON highlighting, cancellable animation runner, SVG packets,
   tabs, modals). Exposed as window.Lab.
   ============================================================ */
(function () {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';

  /* Lucide-style icon paths (24×24, stroke-based) */
  const ICONS = {
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    fileInput: '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M2 15h10M9 18l3-3-3-3"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    brain: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4M12 18V5"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    network: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    package: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12M3.29 7 12 12l8.71-5M7.5 4.27l9 5.15"/>',
    bell: '<path d="M10.27 21a2 2 0 0 0 3.46 0"/><path d="M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33"/>',
    clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 14l2 2 4-4"/>',
    fileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>',
    activity: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    chart: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    stepF: '<path d="M5 4l10 8-10 8z"/><path d="M19 5v14"/>',
    stepB: '<path d="M19 20 9 12l10-8z"/><path d="M5 19V5"/>',
    reset: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
    send: '<path d="M14.54 21.69a.5.5 0 0 0 .94-.03l6.5-19a.5.5 0 0 0-.64-.64l-19 6.5a.5.5 0 0 0-.03.94l7.93 3.18a2 2 0 0 1 1.11 1.11z"/><path d="m21.85 2.15-10.94 10.94"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="m2 12 8.58 3.91a2 2 0 0 0 1.66 0L21 12M2 17l8.58 3.91a2 2 0 0 0 1.66 0L21 17"/>',
    server: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
    git: '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>',
    eye: '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
    scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1ZM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    dollar: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    filter: '<path d="M10 20a1 1 0 0 0 .55.9l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .52-1.34L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.74 1.67l7.22 7.99A2 2 0 0 1 10 14z"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    bug: '<path d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3 3 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M17.2 17c2.1.1 3.8 1.9 3.8 4"/>',
    rotate: '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
    plus: '<path d="M5 12h14M12 5v14"/>',
    trash: '<path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    arrowLeft: '<path d="m12 19-7-7 7-7M19 12H5"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    sparkles: '<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/>',
  };

  function icon(name, cls) {
    return '<svg class="' + (cls || '') + '" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.info) + '</svg>';
  }

  // Raw path markup for embedding an icon inside an existing <svg> group.
  function iconPaths(name) { return ICONS[name] || ICONS.info; }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Syntax-highlighted JSON
  function json(obj) {
    const text = typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2);
    const re = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;
    let out = '';
    let last = 0;
    let m;
    while ((m = re.exec(text))) {
      out += esc(text.slice(last, m.index));
      if (m[1]) out += m[2] ? '<span class="j-key">' + esc(m[1]) + '</span>' + m[2] : '<span class="j-str">' + esc(m[1]) + '</span>';
      else if (m[3]) out += '<span class="j-bool">' + m[3] + '</span>';
      else out += '<span class="j-num">' + m[4] + '</span>';
      last = re.lastIndex;
    }
    return out + esc(text.slice(last));
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return [...(root || document).querySelectorAll(sel)]; }

  function svg(tag, attrs, parent) {
    const n = document.createElementNS(SVG_NS, tag);
    if (attrs) Object.keys(attrs).forEach((k) => n.setAttribute(k, attrs[k]));
    if (parent) parent.appendChild(n);
    return n;
  }

  function clock(baseMs) {
    const d = new Date(baseMs);
    const p = (n, w) => String(n).padStart(w || 2, '0');
    return p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds()) + '.' + p(d.getMilliseconds(), 3);
  }

  /* ----------------------------------------------------------
     Runner — cancellable, speed-aware waits for step animations.
     cancel() invalidates every pending wait (they reject with CANCELLED).
     ---------------------------------------------------------- */
  const CANCELLED = 'CANCELLED';

  function createRunner() {
    const r = {
      speed: 1,
      token: 0,
      paused: false,
      _resume: [],
      cancel() { r.token++; r.paused = false; r._resume.splice(0).forEach((f) => f()); },
      pause() { r.paused = true; },
      resume() { r.paused = false; r._resume.splice(0).forEach((f) => f()); },
      async gate(tok) {
        while (r.paused) await new Promise((res) => r._resume.push(res));
        if (tok !== r.token) throw CANCELLED;
      },
      wait(ms) {
        const tok = r.token;
        return new Promise((resolve, reject) => {
          let left = ms;
          let last = performance.now();
          const tick = (now) => {
            if (tok !== r.token) return reject(CANCELLED);
            if (!r.paused) left -= (now - last) * r.speed;
            last = now;
            if (left <= 0) resolve(); else requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
    };
    return r;
  }

  /* ----------------------------------------------------------
     Animate a labelled packet along an SVG path.
     opts: { label, color, duration, reverse, runner, layer, dashed }
     ---------------------------------------------------------- */
  function packet(path, opts) {
    const o = Object.assign({ label: '', color: '#5fb3f9', duration: 1100, reverse: false }, opts);
    const layer = o.layer || path.ownerSVGElement;
    const runner = o.runner;
    const tok = runner ? runner.token : 0;
    const g = svg('g', { class: 'packet', 'pointer-events': 'none' }, layer);
    svg('circle', { r: 9, fill: o.color, opacity: 0.22 }, g);
    svg('circle', { r: 5, fill: o.color }, g);
    let label = null;
    if (o.label) {
      label = svg('g', {}, g);
      const t = svg('text', { class: 'packet-label', x: 0, y: -14, 'text-anchor': 'middle', fill: '#fff' }, label);
      t.textContent = o.label;
      const w = Math.max(30, o.label.length * 6.8 + 14);
      const rect = svg('rect', { x: -w / 2, y: -27, width: w, height: 18, rx: 9, fill: '#0b0e17', stroke: o.color, 'stroke-width': 1.2 }, label);
      label.insertBefore(rect, t);
    }
    const len = path.getTotalLength();
    return new Promise((resolve, reject) => {
      let elapsed = 0;
      let last = performance.now();
      const step = (now) => {
        if (runner && tok !== runner.token) { g.remove(); return reject(CANCELLED); }
        if (!runner || !runner.paused) elapsed += (now - last) * (runner ? runner.speed : 1);
        last = now;
        const k = Math.min(1, elapsed / o.duration);
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const pt = path.getPointAtLength((o.reverse ? 1 - e : e) * len);
        g.setAttribute('transform', 'translate(' + pt.x + ',' + pt.y + ')');
        if (k < 1) requestAnimationFrame(step);
        else { setTimeout(() => g.remove(), 120); resolve(); }
      };
      requestAnimationFrame(step);
    });
  }

  /* ----------------------------------------------------------
     Tabs: <div class="tabs"><button class="tab" data-tab="x">…</button></div>
           <section class="tab-panel" data-panel="x">…</section>
     Selected tab is mirrored to location.hash (deep-linkable).
     ---------------------------------------------------------- */
  function tabs(onChange) {
    const btns = $$('.tab[data-tab]');
    const panels = $$('.tab-panel[data-panel]');
    function show(id, fromHash) {
      if (!btns.some((b) => b.dataset.tab === id)) id = btns[0].dataset.tab;
      btns.forEach((b) => { const on = b.dataset.tab === id; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
      panels.forEach((p) => { p.hidden = p.dataset.panel !== id; });
      if (!fromHash && location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
      if (onChange) onChange(id);
    }
    btns.forEach((b) => b.addEventListener('click', () => show(b.dataset.tab)));
    window.addEventListener('hashchange', () => show(location.hash.slice(1), true));
    show(location.hash.slice(1), true);
    return show;
  }

  function modal(title, html) {
    const back = document.createElement('div');
    back.className = 'modal-back';
    back.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-label="' + esc(title) + '">' +
      '<div class="card-head"><h3>' + esc(title) + '</h3><button class="btn btn-sm" data-close>' + icon('x') + 'Close</button></div>' +
      '<div class="card-pad">' + html + '</div></div>';
    const close = () => { back.remove(); document.removeEventListener('keydown', onKey); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    back.addEventListener('click', (e) => { if (e.target === back || e.target.closest('[data-close]')) close(); });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(back);
    back.querySelector('[data-close]').focus();
    return close;
  }

  // Render icons declared as <i data-icon="name"></i>
  function hydrateIcons(root) {
    $$('[data-icon]', root).forEach((n) => { n.outerHTML = icon(n.dataset.icon, n.className); });
  }

  // Back link opens the portfolio in the top window when the lab is embedded.
  document.addEventListener('DOMContentLoaded', () => {
    hydrateIcons(document);
    $$('.lab-back').forEach((a) => a.setAttribute('target', '_top'));
  });

  window.Lab = { icon, iconPaths, esc, json, $, $$, svg, clock, createRunner, CANCELLED, packet, tabs, modal, hydrateIcons };
})();
