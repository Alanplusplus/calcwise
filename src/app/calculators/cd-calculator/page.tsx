import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { CdCalculator } from "./CdCalculator";
import { CdArticle } from "./CdArticle";
import { cdVariants } from "@/lib/variants/cd-calculator";

const calc = getCalculator("cd-calculator")!;

const faqs = [
  {
    question: "What CD APY should I use in the calculator?",
    answer: "Use the APY quoted on your bank's disclosure for the exact term. For context, the FDIC national average for 12-month CDs was 1.76% on October 19, 2026, while top online 1-year CDs reached about 4.55% to 4.60% APY the same week (NerdWallet, Oct. 20, 2026). This calculator defaults to 4.55% APY — a top-tier observation, not the branch-bank average. If your bank only lists a stated rate, switch the Rate Type menu so the calculator converts it to an APY first.",
  },
  {
    question: "How do you calculate CD interest?",
    answer: "Multiply your deposit by (1 + APY) raised to the power of the term in years, then subtract the deposit. For $10,000 at 4.55% APY for 12 months, $10,000 × 1.0455 = $10,455, so you earn $455. For 6 months, use 0.5 as the exponent: $10,000 × 1.0455^0.5 = $10,225, or about $225 in interest. If your bank quotes a stated rate instead of an APY, convert it first with APY = (1 + rate ÷ n)^n − 1.",
  },
  {
    question: "Are CD earnings taxable?",
    answer: "Yes. CD interest is taxed as ordinary income in the year it is credited to your account, even if you cannot withdraw it without penalty until maturity. Your bank will send a Form 1099-INT if you earn more than $10 in interest.",
  },
  {
    question: "What happens when my CD matures?",
    answer: "Most banks offer a grace period of 7 to 10 days after maturity during which you can withdraw funds without penalty. If you take no action, the CD typically auto-renews at the bank's current rate for the same term — often near the FDIC national average unless you shop top online APYs again.",
  },
  {
    question: "Can I lose money on a CD?",
    answer: "You cannot lose your principal on a standard FDIC-insured CD held to maturity. Early withdrawal penalties are the main risk: if you cash out before the term ends, the penalty could exceed your accrued interest and reduce your original deposit.",
  },
];

export const metadata: Metadata = {
  title: calc.seoTitle ?? calc.title,
  description: calc.description,
  keywords: [
    "cd calculator",
    "cd interest calculator",
    "certificate of deposit calculator",
    "cd rate calculator",
    "cd apy calculator",
    "cd earnings calculator",
  ],
  openGraph: {
    title: `${calc.seoTitle ?? calc.title} | ${site.name}`,
    description: calc.description,
    type: "website",
  },
};

export default function CdCalculatorPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<CdArticle />} variants={cdVariants}>
        <CdCalculator />
      </CalculatorShell>
    </>
  );
}
