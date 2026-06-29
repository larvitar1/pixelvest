"use strict";

/* ============================================================
   config.js — theme definitions, app state, settings, constants
   ============================================================ */

/* ── Theme colour/shape palettes ── */
const themes = {
  warm: {
    '--paper':    'rgba(243,234,220,0.72)', '--surface':   'rgba(255,252,244,0.68)', '--surface-2': 'rgba(236,225,206,0.72)',
    '--ink':      '#1c1608', '--ink-2':     '#6b5c48', '--ink-3':     '#a8927a',
    '--line':     'rgba(223,208,184,0.70)', '--up':        '#1a9060', '--down':      '#cf3d26',
    '--gold':     '#c07820', '--radius':    '14px',
    '--head':     "'Noto Serif Thai',serif",
    '--shadow':   '0 2px 8px rgba(38,24,6,.10), 0 12px 32px -8px rgba(38,24,6,.16)',
  },
  modern: {
    '--paper':    '#eef1f0', '--surface':   '#ffffff', '--surface-2': '#e9eeec',
    '--ink':      '#13201b', '--ink-2':     '#566863', '--ink-3':     '#93a39d',
    '--line':     '#dde6e2', '--up':        '#07a86f', '--down':      '#e0483a',
    '--gold':     '#0d8f63', '--radius':    '20px',
    '--head':     "'IBM Plex Sans Thai',sans-serif",
    '--shadow':   '0 2px 4px rgba(20,40,32,.04), 0 20px 44px -22px rgba(20,40,32,.28)',
  },
  mono: {
    '--paper':    '#f2efe9', '--surface':   '#faf8f3', '--surface-2': '#eae5db',
    '--ink':      '#1c1a16', '--ink-2':     '#5c554b', '--ink-3':     '#9a9286',
    '--line':     '#d8d0c2', '--up':        '#1d7a50', '--down':      '#b23722',
    '--gold':     '#8a6a2c', '--radius':    '4px',
    '--head':     "'Noto Serif Thai',serif",
    '--shadow':   'none',
  },
};

/* ── App state (current route + navigation history) ── */
let state = { route: { page: 'home' }, range: '3M', history: [] };

/* ── User preferences (theme, font size, ticker visibility) ── */
const settings = { theme: 'warm', fontScale: 1, showTicker: true };

/* ── Chart data-point count per time range ── */
const rangeLens = { '1D': 22, '1W': 30, '1M': 40, '3M': 60, '1Y': 90 };

/* ── Base hex colours for chart fills (used before CSS vars are applied) ── */
const upHex   = '#1f9d6b';
const downHex = '#d2452f';
