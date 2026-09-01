import type { Metadata } from "next";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";
import { CalculatorShell } from "@/components/CalculatorShell";
import { DownPaymentCalculator } from "./DownPaymentCalculator";
import { DownPaymentArticle } from "./DownPaymentArticle";

const calc = getCalculator("down-payment")!;

export const metadata: Metadata = {
  title: calc.title,
  description: calc.description,
  openGraph: { title: `${calc.title} | ${site.name}`, description: calc.description, type: "website" },
};

export default function DownPaymentPage() {
  return (
    <CalculatorShell calculator={calc} article={<DownPaymentArticle />}>
      <DownPaymentCalculator />
    </CalculatorShell>
  );
}
