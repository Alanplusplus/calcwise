import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { CarAffordabilityCalculator } from "./CarAffordabilityCalculator";
import { CarAffordabilityArticle } from "./CarAffordabilityArticle";

const calc = getCalculator("car-affordability")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function CarAffordabilityPage() {
  return (
    <CalculatorShell calculator={calc} article={<CarAffordabilityArticle />}>
      <CarAffordabilityCalculator />
    </CalculatorShell>
  );
}
