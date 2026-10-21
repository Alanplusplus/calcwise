import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { SalaryToHourlyCalculator } from "./SalaryToHourlyCalculator";
import { SalaryToHourlyArticle } from "./SalaryToHourlyArticle";
import {
  BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026,
  DENVER_MIN_WAGE_2026,
  FEDERAL_MINIMUM_WAGE,
  FLSA_EXEMPT_MIN_ANNUAL,
  KFF_SINGLE_PREMIUM_2025,
  OEWS_MEDIAN_HOURLY_MAY_2025,
  STANDARD_PAID_HOURS_PER_YEAR,
  annualFromHourly,
  usd2,
  usdWhole,
} from "@/lib/wage-data";

const calc = getCalculator("salary-to-hourly")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

const faqs = [
  {
    question: "How do I convert an annual salary to an hourly rate?",
    answer: `Divide gross annual pay by paid hours per year. The usual full-time divisor is ${STANDARD_PAID_HOURS_PER_YEAR.toLocaleString()} (40 hours × 52 weeks). A $65,000 salary equals ${usd2(65000 / STANDARD_PAID_HOURS_PER_YEAR)}/hr before taxes. Federal agencies use 2,087 hours instead, which lowers the hourly equivalent slightly.`,
  },
  {
    question: "What hourly rate equals the median U.S. wage?",
    answer: `BLS Occupational Employment and Wage Statistics (May 2025) place the national median at ${usd2(OEWS_MEDIAN_HOURLY_MAY_2025)}/hr for all occupations — about ${usdWhole(annualFromHourly(OEWS_MEDIAN_HOURLY_MAY_2025))} at 2,080 paid hours. Average hourly earnings for all private employees were ${usd2(BLS_AVERAGE_HOURLY_ALL_PRIVATE_SEP_2026)} in September 2026, higher than the OEWS median because averages include high-wage outliers.`,
  },
  {
    question: "What salary do I need to be overtime-exempt?",
    answer: `Under the FLSA rules in effect after the 2024 DOL increases were vacated, the white-collar salary-level test generally requires at least ${usdWhole(FLSA_EXEMPT_MIN_ANNUAL)}/year (${usdWhole(684)}/week) plus satisfying the duties test. Salary alone does not make a job exempt if the role is non-exempt hourly work.`,
  },
  {
    question: "How much is employer health insurance worth when comparing offers?",
    answer: `KFF’s 2025 employer survey shows an average single-coverage premium of ${usdWhole(KFF_SINGLE_PREMIUM_2025)}/year. When comparing a contract rate to W-2 pay, add the premium you would pay out of pocket (or the employer share you would lose) to the hourly job’s gross pay before deciding.`,
  },
  {
    question: "What is the minimum wage if my offer sounds low?",
    answer: `The federal floor is ${usd2(FEDERAL_MINIMUM_WAGE)}/hr, but many states and cities require more. For example Denver’s local minimum is ${usd2(DENVER_MIN_WAGE_2026)}/hr in 2026. Employers must pay the highest applicable rate for hours worked in that jurisdiction.`,
  },
];

export default function SalaryToHourlyPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<SalaryToHourlyArticle />}>
        <SalaryToHourlyCalculator />
      </CalculatorShell>
    </>
  );
}
