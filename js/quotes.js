"use strict";

/* ============================================================
   quotes.js — ราคาจริงจาก Yahoo Finance สร้างโดย fetch-quotes.js
   อย่าแก้ไฟล์นี้ตรง ๆ — รัน  node fetch-quotes.js  เพื่ออัปเดต
   ============================================================ */

const QUOTES = {
  "stocks": {
    "NVDA": {
      "price": 181.6,
      "pct": -9.26
    },
    "AAPL": {
      "price": 344.17,
      "pct": -1.53
    },
    "MSFT": {
      "price": 535.93,
      "pct": -3.58
    },
    "AMZN": {
      "price": 260.21,
      "pct": -2.19
    },
    "GOOGL": {
      "price": 282.57,
      "pct": -2.2
    },
    "META": {
      "price": 605.08,
      "pct": -3.96
    },
    "TSLA": {
      "price": 343.69,
      "pct": -10.77
    },
    "AMD": {
      "price": 404.4,
      "pct": -17.26
    },
    "JPM": {
      "price": 337.34,
      "pct": -4.19
    },
    "NFLX": {
      "price": 65.56,
      "pct": -1.25
    },
    "IONQ": {
      "price": 26.43,
      "pct": -10.53
    },
    "CRWD": {
      "price": 217.2,
      "pct": -9.88
    },
    "DELTA": {
      "price": 187,
      "pct": -4.1
    },
    "RKLB": {
      "price": 45.99,
      "pct": -12.18
    },
    "RXRX": {
      "price": 3.5,
      "pct": -9.79
    },
    "CRWV": {
      "price": 43.66,
      "pct": -9.83
    },
    "NBIS": {
      "price": 120.37,
      "pct": -14.94
    },
    "IREN": {
      "price": 18.03,
      "pct": -16.95
    },
    "ALAB": {
      "price": 179.47,
      "pct": -19.62
    }
  },
  "indices": {
    "S&P 500": {
      "value": 7353.73,
      "chg": -334.89
    },
    "NASDAQ 100": {
      "value": 26629.81,
      "chg": -1807.36
    },
    "DOW JONES": {
      "value": 51523.06,
      "chg": -1833.06
    }
  },
  "updated": "2026-11-06T03:12:12.615Z"
};
