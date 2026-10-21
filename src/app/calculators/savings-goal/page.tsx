import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { SavingsGoalCalculator } from "./SavingsGoalCalculator";
import { SavingsGoalArticle } from "./SavingsGoalArticle";
import { savingsGoalVariants } from "@/lib/variants/savings-goal";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("savings-goal")!;

export const metadata: Metadata = {
  title: "Savings Goal Calculator — How Much to Save Each Month",
  description: "Figure out exactly how much to save each month to reach your financial goal by your target date. Works for house down payments, vacations, new cars, college funds, and more.",
  keywords: [
    "savings goal calculator",
    "savings goal",
    "how to calculate savings goal",
    "how long to save up for a car",
    "monthly savings calculator",
    "savings plan calculator",
  ],
  openGraph: {
    title: `Savings Goal Calculator — How Much to Save Each Month | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

const faqs = [
  {
    question: "What return rate should I use?",
    answer: "High-yield savings: 4.2–4.35% APY (top online offers, October 2026). FDIC national average savings was 0.38% the same month. Long-term investment goals: 6–7% planning rate. Use 0% only for checking (not recommended beyond short-term goals).",
  },
  {
    question: "What if I can't save the required monthly amount?",
    answer: "Extend your timeframe, reduce your goal, or increase income/reduce expenses. Even saving a smaller amount is better than nothing — adjust the calculator to find a number you can commit to.",
  },
  {
    question: "Should I save or pay off debt first?",
    answer: "Build a small emergency fund ($1,000–$2,000) first, then pay off high-interest debt (above 7–8%), then resume saving. Exception: always capture an employer 401(k) match regardless of debt.",
  },
];

export default function SavingsGoalPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<SavingsGoalArticle />} variants={savingsGoalVariants}>
        <SavingsGoalCalculator />
      </CalculatorShell>
    </>
  );
}
