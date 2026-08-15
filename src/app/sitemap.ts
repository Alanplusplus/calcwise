import type { MetadataRoute } from "next";
import { calculators } from "@/lib/calculators";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const calculatorPages = calculators.map((calc) => ({
    url: `${base}/calculators/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...calculatorPages];
}
