"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function EmergencyFundCalculator() {
  const [housing, setHousing] = useState("1500");
  const [utilities, setUtilities] = useState("200");
  const [groceries, setGroceries] = useState("500");
  const [transportation, setTransportation] = useState("400");
  const [insurance, setInsurance] = useState("300");
  const [debtPayments, setDebtPayments] = useState("200");
  const [other, setOther] = useState("300");
  const [currentSavings, setCurrentSavings] = useState("5000");
  const [months, setMonths] = useState("6");

  const results = useMemo(() => {
    const monthlyExpenses =
      (parseFloat(housing) || 0) +
      (parseFloat(utilities) || 0) +
      (parseFloat(groceries) || 0) +
      (parseFloat(transportation) || 0) +
      (parseFloat(insurance) || 0) +
      (parseFloat(debtPayments) || 0) +
      (parseFloat(other) || 0);

    const targetMonths = parseInt(months) || 6;
    const current = parseFloat(currentSavings) || 0;
    const target = monthlyExpenses * targetMonths;
    const gap = Math.max(0, target - current);
    const percentFunded = target > 0 ? Math.min(100, (current / target) * 100) : 0;

    const monthsToGoal6Mo = gap > 0 ? Math.ceil(gap / (monthlyExpenses * 0.2)) : 0;
    const monthsToGoal10 = gap > 0 ? Math.ceil(gap / (monthlyExpenses * 0.1)) : 0;

    return {
      monthlyExpenses,
      target,
      current,
      gap,
      percentFunded,
      monthsToGoal6Mo,
      monthsToGoal10,
      targetMonths,
    };
  }, [housing, utilities, groceries, transportation, insurance, debtPayments, other, currentSavings, months]);

  return (
    <div>
      <p className="mb-4 text-sm text-ink-500">
        Enter your monthly essential expenses to calculate your recommended
        emergency fund target.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField label="Housing (rent/mortgage)" id="housing" value={housing} onChange={setHousing} prefix="$" min={0} />
        <InputField label="Utilities" id="utilities" value={utilities} onChange={setUtilities} prefix="$" min={0} />
        <InputField label="Groceries" id="groceries" value={groceries} onChange={setGroceries} prefix="$" min={0} />
        <InputField label="Transportation" id="transportation" value={transportation} onChange={setTransportation} prefix="$" min={0} />
        <InputField label="Insurance" id="insurance" value={insurance} onChange={setInsurance} prefix="$" min={0} />
        <InputField label="Debt Payments" id="debtPayments" value={debtPayments} onChange={setDebtPayments} prefix="$" min={0} />
        <InputField label="Other Essentials" id="other" value={other} onChange={setOther} prefix="$" min={0} />
        <InputField label="Current Emergency Savings" id="currentSavings" value={currentSavings} onChange={setCurrentSavings} prefix="$" min={0} />
        <div>
          <label htmlFor="months" className="block text-sm font-medium text-ink-700">
            Coverage Target
          </label>
          <select
            id="months"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="3">3 months (minimum)</option>
            <option value="6">6 months (recommended)</option>
            <option value="9">9 months (conservative)</option>
            <option value="12">12 months (self-employed)</option>
          </select>
        </div>
      </div>

      {results && (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Monthly Expenses</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">
                {formatCurrency(results.monthlyExpenses)}
              </p>
            </div>
            <div className="result-hero rounded-lg bg-brand-50 p-4 text-center">
              <p className="text-sm font-medium text-brand-700">
                Target ({results.targetMonths} months)
              </p>
              <p className="mt-1 text-2xl font-bold text-brand-900">
                {formatCurrency(results.target)}
              </p>
            </div>
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-sm font-medium text-accent-700">Still Needed</p>
              <p className="mt-1 text-2xl font-bold text-accent-900">
                {formatCurrency(results.gap)}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-ink-700">Progress</span>
              <span className="text-ink-500">{results.percentFunded.toFixed(0)}% funded</span>
            </div>
            <div className="mt-2 h-4 overflow-hidden rounded-full bg-ink-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all"
                style={{ width: `${results.percentFunded}%` }}
              />
            </div>
          </div>

          {results.gap > 0 && (
            <div className="mt-4 rounded-lg border border-ink-200 p-4">
              <p className="text-sm font-medium text-ink-700">How long to reach your goal?</p>
              <ul className="mt-2 space-y-1 text-sm text-ink-600">
                <li>
                  Saving 20% of expenses ({formatCurrency(results.monthlyExpenses * 0.2)}/mo):{" "}
                  <strong>{results.monthsToGoal6Mo} months</strong>
                </li>
                <li>
                  Saving 10% of expenses ({formatCurrency(results.monthlyExpenses * 0.1)}/mo):{" "}
                  <strong>{results.monthsToGoal10} months</strong>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
