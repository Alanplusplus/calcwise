"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

interface YearRow {
  year: number;
  balance: number;
  contributions: number;
  interest: number;
}

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualRate, setAnnualRate] = useState("7");
  const [years, setYears] = useState("20");
  const [compounding, setCompounding] = useState("12");

  const results = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = (parseFloat(annualRate) || 0) / 100;
    const n = parseInt(compounding) || 12;
    const t = parseInt(years) || 1;

    const periodicRate = rate / n;
    const periodsPerYear = n;

    const yearlyData: YearRow[] = [];
    let balance = p;
    let totalContributions = p;

    for (let year = 1; year <= t; year++) {
      for (let period = 0; period < periodsPerYear; period++) {
        balance *= 1 + periodicRate;
        const monthsInPeriod = 12 / periodsPerYear;
        balance += monthly * monthsInPeriod;
        totalContributions += monthly * monthsInPeriod;
      }
      yearlyData.push({
        year,
        balance,
        contributions: totalContributions,
        interest: balance - totalContributions,
      });
    }

    const finalBalance = balance;
    const totalInterest = finalBalance - totalContributions;

    return { finalBalance, totalContributions, totalInterest, yearlyData };
  }, [principal, monthlyContribution, annualRate, years, compounding]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField
          label="Initial Investment"
          id="principal"
          value={principal}
          onChange={setPrincipal}
          prefix="$"
          min={0}
        />
        <InputField
          label="Monthly Contribution"
          id="monthlyContribution"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          prefix="$"
          min={0}
        />
        <InputField
          label="Annual Interest Rate"
          id="annualRate"
          value={annualRate}
          onChange={setAnnualRate}
          suffix="%"
          min={0}
          max={50}
          step={0.1}
        />
        <InputField
          label="Time Period"
          id="years"
          value={years}
          onChange={setYears}
          suffix="years"
          min={1}
          max={100}
        />
        <div>
          <label htmlFor="compounding" className="block text-sm font-medium text-ink-700">
            Compounding Frequency
          </label>
          <select
            id="compounding"
            value={compounding}
            onChange={(e) => setCompounding(e.target.value)}
            className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="1">Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>
      </div>

      {results && (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-sm font-medium text-accent-700">Future Value</p>
              <p className="mt-1 text-2xl font-bold text-accent-900">
                {formatCurrency(results.finalBalance)}
              </p>
            </div>
            <div className="rounded-lg bg-brand-50 p-4 text-center">
              <p className="text-sm font-medium text-brand-700">Total Contributions</p>
              <p className="mt-1 text-2xl font-bold text-brand-900">
                {formatCurrency(results.totalContributions)}
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Interest Earned</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">
                {formatCurrency(results.totalInterest)}
              </p>
            </div>
          </div>

          {/* Growth Chart (text-based) */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink-700">Growth Over Time</p>
            <div className="mt-3 max-h-64 overflow-auto rounded-lg border border-ink-200">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-ink-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-ink-600">Year</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Balance</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Contributions</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Interest</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyData.map((row) => (
                    <tr key={row.year} className="border-t border-ink-100">
                      <td className="px-3 py-2 text-ink-700">{row.year}</td>
                      <td className="px-3 py-2 text-right font-medium text-ink-800">{formatCurrency(row.balance)}</td>
                      <td className="px-3 py-2 text-right text-ink-600">{formatCurrency(row.contributions)}</td>
                      <td className="px-3 py-2 text-right text-accent-700">{formatCurrency(row.interest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
