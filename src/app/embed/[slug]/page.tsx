import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { EmbedResizer } from "@/components/EmbedResizer";
import { embeds } from "@/lib/embeds";
import { getCalculator } from "@/lib/calculators";
import { site } from "@/lib/site";

type Loader = () => Promise<ComponentType>;

/** One loader per embeddable calculator so each iframe only ships its own code. */
const loaders: Record<string, Loader> = {
  mortgage: async () =>
    (await import("@/app/calculators/mortgage/MortgageCalculator")).MortgageCalculator,
  "home-affordability": async () =>
    (await import("@/app/calculators/home-affordability/HomeAffordabilityCalculator"))
      .HomeAffordabilityCalculator,
  "compound-interest": async () =>
    (await import("@/app/calculators/compound-interest/CompoundInterestCalculator"))
      .CompoundInterestCalculator,
  "savings-goal": async () =>
    (await import("@/app/calculators/savings-goal/SavingsGoalCalculator")).SavingsGoalCalculator,
  retirement: async () =>
    (await import("@/app/calculators/retirement/RetirementCalculator")).RetirementCalculator,
  "auto-loan": async () =>
    (await import("@/app/calculators/auto-loan/AutoLoanCalculator")).AutoLoanCalculator,
  "debt-payoff": async () =>
    (await import("@/app/calculators/debt-payoff/DebtPayoffCalculator")).DebtPayoffCalculator,
  "credit-card-payoff": async () =>
    (await import("@/app/calculators/credit-card-payoff/CreditCardPayoffCalculator"))
      .CreditCardPayoffCalculator,
  "student-loan": async () =>
    (await import("@/app/calculators/student-loan/StudentLoanCalculator")).StudentLoanCalculator,
  "salary-to-hourly": async () =>
    (await import("@/app/calculators/salary-to-hourly/SalaryToHourlyCalculator"))
      .SalaryToHourlyCalculator,
  paycheck: async () =>
    (await import("@/app/calculators/paycheck/PaycheckCalculator")).PaycheckCalculator,
  "tip-calculator": async () =>
    (await import("@/app/calculators/tip-calculator/TipCalculator")).TipCalculator,
  "emergency-fund": async () =>
    (await import("@/app/calculators/emergency-fund/EmergencyFundCalculator"))
      .EmergencyFundCalculator,
  roi: async () => (await import("@/app/calculators/roi/RoiCalculator")).RoiCalculator,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return embeds.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator) return {};
  return {
    title: `${calculator.title} (embedded)`,
    description: `Embeddable version of the ${calculator.title} from ${site.name}.`,
    // The frame is meant to be shown inside other pages, not to rank on its own.
    robots: { index: false, follow: true },
  };
}

const ROOT_ID = "cw-embed-root";

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  const load = loaders[slug];
  if (!calculator || !load) notFound();

  const Calculator = await load();
  const pageUrl = `${site.url}/calculators/${slug}`;

  return (
    <div id={ROOT_ID} className="p-2 sm:p-3">
      {/* Let the host page's background show around the card */}
      <style>{"html,body{background:transparent}"}</style>
      <div className="rounded-xl border border-ink-200 bg-white p-4 shadow-card sm:p-6">
        <h1 className="mb-4 text-lg font-bold text-ink-900">{calculator.title}</h1>
        <Calculator />
      </div>
      <p className="mt-2 text-center text-xs text-ink-500">
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener"
          className="font-medium text-brand-600 underline"
        >
          {calculator.title}
        </a>{" "}
        by{" "}
        <a
          href={site.url}
          target="_blank"
          rel="noopener"
          className="font-medium text-brand-600 underline"
        >
          {site.name}
        </a>
        . Numbers you enter stay in your browser.
      </p>
      <EmbedResizer slug={slug} targetId={ROOT_ID} />
    </div>
  );
}
