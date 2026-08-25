import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { CdCalculator } from "./CdCalculator";
import { CdArticle } from "./CdArticle";

const calc = getCalculator("cd-calculator")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function CdCalculatorPage() {
  return (
    <CalculatorShell calculator={calc} article={<CdArticle />}>
      <CdCalculator />
    </CalculatorShell>
  );
}
