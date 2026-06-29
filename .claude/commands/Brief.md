เรียก agent **$ARGUMENTS** ให้ทำงานตามขั้นตอนต่อไปนี้:

1. Spawn agent `$ARGUMENTS` ให้เขียนข่าวลงเว็บ PixelVest ตาม role ของ agent นั้น
   - ถ้า `$ARGUMENTS` = `Hanako` → เขียนข่าวภาพรวมตลาดวันนี้ โดยต้องใช้ `type: featured` และ `cat: ภาพรวมตลาด` เท่านั้น ห้ามใช้ `type: news` (ข่าวนี้จะโชว์เฉพาะช่อง Hero/ภาพรวมตลาดหน้าแรก ไม่ขึ้น feed ข่าวหุ้น)
   - ถ้า `$ARGUMENTS` = `Joy` → เขียนข่าวสรุปผลประกอบการ (ต้องบอก TICKER ให้ agent ด้วย)
   - ถ้า `$ARGUMENTS` = `Max` → เขียนบทวิเคราะห์พื้นฐาน (ต้องบอก TICKER ให้ agent ด้วย)

2. หลัง agent เขียนไฟล์ `articles/` เสร็จ → spawn agent `pixel` กับไฟล์นั้น **เฉพาะกรณี `$ARGUMENTS` = `Hanako` เท่านั้น** เพื่อสร้างภาพประกอบและอัปเดต `image:` ใน frontmatter
   - ถ้าเป็น `Joy` หรือ `Max` → **ข้ามขั้นนี้ ไม่ต้องเรียก pixel** (ข่าว earnings/analysis ไม่ต้องมีภาพประกอบ)

3. รัน `node build.js` เพื่ออัปเดต `js/articles.js`

4. ยืนยันผ่าน preview ว่าเนื้อหา (และภาพถ้ามี) ขึ้นหน้าเว็บถูกต้อง แล้วรายงานผู้ใช้
