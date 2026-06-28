# Graph Report - .  (2026-06-28)

## Corpus Check
- Corpus is ~11,911 words - fits in a single context window. You may not need a graph.

## Summary
- 103 nodes · 149 edges · 18 communities (10 shown, 8 thin omitted)
- Extraction: 81% EXTRACTED · 19% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_UI Helper Utilities|UI Helper Utilities]]
- [[_COMMUNITY_App Core & Navigation|App Core & Navigation]]
- [[_COMMUNITY_Markdown Build Pipeline|Markdown Build Pipeline]]
- [[_COMMUNITY_Price Fetch Pipeline|Price Fetch Pipeline]]
- [[_COMMUNITY_AI Writing Agents|AI Writing Agents]]
- [[_COMMUNITY_Content Authoring Workflow|Content Authoring Workflow]]
- [[_COMMUNITY_System Overview & Docs|System Overview & Docs]]
- [[_COMMUNITY_App Config & State|App Config & State]]
- [[_COMMUNITY_NVDA & Earnings Analysis|NVDA & Earnings Analysis]]
- [[_COMMUNITY_Web Entry & Generated Data|Web Entry & Generated Data]]
- [[_COMMUNITY_Static Data Definitions|Static Data Definitions]]
- [[_COMMUNITY_Market Overview Articles|Market Overview Articles]]
- [[_COMMUNITY_Thematic Analysis Articles|Thematic Analysis Articles]]
- [[_COMMUNITY_Articles Data Module|Articles Data Module]]
- [[_COMMUNITY_Quotes Data Module|Quotes Data Module]]
- [[_COMMUNITY_Bank Sector News|Bank Sector News]]
- [[_COMMUNITY_Streaming Sector News|Streaming Sector News]]
- [[_COMMUNITY_Auto Sector News|Auto Sector News]]

## God Nodes (most connected - your core abstractions)
1. `render()` - 11 edges
2. `decStock()` - 9 edges
3. `stockView()` - 9 edges
4. `articleView()` - 7 edges
5. `Joy Agent — Earnings News Writer` - 7 edges
6. `Session Handoff Document (HANDOFF_Leave.md)` - 7 edges
7. `build.js — Markdown to articles.js Build Script` - 7 edges
8. `Hanako Agent — Market Overview Writer` - 6 edges
9. `/Brief Slash Command` - 6 edges
10. `PixelVest User Guide (GUIDE.md)` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Hanako Agent — Market Overview Writer` --references--> `Article 09 — Weekly Market Overview 2026-06-28 (Featured, by Hanako)`  [EXTRACTED]
  .claude/agents/hanako.md → articles/09-market-2026-06-28.md
- `Session Handoff Document (HANDOFF_Leave.md)` --references--> `Hanako Agent — Market Overview Writer`  [EXTRACTED]
  HANDOFF_Leave.md → .claude/agents/hanako.md
- `Joy Agent — Earnings News Writer` --references--> `Article 10 — NVDA Q1 FY2027 Earnings (by Joy)`  [EXTRACTED]
  .claude/agents/joy.md → articles/NVDA/10-nvda-earnings.md
- `Session Handoff Document (HANDOFF_Leave.md)` --references--> `Joy Agent — Earnings News Writer`  [EXTRACTED]
  HANDOFF_Leave.md → .claude/agents/joy.md
- `Session Handoff Document (HANDOFF_Leave.md)` --references--> `Max Agent — Fundamentals Analyst Writer`  [EXTRACTED]
  HANDOFF_Leave.md → .claude/agents/max.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **PixelVest AI Writing Agents — Hanako, Joy, Max write all articles** — agents_hanako_hanako, agents_joy_joy, agents_max_max, commands_brief_brief [EXTRACTED 1.00]
- **Article Publication Pipeline: Markdown → build.js → js/articles.js → Web** — articles_template_template, build_js_pipeline, js_articles_js_generated, article_markdown_workflow [EXTRACTED 1.00]
- **Real-time Price Update Pipeline: /Update → fetch-quotes.js → Yahoo Finance → js/quotes.js** — commands_update_update, fetch_quotes_js_script, yahoo_finance_source, js_quotes_js_prices [EXTRACTED 1.00]

## Communities (18 total, 8 thin omitted)

### Community 0 - "UI Helper Utilities"
Cohesion: 0.16
Nodes (23): agentInfo(), AGENTS, arr(), artOf(), artsForStock(), bars(), chart(), col() (+15 more)

### Community 1 - "App Core & Navigation"
Cohesion: 0.18
Nodes (13): app, applyTheme(), back(), gear, go(), panel, render(), thaiFullDate() (+5 more)

### Community 2 - "Markdown Build Pipeline"
Cohesion: 0.24
Nodes (9): ARTICLES_DIR, fs, main(), OUT_FILE, parseArticle(), path, TH_MONTH_SHORT, thaiShort() (+1 more)

### Community 3 - "Price Fetch Pipeline"
Cohesion: 0.25
Nodes (7): fs, INDEX_MAP, main(), OUT_FILE, path, quote(), STOCK_SYMS

### Community 4 - "AI Writing Agents"
Cohesion: 0.80
Nodes (6): Hanako Agent — Market Overview Writer, Joy Agent — Earnings News Writer, Max Agent — Fundamentals Analyst Writer, /Brief Slash Command, js/data.js — STOCKS and INDICES Data (Supported Tickers), Supported Stocks Constraint — syms Must Match STOCKS List

### Community 5 - "Content Authoring Workflow"
Cohesion: 0.47
Nodes (6): Article Publication Workflow: .md → build.js → Web, Article Markdown Template (TEMPLATE.md), build.js — Markdown to articles.js Build Script, Session Handoff Document (HANDOFF_Leave.md), Planned Pixel Agent — Automatic Article Illustration Generator, Pollinations.ai — Free Image Generation API (FLUX model)

### Community 6 - "System Overview & Docs"
Cohesion: 0.40
Nodes (6): /Update Slash Command, fetch-quotes.js — Yahoo Finance Price Fetcher Script, PixelVest User Guide (GUIDE.md), PixelVest — Thai Stock News Website, Project Structure README, Yahoo Finance — Real-time Stock Price Data Source

### Community 7 - "App Config & State"
Cohesion: 0.40
Nodes (4): rangeLens, settings, state, themes

### Community 8 - "NVDA & Earnings Analysis"
Cohesion: 0.67
Nodes (3): Article 02 — NVDA New High, Article 06 — How to Read Q2 Earnings (Analysis), Article 10 — NVDA Q1 FY2027 Earnings (by Joy)

### Community 9 - "Web Entry & Generated Data"
Cohesion: 0.67
Nodes (3): index.html — Web Entry Point, js/articles.js — Generated Article Data (do not edit manually), js/quotes.js — Live Price Snapshot (overrides data.js prices)

## Knowledge Gaps
- **34 isolated node(s):** `fs`, `path`, `ARTICLES_DIR`, `OUT_FILE`, `TH_MONTH_SHORT` (+29 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `render()` connect `App Core & Navigation` to `UI Helper Utilities`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `stockView()` connect `UI Helper Utilities` to `App Core & Navigation`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `render()` (e.g. with `articleView()` and `footerView()`) actually correct?**
  _`render()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `stockView()` (e.g. with `render()` and `artsForStock()`) actually correct?**
  _`stockView()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `articleView()` (e.g. with `render()` and `agentInfo()`) actually correct?**
  _`articleView()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Joy Agent — Earnings News Writer` (e.g. with `Hanako Agent — Market Overview Writer` and `Max Agent — Fundamentals Analyst Writer`) actually correct?**
  _`Joy Agent — Earnings News Writer` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `fs`, `path`, `ARTICLES_DIR` to the rest of the system?**
  _34 weakly-connected nodes found - possible documentation gaps or missing edges._