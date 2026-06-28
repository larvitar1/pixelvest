# Graph Report - .  (2026-06-28)

## Corpus Check
- Corpus is ~15,440 words - fits in a single context window. You may not need a graph.

## Summary
- 100 nodes · 146 edges · 10 communities (6 shown, 4 thin omitted)
- Extraction: 80% EXTRACTED · 20% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Render & Helper Utilities|Render & Helper Utilities]]
- [[_COMMUNITY_News Agents & Articles|News Agents & Articles]]
- [[_COMMUNITY_App Navigation & Boot|App Navigation & Boot]]
- [[_COMMUNITY_Entry Point & Config|Entry Point & Config]]
- [[_COMMUNITY_Markdown Build Pipeline|Markdown Build Pipeline]]
- [[_COMMUNITY_Yahoo Price Fetcher|Yahoo Price Fetcher]]
- [[_COMMUNITY_Analysis Articles|Analysis Articles]]
- [[_COMMUNITY_JPM Bank News|JPM Bank News]]
- [[_COMMUNITY_NFLX News|NFLX News]]
- [[_COMMUNITY_TSLA News|TSLA News]]

## God Nodes (most connected - your core abstractions)
1. `render()` - 11 edges
2. `decStock()` - 9 edges
3. `stockView()` - 9 edges
4. `articleView()` - 7 edges
5. `/Brief Slash Command — runs agent then pixel then build` - 7 edges
6. `index.html — Entry Point (loads js with ?v= cache-busting)` - 7 edges
7. `homeView()` - 5 edges
8. `Hanako Agent — Market Overview Writer` - 5 edges
9. `Supported Stocks Constraint — syms Must Match STOCKS List` - 5 edges
10. `PixelVest User Guide (GUIDE.md)` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Article 11 — Weekly Market Overview 2026-06-28 (Featured, by Hanako, with image)` --references--> `STOCKS`  [EXTRACTED]
  articles/11-market-2026-06-28.md → js/data.js
- `Pixel Agent — Article Image Generator (Pollinations.ai)` --illustrates--> `Article 11 — Weekly Market Overview 2026-06-28 (Featured, by Hanako, with image)`  [INFERRED]
  .claude/agents/pixel.md → articles/11-market-2026-06-28.md
- `Hanako Agent — Market Overview Writer` --references--> `Article 09 — Weekly Market Overview 2026-06-28 (Featured, by Hanako)`  [EXTRACTED]
  .claude/agents/hanako.md → articles/09-market-2026-06-28.md
- `Article 11 — Weekly Market Overview 2026-06-28 (Featured, by Hanako, with image)` --written by--> `Hanako Agent — Market Overview Writer`  [EXTRACTED]
  articles/11-market-2026-06-28.md → .claude/agents/hanako.md
- `Article Markdown Template (TEMPLATE.md)` --references--> `Supported Stocks Constraint — syms Must Match STOCKS List`  [EXTRACTED]
  articles/TEMPLATE.md → .claude/agents/hanako.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Real-time Price Update Pipeline: /Update → fetch-quotes.js → Yahoo Finance → js/quotes.js** — commands_update_update, fetch_quotes_js_script, yahoo_finance_source, js_quotes_js_prices [EXTRACTED 1.00]

## Communities (10 total, 4 thin omitted)

### Community 0 - "Render & Helper Utilities"
Cohesion: 0.16
Nodes (23): agentInfo(), AGENTS, arr(), artOf(), artsForStock(), bars(), chart(), col() (+15 more)

### Community 1 - "News Agents & Articles"
Cohesion: 0.14
Nodes (21): Hanako Agent — Market Overview Writer, Joy Agent — Earnings News Writer, Max Agent — Fundamentals Analyst Writer, Pixel Agent — Article Image Generator (Pollinations.ai), Article 01 — S&P 500 New High (Featured), Article 02 — NVDA New High, Article 06 — How to Read Q2 Earnings (Analysis), Article 09 — Weekly Market Overview 2026-06-28 (Featured, by Hanako) (+13 more)

### Community 2 - "App Navigation & Boot"
Cohesion: 0.18
Nodes (13): app, applyTheme(), back(), gear, go(), panel, render(), thaiFullDate() (+5 more)

### Community 3 - "Entry Point & Config"
Cohesion: 0.14
Nodes (10): Article 11 — Weekly Market Overview 2026-06-28 (Featured, by Hanako, with image), index.html — Entry Point (loads js with ?v= cache-busting), ARTS, rangeLens, settings, state, themes, INDICES (+2 more)

### Community 4 - "Markdown Build Pipeline"
Cohesion: 0.24
Nodes (9): ARTICLES_DIR, fs, main(), OUT_FILE, parseArticle(), path, TH_MONTH_SHORT, thaiShort() (+1 more)

### Community 5 - "Yahoo Price Fetcher"
Cohesion: 0.25
Nodes (7): fs, INDEX_MAP, main(), OUT_FILE, path, quote(), STOCK_SYMS

## Knowledge Gaps
- **34 isolated node(s):** `fs`, `path`, `ARTICLES_DIR`, `OUT_FILE`, `TH_MONTH_SHORT` (+29 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `index.html — Entry Point (loads js with ?v= cache-busting)` connect `Entry Point & Config` to `Render & Helper Utilities`, `App Navigation & Boot`?**
  _High betweenness centrality (0.473) - this node is a cross-community bridge._
- **Why does `Article 11 — Weekly Market Overview 2026-06-28 (Featured, by Hanako, with image)` connect `Entry Point & Config` to `News Agents & Articles`, `Markdown Build Pipeline`?**
  _High betweenness centrality (0.350) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `render()` (e.g. with `articleView()` and `footerView()`) actually correct?**
  _`render()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `stockView()` (e.g. with `render()` and `artsForStock()`) actually correct?**
  _`stockView()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `articleView()` (e.g. with `render()` and `agentInfo()`) actually correct?**
  _`articleView()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `fs`, `path`, `ARTICLES_DIR` to the rest of the system?**
  _34 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `News Agents & Articles` be split into smaller, more focused modules?**
  _Cohesion score 0.1380952380952381 - nodes in this community are weakly interconnected._