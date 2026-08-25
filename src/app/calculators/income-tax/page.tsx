import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { IncomeTaxCalculator } from "./IncomeTaxCalculator";
import { IncomeTaxArticle } from "./IncomeTaxArticle";

const calc = getCalculator("income-tax")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function IncomeTaxPage() {
  return (
    <CalculatorShell calculator={calc} article={<IncomeTaxArticle />}>
      <IncomeTaxCalculator />
    </CalculatorShell>
  );
}
