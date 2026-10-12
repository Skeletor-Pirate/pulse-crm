# PulseCRM ⚡ 
### Autonomous Lead Scraper Swarm & AI Cold Outreach Engine

> Inspired by the Emergent Labs Autonomous Scraper concept. An enterprise-grade, 100% free open-source sales intelligence and cold outreach platform built with React, Tailwind CSS, Express, Cheerio, SheetJS, n8n, Resend, and local offline Ollama models.

---

## 🚀 Features

- **📊 Excel & CSV Client Ingestion**: Drag-and-drop client spreadsheets (`.xlsx`, `.csv`) with auto-column fuzzy mapping (Company, Website, Contact Name, Email, Industry, Deal Value).
- **🕷️ 4-Bot Autonomous Reconnaissance Swarm**:
  - `BOT-01 DOM & Meta Crawler`: Extracts titles, OpenGraph metadata, structured headings, and site architecture.
  - `BOT-02 Company Synthesizer`: Resolves Google Favicons/Clearbit branding and core industry tags.
  - `BOT-03 Pain Point & Value Matcher`: Analyzes value propositions and identifies corporate friction points.
  - `BOT-04 Contact & Social Detective`: Harvests mailto addresses, domain regex patterns, and social footprints.
- **⚡ Raycast / Linear Omnibar**: Instant reconnaissance and hyper-targeted cold pitch generation for any company name or URL (`+Notion`, `+Stripe`, `+Docker`, `+Retool`, `+Airtable`, `+Ramp`).
- **✍️ AI Cold Outreach Composer**:
  - Automatically bridges the target company's detected pain points with the sender's value proposition.
  - Calibrated across 4 tones (*Consultative & Magnetic*, *Casual & Warm*, *Direct & Punchy*, *Challenger / Provocative*).
  - 4-step sequence cadence (Initial Cold Email, Day 3 Value-Add, Day 7 Quick Bump, Day 12 Breakup).
- **📡 Multi-Channel Dispatch**:
  - Free Resend API integration.
  - Built-in Zero-Key Simulation Sandbox recorded in a persistent outbox ledger.
  - Direct OS `mailto:` launch and n8n webhook relay.
- **📈 6-Stage Sales Pipeline Kanban**: Visual deal flow tracking ($578,000+ pipeline valuation) from spreadsheet ingest to closed-won.
- **🔄 n8n Automation Engine**: Complete downloadable workflow JSON and webhook dispatcher for autonomous scraping and email delivery loops.
- **🎨 Luxury Apple & Clay.com UI**: Frosted glassmorphism, Web Audio tactile clicks, real high-resolution company logos, and dark obsidian aesthetic.

---

## 🛠️ Tech Stack (100% Free Open-Source)

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Web Audio API.
- **Backend**: Node.js, Express, Cheerio, DuckDuckGo API, Microlink OpenGraph API.
- **Data Engine**: SheetJS (`xlsx`) for bidirectional Excel parsing and enriched export.
- **AI Intelligence**: Native Ollama local offline models (`llama3.2`, `qwen2.5-coder`, `llama3.1`) + Zero-Key Free Fallback.
- **Automation**: n8n Webhook architecture.

---

## 📦 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Skeletor-Pirate/pulse-crm.git
cd pulse-crm
npm install
```

### 2. Run the Development / Full Server
```bash
# Start backend server + static client on port 3081
npm start
```

Open **`http://localhost:3081`** in your browser.

### 3. (Optional) Run with Local Ollama AI
Make sure Ollama is running locally:
```bash
ollama run llama3.2:latest
```
PulseCRM automatically detects local Ollama instances on port `11434` and uses them for zero-cost, private cold email generation.

---

## 📄 License
MIT License. Created by [Skeletor-Pirate](https://github.com/Skeletor-Pirate).
