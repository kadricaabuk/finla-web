import { FAQS, SITE, SITE_URL } from "@/content/site";

export default function JsonLd() {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE.name,
    url: SITE_URL,
    description: SITE.description,
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "tr-TR",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const softwareApplication = {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#app`,
    name: SITE.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "iOS, Android",
    description: SITE.description,
    url: SITE_URL,
    featureList: [
      "Sohbetle e-Fatura ve e-Arşiv kesme",
      "Gelen faturaları yanıtlama",
      "KDV, tevkifat ve istisna kodları",
      "Dövizli fatura (güncel kur)",
      "Excel rapor çıktısı",
      "Face ID uygulama kilidi",
    ],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, softwareApplication, faqPage],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
