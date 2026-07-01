"use strict";

/* ============================================================
   quotes.js — ราคาจริงจาก Yahoo Finance สร้างโดย fetch-quotes.js
   อย่าแก้ไฟล์นี้ตรง ๆ — รัน  node fetch-quotes.js  เพื่ออัปเดต
   ============================================================ */

const QUOTES = {
  "stocks": {
    "NVDA": {
      "price": 200.09,
      "pct": 2.63
    },
    "AAPL": {
      "price": 289.36,
      "pct": 2.7
    },
    "MSFT": {
      "price": 373.02,
      "pct": 1.21
    },
    "AMZN": {
      "price": 238.34,
      "pct": -0.75
    },
    "GOOGL": {
      "price": 357.37,
      "pct": 1.05
    },
    "META": {
      "price": 563.29,
      "pct": 0.12
    },
    "TSLA": {
      "price": 420.6,
      "pct": 2.13
    },
    "AMD": {
      "price": 580.91,
      "pct": 7.68
    },
    "JPM": {
      "price": 327.33,
      "pct": -0.63
    },
    "NFLX": {
      "price": 71.4,
      "pct": -3.23
    }
  },
  "indices": {
    "S&P 500": {
      "value": 7499.36,
      "chg": 58.93
    },
    "NASDAQ 100": {
      "value": 30276.35,
      "chg": 501.6
    },
    "DOW JONES": {
      "value": 52319.2,
      "chg": 136.46
    }
  },
  "updated": "2026-07-01T07:50:37.380Z"
};
