import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/** İçerik değiştikçe elle güncelle — her build'de değişen tarih Google için anlamsız. */
const LAST_CONTENT_UPDATE = new Date("2026-07-12");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
