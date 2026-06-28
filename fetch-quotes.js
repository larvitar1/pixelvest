"use strict";

/* ============================================================
   fetch-quotes.js — ดึงราคาหุ้น/ดัชนีจริงจาก Yahoo Finance (ไม่ใช้ API key)

   วิธีใช้:  node fetch-quotes.js   →  เขียน js/quotes.js แล้วรีเฟรชเว็บ

   - ดึงเฉพาะ "ราคาปัจจุบัน + เปอร์เซ็นต์เปลี่ยนแปลงวันนี้" (ยังไม่รวมกราฟย้อนหลัง)
   - รันฝั่ง node จึงไม่ติด CORS และไม่ต้องใช้ key
   - ตัวเลขจะอัปเดต ณ ตอนที่รันสคริปต์ (snapshot) ไม่ใช่ realtime ที่ขยับเอง
   - ถ้าหุ้นบางตัวดึงไม่ได้ จะข้ามไปและคงตัวที่เหลือ; ถ้าล้มเหลวหมด จะไม่ทับไฟล์เดิม
   ============================================================ */

const fs = require('fs');
const path = require('path');

const OUT_FILE = path.join(__dirname, 'js', 'quotes.js');

/* หุ้นใน STOCKS (js/data.js) — Yahoo ใช้ ticker ตรง ๆ */
const STOCK_SYMS = ['NVDA', 'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META', 'TSLA', 'AMD', 'JPM', 'NFLX'];

/* ดัชนีใน INDICES — แม็พชื่อในเว็บ → สัญลักษณ์ Yahoo */
const INDEX_MAP = [
  { name: 'S&P 500',    sym: '^GSPC' },
  { name: 'NASDAQ 100', sym: '^NDX'  },
  { name: 'DOW JONES',  sym: '^DJI'  },
];

const round = n => Math.round(n * 100) / 100;

/* ดึง quote 1 ตัวจาก Yahoo chart endpoint */
async function quote(sym) {
  const url = 'https://query1.finance.yahoo.com/v8/finance/chart/' + encodeURIComponent(sym);
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const j = await r.json();
  const m = j.chart && j.chart.result && j.chart.result[0] && j.chart.result[0].meta;
  if (!m || m.regularMarketPrice == null) throw new Error('ไม่พบราคาใน response');
  const price = m.regularMarketPrice;
  const prev  = m.chartPreviousClose != null ? m.chartPreviousClose : m.previousClose;
  const pct   = prev ? (price - prev) / prev * 100 : 0;
  return { price, prev, pct };
}

async function main() {
  const out = { stocks: {}, indices: {}, updated: new Date().toISOString() };
  let ok = 0, fail = 0;

  for (const sym of STOCK_SYMS) {
    try {
      const q = await quote(sym);
      out.stocks[sym] = { price: round(q.price), pct: round(q.pct) };
      ok++;
    } catch (e) { console.error('  ✗ ' + sym + ': ' + e.message); fail++; }
  }

  for (const ix of INDEX_MAP) {
    try {
      const q = await quote(ix.sym);
      out.indices[ix.name] = { value: round(q.price), chg: round(q.price - q.prev) };
      ok++;
    } catch (e) { console.error('  ✗ ' + ix.name + ': ' + e.message); fail++; }
  }

  if (ok === 0) {
    console.error('ดึงข้อมูลไม่สำเร็จเลย — ไม่เขียนไฟล์ (คงข้อมูลเดิมไว้)');
    process.exit(1);
  }

  const banner = '"use strict";\n\n'
    + '/* ============================================================\n'
    + '   quotes.js — ราคาจริงจาก Yahoo Finance สร้างโดย fetch-quotes.js\n'
    + '   อย่าแก้ไฟล์นี้ตรง ๆ — รัน  node fetch-quotes.js  เพื่ออัปเดต\n'
    + '   ============================================================ */\n\n';
  fs.writeFileSync(OUT_FILE, banner + 'const QUOTES = ' + JSON.stringify(out, null, 2) + ';\n', 'utf8');

  const t = new Date(out.updated).toLocaleString('th-TH');
  console.log('เขียน js/quotes.js สำเร็จ — สำเร็จ ' + ok + ' รายการ' + (fail ? ' / ล้มเหลว ' + fail : '') + ' · อัปเดต ' + t);
}

main();
