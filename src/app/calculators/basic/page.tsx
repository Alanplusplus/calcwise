import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { BasicCalculator } from "./BasicCalculator";
import { BasicArticle } from "./BasicArticle";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const calc = getCalculator("basic")!;

export const metadata: Metadata = {
  title: "Free Online Calculator — Quick Math, Percentages & More",
  description:
    "Simple, fast online calculator for everyday math. Addition, subtraction, multiplication, division, percentages, and more — right in your browser, no app needed.",
  keywords: [
    "calculator",
    "online calculator",
    "free calculator",
    "basic calculator",
    "math calculator",
    "percentage calculator",
  ],
  openGraph: {
    title: `Free Online Calculator — Quick Math & Percentages | ${site.name}`,
    description:
      "Simple, fast online calculator for everyday math. Right in your browser, no app needed.",
    type: "website",
  },
};

const faqs = [
  {
    question: "Why does the calculator show Error?",
    answer: "The calculator displays Error for impossible operations like dividing by zero or taking the square root of a negative number. Press C to clear and start over.",
  },
  {
    question: "How precise is this calculator?",
    answer: "It uses JavaScript's IEEE 754 double-precision floating-point arithmetic, providing approximately 15–17 significant digits of precision. Sufficient for everyday math; use specialized calculators for long-term financial projections.",
  },
  {
    question: "Can I use this on mobile?",
    answer: "Yes. The calculator is fully responsive with large touch-friendly buttons designed for phones and tablets.",
  },
];

export default function BasicPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <CalculatorShell calculator={calc} article={<BasicArticle />}>
        <BasicCalculator />
      </CalculatorShell>
    </>
  );
}
