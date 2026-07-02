ตรวจสอบ $ARGUMENTS ก่อน:

**ถ้า $ARGUMENTS เป็น `hanako` + ticker** (เช่น "hanako NVDA", "Hanako TSLA" — ไม่สนใจตัวพิมพ์เล็กใหญ่):
โหมดสแกนข่าวหุ้นรายตัว — **ไม่เขียนไฟล์ทันที** รอผู้ใช้เลือกก่อน:

1. Spawn agent `hanako` ให้ WebSearch หาข่าวล่าสุด (ไม่เกิน 7 วัน) เกี่ยวกับ ticker นั้นโดยเฉพาะ (ไม่ใช่ภาพรวมตลาด)
2. ให้ hanako สรุปข่าวที่พบ 3-6 ชิ้น ในแชท รูปแบบ:
   ```
   📰 ข่าว <TICKER> ล่าสุด (สแกน <วันที่>):
   1. <หัวข้อ> — <สรุปสั้น 1 บรรทัด> (<แหล่งข่าว>)
   2. ...

   เลือกเลขที่ต้องการให้เขียนลงเว็บ (เลือกได้มากกว่า 1 หรือไม่เลือกเลยก็ได้)
   ```
3. **ห้ามเขียนไฟล์ articles/ ในขั้นนี้** — รอผู้ใช้ตอบกลับก่อน
4. ถ้าผู้ใช้เลือกข่าว → เขียนไฟล์ตามข่าวที่เลือก (`type: news`, `agent: hanako`, `syms: [TICKER]`, cat ตามความเหมาะสมของเนื้อข่าว) แล้วทำ pipeline เดียวกับด้านล่าง (ข้อ 3-6)

---

**ถ้า $ARGUMENTS เป็นชื่อ agent** (hanako, joy, max, chen — ไม่สนใจตัวพิมพ์เล็กใหญ่ ไม่มี ticker ต่อท้าย):
เรียก agent นั้นให้ทำงานตามขั้นตอนต่อไปนี้:

1. Spawn agent ตามชื่อ ให้เขียนข่าวลงเว็บ PixelVest ตาม role ของ agent นั้น
   - ถ้า `hanako` → เขียนข่าวภาพรวมตลาดวันนี้ โดยต้องใช้ `type: featured` และ `cat: ภาพรวมตลาด` เท่านั้น ห้ามใช้ `type: news`
   - ถ้า `joy` → เขียนข่าวสรุปผลประกอบการ (ต้องบอก TICKER ให้ agent ด้วย)
   - ถ้า `max` → เขียนบทวิเคราะห์พื้นฐาน (ต้องบอก TICKER ให้ agent ด้วย)
   - ถ้า `chen` → สแกนเทรนด์ปัจจุบัน เสนอหัวข้อให้ผู้ใช้เลือก แล้วเขียนข่าวเจาะลึก (type: news เท่านั้น)

2. หลัง agent เขียนไฟล์ `articles/` เสร็จ → spawn agent `pixel` กับไฟล์นั้น **เฉพาะกรณี hanako เท่านั้น** เพื่อสร้างภาพประกอบและอัปเดต `image:` ใน frontmatter
   - ถ้าเป็น `joy`, `max` หรือ `chen` → ข้ามขั้นนี้

3. รัน `node build.js` เพื่ออัปเดต `js/articles.js`

4. Bump version ใน `index.html`: หา `articles.js?v=N` แล้วเพิ่ม N ขึ้น 1

5. ยืนยันผ่าน preview ว่าเนื้อหา (และภาพถ้ามี) ขึ้นหน้าเว็บถูกต้อง

6. Commit และ push ขึ้น GitHub เพื่อ deploy อัตโนมัติ:
   - `git add` ไฟล์ที่เปลี่ยน (articles/, assets/images/, js/articles.js, index.html)
   - `git commit` พร้อมข้อความอธิบาย
   - `git push origin master`
   - แจ้งผู้ใช้พร้อมลิงก์ https://larvitar1.github.io/pixelvest/

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
