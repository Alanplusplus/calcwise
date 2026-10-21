"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function formatPercent(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";
}

const COMPOUNDING_OPTIONS: Record<string, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

interface MonthRow {
  month: number;
  balance: number;
  interestEarned: number;
  cumulativeInterest: number;
}

interface Props {
  defaults?: Record<string, string>;
}

export function CdCalculator({ defaults }: Props) {
  const [deposit, setDeposit] = useState(defaults?.deposit || "10000");
  const [apy, setApy] = useState(defaults?.apy || "4.55");
  const [termMonths, setTermMonths] = useState(defaults?.termMonths || "12");
  const [compounding, setCompounding] = useState(defaults?.compounding || "daily");

  const results = useMemo(() => {
    const principal = parseFloat(deposit) || 0;
    const rate = (parseFloat(apy) || 0) / 100;
    const months = parseInt(termMonths) || 1;
    const n = COMPOUNDING_OPTIONS[compounding] || 365;
    const years = months / 12;

    const periodicRate = rate / n;
    const totalPeriods = n * years;
    const finalValue = principal * Math.pow(1 + periodicRate, totalPeriods);
    const totalInterest = finalValue - principal;
    const effectiveAnnualRate = (Math.pow(1 + periodicRate, n) - 1) * 100;

    const monthsToShow = Math.min(12, months);
    const monthlyData: MonthRow[] = [];
    let balance = principal;
    let cumulativeInterest = 0;

    for (let month = 1; month <= monthsToShow; month++) {
      const monthFraction = month / 12;
      const monthBalance = principal * Math.pow(1 + periodicRate, n * monthFraction);
      const monthInterest = monthBalance - balance;
      cumulativeInterest = monthBalance - principal;
      balance = monthBalance;

      monthlyData.push({
        month,
        balance: monthBalance,
        interestEarned: monthInterest,
        cumulativeInterest,
      });
    }

    return {
      finalValue,
      totalInterest,
      effectiveAnnualRate,
      inputApy: parseFloat(apy) || 0,
      monthlyData,
    };
  }, [deposit, apy, termMonths, compounding]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InputField
          label="Initial Deposit"
          id="deposit"
          value={deposit}
          onChange={setDeposit}
          prefix="$"
          min={0}
        />
        <InputField
          label="APY"
          id="apy"
          value={apy}
          onChange={setApy}
          suffix="%"
          min={0}
          max={20}
          step={0.01}
        />
        <InputField
          label="Term"
          id="termMonths"
          value={termMonths}
          onChange={setTermMonths}
          suffix="months"
          min={1}
          max={120}
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
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
          </select>
        </div>
      </div>

      {results && (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-brand-50 p-4 text-center">
              <p className="text-sm font-medium text-brand-700">Total at Maturity</p>
              <p className="mt-1 text-2xl font-bold text-brand-900">
                {formatCurrency(results.finalValue)}
              </p>
            </div>
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-sm font-medium text-accent-700">Interest Earned</p>
              <p className="mt-1 text-2xl font-bold text-accent-900">
                {formatCurrency(results.totalInterest)}
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Stated APY</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">
                {formatPercent(results.inputApy)}
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Effective Annual Rate</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">
                {formatPercent(results.effectiveAnnualRate)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-ink-700">Month-by-Month Growth (First Year)</p>
            <div className="mt-3 max-h-64 overflow-auto rounded-lg border border-ink-200">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-ink-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-ink-600">Month</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Balance</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Interest This Month</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Total Interest</th>
                  </tr>
                </thead>
                <tbody>
                  {results.monthlyData.map((row) => (
                    <tr key={row.month} className="border-t border-ink-100">
                      <td className="px-3 py-2 text-ink-700">{row.month}</td>
                      <td className="px-3 py-2 text-right font-medium text-ink-800">
                        {formatCurrency(row.balance)}
                      </td>
                      <td className="px-3 py-2 text-right text-accent-700">
                        {formatCurrency(row.interestEarned)}
                      </td>
                      <td className="px-3 py-2 text-right text-ink-600">
                        {formatCurrency(row.cumulativeInterest)}
                      </td>
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
