"use strict";

/* ============================================================
   quotes.js — ราคาจริงจาก Yahoo Finance สร้างโดย fetch-quotes.js
   อย่าแก้ไฟล์นี้ตรง ๆ — รัน  node fetch-quotes.js  เพื่ออัปเดต
   ============================================================ */

const QUOTES = {
  "stocks": {
    "NVDA": {
      "price": 210.96,
      "pct": -3.36
    },
    "AAPL": {
      "price": 333.08,
      "pct": 0.24
    },
    "MSFT": {
      "price": 505.41,
      "pct": 1.97
    },
    "AMZN": {
      "price": 253.54,
      "pct": -1.26
    },
    "GOOGL": {
      "price": 349.39,
      "pct": 3.22
    },
    "META": {
      "price": 665.6,
      "pct": 2.71
    },
    "TSLA": {
      "price": 358.97,
      "pct": -1.77
    },
    "AMD": {
      "price": 493.41,
      "pct": -4.4
    },
    "JPM": {
      "price": 350.13,
      "pct": -1.71
    },
    "NFLX": {
      "price": 80.32,
      "pct": 3.77
    },
    "IONQ": {
      "price": 37.5,
      "pct": 2.04
    },
    "CRWD": {
      "price": 235.38,
      "pct": 13.85
    },
    "DELTA": {
      "price": 238,
      "pct": -5.56
    },
    "RKLB": {
      "price": 62.55,
      "pct": -0.64
    }
  },
  "indices": {
    "S&P 500": {
      "value": 7619.98,
      "chg": -37
    },
    "NASDAQ 100": {
      "value": 29127.16,
      "chg": -241.28
    },
    "DOW JONES": {
      "value": 52421.2,
      "chg": -152.1
    }
  },
  "updated": "2026-09-15T07:22:37.685Z"
};
