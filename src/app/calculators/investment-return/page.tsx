import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { InvestmentReturnCalculator } from "./InvestmentReturnCalculator";
import { InvestmentReturnArticle } from "./InvestmentReturnArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("investment-return")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

const faqs = [
  {
    question: "What is a good annualized return?",
    answer: "For a diversified U.S. stock portfolio, matching the long-run S&P 500 total return near 10% nominal (about 6.8% after inflation, 1928–2025) is a solid outcome. Short-term results will vary widely.",
  },
  {
    question: "How do I account for additional contributions?",
    answer: "Regular contributions require the internal rate of return or money-weighted return. This calculator is designed for lump-sum investments; use the Compound Interest Calculator for regular contributions.",
  },
  {
    question: "Should I include fees in my calculation?",
    answer: "Yes. Use your actual account value (after fees) as the Current Value to get your net return — what you actually earned after all costs.",
  },
];

export default function InvestmentReturnPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<InvestmentReturnArticle />}>
        <InvestmentReturnCalculator />
      </CalculatorShell>
    </>
  );
}
