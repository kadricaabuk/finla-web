#!/usr/bin/env node
/**
 * Finla LinkedIn günlük paylaşım görseli üretici — çoklu şablon, editoryal/ajans kalitesinde.
 *
 * Amaç: her içerik sütunu (problem / özellik / build-in-public / kullanım
 * senaryosu / sektör-veri) kendi görsel kimliğine sahip olsun; hepsi aynı
 * "web sayfası OG kartı" gibi görünmesin, kurumsal bir marka ajansının
 * elinden çıkmış tutarlı bir sistem gibi dursun. Ortak "chrome" (köşe
 * kayıt işaretleri, ince grain doku, numaralı kicker etiketi, alt bilgi
 * satırı) tüm şablonlarda aynı; her şablonun kompozisyonu farklı.
 *
 * Kullanım (şablona göre farklı argümanlar):
 *
 *   --template problem   --kicker "PROBLEM" --headline "..."
 *   --template feature   --kicker "ÖZELLİK DERİNLİĞİ" --headline "..." \
 *                         --diagram-from "500 dolar" --diagram-to "16.750 TL"
 *   --template build     --kicker "BUILD IN PUBLIC" --headline "..." --meta "gün 47"
 *   --template usecase   --kicker "KULLANIM SENARYOSU" --quote "..." --author "Freelance grafik tasarımcı"
 *   --template data      --kicker "SEKTÖR" --stat "3 gün" --headline "..."
 *
 *   --out public/og/finla-2026-08-28.png   (her zaman 1200x630)
 */
import { chromium } from "playwright";
import { readFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function arg(name, fallback = "") {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1 || !process.argv[i + 1]) return fallback;
  return process.argv[i + 1];
}

const template = arg("template", "problem");
const kicker = arg("kicker", "FİNLA");
const headline = arg("headline", "");
const stat = arg("stat", "");
const quote = arg("quote", "");
const author = arg("author", "");
const meta = arg("meta", "");
const diagramFrom = arg("diagram-from", "");
const diagramTo = arg("diagram-to", "");
const photoArg = arg("photo", "");
const outPath = resolve(arg("out", "public/og/finla-output.png"));
const domain = "heyfinla.com";

const TEMPLATE_INDEX = { problem: 1, feature: 2, build: 3, usecase: 4, data: 5 };
const index = parseInt(arg("index", String(TEMPLATE_INDEX[template] || 1)), 10);
const indexStr = String(index).padStart(2, "0");

function toDataUri(path, mime) {
  const buf = readFileSync(path);
  return `data:${mime};base64,${buf.toString("base64")}`;
}
const fontRegular = toDataUri(resolve(__dirname, "fonts/Inter-Regular.woff2"), "font/woff2");
const fontBold = toDataUri(resolve(__dirname, "fonts/Inter-Bold.woff2"), "font/woff2");
const fontExtraBold = toDataUri(resolve(__dirname, "fonts/Inter-ExtraBold.woff2"), "font/woff2");

function mimeFor(path) {
  const ext = path.toLowerCase().split(".").pop();
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  return "image/jpeg";
}

// Fotoğraf arka planı — verilirse, şablonun düz renk zemini yerine gerçek bir
// stok fotoğraf + siyah/beyaz duotone + şablona özgü degrade overlay kullanılır.
// Fotoğraf yoksa (örn. o gün tarayıcı/indirme adımı başarısız olduysa) şablon
// sorunsuzca düz renk zeminine geri döner — bu yüzden her template hem
// fotoğraflı hem fotoğrafsız çalışabilir durumda kalmalı.
const photoUri = photoArg && existsSync(photoArg) ? toDataUri(photoArg, mimeFor(photoArg)) : null;

function photoLayer(overlayGradient) {
  if (!photoUri) return "";
  return `
    <div class="photo-bg" style="background-image:url('${photoUri}')"></div>
    <div class="photo-overlay" style="background:${overlayGradient}"></div>`;
}

// İnce film-grain dokusu — düz dijital rengi kağıt/baskı hissi verecek kadar kırar.
// Çok düşük opaklıkla (multiply/overlay blend) kullanılıyor, göze çarpmaz ama
// yüzeye kurumsal bir doku katar.
const GRAIN_SVG = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`,
).toString("base64")}`;

const BASE_CSS = `
  @font-face { font-family: 'Inter'; src: url('${fontRegular}') format('woff2'); font-weight: 400; }
  @font-face { font-family: 'Inter'; src: url('${fontBold}') format('woff2'); font-weight: 700; }
  @font-face { font-family: 'Inter'; src: url('${fontExtraBold}') format('woff2'); font-weight: 800; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    font-family: 'Inter', sans-serif;
    position: relative;
    font-feature-settings: "tnum" 1, "cv05" 1;
  }
  .wordmark { font-size: 25px; font-weight: 800; letter-spacing: -0.3px; }

  .grain {
    position: absolute; inset: 0; background-image: url('${GRAIN_SVG}');
    background-size: 180px 180px; mix-blend-mode: overlay; opacity: 0.5;
    pointer-events: none;
  }

  .photo-bg {
    position: absolute; inset: 0; background-size: cover; background-position: center;
    filter: grayscale(100%) contrast(1.05);
  }
  .photo-overlay { position: absolute; inset: 0; }

  .reg { position: absolute; width: 11px; height: 11px; opacity: 0.32; }
  .reg::before, .reg::after { content: ""; position: absolute; background: var(--ink); }
  .reg::before { width: 11px; height: 1px; top: 5px; left: 0; }
  .reg::after { width: 1px; height: 11px; left: 5px; top: 0; }
  .reg.tl { top: 30px; left: 30px; }
  .reg.tr { top: 30px; right: 30px; }
  .reg.bl { bottom: 30px; left: 30px; }
  .reg.br { bottom: 30px; right: 30px; }

  .frame {
    position: relative; z-index: 1;
    width: 100%; height: 100%;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 58px 64px 40px 64px;
  }

  .kicker {
    display: flex; align-items: baseline; gap: 10px;
    font-size: 17px; font-weight: 700; letter-spacing: 2.2px; text-transform: uppercase;
  }
  .kicker .idx { opacity: 0.42; font-weight: 700; }
  .kicker .dash { opacity: 0.3; }

  .footer-row {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 18px; border-top: 1px solid var(--hair);
    font-size: 18px; font-weight: 600; letter-spacing: 0.2px;
  }
  .footer-row .pager { opacity: 0.55; letter-spacing: 1px; }
`;

function regMarks() {
  return `<div class="reg tl"></div><div class="reg tr"></div><div class="reg bl"></div><div class="reg br"></div>`;
}

function footer(color, mutedColor) {
  return `<div class="footer-row" style="color:${color};--hair:${mutedColor}22">
    <div>${domain}</div>
    <div class="pager">${indexStr} / 05</div>
  </div>`;
}

function kickerTag(label) {
  return `<div class="kicker"><span class="idx">${indexStr}</span><span class="dash">—</span>${label}</div>`;
}

function fitFontSize(text, { max = 76, min = 38, softLimit = 40 } = {}) {
  const len = text.length;
  if (len <= softLimit) return max;
  const over = len - softLimit;
  const size = max - over * 0.85;
  return Math.max(min, Math.round(size));
}

// ---------------------------------------------------------------------
// 1) PROBLEM — siyah zemin, sol kenarda ince dikey çizgi, manifesto tipografisi.
// ---------------------------------------------------------------------
function templateProblem() {
  const size = fitFontSize(headline, { max: 64, min: 38, softLimit: 55 });
  return `
  <style>
    ${BASE_CSS}
    body { background: #0A0A0A; color: #ffffff; --ink: #ffffff; }
    .kicker { color: #8F8F87; }
    .content { display: flex; gap: 28px; align-items: flex-start; }
    .bar { width: 4px; border-radius: 2px; background: linear-gradient(180deg,#fff,#4a4a45); flex-shrink: 0; margin-top: 10px; }
    .headline {
      font-weight: 800; line-height: 1.08; letter-spacing: -1.6px;
      max-width: 940px;
    }
  </style>
  <body>
    ${photoLayer("linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.6) 45%, rgba(10,10,10,0.96) 100%)")}
    <div class="grain"></div>
    ${regMarks()}
    <div class="frame">
      <div class="brand"><div class="wordmark">finla</div></div>
      <div>
        ${kickerTag(kicker)}
        <div class="content" style="margin-top:20px">
          <div class="bar" style="height:${Math.round(size * 1.35)}px"></div>
          <div class="headline" style="font-size:${size}px">${headline}</div>
        </div>
      </div>
      ${footer("#67675F", "#67675F")}
    </div>
  </body>`;
}

// ---------------------------------------------------------------------
// 2) FEATURE — beyaz zemin, kartlaşmış "girdi → çıktı" denklemi, yumuşak gölge.
// ---------------------------------------------------------------------
function templateFeature() {
  const size = fitFontSize(headline, { max: 44, min: 28, softLimit: 60 });
  const hasDiagram = diagramFrom && diagramTo;
  return `
  <style>
    ${BASE_CSS}
    body { background: #FBFBF9; color: #0A0A0A; --ink: #0A0A0A; }
    .kicker { color: #67675F; }
    .diagram {
      display: flex; align-items: center; justify-content: center; gap: 26px;
      background: #ffffff; border: 1px solid #ECECE7; border-radius: 18px;
      padding: 40px 52px; margin: 26px 0 32px 0;
      box-shadow: 0 24px 48px -28px rgba(10,10,10,0.18);
    }
    .diagram .box {
      font-size: 38px; font-weight: 800; letter-spacing: -0.5px;
      padding: 16px 28px; border-radius: 12px; font-variant-numeric: tabular-nums;
    }
    .diagram .from { background: #F1F1EC; color: #5B5B54; }
    .diagram .to { background: #0A0A0A; color: #ffffff; }
    .diagram .arrow { width: 40px; height: 1.5px; background: #D2D2CA; position: relative; }
    .diagram .arrow::after {
      content: ""; position: absolute; right: -1px; top: -4px;
      width: 9px; height: 9px; border-right: 1.5px solid #D2D2CA; border-top: 1.5px solid #D2D2CA;
      transform: rotate(45deg);
    }
    .headline { font-weight: 700; line-height: 1.28; letter-spacing: -0.6px; max-width: 960px; }
  </style>
  <body>
    ${photoLayer("linear-gradient(180deg, rgba(251,251,249,0.35) 0%, rgba(251,251,249,0.88) 42%, rgba(251,251,249,0.98) 100%)")}
    <div class="grain"></div>
    ${regMarks()}
    <div class="frame">
      <div class="brand"><div class="wordmark">finla</div></div>
      <div>
        ${kickerTag(kicker)}
        ${hasDiagram ? `
        <div class="diagram">
          <div class="box from">${diagramFrom}</div>
          <div class="arrow"></div>
          <div class="box to">${diagramTo}</div>
        </div>` : `<div style="height:20px"></div>`}
        <div class="headline" style="font-size:${size}px">${headline}</div>
      </div>
      ${footer("#9C9C96", "#67675F")}
    </div>
  </body>`;
}

// ---------------------------------------------------------------------
// 3) BUILD-IN-PUBLIC — sahte terminal penceresi, satır numaralı kod bloğu hissi.
// ---------------------------------------------------------------------
function templateBuild() {
  const size = fitFontSize(headline, { max: 38, min: 24, softLimit: 70 });
  return `
  <style>
    ${BASE_CSS}
    body { background: #0D0D0C; color: #E9E9E4; --ink: #E9E9E4; }
    .kicker { color: #7A7A72; }
    .panel {
      background: #161614; border: 1px solid #292925; border-radius: 14px;
      margin-top: 24px; overflow: hidden;
      box-shadow: 0 30px 60px -30px rgba(0,0,0,0.6);
    }
    .titlebar {
      display: flex; align-items: center; gap: 8px;
      padding: 16px 20px; border-bottom: 1px solid #232320;
    }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: #2C2C28; }
    .titlebar .path { margin-left: 10px; font-size: 15px; color: #59594F; letter-spacing: 0.3px; }
    .body-pad { display: flex; padding: 34px 40px; gap: 22px; }
    .lineno { color: #3E3E38; font-size: 20px; user-select: none; }
    .code { font-family: 'Inter', sans-serif; }
    .meta { font-size: 16px; color: #6F6F68; margin-bottom: 14px; letter-spacing: 1px; text-transform: uppercase; font-weight: 700; }
    .headline {
      font-weight: 600; line-height: 1.4; letter-spacing: -0.2px; color: #F3F3EF;
    }
    .prompt { color: #7CE6A6; font-weight: 700; }
  </style>
  <body>
    ${photoLayer("linear-gradient(180deg, rgba(13,13,12,0.55) 0%, rgba(13,13,12,0.88) 100%)")}
    <div class="grain"></div>
    ${regMarks()}
    <div class="frame">
      <div class="brand"><div class="wordmark">finla</div></div>
      <div>
        ${kickerTag(kicker)}
        <div class="panel">
          <div class="titlebar"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="path">build-log${meta ? " — " + meta : ""}</div></div>
          <div class="body-pad">
            <div class="lineno">01</div>
            <div class="code">
              <div class="headline" style="font-size:${size}px"><span class="prompt">$</span> ${headline}</div>
            </div>
          </div>
        </div>
      </div>
      ${footer("#6F6F68", "#6F6F68")}
    </div>
  </body>`;
}

// ---------------------------------------------------------------------
// 4) KULLANIM SENARYOSU — büyük ince tırnak, birinci ağızdan alıntı kartı.
// ---------------------------------------------------------------------
function templateUsecase() {
  const size = fitFontSize(quote, { max: 50, min: 30, softLimit: 55 });
  // Fotoğraf varken zemin koyulaşıyor (overlay siyaha döner) — bu yüzden
  // metin renkleri fotoğraflı/fotoğrafsız moda göre değişir.
  const ink = photoUri
    ? { bg: "#0A0A0A", text: "#ffffff", kicker: "#D8D8D2", quotemark: "rgba(255,255,255,0.16)", author: "#F0F0EC", avatar: "#ffffff", hair: "#67675F" }
    : { bg: "#ffffff", text: "#0A0A0A", kicker: "#67675F", quotemark: "#EDEDE8", author: "#3D3D38", avatar: "#0A0A0A", hair: "#67675F" };
  return `
  <style>
    ${BASE_CSS}
    body { background: ${ink.bg}; color: ${ink.text}; --ink: ${ink.text}; }
    .kicker { color: ${ink.kicker}; }
    .quotemark {
      font-size: 110px; font-weight: 800; color: ${ink.quotemark}; line-height: 0.4;
      margin: 22px 0 6px -4px;
    }
    .quote { font-weight: 700; line-height: 1.24; letter-spacing: -0.9px; max-width: 980px; }
    .attribution { display: flex; align-items: center; gap: 12px; margin-top: 30px; }
    .avatar { width: 34px; height: 34px; border-radius: 50%; background: ${ink.avatar}; flex-shrink: 0; }
    .author { font-size: 22px; font-weight: 600; color: ${ink.author}; }
    .author span { display: block; font-size: 16px; font-weight: 500; color: #9C9C96; margin-top: 1px; }
  </style>
  <body>
    ${photoLayer("linear-gradient(180deg, rgba(10,10,10,0.12) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.94) 100%)")}
    <div class="grain"></div>
    ${regMarks()}
    <div class="frame">
      <div class="brand"><div class="wordmark">finla</div></div>
      <div>
        ${kickerTag(kicker)}
        <div class="quotemark">&#8220;</div>
        <div class="quote" style="font-size:${size}px">${quote}</div>
        ${author ? `
        <div class="attribution">
          <div class="avatar"></div>
          <div class="author">${author}</div>
        </div>` : ""}
      </div>
      ${footer(photoUri ? "#D8D8D2" : "#9C9C96", "#67675F")}
    </div>
  </body>`;
}

// ---------------------------------------------------------------------
// 5) SEKTÖR/VERİ — dev istatistik hero, ince alt çizgi, gazete manşeti gibi.
// ---------------------------------------------------------------------
function templateData() {
  const size = fitFontSize(headline, { max: 32, min: 22, softLimit: 90 });
  return `
  <style>
    ${BASE_CSS}
    body { background: #0A0A0A; color: #ffffff; --ink: #ffffff; }
    .kicker { color: #8F8F87; }
    .stat-wrap { margin: 14px 0 26px 0; }
    .stat {
      font-size: 168px; font-weight: 800; letter-spacing: -6px; line-height: 1.22;
      background: linear-gradient(180deg, #ffffff 0%, #A9A9A0 100%);
      -webkit-background-clip: text; background-clip: text; color: transparent;
      display: inline-block;
    }
    .stat-rule { width: 84px; height: 3px; background: #3A3A35; margin-top: 6px; }
    .headline { font-weight: 500; line-height: 1.4; max-width: 880px; color: #B9B9B0; }
  </style>
  <body>
    ${photoLayer("linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.82) 55%, rgba(10,10,10,0.96) 100%)")}
    <div class="grain"></div>
    ${regMarks()}
    <div class="frame">
      <div class="brand"><div class="wordmark">finla</div></div>
      <div>
        ${kickerTag(kicker)}
        <div class="stat-wrap">
          <div class="stat">${stat}</div>
          <div class="stat-rule"></div>
        </div>
        <div class="headline" style="font-size:${size}px">${headline}</div>
      </div>
      ${footer("#67675F", "#67675F")}
    </div>
  </body>`;
}

const TEMPLATES = {
  problem: templateProblem,
  feature: templateFeature,
  build: templateBuild,
  usecase: templateUsecase,
  data: templateData,
};

if (!TEMPLATES[template]) {
  console.error(`Bilinmeyen şablon: ${template}. Geçerli: ${Object.keys(TEMPLATES).join(", ")}`);
  process.exit(1);
}

const bodyHtml = TEMPLATES[template]();
const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8" />${bodyHtml}</html>`;

function findLocalChromium() {
  const candidates = [
    process.env.PLAYWRIGHT_CHROMIUM_PATH,
    "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "/opt/pw-browsers/chromium/chrome-linux/chrome",
  ].filter(Boolean);
  for (const p of candidates) {
    try {
      if (existsSync(p)) return p;
    } catch {}
  }
  return undefined;
}

const run = async () => {
  const executablePath = findLocalChromium();
  const browser = await chromium.launch(
    executablePath ? { executablePath } : undefined,
  );
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle" });
  mkdirSync(dirname(outPath), { recursive: true });
  await page.screenshot({ path: outPath, type: "png" });
  await browser.close();
  console.log(`Görsel üretildi (${template}): ${outPath}`);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
