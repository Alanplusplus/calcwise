import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { FireCalculator } from "./FireCalculator";
import { FireArticle } from "./FireArticle";

const calc = getCalculator("fire-calculator")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function FireCalculatorPage() {
  return (
    <CalculatorShell calculator={calc} article={<FireArticle />}>
      <FireCalculator />
    </CalculatorShell>
  );
}
