import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { RetirementCalculator } from "./RetirementCalculator";
import { RetirementArticle } from "./RetirementArticle";
import { retirementVariants } from "@/lib/variants/retirement";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("retirement")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  keywords: [
    "retirement savings calculator",
    "retirement calculator",
    "how much do i need to retire",
    "retirement planning calculator",
    "financial planning calculator",
    "am I on track for retirement",
  ],
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

const faqs = [
  {
    question: "What return rate should I assume?",
    answer: "For a diversified portfolio, 7% (after inflation) is common for stocks over long periods. Use 5–6% for a mix of stocks and bonds or for conservative planning.",
  },
  {
    question: "When should I start saving for retirement?",
    answer: "Now. Every decade you delay roughly doubles the monthly amount needed. Starting at 25 vs. 35 means saving about half as much per month to reach the same target.",
  },
  {
    question: "Can I retire early?",
    answer: "Yes, with FIRE (Financial Independence, Retire Early). This typically requires saving 50–70% of income and accumulating 25–33x annual expenses. Many FIRE adherents retire in their 40s or 50s.",
  },
];

export default function RetirementPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<RetirementArticle />} variants={retirementVariants}>
        <RetirementCalculator />
      </CalculatorShell>
    </>
  );
}
