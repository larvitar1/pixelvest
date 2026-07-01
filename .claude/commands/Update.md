อัปเดตราคาหุ้นและดัชนีที่แสดงบนเว็บ PixelVest ให้เป็นข้อมูลล่าสุดจาก Yahoo Finance

ทำตามขั้นตอนนี้:

1. รันคำสั่ง `node fetch-quotes.js` ที่ `C:\Users\ASUS\Desktop\Web`
   - สคริปต์จะดึงราคา + %เปลี่ยนแปลงของหุ้น 10 ตัว และดัชนี 3 ตัว แล้วเขียนทับ `js/quotes.js`
   - ไม่ต้องใช้ API key (ดึงผ่าน node ฝั่ง server)

2. ดูผลลัพธ์ที่สคริปต์รายงาน:
   - ถ้า "สำเร็จ N รายการ" → เรียบร้อย
   - ถ้ามี "ล้มเหลว" บางตัว → แจ้งผู้ใช้ว่าตัวไหนดึงไม่ได้ (ตัวที่เหลือยังอัปเดตปกติ)
   - ถ้า "ดึงข้อมูลไม่สำเร็จเลย" → แจ้งผู้ใช้ว่าอาจเป็นปัญหาเน็ต/Yahoo บล็อกชั่วคราว ให้ลองใหม่อีกครั้ง

3. Bump version ใน `index.html` เพื่อ clear browser cache:
   - อ่าน `index.html` หาบรรทัด `quotes.js?v=N`
   - เพิ่ม N ขึ้น 1 (เช่น `?v=10` → `?v=11`)
   - แก้ไขไฟล์ด้วย Edit tool

4. ถ้า preview server เปิดอยู่ ให้รีเฟรชเว็บเพื่อให้ตัวเลขใหม่ขึ้น (ผ่าน preview_eval: `window.location.reload(true)`) แล้วยืนยันว่าราคาอัปเดตแล้ว

5. Commit และ push ขึ้น GitHub เพื่อ deploy อัตโนมัติ:
   - `git add js/quotes.js index.html`
   - `git commit -m "อัปเดตราคาหุ้น <วันที่>: bump quotes.js v<N> + ราคาจริงจาก Yahoo Finance"`
   - `git push origin master`

6. รายงานผู้ใช้สั้น ๆ ว่าอัปเดตกี่รายการ เวลาอัปเดตล่าสุด และลิงก์เว็บ https://larvitar1.github.io/pixelvest/

หมายเหตุ: ราคาที่ได้เป็น snapshot ณ เวลาที่รัน ไม่ใช่ realtime ที่ขยับเอง — สั่ง `/Update` ซ้ำเมื่อต้องการเลขล่าสุด
