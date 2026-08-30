import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { BasicCalculator } from "./BasicCalculator";
import { BasicArticle } from "./BasicArticle";

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

export default function BasicPage() {
  return (
    <CalculatorShell calculator={calc} article={<BasicArticle />}>
      <BasicCalculator />
    </CalculatorShell>
  );
}
