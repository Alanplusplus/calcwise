import type { CalculatorVariant } from "./types";
import { ESTIMATED_TAX_DUE_DATES_2026, TAX_SOURCES } from "../tax-data";
import { KFF_SINGLE_PREMIUM_2026, WAGE_BENCHMARK_SOURCES, usdWhole } from "../wage-data";

// Monthly essentials for a single freelancer paying for their own health coverage.
const premiumMonthly = Math.round(KFF_SINGLE_PREMIUM_2026 / 12);
const expenses = {
  housing: 1700,
  utilities: 250,
  groceries: 550,
  transportation: 350,
  insurance: premiumMonthly,
  debtPayments: 450,
  other: 500,
};
const monthly = Object.values(expenses).reduce((a, b) => a + b, 0);
const saved = 8000;
const fund3 = monthly * 3;
const fund6 = monthly * 6;
const fund12 = monthly * 12;
const gap12 = fund12 - saved;
const months20 = Math.ceil(gap12 / (monthly * 0.2));
const months10 = Math.ceil(gap12 / (monthly * 0.1));
const insuranceShare = (premiumMonthly / monthly) * 100;
const nextEstimatedTaxDate = ESTIMATED_TAX_DUE_DATES_2026[ESTIMATED_TAX_DUE_DATES_2026.length - 1];

export const emergencyFundVariants: CalculatorVariant[] = [
  {
    slug: "self-employed",
    lastUpdated: "2026-11-26",
    title: "Emergency Fund for Freelancers and Self-Employed",
    description: `A freelancer with ${usdWhole(monthly)} in monthly essentials needs ${usdWhole(fund12)} for 12 months of cover, double a 6-month fund. See the target and timeline.`,
    defaults: {
      housing: String(expenses.housing),
      utilities: String(expenses.utilities),
      groceries: String(expenses.groceries),
      transportation: String(expenses.transportation),
      insurance: String(expenses.insurance),
      debtPayments: String(expenses.debtPayments),
      other: String(expenses.other),
      currentSavings: String(saved),
      months: "12",
    },
    intro: `Employees can lean on a paycheck while they look for the next job, but freelancers lose income client by client and usually have no unemployment benefits to fall back on. With ${usdWhole(monthly)} of essential monthly costs, including a self-paid health premium of ${usdWhole(premiumMonthly)} (the KFF 2026 average for single coverage, ${usdWhole(KFF_SINGLE_PREMIUM_2026)} a year), a 12-month fund is ${usdWhole(fund12)}. That is twice the ${usdWhole(fund6)} a 6-month fund would hold. The target covers living costs only; money owed for taxes belongs in a separate account.`,
    tips: [
      `Build it in tiers. Start with three months (${usdWhole(fund3)}) of same-day cash, then extend to six (${usdWhole(fund6)}) and finally twelve (${usdWhole(fund12)}). The first tier covers a lost client or a slow quarter; the later tiers cover a lost year, a long illness, or a market downturn in your field.`,
      `Size the fund to how long your income has gone quiet before. If the longest gap between paying projects was four months, hold at least that plus three months of margin: 7 months, or ${usdWhole(monthly * 7)}. A freelancer with one anchor client carries more risk than one with eight small ones, so add months for concentration.`,
      `Keep tax money out of the fund. Estimated payments are due four times a year, and the last 2026 date is ${nextEstimatedTaxDate}. Move a fixed share of every invoice into a separate tax account so an emergency withdrawal never comes out of money you owe the IRS.`,
      `Health insurance is the biggest swing cost. At ${usdWhole(premiumMonthly)} a month it is about ${insuranceShare.toFixed(0)}% of the ${usdWhole(monthly)} budget. A high-deductible plan can lower the premium but raises the cash you need for a claim, so add the deductible to the fund if you choose one.`,
      `With ${usdWhole(saved)} already saved, the ${usdWhole(gap12)} gap takes about ${months20} months at 20% of expenses (${usdWhole(monthly * 0.2)} a month) and ${months10} months at 10% (${usdWhole(monthly * 0.1)} a month). On irregular income, save a percentage of each invoice instead of a fixed amount: 10% of every payment is easier to sustain than a fixed ${usdWhole(monthly * 0.2)} in a slow month.`,
    ],
    keyResults: [
      { label: "Monthly essential expenses", value: usdWhole(monthly) },
      { label: "3-month fund", value: usdWhole(fund3) },
      { label: "6-month fund", value: usdWhole(fund6) },
      { label: "12-month fund (calculator default)", value: usdWhole(fund12) },
      { label: `Still needed after ${usdWhole(saved)} saved`, value: usdWhole(gap12) },
      { label: "Months to finish at 20% of expenses", value: `${months20} months` },
    ],
    comparisonNote: `The standard emergency fund page uses six months for a typical household. The same ${usdWhole(monthly)} budget needs ${usdWhole(fund12)} here, against ${usdWhole(fund6)}, because a freelancer has no employer notice period or severance, and income can stop in a single day. Compared with the savings goal calculator, which assumes a fixed monthly deposit, this fund is built best as a percentage of each invoice.`,
    faq: [
      {
        q: "How many months should a freelancer keep in an emergency fund?",
        a: `Most guidance for self-employed workers points to 9 to 12 months of essential expenses, against 3 to 6 for salaried employees. At ${usdWhole(monthly)} a month that is ${usdWhole(monthly * 9)} to ${usdWhole(fund12)}. If your income comes from several steady clients, 6 months (${usdWhole(fund6)}) can be a reasonable first target.`,
      },
      {
        q: "Should self-employed taxes come out of the emergency fund?",
        a: `No. Keep a separate tax account funded from each invoice so the emergency fund only covers living costs. Estimated tax payments are due quarterly, and missing one can bring an underpayment penalty on top of the tax itself. Mixing the two accounts is how a freelancer ends up borrowing from the IRS.`,
      },
      {
        q: "Where should a freelancer keep a 12-month emergency fund?",
        a: `Keep the first three months (${usdWhole(fund3)}) in an FDIC-insured savings account with same-day transfers. The remaining months can sit in a high-yield savings account or short-term CDs, as long as you can reach the money within a few days.`,
      },
      {
        q: "Can I count my retirement account or a credit line as part of the fund?",
        a: `Treat them as a last resort, not part of the fund. Early retirement withdrawals can trigger income tax and, in most cases, a 10% penalty before age 59½, and a credit line charges interest exactly when income is low. Only cash you can reach without a penalty counts toward the ${usdWhole(fund12)} target.`,
      },
    ],
    sources: [WAGE_BENCHMARK_SOURCES.kff2026, TAX_SOURCES.estimatedTaxForm],
    sourcesChecked: "November 2026",
    sourcesNote:
      "The expense budget is an illustrative single-person freelancer profile; only the health premium is a published average. Replace the defaults with your own numbers.",
  },
];
