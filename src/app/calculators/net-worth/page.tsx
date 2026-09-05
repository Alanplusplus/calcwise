import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { NetWorthCalculator } from "./NetWorthCalculator";
import { NetWorthArticle } from "./NetWorthArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("net-worth")!;

export const metadata: Metadata = {
  title: "Net Worth Calculator — Track Your Financial Health",
  description: "Calculate your net worth by adding up all assets and subtracting liabilities. Compare to age-group benchmarks and track your financial progress over time.",
  keywords: [
    "net worth calculator",
    "calculate net worth",
    "net worth by age",
    "net worth percentile by age",
    "average net worth",
    "financial health calculator",
  ],
  openGraph: {
    title: `Net Worth Calculator — Track Your Financial Health | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

const faqs = [
  {
    question: "Should I include my home in net worth?",
    answer: "Yes. Use the current estimated market value as an asset and your remaining mortgage balance as a liability. The difference is your home equity, which is part of your net worth.",
  },
  {
    question: "What about retirement accounts I cannot touch until 59½?",
    answer: "Include them. They are real assets that will fund your future. Just remember they are tax-advantaged and may have withdrawal restrictions — factor that into financial planning separately from liquid net worth.",
  },
  {
    question: "How often should I calculate my net worth?",
    answer: "Quarterly is a good cadence. Monthly is fine if you enjoy tracking progress, but daily updates are unnecessary since investment values fluctuate and most liabilities change slowly.",
  },
  {
    question: "Is negative net worth normal?",
    answer: "It is common for recent graduates with student loans or new homeowners with small down payments. What matters is the trend — is your net worth increasing over time?",
  },
  {
    question: "What is a good net worth target?",
    answer: "A common rule of thumb is one times your annual salary by 30, three times by 40, six times by 50, and eight times by 60. Adjust based on your retirement goals and expected expenses.",
  },
];

export default function NetWorthPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<NetWorthArticle />}>
        <NetWorthCalculator />
      </CalculatorShell>
    </>
  );
}
