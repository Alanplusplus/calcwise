import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { SavingsGoalCalculator } from "./SavingsGoalCalculator";
import { SavingsGoalArticle } from "./SavingsGoalArticle";
import { savingsGoalVariants } from "@/lib/variants/savings-goal";

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

export default function SavingsGoalPage() {
  return (
    <CalculatorShell calculator={calc} article={<SavingsGoalArticle />} variants={savingsGoalVariants}>
      <SavingsGoalCalculator />
    </CalculatorShell>
  );
}
