import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { EmergencyFundCalculator } from "./EmergencyFundCalculator";
import { EmergencyFundArticle } from "./EmergencyFundArticle";

const calc = getCalculator("emergency-fund")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function EmergencyFundPage() {
  return (
    <CalculatorShell calculator={calc} article={<EmergencyFundArticle />}>
      <EmergencyFundCalculator />
    </CalculatorShell>
  );
}
