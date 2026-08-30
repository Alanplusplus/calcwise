import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DebtPayoffCalculator } from "./DebtPayoffCalculator";
import { DebtPayoffArticle } from "./DebtPayoffArticle";
import { debtPayoffVariants } from "@/lib/variants/debt-payoff";

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

export default function DebtPayoffPage() {
  return (
    <CalculatorShell calculator={calc} article={<DebtPayoffArticle />} variants={debtPayoffVariants}>
      <DebtPayoffCalculator />
    </CalculatorShell>
  );
}
