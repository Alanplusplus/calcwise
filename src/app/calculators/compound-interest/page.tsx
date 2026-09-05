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
    answer: "For stock market investments over 20+ years, 7% (inflation-adjusted) is a commonly used conservative estimate. For savings accounts or CDs, use the current advertised rate.",
  },
  {
    question: "How often should I contribute?",
    answer: "Monthly contributions are most common and align with pay schedules. Consistency matters more than frequency — whether weekly, biweekly, or monthly.",
  },
  {
    question: "Does compound interest work against me with debt?",
    answer: "Yes. Credit card debt compounds daily at 15–25%+. A $5,000 balance at 20% APR with minimum payments takes 30+ years and costs $9,000+ in interest.",
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
