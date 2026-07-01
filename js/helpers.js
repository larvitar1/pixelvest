"use strict";

/* ============================================================
   helpers.js — pure utility functions: maths, SVG, formatters
   ============================================================ */

/* ── Pseudo-random walk for chart data generation ── */
function walk(seed, n, drift) {
  let s = seed * 9301 + 49297, v = 50, out = [];
  for (let i = 0; i < n; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const r = (s / 0x7fffffff) - 0.5;
    v = Math.max(8, v + r * 9 + drift);
    out.push(v);
  }
  return out;
}

/* ── SVG line chart ── */
function chart(data, o) {
  o = o || {};
  const w = o.w || 600, h = o.h || 160, color = o.color || '#1f9d6b';
  const sw = o.sw || 2.4, pad = o.pad != null ? o.pad : 5;
  const min = Math.min(...data), max = Math.max(...data), rng = (max - min) || 1;
  const X = i => (i / (data.length - 1)) * w;
  const Y = v => pad + (1 - (v - min) / rng) * (h - pad * 2);
  let line = '';
  data.forEach((v, i) => { line += (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1) + ' '; });
  const area = 'M0 ' + h + ' ' + line.replace('M', 'L') + 'L' + w + ' ' + h + ' Z';
  const areaPath = o.fill !== false
    ? '<path d="' + area + '" fill="' + color + '" opacity="0.1"/>'
    : '';
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" style="width:100%;height:100%;display:block;overflow:visible">'
    + areaPath
    + '<path d="' + line.trim() + '" fill="none" stroke="' + color + '" stroke-width="' + sw
    + '" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>';
}

/* ── SVG volume bar chart ── */
function bars(data, color) {
  const w = 600, h = 60, max = Math.max(...data), bw = w / data.length;
  const rects = data.map((v, i) =>
    '<rect x="' + (i * bw + bw * 0.18) + '" y="' + (h - (v / max) * h) + '" width="' + (bw * 0.64)
    + '" height="' + ((v / max) * h) + '" fill="' + color + '" opacity="0.5"/>'
  ).join('');
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" style="width:100%;height:100%;display:block">'
    + rects + '</svg>';
}

/* ── Formatters ── */
const col    = p => p >= 0 ? 'var(--up)' : 'var(--down)';
const arr    = p => p >= 0 ? '▲' : '▼';
const pctStr = p => (p >= 0 ? '+' : '') + p.toFixed(2) + '%';
const money  = (n, d = 2) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const esc    = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ── Thai full date from ISO (e.g. "2026-06-27" → "27 มิถุนายน 2026") ── */
const TH_MONTH_FULL = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
function thaiFullDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return iso || '';
  return parseInt(m[3], 10) + ' ' + TH_MONTH_FULL[parseInt(m[2], 10) - 1] + ' ' + m[1];
}

/* ── เวลาอัปเดตราคาล่าสุด (จาก js/quotes.js) เป็น HH:MM — ว่างถ้าใช้ข้อมูล mock ── */
function quoteTime() {
  if (typeof QUOTES === 'undefined' || !QUOTES.updated) return '';
  return new Date(QUOTES.updated).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
}

/* ── Stock logo: img from Parqet CDN, falls back to coloured initial badge ── */
function stockLogoHtml(sym, size) {
  size = size || 32;
  const hue = sym.split('').reduce(function(h, c) { return h + c.charCodeAt(0) * 37; }, 0) % 360;
  return '<span style="display:inline-flex;align-items:center;justify-content:center;flex:none;width:' + size + 'px;height:' + size + 'px;">'
    + '<img src="https://assets.parqet.com/logos/symbol/' + esc(sym) + '?format=png" '
    + 'style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;object-fit:contain;background:#fff;border:1px solid var(--line);" '
    + 'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';" '
    + 'alt="' + esc(sym) + '">'
    + '<span style="display:none;width:' + size + 'px;height:' + size + 'px;border-radius:50%;'
    + 'background:hsl(' + hue + ',52%,40%);color:#fff;font-size:' + Math.round(size * 0.38) + 'px;'
    + 'font-weight:700;font-family:\'IBM Plex Mono\',monospace;align-items:center;justify-content:center;">'
    + esc(sym[0])
    + '</span>'
    + '</span>';
}

/* ── Data lookups ── */
const stockOf = sym => STOCKS.find(s => s.sym === sym) || STOCKS[0];
const artOf   = id  => ARTS.find(a => a.id === id) || ARTS[0];

/* บทความทั้งหมดที่อ้างถึงหุ้นตัวนี้ ใหม่สุดก่อน */
const artsForStock = sym =>
  ARTS.filter(a => (a.syms || []).includes(sym))
      .sort((a, b) => (b.iso || '').localeCompare(a.iso || '') || b.id - a.id);
/* ข่าวผลประกอบการล่าสุดของหุ้น (เขียนโดย Joy — cat: ผลประกอบการ) */
const earningsArt     = sym => artsForStock(sym).find(a => a.cat === 'ผลประกอบการ');
/* บทวิเคราะห์พื้นฐานล่าสุดของหุ้น (เขียนโดย Max — type: analysis) */
const fundamentalsArt = sym => artsForStock(sym).find(a => a.analysis || a.cat === 'บทวิเคราะห์');

/* ── ที่มาของบทความ (agent ผู้เรียบเรียง) ── */
const AGENTS = {
  joy:    { name: 'Joy',    role: 'ข่าวผลประกอบการ',    accent: 'var(--gold)' },
  max:    { name: 'Max',    role: 'บทวิเคราะห์พื้นฐาน', accent: 'var(--up)'   },
  hanako: { name: 'Hanako', role: 'ภาพรวมตลาด',         accent: 'var(--ink)'  },
  chen:   { name: 'Chen',   role: 'ข่าวเจาะเทรนด์',     accent: 'var(--ink-2)' },
};
/* คืนข้อมูล agent ของบทความ — ใช้ field agent ก่อน ถ้าไม่มีเดาจากหมวด */
function agentInfo(a) {
  let key = (a.agent || '').toLowerCase();
  if (!key) {
    if (a.cat === 'ผลประกอบการ') key = 'joy';
    else if (a.analysis || a.cat === 'บทวิเคราะห์') key = 'max';
    else if (a.cat === 'ภาพรวมตลาด') key = 'hanako';
  }
  return AGENTS[key] || null;
}

/* ── Decorate a stock object with display-ready fields ── */
function decStock(s, big) {
  const len   = big ? rangeLens[state.range] : 60;
  const color = s.pct >= 0 ? upHex : downHex;
  return {
    sym:      s.sym,
    name:     s.name,
    sector:   s.sector,
    price:    money(s.price),
    pct:      pctStr(s.pct),
    arrow:    arr(s.pct),
    color:    col(s.pct),
    chgAbs:   money(Math.abs(s.price * s.pct / 100)),
    spark:    chart(walk(s.sd, 22, s.pct >= 0 ? 0.4 : -0.4), { w: 120, h: 36,  color, sw: 1.7 }),
    chart:    chart(walk(s.sd, 30, s.pct >= 0 ? 0.4 : -0.4), { w: 200, h: 44,  color, sw: 2   }),
    bigChart: chart(walk(s.sd, len, s.pct >= 0 ? 0.35 : -0.35), { w: 600, h: 280, color, sw: 2.6 }),
    volChart: bars(walk(s.sd + 3, len, 0), color),
  };
}

/* ── Decorate an article object with display-ready fields ── */
function decArt(a) {
  return {
    id: a.id, cat: a.cat, title: a.title, excerpt: a.excerpt,
    author: a.author, date: a.date, read: a.read,
    initial: (a.author || 'P')[0],
    rank: a.rank,
    tags: a.tags || [a.cat],
    image: a.image,
  };
}
