---
title: IonQ ยัดเครื่องควอนตัมเข้าศูนย์วิจัยของ Nvidia — และ BofA เปิดคำแนะนำซื้อตามมาห้าวันถัดมา
cat: ควอนตัม
type: news
agent: hanako
author: ทีมข่าว PixelVest
date: "2026-09-29"
syms: [IONQ]
tags: [ควอนตัม, Nvidia, NVAQC, Superion, นักวิเคราะห์, error correction]
excerpt: Superion 256 จะเป็นควอนตัมโปรเซสเซอร์ตัวแรกที่ติดตั้งในศูนย์ NVAQC ของ Nvidia ปี 2570 พร้อมงานวิจัยตัวถอดรหัสแก้ความผิดพลาดแบบเรียลไทม์ที่รันบนซีพียูตัวเดียว ต่อด้วย Bank of America เปิดคำแนะนำ Buy เป้า 60 ดอลลาร์ แต่ทั้งสามดีล Superion ที่ประกาศในสัปดาห์เดียวยังไม่เปิดเผยมูลค่าและส่งมอบปี 2570
read: 6
rank: 57
---

IonQ (IONQ) ปิดสัปดาห์ที่ผ่านมาด้วยข่าวสามชั้นที่ต่อเนื่องกัน เมื่อ 23 ก.ย. 2569 บริษัทประกาศว่าเครื่อง Superion 256 จะกลายเป็นควอนตัมโปรเซสเซอร์ (QPU) ตัวแรกที่ติดตั้งภายในศูนย์ NVIDIA Accelerated Quantum Research Center (NVAQC) พร้อมกับเปิดเผยผลงานวิจัยตัวถอดรหัสแก้ความผิดพลาดควอนตัมแบบเรียลไทม์ ราคาหุ้นวันนั้นปิดที่ 42.54 ดอลลาร์ บวก 4.42% ตามด้วยดีลขาย Superion 256 ให้ Florida International University และปิดท้ายด้วย Bank of America Securities ที่เปิดบทวิเคราะห์ครั้งแรกเมื่อ 28 ก.ย. ด้วยคำแนะนำ Buy

ประเด็นที่เราเห็นว่าน่าสนใจกว่าตัวข่าวแต่ละชิ้น คือการที่ทั้งสามชิ้นวางเรียงกันในสัปดาห์เดียว แล้วยังเหลือคำถามเดิมที่ยังไม่มีใครตอบ

## Nvidia จากที่เคยทุบหุ้นควอนตัม มาเป็นเจ้าภาพติดตั้งเครื่อง

ข่าวนี้มีน้ำหนักเชิงสัญลักษณ์สูง เพราะต้นปี 2568 คำพูดของ Jensen Huang ที่ว่าควอนตัมที่ใช้งานได้จริงยังห่างอีกหลายสิบปี เคยเป็นตัวกดหุ้นกลุ่มควอนตัมทั้งกระดาน การที่ Nvidia ยอมให้ QPU ตัวแรกในศูนย์วิจัยของตัวเองเป็นเครื่องของ IonQ จึงเป็นการกลับทิศของท่าทีอย่างชัดเจน

โครงสร้างทางเทคนิคคือ Superion 256 จะเชื่อมตรงเข้ากับระบบ GB200 NVL72 ของ Nvidia ผ่าน NVQLink ซึ่งเป็นช่องทางเชื่อมต่อความหน่วงต่ำระหว่างเครื่องควอนตัมกับแร็กจีพียู และใช้ CUDA-Q เป็นตัวจัดคิวงานข้ามสองฝั่ง พูดง่าย ๆ คือแทนที่จะส่งงานไปเครื่องควอนตัมแล้วรอผลเป็นรอบ ๆ สถาปัตยกรรมนี้ตั้งใจให้จีพียูกับคิวบิตทำงานสลับกันได้ในระดับที่เร็วพอสำหรับงานที่ต้องวนลูปถี่ ๆ โจทย์ที่ทั้งสองฝ่ายระบุว่าจะร่วมวิจัยครอบคลุมการสร้างแบบจำลองทางการเงิน วัสดุศาสตร์ และเคมีเชิงคำนวณ พร้อมแนวทางเปิดเผยผลวิจัยและออกแบบร่วมกันระหว่างควอนตัมกับจีพียู

กำหนดติดตั้งคือปี 2570 ซึ่งเป็นจุดที่ต้องระบุให้ชัด — นี่ไม่ใช่ดีลที่จะมีเครื่องเดินอยู่ในศูนย์ของ Nvidia ภายในปีนี้

## ตัวถอดรหัสที่รันบนซีพียูตัวเดียว: ปัญหาคอขวดที่คนไม่ค่อยพูดถึง

ข่าวอีกชิ้นในวันเดียวกันเป็นงานวิจัยที่อาจสำคัญกว่าในระยะยาว IonQ ระบุว่าได้พัฒนาและทดสอบตัวถอดรหัสแก้ความผิดพลาด (error-correction decoder) แบบครบวงจรตัวแรกของอุตสาหกรรมที่ทำงานต่อเนื่องแบบเรียลไทม์บนซีพียูมาตรฐานทั่วไปเพียงตัวเดียว

อธิบายว่าทำไมเรื่องนี้สำคัญ: คิวบิตมีความผิดพลาดตลอดเวลา ระบบจึงต้องวัดสัญญาณบ่งชี้ความผิดพลาดแล้วให้คอมพิวเตอร์ปกติคำนวณว่าจะแก้ที่ไหน ถ้าฝั่งคอมพิวเตอร์ปกติคำนวณไม่ทันอัตราที่คิวบิตผลิตข้อมูลออกมา ระบบต้องหยุดรอ ซึ่งเรียกว่า stretch time และเป็นตัวทำให้การคำนวณยาว ๆ พังไปเลยในทางปฏิบัติ คอขวดนี้มักถูกแก้ด้วยฮาร์ดแวร์เฉพาะทางที่แพงและขยายขนาดยาก

ตัวเลขที่ IonQ รายงานคือ ภายใต้สภาวะสัญญาณรบกวนตามปกติ ตัวถอดรหัสนี้เพิ่ม stretch time เพียง 0.02% และยังต่ำกว่า 0.3% ที่อัตราความผิดพลาดของเกตสองคิวบิตระดับ 10^-4 ถ้าผลนี้ทำซ้ำได้ในระบบขนาดใหญ่จริง มันหมายถึงต้นทุนโครงสร้างคลาสสิกที่ต้องพ่วงไปกับเครื่องควอนตัมลดลงอย่างมีนัยสำคัญ ข้อสังเกตของเราคือ นี่เป็นผลการทดสอบของบริษัทเอง ยังไม่มีข้อมูลยืนยันจากการทำซ้ำโดยฝ่ายที่สาม

## สามเครื่องในสี่วัน แต่ไม่มีเครื่องไหนบอกราคา

ระหว่าง 21-24 ก.ย. IonQ ประกาศที่ตั้งของ Superion 256 รวมสามแห่ง คือสัญญาจัดหากับ SDT ของเกาหลีใต้ การติดตั้งเพื่อวิจัยที่ NVAQC ของ Nvidia และสัญญากับ Florida International University ซึ่งเป็นการขายและติดตั้งแพลตฟอร์มนี้ครั้งแรกในรัฐฟลอริดา โดย FIU จะเป็นพันธมิตรด้านวิชาการหลักของ IonQ ในรัฐ

จุดร่วมของทั้งสามดีลคือสิ่งที่หายไปเหมือนกันหมด: **ไม่มีการเปิดเผยมูลค่าสัญญา และกำหนดส่งมอบอยู่ในปี 2570 ทั้งสามราย** กรณี FIU ระบุว่าการติดตั้งคาดว่าจะเป็นช่วงปลายปี 2570 หลังจากสร้างดาต้าเซ็นเตอร์เฉพาะทางในวิทยาเขตเสร็จ

นี่คือเหตุผลที่เรามองว่าการอ่านข่าวชุดนี้ต้องแยกสองชั้นให้ชัด ชั้นแรกคือ "มีคนสั่งซื้อจริงและมีชื่อลูกค้าระบุได้" ซึ่งเป็นสัญญาณเชิงบวกที่ต่างจากข่าวความร่วมมือแบบสำรวจความเป็นไปได้ ชั้นที่สองคือ "รายได้จะรับรู้เมื่อไหร่และเท่าไหร่" ซึ่งยังไม่มีข้อมูลยืนยัน และแทบไม่ส่งผลต่อกรอบรายได้ปี 2569 ที่บริษัทให้ไว้ที่ 450-460 ล้านดอลลาร์

## BofA เข้ามาด้วยเป้า 60 ดอลลาร์ — และเหตุผลที่ควรอ่านให้ครบ

เมื่อ 28 ก.ย. Bank of America Securities เปิดบทวิเคราะห์ IonQ ครั้งแรก โดยนักวิเคราะห์ Vivek Arya ให้คำแนะนำ Buy และราคาเป้าหมาย 60 ดอลลาร์ต่อหุ้น ซึ่งคิดเป็น upside ราว 33% จากระดับราคาขณะนั้น (Bank of America Securities, 28 ก.ย. 2569) Arya ถูกจัดอันดับที่ 147 จากนักวิเคราะห์กว่า 12,500 รายบน TipRanks ด้วยอัตราความแม่นยำ 59%

เหตุผลหลักที่ BofA ให้ไว้คือ IonQ ใช้การควบรวมกิจการเป็นเครื่องมือเร่งโรดแมปด้านการคำนวณควอนตัม พร้อมขยายเข้าสู่ควอนตัมเน็ตเวิร์กกิง ความปลอดภัย เซ็นเซอร์ อวกาศ และบริการโรงหล่อ โดยประเมินว่ารายได้จะเติบโตเฉลี่ยทบต้น 69% ต่อปีในช่วงปีงบ 2569 ถึง 2573

ข้อสังเกตที่ควรวางคู่กันคือ ถ้อยแถลงเดียวกันนี้ระบุว่าแรงขับหลักมาจากการควบรวมกิจการ ซึ่งเป็นประเด็นเดียวกับที่ฝ่ายระมัดระวังใช้เป็นข้อโต้แย้งมาตลอด คือการเติบโตของรายได้ส่วนสำคัญไม่ได้มาจากการขยายตัวเชิงอินทรีย์ของธุรกิจควอนตัมเดิม และที่น่าสังเกตไม่น้อยคือในวันที่ข่าวคำแนะนำ Buy ออก หุ้นในช่วงก่อนเปิดตลาดยังย่อลงราว 0.8% ซึ่งเป็นรูปแบบเดียวกับที่เห็นในวันข่าวดีล SDT

ทางด้านฐานะการเงิน บริษัทยังมี adjusted EBITDA ไตรมาส 2/2569 ติดลบ 120.3 ล้านดอลลาร์ โดยมีเงินสดสะสมราว 2.1 พันล้านดอลลาร์เป็นกันชน

หากงานวิจัยตัวถอดรหัสนี้ถูกยืนยันโดยฝ่ายที่สาม และการติดตั้งที่ NVAQC เดินตามกำหนดปี 2570 ตัวแปรที่เปลี่ยนไปคือความน่าเชื่อถือของโรดแมป ซึ่งเป็นสิ่งที่นักลงทุนกลุ่มนี้มักใช้ทดแทนงบกำไรขาดทุนที่ยังติดลบ ในทางกลับกัน หากการส่งมอบทั้งสามรายในปี 2570 เกิดความล่าช้า หรือดีลใหม่ยังคงไม่มีการเปิดเผยมูลค่าต่อไปเรื่อย ๆ แรงกดดันเรื่องจังหวะการแปลงเทคโนโลยีเป็นรายได้ก็มีแนวโน้มกลับมาเป็นประเด็นหลักอีกครั้ง ทั้งสองเส้นทางนี้ยังไม่มีข้อมูลยืนยัน

> การได้ Nvidia เป็นเจ้าภาพติดตั้งเครื่องคือชัยชนะเชิงความน่าเชื่อถือที่ IonQ ต้องการที่สุด หลังเคยถูกคำพูดของ Jensen Huang ทุบหุ้นมาก่อน แต่สิ่งที่ตลาดมักมองข้ามคือทั้งสามดีลในสัปดาห์นี้อยู่บนเส้นเวลาเดียวกันหมด คือปี 2570 ซึ่งแปลว่าปี 2569-2570 ยังเป็นช่วงที่บริษัทต้องเผาเงินสดต่อโดยที่รายได้จากฮาร์ดแวร์ชุดนี้ยังไม่เข้า
> — ทีมข่าว PixelVest

**สรุป:** IonQ ทำสัปดาห์ที่แข็งที่สุดในรอบหลายเดือน ทั้งการเป็น QPU ตัวแรกในศูนย์วิจัยของ Nvidia งานวิจัยตัวถอดรหัสแก้ความผิดพลาดที่รันบนซีพียูตัวเดียว ดีลกับ FIU และคำแนะนำซื้อครั้งแรกจาก BofA ที่เป้า 60 ดอลลาร์ แต่ตัวชี้ขาดยังไม่เปลี่ยน คือทั้งสามเครื่องส่งมอบปี 2570 และยังไม่มีการเปิดเผยมูลค่าสัญญาแม้แต่รายเดียว

## ตัวเลขสำคัญ

- ราคาปิด 23 ก.ย. 2569 | 42.54 ดอลลาร์ | +4.42%
- ราคาปิด 24 ก.ย. 2569 | 44.98 ดอลลาร์
- คำแนะนำ BofA Securities (28 ก.ย. 2569) | Buy | เป้า 60 ดอลลาร์ (upside ราว 33%)
- คาดการณ์ CAGR รายได้ของ BofA | 69% ต่อปี | ปีงบ 2569-2573
- Stretch time จากตัวถอดรหัสใหม่ | ต่ำสุด 0.02% | ต่ำกว่า 0.3% ที่ error rate 10^-4
- กำหนดติดตั้งที่ NVAQC | ปี 2570 | เชื่อมกับ GB200 NVL72 ผ่าน NVQLink
- ดีล Superion 256 ที่ประกาศ 21-24 ก.ย. | 3 ราย (SDT, NVAQC, FIU) | ไม่เปิดเผยมูลค่าทั้งหมด
- Adjusted EBITDA Q2/2569 | -120.3 ล้านดอลลาร์
- เงินสดสะสม | ราว 2.1 พันล้านดอลลาร์
- กรอบรายได้ปี 2569 | 450-460 ล้านดอลลาร์

*หมายเหตุ: บทความนี้จัดทำเพื่อให้ข้อมูลและมุมมองเชิงบรรณาธิการเท่านั้น ไม่ใช่คำแนะนำการลงทุน โปรดประเมินความเสี่ยงก่อนตัดสินใจทุกครั้ง*

## แหล่งอ้างอิง

- [IonQ to Advance Quantum Supercomputing by Bringing First QPU to NVIDIA Accelerated Quantum Research Center — IonQ](https://www.ionq.com/news/ionq-to-advance-quantum-supercomputing-by-bringing-first-qpu-to-nvidia-accelerated-quantum-research-center)
- [IonQ Superion 256 is First QPU at NVIDIA Quantum Research Center — Converge Digest](https://convergedigest.com/ionq-superion-256-nvidia-quantum-research-center/)
- [IonQ Superion 256 Heads to Nvidia Quantum Research Center — eWeek](https://www.eweek.com/news/ionq-superion-256-nvidia-quantum-research-center/)
- [Nvidia once rattled IonQ stock. Now it plans to install IonQ tech — TheStreet](https://www.thestreet.com/investing/ionq-nvidia-quantum-processor-hybrid-computing)
- [IonQ (IONQ) Just Landed Nvidia Less Than 2 Years After Jensen Huang's Comments — Yahoo Finance](https://finance.yahoo.com/technology/ai/articles/ionq-ionq-just-landed-nvidia-175356083.html)
- [IonQ plans first on-prem QPU at NVIDIA's Accelerated Quantum Research Center — Market Chameleon](https://marketchameleon.com/articles/b/2026/9/23/ionq-superion-256-nvidia-accelerated-quantum-research-center-nvaqc)
- [Why IonQ Stock Is Up Today — The Motley Fool](https://www.fool.com/investing/2026/09/23/why-ionq-stock-is-up-today/)
- [Stock Market Today, Sept. 23: IonQ Surges on Quantum Breakthrough and Nvidia Partnership — The Motley Fool](https://www.fool.com/coverage/stock-market-today/2026/09/23/stock-market-today-sept-23-ionq-surges-on-quantum-breakthrough-and-nvidia-partnership/)
- [IonQ Stock Jumps 4% on Quantum Error Correction Breakthrough — FXLeaders](https://www.fxleaders.com/news/2026/09/24/ionq-stock-jumps-4-on-quantum-error-correction-breakthrough/)
- [IonQ Superion 256 Sale to FIU: Delivery Slips to Late 2027 — FinanceFeeds](https://financefeeds.com/ionq-superion-256-fiu-sale-revenue-late-2027/)
- [IonQ's Superion 256 Platform Selected by Florida International University — Yahoo Finance](https://finance.yahoo.com/technology/ai/articles/ionq-superion-256-platform-selected-150430824.html)
- [IonQ has been on fire this month. Bank of America says buy the quantum computing stock — CNBC](https://www.cnbc.com/2026/09/28/ionq-has-been-on-fire-this-month-bank-of-america-says-buy-the-quantum-computing-stock.html)
- [Bank of America makes fresh 33% call on surging quantum stock — TheStreet](https://www.thestreet.com/investing/stocks/ionq-ionq-stock-bank-of-america-33-call-on-quantum-stock-september-2026)
- [Bank of America Initiates Coverage on IonQ (IONQ) with Buy Rating, Shares Slip Premarket — GuruFocus](https://www.gurufocus.com/news/9099608/bank-of-america-initiates-coverage-on-ionq-ionq-with-buy-rating-shares-slip-premarket)
- [IonQ Stock Wins Analyst Backing Ahead of 2027 Superion Launch — Benzinga](https://www.benzinga.com/markets/tech/26/09/62031516/ionq-stock-wins-analyst-backing-ahead-of-2027-superion-launch)
- [IonQ Lined Up 3 Superion 256 Systems With NVIDIA, FIU, and SDT — Yahoo Finance](https://finance.yahoo.com/markets/stocks/articles/ionq-lined-3-superion-256-113629960.html)
