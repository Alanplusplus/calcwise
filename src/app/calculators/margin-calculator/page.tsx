import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { ProfitMarginCalculator } from "./ProfitMarginCalculator";
import { ProfitMarginArticle } from "./ProfitMarginArticle";

const calc = getCalculator("margin-calculator")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function ProfitMarginPage() {
  return (
    <CalculatorShell calculator={calc} article={<ProfitMarginArticle />}>
      <ProfitMarginCalculator />
    </CalculatorShell>
  );
}
