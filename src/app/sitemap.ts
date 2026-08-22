import type { MetadataRoute } from "next";
import { calculators, categories } from "@/lib/calculators";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";
import { mortgageVariants } from "@/lib/variants/mortgage";
import { savingsGoalVariants } from "@/lib/variants/savings-goal";
import { retirementVariants } from "@/lib/variants/retirement";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${base}/guides`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${base}/calculators/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const calculatorPages = calculators.map((calc) => ({
    url: `${base}/calculators/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const guidePages = guides
    .filter((g) => g.published)
    .map((g) => ({
      url: `${base}/guides/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

  const mortgageVariantPages = mortgageVariants.map((v) => ({
    url: `${base}/calculators/mortgage/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const savingsGoalVariantPages = savingsGoalVariants.map((v) => ({
    url: `${base}/calculators/savings-goal/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const retirementVariantPages = retirementVariants.map((v) => ({
    url: `${base}/calculators/retirement/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...calculatorPages, ...guidePages, ...mortgageVariantPages, ...savingsGoalVariantPages, ...retirementVariantPages];
}
