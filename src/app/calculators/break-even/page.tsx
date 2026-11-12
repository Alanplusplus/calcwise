import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { BreakEvenCalculator } from "./BreakEvenCalculator";
import { BreakEvenArticle, breakEvenFaqs } from "./BreakEvenArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("break-even")!;

export const metadata: Metadata = {
  title: calc.seoTitle ?? calc.title,
  description: calc.description,
  openGraph: { title: `${calc.seoTitle ?? calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function BreakEvenPage() {
  return (
    <>
      <FaqJsonLd faqs={breakEvenFaqs} />
      <CalculatorShell calculator={calc} article={<BreakEvenArticle />}>
        <BreakEvenCalculator />
      </CalculatorShell>
    </>
  );
}
