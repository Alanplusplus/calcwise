import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DividendCalculator } from "./DividendCalculator";
import { DividendArticle } from "./DividendArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("dividend")!;

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
    question: "How often are dividends paid?",
    answer: "Most U.S. companies pay dividends quarterly. Some REITs and international stocks pay monthly. You can build a monthly income stream by holding stocks with staggered payment schedules.",
  },
  {
    question: "What is a good dividend yield?",
    answer: "For U.S. large-cap stocks, 2.0% to 4.0% is typical for established dividend payers. Above 6.0% may signal an unsustainable payout or a falling stock price. The S&P 500 average yield has historically ranged from 1.5% to 2.5%.",
  },
  {
    question: "Are dividends taxed?",
    answer: "Qualified dividends are taxed at long-term capital gains rates: 0%, 15%, or 20% depending on your income. Non-qualified (ordinary) dividends are taxed at your regular income tax rate. Holding dividend stocks in tax-advantaged accounts like IRAs eliminates annual tax drag.",
  },
  {
    question: "Should I reinvest dividends or take cash?",
    answer: "If you are building wealth, reinvesting via DRIP maximizes compounding and is almost always better. If you need portfolio income for living expenses, taking cash makes sense.",
  },
  {
    question: "What happens if a company cuts its dividend?",
    answer: "A dividend cut reduces your income and usually causes the stock price to drop 10–30%. Diversification is your primary protection. Monitor payout ratios and earnings trends to identify at-risk dividends before cuts happen.",
  },
];

export default function DividendPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<DividendArticle />}>
        <DividendCalculator />
      </CalculatorShell>
    </>
  );
}
