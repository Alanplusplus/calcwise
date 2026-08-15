import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { CompoundInterestCalculator } from "./CompoundInterestCalculator";
import { CompoundInterestArticle } from "./CompoundInterestArticle";

const calc = getCalculator("compound-interest")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function CompoundInterestPage() {
  return (
    <CalculatorShell calculator={calc} article={<CompoundInterestArticle />}>
      <CompoundInterestCalculator />
    </CalculatorShell>
  );
}
