Backup โฟลเดอร์เว็บ PixelVest ขึ้น GitHub repo สำรอง (private) `larvitar1/pixelvest-backup`

ทำตามขั้นตอนนี้ที่ `C:\Users\ASUS\Desktop\Web`:

1. ตรวจสถานะก่อน
   - `git status --short` ดูไฟล์ที่ยังไม่ commit
   - `git remote -v` ต้องมี remote ชื่อ `backup` ชี้ไป `https://github.com/larvitar1/pixelvest-backup.git`
     ถ้าไม่มี → `git remote add backup https://github.com/larvitar1/pixelvest-backup.git`

2. ถ้ามีไฟล์ที่ยังไม่ commit → **ถามผู้ใช้ก่อน** ว่าจะรวมไฟล์ไหนบ้าง (แสดงรายการไฟล์ให้ดู)
   - ถ้าผู้ใช้ให้รวม → `git add` เฉพาะไฟล์ที่เลือก แล้ว commit ข้อความภาษาไทยอธิบายสิ่งที่เปลี่ยน
   - ห้าม commit ไฟล์ที่มี secret / webhook URL / API key จริงอยู่ข้างใน — ตรวจเนื้อไฟล์ก่อนเสมอ
   - ถ้าไม่มีไฟล์ค้าง → ข้ามไปขั้นต่อไป

3. `git fetch backup` แล้วเช็ก `git rev-list --left-right --count master...backup/master`
   - ตัวเลขขวา (backup นำหน้า) ต้องเป็น 0 ถ้าไม่ใช่ 0 แปลว่า backup มี commit ที่ local ไม่มี → **หยุดและถามผู้ใช้** ห้าม force push เอง

4. `git push backup master` (push ปกติ ไม่ใช้ `--force`)

5. ยืนยันผลด้วย `git fetch backup` + `git rev-list --left-right --count master...backup/master` ต้องได้ `0 0`

6. แจ้งผู้ใช้สั้นๆ: push ไปกี่ commit, commit ล่าสุดคืออะไร, ไฟล์ที่ยังค้างไม่ได้ commit (ถ้ามี) และลิงก์ https://github.com/larvitar1/pixelvest-backup

หมายเหตุ: skill นี้ push ไปเฉพาะ repo backup — ไม่แตะ `origin` (larvitar1/pixelvest ที่ใช้ deploy เว็บ) ยกเว้นผู้ใช้สั่งเพิ่ม
