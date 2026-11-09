import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { TipCalculator } from "./TipCalculator";
import { TipArticle } from "./TipArticle";
import { tipCalculatorVariants } from "@/lib/variants/tip-calculator";

const calc = getCalculator("tip-calculator")!;

export const metadata: Metadata = {
  title: calc.seoTitle ?? calc.title,
  description: calc.description,
  openGraph: { title: `${calc.seoTitle ?? calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function TipPage() {
  return (
    <CalculatorShell calculator={calc} article={<TipArticle />} variants={tipCalculatorVariants}>
      <TipCalculator />
    </CalculatorShell>
  );
}
