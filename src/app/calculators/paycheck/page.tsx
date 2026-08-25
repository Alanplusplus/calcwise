import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { PaycheckCalculator } from "./PaycheckCalculator";
import { PaycheckArticle } from "./PaycheckArticle";

const calc = getCalculator("paycheck")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function PaycheckPage() {
  return (
    <CalculatorShell calculator={calc} article={<PaycheckArticle />}>
      <PaycheckCalculator />
    </CalculatorShell>
  );
}
