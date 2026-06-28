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

/* ── Sticky top navigation bar ── */
function headerView() {
  const navDef = [{ label: 'หน้าแรก', page: 'home' }, { label: 'ข่าวหุ้น', page: 'news' }];
  const nav = navDef.map((n, i) => {
    const active = n.page === state.route.page && (n.page !== 'home' || i === 0);
    return '<a data-link data-go="' + n.page + '" style="cursor:pointer;padding:8px 14px;border-radius:9px;font-size:14.5px;font-weight:600;'
      + 'color:' + (active ? 'var(--ink)' : 'var(--ink-2)') + ';background:' + (active ? 'var(--surface-2)' : 'transparent') + ';text-decoration:none;">'
      + n.label + '</a>';
  }).join('');
  return '<header style="position:sticky;top:0;z-index:40;background:color-mix(in srgb, var(--paper) 86%, transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--line);">'
    + '<div data-pad style="max-width:1200px;margin:0 auto;padding:13px 28px;display:flex;align-items:center;gap:24px;">'
    +   '<div data-go="home" style="display:flex;align-items:center;gap:11px;cursor:pointer;flex:none;">'
    +     logoSvg(40)
    +     '<div style="line-height:1;">'
    +       '<div style="font-weight:700;font-size:20px;letter-spacing:-.01em;">Pixel<span style="color:var(--gold);">Vest</span></div>'
    +       '<div style="font-size:10px;letter-spacing:.18em;color:var(--ink-3);margin-top:3px;font-weight:600;">STOCK NEWS · ข่าวหุ้น</div>'
    +     '</div>'
    +   '</div>'
    +   '<nav data-hidesm style="display:flex;gap:4px;margin-left:8px;">' + nav + '</nav>'
    +   '<div style="flex:1;"></div>'
    +   '<div data-hidesm style="display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:8px 13px;min-width:190px;">'
    +     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4-4"></path></svg>'
    +     '<input placeholder="ค้นหาหุ้น / ข่าว" style="border:none;outline:none;background:none;font-family:inherit;font-size:13.5px;color:var(--ink);width:100%;">'
    +   '</div>'
    + '</div></header>';
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
  return '<div style="background:var(--surface);border-bottom:1px solid var(--line);">'
    + '<div data-pad style="max-width:1200px;margin:0 auto;padding:12px 28px;display:flex;align-items:center;gap:22px;">'
    +   '<div data-hidesm style="display:flex;gap:18px;flex:none;">' + indices + '</div>'
    +   '<div style="flex:1;min-width:0;border-left:1px solid var(--line);padding-left:20px;overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 4%,#000 92%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 4%,#000 92%,transparent);">'
    +     '<div style="display:flex;gap:30px;width:max-content;animation:tickerflow 46s linear infinite;">' + tickerItems + '</div>'
    +   '</div>'
    + '</div></div>';
}

/* ── Home page: hero article + watchlist + news feed + sidebar ── */
function homeView() {
  const f        = decArt(ARTS[0]);
  const watchlist = STOCKS.slice(0, 6).map(s => decStock(s));
  const feed     = ARTS.filter(a => !a.analysis).map(a => decArt(a));
  const popular  = [...ARTS].sort((a, b) => a.rank - b.rank).slice(0, 5).map(a => decArt(a));

  const watchHtml = watchlist.map(w =>
    '<div style="display:flex;align-items:center;gap:12px;padding:11px 4px;border-bottom:1px solid var(--line);">'
    + '<div style="min-width:62px;">'
    +   '<div style="font-weight:700;font-size:14px;">' + w.sym + '</div>'
    +   '<div style="font-size:11px;color:var(--ink-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:62px;">' + esc(w.name) + '</div>'
    + '</div>'
    + '<div style="width:74px;height:30px;flex:none;">' + w.spark + '</div>'
    + '<div style="flex:1;text-align:right;">'
    +   '<div style="font-weight:700;font-size:14px;font-variant-numeric:tabular-nums;">' + w.price + '</div>'
    +   '<div style="font-size:11.5px;font-weight:600;color:' + w.color + ';font-variant-numeric:tabular-nums;">' + w.arrow + w.pct + '</div>'
    + '</div></div>'
  ).join('');

  const feedHtml = feed.map(a =>
    '<article data-card data-link data-article="' + a.id + '" style="cursor:pointer;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);display:flex;flex-direction:column;">'
    + '<div style="height:148px;background:repeating-linear-gradient(135deg,var(--surface-2),var(--surface-2) 10px,transparent 10px,transparent 20px),var(--surface);position:relative;">'
    +   '<span style="position:absolute;top:11px;left:11px;background:color-mix(in srgb,var(--ink) 88%,transparent);color:var(--paper);font-size:10.5px;font-weight:700;letter-spacing:.04em;padding:4px 9px;border-radius:6px;">' + a.cat + '</span>'
    + '</div>'
    + '<div style="padding:15px 16px 16px;display:flex;flex-direction:column;flex:1;">'
    +   '<h3 style="font-family:var(--head);font-size:17.5px;font-weight:600;line-height:1.38;margin:0 0 9px;">' + esc(a.title) + '</h3>'
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
    +     '<div style="position:relative;height:300px;background:repeating-linear-gradient(135deg,var(--surface-2),var(--surface-2) 11px,transparent 11px,transparent 22px),var(--surface);display:flex;align-items:flex-end;padding:18px;">'
    +       '<div style="position:absolute;top:16px;left:16px;background:var(--gold);color:#fff;font-size:11px;font-weight:700;letter-spacing:.05em;padding:5px 11px;border-radius:7px;">' + f.cat + '</div>'
    +       '<span style="font-family:\'IBM Plex Mono\',monospace;font-size:11px;color:var(--ink-3);background:color-mix(in srgb,var(--surface) 80%,transparent);padding:3px 8px;border-radius:5px;">ภาพประกอบข่าวเด่น</span>'
    +     '</div>'
    +     '<div style="padding:24px 26px 26px;">'
    +       '<h1 style="font-family:var(--head);font-weight:700;font-size:30px;line-height:1.28;margin:0 0 12px;letter-spacing:-.01em;">' + esc(f.title) + '</h1>'
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
    +       '<h2 style="font-size:15px;font-weight:700;margin:0;">หุ้นที่ติดตาม</h2>'
    +       '<span style="font-size:11px;color:var(--ink-3);font-weight:600;">อัปเดตล่าสุด 16:30</span>'
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
  const isoMap = { 1:'2026-06-27', 2:'2026-06-27', 3:'2026-06-26', 4:'2026-06-26', 5:'2026-06-25', 6:'2026-06-24', 7:'2026-06-23', 8:'2026-06-23' };
  const thMonth = 'มิถุนายน 2026';
  const arts = [...ARTS].sort((a, b) => isoMap[b.id].localeCompare(isoMap[a.id]) || b.id - a.id);
  const groups = [];
  arts.forEach(a => {
    const iso = isoMap[a.id];
    let g = groups.find(x => x.iso === iso);
    if (!g) { g = { iso, thaiDate: parseInt(iso.split('-')[2], 10) + ' ' + thMonth, count: 0, items: [] }; groups.push(g); }
    g.count++;
    g.items.push({ id: a.id, title: a.title, excerpt: a.excerpt, cat: a.cat, badges: a.syms.slice(0, 3).map(s => '$' + s), dateLabel: a.date, read: a.read });
  });

  const groupsHtml = groups.map(g => {
    const items = g.items.map(n => {
      const badges = n.badges.map(b =>
        '<span style="display:inline-flex;align-items:center;font-family:\'IBM Plex Mono\',monospace;font-size:11px;font-weight:600;letter-spacing:.02em;color:var(--paper);background:var(--ink);padding:4px 9px;border-radius:7px;">' + b + '</span>'
      ).join('');
      return '<div data-card data-article="' + n.id + '" style="cursor:pointer;display:flex;gap:18px;align-items:flex-start;background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:18px 22px;box-shadow:var(--shadow);">'
        + '<div style="display:flex;flex-direction:column;gap:6px;flex:none;width:86px;align-items:flex-start;padding-top:2px;">' + badges + '</div>'
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
    + '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:13px;color:var(--ink-3);margin-top:12px;">อัปเดตล่าสุด: 27 มิถุนายน 2026, 16:30 · ทั้งหมด ' + arts.length + ' ข่าว</div>'
    + '<div style="position:relative;margin-top:38px;">'
    +   '<div style="position:absolute;left:6px;top:12px;bottom:24px;width:2px;background:var(--line);"></div>'
    +   groupsHtml
    + '</div></main>';
}

/* ── Single article page ── */
function articleView(id) {
  const a = artOf(id);
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
    return '<span style="display:inline-flex;align-items:center;gap:9px;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:9px 14px;font-size:13.5px;font-weight:600;">' + sym
      + '<span style="color:' + col(s.pct) + ';font-weight:600;font-variant-numeric:tabular-nums;">' + arr(s.pct) + pctStr(s.pct) + '</span></span>';
  }).join('');

  const related = ARTS.filter(x => x.id !== a.id).slice(0, 3).map(x => {
    const d = decArt(x);
    return '<article data-card data-link data-article="' + d.id + '" style="cursor:pointer;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;">'
      + '<div style="height:120px;background:repeating-linear-gradient(135deg,var(--surface-2),var(--surface-2) 10px,transparent 10px,transparent 20px),var(--surface);"></div>'
      + '<div style="padding:15px 16px 18px;"><div style="font-size:11px;font-weight:700;color:var(--gold);margin-bottom:8px;">' + d.cat + '</div><h3 style="font-family:var(--head);font-size:16px;font-weight:600;line-height:1.4;margin:0;">' + esc(d.title) + '</h3></div>'
      + '</article>';
  }).join('');

  return '<main data-pad style="max-width:760px;margin:0 auto;padding:30px 28px 10px;">'
    + '<div data-link data-back style="cursor:pointer;display:inline-flex;align-items:center;gap:7px;font-size:13.5px;font-weight:600;color:var(--ink-2);margin-bottom:22px;">← ย้อนกลับ</div>'
    + '<div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:var(--gold);margin-bottom:12px;">' + a.cat + '</div>'
    + '<h1 style="font-family:var(--head);font-weight:700;font-size:35px;line-height:1.26;margin:0 0 16px;letter-spacing:-.01em;">' + esc(a.title) + '</h1>'
    + '<p style="font-size:18px;color:var(--ink-2);line-height:1.6;margin:0 0 22px;">' + esc(a.excerpt) + '</p>'
    + '<div style="display:flex;align-items:center;gap:11px;padding:16px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);font-size:13.5px;color:var(--ink-3);">'
    +   '<span style="width:38px;height:38px;border-radius:50%;background:var(--ink);color:var(--paper);display:grid;place-items:center;font-weight:700;font-size:15px;">' + (a.author || 'P')[0] + '</span>'
    +   '<div style="flex:1;"><div style="font-weight:700;color:var(--ink);font-size:14px;">' + a.author + '</div><div>' + a.date + ' · อ่าน ' + a.read + ' นาที</div></div>'
    +   '<span style="font-size:12px;font-weight:600;color:var(--ink-2);border:1px solid var(--line);padding:7px 13px;border-radius:9px;cursor:pointer;">↗ แชร์</span>'
    + '</div>'
    + '<div style="height:330px;margin:26px 0;border-radius:var(--radius);background:repeating-linear-gradient(135deg,var(--surface-2),var(--surface-2) 12px,transparent 12px,transparent 24px),var(--surface);border:1px solid var(--line);display:grid;place-items:center;">'
    +   '<span style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:var(--ink-3);">ภาพประกอบบทความ · 1600×900</span>'
    + '</div>'
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
