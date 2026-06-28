# HANDOFF — PixelVest เว็บข่าวหุ้น

> เปิด session ใหม่ → อ่านไฟล์นี้ก่อน จะรู้ว่าคุยกันถึงไหน ทำอะไรไปแล้ว และทำต่อยังไง
> อัปเดตล่าสุด: 2026-06-28

---

## 1. โปรเจคนี้คืออะไร

**PixelVest** — เว็บข่าวหุ้นภาษาไทย ใช้งานจริงแบบ **local คนเดียว** (ไม่ host ที่ไหน)
- ที่อยู่: `C:\Users\ASUS\Desktop\Web`
- เทคโนโลยี: vanilla HTML/CSS/JS ล้วน ไม่มี framework
- git repo: local อย่างเดียว ไม่มี remote (ไม่ push ที่ไหน)
- ที่มา: import จากดีไซน์ Claude Design แล้ว implement เป็นเว็บจริง

---

## 2. โครงสร้างไฟล์

```
Web/
├── index.html            — จุดเข้าหลัก (โหลด js: data → articles → config → helpers → views → app)
├── css/base.css          — reset + design tokens + responsive
├── css/widgets.css       — settings panel widget (ปุ่มเฟือง ⚙ ขวาล่าง: ธีม/ขนาดฟอนต์/ticker)
├── js/data.js            — STOCKS, INDICES (มีหุ้น 10 ตัว)
├── js/articles.js        — const ARTS — GENERATED โดย build.js ★ห้ามแก้มือ★
├── js/config.js          — themes (warm/modern/mono), state, settings
├── js/helpers.js         — chart/walk/formatters/thaiFullDate
├── js/views.js           — ฟังก์ชัน render แต่ละหน้า (home/news/article)
├── js/app.js             — navigation, events, boot
├── build.js              — แปลง articles/*.md → js/articles.js
├── articles/             — ★ไฟล์ข่าว 1 ไฟล์ = 1 ข่าว★ + TEMPLATE.md
├── .claude/agents/       — agent max/joy/hanako
├── .claude/launch.json   — preview server (python http.server :5520)
├── GUIDE.md, README.md
└── HANDOFF_Leave.md      — ไฟล์นี้
```

---

## 3. ระบบเขียนข่าว (workflow หลักที่ใช้จริง)

```
เขียน/แก้ไฟล์ articles/NN-slug.md  →  node build.js  →  รีเฟรชเว็บ
```

- 1 ไฟล์ = 1 ข่าว, ชื่อไฟล์ขึ้นต้นด้วยเลข `NN-` (เลข = id/ลำดับ ห้ามซ้ำ)
- รูปแบบ: frontmatter (`title/cat/type/author/date(ISO)/syms/tags/excerpt/read/rank`) + body markdown
  - ย่อหน้าแรก = intro, `## หัวข้อ` = section, `> ...` + `> — ใคร` = กล่องคำคม, `**สรุป:** ...` = takeaway
- `type`: `news` | `featured` (ข่าวเด่นหน้าแรก) | `analysis` (บทวิเคราะห์ ไม่ขึ้น feed ข่าว)
- `syms` ต้องเป็นหุ้นที่มีใน STOCKS เท่านั้น: **NVDA AAPL MSFT AMZN GOOGL META TSLA AMD JPM NFLX**
  (ถ้าจะเขียนข่าวหุ้นนอกนี้ ต้องเพิ่มใน `js/data.js` → STOCKS ก่อน ไม่งั้นกราฟ/ชิปหุ้นเพี้ยน)
- ระบบช่วยอัตโนมัติ: แปลงวันที่ ISO→ไทย, คำนวณ read ถ้าไม่ใส่, ตัด excerpt จาก intro ถ้าไม่ใส่
- ดูตัวอย่าง/คำอธิบายเต็มที่ `articles/TEMPLATE.md`

---

## 4. Agent 3 ตัว (.claude/agents/) — ปรับให้เขียนข่าวลงเว็บโดยตรง

ปรับมาจากโปรเจคเดิม `Desktop/claude test` (และ `Desktop/my-first-project`) **ตัด NotebookLM ออกแล้ว**
ทุกตัว: เขียนไฟล์ `articles/NN-*.md` ครบเอง (หาเลขไฟล์ถัดไปเอง) แล้วผู้ใช้รัน `node build.js`

| Agent | แหล่งข้อมูล | ได้ออกมา | type |
|---|---|---|---|
| **hanako** | WebSearch (ข่าว 7 วัน) | ข่าวภาพรวมตลาดรายวัน | featured |
| **joy** | อ่าน `sources/<TICKER>/q*-call.md` ก่อน ไม่มีค่อย WebSearch | ข่าวสรุปผลประกอบการรายตัว | news |
| **max** | อ่าน `sources/<TICKER>/10-k-*.md` ก่อน ไม่มีค่อย WebSearch/SEC EDGAR | บทวิเคราะห์พื้นฐานรายตัว | analysis |

กฎร่วม (บรรณาธิการ): ไม่แต่งข้อมูล (ต้อง trace แหล่งได้), ไม่ทำนายทิศทางราคา,
กล่องคำคมใช้ "สรุปความ" ห้าม verbatim quote, จำกัด syms เฉพาะหุ้นใน STOCKS

> หมายเหตุ: โฟลเดอร์ `sources/<TICKER>/` เดิม NotebookLM เป็นคนสร้าง ตอนนี้ตัดออก →
> max/joy จะ fallback ไป WebSearch ถ้าไม่มีไฟล์ (ทำงานได้ แต่ข้อมูลตื้นกว่า) ผู้ใช้วางไฟล์เองได้

---

## 5. คุยกันถึงไหนแล้ว / ทำอะไรไปแล้ว

- ✅ implement เว็บจากดีไซน์ + ทดสอบรันผ่าน preview ครบ
- ✅ ผู้ใช้ refactor แยก css/js + เพิ่ม git (commit เอง)
- ✅ ทำระบบเขียนข่าว markdown (articles → build.js → web) — แปลงข่าวเดิม 8 ชิ้นเป็น .md
- ✅ สร้าง agent 3 ตัวใน `.claude/agents/` (ผ่านการถาม-ตอบทีละตัว ทีละจุด)
- ⏳ **กำลังจะลองรัน hanako จริง แต่ยังไม่สำเร็จ** — subagent โดน session limit ตัดก่อนเขียนไฟล์
  → articles/ ยังมีแค่ 8 ไฟล์ (+ TEMPLATE) ยังไม่มี `09-market-*.md`

---

## 6. ขั้นต่อไป (ค้างอยู่)

1. **รัน hanako จริง** (งานที่ค้าง) — เรียก agent hanako เขียนข่าวภาพรวมตลาด 1 ชิ้น
   → ตอนนี้ agent type `hanako`/`joy`/`max` พร้อมใช้ใน Agent tool แล้ว
   → หลัง agent เขียนไฟล์เสร็จ: รัน `node build.js` แล้วเปิด preview ตรวจว่าข่าวขึ้นถูกต้อง
2. (ตัวเลือก) ทำ slash command เช่น `/news <TICKER>` สั่งทีเดียวให้ agent ทำงาน + build อัตโนมัติ
3. (ตัวเลือก) เพิ่มหุ้นใหม่เข้า STOCKS เพื่อให้เขียนข่าวหุ้นอื่นได้

---

## 7. กฎการทำงานที่ผู้ใช้ขอ (สำคัญ)

- **เซฟพอยต์ก่อนงานใหญ่เสมอ:** commit จุดที่ใช้งานได้ก่อนเริ่มแก้ของใหญ่
- **ผู้ใช้สั่งย้อนกลับเป็นภาษาไทย** เช่น "ย้อนกลับ", "ยกเลิกที่แก้ล่าสุด" — ไม่ต้องให้จำคำสั่ง git
- เวลาย้อนกลับ: เลือก `git revert` (ปลอดภัย) ก่อน `git reset --hard` และยืนยันก่อนทำเสมอ
- คุยกับผู้ใช้เป็น **ภาษาไทย**

---

## 8. Git — เซฟพอยต์ล่าสุด

```
34d2771  เพิ่ม agents max/joy/hanako ที่เขียนข่าวลงเว็บโดยตรง   ← ล่าสุด (working tree clean)
fe802e6  เพิ่มระบบเขียนข่าวด้วย Markdown (articles → build.js → เว็บ)
18db3e7  เพิ่ม config preview server และ .gitignore
9cfd171  เพิ่มคู่มือการใช้งาน GUIDE.md
968cab0  จัดโครงสร้างไฟล์ใหม่เรียบร้อย
```

## 9. วิธีกลับมาทำต่อ (quick start)

1. เปิด Claude ใหม่ในโฟลเดอร์ `Web` → บอก "อ่าน HANDOFF_Leave.md"
2. เริ่ม preview: ใช้ preview server (python http.server :5520) แล้วเปิดเว็บดู
3. ทำงานค้างต่อ: ลองรัน hanako (ข้อ 6.1) — เรียก agent `hanako` ให้เขียนข่าว แล้ว `node build.js`
