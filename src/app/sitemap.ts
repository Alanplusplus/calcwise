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

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticPages = [
    { url: base, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${base}/guides`, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${base}/faq`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/about`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${base}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${base}/calculators/category/${cat.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const calculatorPages = calculators.map((calc) => ({
    url: `${base}/calculators/${calc.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const guidePages = guides
    .filter((g) => g.published)
    .map((g) => ({
      url: `${base}/guides/${g.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

  const mortgageVariantPages = mortgageVariants.map((v) => ({
    url: `${base}/calculators/mortgage/${v.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const savingsGoalVariantPages = savingsGoalVariants.map((v) => ({
    url: `${base}/calculators/savings-goal/${v.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const retirementVariantPages = retirementVariants.map((v) => ({
    url: `${base}/calculators/retirement/${v.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const debtPayoffVariantPages = debtPayoffVariants.map((v) => ({
    url: `${base}/calculators/debt-payoff/${v.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const compoundInterestVariantPages = compoundInterestVariants.map((v) => ({
    url: `${base}/calculators/compound-interest/${v.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const inflationVariantPages = inflationVariants.map((v) => ({
    url: `${base}/calculators/inflation/${v.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const roiVariantPages = roiVariants.map((v) => ({
    url: `${base}/calculators/roi/${v.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const autoLoanVariantPages = autoLoanVariants.map((v) => ({
    url: `${base}/calculators/auto-loan/${v.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const studentLoanVariantPages = studentLoanVariants.map((v) => ({
    url: `${base}/calculators/student-loan/${v.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const creditCardPayoffVariantPages = creditCardPayoffVariants.map((v) => ({
    url: `${base}/calculators/credit-card-payoff/${v.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const cdVariantPages = cdVariants.map((v) => ({
    url: `${base}/calculators/cd-calculator/${v.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...calculatorPages, ...guidePages, ...mortgageVariantPages, ...savingsGoalVariantPages, ...retirementVariantPages, ...debtPayoffVariantPages, ...compoundInterestVariantPages, ...inflationVariantPages, ...roiVariantPages, ...autoLoanVariantPages, ...studentLoanVariantPages, ...creditCardPayoffVariantPages, ...cdVariantPages];
}
