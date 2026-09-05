import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { RoiCalculator } from "./RoiCalculator";
import { RoiArticle } from "./RoiArticle";
import { roiVariants } from "@/lib/variants/roi";
import { FaqJsonLd } from "@/components/FaqJsonLd";

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

const faqs = [
  {
    question: "What is a good ROI percentage?",
    answer: "Depends on investment type and risk. Stock market: 7–10% annually is strong. Business investments: 15–20%+ is worthwhile. Marketing campaigns: 500% (5:1) is the paid advertising benchmark.",
  },
  {
    question: "Does ROI account for inflation?",
    answer: "The basic formula uses nominal figures. Subtract the inflation rate for real ROI — if you returned 12% and inflation was 3%, your real ROI is approximately 9%.",
  },
  {
    question: "How is ROI different from profit margin?",
    answer: "Profit margin is profit/revenue (operational efficiency). ROI is profit/investment cost (capital efficiency). A 10% margin on $1M revenue earns $100K; if you invested $200K, ROI is 50%.",
  },
  {
    question: "Can ROI be negative?",
    answer: "Yes. A negative ROI means you lost money — investing $10,000 and receiving $8,000 back is -20% ROI. Common in early-stage businesses and individual down years in the stock market.",
  },
  {
    question: "Should I include my time as a cost in ROI calculations?",
    answer: "For side businesses, freelance projects, and active real estate, include an hourly rate for your time. Without it, a rental showing 15% ROI might actually deliver only 5% when labor is factored in.",
  },
];

export default function RoiPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<RoiArticle />} variants={roiVariants}>
        <RoiCalculator />
      </CalculatorShell>
    </>
  );
}
