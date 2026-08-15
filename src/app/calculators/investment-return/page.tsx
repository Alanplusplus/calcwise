import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { InvestmentReturnCalculator } from "./InvestmentReturnCalculator";
import { InvestmentReturnArticle } from "./InvestmentReturnArticle";

const calc = getCalculator("investment-return")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function InvestmentReturnPage() {
  return (
    <CalculatorShell calculator={calc} article={<InvestmentReturnArticle />}>
      <InvestmentReturnCalculator />
    </CalculatorShell>
  );
}
