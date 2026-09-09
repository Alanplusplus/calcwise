import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { SalaryToHourlyCalculator } from "./SalaryToHourlyCalculator";
import { SalaryToHourlyArticle } from "./SalaryToHourlyArticle";

const calc = getCalculator("salary-to-hourly")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function SalaryToHourlyPage() {
  return (
    <CalculatorShell calculator={calc} article={<SalaryToHourlyArticle />}>
      <SalaryToHourlyCalculator />
    </CalculatorShell>
  );
}
