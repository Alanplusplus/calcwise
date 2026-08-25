import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { HomeAffordabilityCalculator } from "./HomeAffordabilityCalculator";
import { HomeAffordabilityArticle } from "./HomeAffordabilityArticle";

const calc = getCalculator("home-affordability")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function HomeAffordabilityPage() {
  return (
    <CalculatorShell calculator={calc} article={<HomeAffordabilityArticle />}>
      <HomeAffordabilityCalculator />
    </CalculatorShell>
  );
}
