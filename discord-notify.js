"use strict";

/**
 * discord-notify.js — ส่งสรุปข่าวตลาด PixelVest ล่าสุดไป Discord webhook
 *
 * Usage:
 *   node discord-notify.js <webhook_url>
 *   or set DISCORD_WEBHOOK_URL=<url> แล้วรัน node discord-notify.js
 *
 * Optional env:
 *   SITE_URL=https://yourdomain.com  (default: ใช้ path สัมพัทธ์)
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || process.argv[2];
const SITE_BASE = (process.env.SITE_URL || "").replace(/\/$/, "");

if (!WEBHOOK_URL) {
  console.error("❌  กรุณาระบุ webhook URL:");
  console.error("    node discord-notify.js <webhook_url>");
  console.error("    หรือ set DISCORD_WEBHOOK_URL=<url>");
  process.exit(1);
}

// ─── helpers ────────────────────────────────────────────────────────────────

function findLatestMarketArticle() {
  const dir = path.join(__dirname, "articles");
  const files = fs.readdirSync(dir)
    .filter(f => /^\d+-market-\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .sort((a, b) => parseInt(b) - parseInt(a)); // เรียงจาก rank สูงสุด

  if (!files.length) throw new Error("ไม่พบบทความภาพรวมตลาดใน articles/");
  return path.join(dir, files[0]);
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon < 1) continue;
    const key = line.slice(0, colon).trim();
    let val = line.slice(colon + 1).trim();
    // arrays: [AAPL, NVDA, ...]
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val.slice(1, -1).split(",").map(s => s.trim()).filter(Boolean);
    }
    fm[key] = val;
  }
  return fm;
}

/** วิเคราะห์ทิศทางตลาดจาก title+excerpt → สี embed */
function sentimentColor(title, excerpt) {
  const text = (title + " " + excerpt).toLowerCase();
  let score = 0;
  const UP   = ["ขึ้น", "บวก", "ทำนิวไฮ", "พุ่ง", "surge", "rally", "gain", "rise", "record", "soar"];
  const DOWN = ["ลง", "ลบ", "ดิ่ง", "ร่วง", "ปรับลด", "fall", "drop", "decline", "plunge", "slump", "slide"];
  UP.forEach(w   => { if (text.includes(w)) score++; });
  DOWN.forEach(w => { if (text.includes(w)) score--; });
  if (score > 0) return 0x27ae60; // เขียว — ตลาดบวก
  if (score < 0) return 0xe74c3c; // แดง — ตลาดลบ
  return 0xf39c12;                // เหลือง — mixed/neutral
}

function formatThaiDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" });
}

function stockBadges(syms) {
  if (!syms || !syms.length) return null;
  return syms.map(s => `\`${s}\``).join("  ");
}

// ─── main ────────────────────────────────────────────────────────────────────

function buildEmbed(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const fm = parseFrontmatter(content);

  const title   = fm.title   || "ภาพรวมตลาดประจำวัน";
  const excerpt = fm.excerpt || "";
  const date    = fm.date    || "";
  const syms    = Array.isArray(fm.syms) ? fm.syms : [];
  const image   = typeof fm.image === "string" ? fm.image : "";
  const rank    = fm.rank    || "";

  const articleUrl = SITE_BASE
    ? `${SITE_BASE}/article.html?id=${rank}`
    : null;

  const embed = {
    title: `📊  ${title}`,
    description: excerpt,
    color: sentimentColor(title, excerpt),
    fields: [],
    footer: { text: "PixelVest · ข่าวหุ้นรายวัน" },
    timestamp: date
      ? new Date(date + "T00:00:00").toISOString()
      : new Date().toISOString(),
  };

  if (articleUrl) embed.url = articleUrl;

  if (syms.length) {
    embed.fields.push({
      name: "หุ้นที่กล่าวถึง",
      value: stockBadges(syms),
      inline: false,
    });
  }

  if (date) {
    embed.fields.push({
      name: "วันที่",
      value: formatThaiDate(date),
      inline: true,
    });
  }

  if (image && SITE_BASE) {
    embed.image = { url: `${SITE_BASE}/${image}` };
  }

  return embed;
}

function postToDiscord(embed, filePath) {
  const payload = JSON.stringify({
    username: "PixelVest News",
    embeds: [embed],
  });

  const url = new URL(WEBHOOK_URL);
  const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload),
    },
  };

  const req = https.request(options, res => {
    if (res.statusCode === 204) {
      console.log("✅  ส่ง embed สำเร็จ");
      console.log(`   ไฟล์   : ${path.basename(filePath)}`);
      console.log(`   หัวข้อ : ${embed.title}`);
    } else {
      console.error(`❌  Discord ตอบกลับ ${res.statusCode}`);
      res.on("data", chunk => process.stderr.write(chunk));
      res.on("end", () => process.exit(1));
    }
  });

  req.on("error", err => {
    console.error("❌  เชื่อมต่อ Discord ไม่ได้:", err.message);
    process.exit(1);
  });

  req.write(payload);
  req.end();
}

// ─── run ─────────────────────────────────────────────────────────────────────

try {
  const filePath = findLatestMarketArticle();
  const embed = buildEmbed(filePath);
  postToDiscord(embed, filePath);
} catch (err) {
  console.error("❌ ", err.message);
  process.exit(1);
}
