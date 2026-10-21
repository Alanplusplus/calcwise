import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { HourlyToSalaryCalculator } from "./HourlyToSalaryCalculator";
import { HourlyToSalaryArticle } from "./HourlyToSalaryArticle";
import {
  ARIZONA_MIN_WAGE_2026,
  BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026,
  FEDERAL_MINIMUM_WAGE,
  OEWS_MEDIAN_HOURLY_MAY_2025,
  STANDARD_PAID_HOURS_PER_YEAR,
  annualFromHourly,
  usd2,
  usdWhole,
} from "@/lib/wage-data";

const calc = getCalculator("hourly-to-salary")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

const defaultCombinedTaxPct = 34.65;
const defaultNetOn52000 = Math.round(52000 * (1 - defaultCombinedTaxPct / 100));

const faqs = [
  {
    question: "How do you convert hourly pay to an annual salary?",
    answer: `Multiply hourly rate × hours per week × weeks paid per year. At $25/hour, 40 hours, and 52 weeks, gross pay is $52,000 (${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString()} hours). Add overtime pay separately: overtime rate × overtime hours × weeks with overtime.`,
  },
  {
    question: "What annual salary equals $25 per hour?",
    answer: `$25 × 40 × 52 = $52,000 gross before taxes. With the calculator defaults (22% federal, 5% state, 7.65% FICA), estimated net pay is about ${usdWhole(defaultNetOn52000)}/year. That is slightly above the May 2025 OEWS median of ${usd2(OEWS_MEDIAN_HOURLY_MAY_2025)}/hr (${usdWhole(annualFromHourly(OEWS_MEDIAN_HOURLY_MAY_2025))} annualized).`,
  },
  {
    question: "How much overtime pay is required under federal law?",
    answer:
      "The FLSA requires at least 1.5× the regular rate for hours worked over 40 in a workweek for covered non-exempt employees. A $25/hour worker with 5 overtime hours per week for 50 weeks earns an extra $9,375 ($25 × 1.5 × 5 × 50).",
  },
  {
    question: "What is minimum wage in 2026 if my offer is near the bottom?",
    answer: `The federal minimum remains ${usd2(FEDERAL_MINIMUM_WAGE)}/hr. Arizona’s statewide minimum is ${usd2(ARIZONA_MIN_WAGE_2026)}/hr effective January 1, 2026. Many cities set higher local rates; employers must pay the highest applicable minimum for hours worked in that location.`,
  },
  {
    question: "What is the average hourly wage in the U.S. right now?",
    answer: `BLS average hourly earnings for all private employees were ${usd2(BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026)} in September 2026 (Employment Situation). That average exceeds the OEWS median (${usd2(OEWS_MEDIAN_HOURLY_MAY_2025)}/hr) because mean wages are pulled up by high earners.`,
  },
];

export default function HourlyToSalaryPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<HourlyToSalaryArticle />}>
        <HourlyToSalaryCalculator />
      </CalculatorShell>
    </>
  );
}
