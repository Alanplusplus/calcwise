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

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${base}/guides`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date("2026-10-20"), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/methodology`, lastModified: new Date("2026-10-20"), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/reports`, lastModified: new Date("2026-10-20"), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/reports/mortgage-affordability-by-state`, lastModified: new Date("2026-10-20"), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/embed`, lastModified: new Date("2026-10-20"), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/about`, lastModified: new Date("2026-10-20"), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date("2026-08-10"), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${base}/privacy`, lastModified: new Date("2026-10-20"), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date("2026-10-20"), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${base}/calculators/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const calculatorPages = calculators.map((calc) => ({
    url: `${base}/calculators/${calc.slug}`,
    lastModified: new Date(calc.lastUpdated),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const guidePages = guides
    .filter((g) => g.published)
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
