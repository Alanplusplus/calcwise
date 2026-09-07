import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { SimpleInterestCalculator } from "./SimpleInterestCalculator";
import { SimpleInterestArticle } from "./SimpleInterestArticle";

const calc = getCalculator("simple-interest")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function SimpleInterestPage() {
  return (
    <CalculatorShell calculator={calc} article={<SimpleInterestArticle />}>
      <SimpleInterestCalculator />
    </CalculatorShell>
  );
}
