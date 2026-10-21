"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";
import { DEFAULT_NEW_CAR_APR } from "@/lib/market-data";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function calcMonthlyPayment(loanAmount: number, annualRate: number, termMonths: number): number {
  if (loanAmount <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return loanAmount / termMonths;
  return (loanAmount * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
}

function calcMaxLoanFromPayment(payment: number, annualRate: number, termMonths: number): number {
  if (payment <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return payment * termMonths;
  return payment * ((1 - Math.pow(1 + r, -termMonths)) / r);
}

function getAffordabilityRating(pctOfIncome: number): {
  label: string;
  color: string;
  bg: string;
  description: string;
} {
  if (pctOfIncome <= 10) {
    return {
      label: "Excellent",
      color: "text-green-700",
      bg: "bg-green-50",
      description: "Your total car costs are within the 10% guideline. This is a sustainable budget.",
    };
  }
  if (pctOfIncome <= 15) {
    return {
      label: "Moderate",
      color: "text-amber-700",
      bg: "bg-amber-50",
      description: "Your car costs exceed the 10% rule but stay under 15%. Consider a lower price or shorter term.",
    };
  }
  if (pctOfIncome <= 20) {
    return {
      label: "Stretched",
      color: "text-orange-700",
      bg: "bg-orange-50",
      description: "Car costs consume 15-20% of gross income. You may struggle with other financial goals.",
    };
  }
  return {
    label: "Over Budget",
    color: "text-red-700",
    bg: "bg-red-50",
    description: "Car costs exceed 20% of gross income. This level of spending is difficult to sustain long term.",
  };
}

interface ScenarioRow {
  price: number;
  loanAmount: number;
  monthlyPayment: number;
  totalMonthly: number;
  pctOfIncome: number;
  rating: ReturnType<typeof getAffordabilityRating>;
}

interface Props {
  defaults?: Record<string, string>;
}

export function CarAffordabilityCalculator({ defaults }: Props) {
  const [annualIncome, setAnnualIncome] = useState(defaults?.annualIncome || "65000");
  const [takeHomePay, setTakeHomePay] = useState(defaults?.takeHomePay || "4200");
  const [monthlyDebts, setMonthlyDebts] = useState(defaults?.monthlyDebts || "500");
  const [downPayment, setDownPayment] = useState(defaults?.downPayment || "5000");
  const [tradeIn, setTradeIn] = useState(defaults?.tradeIn || "0");
  const [interestRate, setInterestRate] = useState(defaults?.interestRate || DEFAULT_NEW_CAR_APR);
  const [termMonths, setTermMonths] = useState(defaults?.termMonths || "60");
  const [insurance, setInsurance] = useState(defaults?.insurance || "150");
  const [fuel, setFuel] = useState(defaults?.fuel || "150");

  const results = useMemo(() => {
    const income = parseFloat(annualIncome) || 0;
    const takeHome = parseFloat(takeHomePay) || 0;
    const debts = parseFloat(monthlyDebts) || 0;
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeIn) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseInt(termMonths) || 60;
    const monthlyInsurance = parseFloat(insurance) || 0;
    const monthlyFuel = parseFloat(fuel) || 0;

    if (income <= 0) return null;

    const monthlyGross = income / 12;
    const maxTotalCarBudget = monthlyGross * 0.1;
    const maxPayment = Math.max(0, maxTotalCarBudget - monthlyInsurance - monthlyFuel);
    const maxLoanAmount = calcMaxLoanFromPayment(maxPayment, rate, term);
    const maxCarPrice = Math.max(0, maxLoanAmount + down + trade);

    const recommendedDown20 = maxCarPrice * 0.2;
    const incomeBasedDown20 = income * 0.2;

    const actualLoanAmount = Math.max(0, maxCarPrice - down - trade);
    const monthlyPayment = calcMonthlyPayment(actualLoanAmount, rate, term);
    const totalMonthlyCar = monthlyPayment + monthlyInsurance + monthlyFuel;
    const pctOfIncome = monthlyGross > 0 ? (totalMonthlyCar / monthlyGross) * 100 : 0;
    const rating = getAffordabilityRating(pctOfIncome);

    const totalPayments = monthlyPayment * term;
    const totalInterest = totalPayments - actualLoanAmount;
    const totalInsurance = monthlyInsurance * term;
    const totalFuel = monthlyFuel * term;
    const totalCostOfOwnership = totalPayments + totalInsurance + totalFuel;

    const remainingTakeHome = takeHome - totalMonthlyCar - debts;

    const rule20410 = {
      down20: {
        pass: down >= recommendedDown20,
        required: recommendedDown20,
        actual: down,
        incomeReference: incomeBasedDown20,
      },
      term48: {
        pass: term <= 48,
        required: 48,
        actual: term,
      },
      budget10: {
        pass: pctOfIncome <= 10,
        limit: maxTotalCarBudget,
        actual: totalMonthlyCar,
        pct: pctOfIncome,
      },
    };

    const comparisonPrices = [15000, 20000, 25000, 30000, 35000, 40000];
    const scenarios: ScenarioRow[] = comparisonPrices.map((price) => {
      const loan = Math.max(0, price - down - trade);
      const payment = calcMonthlyPayment(loan, rate, term);
      const totalMonthly = payment + monthlyInsurance + monthlyFuel;
      const pct = monthlyGross > 0 ? (totalMonthly / monthlyGross) * 100 : 0;
      return {
        price,
        loanAmount: loan,
        monthlyPayment: payment,
        totalMonthly,
        pctOfIncome: pct,
        rating: getAffordabilityRating(pct),
      };
    });

    return {
      monthlyGross,
      maxTotalCarBudget,
      maxPayment,
      maxLoanAmount,
      maxCarPrice,
      recommendedDown20,
      incomeBasedDown20,
      actualLoanAmount,
      monthlyPayment,
      totalMonthlyCar,
      pctOfIncome,
      rating,
      totalInterest,
      totalCostOfOwnership,
      totalPayments,
      totalInsurance,
      totalFuel,
      remainingTakeHome,
      rule20410,
      scenarios,
      term,
      down,
      debts,
      takeHome,
    };
  }, [
    annualIncome,
    takeHomePay,
    monthlyDebts,
    downPayment,
    tradeIn,
    interestRate,
    termMonths,
    insurance,
    fuel,
  ]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField
          label="Annual Gross Income"
          id="annualIncome"
          value={annualIncome}
          onChange={setAnnualIncome}
          prefix="$"
          min={0}
          step={1000}
        />
        <InputField
          label="Monthly Take-Home Pay"
          id="takeHomePay"
          value={takeHomePay}
          onChange={setTakeHomePay}
          prefix="$"
          min={0}
          step={100}
          helpText="After taxes and deductions"
        />
        <InputField
          label="Monthly Debt Payments"
          id="monthlyDebts"
          value={monthlyDebts}
          onChange={setMonthlyDebts}
          prefix="$"
          min={0}
          step={50}
          helpText="Existing car, student loans, credit cards, etc."
        />
        <InputField
          label="Down Payment Amount"
          id="downPayment"
          value={downPayment}
          onChange={setDownPayment}
          prefix="$"
          min={0}
          step={500}
        />
        <InputField
          label="Trade-in Value"
          id="tradeIn"
          value={tradeIn}
          onChange={setTradeIn}
          prefix="$"
          min={0}
          step={500}
        />
        <InputField
          label="Interest Rate (APR)"
          id="interestRate"
          value={interestRate}
          onChange={setInterestRate}
          suffix="%"
          min={0}
          max={30}
          step={0.1}
        />
        <div>
          <label htmlFor="termMonths" className="block text-sm font-medium text-ink-700">
            Loan Term
          </label>
          <select
            id="termMonths"
            value={termMonths}
            onChange={(e) => setTermMonths(e.target.value)}
            className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="24">24 months (2 years)</option>
            <option value="36">36 months (3 years)</option>
            <option value="48">48 months (4 years)</option>
            <option value="60">60 months (5 years)</option>
            <option value="72">72 months (6 years)</option>
            <option value="84">84 months (7 years)</option>
          </select>
        </div>
        <InputField
          label="Estimated Monthly Insurance"
          id="insurance"
          value={insurance}
          onChange={setInsurance}
          prefix="$"
          min={0}
          step={25}
        />
        <InputField
          label="Estimated Monthly Fuel"
          id="fuel"
          value={fuel}
          onChange={setFuel}
          prefix="$"
          min={0}
          step={25}
        />
      </div>

      {results ? (
        <div className="mt-8">
          {/* Top Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-brand-50 p-5 text-center">
              <p className="text-sm font-medium text-brand-700">Max Affordable Car Price</p>
              <p className="mt-1 text-3xl font-bold text-brand-900">
                {formatCurrency(results.maxCarPrice)}
              </p>
              <p className="mt-2 text-xs text-brand-600">
                Based on your down payment of {formatCurrency(results.down)} and loan terms
              </p>
            </div>
            <div className="rounded-lg bg-accent-50 p-5 text-center">
              <p className="text-sm font-medium text-accent-700">Recommended Monthly Payment</p>
              <p className="mt-1 text-3xl font-bold text-accent-900">
                {formatCurrency(results.maxPayment)}
              </p>
              <p className="mt-2 text-xs text-accent-600">
                Max loan payment within the 10% rule
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-5 text-center">
              <p className="text-sm font-medium text-ink-600">Your 10% Budget</p>
              <p className="mt-1 text-3xl font-bold text-ink-800">
                {formatCurrency(results.maxTotalCarBudget)}/mo
              </p>
              <p className="mt-2 text-xs text-ink-500">
                10% of {formatCurrency(results.monthlyGross)} gross monthly income
              </p>
            </div>
          </div>

          {/* Affordability Rating */}
          <div className={`mt-6 rounded-lg ${results.rating.bg} p-5 text-center`}>
            <p className={`text-sm font-medium ${results.rating.color}`}>Affordability Rating</p>
            <p className={`mt-1 text-3xl font-bold ${results.rating.color}`}>
              {results.rating.label}
            </p>
            <p className={`mt-2 text-sm ${results.rating.color}`}>
              Total car costs are {results.pctOfIncome.toFixed(1)}% of gross monthly income
            </p>
            <p className="mt-2 text-sm text-ink-600">{results.rating.description}</p>
          </div>

          {/* 20/4/10 Rule Checklist */}
          <div className="mt-6 rounded-lg border border-ink-200 p-5">
            <p className="text-sm font-medium text-ink-700">20/4/10 Rule Checklist</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-ink-700">20% Down Payment</span>
                  <p className="text-xs text-ink-500">
                    Recommended: {formatCurrency(results.rule20410.down20.required)} (20% of max price)
                  </p>
                </div>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    results.rule20410.down20.pass
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {results.rule20410.down20.pass ? "Pass" : "Fail"} — {formatCurrency(results.rule20410.down20.actual)} down
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-ink-700">4-Year Maximum Loan Term</span>
                  <p className="text-xs text-ink-500">Recommended: 48 months or less</p>
                </div>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    results.rule20410.term48.pass
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {results.rule20410.term48.pass ? "Pass" : "Fail"} — {results.rule20410.term48.actual} months
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-ink-700">10% Total Car Cost Limit</span>
                  <p className="text-xs text-ink-500">
                    Payment + insurance + fuel must stay under {formatCurrency(results.rule20410.budget10.limit)}/mo
                  </p>
                </div>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    results.rule20410.budget10.pass
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {results.rule20410.budget10.pass ? "Pass" : "Fail"} — {formatCurrency(results.rule20410.budget10.actual)}/mo ({results.rule20410.budget10.pct.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="mt-6 rounded-lg border border-ink-200 p-5">
            <p className="text-sm font-medium text-ink-700">Cost Breakdown at Max Affordable Price</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-600">Monthly Loan Payment</span>
                <span className="font-medium text-ink-900">{formatCurrency(results.monthlyPayment)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-600">Monthly Insurance</span>
                <span className="font-medium text-ink-900">{formatCurrency(parseFloat(insurance) || 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-600">Monthly Fuel</span>
                <span className="font-medium text-ink-900">{formatCurrency(parseFloat(fuel) || 0)}</span>
              </div>
              <div className="border-t border-ink-200 pt-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink-700">Total Monthly Car Cost</span>
                <span className="font-bold text-ink-900">{formatCurrency(results.totalMonthlyCar)}</span>
              </div>
            </div>
            <div className="mt-4 border-t border-ink-200 pt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-600">Total Loan Payments ({results.term} months)</span>
                <span className="font-medium text-ink-800">{formatCurrency(results.totalPayments)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-600">Total Interest Paid</span>
                <span className="font-medium text-ink-800">{formatCurrency(results.totalInterest)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-600">Total Insurance ({results.term} months)</span>
                <span className="font-medium text-ink-800">{formatCurrency(results.totalInsurance)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-600">Total Fuel ({results.term} months)</span>
                <span className="font-medium text-ink-800">{formatCurrency(results.totalFuel)}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-ink-700">Total Cost of Ownership</span>
                <span className="text-ink-900">{formatCurrency(results.totalCostOfOwnership)}</span>
              </div>
            </div>
          </div>

          {/* Take-Home Context */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-xs font-medium text-ink-500">Take-Home After Car + Debts</p>
              <p className="mt-1 text-lg font-bold text-ink-800">
                {formatCurrency(results.remainingTakeHome)}/mo
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-xs font-medium text-ink-500">Loan Amount at Max Price</p>
              <p className="mt-1 text-lg font-bold text-ink-800">
                {formatCurrency(results.actualLoanAmount)}
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-xs font-medium text-ink-500">20% Down (Income Reference)</p>
              <p className="mt-1 text-lg font-bold text-ink-800">
                {formatCurrency(results.incomeBasedDown20)}
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink-700">Price Comparison Scenarios</p>
            <div className="mt-2 overflow-auto rounded-lg border border-ink-200">
              <table className="w-full text-sm">
                <thead className="bg-ink-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-ink-600">Car Price</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Loan Payment</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Total Monthly</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">% of Income</th>
                    <th className="px-3 py-2 text-center font-medium text-ink-600">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {results.scenarios.map((s) => (
                    <tr key={s.price} className="border-t border-ink-100">
                      <td className="px-3 py-2 font-medium text-ink-800">
                        {formatCurrency(s.price)}
                        {Math.abs(s.price - results.maxCarPrice) < 2500 && s.price >= results.maxCarPrice - 2500 && (
                          <span className="ml-1 text-xs text-brand-600">(near max)</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-right text-ink-700">
                        {formatCurrency(s.monthlyPayment)}
                      </td>
                      <td className="px-3 py-2 text-right text-ink-700">
                        {formatCurrency(s.totalMonthly)}
                      </td>
                      <td className="px-3 py-2 text-right text-ink-700">
                        {s.pctOfIncome.toFixed(1)}%
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${s.rating.bg} ${s.rating.color}`}
                        >
                          {s.rating.label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-lg bg-amber-50 p-4 text-center text-sm text-amber-800">
          Enter a valid annual income to calculate your car affordability.
        </div>
      )}
    </div>
  );
}
