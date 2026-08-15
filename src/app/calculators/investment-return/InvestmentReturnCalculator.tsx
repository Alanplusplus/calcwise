"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatPercent(n: number): string {
  return n.toFixed(2) + "%";
}

export function InvestmentReturnCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("10000");
  const [finalValue, setFinalValue] = useState("25000");
  const [years, setYears] = useState("5");
  const [dividends, setDividends] = useState("500");

  const results = useMemo(() => {
    const initial = parseFloat(initialInvestment) || 0;
    const final = parseFloat(finalValue) || 0;
    const t = parseFloat(years) || 1;
    const divs = parseFloat(dividends) || 0;

    if (initial <= 0) return null;

    const totalDividends = divs * t;
    const totalReturn = final - initial + totalDividends;
    const percentReturn = (totalReturn / initial) * 100;
    const annualizedReturn = (Math.pow((final + totalDividends) / initial, 1 / t) - 1) * 100;
    const capitalGain = final - initial;
    const capitalGainPercent = (capitalGain / initial) * 100;

    return {
      totalReturn,
      percentReturn,
      annualizedReturn,
      capitalGain,
      capitalGainPercent,
      totalDividends,
      totalValue: final + totalDividends,
    };
  }, [initialInvestment, finalValue, years, dividends]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Initial Investment"
          id="initialInvestment"
          value={initialInvestment}
          onChange={setInitialInvestment}
          prefix="$"
          min={0}
          helpText="Amount you originally invested"
        />
        <InputField
          label="Current/Final Value"
          id="finalValue"
          value={finalValue}
          onChange={setFinalValue}
          prefix="$"
          min={0}
          helpText="What your investment is worth now"
        />
        <InputField
          label="Holding Period"
          id="years"
          value={years}
          onChange={setYears}
          suffix="years"
          min={0.1}
          max={100}
          step={0.5}
        />
        <InputField
          label="Annual Dividends Received"
          id="dividends"
          value={dividends}
          onChange={setDividends}
          prefix="$"
          min={0}
          helpText="Average dividends/distributions per year"
        />
      </div>

      {results && (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-sm font-medium text-accent-700">Total Return</p>
              <p className="mt-1 text-2xl font-bold text-accent-900">
                {formatPercent(results.percentReturn)}
              </p>
              <p className="text-sm text-accent-700">{formatCurrency(results.totalReturn)}</p>
            </div>
            <div className="rounded-lg bg-brand-50 p-4 text-center">
              <p className="text-sm font-medium text-brand-700">Annualized Return</p>
              <p className="mt-1 text-2xl font-bold text-brand-900">
                {formatPercent(results.annualizedReturn)}
              </p>
              <p className="text-sm text-brand-700">per year (CAGR)</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Total Value</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">
                {formatCurrency(results.totalValue)}
              </p>
              <p className="text-sm text-ink-500">including dividends</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-ink-200 p-3">
              <p className="text-xs text-ink-500">Capital Gain</p>
              <p className="font-semibold text-ink-800">
                {formatCurrency(results.capitalGain)} ({formatPercent(results.capitalGainPercent)})
              </p>
            </div>
            <div className="rounded-lg border border-ink-200 p-3">
              <p className="text-xs text-ink-500">Total Dividends</p>
              <p className="font-semibold text-ink-800">{formatCurrency(results.totalDividends)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
