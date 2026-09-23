import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { RefinanceCalculator } from "./RefinanceCalculator";
import { RefinanceArticle } from "./RefinanceArticle";

const calc = getCalculator("refinance-calculator")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function RefinancePage() {
  return (
    <CalculatorShell calculator={calc} article={<RefinanceArticle />}>
      <RefinanceCalculator />
    </CalculatorShell>
  );
}
