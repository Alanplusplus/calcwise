import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { NetWorthCalculator } from "./NetWorthCalculator";
import { NetWorthArticle } from "./NetWorthArticle";

const calc = getCalculator("net-worth")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
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
