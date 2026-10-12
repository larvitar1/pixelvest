ตรวจสอบ $ARGUMENTS ก่อน:

**ถ้า $ARGUMENTS เป็น `hanako` + ticker** (เช่น "hanako NVDA", "Hanako TSLA" — ไม่สนใจตัวพิมพ์เล็กใหญ่):
โหมดข่าวหุ้นรายตัว — **หาข่าวล่าสุดแล้วอัปขึ้นเว็บทันที ไม่ต้องรอผู้ใช้เลือก**:

1. Spawn agent `hanako` ให้ WebSearch หาข่าวล่าสุด (ไม่เกิน 7 วัน) เกี่ยวกับ ticker นั้นโดยเฉพาะ (ไม่ใช่ภาพรวมตลาด)
   - ถ้ามีหลาย ticker ในคำสั่งเดียว (เช่น "hanako RKLB IONQ") → spawn hanako แยกตัวละ 1 agent ขนานกัน
2. ให้ hanako **เขียนไฟล์ข่าวเลย** โดยเลือกข่าวที่เด่น/ใหม่ที่สุดของ ticker นั้น 1 ชิ้น (รวมข่าวที่เป็นธีมเดียวกันเข้าด้วยกันได้) เขียนเป็น `articles/<TICKER>/NN-<ticker>-<slug>.md`
   - frontmatter: `type: news`, `agent: hanako`, `syms: [TICKER]`, `cat` ตามความเหมาะสมของเนื้อข่าว
   - ข่าวเจาะรายตัวของ hanako **ไม่ต้องมีภาพ** → ข้าม agent `pixel`
   - ต้องมีมุมสองด้าน (บวก/ลบ) ตามกฎบรรณาธิการ
3. รายงานสรุปข่าวที่พบทั้งหมดในแชทด้วย รูปแบบ:
   ```
   📰 ข่าว <TICKER> ล่าสุด (สแกน <วันที่>):
   1. <หัวข้อ> — <สรุปสั้น 1 บรรทัด> (<แหล่งข่าว>)
   2. ...

   ✅ เขียนลงเว็บแล้ว: ข้อ <N>
   ```
4. ทำ pipeline ต่อให้ครบเหมือนด้านล่าง (ข้อ 3-7): `node build.js` → bump `articles.js?v=N` ใน index.html → ตรวจ preview → commit + push origin master → push backup master
5. **แนบไฟล์ .md ขึ้น NotebookLM** → ทำตามหัวข้อ "📎 ขั้นตอนร่วม: แนบไฟล์ .md ขึ้น NotebookLM" ท้ายไฟล์นี้ (notebook ปลายทาง = ชื่อเดียวกับ `<TICKER>`)
6. ถ้าผู้ใช้อยากได้ข่าวชิ้นอื่นเพิ่มจากที่สรุปไว้ → เขียนเพิ่มแล้วรัน pipeline ซ้ำ

---

**ถ้า $ARGUMENTS เป็น `chen`** (ไม่สนใจตัวพิมพ์เล็กใหญ่):
โหมดข่าวด่วนประจำพอร์ต — **สรุปในแชท + เก็บไฟล์ลง `briefs/` เท่านั้น ไม่แตะเว็บ ไม่ build ไม่ commit**:

1. Spawn agent `chen` ให้ทำตาม role ของตัวเอง:
   - อ่าน `js/data.js` ดูว่าติดตามหุ้นตัวไหนอยู่
   - อ่าน `js/articles.js` กันข่าวซ้ำกับช่อง "ข่าวหุ้นล่าสุด" บนเว็บ
   - WebSearch หาข่าว **ใหม่ภายใน 12 ชม.เท่านั้น** ที่กระทบหุ้นเหล่านั้น
2. Chen เสนอ 3-6 หัวข้อในแชท → **หยุดรอผู้ใช้เลือก**
3. ผู้ใช้เลือกเลขแล้ว → Chen สรุปใจความหัวข้อนั้นแบบอ่านไวๆ (เกิดอะไรขึ้น / กระทบยังไง / ราคาตอบรับ / มุมตรงข้าม / จับตาอะไรต่อ + ลิงก์แหล่งข่าว)
4. Chen บันทึกสรุปเป็นไฟล์ `briefs/<TICKER>-<DD>-<MM>-<YYYY>.md` (เช่น `briefs/NVDA-23-09-2026.md`) — หุ้นคนละตัวแยกไฟล์, ตัวเดิมวันเดิมต่อท้ายไฟล์เดิม แล้วแจ้งชื่อไฟล์ในแชท
5. **ห้าม**ทำ pipeline เขียนเว็บ (build.js / bump version / commit / push) ในโหมดนี้ — ไฟล์ใน `briefs/` ไม่เข้า build — ถ้าผู้ใช้อยากให้ขึ้นเว็บค่อยสั่ง `Brief hanako <TICKER>` แยกต่างหาก

---

**ถ้า $ARGUMENTS เป็นชื่อ agent** (hanako, joy, max — ไม่สนใจตัวพิมพ์เล็กใหญ่ ไม่มี ticker ต่อท้าย):
เรียก agent นั้นให้ทำงานตามขั้นตอนต่อไปนี้:

1. Spawn agent ตามชื่อ ให้เขียนข่าวลงเว็บ PixelVest ตาม role ของ agent นั้น
   - ถ้า `hanako` → เขียนข่าวภาพรวมตลาดวันนี้ โดยต้องใช้ `type: featured` และ `cat: ภาพรวมตลาด` เท่านั้น ห้ามใช้ `type: news`
   - ถ้า `joy` → เขียนข่าวสรุปผลประกอบการ (ต้องบอก TICKER ให้ agent ด้วย)
   - ถ้า `max` → เขียนบทวิเคราะห์พื้นฐาน (ต้องบอก TICKER ให้ agent ด้วย)

2. หลัง agent เขียนไฟล์ `articles/` เสร็จ → spawn agent `pixel` กับไฟล์นั้น **เฉพาะกรณี hanako เท่านั้น** เพื่อสร้างภาพประกอบและอัปเดต `image:` ใน frontmatter
   - ถ้าเป็น `joy` หรือ `max` → ข้ามขั้นนี้

3. รัน `node build.js` เพื่ออัปเดต `js/articles.js`

4. Bump version ใน `index.html`: หา `articles.js?v=N` แล้วเพิ่ม N ขึ้น 1

5. ยืนยันผ่าน preview ว่าเนื้อหา (และภาพถ้ามี) ขึ้นหน้าเว็บถูกต้อง

6. Commit และ push ขึ้น GitHub เพื่อ deploy อัตโนมัติ:
   - `git add` ไฟล์ที่เปลี่ยน (articles/, assets/images/, js/articles.js, index.html)
   - `git commit` พร้อมข้อความอธิบาย
   - `git push origin master`
   - แจ้งผู้ใช้พร้อมลิงก์ https://larvitar1.github.io/pixelvest/

7. Backup ขึ้น repo สำรองทุกครั้งที่ทำงานเสร็จ (ตามขั้นตอนใน `.claude/commands/repo.md`):
   - เช็ก remote `backup` มีหรือยัง ถ้าไม่มี → `git remote add backup https://github.com/larvitar1/pixelvest-backup.git`
   - `git fetch backup` แล้วเทียบ `git rev-list --left-right --count master...backup/master` — ถ้า backup นำหน้า → หยุดถามผู้ใช้ ห้าม force push
   - `git push backup master` (ไม่ใช้ `--force`)

8. **แนบไฟล์ .md ขึ้น NotebookLM** — **เฉพาะกรณี `hanako` เท่านั้น** (`joy` / `max` ข้ามขั้นนี้)
   ทำตามหัวข้อ "📎 ขั้นตอนร่วม: แนบไฟล์ .md ขึ้น NotebookLM" ท้ายไฟล์นี้ (notebook ปลายทาง = `Overview_Market`)

---

**ถ้า $ARGUMENTS เป็น stock ticker** (เช่น AAPL, NVDA, TSLA):

1. Research บริษัทเบื้องหลัง ticker นั้น
2. เขียน brief 4 หัวข้อ:
   - **What the company does** (2-3 ประโยคภาษาไทย เข้าใจง่าย)
   - **Latest earnings** (3-5 bullet จาก quarterly earnings ล่าสุดที่รู้จัก ถ้าไม่แน่ใจว่า quarter ไหนล่าสุดให้บอกตรงๆ)
   - **Bull case / Bear case** (2-3 bullet ต่อฝั่ง)
   - **What to ask before owning it** (3-5 คำถามสำหรับนักลงทุนมือใหม่)
3. ถ้าไม่มีโฟลเดอร์ `briefs/` ให้สร้างก่อน
4. บันทึกเป็น `briefs/<TICKER>.md` (ticker ตัวพิมพ์ใหญ่)
5. แสดง brief เต็มในแชทด้วย
6. ห้ามแนะนำซื้อ/ขาย — เป็นแค่ research summary

---

**ถ้าไม่มี $ARGUMENTS หรือไม่รู้ว่าเป็น agent หรือ ticker**: ถามผู้ใช้ก่อน

---

## 📎 ขั้นตอนร่วม: แนบไฟล์ .md ขึ้น NotebookLM

ใช้กับ **โหมด hanako เท่านั้น** (ทั้งภาพรวมตลาด และข่าวหุ้นรายตัว) — joy / max / chen **ไม่ต้องทำ**

ทำ **หลัง** `git push backup master` สำเร็จแล้ว (ท้ายสุดของ pipeline)

### เลือก notebook ปลายทาง

| โหมด | ไฟล์ที่แนบ | notebook ปลายทาง |
|------|-----------|------------------|
| `Brief hanako` (ภาพรวมตลาด) | `articles/NN-market-YYYY-MM-DD.md` | `Overview_Market` |
| `Brief hanako <TICKER>` | `articles/<TICKER>/NN-<ticker>-<slug>.md` | ชื่อเดียวกับ `<TICKER>` (เช่น `CRWD`) |

ถ้ามีหลาย ticker ในคำสั่งเดียว → แนบแยกไฟล์เข้า notebook ของแต่ละ ticker

### ขั้นตอน

1. **หา notebook id จากชื่อ** (CLI รับเฉพาะ id ไม่รับชื่อ):
   ```bash
   notebooklm list --json
   ```
   แล้วจับคู่ `title` ให้ตรงเป๊ะกับชื่อ notebook ปลายทาง → เอา `id` มาใช้

2. **ถ้าไม่เจอ notebook ที่ชื่อตรงกัน → หยุด ถามผู้ใช้ก่อน ห้ามสร้างเอง**
   แจ้งว่า "ไม่พบ notebook `<ชื่อ>` — ต้องการให้สร้างใหม่ไหม?" แล้วรอคำตอบ
   (ถ้าผู้ใช้ตอบว่าสร้าง → `notebooklm create "<ชื่อ>"` แล้วทำข้อ 3 ต่อ)

3. **แนบไฟล์** — ใช้ `-n <notebook_id>` เสมอ อย่าพึ่ง `notebooklm use`:
   ```bash
   notebooklm source add "<path/to/file.md>" -n <notebook_id> --title "<ชื่อไฟล์หรือหัวข้อข่าว>" --json
   ```
   - ใช้ `--title` ตั้งชื่อให้อ่านรู้เรื่อง เช่น `71-market-2026-10-12 — <หัวข้อข่าว>`
   - ถ้า source ชื่อเดิมมีอยู่แล้ว (แนบซ้ำรอบสอง) → `notebooklm source delete-by-title "<ชื่อเดิม>" ` ก่อน แล้วค่อย add ใหม่

4. **แจ้งผลในแชท** ต่อท้ายสรุป pipeline:
   ```
   📎 NotebookLM: แนบ <ชื่อไฟล์> → <ชื่อ notebook> สำเร็จ (source id: <id>)
   ```

### เมื่อพลาด

- ถ้า `notebooklm` ล้มเหลว (auth หมดอายุ / rate limit / network) → **เตือนในแชท แต่ห้ามถือว่า pipeline ล้มเหลว**
  งานหลัก (build + push origin + push backup) ที่สำเร็จไปแล้วยังนับว่าเสร็จสมบูรณ์
- รายงานแบบนี้:
  ```
  ⚠️ NotebookLM: แนบไฟล์ไม่สำเร็จ — <สาเหตุจาก stderr>
     งานเว็บเสร็จครบแล้ว แนบซ้ำทีหลังได้ด้วย:
     notebooklm source add "<path>" -n <notebook_id> --title "<title>"
  ```
- ถ้าเป็นปัญหา auth ให้บอกผู้ใช้ว่าแก้ได้ด้วย `notebooklm auth refresh` หรือ `notebooklm login`
  (คำสั่ง login ต้องเปิดเบราว์เซอร์ → ให้ผู้ใช้พิมพ์ `! notebooklm login` เอง)
