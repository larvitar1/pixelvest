# PixelVest — โครงสร้างโฟลเดอร์

เว็บข่าวหุ้นสำหรับนักลงทุนไทย สร้างด้วย HTML + CSS + JavaScript ล้วน (ไม่มี framework)

```
Web/
├── index.html          ← จุดเริ่มต้นของเว็บ (เปิดไฟล์นี้ในเบราว์เซอร์)
│
├── css/
│   ├── base.css        ← สไตล์พื้นฐาน: reset, ตัวแปรสี/ฟอนต์ (#app design tokens), responsive
│   └── widgets.css     ← สไตล์ widget ตั้งค่า (ปุ่มเฟือง + แผงธีม)
│
├── js/
│   ├── data.js         ← ข้อมูล mock: รายชื่อหุ้น (STOCKS), ดัชนี (INDICES), บทความ (ARTS)
│   ├── config.js       ← ค่า config กลาง: ธีมสี (warm/modern/mono), state, settings
│   ├── helpers.js      ← ฟังก์ชันช่วย: สร้างกราฟ SVG, จัดรูปตัวเลข, แปลงข้อมูลหุ้น
│   ├── views.js        ← ฟังก์ชัน render แต่ละหน้า: header, ticker, home, news, article, footer
│   └── app.js          ← จัดการ navigation, render หลัก, event listeners, boot
│
└── README.md           ← ไฟล์นี้
```

## แต่ละไฟล์ทำหน้าที่อะไร?

| ไฟล์ | หน้าที่ |
|------|---------|
| `index.html` | โครงกระดูก HTML — โหลด CSS และ JS ทั้งหมด |
| `css/base.css` | ตั้งค่าพื้นฐาน: ล้าง margin/padding, animation แถบหุ้น, ตัวแปรสีทั้งหมด (`--paper`, `--gold`, `--up`, ฯลฯ), responsive mobile |
| `css/widgets.css` | หน้าตาปุ่มเฟืองและแผงเลือกธีม (มุมล่างขวา) |
| `js/data.js` | ข้อมูลหุ้นและบทความ — แก้ไขที่นี่ถ้าอยากเพิ่ม/เปลี่ยนข้อมูล |
| `js/config.js` | ชุดสีของแต่ละธีม (warm/modern/mono) และค่าเริ่มต้นของแอป |
| `js/helpers.js` | ฟังก์ชันที่ใช้ซ้ำหลายที่: วาดกราฟ, แสดงราคา, escape HTML |
| `js/views.js` | สร้าง HTML string ของแต่ละส่วน (header, หน้าแรก, หน้าข่าว, บทความ, footer) |
| `js/app.js` | เริ่มต้นแอป, จัดการการกดปุ่ม/navigation, sync ธีม |

## ลำดับการโหลด JS (สำคัญ)

ไฟล์ JS ต้องโหลดตามลำดับนี้เสมอ (ตามที่ index.html กำหนด):

1. `data.js` — ข้อมูล
2. `config.js` — ค่า config (อ้างอิงข้อมูลจาก data.js)
3. `helpers.js` — ฟังก์ชัน (อ้างอิง data + config)
4. `views.js` — render (อ้างอิงทุกอย่างข้างต้น)
5. `app.js` — boot (อ้างอิงทุกอย่าง + เริ่มแสดงผล)

## วิธีเปิดเว็บ

เปิดไฟล์ `index.html` ด้วยเบราว์เซอร์ได้เลย ไม่ต้องใช้ server

## วิธีย้อนกลับสู่โครงสร้างเดิม

```
git checkout "ก่อนจัดโครงสร้างไฟล์ใหม่" -- index.html
```

หรือดูทุก commit:

```
git log --oneline
```
