import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { LeaseVsBuyCarCalculator } from "./LeaseVsBuyCarCalculator";
import { LeaseVsBuyCarArticle } from "./LeaseVsBuyCarArticle";

const calc = getCalculator("lease-vs-buy-car")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function LeaseVsBuyCarPage() {
  return (
    <CalculatorShell calculator={calc} article={<LeaseVsBuyCarArticle />}>
      <LeaseVsBuyCarCalculator />
    </CalculatorShell>
  );
}
