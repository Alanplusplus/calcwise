import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { HousePaymentCalculator } from "./HousePaymentCalculator";
import { HousePaymentArticle } from "./HousePaymentArticle";

const calc = getCalculator("house-payment")!;

export const metadata: Metadata = {
  title: calc.seoTitle ?? calc.title,
  description: calc.description,
  openGraph: { title: `${calc.seoTitle ?? calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function HousePaymentPage() {
  return (
    <CalculatorShell calculator={calc} article={<HousePaymentArticle />}>
      <HousePaymentCalculator />
    </CalculatorShell>
  );
}
