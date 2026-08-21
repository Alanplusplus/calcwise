import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { BasicCalculator } from "./BasicCalculator";
import { BasicArticle } from "./BasicArticle";

const calc = getCalculator("basic")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function BasicPage() {
  return (
    <CalculatorShell calculator={calc} article={<BasicArticle />}>
      <BasicCalculator />
    </CalculatorShell>
  );
}
