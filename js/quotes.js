"use strict";

/* ============================================================
   quotes.js — ราคาจริงจาก Yahoo Finance สร้างโดย fetch-quotes.js
   อย่าแก้ไฟล์นี้ตรง ๆ — รัน  node fetch-quotes.js  เพื่ออัปเดต
   ============================================================ */

const QUOTES = {
  "stocks": {
    "NVDA": {
      "price": 218.29,
      "pct": -0.03
    },
    "AAPL": {
      "price": 332.27,
      "pct": 1.75
    },
    "MSFT": {
      "price": 495.63,
      "pct": 0.65
    },
    "AMZN": {
      "price": 256.78,
      "pct": 1.94
    },
    "GOOGL": {
      "price": 338.5,
      "pct": 1.77
    },
    "META": {
      "price": 648.03,
      "pct": 0.57
    },
    "TSLA": {
      "price": 365.44,
      "pct": 0.52
    },
    "AMD": {
      "price": 516.13,
      "pct": 2.49
    },
    "JPM": {
      "price": 356.23,
      "pct": 0.76
    },
    "NFLX": {
      "price": 77.4,
      "pct": 1.83
    },
    "IONQ": {
      "price": 36.75,
      "pct": -0.24
    },
    "CRWD": {
      "price": 206.74,
      "pct": -1.02
    },
    "DELTA": {
      "price": 264,
      "pct": -1.49
    }
  },
  "indices": {
    "S&P 500": {
      "value": 7656.98,
      "chg": 65.28
    },
    "NASDAQ 100": {
      "value": 29368.44,
      "chg": 264.93
    },
    "DOW JONES": {
      "value": 52573.29,
      "chg": 509.19
    }
  },
  "updated": "2026-09-12T14:12:23.580Z"
};
