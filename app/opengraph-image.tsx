import { ImageResponse } from "next/og";
import { SITE, SITE_URL } from "@/content/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Satori woff2 desteklemediği için fontu Google Fonts'tan TTF olarak,
 * yalnızca görselde geçen karakterlerin alt kümesiyle çekiyoruz
 * (Türkçe ı/ş/ğ karakterleri için latin-ext şart).
 */
async function loadGoogleFont(weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/,
  );
  if (!resource) throw new Error("font url not found in css");
  const res = await fetch(resource[1]);
  if (!res.ok) throw new Error(`font fetch failed: ${res.status}`);
  return res.arrayBuffer();
}

export default async function OgImage() {
  const domain = SITE_URL.replace("https://www.", "");
  const badges = ["GİB uyumlu", "e-Fatura & e-Arşiv", "KVKK uyumlu"];
  const text = `${SITE.name}${SITE.tagline}${domain}${badges.join("")}`;

  const [bold, medium] = await Promise.all([
    loadGoogleFont(700, text),
    loadGoogleFont(500, text),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(10,10,10,0.08) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          padding: "72px 80px",
          fontFamily: "Inter",
          color: "#0A0A0A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "#0A0A0A",
              color: "#ffffff",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            f
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
            {SITE.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: -2.5,
            }}
          >
            {SITE.tagline}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {badges.map((b) => (
              <div
                key={b}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 999,
                  border: "1.5px solid #E7E7E4",
                  backgroundColor: "#FAFAFA",
                  fontSize: 22,
                  fontWeight: 500,
                  color: "#67675F",
                }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 26, fontWeight: 500, color: "#9C9C96" }}>
          {domain}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: bold, weight: 700, style: "normal" },
        { name: "Inter", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
