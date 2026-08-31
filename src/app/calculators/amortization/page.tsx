import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { AmortizationCalculator } from "./AmortizationCalculator";
import { AmortizationArticle } from "./AmortizationArticle";

const calc = getCalculator("amortization")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function AmortizationPage() {
  return (
    <CalculatorShell calculator={calc} article={<AmortizationArticle />}>
      <AmortizationCalculator />
    </CalculatorShell>
  );
}
