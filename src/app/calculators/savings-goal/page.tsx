import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { SavingsGoalCalculator } from "./SavingsGoalCalculator";
import { SavingsGoalArticle } from "./SavingsGoalArticle";

const calc = getCalculator("savings-goal")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function SavingsGoalPage() {
  return (
    <CalculatorShell calculator={calc} article={<SavingsGoalArticle />}>
      <SavingsGoalCalculator />
    </CalculatorShell>
  );
}
