import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { FireCalculator } from "./FireCalculator";
import { FireArticle } from "./FireArticle";

const calc = getCalculator("fire-calculator")!;

export const metadata: Metadata = {
  title: "FIRE Calculator — Financial Independence, Retire Early",
  description: "Calculate your FIRE number and see how soon you can reach financial independence. Based on your savings rate, expenses, and investment returns. Free and instant.",
  keywords: [
    "FIRE calculator",
    "financial independence retire early",
    "FIRE number calculator",
    "early retirement calculator",
    "financial independence calculator",
    "retirement savings rate calculator",
  ],
  openGraph: {
    title: `FIRE Calculator — Financial Independence, Retire Early | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function FireCalculatorPage() {
  return (
    <CalculatorShell calculator={calc} article={<FireArticle />}>
      <FireCalculator />
    </CalculatorShell>
  );
}
