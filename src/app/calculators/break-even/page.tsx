import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { BreakEvenCalculator } from "./BreakEvenCalculator";
import { BreakEvenArticle } from "./BreakEvenArticle";

const calc = getCalculator("break-even")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function BreakEvenPage() {
  return (
    <CalculatorShell calculator={calc} article={<BreakEvenArticle />}>
      <BreakEvenCalculator />
    </CalculatorShell>
  );
}
