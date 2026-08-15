import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { LoanComparisonCalculator } from "./LoanComparisonCalculator";
import { LoanComparisonArticle } from "./LoanComparisonArticle";

const calc = getCalculator("loan-comparison")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function LoanComparisonPage() {
  return (
    <CalculatorShell calculator={calc} article={<LoanComparisonArticle />}>
      <LoanComparisonCalculator />
    </CalculatorShell>
  );
}
