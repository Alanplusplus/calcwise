import type { Metadata } from "next";
import { site } from "@/lib/site";
import { FaqJsonLd } from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about CalcWise financial calculators, accuracy, privacy, and how to use our free tools.",
};

const faqs = [
  {
    question: "Are CalcWise calculators free to use?",
    answer: "Yes, all calculators on CalcWise are completely free. There are no hidden fees, no premium tiers, and no signup required.",
  },
  {
    question: "How accurate are the calculator results?",
    answer: "Our calculators use industry-standard financial formulas (such as the amortization formula for mortgages and compound interest equations for investments). Results are estimates based on the inputs you provide. Actual outcomes may vary due to fees, taxes, rate changes, and other factors not captured by simplified models.",
  },
  {
    question: "Is my financial data stored or shared?",
    answer: "No. All calculations run entirely in your web browser using JavaScript. We never collect, store, or transmit any numbers you enter. Your financial data never leaves your device.",
  },
  {
    question: "Can I use these calculators for professional financial planning?",
    answer: "Our tools are designed for educational purposes and personal planning. While they use accurate formulas, they are simplified models that don't account for every variable. For professional financial planning, tax optimization, or investment decisions involving significant amounts, we recommend consulting a certified financial planner or tax advisor.",
  },
  {
    question: "What mortgage interest rate should I use in the calculator?",
    answer: "Use the rate quoted by your lender. If you're exploring scenarios, current average rates in the US range from 6% to 7.5% for a 30-year fixed mortgage (as of 2026). Check current rates on Freddie Mac's Primary Mortgage Market Survey for the most up-to-date national averages.",
  },
  {
    question: "What rate of return should I assume for investments?",
    answer: "For long-term stock market investments (20+ years), 7% after inflation is a commonly used conservative estimate based on historical S&P 500 performance. For a high-yield savings account, use 4-5%. For bonds, 4-5%. Always use conservative estimates for planning — it's better to end up with more than expected.",
  },
  {
    question: "What is the 4% rule for retirement?",
    answer: "The 4% rule suggests you can withdraw 4% of your retirement portfolio in the first year, then adjust for inflation each subsequent year, with a high probability your money lasts 30+ years. To calculate how much you need: divide your desired annual retirement income by 0.04. For example, $60,000/year requires $1,500,000 saved.",
  },
  {
    question: "Should I pay off debt or save first?",
    answer: "Generally: (1) build a small emergency fund ($1,000-$2,000), (2) capture any employer 401(k) match (free money), (3) aggressively pay off high-interest debt (anything above 7-8%), then (4) build full emergency fund and invest. High-interest debt costs more than investments typically earn, so eliminating it first is mathematically optimal.",
  },
  {
    question: "How much emergency fund do I need?",
    answer: "Most financial experts recommend 3-6 months of essential expenses. Single-income households, self-employed individuals, or those in volatile industries should target 6-12 months. Calculate based on necessities only: housing, food, utilities, insurance, transportation, and minimum debt payments.",
  },
  {
    question: "Do the calculators work on mobile devices?",
    answer: "Yes. All CalcWise calculators are fully responsive and optimized for smartphones and tablets. They work in any modern web browser without requiring an app download.",
  },
  {
    question: "How often are the calculators and content updated?",
    answer: "We review and update our calculators and educational content regularly to ensure accuracy. Interest rate references, tax information, and financial guidelines are updated as market conditions change. Each page shows a last-updated date for transparency.",
  },
  {
    question: "Can I suggest a new calculator?",
    answer: "Absolutely! We're always looking to add useful tools. Send your suggestion to hello@calcwise.tools and we'll evaluate it for our roadmap. Popular requests get prioritized.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <FaqJsonLd faqs={faqs} />

      <h1 className="text-3xl font-bold text-ink-900">Frequently Asked Questions</h1>
      <p className="mt-2 text-ink-600">
        Quick answers to common questions about our financial calculators, privacy, and accuracy.
      </p>

      <div className="mt-10 space-y-8">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-ink-200 pb-6 last:border-0">
            <h2 className="text-lg font-semibold text-ink-900">{faq.question}</h2>
            <p className="mt-2 text-ink-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
