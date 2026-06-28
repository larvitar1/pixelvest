"use strict";

/* ============================================================
   build.js — compile articles/*.md into js/articles.js

   วิธีใช้:  node build.js
   ทำหน้าที่อ่านไฟล์ข่าวทุกไฟล์ในโฟลเดอร์ articles/ (เรียงตามชื่อไฟล์)
   แล้วสร้างไฟล์ js/articles.js ที่นิยาม const ARTS ให้เว็บใช้งาน

   รูปแบบไฟล์ข่าว (ดู articles/TEMPLATE.md):
     - frontmatter --- ... --- เก็บ metadata
     - ย่อหน้าแรก = บทนำ (intro)
     - ## หัวข้อ + ย่อหน้าใต้มัน = section
     - > คำคม  /  > — ผู้พูด = quote
     - **สรุป:** ... = takeaway
   ============================================================ */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ARTICLES_DIR = path.join(ROOT, 'articles');
const OUT_FILE = path.join(ROOT, 'js', 'articles.js');

const TH_MONTH_SHORT = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];

function thaiShort(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return iso || '';
  return parseInt(m[3], 10) + ' ' + TH_MONTH_SHORT[parseInt(m[2], 10) - 1] + ' ' + m[1];
}

/* ── parse one markdown file into an article object ── */
function parseArticle(raw, id) {
  const fmMatch = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw);
  if (!fmMatch) throw new Error('ไม่พบ frontmatter (--- ... ---)');
  const fmText = fmMatch[1];
  const bodyText = fmMatch[2];

  // frontmatter: key: value  (arrays written as [a, b])
  const fm = {};
  fmText.split('\n').forEach(line => {
    if (!line.trim()) return;
    const i = line.indexOf(':');
    if (i === -1) return;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
    }
    fm[key] = val;
  });

  // body blocks separated by blank lines
  const blocks = bodyText.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);

  let intro = '';
  const sections = [];
  let quote = '', quoteBy = '', takeaway = '';
  let pendingHeading = null;

  blocks.forEach(block => {
    if (block.startsWith('## ')) {
      pendingHeading = block.replace(/^##\s+/, '').trim();
    } else if (block.startsWith('>')) {
      // blockquote: quote line(s) + optional "— byline"
      block.split('\n').forEach(l => {
        const t = l.replace(/^>\s?/, '').trim();
        if (!t) return;
        if (t.startsWith('—') || t.startsWith('--')) quoteBy = t;
        else quote = quote ? quote + ' ' + t : t;
      });
    } else if (/^\*\*สรุป[:：]\*\*/.test(block)) {
      takeaway = block.replace(/^\*\*สรุป[:：]\*\*\s*/, '').replace(/\n+/g, ' ').trim();
    } else {
      const text = block.replace(/\n+/g, ' ').trim();
      if (pendingHeading !== null) {
        sections.push({ h: pendingHeading, p: text });
        pendingHeading = null;
      } else if (!intro) {
        intro = text;
      } else {
        // extra paragraph with no heading → fold into intro
        intro += ' ' + text;
      }
    }
  });

  // derived / defaults
  const type = (fm.type || 'news').toLowerCase();
  const syms = Array.isArray(fm.syms) ? fm.syms : (fm.syms ? [fm.syms] : []);
  const tags = Array.isArray(fm.tags) ? fm.tags : (fm.tags ? [fm.tags] : undefined);
  const totalChars = intro.length + sections.reduce((n, s) => n + s.h.length + s.p.length, 0) + takeaway.length;
  const read = fm.read ? parseInt(fm.read, 10) : Math.max(1, Math.round(totalChars / 400));
  const excerpt = fm.excerpt || intro.slice(0, 120);

  const art = {
    id,
    cat: fm.cat || 'ข่าว',
    title: fm.title || '(ไม่มีหัวข้อ)',
    excerpt,
    author: fm.author || 'ทีมข่าว PixelVest',
    date: thaiShort(fm.date),
    iso: fm.date || '',
    read,
    syms,
    rank: fm.rank ? parseInt(fm.rank, 10) : id,
    body: { intro, sections, quote, quoteBy, takeaway },
  };
  if (type === 'featured') art.featured = true;
  if (type === 'analysis') art.analysis = true;
  if (tags) art.tags = tags;
  return art;
}

/* ── main ── */
function main() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.error('ไม่พบโฟลเดอร์ articles/ — สร้างก่อนแล้วใส่ไฟล์ .md');
    process.exit(1);
  }
  const files = fs.readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith('.md') && f.toUpperCase() !== 'TEMPLATE.MD')
    .sort();

  const arts = [];
  files.forEach((f, idx) => {
    const prefix = /^(\d+)/.exec(f);
    const id = prefix ? parseInt(prefix[1], 10) : idx + 1;
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf8');
    try {
      arts.push(parseArticle(raw, id));
    } catch (e) {
      console.error('ข้ามไฟล์ ' + f + ': ' + e.message);
    }
  });

  arts.sort((a, b) => a.id - b.id);

  const banner = '"use strict";\n\n'
    + '/* ============================================================\n'
    + '   articles.js — สร้างอัตโนมัติจาก articles/*.md โดย build.js\n'
    + '   อย่าแก้ไฟล์นี้ตรง ๆ — แก้ที่ไฟล์ .md แล้วรัน  node build.js\n'
    + '   ============================================================ */\n\n';
  const out = banner + 'const ARTS = ' + JSON.stringify(arts, null, 2) + ';\n';
  fs.writeFileSync(OUT_FILE, out, 'utf8');
  console.log('สร้าง js/articles.js สำเร็จ — ' + arts.length + ' ข่าว: ' + arts.map(a => a.id).join(', '));
}

main();
