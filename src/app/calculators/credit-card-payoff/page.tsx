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
    question: "What APR does this calculator use by default?",
    answer:
      "The default is 22.36% — the Federal Reserve G.19 average for credit card accounts assessed interest (August 2026 data). That series covers balances charged interest, not the 21.19% average across all accounts. You can change the rate to match your card.",
  },
  {
    question: "How does this calculator model the minimum payment?",
    answer:
      "Each month the minimum is the greater of $25 or the month's interest plus 1% of the balance, a formula printed in published cardmember agreements. On the default $8,000 balance at 22.36% APR the first minimum is $229 and paying only minimums takes about 278 months (23 years) and about $13,831 in interest, versus 50 months and $4,282 at a fixed $250. Your issuer's formula may differ, so check your cardmember agreement; you can change the 1% in the calculator.",
  },
  {
    question: "Should I pay off credit cards or save first?",
    answer: "Build a small emergency fund of $1,000–$2,000 first, then focus on high-interest credit card debt. Cards near the G.19 assessed-interest average (22.36% as of August 2026) cost far more than typical savings yields. Once debt is gone, redirect those payments toward savings.",
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
