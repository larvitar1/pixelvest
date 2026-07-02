"use strict";

/* ============================================================
   views.js — HTML-string rendering functions for each page/section
   ============================================================ */

/* ── Brand logo SVG ── */
function logoSvg(size) {
  const rad = size >= 40 ? 10 : 8;
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 48 48" aria-label="PixelVest" '
    + 'style="display:block;flex:none;width:' + size + 'px;height:' + size + 'px;border-radius:' + rad + 'px;box-shadow:0 2px 8px -2px rgba(0,0,0,.4)">'
    + '<rect width="48" height="48" rx="12" fill="#1f8a5b"/>'
    + '<circle cx="14.5" cy="32" r="4.4" fill="#fff"/>'
    + '<polyline points="11,33 21,21 28,27 37,14" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<polyline points="30,14 37,14 37,21" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

/* ── Left sidebar navigation ── */
function sidebarView() {
  const navDef = [
    { label: 'หน้าแรก', page: 'home',
      icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
    { label: 'ข่าวหุ้น', page: 'news',
      icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' },
    { label: 'ทีมงาน', page: 'team',
      icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
  ];
  const items = navDef.map(n => {
    const active = n.page === state.route.page;
    return '<div data-go="' + n.page + '" class="pv-nav-item' + (active ? ' pv-active' : '') + '">'
      + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:none;">' + n.icon + '</svg>'
      + '<span class="pv-nav-lbl">' + n.label + '</span>'
      + '</div>';
  }).join('');
  return '<aside id="pv-sidebar">'
    + '<div class="pv-sb-head">'
    +   '<div data-go="home" style="display:flex;align-items:center;gap:10px;cursor:pointer;flex:1;min-width:0;">'
    +     logoSvg(32)
    +     '<div class="pv-sb-brand">'
    +       '<div style="font-weight:700;font-size:17px;line-height:1.1;">Pixel<span style="color:var(--gold);">Vest</span></div>'
    +       '<div style="font-size:9px;letter-spacing:.16em;color:var(--ink-3);font-weight:600;margin-top:3px;">STOCK NEWS</div>'
    +     '</div>'
    +   '</div>'
    +   '<div class="pv-sb-toggle" data-sidebar-toggle title="ย่อ/ขยาย">«</div>'
    + '</div>'
    + '<div class="pv-sb-label">PAGES</div>'
    + '<nav>' + items + '</nav>'
    + '</aside>';
}

/* ── Mobile top bar (hamburger + logo, hidden on desktop) ── */
function mobileTopBarView() {
  return '<div class="pv-mobile-bar">'
    + '<div class="pv-hamburger" data-mobile-menu>'
    +   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>'
    + '</div>'
    + '<div data-go="home" style="display:flex;align-items:center;gap:9px;cursor:pointer;">'
    +   logoSvg(26)
    +   '<span style="font-weight:700;font-size:16px;">Pixel<span style="color:var(--gold);">Vest</span></span>'
    + '</div>'
    + '</div>';
}

/* ── Scrolling stock ticker bar below header ── */
function tickerView() {
  if (!settings.showTicker) return '';
  const indices = INDICES.map(ix =>
    '<div style="display:flex;flex-direction:column;gap:2px;">'
    + '<div style="font-size:11px;font-weight:700;letter-spacing:.04em;color:var(--ink-2);">' + ix.name + '</div>'
    + '<div style="display:flex;align-items:baseline;gap:7px;">'
    +   '<span style="font-size:15px;font-weight:700;font-variant-numeric:tabular-nums;">' + money(ix.value) + '</span>'
    +   '<span style="font-size:12px;font-weight:600;color:' + col(ix.chg) + ';font-variant-numeric:tabular-nums;">' + (ix.chg >= 0 ? '+' : '') + ix.chg.toFixed(2) + '</span>'
    + '</div></div>'
  ).join('');
  const tickRaw = STOCKS.map(s =>
    '<div style="display:flex;align-items:center;gap:8px;font-size:13px;white-space:nowrap;">'
    + '<span style="font-weight:700;">' + s.sym + '</span>'
    + '<span style="color:var(--ink-2);font-variant-numeric:tabular-nums;">' + money(s.price) + '</span>'
    + '<span style="font-weight:600;color:' + col(s.pct) + ';font-variant-numeric:tabular-nums;">' + arr(s.pct) + pctStr(s.pct) + '</span>'
    + '</div>'
  );
  const tickerItems = tickRaw.concat(tickRaw).join('');
  return '<div style="background:var(--surface);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:30;">'
    + '<div data-pad style="max-width:1200px;margin:0 auto;padding:12px 28px;display:flex;align-items:center;gap:22px;">'
    +   '<div data-hidesm style="display:flex;gap:18px;flex:none;">' + indices + '</div>'
    +   '<div style="flex:1;min-width:0;border-left:1px solid var(--line);padding-left:20px;overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 4%,#000 92%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 4%,#000 92%,transparent);">'
    +     '<div style="display:flex;gap:30px;width:max-content;animation:tickerflow 46s linear infinite;">' + tickerItems + '</div>'
    +   '</div>'
    + '</div></div>';
}

/* ── Home page: hero article + watchlist + news feed + sidebar ── */
function homeView() {
  const f        = decArt([...ARTS].filter(a => a.featured).sort((a, b) => (b.iso || '').localeCompare(a.iso || '') || b.id - a.id)[0] || ARTS[0]);
  const HIDE_WATCH = ['AAPL', 'MSFT'];  // หุ้นที่ไม่ต้องการในวิดเจ็ต "หุ้นที่ติดตาม"
  const watchlist = STOCKS.filter(s => !HIDE_WATCH.includes(s.sym)).slice(0, 6).map(s => decStock(s));
  const feed     = ARTS.filter(a => !a.analysis).map(a => decArt(a));
  const popular  = [...ARTS].sort((a, b) => a.rank - b.rank).slice(0, 5).map(a => decArt(a));

  const watchHtml = watchlist.map(w =>
    '<div data-link data-stock="' + w.sym + '" style="cursor:pointer;display:flex;align-items:center;gap:10px;padding:10px 4px;border-bottom:1px solid var(--line);">'
    + stockLogoHtml(w.sym, 32)
    + '<div style="min-width:52px;">'
    +   '<div style="font-weight:700;font-size:14px;">' + w.sym + '</div>'
    +   '<div style="font-size:11px;color:var(--ink-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:52px;">' + esc(w.name) + '</div>'
    + '</div>'
    + '<div style="width:68px;height:30px;flex:none;">' + w.spark + '</div>'
    + '<div style="flex:1;text-align:right;">'
    +   '<div style="font-weight:700;font-size:14px;font-variant-numeric:tabular-nums;">' + w.price + '</div>'
    +   '<div style="font-size:11.5px;font-weight:600;color:' + w.color + ';font-variant-numeric:tabular-nums;">' + w.arrow + w.pct + '</div>'
    + '</div></div>'
  ).join('');

  const feedHtml = feed.map(a =>
    '<article data-card data-link data-article="' + a.id + '" style="cursor:pointer;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);display:flex;flex-direction:column;">'
    + (a.image ? '<div style="height:164px;background:url(\'' + esc(a.image) + '\') center/cover no-repeat;position:relative;"><span style="position:absolute;top:11px;left:11px;background:var(--gold);color:#fff;font-size:10px;font-weight:700;letter-spacing:.07em;padding:4px 10px;border-radius:20px;">' + a.cat + '</span></div>' : '')
    + (a.image ? '' : '<div style="padding:14px 16px 0;"><span style="background:var(--gold);color:#fff;font-size:10px;font-weight:700;letter-spacing:.07em;padding:4px 10px;border-radius:20px;">' + a.cat + '</span></div>')
    + '<div style="padding:15px 16px 16px;display:flex;flex-direction:column;flex:1;">'
    +   '<h3 style="font-family:var(--head);font-size:18px;font-weight:700;line-height:1.36;margin:0 0 9px;letter-spacing:-.01em;">' + esc(a.title) + '</h3>'
    +   '<p style="margin:0 0 14px;font-size:13.5px;color:var(--ink-2);line-height:1.6;">' + esc(a.excerpt) + '</p>'
    +   '<div style="margin-top:auto;display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ink-3);">'
    +     '<span style="font-weight:600;color:var(--ink-2);">' + a.author + '</span><span>·</span><span>' + a.date + '</span>'
    +   '</div>'
    + '</div></article>'
  ).join('');

  const popularHtml = popular.map(p =>
    '<div data-link data-article="' + p.id + '" style="cursor:pointer;display:flex;gap:13px;padding:11px 0;border-top:1px solid var(--line);">'
    + '<span style="font-family:var(--head);font-size:22px;font-weight:700;color:var(--gold);line-height:1;min-width:24px;">' + p.rank + '</span>'
    + '<div style="font-size:13.5px;font-weight:600;line-height:1.42;">' + esc(p.title) + '</div>'
    + '</div>'
  ).join('');

  return '<main data-pad style="max-width:1200px;margin:0 auto;padding:34px 28px 10px;">'
    + '<div data-herogrid style="display:grid;grid-template-columns:1.55fr 1fr;gap:26px;margin-bottom:46px;">'
    +   '<article data-card data-link data-article="' + f.id + '" style="cursor:pointer;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);">'
    +     '<div style="position:relative;height:340px;' + (f.image ? 'background:url(\'' + esc(f.image) + '\') center/cover no-repeat;' : 'background:repeating-linear-gradient(135deg,var(--surface-2),var(--surface-2) 11px,transparent 11px,transparent 22px),var(--surface);') + '">'
    +       '<div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(20,12,2,.55) 100%);pointer-events:none;"></div>'
    +       '<div style="position:absolute;top:16px;left:16px;background:var(--gold);color:#fff;font-size:10.5px;font-weight:700;letter-spacing:.08em;padding:5px 13px;border-radius:20px;">' + f.cat + '</div>'
    +       (f.image ? '' : '<span style="position:absolute;bottom:16px;left:16px;font-family:\'IBM Plex Mono\',monospace;font-size:11px;color:var(--ink-3);background:color-mix(in srgb,var(--surface) 80%,transparent);padding:3px 8px;border-radius:5px;">ภาพประกอบข่าวเด่น</span>')
    +     '</div>'
    +     '<div style="padding:26px 28px 28px;">'
    +       '<h1 style="font-family:var(--head);font-weight:800;font-size:34px;line-height:1.24;margin:0 0 13px;letter-spacing:-.02em;">' + esc(f.title) + '</h1>'
    +       '<p style="margin:0 0 18px;color:var(--ink-2);font-size:15.5px;line-height:1.65;">' + esc(f.excerpt) + '</p>'
    +       '<div style="display:flex;align-items:center;gap:11px;font-size:13px;color:var(--ink-3);">'
    +         '<span style="width:30px;height:30px;border-radius:50%;background:var(--ink);color:var(--paper);display:grid;place-items:center;font-weight:700;font-size:13px;">' + f.initial + '</span>'
    +         '<span style="font-weight:600;color:var(--ink-2);">' + f.author + '</span>'
    +         '<span>·</span><span>' + f.date + '</span><span>·</span><span>อ่าน ' + f.read + ' นาที</span>'
    +       '</div>'
    +     '</div>'
    +   '</article>'
    +   '<aside style="background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:18px 18px 8px;align-self:start;">'
    +     '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">'
    +       '<h2 style="font-size:15px;font-weight:800;margin:0;letter-spacing:-.01em;">หุ้นที่ติดตาม</h2>'
    +       '<span style="font-size:11px;color:var(--ink-3);font-weight:600;">' + (quoteTime() ? 'อัปเดต ' + quoteTime() + ' น.' : 'ข้อมูลตัวอย่าง') + '</span>'
    +     '</div>' + watchHtml + '<div style="height:8px;"></div>'
    +   '</aside>'
    + '</div>'
    + '<div data-main style="display:flex;gap:34px;align-items:flex-start;">'
    +   '<div style="flex:1;min-width:0;">'
    +     '<div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;">'
    +       '<h2 style="font-family:var(--head);font-size:23px;font-weight:700;margin:0;">ข่าวล่าสุด</h2>'
    +       '<div style="flex:1;height:1px;background:var(--line);"></div>'
    +     '</div>'
    +     '<div data-herogrid style="display:grid;grid-template-columns:1fr 1fr;gap:22px;">' + feedHtml + '</div>'
    +   '</div>'
    +   '<aside data-side style="width:300px;flex:none;position:sticky;top:96px;display:flex;flex-direction:column;gap:22px;">'
    +     '<div style="background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:18px;">'
    +       '<h3 style="font-size:14px;font-weight:700;margin:0 0 14px;display:flex;align-items:center;gap:8px;"><span style="width:7px;height:7px;border-radius:2px;background:var(--gold);"></span>เรื่องยอดนิยม</h3>'
    +       popularHtml
    +     '</div>'
    +     '<div style="background:var(--ink);color:var(--paper);border-radius:var(--radius);padding:22px;">'
    +       '<div style="font-family:var(--head);font-size:18px;font-weight:600;line-height:1.4;margin-bottom:8px;">รับสรุปข่าวหุ้น<br>ทุกเช้า 7 โมง</div>'
    +       '<p style="margin:0 0 14px;font-size:13px;opacity:.75;line-height:1.6;">อัปเดตโดยทีมงาน คัดเฉพาะข่าวที่กระทบพอร์ตคุณ</p>'
    +       '<div style="display:flex;gap:8px;">'
    +         '<input placeholder="อีเมลของคุณ" style="flex:1;min-width:0;border:none;border-radius:9px;padding:10px 12px;font-family:inherit;font-size:13px;outline:none;">'
    +         '<button style="border:none;background:var(--gold);color:#fff;font-family:inherit;font-weight:700;font-size:13px;padding:0 15px;border-radius:9px;cursor:pointer;">สมัคร</button>'
    +       '</div>'
    +     '</div>'
    +   '</aside>'
    + '</div></main>';
}

/* ── News list page: chronological timeline of all articles ── */
function newsView() {
  const arts = [...ARTS].sort((a, b) => (b.iso || '').localeCompare(a.iso || '') || b.id - a.id);
  const groups = [];
  arts.forEach(a => {
    const iso = a.iso;
    let g = groups.find(x => x.iso === iso);
    if (!g) { g = { iso, thaiDate: thaiFullDate(iso), count: 0, items: [] }; groups.push(g); }
    g.count++;
    g.items.push({ id: a.id, title: a.title, excerpt: a.excerpt, cat: a.cat, badges: a.syms.slice(0, 3).map(s => '$' + s), dateLabel: a.date, read: a.read });
  });

  const groupsHtml = groups.map(g => {
    const items = g.items.map(n => {
      const sym0 = n.badges.length > 0 ? n.badges[0].replace('$', '') : null;
      const logoCol = sym0
        ? '<div style="display:flex;flex-direction:column;align-items:center;gap:5px;flex:none;width:56px;">'
          + stockLogoHtml(sym0, 40)
          + '<span style="font-family:\'IBM Plex Mono\',monospace;font-size:10px;font-weight:700;color:var(--ink-2);">$' + esc(sym0) + '</span>'
          + (n.badges.length > 1 ? '<span style="font-size:10px;font-weight:600;color:var(--ink-3);">+' + (n.badges.length - 1) + '</span>' : '')
          + '</div>'
        : '<div style="display:flex;flex-direction:column;align-items:center;gap:5px;flex:none;width:56px;">'
          + '<span style="width:40px;height:40px;border-radius:50%;background:var(--surface-2);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;">'
          + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M2 15h10"/></svg>'
          + '</span>'
          + '<span style="font-family:\'IBM Plex Mono\',monospace;font-size:9px;font-weight:700;color:var(--ink-3);">NEWS</span>'
          + '</div>';
      return '<div data-card data-article="' + n.id + '" style="cursor:pointer;display:flex;gap:18px;align-items:flex-start;background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:18px 22px;box-shadow:var(--shadow);">'
        + logoCol
        + '<div style="flex:1;min-width:0;">'
        +   '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:11px;color:var(--ink-3);margin-bottom:7px;">' + n.dateLabel + ' · ' + n.cat + ' · อ่าน ' + n.read + ' นาที</div>'
        +   '<div style="font-size:16.5px;line-height:1.6;"><strong style="font-weight:700;color:var(--ink);">' + esc(n.title) + '</strong> <span style="color:var(--ink-2);">— ' + esc(n.excerpt) + '</span></div>'
        + '</div></div>';
    }).join('');
    return '<div style="position:relative;padding-left:38px;margin-bottom:34px;">'
      + '<span style="position:absolute;left:0;top:7px;width:14px;height:14px;border-radius:50%;background:var(--gold);border:3px solid var(--paper);box-sizing:border-box;"></span>'
      + '<h2 style="font-family:var(--head);font-size:27px;font-weight:700;margin:0;letter-spacing:-.01em;">' + g.thaiDate + '</h2>'
      + '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:var(--ink-3);margin:5px 0 18px;">' + g.iso + ' · ' + g.count + ' ข่าว</div>'
      + '<div style="display:flex;flex-direction:column;gap:16px;">' + items + '</div>'
      + '</div>';
  }).join('');

  const backLink = state.history.length > 0
    ? '<div data-link data-back style="cursor:pointer;display:inline-flex;align-items:center;gap:7px;font-size:13.5px;font-weight:600;color:var(--ink-2);margin-bottom:18px;">← ย้อนกลับ</div>'
    : '';

  return '<main data-pad style="max-width:880px;margin:0 auto;padding:46px 28px 10px;">'
    + backLink
    + '<h1 style="font-family:var(--head);font-size:46px;font-weight:700;margin:0;letter-spacing:-.02em;">ข่าวหุ้นล่าสุด</h1>'
    + '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:13px;color:var(--ink-3);margin-top:12px;">อัปเดตล่าสุด: ' + (arts.length ? thaiFullDate(arts[0].iso) + ', 16:30' : '-') + ' · ทั้งหมด ' + arts.length + ' ข่าว</div>'
    + '<div style="position:relative;margin-top:38px;">'
    +   '<div style="position:absolute;left:6px;top:12px;bottom:24px;width:2px;background:var(--line);"></div>'
    +   groupsHtml
    + '</div></main>';
}

/* ── Single article page ── */
function articleView(id) {
  const a = artOf(id);
  const ag = agentInfo(a);
  const blocks = [];
  blocks.push({ isP: true, text: a.body.intro });
  const midStock = stockOf(a.syms[0]);
  a.body.sections.forEach((sec, i) => {
    blocks.push({ isH: true, text: sec.h });
    blocks.push({ isP: true, text: sec.p });
    if (i === 0) {
      const d = decStock(midStock);
      blocks.push({ isStock: true, sym: d.sym, name: d.name, price: d.price, pct: d.pct, arrow: d.arrow, color: d.color, chart: d.chart });
    }
  });
  blocks.push({ isQuote: true, text: a.body.quote, by: a.body.quoteBy });
  blocks.push({ isP: true, text: a.body.takeaway });
  if (a.body.sources && a.body.sources.length)
    blocks.push({ isSources: true, items: a.body.sources });

  const blocksHtml = blocks.map(b => {
    let inner = '';
    if (b.isH)
      inner = '<h2 style="font-family:var(--head);font-size:24px;font-weight:600;line-height:1.35;margin:34px 0 4px;color:var(--ink);">' + esc(b.text) + '</h2>';
    else if (b.isP)
      inner = '<p style="margin:0;">' + esc(b.text) + '</p>';
    else if (b.isQuote)
      inner = '<blockquote style="margin:6px 0;padding:6px 0 6px 22px;border-left:4px solid var(--gold);font-family:var(--head);font-size:22px;font-weight:500;line-height:1.5;color:var(--ink);">'
        + esc(b.text)
        + '<div style="font-family:\'IBM Plex Sans Thai\';font-size:13px;font-weight:600;color:var(--ink-3);margin-top:10px;">' + b.by + '</div></blockquote>';
    else if (b.isSources) {
      const list = b.items.map(s => {
        const label = esc(s.text);
        return '<li style="margin:4px 0;">'
          + (s.url ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener" style="color:var(--ink-2);text-decoration:underline;text-underline-offset:3px;">' + label + '</a>' : label)
          + '</li>';
      }).join('');
      inner = '<div style="margin-top:32px;padding-top:18px;border-top:1px solid var(--line);">'
        + '<div style="font-size:12px;font-weight:700;letter-spacing:.06em;color:var(--ink-3);margin-bottom:10px;">แหล่งอ้างอิง</div>'
        + '<ul style="margin:0;padding:0 0 0 18px;font-size:13px;line-height:1.7;color:var(--ink-2);">' + list + '</ul>'
        + '</div>';
    }
    else if (b.isStock)
      inner = '<div style="display:flex;align-items:center;gap:16px;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:16px 18px;box-shadow:var(--shadow);">'
        + '<div><div style="font-weight:700;font-size:18px;">' + b.sym + '</div><div style="font-size:12.5px;color:var(--ink-3);">' + esc(b.name) + '</div></div>'
        + '<div style="flex:1;height:44px;">' + b.chart + '</div>'
        + '<div style="text-align:right;"><div style="font-weight:700;font-size:17px;font-variant-numeric:tabular-nums;">' + b.price + '</div><div style="font-size:13px;font-weight:600;color:' + b.color + ';">' + b.arrow + b.pct + '</div></div>'
        + '</div>';
    return '<div style="margin:0 0 22px;">' + inner + '</div>';
  }).join('');

  const relStocks = a.syms.map(sym => {
    const s = stockOf(sym);
    return '<span data-link data-stock="' + sym + '" style="cursor:pointer;display:inline-flex;align-items:center;gap:9px;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:9px 14px;font-size:13.5px;font-weight:600;">' + sym
      + '<span style="color:' + col(s.pct) + ';font-weight:600;font-variant-numeric:tabular-nums;">' + arr(s.pct) + pctStr(s.pct) + '</span></span>';
  }).join('');

  const related = ARTS.filter(x => x.id !== a.id).slice(0, 3).map(x => {
    const d = decArt(x);
    return '<article data-card data-link data-article="' + d.id + '" style="cursor:pointer;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;">'
      + '<div style="height:120px;' + (d.image ? 'background:url(\'' + esc(d.image) + '\') center/cover no-repeat;' : 'background:repeating-linear-gradient(135deg,var(--surface-2),var(--surface-2) 10px,transparent 10px,transparent 20px),var(--surface);') + '"></div>'
      + '<div style="padding:15px 16px 18px;"><div style="font-size:11px;font-weight:700;color:var(--gold);margin-bottom:8px;">' + d.cat + '</div><h3 style="font-family:var(--head);font-size:16px;font-weight:600;line-height:1.4;margin:0;">' + esc(d.title) + '</h3></div>'
      + '</article>';
  }).join('');

  return '<main data-pad style="max-width:760px;margin:0 auto;padding:30px 28px 10px;">'
    + '<div data-link data-back style="cursor:pointer;display:inline-flex;align-items:center;gap:7px;font-size:13.5px;font-weight:600;color:var(--ink-2);margin-bottom:22px;">← ย้อนกลับ</div>'
    + '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px;">'
    +   '<span style="font-size:12px;font-weight:700;letter-spacing:.05em;color:var(--gold);">' + a.cat + '</span>'
    +   (ag ? '<span style="display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:600;color:var(--ink-2);background:var(--surface-2);padding:5px 12px;border-radius:8px;">'
    +     '<span style="width:8px;height:8px;border-radius:50%;background:' + ag.accent + ';"></span>'
    +     'เรียบเรียงโดย ' + ag.name + ' · ' + ag.role + '</span>' : '')
    + '</div>'
    + '<h1 style="font-family:var(--head);font-weight:700;font-size:35px;line-height:1.26;margin:0 0 16px;letter-spacing:-.01em;">' + esc(a.title) + '</h1>'
    + '<p style="font-size:18px;color:var(--ink-2);line-height:1.6;margin:0 0 22px;">' + esc(a.excerpt) + '</p>'
    + '<div style="display:flex;align-items:center;gap:11px;padding:16px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);font-size:13.5px;color:var(--ink-3);">'
    +   '<span style="width:38px;height:38px;border-radius:50%;background:var(--ink);color:var(--paper);display:grid;place-items:center;font-weight:700;font-size:15px;">' + (a.author || 'P')[0] + '</span>'
    +   '<div style="flex:1;"><div style="font-weight:700;color:var(--ink);font-size:14px;">' + a.author + '</div><div>' + a.date + ' · อ่าน ' + a.read + ' นาที</div></div>'
    +   '<span style="font-size:12px;font-weight:600;color:var(--ink-2);border:1px solid var(--line);padding:7px 13px;border-radius:9px;cursor:pointer;">↗ แชร์</span>'
    + '</div>'
    + ((a.body.stats && a.body.stats.length)
        ? '<div style="margin:26px 0;">'
          + '<div style="display:flex;align-items:center;gap:8px;font-size:12px;font-weight:700;letter-spacing:.05em;color:var(--ink-3);margin-bottom:10px;">'
          +   'ตัวเลขสำคัญ' + (ag ? '<span style="display:inline-flex;align-items:center;gap:6px;font-weight:600;letter-spacing:normal;"><span style="width:7px;height:7px;border-radius:50%;background:' + ag.accent + ';"></span>ข้อมูลโดย ' + ag.name + '</span>' : '')
          + '</div>'
          + statGrid(a.body.stats)
          + '</div>'
        : '')
    + (a.image
        ? '<div style="margin:26px 0;border-radius:var(--radius);overflow:hidden;border:1px solid var(--line);"><img src="' + esc(a.image) + '" alt="' + esc(a.title) + '" style="width:100%;height:330px;object-fit:cover;display:block;"></div>'
        : a.agent === 'hanako' && a.cat === 'ภาพรวมตลาด'
            ? '<div style="height:330px;margin:26px 0;border-radius:var(--radius);background:repeating-linear-gradient(135deg,var(--surface-2),var(--surface-2) 12px,transparent 12px,transparent 24px),var(--surface);border:1px solid var(--line);display:grid;place-items:center;">'
            +   '<span style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:var(--ink-3);">ภาพประกอบบทความ · 1600×900</span>'
            + '</div>'
            : '')
    + '<div style="font-size:17.5px;line-height:1.85;color:#3a342d;">' + blocksHtml + '</div>'
    + '<div style="margin:30px 0;padding-top:22px;border-top:1px solid var(--line);">'
    +   '<div style="font-size:13px;font-weight:700;color:var(--ink-2);margin-bottom:12px;">หุ้นที่เกี่ยวข้อง</div>'
    +   '<div style="display:flex;gap:10px;flex-wrap:wrap;">' + relStocks + '</div>'
    + '</div></main>'
    + '<div data-pad style="max-width:1200px;margin:18px auto 0;padding:30px 28px 0;border-top:1px solid var(--line);">'
    +   '<h2 style="font-family:var(--head);font-size:21px;font-weight:700;margin:0 0 18px;">อ่านต่อ</h2>'
    +   '<div data-herogrid style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:22px;">' + related + '</div>'
    + '</div>';
}

/* ── Reusable stat grid (key numbers below the chart) ── */
function statGrid(stats) {
  const cells = stats.map(st => {
    const chg = (st.change || '').trim();
    const chgColor = chg.startsWith('-') || chg.startsWith('▼') ? 'var(--down)' : 'var(--up)';
    return '<div style="background:var(--surface);padding:13px 15px;">'
      + '<div style="font-size:11.5px;color:var(--ink-3);margin-bottom:5px;">' + esc(st.label) + '</div>'
      + '<div style="font-weight:700;font-size:16px;font-variant-numeric:tabular-nums;line-height:1.2;">' + esc(st.value)
      + (chg ? ' <span style="font-size:12px;font-weight:600;color:' + chgColor + ';">' + esc(chg) + '</span>' : '')
      + '</div></div>';
  }).join('');
  return '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:12px;overflow:hidden;">' + cells + '</div>';
}

/* ── Single stock page: price chart + range selector + Joy/Max data ── */
function stockView(sym) {
  const s = stockOf(sym);
  const d = decStock(s, true);
  const ranges = ['1D', '1W', '1M', '3M', '1Y'];

  const rangeBtns = ranges.map(r => {
    const on = r === state.range;
    return '<div data-range="' + r + '" style="cursor:pointer;user-select:none;padding:7px 15px;border-radius:9px;font-size:13px;font-weight:600;'
      + 'color:' + (on ? 'var(--paper)' : 'var(--ink-2)') + ';background:' + (on ? 'var(--ink)' : 'var(--surface-2)') + ';">' + r + '</div>';
  }).join('');

  // ข้อมูลหุ้นพื้นฐาน (มีเสมอจาก STOCKS)
  const baseStats = statGrid([
    { label: 'ราคาล่าสุด', value: d.price },
    { label: 'เปลี่ยนแปลงวันนี้', value: d.arrow + ' ' + d.chgAbs, change: d.arrow + d.pct },
    { label: 'ตลาด', value: s.exchange },
    { label: 'กลุ่มอุตสาหกรรม', value: s.sector },
  ]);

  // panel สรุปบทความจาก agent (Joy / Max) — พร้อม key stats ถ้ามี
  const agentPanel = (heading, agentName, accent, art, cmd) => {
    if (!art) {
      return '<div style="background:var(--surface);border:1px dashed var(--line);border-radius:var(--radius);padding:22px 22px;color:var(--ink-3);">'
        + '<div style="font-size:14px;font-weight:700;color:var(--ink-2);margin-bottom:6px;">' + heading + ' · ' + agentName + '</div>'
        + '<div style="font-size:13.5px;line-height:1.6;">ยังไม่มีข้อมูลสำหรับ ' + esc(sym) + ' — สั่ง <code style="font-family:\'IBM Plex Mono\',monospace;background:var(--surface-2);padding:2px 7px;border-radius:6px;color:var(--ink-2);">' + cmd + '</code> ให้ทีมงานเขียน</div>'
        + '</div>';
    }
    const statsHtml = (art.body.stats && art.body.stats.length) ? '<div style="margin-bottom:16px;">' + statGrid(art.body.stats) + '</div>' : '';
    return '<div style="background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:22px 24px;">'
      + '<div style="display:flex;align-items:center;gap:9px;margin-bottom:14px;">'
      +   '<span style="width:8px;height:8px;border-radius:50%;background:' + accent + ';"></span>'
      +   '<span style="font-size:13px;font-weight:700;letter-spacing:.03em;color:var(--ink-2);">' + heading + '</span>'
      +   '<span style="font-size:12px;color:var(--ink-3);">· โดย ' + esc(art.author) + ' · ' + art.date + '</span>'
      + '</div>'
      + statsHtml
      + '<h3 data-link data-article="' + art.id + '" style="cursor:pointer;font-family:var(--head);font-size:19px;font-weight:600;line-height:1.4;margin:0 0 9px;">' + esc(art.title) + '</h3>'
      + '<p style="margin:0 0 16px;font-size:14.5px;color:var(--ink-2);line-height:1.7;">' + esc(art.excerpt) + '</p>'
      + '<div data-link data-article="' + art.id + '" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:700;color:' + accent + ';">อ่านเต็ม →</div>'
      + '</div>';
  };

  const earnPanel = agentPanel('ผลประกอบการล่าสุด', 'Joy', 'var(--gold)', earningsArt(sym), '/Brief Joy ' + sym);
  const fundPanel = agentPanel('บทวิเคราะห์พื้นฐาน', 'Max', 'var(--up)', fundamentalsArt(sym), '/Brief Max ' + sym);

  // ข่าวอื่น ๆ ที่เกี่ยวกับหุ้นตัวนี้
  const usedIds = [earningsArt(sym), fundamentalsArt(sym)].filter(Boolean).map(a => a.id);
  const otherNews = artsForStock(sym).filter(a => !usedIds.includes(a.id));
  const newsHtml = otherNews.length
    ? otherNews.map(a => '<div data-link data-article="' + a.id + '" style="cursor:pointer;display:flex;gap:14px;padding:14px 0;border-top:1px solid var(--line);">'
        + '<div style="flex:1;min-width:0;"><div style="font-size:11px;font-weight:700;color:var(--gold);margin-bottom:5px;">' + a.cat + '</div>'
        + '<div style="font-size:15px;font-weight:600;line-height:1.45;">' + esc(a.title) + '</div></div>'
        + '<div style="font-size:12px;color:var(--ink-3);white-space:nowrap;flex:none;">' + a.date + '</div></div>').join('')
    : '<div style="padding:16px 0;color:var(--ink-3);font-size:13.5px;">ยังไม่มีข่าวอื่นเกี่ยวกับ ' + esc(sym) + '</div>';

  return '<main data-pad style="max-width:900px;margin:0 auto;padding:30px 28px 10px;">'
    + '<div data-link data-back style="cursor:pointer;display:inline-flex;align-items:center;gap:7px;font-size:13.5px;font-weight:600;color:var(--ink-2);margin-bottom:22px;">← ย้อนกลับ</div>'
    + '<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:20px;">'
    +   '<div>'
    +     '<div style="display:flex;align-items:center;gap:12px;">'
    +       '<h1 style="font-family:var(--head);font-size:38px;font-weight:700;margin:0;letter-spacing:-.01em;">' + esc(s.sym) + '</h1>'
    +       '<span style="font-size:12px;font-weight:600;color:var(--ink-2);border:1px solid var(--line);padding:5px 11px;border-radius:8px;">' + s.exchange + '</span>'
    +     '</div>'
    +     '<div style="font-size:15px;color:var(--ink-2);margin-top:7px;">' + esc(s.name) + ' · ' + esc(s.sector) + '</div>'
    +   '</div>'
    +   '<div style="text-align:right;">'
    +     '<div style="font-size:34px;font-weight:700;font-variant-numeric:tabular-nums;line-height:1;">' + d.price + '</div>'
    +     '<div style="font-size:15px;font-weight:600;color:' + d.color + ';margin-top:6px;font-variant-numeric:tabular-nums;">' + d.arrow + ' ' + d.chgAbs + ' (' + d.pct + ')</div>'
    +   '</div>'
    + '</div>'
    + '<div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;">' + rangeBtns + '</div>'
    + '<div style="background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:20px 20px 14px;">'
    +   '<div style="height:280px;">' + d.bigChart + '</div>'
    +   '<div style="font-size:11px;font-weight:700;letter-spacing:.05em;color:var(--ink-3);margin:14px 2px 6px;">ปริมาณซื้อขาย (Volume)</div>'
    +   '<div style="height:60px;">' + d.volChart + '</div>'
    + '</div>'
    + '<div style="margin:26px 0;">' + baseStats + '</div>'
    + '<div style="display:flex;flex-direction:column;gap:20px;">' + earnPanel + fundPanel + '</div>'
    + '<div style="margin-top:34px;">'
    +   '<h2 style="font-family:var(--head);font-size:20px;font-weight:700;margin:0 0 4px;">ข่าวที่เกี่ยวข้องกับ ' + esc(sym) + '</h2>'
    +   newsHtml
    + '</div>'
    + '</main>';
}

/* ── Team page — flip cards ── */
function teamView() {
  const agents = [
    {
      id: 'hanako', name: 'Hanako', badge: 'MARKET',
      accent: '#c8956c', bg: 'linear-gradient(150deg,#f5e6d3 0%,#ddb88a 100%)',
      image: 'assets/images/agents/hanako.png',
      role: 'นักข่าวภาพรวมตลาด',
      desc: 'ติดตามตลาดหุ้นสหรัฐฯ ทุกวัน สรุปดัชนีสำคัญ catalyst ประจำสัปดาห์ และ analyst moves ให้นักลงทุนเข้าใจภาพรวมในเวลาไม่กี่นาที',
    },
    {
      id: 'joy', name: 'Joy', badge: 'EARNINGS',
      accent: '#5b9bd5', bg: 'linear-gradient(150deg,#d8eaf7 0%,#8dbfe0 100%)',
      image: 'assets/images/agents/joy.png',
      role: 'นักข่าวผลประกอบการ',
      desc: 'วิเคราะห์ earnings ทุกไตรมาส เจาะตัวเลขรายได้ กำไร EPS และ guidance เปรียบกับ consensus พร้อมไฮไลต์ประเด็นที่นักลงทุนต้องรู้',
    },
    {
      id: 'max', name: 'Max', badge: 'ANALYST',
      accent: '#4a9e6b', bg: 'linear-gradient(150deg,#d3eed9 0%,#85c99e 100%)',
      image: 'assets/images/agents/max.png',
      role: 'นักวิเคราะห์พื้นฐาน',
      desc: 'เจาะลึก 10-K และงบการเงิน ประเมินรายได้ margin หนี้สิน FCF และโครงสร้างธุรกิจ เพื่อบอกว่าตัวเลขดีจริงหรือแค่ดูดี',
    },
    {
      id: 'pixel', name: 'Pixel', badge: 'CREATIVE',
      accent: '#b565a7', bg: 'linear-gradient(150deg,#f0d8ec 0%,#cc8fc0 100%)',
      image: 'assets/images/agents/pixel.png',
      role: 'นักออกแบบภาพประกอบ',
      desc: 'สร้างภาพประกอบบทความด้วย AI ให้สอดคล้องกับเนื้อหาและธีมของข่าว เติมสีสันให้ทุกบทความมีชีวิต',
    },
    {
      id: 'chen', name: 'Chen', badge: 'TREND',
      accent: '#5a7d9a', bg: 'linear-gradient(150deg,#d4e4ef 0%,#8badc4 100%)',
      image: 'assets/images/agents/Chen.png',
      role: 'นักข่าวเจาะเทรนด์',
      desc: 'สแกนกระแสข่าวที่กำลังมาแรง ทั้งหุ้น เศรษฐกิจ ภูมิรัฐศาสตร์ และเทคโนโลยี เจาะลึกเทรนด์ที่นักลงทุนต้องรู้ก่อนใคร',
    },
  ];

  const style = '<style>'
    + '.pv-flip{perspective:900px;cursor:pointer}'
    + '.pv-flip-inner{position:relative;width:100%;height:100%;transition:transform .65s cubic-bezier(.4,0,.2,1);transform-style:preserve-3d}'
    + '.pv-flip.flipped .pv-flip-inner{transform:rotateY(180deg)}'
    + '.pv-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:18px;overflow:hidden;border:1px solid var(--line)}'
    + '.pv-face-back{transform:rotateY(180deg)}'
    + '</style>';

  const cards = agents.map(a => {
    const imgStyle = a.image
      ? 'background:url(' + esc(a.image) + ') center/cover no-repeat'
      : 'background:' + a.bg;
    return '<div class="pv-flip" style="width:240px;height:320px;" onclick="this.classList.toggle(\'flipped\')">'
      + '<div class="pv-flip-inner">'
      + '<div class="pv-face" style="' + imgStyle + ';">'
      +   '<div style="position:absolute;top:14px;left:14px;font-family:\'IBM Plex Mono\',monospace;font-size:10px;font-weight:700;letter-spacing:.12em;background:' + a.accent + ';color:#fff;padding:3px 10px;border-radius:6px;">' + a.badge + '</div>'
      +   '<div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,.58));padding:24px 18px 18px;">'
      +     '<div style="font-family:Georgia,\'Times New Roman\',serif;font-size:28px;color:#fff;font-style:italic;text-shadow:0 1px 4px rgba(0,0,0,.3);">' + a.name + '</div>'
      +     '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:10px;letter-spacing:.1em;color:rgba(255,255,255,.75);margin-top:4px;">' + a.role + '</div>'
      +   '</div>'
      + '</div>'
      + '<div class="pv-face pv-face-back" style="background:var(--paper);display:flex;flex-direction:column;justify-content:center;padding:28px 22px;">'
      +   '<div style="width:32px;height:4px;background:' + a.accent + ';border-radius:2px;margin-bottom:18px;"></div>'
      +   '<div style="font-family:Georgia,\'Times New Roman\',serif;font-size:24px;font-style:italic;color:var(--ink);margin-bottom:4px;">' + a.name + '</div>'
      +   '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:10px;letter-spacing:.12em;color:' + a.accent + ';margin-bottom:16px;">' + a.badge + '</div>'
      +   '<div style="font-size:13.5px;line-height:1.75;color:var(--ink-2);">' + a.desc + '</div>'
      +   '<div style="margin-top:22px;font-size:11px;color:var(--ink-3);font-family:\'IBM Plex Mono\',monospace;">↩ คลิกเพื่อกลับ</div>'
      + '</div>'
      + '</div>'
      + '</div>';
  }).join('');

  return style
    + '<main style="max-width:1200px;margin:0 auto;padding:52px 28px 80px;">'
    +   '<h1 style="font-family:var(--head);font-size:38px;font-weight:700;margin:0 0 8px;letter-spacing:-.02em;">ทีมงาน</h1>'
    +   '<p style="color:var(--ink-2);font-size:16px;margin:0 0 48px;line-height:1.6;">AI agents เบื้องหลัง PixelVest — แต่ละคนมีหน้าที่เฉพาะ คลิกที่การ์ดเพื่อดูรายละเอียด</p>'
    +   '<div style="display:flex;flex-wrap:wrap;gap:24px;">' + cards + '</div>'
    + '</main>';
}

/* ── Site footer ── */
function footerView() {
  return '<footer style="margin-top:56px;background:var(--ink);color:var(--paper);">'
    + '<div data-pad style="max-width:1200px;margin:0 auto;padding:42px 28px 30px;">'
    +   '<div data-herogrid style="display:grid;grid-template-columns:1.6fr 1fr 1fr;gap:30px;">'
    +     '<div>'
    +       '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">' + logoSvg(32)
    +         '<span style="font-weight:700;font-size:19px;">Pixel<span style="color:var(--gold);">Vest</span></span></div>'
    +       '<p style="margin:0;font-size:13px;opacity:.65;line-height:1.7;max-width:360px;">ข่าวหุ้น บทวิเคราะห์ และข้อมูลราคา อัปเดตด้วยมือโดยทีมงาน เพื่อนักลงทุนไทยทุกคน</p>'
    +     '</div>'
    +     '<div>'
    +       '<div style="font-size:12px;font-weight:700;letter-spacing:.06em;opacity:.5;margin-bottom:12px;">เมนู</div>'
    +       '<div style="display:flex;flex-direction:column;gap:9px;font-size:13.5px;opacity:.8;"><span>ข่าวหุ้นรายวัน</span><span>บทวิเคราะห์</span><span>หุ้นรายตัว</span><span>ปฏิทินหุ้น</span></div>'
    +     '</div>'
    +     '<div>'
    +       '<div style="font-size:12px;font-weight:700;letter-spacing:.06em;opacity:.5;margin-bottom:12px;">ติดตาม</div>'
    +       '<div style="display:flex;flex-direction:column;gap:9px;font-size:13.5px;opacity:.8;"><span>Line Official</span><span>Facebook</span><span>YouTube</span><span>อีเมลข่าวสาร</span></div>'
    +     '</div>'
    +   '</div>'
    +   '<div style="margin-top:30px;padding-top:20px;border-top:1px solid rgba(255,255,255,.12);font-size:11.5px;opacity:.5;line-height:1.7;">© 2026 PixelVest · ข้อมูลบนเว็บไซต์จัดทำเพื่อการศึกษา อัปเดตด้วยมือโดยผู้ดูแล มิใช่คำแนะนำการลงทุน ราคาหุ้นอาจล่าช้าจากตลาดจริง โปรดตรวจสอบก่อนตัดสินใจลงทุน</div>'
    + '</div></footer>';
}
