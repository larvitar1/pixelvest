"use strict";

/* ============================================================
   quotes.js — ราคาจริงจาก Yahoo Finance สร้างโดย fetch-quotes.js
   อย่าแก้ไฟล์นี้ตรง ๆ — รัน  node fetch-quotes.js  เพื่ออัปเดต
   ============================================================ */

const QUOTES = {
  "stocks": {
    "NVDA": {
      "price": 197.58,
      "pct": -1.25
    },
    "AAPL": {
      "price": 294.38,
      "pct": 1.73
    },
    "MSFT": {
      "price": 384.28,
      "pct": 3.02
    },
    "AMZN": {
      "price": 241.7,
      "pct": 1.41
    },
    "GOOGL": {
      "price": 361.21,
      "pct": 1.07
    },
    "META": {
      "price": 612.91,
      "pct": 8.81
    },
    "TSLA": {
      "price": 425.3,
      "pct": 1.12
    },
    "AMD": {
      "price": 540.88,
      "pct": -6.89
    },
    "JPM": {
      "price": 334.07,
      "pct": 2.06
    },
    "NFLX": {
      "price": 74.19,
      "pct": 3.91
    }
  },
  "indices": {
    "S&P 500": {
      "value": 7483.23,
      "chg": -16.13
    },
    "NASDAQ 100": {
      "value": 29809.13,
      "chg": -467.22
    },
    "DOW JONES": {
      "value": 52305.24,
      "chg": -13.96
    }
  },
  "updated": "2026-07-02T06:37:53.694Z"
};
