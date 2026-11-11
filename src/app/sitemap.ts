import type { MetadataRoute } from "next";
import { calculators, categories } from "@/lib/calculators";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";
import { mortgageVariants } from "@/lib/variants/mortgage";
import { savingsGoalVariants } from "@/lib/variants/savings-goal";
import { retirementVariants } from "@/lib/variants/retirement";
import { debtPayoffVariants } from "@/lib/variants/debt-payoff";
import { compoundInterestVariants } from "@/lib/variants/compound-interest";
import { inflationVariants } from "@/lib/variants/inflation";
import { roiVariants } from "@/lib/variants/roi";
import { autoLoanVariants } from "@/lib/variants/auto-loan";
import { studentLoanVariants } from "@/lib/variants/student-loan";
import { creditCardPayoffVariants } from "@/lib/variants/credit-card-payoff";
import { cdVariants } from "@/lib/variants/cd-calculator";
import { homeAffordabilityVariants } from "@/lib/variants/home-affordability";
import { dividendVariants } from "@/lib/variants/dividend";
import { tipCalculatorVariants } from "@/lib/variants/tip-calculator";
import type { CalculatorVariant } from "@/lib/variants/types";

function variantPages(base: string, calcSlug: string, variants: CalculatorVariant[]) {
  return variants.map((v) => ({
    url: `${base}/calculators/${calcSlug}/${v.slug}`,
    lastModified: new Date(v.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}

// ISO date strings sort lexicographically, so the newest one is the max.
function latestDate(dates: string[]): Date {
  return new Date(dates.reduce((a, b) => (a > b ? a : b)));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const publishedGuides = guides.filter((g) => g.published);
  // Hub pages change only when the pages they list change, so derive their
  // lastModified from those pages instead of stamping every build with "now".
  const guidesUpdated = latestDate(publishedGuides.map((g) => g.lastUpdated));
  const homeUpdated = latestDate([
    ...calculators.map((c) => c.lastUpdated),
    ...publishedGuides.map((g) => g.lastUpdated),
  ]);

  const staticPages = [
    { url: base, lastModified: homeUpdated, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${base}/guides`, lastModified: guidesUpdated, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date("2026-10-20"), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/methodology`, lastModified: new Date("2026-10-20"), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/reports`, lastModified: new Date("2026-11-11"), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/reports/mortgage-affordability-by-state`, lastModified: new Date("2026-10-29"), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/reports/rent-vs-buy-by-state`, lastModified: new Date("2026-11-04"), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/reports/housing-cost-burden-by-state`, lastModified: new Date("2026-11-11"), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/embed`, lastModified: new Date("2026-10-20"), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/about`, lastModified: new Date("2026-11-09"), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date("2026-08-10"), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${base}/privacy`, lastModified: new Date("2026-11-09"), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date("2026-10-20"), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${base}/calculators/category/${cat.slug}`,
    lastModified: latestDate(
      calculators.filter((c) => c.category === cat.slug).map((c) => c.lastUpdated),
    ),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const calculatorPages = calculators.map((calc) => ({
    url: `${base}/calculators/${calc.slug}`,
    lastModified: new Date(calc.lastUpdated),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const guidePages = publishedGuides
    .map((g) => ({
      url: `${base}/guides/${g.slug}`,
      lastModified: new Date(g.lastUpdated),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

  return [
    ...staticPages,
    ...categoryPages,
    ...calculatorPages,
    ...guidePages,
    ...variantPages(base, "mortgage", mortgageVariants),
    ...variantPages(base, "savings-goal", savingsGoalVariants),
    ...variantPages(base, "retirement", retirementVariants),
    ...variantPages(base, "debt-payoff", debtPayoffVariants),
    ...variantPages(base, "compound-interest", compoundInterestVariants),
    ...variantPages(base, "inflation", inflationVariants),
    ...variantPages(base, "roi", roiVariants),
    ...variantPages(base, "auto-loan", autoLoanVariants),
    ...variantPages(base, "student-loan", studentLoanVariants),
    ...variantPages(base, "credit-card-payoff", creditCardPayoffVariants),
    ...variantPages(base, "cd-calculator", cdVariants),
    ...variantPages(base, "home-affordability", homeAffordabilityVariants),
    ...variantPages(base, "dividend", dividendVariants),
    ...variantPages(base, "tip-calculator", tipCalculatorVariants),
  ];
}
