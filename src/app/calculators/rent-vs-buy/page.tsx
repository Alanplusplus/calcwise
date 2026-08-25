import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { RentVsBuyCalculator } from "./RentVsBuyCalculator";
import { RentVsBuyArticle } from "./RentVsBuyArticle";

const calc = getCalculator("rent-vs-buy")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function RentVsBuyPage() {
  return (
    <CalculatorShell calculator={calc} article={<RentVsBuyArticle />}>
      <RentVsBuyCalculator />
    </CalculatorShell>
  );
}
