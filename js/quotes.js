"use strict";

/* ============================================================
   quotes.js — ราคาจริงจาก Yahoo Finance สร้างโดย fetch-quotes.js
   อย่าแก้ไฟล์นี้ตรง ๆ — รัน  node fetch-quotes.js  เพื่ออัปเดต
   ============================================================ */

const QUOTES = {
  "stocks": {
    "NVDA": {
      "price": 228.86,
      "pct": 1.68
    },
    "AAPL": {
      "price": 338.4,
      "pct": -0.78
    },
    "MSFT": {
      "price": 509.22,
      "pct": -1.35
    },
    "AMZN": {
      "price": 246.15,
      "pct": -1.41
    },
    "GOOGL": {
      "price": 342.75,
      "pct": -0.34
    },
    "META": {
      "price": 715.62,
      "pct": -4.79
    },
    "TSLA": {
      "price": 357.45,
      "pct": -3.94
    },
    "AMD": {
      "price": 607.87,
      "pct": -3.61
    },
    "JPM": {
      "price": 336.59,
      "pct": -1.89
    },
    "NFLX": {
      "price": 69.23,
      "pct": -2.69
    },
    "IONQ": {
      "price": 44.58,
      "pct": -1.98
    },
    "CRWD": {
      "price": 259.25,
      "pct": 2.82
    },
    "DELTA": {
      "price": 262,
      "pct": 1.16
    },
    "RKLB": {
      "price": 72.19,
      "pct": -2.38
    },
    "RXRX": {
      "price": 3.7,
      "pct": -1.07
    },
    "CRWV": {
      "price": 85.07,
      "pct": -2.88
    },
    "NBIS": {
      "price": 231.88,
      "pct": -2.3
    },
    "IREN": {
      "price": 41.72,
      "pct": -5.45
    }
  },
  "indices": {
    "S&P 500": {
      "value": 7683.69,
      "chg": -59.72
    },
    "NASDAQ 100": {
      "value": 30276.81,
      "chg": -331.32
    },
    "DOW JONES": {
      "value": 51481.51,
      "chg": -347.09
    }
  },
  "updated": "2026-09-29T10:57:58.607Z"
};
