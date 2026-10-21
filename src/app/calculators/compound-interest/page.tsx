import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { CompoundInterestCalculator } from "./CompoundInterestCalculator";
import { CompoundInterestArticle } from "./CompoundInterestArticle";
import { compoundInterestVariants } from "@/lib/variants/compound-interest";

const calc = getCalculator("compound-interest")!;

const faqs = [
  {
    question: "What's a good rate of return to assume?",
    answer: "For long-term stock market planning, 7% nominal is a common conservative default in this calculator. S&P 500 10-year total returns were near 15.5% as of September 2026 (S&P Dow Jones Indices), but future results vary. For cash goals, use current HYSA APYs near 4.2-4.35% (October 2026 top offers) or CD rates quoted on your bank's disclosure.",
  },
  {
    question: "How often should I contribute?",
    answer: "Monthly contributions are most common and align with pay schedules. Consistency matters more than frequency — whether weekly, biweekly, or monthly.",
  },
  {
    question: "Does compound interest work against me with debt?",
    answer: "Yes. Credit card debt compounds daily at 15–25%+. A $5,000 balance at 20% APR with minimum payments (the greater of $25 or interest plus 1% of the balance) takes about 19 years and costs about $7,300 in interest.",
  },
];

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  keywords: [
    "compound interest calculator",
    "compound interest",
    "investment growth calculator",
    "compounding calculator",
    "savings compound interest",
    "interest calculator",
  ],
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function CompoundInterestPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<CompoundInterestArticle />} variants={compoundInterestVariants}>
        <CompoundInterestCalculator />
      </CalculatorShell>
    </>
  );
}
