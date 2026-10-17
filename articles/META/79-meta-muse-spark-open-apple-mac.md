---
title: Meta ปล่อยโมเดลเปิด Muse Spark Open 816 พันล้านพารามิเตอร์ จับมือ Apple รันบน Mac Studio — คำถามคือแจกของดีแล้วจะเก็บเงินจากตรงไหน
cat: เทคโนโลยี
type: news
agent: hanako
author: ทีมข่าว PixelVest
date: "2026-10-17"
syms: [META]
tags: [Muse Spark Open, Open-weight, Apple, Mac Studio, งบไตรมาส 3]
excerpt: Meta เปิดตัว Muse Spark Open โมเดล AI แบบเปิดน้ำหนักขนาด 816 พันล้านพารามิเตอร์เมื่อ 15 ต.ค. 2569 พร้อมจับมือคู่แข่งเก่าอย่าง Apple ให้รันบนเครื่อง Mac Studio ได้ แจกจ่ายผ่านคลาวด์ใหญ่ทั้งสามเจ้า แต่ตัวเลขประสิทธิภาพยังเป็นผลทดสอบของ Meta เอง และเกิดขึ้นเพียง 6 วันก่อนงบไตรมาส 3 ที่ตลาดรอดูเรื่องงบลงทุน
read: 6
rank: 79
---

Meta Platforms เปิดตัว Muse Spark Open เมื่อวันที่ 15 ต.ค. 2569 เป็นโมเดลแบบเปิดน้ำหนัก (open-weight คือเปิดให้ดาวน์โหลดค่าพารามิเตอร์ของโมเดลไปรันเองได้ ต่างจากโมเดลปิดที่ต้องเรียกใช้ผ่านเซิร์ฟเวอร์ของบริษัทเท่านั้น) ขนาดราว 816 พันล้านพารามิเตอร์ โดย Meta เรียกว่าเป็นโมเดลเปิดน้ำหนักของสหรัฐฯ ที่ทำได้ดีที่สุดจนถึงขณะนี้

ที่ทำให้ข่าวนี้ต่างจากการปล่อยโมเดลทั่วไปคือคู่หูที่มาด้วย Meta ทำงานร่วมกับ Apple ให้โมเดลขนาดนี้รันบนเครื่องตั้งโต๊ะ Mac Studio ได้ ทั้งที่สองบริษัทนี้มีเรื่องขัดแย้งกันมากกว่าร่วมมือกันมาหลายปี และทั้งหมดเกิดขึ้นเพียง 6 วันก่อน Meta ประกาศงบไตรมาส 3/2569 ในวันที่ 21 ต.ค.

## โมเดลตัวนี้คืออะไร และทำไมขนาดถึงเป็นประเด็น

Muse Spark Open ใช้สถาปัตยกรรมแบบ mixture-of-experts (MoE คือแบ่งโมเดลเป็น "ผู้เชี่ยวชาญ" ย่อยหลายชุด แล้วเรียกใช้เพียงบางชุดต่อการประมวลผลหนึ่งครั้ง ทำให้โมเดลใหญ่แต่ใช้พลังประมวลผลจริงน้อยลง) จากพารามิเตอร์รวม 816 พันล้าน ใช้งานจริงราว 42 พันล้านต่อหนึ่งโทเคน มี 256 ผู้เชี่ยวชาญต่อชั้นและเลือกใช้ 8 ตัวต่อโทเคน รองรับบริบทยาว 1 ล้านโทเคน รับข้อมูลได้ทั้งข้อความ ภาพ เสียง และวิดีโอ แต่ตอบกลับเป็นข้อความ

ช่องทางแจกจ่ายกว้างผิดปกติ น้ำหนักโมเดลดาวน์โหลดได้บน Hugging Face, Amazon SageMaker AI, Google Cloud Model Garden และ Microsoft Foundry หรือเรียกใช้ผ่านผู้ให้บริการ API อย่าง Baseten, Fireworks AI, Groq, Modal, Nebius, OpenRouter และ Together AI มีให้เลือกทั้งรูปแบบ BF16 และ NVFP4 (รูปแบบตัวเลขความแม่นยำต่ำที่ออกแบบมาให้ประหยัดหน่วยความจำบนชิป Nvidia รุ่นใหม่)

## ดีลกับ Apple: รันโมเดลระดับแนวหน้าบนโต๊ะทำงานได้จริง แต่ไม่ถูก

ฝั่ง Apple ใช้เฟรมเวิร์ก MLX กระจายงานข้ามเครื่อง Mac Studio 2-4 เครื่องที่ต่อกันผ่าน Thunderbolt 5 และ RDMA (การส่งข้อมูลระหว่างหน่วยความจำของเครื่องโดยตรงโดยไม่ผ่านซีพียู) โดยรันได้บน Mac Studio ชิป M5 Ultra หน่วยความจำ 512GB สองเครื่อง หรือ 256GB สี่เครื่อง ซึ่งคิดเป็นหน่วยความจำรวมราว 1 เทราไบต์เท่ากัน รายงานระบุว่า Apple วัดความเร็วได้มากกว่า 36 โทเคนต่อวินาทีบน Mac Studio สี่เครื่อง

Alexandr Wang หัวหน้าฝ่าย AI ของ Meta ระบุว่าสองบริษัททำงานร่วมกันมาหลายเดือน และ John Ternus ซีอีโอของ Apple ก็โพสต์ชื่นชมผลงานบน X

ข้อสังเกตเรื่องต้นทุนคือ Mac Studio ชิป M5 Ultra หน่วยความจำ 256GB เริ่มต้นที่ 10,799 ดอลลาร์ต่อเครื่อง ชุดสี่เครื่องจึงเริ่มที่ราว 43,000 ดอลลาร์ นี่จึงเป็นเครื่องมือของนักพัฒนาและองค์กร ไม่ใช่ของผู้ใช้ทั่วไป และ Macworld ก็เตือนไว้ชัดว่าแอป Muse และเอเจนต์ Muse ที่ผู้บริโภคใช้ยังรันบนคลาวด์ของ Meta ทั้งหมด สิ่งที่รันบน Mac ได้คือโมเดลเปิดน้ำหนักเท่านั้น

## มุมบวก: Meta กำลังซื้อ "ที่ยืน" ในระบบนิเวศนักพัฒนา

เรามองว่าจุดที่น่าสนใจกว่าตัวเลขพารามิเตอร์คือรายชื่อช่องทางแจกจ่าย การที่โมเดลขึ้นพร้อมกันบนคลาวด์ของ Amazon, Google และ Microsoft แปลว่าองค์กรที่ใช้คลาวด์เจ้าไหนอยู่ก็เข้าถึงโมเดลของ Meta ได้ทันที ซึ่งต่อยอดตรงกับหน่วยธุรกิจ Meta Enterprise Platform ที่เพิ่งตั้งเมื่อปลาย ก.ย. ภายใต้การนำของ CJ Desai

ส่วนดีลกับ Apple มีความหมายเชิงสัญลักษณ์ไม่น้อย Meta ไม่มีฮาร์ดแวร์คอมพิวเตอร์ของตัวเอง การได้ Apple ช่วยปรับแต่งให้รันบน Mac จึงเป็นการเข้าถึงฐานนักพัฒนาที่ใช้ Mac โดยไม่ต้องลงทุนเอง หากนักพัฒนาสร้างแอปบนโมเดลตระกูล Muse มากขึ้น นั่นเป็นตัวแปรที่หนุนให้มาตรฐานของ Meta กลายเป็นค่าเริ่มต้นของอุตสาหกรรม แบบเดียวกับที่ Llama เคยทำได้ในช่วงแรก

## มุมลบ: ตัวเลขยังพิสูจน์ไม่ได้ และคำถามเรื่องรายได้หนักขึ้น

ประการแรก คำอ้างว่าเป็นโมเดลเปิดของสหรัฐฯ ที่ดีที่สุดมาจากผลทดสอบของ Meta เอง ยังไม่มีการตรวจสอบโดยอิสระ และ Meta ระบุว่าโมเดลผ่านเกณฑ์การปล่อยตาม Superintelligence Scaling Framework ของบริษัท แต่รายงานประเมินฉบับเต็มยังไม่ออก

ประการที่สอง ใบอนุญาต Muse Model License อนุญาตใช้เชิงพาณิชย์ได้ "แบบจำกัด" แต่ Meta ยังไม่เผยแพร่เงื่อนไขเชิงพาณิชย์อย่างละเอียด องค์กรที่จะนำไปใช้จริงจึงยังประเมินความเสี่ยงทางกฎหมายได้ไม่ครบ

ประการที่สาม ซึ่งเรามองว่าสำคัญที่สุดสำหรับผู้ถือหุ้น คือความขัดกันในตัวเองของกลยุทธ์ Meta คิดค่าบริการ Muse Spark 1.1 ผ่าน API ที่ 1.25 ดอลลาร์ต่อล้านโทเคนขาเข้า และ 4.25 ดอลลาร์ต่อล้านโทเคนขาออก การแจกโมเดลรุ่นเปิดที่ผู้ให้บริการรายอื่นนำไปขายต่อได้ จึงเป็นตัวแปรที่อาจกดอำนาจกำหนดราคาของ API ตัวเอง ในช่วงที่บริษัทใช้งบลงทุนปี 2569 สูงถึง 130-145 พันล้านดอลลาร์ และกระแสเงินสดอิสระไตรมาส 2 เหลือเพียง 784 ล้านดอลลาร์

## ราคาหุ้นยังไม่ตอบสนองชัด สายตาตลาดอยู่ที่ 21 ต.ค.

ณ วันที่เขียน ยังไม่มีข้อมูลยืนยันว่าหุ้น META ตอบสนองต่อข่าวนี้อย่างมีนัยสำคัญ หน้าข่าวของ Reuters แสดงราคาหุ้นลบเพียง 0.11% ณ เวลาที่เผยแพร่ ซึ่งเป็นภาพ ณ ขณะหนึ่ง ไม่ใช่ผลทั้งวัน ก่อนหน้านั้น Seeking Alpha รายงานราคาปิดราว 763 ดอลลาร์ในวันที่ 13 ต.ค.

ตัวชี้ขาดที่แท้จริงคืองบไตรมาส 3 ที่ Meta ยืนยันว่าจะประกาศหลังตลาดปิดวันพุธที่ 21 ต.ค. 2569 และแถลงผลเวลา 16:30 น. ตามเวลานิวยอร์ก หรือราว 03:30 น. เช้าวันพฤหัสที่ 22 ต.ค. ตามเวลาไทย (มีบางแหล่งระบุวันที่ 28 ต.ค. แต่เอกสารทางการของบริษัทระบุ 21 ต.ค.) บริษัทให้กรอบรายได้ไตรมาสนี้ไว้ที่ 61-64 พันล้านดอลลาร์ ขณะที่ประมาณการของนักวิเคราะห์อยู่ราว 63.3 พันล้านดอลลาร์ ส่วนกำไรต่อหุ้นคาดการณ์ราว 6.50-6.76 ดอลลาร์แล้วแต่แหล่ง ประเด็นที่ถูกยกขึ้นมาคือค่าใช้จ่ายทางกฎหมายราว 10 พันล้านดอลลาร์ในไตรมาสนี้ และแนวทางงบลงทุนปี 2570 ที่ยังไม่ชัด

ฝั่งความเสี่ยงนอกงบ ศาลเลือกตั้งสูงสุดของบราซิล (TSE) ให้เวลา Meta 48 ชั่วโมงชี้แจงข้อกล่าวหาของทีมหาเสียงประธานาธิบดี Lula ว่า Instagram จำกัดการเข้าถึงโพสต์ก่อนการเลือกตั้งรอบสองวันที่ 25 ต.ค. ขณะที่ Meta ปฏิเสธว่าไม่ได้เข้าข้างฝ่ายใด

> ข้อสังเกตของเราคือ Muse Spark Open ตอบคำถามว่า Meta สร้างโมเดลระดับแนวหน้าได้หรือไม่ได้ดีขึ้น แต่ทำให้อีกคำถามหนักขึ้น คือเงินลงทุนหลักแสนล้านดอลลาร์จะกลับมาเป็นรายได้ทางไหน เมื่อบริษัทเลือกแจกโมเดลที่ดีที่สุดชิ้นหนึ่งของตัวเองให้คนอื่นนำไปใช้ได้
> — ทีมข่าว PixelVest

**สรุป:** Meta ปล่อย Muse Spark Open ขนาด 816 พันล้านพารามิเตอร์ แจกผ่านคลาวด์ใหญ่ทั้งสามเจ้า และจับมือ Apple ให้รันบน Mac Studio ได้ ถือเป็นการขยายฐานนักพัฒนาและหนุนแผนธุรกิจองค์กรที่ชัดเจน แต่ผลทดสอบยังเป็นของ Meta เอง เงื่อนไขใบอนุญาตยังไม่ครบ และการแจกโมเดลเปิดอาจกดอำนาจกำหนดราคา API ของตัวเอง ตัวชี้ขาดถัดไปอยู่ที่งบวันที่ 21 ต.ค. ว่าผู้บริหารจะอธิบายเส้นทางจากงบลงทุนไปสู่รายได้ได้ชัดแค่ไหน

## ตัวเลขสำคัญ

- พารามิเตอร์รวม Muse Spark Open | ราว 816 พันล้าน | ใช้งานจริงราว 42 พันล้านต่อโทเคน
- บริบทสูงสุด | 1 ล้านโทเคน | รับข้อความ ภาพ เสียง วิดีโอ
- ฮาร์ดแวร์ขั้นต่ำบน Mac | Mac Studio M5 Ultra 512GB x2 หรือ 256GB x4 | หน่วยความจำรวมราว 1TB
- ราคา Mac Studio M5 Ultra 256GB | เริ่มต้น 10,799 ดอลลาร์ต่อเครื่อง
- ความเร็วที่ Apple วัดได้ | มากกว่า 36 โทเคน/วินาที | บน Mac Studio 4 เครื่อง
- ค่าบริการ API Muse Spark 1.1 | 1.25 / 4.25 ดอลลาร์ต่อล้านโทเคน | ขาเข้า / ขาออก
- กรอบรายได้ Q3/2569 ที่บริษัทให้ไว้ | 61-64 พันล้านดอลลาร์ | ประมาณการตลาดราว 63.3 พันล้าน
- งบลงทุนทั้งปี 2569 | 130-145 พันล้านดอลลาร์ | FCF Q2 เหลือ 784 ล้านดอลลาร์

*หมายเหตุ: บทความนี้จัดทำเพื่อให้ข้อมูลและมุมมองเชิงบรรณาธิการเท่านั้น ไม่ใช่คำแนะนำการลงทุน โปรดประเมินความเสี่ยงก่อนตัดสินใจทุกครั้ง*

## แหล่งอ้างอิง

- [Apple and Meta team up to make Muse AI model run on Mac computers — CNBC](https://www.cnbc.com/2026/10/15/apple-meta-partner-ai.html)
- [Meta launches an open-weight AI model that runs on Macs — TechCrunch](https://techcrunch.com/2026/10/15/meta-launches-an-open-weight-model-that-runs-on-macs/)
- [Meta releases open-weight Muse Spark model for coding, agentic tasks — Reuters via Investing.com](https://www.investing.com/news/stock-market-news/meta-releases-openweight-muse-spark-model-for-coding-agentic-tasks-4952713)
- [Meta unveils Muse Spark Open, the new top U.S. open weights model — VentureBeat](https://venturebeat.com/technology/meta-unveils-muse-spark-open-the-new-top-u-s-open-weights-model-and-it-runs-on-two-paired-mac-desktops)
- [Welcome Muse Spark Open — Hugging Face](https://huggingface.co/blog/meta-muse-spark-open)
- [Meta Releases Muse Spark Open: 816B Open-Weight MoE With 1M Context — MarkTechPost](https://www.marktechpost.com/2026/10/15/meta-muse-spark-open-816b-open-weight-model/)
- [Meta Releases Muse Spark Open, an 816B-Parameter Open-Weight Model — Technology.org](https://www.technology.org/2026/10/16/meta-muse-spark-open-816b-open-weight-mac-studio/)
- [Meta and Apple Bring Muse Spark Open AI Model to Mac Studio — MacRumors](https://www.macrumors.com/2026/10/15/meta-muse-spark-open-mac-studio/)
- [No, Meta's Muse will not run on your Mac — Macworld](https://www.macworld.com/article/3262041/no-metas-muse-will-not-run-on-your-mac.html)
- [Meta Launches Muse Spark 1.1: A Lower-Cost AI Model for Coding Agents — eWeek](https://www.eweek.com/news/meta-muse-spark-ai-coding/)
- [Meta to Announce Third Quarter 2026 Results — Meta Investor Relations](https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-to-Announce-Third-Quarter-2026-Results/default.aspx)
- [Meta Platforms (META) Projected to Announce Quarterly Earnings on Wednesday — MarketBeat](https://www.marketbeat.com/instant-alerts/upcoming-meta-platforms-meta-projected-to-announce-quarterly-earnings-on-wednesday-2026-10-14/)
- [Meta earnings preview: Can 33% ad growth outrun a $145 billion capex bill — tastylive](https://www.tastylive.com/news-insights/meta-earnings-preview-can-33-ad-growth-outrun-a-145-billion-capex-bill-)
- [Meta Stock: The Muse Rally Has Priced In The Good News Before Q3 — Seeking Alpha](https://seekingalpha.com/article/4954281-meta-the-muse-rally-has-priced-in-the-good-news-before-q3)
- [Brazil's Lula accuses Meta of election interference — The Express Tribune](https://tribune.com.pk/story/2634278/brazils-lula-accuses-meta-of-election-interference)
