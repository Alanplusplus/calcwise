import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { NetWorthCalculator } from "./NetWorthCalculator";
import { NetWorthArticle } from "./NetWorthArticle";

const calc = getCalculator("net-worth")!;

export const metadata: Metadata = {
  title: "Net Worth Calculator — Track Your Financial Health",
  description: "Calculate your net worth by adding up all assets and subtracting liabilities. Compare to age-group benchmarks and track your financial progress over time.",
  keywords: [
    "net worth calculator",
    "calculate net worth",
    "net worth by age",
    "net worth percentile by age",
    "average net worth",
    "financial health calculator",
  ],
  openGraph: {
    title: `Net Worth Calculator — Track Your Financial Health | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function NetWorthPage() {
  return (
    <CalculatorShell calculator={calc} article={<NetWorthArticle />}>
      <NetWorthCalculator />
    </CalculatorShell>
  );
}
