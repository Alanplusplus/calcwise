import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { BudgetCalculator } from "./BudgetCalculator";
import { BudgetArticle } from "./BudgetArticle";

const calc = getCalculator("budget-50-30-20")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function Budget503020Page() {
  return (
    <CalculatorShell calculator={calc} article={<BudgetArticle />}>
      <BudgetCalculator />
    </CalculatorShell>
  );
}
