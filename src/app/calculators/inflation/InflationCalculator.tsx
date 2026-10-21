"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

interface YearRow {
  year: number;
  futurePrice: number;
  purchasingPower: number;
  cumulativeInflation: number;
}

interface Props {
  defaults?: Record<string, string>;
}

export function InflationCalculator({ defaults }: Props) {
  const [currentAmount, setCurrentAmount] = useState(defaults?.currentAmount || "100");
  /** BLS CPI-U 12-month change, September 2026 (released Oct. 14, 2026). */
  const [inflationRate, setInflationRate] = useState(defaults?.inflationRate || "3.7");
  const [years, setYears] = useState(defaults?.years || "10");

  const results = useMemo(() => {
    const amount = parseFloat(currentAmount) || 0;
    const rate = (parseFloat(inflationRate) || 0) / 100;
    const numYears = parseInt(years) || 0;

    if (amount <= 0 || numYears <= 0) return null;

    const futurePrice = amount * Math.pow(1 + rate, numYears);
    const purchasingPower = amount / Math.pow(1 + rate, numYears);
    const totalInflation = ((futurePrice - amount) / amount) * 100;
    const purchasingPowerLoss = ((amount - purchasingPower) / amount) * 100;

    const milestoneYears = {
      half: rate > 0 ? Math.ceil(Math.log(2) / Math.log(1 + rate)) : Infinity,
      double: rate > 0 ? Math.ceil(Math.log(2) / Math.log(1 + rate)) : Infinity,
    };

    const yearData: YearRow[] = [];
    const step = numYears <= 10 ? 1 : numYears <= 30 ? 2 : 5;
    for (let y = step; y <= numYears; y += step) {
      const fp = amount * Math.pow(1 + rate, y);
      const pp = amount / Math.pow(1 + rate, y);
      yearData.push({
        year: y,
        futurePrice: fp,
        purchasingPower: pp,
        cumulativeInflation: ((fp - amount) / amount) * 100,
      });
    }
    if (yearData.length > 0 && yearData[yearData.length - 1].year !== numYears) {
      const fp = amount * Math.pow(1 + rate, numYears);
      const pp = amount / Math.pow(1 + rate, numYears);
      yearData.push({
        year: numYears,
        futurePrice: fp,
        purchasingPower: pp,
        cumulativeInflation: ((fp - amount) / amount) * 100,
      });
    }

    return {
      futurePrice,
      purchasingPower,
      totalInflation,
      purchasingPowerLoss,
      yearsToDouble: milestoneYears.double,
      yearData,
    };
  }, [currentAmount, inflationRate, years]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <InputField
          label="Current Amount"
          id="currentAmount"
          value={currentAmount}
          onChange={setCurrentAmount}
          prefix="$"
          min={0}
        />
        <InputField
          label="Annual Inflation Rate"
          id="inflationRate"
          value={inflationRate}
          onChange={setInflationRate}
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
          step={1}
        />
      </div>
      <p className="mt-3 text-sm text-ink-500">
        Default 3.7% matches the U.S. CPI-U 12-month change for September 2026 (BLS release
        October 14, 2026). The Federal Reserve targets 2% PCE inflation over the longer run —
        use a lower rate for conservative planning scenarios.
      </p>

      {results && (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-accent-200 bg-accent-50 p-4">
              <p className="text-sm font-medium text-accent-700">Future Price</p>
              <p className="mt-2 text-xl font-bold text-accent-900">
                {formatCurrency(results.futurePrice)}
              </p>
              <p className="mt-1 text-sm text-accent-700">
                What {formatCurrency(parseFloat(currentAmount) || 0)} will cost
              </p>
            </div>
            <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
              <p className="text-sm font-medium text-brand-700">Purchasing Power</p>
              <p className="mt-2 text-xl font-bold text-brand-900">
                {formatCurrency(results.purchasingPower)}
              </p>
              <p className="mt-1 text-sm text-brand-700">
                What {formatCurrency(parseFloat(currentAmount) || 0)} will be worth
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Total Inflation</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {results.totalInflation.toFixed(1)}%
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Cumulative price increase
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Purchasing Power Loss</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {results.purchasingPowerLoss.toFixed(1)}%
              </p>
              <p className="mt-1 text-sm text-ink-600">
                {results.yearsToDouble < Infinity
                  ? `Prices double in ~${results.yearsToDouble} years`
                  : "No inflation applied"}
              </p>
            </div>
          </div>

          {results.yearData.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <h3 className="mb-3 text-sm font-semibold text-ink-700">
                Inflation Impact Over Time
              </h3>
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-200 text-ink-500">
                    <th className="py-2 pr-4 font-medium">Year</th>
                    <th className="py-2 pr-4 font-medium">Future Price</th>
                    <th className="py-2 pr-4 font-medium">Purchasing Power</th>
                    <th className="py-2 font-medium">Cumulative Inflation</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearData.map((row) => (
                    <tr key={row.year} className="border-b border-ink-100">
                      <td className="py-2 pr-4 text-ink-800">{row.year}</td>
                      <td className="py-2 pr-4 text-red-700">
                        {formatCurrency(row.futurePrice)}
                      </td>
                      <td className="py-2 pr-4 text-green-700">
                        {formatCurrency(row.purchasingPower)}
                      </td>
                      <td className="py-2 text-ink-800">
                        {row.cumulativeInflation.toFixed(1)}%
                      </td>
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
