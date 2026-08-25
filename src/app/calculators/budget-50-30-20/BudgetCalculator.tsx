"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

interface Props {
  defaults?: Record<string, string>;
}

export function BudgetCalculator({ defaults }: Props) {
  const [monthlyIncome, setMonthlyIncome] = useState(defaults?.monthlyIncome || "5000");

  const results = useMemo(() => {
    const income = parseFloat(monthlyIncome) || 0;
    const needs = income * 0.5;
    const wants = income * 0.3;
    const savings = income * 0.2;

    return {
      income,
      needs,
      wants,
      savings,
      annualNeeds: needs * 12,
      annualWants: wants * 12,
      annualSavings: savings * 12,
      annualIncome: income * 12,
    };
  }, [monthlyIncome]);

  return (
    <div>
      <InputField
        label="Monthly After-Tax Income"
        id="monthlyIncome"
        value={monthlyIncome}
        onChange={setMonthlyIncome}
        prefix="$"
        min={0}
        helpText="Your take-home pay after taxes and deductions"
      />

      {results && (
        <div className="mt-8">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-lg bg-brand-50 p-5">
              <p className="text-sm font-medium text-brand-700">Needs — 50%</p>
              <p className="mt-1 text-3xl font-bold text-brand-900">
                {formatCurrency(results.needs)}
              </p>
              <p className="mt-1 text-sm text-brand-700">per month</p>
              <ul className="mt-4 space-y-1 text-sm text-brand-800">
                <li>Housing (rent or mortgage)</li>
                <li>Utilities and groceries</li>
                <li>Insurance premiums</li>
                <li>Minimum debt payments</li>
              </ul>
            </div>

            <div className="rounded-lg bg-accent-50 p-5">
              <p className="text-sm font-medium text-accent-700">Wants — 30%</p>
              <p className="mt-1 text-3xl font-bold text-accent-900">
                {formatCurrency(results.wants)}
              </p>
              <p className="mt-1 text-sm text-accent-700">per month</p>
              <ul className="mt-4 space-y-1 text-sm text-accent-800">
                <li>Dining out and entertainment</li>
                <li>Shopping and hobbies</li>
                <li>Streaming and subscriptions</li>
                <li>Vacations and travel</li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 p-5">
              <p className="text-sm font-medium text-green-700">Savings — 20%</p>
              <p className="mt-1 text-3xl font-bold text-green-900">
                {formatCurrency(results.savings)}
              </p>
              <p className="mt-1 text-sm text-green-700">per month</p>
              <ul className="mt-4 space-y-1 text-sm text-green-800">
                <li>Emergency fund contributions</li>
                <li>Retirement accounts (401k, IRA)</li>
                <li>Extra debt payments</li>
                <li>Investments and long-term goals</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-ink-200 p-4">
            <p className="text-sm font-medium text-ink-700">Annual Totals</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs text-ink-500">Total Income</p>
                <p className="text-lg font-semibold text-ink-800">{formatCurrency(results.annualIncome)}</p>
              </div>
              <div>
                <p className="text-xs text-ink-500">Needs (50%)</p>
                <p className="text-lg font-semibold text-brand-800">{formatCurrency(results.annualNeeds)}</p>
              </div>
              <div>
                <p className="text-xs text-ink-500">Wants (30%)</p>
                <p className="text-lg font-semibold text-accent-800">{formatCurrency(results.annualWants)}</p>
              </div>
              <div>
                <p className="text-xs text-ink-500">Savings (20%)</p>
                <p className="text-lg font-semibold text-green-800">{formatCurrency(results.annualSavings)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
