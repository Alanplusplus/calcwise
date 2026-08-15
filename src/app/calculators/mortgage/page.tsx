import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { MortgageCalculator } from "./MortgageCalculator";
import { MortgageArticle } from "./MortgageArticle";

const calc = getCalculator("mortgage")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function MortgagePage() {
  return (
    <CalculatorShell calculator={calc} article={<MortgageArticle />}>
      <MortgageCalculator />
    </CalculatorShell>
  );
}
