import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { CreditCardPayoffCalculator } from "./CreditCardPayoffCalculator";
import { CreditCardPayoffArticle } from "./CreditCardPayoffArticle";
import { creditCardPayoffVariants } from "@/lib/variants/credit-card-payoff";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("credit-card-payoff")!;

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
    question: "Should I pay off credit cards or save first?",
    answer: "Build a small emergency fund of $1,000–$2,000 first, then focus on high-interest credit card debt. Cards charging 20%+ APR cost far more than you would earn in savings. Once debt is gone, redirect those payments toward savings.",
  },
  {
    question: "Does paying the minimum hurt my credit score?",
    answer: "Paying the minimum keeps your account in good standing and avoids late payment marks, but high credit utilization (balance relative to limit) can lower your score. Paying down balances reduces utilization and improves your score over time.",
  },
  {
    question: "What if I can only afford the minimum right now?",
    answer: "Pay the minimum on every card to avoid fees and penalties, then look for ways to increase income or reduce expenses. Every extra dollar above the minimum accelerates your payoff and reduces total interest.",
  },
  {
    question: "Is it better to pay off one card or spread payments across all cards?",
    answer: "Always pay at least the minimum on every card. Beyond that, concentrate extra payments on one card using either the avalanche method (highest APR first) or snowball method (smallest balance first). Focus creates momentum.",
  },
];

export default function CreditCardPayoffPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<CreditCardPayoffArticle />} variants={creditCardPayoffVariants}>
        <CreditCardPayoffCalculator />
      </CalculatorShell>
    </>
  );
}
