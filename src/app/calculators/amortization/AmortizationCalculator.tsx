"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

interface MonthRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface YearSummary {
  year: number;
  totalPayment: number;
  totalPrincipal: number;
  totalInterest: number;
  endingBalance: number;
}

interface Props {
  defaults?: Record<string, string>;
}

export function AmortizationCalculator({ defaults }: Props) {
  const [loanAmount, setLoanAmount] = useState(defaults?.loanAmount || "250000");
  const [annualRate, setAnnualRate] = useState(defaults?.annualRate || "6.5");
  const [loanTermYears, setLoanTermYears] = useState(defaults?.loanTermYears || "30");
  const [extraPayment, setExtraPayment] = useState(defaults?.extraPayment || "0");
  const [viewMode, setViewMode] = useState<"yearly" | "monthly">("yearly");

  const results = useMemo(() => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = (parseFloat(annualRate) || 0) / 100;
    const years = parseInt(loanTermYears) || 30;
    const extra = parseFloat(extraPayment) || 0;
    const totalMonths = years * 12;
    const monthlyRate = rate / 12;

    if (principal <= 0 || rate <= 0) return null;

    const basePayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const monthlyPayment = basePayment + extra;

    const schedule: MonthRow[] = [];
    let balance = principal;
    let totalInterest = 0;
    let actualMonths = 0;

    for (let m = 1; m <= totalMonths && balance > 0; m++) {
      const interestPortion = balance * monthlyRate;
      let principalPortion = basePayment - interestPortion + extra;

      if (principalPortion > balance) {
        principalPortion = balance;
      }

      const payment = interestPortion + principalPortion;
      balance -= principalPortion;
      totalInterest += interestPortion;
      actualMonths = m;

      schedule.push({
        month: m,
        payment,
        principal: principalPortion,
        interest: interestPortion,
        balance: Math.max(balance, 0),
      });

      if (balance <= 0.01) break;
    }

    const noExtraInterest =
      basePayment * totalMonths - principal;

    const interestSaved = extra > 0 ? noExtraInterest - totalInterest : 0;
    const monthsSaved = extra > 0 ? totalMonths - actualMonths : 0;

    const yearSummaries: YearSummary[] = [];
    for (let y = 1; y <= Math.ceil(actualMonths / 12); y++) {
      const startIdx = (y - 1) * 12;
      const endIdx = Math.min(y * 12, schedule.length);
      const yearRows = schedule.slice(startIdx, endIdx);

      yearSummaries.push({
        year: y,
        totalPayment: yearRows.reduce((sum, r) => sum + r.payment, 0),
        totalPrincipal: yearRows.reduce((sum, r) => sum + r.principal, 0),
        totalInterest: yearRows.reduce((sum, r) => sum + r.interest, 0),
        endingBalance: yearRows[yearRows.length - 1].balance,
      });
    }

    return {
      basePayment,
      monthlyPayment,
      totalInterest,
      totalCost: principal + totalInterest,
      actualMonths,
      interestSaved,
      monthsSaved,
      schedule,
      yearSummaries,
    };
  }, [loanAmount, annualRate, loanTermYears, extraPayment]);

  const interestPct = results ? (results.totalInterest / results.totalCost) * 100 : 0;
  const principalPct = 100 - interestPct;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InputField
          label="Loan Amount"
          id="loanAmount"
          value={loanAmount}
          onChange={setLoanAmount}
          prefix="$"
          min={0}
        />
        <InputField
          label="Interest Rate"
          id="annualRate"
          value={annualRate}
          onChange={setAnnualRate}
          suffix="%"
          min={0}
          max={30}
          step={0.1}
        />
        <InputField
          label="Loan Term"
          id="loanTermYears"
          value={loanTermYears}
          onChange={setLoanTermYears}
          suffix="years"
          min={1}
          max={50}
          step={1}
        />
        <InputField
          label="Extra Monthly Payment"
          id="extraPayment"
          value={extraPayment}
          onChange={setExtraPayment}
          prefix="$"
          min={0}
          helpText="Optional: pay off faster"
        />
      </div>

      {results && (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-sm font-medium text-accent-700">Monthly Payment</p>
              <p className="mt-1 text-2xl font-bold text-accent-900">
                {formatCurrency(results.basePayment)}
              </p>
              {parseFloat(extraPayment) > 0 && (
                <p className="mt-1 text-xs text-accent-600">
                  + {formatCurrency(parseFloat(extraPayment))} extra
                </p>
              )}
            </div>
            <div className="rounded-lg bg-brand-50 p-4 text-center">
              <p className="text-sm font-medium text-brand-700">Total Interest</p>
              <p className="mt-1 text-2xl font-bold text-brand-900">
                {formatCurrency(results.totalInterest)}
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Total Cost</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">
                {formatCurrency(results.totalCost)}
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Payoff Time</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">
                {Math.floor(results.actualMonths / 12)}y {results.actualMonths % 12}m
              </p>
            </div>
          </div>

          {results.interestSaved > 0 && (
            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-medium text-green-800">
                With {formatCurrency(parseFloat(extraPayment))}/month extra, you save{" "}
                <strong>{formatCurrency(results.interestSaved)}</strong> in interest and pay off{" "}
                <strong>{Math.floor(results.monthsSaved / 12)} years {results.monthsSaved % 12} months</strong> earlier.
              </p>
            </div>
          )}

          <div className="mt-6">
            <p className="text-sm font-medium text-ink-700">Payment Breakdown</p>
            <div className="mt-2 flex h-6 overflow-hidden rounded-full bg-ink-200">
              <div className="bg-brand-500 transition-all" style={{ width: `${principalPct}%` }} />
              <div className="bg-accent-500 transition-all" style={{ width: `${interestPct}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-xs text-ink-500">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-500" />
                Principal: {principalPct.toFixed(1)}% ({formatCurrency(parseFloat(loanAmount) || 0)})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-500" />
                Interest: {interestPct.toFixed(1)}% ({formatCurrency(results.totalInterest)})
              </span>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-ink-700">Amortization Schedule</p>
              <div className="flex rounded-lg border border-ink-200 text-sm">
                <button
                  onClick={() => setViewMode("yearly")}
                  className={`px-3 py-1.5 ${viewMode === "yearly" ? "bg-brand-50 text-brand-700 font-medium" : "text-ink-500 hover:text-ink-700"}`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => setViewMode("monthly")}
                  className={`px-3 py-1.5 ${viewMode === "monthly" ? "bg-brand-50 text-brand-700 font-medium" : "text-ink-500 hover:text-ink-700"}`}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="mt-3 max-h-96 overflow-auto rounded-lg border border-ink-200">
              {viewMode === "yearly" ? (
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-ink-100">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-ink-600">Year</th>
                      <th className="px-3 py-2 text-right font-medium text-ink-600">Payments</th>
                      <th className="px-3 py-2 text-right font-medium text-ink-600">Principal</th>
                      <th className="px-3 py-2 text-right font-medium text-ink-600">Interest</th>
                      <th className="px-3 py-2 text-right font-medium text-ink-600">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearSummaries.map((row) => (
                      <tr key={row.year} className="border-t border-ink-100">
                        <td className="px-3 py-2 text-ink-700">{row.year}</td>
                        <td className="px-3 py-2 text-right font-medium text-ink-800">
                          {formatCurrency(row.totalPayment)}
                        </td>
                        <td className="px-3 py-2 text-right text-brand-700">
                          {formatCurrency(row.totalPrincipal)}
                        </td>
                        <td className="px-3 py-2 text-right text-accent-700">
                          {formatCurrency(row.totalInterest)}
                        </td>
                        <td className="px-3 py-2 text-right text-ink-600">
                          {formatCurrency(row.endingBalance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-ink-100">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-ink-600">Month</th>
                      <th className="px-3 py-2 text-right font-medium text-ink-600">Payment</th>
                      <th className="px-3 py-2 text-right font-medium text-ink-600">Principal</th>
                      <th className="px-3 py-2 text-right font-medium text-ink-600">Interest</th>
                      <th className="px-3 py-2 text-right font-medium text-ink-600">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.schedule.map((row) => (
                      <tr key={row.month} className="border-t border-ink-100">
                        <td className="px-3 py-2 text-ink-700">{row.month}</td>
                        <td className="px-3 py-2 text-right font-medium text-ink-800">
                          {formatCurrency(row.payment)}
                        </td>
                        <td className="px-3 py-2 text-right text-brand-700">
                          {formatCurrency(row.principal)}
                        </td>
                        <td className="px-3 py-2 text-right text-accent-700">
                          {formatCurrency(row.interest)}
                        </td>
                        <td className="px-3 py-2 text-right text-ink-600">
                          {formatCurrency(row.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
