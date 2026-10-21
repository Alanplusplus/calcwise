import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { SelfEmploymentTaxCalculator } from "./SelfEmploymentTaxCalculator";
import { SelfEmploymentTaxArticle } from "./SelfEmploymentTaxArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ADDITIONAL_MEDICARE_THRESHOLDS, SOCIAL_SECURITY_WAGE_BASE, usd } from "@/lib/tax-data";

const calc = getCalculator("self-employment-tax")!;

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
    question: "What is self-employment tax?",
    answer: `Self-employment tax is the Social Security and Medicare tax that self-employed individuals pay on their net earnings. It is the equivalent of the FICA taxes that employers and employees share. The 2026 rate is 15.3%: 12.4% for Social Security (on earnings up to ${usd(SOCIAL_SECURITY_WAGE_BASE)}) and 2.9% for Medicare (on all earnings). An additional 0.9% Medicare surtax applies to earnings above ${usd(ADDITIONAL_MEDICARE_THRESHOLDS.single)} for single filers.`,
  },
  {
    question: "How is self-employment tax calculated?",
    answer: `First, multiply your net self-employment income by 92.35% (0.9235) to get your taxable SE earnings. This adjustment accounts for the employer-equivalent portion. Then apply the 15.3% SE tax rate: 12.4% for Social Security (capped at ${usd(SOCIAL_SECURITY_WAGE_BASE)}) and 2.9% for Medicare. If earnings exceed ${usd(ADDITIONAL_MEDICARE_THRESHOLDS.single)} (single), add the 0.9% Additional Medicare Tax on the excess.`,
  },
  {
    question: "Can I deduct self-employment tax?",
    answer: "Yes, you can deduct the employer-equivalent portion of your self-employment tax (half of the total SE tax) as an above-the-line deduction on your federal income tax return. This reduces your adjusted gross income (AGI), which can lower your overall income tax liability.",
  },
  {
    question: "Do I need to make quarterly estimated tax payments?",
    answer: "Yes, if you expect to owe $1,000 or more in combined income and self-employment tax for the year, the IRS requires quarterly estimated tax payments. Due dates are April 15, June 15, September 15, and January 15. Missing these deadlines results in underpayment penalties.",
  },
  {
    question: "What qualifies as self-employment income?",
    answer: "Self-employment income includes net earnings from a sole proprietorship, freelance or contract work (1099-NEC), gig economy earnings, partnership income, and any trade or business you operate. It does not include wages from an employer (W-2 income), investment income, or rental income (unless you are a real estate professional).",
  },
];

export default function SelfEmploymentTaxPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<SelfEmploymentTaxArticle />}>
        <SelfEmploymentTaxCalculator />
      </CalculatorShell>
    </>
  );
}
