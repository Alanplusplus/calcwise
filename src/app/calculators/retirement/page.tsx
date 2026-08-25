import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { RetirementCalculator } from "./RetirementCalculator";
import { RetirementArticle } from "./RetirementArticle";
import { retirementVariants } from "@/lib/variants/retirement";

const calc = getCalculator("retirement")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function RetirementPage() {
  return (
    <CalculatorShell calculator={calc} article={<RetirementArticle />} variants={retirementVariants}>
      <RetirementCalculator />
    </CalculatorShell>
  );
}
