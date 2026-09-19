import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { HourlyToSalaryCalculator } from "./HourlyToSalaryCalculator";
import { HourlyToSalaryArticle } from "./HourlyToSalaryArticle";

const calc = getCalculator("hourly-to-salary")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function HourlyToSalaryPage() {
  return (
    <CalculatorShell calculator={calc} article={<HourlyToSalaryArticle />}>
      <HourlyToSalaryCalculator />
    </CalculatorShell>
  );
}
