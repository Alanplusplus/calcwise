import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { CreditCardPayoffCalculator } from "./CreditCardPayoffCalculator";
import { CreditCardPayoffArticle } from "./CreditCardPayoffArticle";
import { creditCardPayoffVariants } from "@/lib/variants/credit-card-payoff";

const calc = getCalculator("credit-card-payoff")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function CreditCardPayoffPage() {
  return (
    <CalculatorShell calculator={calc} article={<CreditCardPayoffArticle />} variants={creditCardPayoffVariants}>
      <CreditCardPayoffCalculator />
    </CalculatorShell>
  );
}
