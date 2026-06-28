"use strict";

/* ============================================================
   data.js — static mock data: stocks, indices, articles
   ============================================================ */

const STOCKS = [
  { sym:'NVDA',  name:'NVIDIA Corp.',           sector:'เซมิคอนดักเตอร์', exchange:'NASDAQ', price:131.50, pct:2.94,  sd:71 },
  { sym:'AAPL',  name:'Apple Inc.',             sector:'เทคโนโลยี',       exchange:'NASDAQ', price:214.30, pct:0.62,  sd:12 },
  { sym:'MSFT',  name:'Microsoft Corp.',        sector:'ซอฟต์แวร์',       exchange:'NASDAQ', price:449.80, pct:1.21,  sd:23 },
  { sym:'AMZN',  name:'Amazon.com Inc.',        sector:'อีคอมเมิร์ซ',     exchange:'NASDAQ', price:193.60, pct:-0.84, sd:34 },
  { sym:'GOOGL', name:'Alphabet Inc.',          sector:'เทคโนโลยี',       exchange:'NASDAQ', price:178.40, pct:1.52,  sd:45 },
  { sym:'META',  name:'Meta Platforms',         sector:'โซเชียลมีเดีย',   exchange:'NASDAQ', price:504.20, pct:2.08,  sd:56 },
  { sym:'TSLA',  name:'Tesla Inc.',             sector:'ยานยนต์ไฟฟ้า',    exchange:'NASDAQ', price:251.00, pct:-1.93, sd:67 },
  { sym:'AMD',   name:'Advanced Micro Devices', sector:'เซมิคอนดักเตอร์', exchange:'NASDAQ', price:162.30, pct:3.41,  sd:78 },
  { sym:'JPM',   name:'JPMorgan Chase',         sector:'ธนาคาร',          exchange:'NYSE',   price:205.10, pct:-0.39, sd:89 },
  { sym:'NFLX',  name:'Netflix Inc.',           sector:'สตรีมมิ่ง',       exchange:'NASDAQ', price:685.00, pct:0.94,  sd:90 },
];

const INDICES = [
  { name:'S&P 500',    value:5468.55,  chg:24.32   },
  { name:'NASDAQ 100', value:19812.40, chg:118.65  },
  { name:'DOW JONES',  value:39150.33, chg:-45.20  },
];

/* ── ARTS (บทความข่าว) ย้ายไป js/articles.js ซึ่งสร้างจาก articles/*.md โดย build.js ── */
