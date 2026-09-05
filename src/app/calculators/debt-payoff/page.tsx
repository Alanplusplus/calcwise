import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DebtPayoffCalculator } from "./DebtPayoffCalculator";
import { DebtPayoffArticle } from "./DebtPayoffArticle";
import { debtPayoffVariants } from "@/lib/variants/debt-payoff";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("debt-payoff")!;

export const metadata: Metadata = {
  title: "Debt Payoff Calculator — Snowball vs Avalanche Methods",
  description: "Create a debt payoff plan using avalanche or snowball methods. See exactly when you'll be debt-free and how much interest you'll save. Works for credit cards, student loans, and more.",
  keywords: [
    "debt payoff calculator",
    "debt snowball vs debt avalanche",
    "how to get out of debt",
    "how to get out of 10k credit card debt",
    "debt payoff plan",
    "credit card debt calculator",
  ],
  openGraph: {
    title: `Debt Payoff Calculator — Snowball vs Avalanche | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

const faqs = [
  {
    question: "Should I save or pay off debt?",
    answer: "If your debt interest rate exceeds your savings rate (almost always true for credit cards), prioritize debt payoff. Maintain a small emergency fund ($1,000–$2,000) so unexpected expenses don't force you back into debt.",
  },
  {
    question: "Does paying off debt improve my credit score?",
    answer: "Yes, significantly. Reducing credit utilization is one of the fastest ways to boost your score. Going from 80% to 30% utilization can improve your score by 50–100 points within a billing cycle.",
  },
  {
    question: "What about debt consolidation?",
    answer: "Consolidation makes sense if you get a significantly lower rate and commit to not accumulating new debt. It simplifies payments and reduces total interest, but doesn't fix the spending habits that created the debt.",
  },
];

export default function DebtPayoffPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<DebtPayoffArticle />} variants={debtPayoffVariants}>
        <DebtPayoffCalculator />
      </CalculatorShell>
    </>
  );
}
