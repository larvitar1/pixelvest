"use strict";

/* ============================================================
   quotes.js — ราคาจริงจาก Yahoo Finance สร้างโดย fetch-quotes.js
   อย่าแก้ไฟล์นี้ตรง ๆ — รัน  node fetch-quotes.js  เพื่ออัปเดต
   ============================================================ */

const QUOTES = {
  "stocks": {
    "NVDA": {
      "price": 194.97,
      "pct": 1.27
    },
    "AAPL": {
      "price": 281.74,
      "pct": -0.72
    },
    "MSFT": {
      "price": 368.57,
      "pct": -1.18
    },
    "AMZN": {
      "price": 240.14,
      "pct": 3.2
    },
    "GOOGL": {
      "price": 353.65,
      "pct": 4.82
    },
    "META": {
      "price": 562.6,
      "pct": 2.24
    },
    "TSLA": {
      "price": 411.84,
      "pct": 8.46
    },
    "AMD": {
      "price": 539.49,
      "pct": 3.43
    },
    "JPM": {
      "price": 329.39,
      "pct": 0.1
    },
    "NFLX": {
      "price": 73.78,
      "pct": -0.04
    }
  },
  "indices": {
    "S&P 500": {
      "value": 7440.43,
      "chg": 86.41
    },
    "NASDAQ 100": {
      "value": 29774.75,
      "chg": 656.51
    },
    "DOW JONES": {
      "value": 52182.74,
      "chg": 306.63
    }
  },
  "updated": "2026-06-30T07:55:38.693Z"
};
