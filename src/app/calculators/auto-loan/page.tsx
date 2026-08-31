import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { AutoLoanCalculator } from "./AutoLoanCalculator";
import { AutoLoanArticle } from "./AutoLoanArticle";
import { autoLoanVariants } from "@/lib/variants/auto-loan";

const calc = getCalculator("auto-loan")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function AutoLoanPage() {
  return (
    <CalculatorShell calculator={calc} article={<AutoLoanArticle />} variants={autoLoanVariants}>
      <AutoLoanCalculator />
    </CalculatorShell>
  );
}
