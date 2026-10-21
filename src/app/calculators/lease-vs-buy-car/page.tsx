import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { LeaseVsBuyCarCalculator } from "./LeaseVsBuyCarCalculator";
import { LeaseVsBuyCarArticle } from "./LeaseVsBuyCarArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("lease-vs-buy-car")!;

const faqs = [
  {
    question: "Is leasing a car a waste of money?",
    answer:
      "Leasing trades equity for lower payments and predictable turnover. With G.19 August 2026 bank APRs near 7.54% on 60-month purchases and Edmunds reporting record $787 average new payments in Q3 2026, leasing can show a lower five-year net cost on higher MSRPs if you would lease twice anyway — run your quote in this calculator.",
  },
  {
    question: "What is a good lease residual value?",
    answer:
      "Edmunds cites typical 36-month residuals between 45% and 60%, with about 53% as a reasonable planning average. Strong brands with high resale demand can reach the mid-60s.",
  },
  {
    question: "How do I compare lease money factor to an auto loan APR?",
    answer:
      "Multiply the money factor by 2,400 to get an equivalent APR. Edmunds considers 0.0025 or lower an average money factor on many programs. Compare that figure to the Federal Reserve G.19 60-month new-car bank average (7.54% for August 2026) or your pre-approval.",
  },
  {
    question: "When does buying beat leasing?",
    answer:
      "Buying usually wins when you keep the vehicle five or more years, drive high mileage, or purchase below roughly $32,000–$35,000 MSRP in this calculator's October 2026 assumptions — equity offsets higher monthly payments.",
  },
];

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function LeaseVsBuyCarPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<LeaseVsBuyCarArticle />}>
        <LeaseVsBuyCarCalculator />
      </CalculatorShell>
    </>
  );
}
