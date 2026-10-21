"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

interface YearRow {
  year: number;
  portfolio: number;
  fireTarget: number;
  annualSavings: number;
}

interface Props {
  defaults?: Record<string, string>;
}

export function FireCalculator({ defaults }: Props) {
  const [annualExpenses, setAnnualExpenses] = useState(defaults?.annualExpenses || "50000");
  const [annualIncome, setAnnualIncome] = useState(defaults?.annualIncome || "80000");
  const [currentSavings, setCurrentSavings] = useState(defaults?.currentSavings || "100000");
  const [expectedReturn, setExpectedReturn] = useState(defaults?.expectedReturn || "7");
  const [withdrawalRate, setWithdrawalRate] = useState(defaults?.withdrawalRate || "4");
  const [expenseInflation, setExpenseInflation] = useState(defaults?.expenseInflation || "3");

  const results = useMemo(() => {
    const expenses = parseFloat(annualExpenses) || 0;
    const income = parseFloat(annualIncome) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const returnRate = (parseFloat(expectedReturn) || 0) / 100;
    const withdrawal = (parseFloat(withdrawalRate) || 4) / 100;
    const inflation = (parseFloat(expenseInflation) || 0) / 100;

    if (expenses <= 0 || income <= 0 || withdrawal <= 0) return null;

    const annualSavingsAmount = income - expenses;
    if (annualSavingsAmount < 0) return null;

    const savingsRate = (annualSavingsAmount / income) * 100;
    let fireNumber = expenses / withdrawal;
    let portfolio = savings;
    let yearsToFire: number | null = null;
    const currentYear = new Date().getFullYear();
    const yearlyData: YearRow[] = [];

    yearlyData.push({
      year: 0,
      portfolio: savings,
      fireTarget: fireNumber,
      annualSavings: annualSavingsAmount,
    });

    if (portfolio >= fireNumber) {
      yearsToFire = 0;
    }

    for (let y = 1; y <= 60; y++) {
      portfolio = (portfolio + annualSavingsAmount) * (1 + returnRate);
      fireNumber *= 1 + inflation;

      yearlyData.push({
        year: y,
        portfolio,
        fireTarget: fireNumber,
        annualSavings: annualSavingsAmount,
      });

      if (yearsToFire === null && portfolio >= fireNumber) {
        yearsToFire = y;
      }
    }

    const initialFireNumber = expenses / withdrawal;
    const gap = Math.max(0, initialFireNumber - savings);
    const fireYear = yearsToFire !== null ? currentYear + yearsToFire : null;

    return {
      fireNumber: initialFireNumber,
      annualSavings: annualSavingsAmount,
      savingsRate,
      yearsToFire,
      fireYear,
      gap: yearsToFire === 0 ? 0 : gap,
      currentPortfolio: savings,
      yearlyData,
      reachedFire: yearsToFire !== null,
    };
  }, [annualExpenses, annualIncome, currentSavings, expectedReturn, withdrawalRate, expenseInflation]);

  const savingsRateLabel =
    results && results.savingsRate >= 50
      ? "Excellent — well above average"
      : results && results.savingsRate >= 30
        ? "Strong — above the 20% benchmark"
        : results && results.savingsRate >= 20
          ? "Good — meets the recommended minimum"
          : "Below average — consider increasing savings";

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField
          label="Annual Expenses"
          id="annualExpenses"
          value={annualExpenses}
          onChange={setAnnualExpenses}
          prefix="$"
          min={0}
          step={1000}
          helpText="Total annual spending in today's dollars"
        />
        <InputField
          label="Annual Income (After Tax)"
          id="annualIncome"
          value={annualIncome}
          onChange={setAnnualIncome}
          prefix="$"
          min={0}
          step={1000}
        />
        <InputField
          label="Current Savings / Investments"
          id="currentSavings"
          value={currentSavings}
          onChange={setCurrentSavings}
          prefix="$"
          min={0}
          step={1000}
        />
        <InputField
          label="Expected Annual Return"
          id="expectedReturn"
          value={expectedReturn}
          onChange={setExpectedReturn}
          suffix="%"
          min={0}
          max={20}
          step={0.5}
        />
        <InputField
          label="Safe Withdrawal Rate"
          id="withdrawalRate"
          value={withdrawalRate}
          onChange={setWithdrawalRate}
          suffix="%"
          min={2}
          max={8}
          step={0.5}
          helpText="4% is common; Morningstar's 2026 base case for new retirees is 3.9%"
        />
        <InputField
          label="Annual Expense Inflation"
          id="expenseInflation"
          value={expenseInflation}
          onChange={setExpenseInflation}
          suffix="%"
          min={0}
          max={10}
          step={0.5}
        />
      </div>

      {results ? (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-brand-50 p-4 text-center">
              <p className="text-sm font-medium text-brand-700">FIRE Number</p>
              <p className="mt-1 text-2xl font-bold text-brand-900">
                {formatCurrency(results.fireNumber)}
              </p>
              <p className="mt-1 text-xs text-brand-600">
                Target portfolio for financial independence
              </p>
            </div>
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-sm font-medium text-accent-700">Years to FIRE</p>
              <p className="mt-1 text-2xl font-bold text-accent-900">
                {results.yearsToFire !== null ? results.yearsToFire : "60+"}
              </p>
              <p className="mt-1 text-xs text-accent-600">
                {results.fireYear
                  ? `Target date: ${results.fireYear}`
                  : "Increase savings rate to reach FIRE sooner"}
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <p className="text-sm font-medium text-green-700">Savings Rate</p>
              <p className="mt-1 text-2xl font-bold text-green-900">
                {results.savingsRate.toFixed(1)}%
              </p>
              <p className="mt-1 text-xs text-green-600">{savingsRateLabel}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-ink-200 p-4 text-center">
              <p className="text-xs text-ink-500">Annual Savings</p>
              <p className="mt-1 font-semibold text-ink-800">
                {formatCurrency(results.annualSavings)}/yr
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 p-4 text-center">
              <p className="text-xs text-ink-500">Current Portfolio</p>
              <p className="mt-1 font-semibold text-ink-800">
                {formatCurrency(results.currentPortfolio)}
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 p-4 text-center">
              <p className="text-xs text-ink-500">Gap to FIRE</p>
              <p className="mt-1 font-semibold text-ink-800">
                {results.reachedFire && results.yearsToFire === 0
                  ? "Already reached!"
                  : formatCurrency(results.gap)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-ink-700">Year-by-Year Projection</p>
            <div className="mt-3 max-h-96 overflow-auto rounded-lg border border-ink-200">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-ink-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-ink-600">Year</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Portfolio</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">FIRE Target</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Gap</th>
                    <th className="px-3 py-2 text-center font-medium text-ink-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyData
                    .filter((row) => row.year <= (results.yearsToFire ?? 30) + 2)
                    .slice(0, 25)
                    .map((row) => {
                      const gap = row.fireTarget - row.portfolio;
                      const reached = row.portfolio >= row.fireTarget;
                      return (
                        <tr key={row.year} className="border-t border-ink-100">
                          <td className="px-3 py-2 text-ink-700">
                            {row.year === 0 ? "Now" : `Year ${row.year}`}
                          </td>
                          <td className="px-3 py-2 text-right text-brand-700">
                            {formatCurrency(row.portfolio)}
                          </td>
                          <td className="px-3 py-2 text-right text-ink-700">
                            {formatCurrency(row.fireTarget)}
                          </td>
                          <td className="px-3 py-2 text-right text-ink-700">
                            {reached ? "—" : formatCurrency(gap)}
                          </td>
                          <td className="px-3 py-2 text-center text-ink-700">
                            {reached ? "FIRE reached" : "Saving"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-xs text-ink-400">
            FIRE number based on the {withdrawalRate}% safe withdrawal rule. Assumes constant
            nominal savings and compound investment growth. Expense inflation increases the target
            over time.
          </p>
        </div>
      ) : (
        <div className="mt-8 rounded-lg bg-amber-50 p-4 text-center text-sm text-amber-800">
          Enter valid income and expense values. Your expenses must be less than your income to
          calculate a savings rate and FIRE timeline.
        </div>
      )}
    </div>
  );
}
