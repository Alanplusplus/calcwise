import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DebtToIncomeCalculator } from "./DebtToIncomeCalculator";
import { DebtToIncomeArticle } from "./DebtToIncomeArticle";

const calc = getCalculator("debt-to-income")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function DebtToIncomePage() {
  return (
    <CalculatorShell calculator={calc} article={<DebtToIncomeArticle />}>
      <DebtToIncomeCalculator />
    </CalculatorShell>
  );
}
