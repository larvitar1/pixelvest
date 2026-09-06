"use strict";

/* ============================================================
   quotes.js — ราคาจริงจาก Yahoo Finance สร้างโดย fetch-quotes.js
   อย่าแก้ไฟล์นี้ตรง ๆ — รัน  node fetch-quotes.js  เพื่ออัปเดต
   ============================================================ */

const QUOTES = {
  "stocks": {
    "NVDA": {
      "price": 230.36,
      "pct": 0.84
    },
    "AAPL": {
      "price": 319.97,
      "pct": -2.51
    },
    "MSFT": {
      "price": 499.7,
      "pct": -2.04
    },
    "AMZN": {
      "price": 258.51,
      "pct": -0.15
    },
    "GOOGL": {
      "price": 338.46,
      "pct": -1.11
    },
    "META": {
      "price": 616.77,
      "pct": 1
    },
    "TSLA": {
      "price": 354.08,
      "pct": -5.92
    },
    "AMD": {
      "price": 477.57,
      "pct": 4.69
    },
    "JPM": {
      "price": 358.64,
      "pct": -0.94
    },
    "NFLX": {
      "price": 78.25,
      "pct": -5.35
    },
    "IONQ": {
      "price": 39.52,
      "pct": 1.28
    },
    "CRWD": {
      "price": 213.1,
      "pct": -0.87
    }
  },
  "indices": {
    "S&P 500": {
      "value": 7718.6,
      "chg": -29.11
    },
    "NASDAQ 100": {
      "value": 29544.15,
      "chg": 61.85
    },
    "DOW JONES": {
      "value": 53414.25,
      "chg": -271.85
    }
  },
  "updated": "2026-09-06T03:22:38.024Z"
};
