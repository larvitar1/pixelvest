---
title: "OpenAI x Broadcom เปิดตัวชิป Jalapeno — ASIC inference ตัวแรก ลดต้นทุน 50% ท้าทาย NVIDIA"
cat: เซมิคอนดักเตอร์
type: news
agent: chen
author: ทีมข่าว PixelVest
date: 2026-07-01
syms: [AVGO, NVDA, MSFT]
excerpt: "OpenAI จับมือ Broadcom เปิดตัว Jalapeno ชิป inference แบบ custom ASIC ตัวแรก ผลิตบน TSMC 3nm พัฒนาจากศูนย์ถึง tape-out ใน 9 เดือน อ้างลดต้นทุน inference ได้ 50% เทียบกับ GPU เตรียม deploy ปลายปี 2026 ใน data center ระดับ gigawatt ร่วมกับ Microsoft"
rank: 21
---

OpenAI และ Broadcom ประกาศเปิดตัว **Jalapeno** ชิปประมวลผล AI แบบ custom ASIC ตัวแรกที่ OpenAI ร่วมออกแบบตั้งแต่ศูนย์ ออกแบบเฉพาะสำหรับงาน inference ของ LLM โดยอ้างว่าสามารถลดต้นทุน inference ต่อ token ได้ราว 50% เมื่อเทียบกับ GPU ปัจจุบัน ถือเป็นการเปลี่ยนเกมครั้งสำคัญในตลาดชิป AI ที่ NVIDIA ครองอำนาจมายาวนาน

## 9 เดือนจากกระดาษเปล่าสู่ tape-out

Jalapeno ถูกพัฒนาจากขั้นตอนออกแบบเริ่มต้นจนถึง tape-out (ส่งแบบให้โรงงานผลิต) ในเวลาเพียง 9 เดือน ซึ่งถือเป็นหนึ่งในวงจรการพัฒนา ASIC ที่เร็วที่สุดเท่าที่เคยมีมาในอุตสาหกรรมเซมิคอนดักเตอร์ระดับ high-performance โดยปกติกระบวนการนี้ใช้เวลาหลายปี OpenAI ระบุว่าความเร็วนี้เกิดจากการใช้โมเดล AI ของตัวเองช่วยเร่งกระบวนการออกแบบ และการทำงานร่วมกันอย่างลึกซึ้งระหว่างทีม software และ hardware กับ Broadcom

## สเปกทางเทคนิค — reticle-size ASIC บน TSMC 3nm

ชิป Jalapeno ผลิตบนกระบวนการ TSMC 3nm โดยมี compute chiplet ขนาดประมาณ 840 ตารางมิลลิเมตร ซึ่งเกือบชนขีดจำกัด reticle ของเครื่อง EUV scanner ที่ 858 ตารางมิลลิเมตร แพ็กเกจรวมประกอบด้วย compute chiplet, I/O chiplet แยก, HBM memory stack 6-8 ชุด (HBM3/HBM4) และ dummy die สำหรับสมดุลเชิงกล สถาปัตยกรรมใช้ systolic array คล้ายกับ TPU ของ Google ซึ่งเหมาะกับการคำนวณ matrix multiplication แบบหนาแน่นที่เป็นหัวใจของ LLM inference

ในการทดสอบเบื้องต้น engineering sample ของ Jalapeno รัน ML workload ได้ที่ความถี่และกำลังไฟตามเป้าหมายการผลิต รวมถึงรันโมเดล GPT-5.3-Codex-Spark ได้สำเร็จ

## ลดต้นทุน inference 50% — หัวใจของสมการธุรกิจ

ตัวเลข "ลดต้นทุน inference 50% ต่อ token" มาจาก Hock Tan ซีอีโอของ Broadcom ที่ให้ข้อมูลกับ Bloomberg โดยระบุว่าเป็นผลจากการทดสอบเบื้องต้น ชิปนี้ออกแบบมาเพื่อแก้ปัญหา memory bottleneck ที่เป็นจุดอ่อนของ GPU ในงาน LLM inference โดยเฉพาะ พร้อมใช้เทคโนโลยี networking ของ Broadcom (Tomahawk) สำหรับการสื่อสารระหว่างชิปในคลัสเตอร์ขนาดใหญ่

## แผน deploy ปลายปี 2026 กับ Microsoft

Jalapeno มีแผน deploy เริ่มต้นปลายปี 2026 ใน data center ระดับ gigawatt ร่วมกับ Microsoft และพันธมิตร โดย Celestica ทำหน้าที่ด้าน system integration ระดับ rack ทั้งนี้ชิปนี้ออกแบบสำหรับ inference เท่านั้น ไม่ใช่สำหรับ training — OpenAI ยังคงพึ่งพา GPU ของ NVIDIA สำหรับการเทรนโมเดล และมีคำสั่งซื้อ GPU รุ่น Rubin ของ NVIDIA อยู่แล้ว

## ผลกระทบต่อ NVIDIA และภูมิทัศน์ตลาดชิป AI

การเปิดตัว Jalapeno ทำให้ OpenAI เข้าร่วมกลุ่มบริษัทที่พัฒนาชิป inference เอง ซึ่งรวมถึง Google (TPU), Meta, Amazon และ Microsoft ที่ต่างมีโปรแกรมชิปของตัวเอง แนวโน้มนี้อาจกระทบรายได้ฝั่ง inference ของ NVIDIA ในระยะยาว แม้ว่า NVIDIA จะยังคงครองตลาด training อย่างมั่นคง สำหรับ Broadcom ถือเป็นการตอกย้ำสถานะผู้นำด้าน custom ASIC ต่อจากความสำเร็จกับ Google และลูกค้ารายอื่น

> ชิป Jalapeno ไม่ได้เป็นเรื่องของการแทนที่ NVIDIA ทั้งหมด แต่เป็นเรื่องของ unit economics — เมื่อ inference คิดเป็นสัดส่วนต้นทุนมหาศาลของการให้บริการ AI ระดับ ChatGPT การลดต้นทุนตรงนี้ 50% มีผลต่อสมการธุรกิจของ OpenAI อย่างมาก
> — ทีมข่าว PixelVest

**สรุป:** OpenAI เปิดตัวชิป Jalapeno ร่วมกับ Broadcom เป็น custom ASIC ตัวแรกสำหรับ inference โดยเฉพาะ ผลิตบน TSMC 3nm พัฒนาใน 9 เดือน อ้างลดต้นทุน 50% เทียบ GPU มีแผน deploy ปลายปี 2026 กับ Microsoft แม้จะยังไม่ใช่การทดแทน NVIDIA ในด้าน training แต่สะท้อนเทรนด์ที่บริษัท AI รายใหญ่หันมาพัฒนาชิป inference ของตัวเอง นักลงทุนควรติดตามรายงานทางเทคนิคฉบับเต็มที่จะเผยแพร่ในเดือนต่อ ๆ ไป และผลกระทบต่อสัดส่วนรายได้ inference ของ NVIDIA

## แหล่งอ้างอิง

- [OpenAI and Broadcom unveil LLM-optimized inference chip — OpenAI](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)
- [OpenAI unveils its first custom chip, built by Broadcom — TechCrunch](https://techcrunch.com/2026/06/24/openai-unveils-its-first-custom-chip-built-by-broadcom/)
- [OpenAI and Broadcom reveal Jalapeno, first AI chip in partnership — CNBC](https://www.cnbc.com/2026/06/24/openai-and-broadcom-reveal-jalapeno-first-ai-chip-in-partnership.html)
- [Broadcom and OpenAI unveil custom-built Jalapeno inference processor — Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/broadcom-and-openai-unveil-custom-built-jalapeno-inference-processor-openais-first-chip-is-a-massive-reticle-sized-asic-built-in-an-ultra-fast-nine-month-development-cycle)
- [OpenAI unveils first custom AI inference chip, Jalapeno, with Broadcom — VentureBeat](https://venturebeat.com/infrastructure/openai-unveils-first-custom-ai-inference-chip-jalapeno-with-broadcom-and-its-development-was-sped-up-with-openais-own-models)
- [OpenAI's First Custom AI Chip Targets 50% Cheaper Inference — TechTimes](https://www.techtimes.com/articles/319012/20260624/openais-first-custom-ai-chip-targets-50-cheaper-inference-jalapeno-unveiled.htm)
