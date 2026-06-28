"use strict";

/* ============================================================
   quotes.js — ราคาจริงจาก Yahoo Finance สร้างโดย fetch-quotes.js
   อย่าแก้ไฟล์นี้ตรง ๆ — รัน  node fetch-quotes.js  เพื่ออัปเดต
   ============================================================ */

const QUOTES = {
  "stocks": {
    "NVDA": {
      "price": 192.53,
      "pct": -1.64
    },
    "AAPL": {
      "price": 283.78,
      "pct": 3.14
    },
    "MSFT": {
      "price": 372.97,
      "pct": 5.71
    },
    "AMZN": {
      "price": 232.69,
      "pct": 2.5
    },
    "GOOGL": {
      "price": 337.39,
      "pct": -1.84
    },
    "META": {
      "price": 550.25,
      "pct": 1.36
    },
    "TSLA": {
      "price": 379.71,
      "pct": 1.22
    },
    "AMD": {
      "price": 521.58,
      "pct": -2.06
    },
    "JPM": {
      "price": 329.05,
      "pct": -1.81
    },
    "NFLX": {
      "price": 73.81,
      "pct": 4.1
    }
  },
  "indices": {
    "S&P 500": {
      "value": 7354.02,
      "chg": -3.47
    },
    "NASDAQ 100": {
      "value": 29118.24,
      "chg": -322.08
    },
    "DOW JONES": {
      "value": 51876.11,
      "chg": -44.51
    }
  },
  "updated": "2026-06-28T08:11:46.953Z"
};
