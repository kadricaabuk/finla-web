# finla — Landing Page

Türkiye'deki KOBİ'ler için yapay zekâ destekli, sohbet tabanlı muhasebe ve e-fatura asistanı **finla**'nın tanıtım sitesi.

## Stack

- **Next.js 15** (App Router, statik prerender)
- **React 19**
- **Tailwind CSS 3**
- TypeScript

## Kurulum

```bash
npm install
npm run dev      # http://localhost:3000
```

Prod build:

```bash
npm run build
npm run start
```

## Yapı
```
app/
  layout.tsx        # metadata (heyfinla.com), fontlar (Space Grotesk + Inter)
  page.tsx          # section kompozisyonu
  globals.css       # brand token'ları, focus ring, reduced-motion
components/
  Nav.tsx           # sticky nav + CTA
  Hero.tsx          # başlık + erken erişim CTA'sı + ChatDemo
  ChatDemo.tsx      # imza öğesi: 3 sahnelik canlı yazan sohbet demosu
  Commands.tsx      # 4 komut kartı ("Yılmaz İnşaat'a ... fatura kes" vb.)
  Showcase.tsx      # Gelen Faturalar ekranı (telefon mockup) — koyu section
  Security.tsx      # OTP/PIN giriş ekranı (telefon mockup)
  Audience.tsx      # 3 persona + konumlandırma bandı
  Footer.tsx        # kapanış CTA + footer (www.heyfinla.com)
public/mockups/     # iPhone çerçeveli uygulama ekran görüntüleri
```

## Notlar

- **ChatDemo** `prefers-reduced-motion` ayarına saygı duyar (animasyon yerine statik sahne + yavaş geçiş).
- Görseller `next/image` ile `unoptimized` servis edilir (küçük PNG setleri için optimizer'a gerek yok; hosting bağımsız çalışır).
- Ürün şu an **erken erişimde**: mağaza butonları yerine tüm CTA'lar (`Nav`, `Hero`, `Footer`) `content/site.ts` içindeki `EARLY_ACCESS_FORM_URL`'e (Google Form) gider. Lansmanla birlikte mağaza butonlarına geri dönülecek.
- Fontlar Google Fonts'tan `<link>` ile yüklenir; self-host etmek istersen `next/font/local`'a geçirebilirsin.
