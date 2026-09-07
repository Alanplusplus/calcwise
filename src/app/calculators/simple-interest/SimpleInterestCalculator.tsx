"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

interface Props {
  defaults?: Record<string, string>;
}

interface YearRow {
  year: number;
  interestEarned: number;
  cumulativeInterest: number;
  balance: number;
}

export function SimpleInterestCalculator({ defaults }: Props) {
  const [principal, setPrincipal] = useState(defaults?.principal || "10000");
  const [annualRate, setAnnualRate] = useState(defaults?.annualRate || "5");
  const [years, setYears] = useState(defaults?.years || "5");
  const [frequency, setFrequency] = useState(defaults?.frequency || "yearly");

  const results = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(annualRate) || 0) / 100;
    const t = parseFloat(years) || 0;

    if (p <= 0 || r <= 0 || t <= 0) return null;

    const totalInterest = p * r * t;
    const finalAmount = p + totalInterest;
    const dailyInterest = p * r / 365;
    const monthlyInterest = p * r / 12;
    const annualInterest = p * r;

    const yearData: YearRow[] = [];
    let cumulative = 0;

    if (frequency === "yearly") {
      const wholeYears = Math.floor(t);
      for (let y = 1; y <= wholeYears; y++) {
        cumulative += annualInterest;
        yearData.push({
          year: y,
          interestEarned: annualInterest,
          cumulativeInterest: cumulative,
          balance: p + cumulative,
        });
      }
      const fractionalYear = t - wholeYears;
      if (fractionalYear > 0) {
        const fractionalInterest = annualInterest * fractionalYear;
        cumulative += fractionalInterest;
        yearData.push({
          year: wholeYears + 1,
          interestEarned: fractionalInterest,
          cumulativeInterest: cumulative,
          balance: p + cumulative,
        });
      }
    } else {
      const totalMonths = Math.round(t * 12);
      for (let m = 1; m <= totalMonths; m++) {
        cumulative += monthlyInterest;
        yearData.push({
          year: m,
          interestEarned: monthlyInterest,
          cumulativeInterest: cumulative,
          balance: p + cumulative,
        });
      }
    }

    return {
      totalInterest,
      finalAmount,
      dailyInterest,
      monthlyInterest,
      annualInterest,
      yearData,
    };
  }, [principal, annualRate, years, frequency]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InputField
          label="Principal Amount"
          id="principal"
          value={principal}
          onChange={setPrincipal}
          prefix="$"
          min={0}
          step={1000}
          helpText="Initial amount of money"
        />
        <InputField
          label="Annual Interest Rate"
          id="annualRate"
          value={annualRate}
          onChange={setAnnualRate}
          suffix="%"
          min={0}
          max={100}
          step={0.1}
          helpText="Yearly interest rate"
        />
        <InputField
          label="Time Period"
          id="years"
          value={years}
          onChange={setYears}
          suffix="years"
          min={0.1}
          max={100}
          step={0.5}
          helpText="Duration in years"
        />
        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-ink-700">
            View Breakdown
          </label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {results && (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
              <p className="text-sm font-medium text-brand-700">Total Interest</p>
              <p className="mt-2 text-xl font-bold text-brand-900">
                {formatCurrency(results.totalInterest)}
              </p>
              <p className="mt-1 text-sm text-brand-700">
                Over {years} years
              </p>
            </div>
            <div className="rounded-lg border border-accent-200 bg-accent-50 p-4">
              <p className="text-sm font-medium text-accent-700">Final Amount</p>
              <p className="mt-2 text-xl font-bold text-accent-900">
                {formatCurrency(results.finalAmount)}
              </p>
              <p className="mt-1 text-sm text-accent-700">
                Principal + Interest
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Annual Interest</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {formatCurrency(results.annualInterest)}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Per year
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Monthly Interest</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {formatCurrency(results.monthlyInterest)}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Per month
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Daily Interest</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {formatCurrency(results.dailyInterest)}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Per day
              </p>
            </div>
          </div>

          {results.yearData.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <h3 className="mb-3 text-sm font-semibold text-ink-700">
                {frequency === "yearly" ? "Year-by-Year" : "Month-by-Month"} Breakdown
              </h3>
              <table className="w-full min-w-[500px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-200 text-ink-500">
                    <th className="py-2 pr-4 font-medium">
                      {frequency === "yearly" ? "Year" : "Month"}
                    </th>
                    <th className="py-2 pr-4 font-medium">Interest Earned</th>
                    <th className="py-2 pr-4 font-medium">Total Interest</th>
                    <th className="py-2 font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearData.map((row) => (
                    <tr key={row.year} className="border-b border-ink-100">
                      <td className="py-2 pr-4 text-ink-800">{row.year}</td>
                      <td className="py-2 pr-4 text-green-700">{formatCurrency(row.interestEarned)}</td>
                      <td className="py-2 pr-4 text-green-700">{formatCurrency(row.cumulativeInterest)}</td>
                      <td className="py-2 text-ink-800">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
