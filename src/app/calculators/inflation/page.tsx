import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { InflationCalculator } from "./InflationCalculator";
import { InflationArticle } from "./InflationArticle";
import { inflationVariants } from "@/lib/variants/inflation";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("inflation")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: {
    title: `${calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

const faqs = [
  {
    question: "What is a good inflation rate to use for planning?",
    answer: "Use 3% for general financial planning. The Fed targets 2%, but multi-decade averages are closer to 3%. Use 5–6% for healthcare or education expenses specifically.",
  },
  {
    question: "Does inflation affect everyone equally?",
    answer: "No. Lower-income households are hit harder because they spend a larger share on necessities like food, housing, and energy — categories that often inflate faster than discretionary goods.",
  },
  {
    question: "How does inflation affect my savings account?",
    answer: "If your savings earns 4% APY and inflation is 3%, your real return is approximately 1%. After taxes on the nominal 4%, your after-tax real return may be near zero or negative.",
  },
  {
    question: "Can deflation happen?",
    answer: "Yes — most notably during the Great Depression and briefly in 2008–2009. While falling prices sound beneficial, deflation can trigger a destructive cycle of reduced business revenue, layoffs, and further price declines.",
  },
  {
    question: "Should I adjust my budget for inflation each year?",
    answer: "Yes. Review your budget annually and increase expense categories by the actual inflation rate. Without adjusting, you gradually underspend on savings targets and overspend on discretionary items.",
  },
];

export default function InflationPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<InflationArticle />} variants={inflationVariants}>
        <InflationCalculator />
      </CalculatorShell>
    </>
  );
}
