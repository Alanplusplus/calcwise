import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { RoiCalculator } from "./RoiCalculator";
import { RoiArticle } from "./RoiArticle";
import { roiVariants } from "@/lib/variants/roi";

const calc = getCalculator("roi")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function RoiPage() {
  return (
    <CalculatorShell calculator={calc} article={<RoiArticle />} variants={roiVariants}>
      <RoiCalculator />
    </CalculatorShell>
  );
}
