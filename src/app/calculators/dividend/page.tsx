import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DividendCalculator } from "./DividendCalculator";
import { DividendArticle } from "./DividendArticle";

const calc = getCalculator("dividend")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function DividendPage() {
  return (
    <CalculatorShell calculator={calc} article={<DividendArticle />}>
      <DividendCalculator />
    </CalculatorShell>
  );
}
