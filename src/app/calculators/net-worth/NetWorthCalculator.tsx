"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`;
}

interface Props {
  defaults?: Record<string, string>;
}

export function NetWorthCalculator({ defaults }: Props) {
  const [cashSavings, setCashSavings] = useState(defaults?.cashSavings || "15000");
  const [investments, setInvestments] = useState(defaults?.investments || "50000");
  const [retirement, setRetirement] = useState(defaults?.retirement || "80000");
  const [homeValue, setHomeValue] = useState(defaults?.homeValue || "0");
  const [carValue, setCarValue] = useState(defaults?.carValue || "15000");
  const [otherAssets, setOtherAssets] = useState(defaults?.otherAssets || "0");
  const [mortgage, setMortgage] = useState(defaults?.mortgage || "0");
  const [studentLoans, setStudentLoans] = useState(defaults?.studentLoans || "25000");
  const [carLoan, setCarLoan] = useState(defaults?.carLoan || "8000");
  const [creditCards, setCreditCards] = useState(defaults?.creditCards || "3000");
  const [otherDebt, setOtherDebt] = useState(defaults?.otherDebt || "0");

  const results = useMemo(() => {
    const assetItems = [
      { label: "Cash & Savings", value: parseFloat(cashSavings) || 0 },
      { label: "Investments / Brokerage", value: parseFloat(investments) || 0 },
      { label: "Retirement (401k/IRA)", value: parseFloat(retirement) || 0 },
      { label: "Home Value", value: parseFloat(homeValue) || 0 },
      { label: "Car Value", value: parseFloat(carValue) || 0 },
      { label: "Other Assets", value: parseFloat(otherAssets) || 0 },
    ];

    const liabilityItems = [
      { label: "Mortgage Balance", value: parseFloat(mortgage) || 0 },
      { label: "Student Loans", value: parseFloat(studentLoans) || 0 },
      { label: "Car Loan", value: parseFloat(carLoan) || 0 },
      { label: "Credit Card Debt", value: parseFloat(creditCards) || 0 },
      { label: "Other Debt", value: parseFloat(otherDebt) || 0 },
    ];

    const totalAssets = assetItems.reduce((sum, item) => sum + item.value, 0);
    const totalLiabilities = liabilityItems.reduce((sum, item) => sum + item.value, 0);
    const netWorth = totalAssets - totalLiabilities;

    const assetBreakdown = assetItems
      .filter((item) => item.value > 0)
      .map((item) => ({
        ...item,
        percent: totalAssets > 0 ? (item.value / totalAssets) * 100 : 0,
      }));

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      assetBreakdown,
    };
  }, [
    cashSavings,
    investments,
    retirement,
    homeValue,
    carValue,
    otherAssets,
    mortgage,
    studentLoans,
    carLoan,
    creditCards,
    otherDebt,
  ]);

  return (
    <div>
      <p className="mb-4 text-sm text-ink-500">
        Enter your assets and liabilities to calculate total net worth and asset allocation. Age
        benchmarks on the article use the Federal Reserve 2025 Survey of Consumer Finances (released
        October 2026).
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-700">
            Assets
          </h3>
          <div className="grid gap-4">
            <InputField label="Cash & Savings" id="cashSavings" value={cashSavings} onChange={setCashSavings} prefix="$" min={0} />
            <InputField label="Investments / Brokerage" id="investments" value={investments} onChange={setInvestments} prefix="$" min={0} />
            <InputField label="Retirement Accounts (401k/IRA)" id="retirement" value={retirement} onChange={setRetirement} prefix="$" min={0} />
            <InputField label="Home Value" id="homeValue" value={homeValue} onChange={setHomeValue} prefix="$" min={0} helpText="Optional — enter 0 if you do not own a home" />
            <InputField label="Car Value" id="carValue" value={carValue} onChange={setCarValue} prefix="$" min={0} />
            <InputField label="Other Assets" id="otherAssets" value={otherAssets} onChange={setOtherAssets} prefix="$" min={0} />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent-700">
            Liabilities
          </h3>
          <div className="grid gap-4">
            <InputField label="Mortgage Balance" id="mortgage" value={mortgage} onChange={setMortgage} prefix="$" min={0} />
            <InputField label="Student Loans" id="studentLoans" value={studentLoans} onChange={setStudentLoans} prefix="$" min={0} />
            <InputField label="Car Loan" id="carLoan" value={carLoan} onChange={setCarLoan} prefix="$" min={0} />
            <InputField label="Credit Card Debt" id="creditCards" value={creditCards} onChange={setCreditCards} prefix="$" min={0} />
            <InputField label="Other Debt" id="otherDebt" value={otherDebt} onChange={setOtherDebt} prefix="$" min={0} />
          </div>
        </div>
      </div>

      {results && (
        <div className="mt-8">
          <div className="mb-6 rounded-lg border border-ink-200 p-6 text-center">
            <p className="text-sm font-medium text-ink-600">Net Worth</p>
            <p
              className={`mt-1 text-4xl font-bold ${
                results.netWorth >= 0 ? "text-green-700" : "text-red-600"
              }`}
            >
              {formatCurrency(results.netWorth)}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-brand-50 p-4 text-center">
              <p className="text-sm font-medium text-brand-700">Total Assets</p>
              <p className="mt-1 text-2xl font-bold text-brand-900">
                {formatCurrency(results.totalAssets)}
              </p>
            </div>
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-sm font-medium text-accent-700">Total Liabilities</p>
              <p className="mt-1 text-2xl font-bold text-accent-900">
                {formatCurrency(results.totalLiabilities)}
              </p>
            </div>
          </div>

          {results.assetBreakdown.length > 0 && (
            <div className="mt-6 rounded-lg border border-ink-200 p-4">
              <p className="text-sm font-medium text-ink-700">Asset Allocation Breakdown</p>
              <div className="mt-4 space-y-3">
                {results.assetBreakdown.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-700">{item.label}</span>
                      <span className="font-medium text-ink-800">
                        {formatCurrency(item.value)} ({formatPercent(item.percent)})
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink-200">
                      <div
                        className="h-full rounded-full bg-brand-500 transition-all"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
