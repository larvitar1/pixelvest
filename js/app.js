"use strict";

/* ============================================================
   app.js — navigation, rendering, event wiring, boot
   ============================================================ */

const app = document.getElementById('app');

/* ── นำราคาจริงจาก js/quotes.js (ถ้ามี) มาทับค่า mock ใน STOCKS/INDICES ── */
function applyQuotes() {
  if (typeof QUOTES === 'undefined') return;
  STOCKS.forEach(s => {
    const q = QUOTES.stocks && QUOTES.stocks[s.sym];
    if (q) { if (q.price != null) s.price = q.price; if (q.pct != null) s.pct = q.pct; }
  });
  INDICES.forEach(ix => {
    const q = QUOTES.indices && QUOTES.indices[ix.name];
    if (q) { if (q.value != null) ix.value = q.value; if (q.chg != null) ix.chg = q.chg; }
  });
}

/* ── Apply the active theme's CSS variables to #app ── */
function applyTheme() {
  const t = themes[settings.theme] || themes.warm;
  for (const k in t) app.style.setProperty(k, t[k]);
  app.style.setProperty('--fs', String(settings.fontScale));
}

/* ── Sidebar collapse / mobile open-close ── */
function pvToggleSidebar() {
  const sb = document.getElementById('pv-sidebar');
  if (!sb) return;
  const collapsed = sb.classList.toggle('pv-collapsed');
  const btn = sb.querySelector('[data-sidebar-toggle]');
  if (btn) btn.textContent = collapsed ? '»' : '«';
  try { localStorage.setItem('pv-sb-collapsed', collapsed ? '1' : '0'); } catch(e) {}
}
function pvOpenSidebar() {
  const sb = document.getElementById('pv-sidebar');
  const ov = app.querySelector('.pv-sb-overlay');
  if (sb) sb.classList.add('pv-open');
  if (ov) ov.classList.add('active');
}
function pvCloseSidebar() {
  const sb = document.getElementById('pv-sidebar');
  const ov = app.querySelector('.pv-sb-overlay');
  if (sb) sb.classList.remove('pv-open');
  if (ov) ov.classList.remove('active');
}
function restoreSidebarState() {
  try {
    if (localStorage.getItem('pv-sb-collapsed') === '1') {
      const sb = document.getElementById('pv-sidebar');
      const btn = sb && sb.querySelector('[data-sidebar-toggle]');
      if (sb) sb.classList.add('pv-collapsed');
      if (btn) btn.textContent = '»';
    }
  } catch(e) {}
}

/* ── Re-render the whole app shell ── */
function render() {
  let main = '';
  if      (state.route.page === 'home')    main = homeView();
  else if (state.route.page === 'news')    main = newsView();
  else if (state.route.page === 'article') main = articleView(state.route.id);
  else if (state.route.page === 'stock')   main = stockView(state.route.id);
  else if (state.route.page === 'team')    main = teamView();
  app.innerHTML = '<div class="pv-layout">'
    + sidebarView()
    + '<div class="pv-main-area">'
    +   mobileTopBarView()
    +   tickerView()
    +   main
    +   footerView()
    + '</div>'
    + '<div class="pv-sb-overlay" data-sidebar-close></div>'
    + '</div>';
  applyTheme();
  restoreSidebarState();
}

/* ── Navigate to a new page ── */
function go(page, id) {
  state.history = [...state.history, state.route];
  state.route   = { page, id };
  window.scrollTo({ top: 0 });
  render();
}

/* ── Navigate back one step ── */
function back() {
  if (!state.history.length) { state.route = { page: 'home' }; }
  else { const h = [...state.history]; state.route = h.pop(); state.history = h; }
  window.scrollTo({ top: 0 });
  render();
}

/* ── Delegated click handler for in-app navigation ── */
app.addEventListener('click', e => {
  const tog = e.target.closest('[data-sidebar-toggle]');
  if (tog) { pvToggleSidebar(); return; }
  const mob = e.target.closest('[data-mobile-menu]');
  if (mob) { pvOpenSidebar(); return; }
  const cls = e.target.closest('[data-sidebar-close]');
  if (cls) { pvCloseSidebar(); return; }
  // เปลี่ยนช่วงเวลากราฟ — render ใหม่โดยไม่เปลี่ยนหน้า/ไม่เพิ่ม history
  const r = e.target.closest('[data-range]');
  if (r) { state.range = r.getAttribute('data-range'); render(); return; }
  const st = e.target.closest('[data-stock]');
  if (st) { go('stock', st.getAttribute('data-stock')); return; }
  const a = e.target.closest('[data-article]');
  if (a) { go('article', parseInt(a.getAttribute('data-article'), 10)); return; }
  const b = e.target.closest('[data-back]');
  if (b) { back(); return; }
  const g = e.target.closest('[data-go]');
  if (g) { go(g.getAttribute('data-go')); return; }
});

/* prevent form-field clicks from bubbling into nav cards */
app.addEventListener('click', e => { if (e.target.closest('input,button')) e.stopPropagation(); }, true);

/* ── Settings widget wiring ── */
const gear  = document.getElementById('pv-gear');
const panel = document.getElementById('pv-panel');

gear.addEventListener('click', () => panel.classList.toggle('open'));
document.addEventListener('click', e => {
  if (!e.target.closest('#pv-settings')) panel.classList.remove('open');
});

function syncSwatches() {
  document.querySelectorAll('.pv-swatch').forEach(el =>
    el.classList.toggle('active', el.getAttribute('data-theme') === settings.theme));
}

document.querySelectorAll('.pv-swatch').forEach(el => el.addEventListener('click', () => {
  settings.theme = el.getAttribute('data-theme');
  syncSwatches();
  applyTheme();
}));

document.getElementById('pv-fs').addEventListener('input', e => {
  settings.fontScale = parseFloat(e.target.value);
  applyTheme();
});

document.getElementById('pv-ticker').addEventListener('change', e => {
  settings.showTicker = e.target.checked;
  render();
});

/* ── Boot ── */
applyQuotes();
syncSwatches();
render();
