import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DebtPayoffCalculator } from "./DebtPayoffCalculator";
import { DebtPayoffArticle } from "./DebtPayoffArticle";
import { debtPayoffVariants } from "@/lib/variants/debt-payoff";

const calc = getCalculator("debt-payoff")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
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
