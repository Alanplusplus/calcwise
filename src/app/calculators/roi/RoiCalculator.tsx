"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

interface Props {
  defaults?: Record<string, string>;
}

interface AnnualRow {
  year: number;
  revenue: number;
  cost: number;
  netProfit: number;
  cumulativeProfit: number;
  roi: number;
}

export function RoiCalculator({ defaults }: Props) {
  const [investmentCost, setInvestmentCost] = useState(
    defaults?.investmentCost || "25000"
  );
  const [revenue, setRevenue] = useState(defaults?.revenue || "35000");
  const [years, setYears] = useState(defaults?.years || "1");
  const [ongoingCost, setOngoingCost] = useState(
    defaults?.ongoingCost || "5000"
  );
  const [revenueGrowth, setRevenueGrowth] = useState(
    defaults?.revenueGrowth || "5"
  );

  const results = useMemo(() => {
    const cost = parseFloat(investmentCost) || 0;
    const rev = parseFloat(revenue) || 0;
    const numYears = parseInt(years) || 1;
    const ongoing = parseFloat(ongoingCost) || 0;
    const growth = (parseFloat(revenueGrowth) || 0) / 100;

    if (cost <= 0) return null;

    const totalCost = cost + ongoing * numYears;
    const yearData: AnnualRow[] = [];
    let cumulativeRevenue = 0;
    let cumulativeCost = cost;

    for (let y = 1; y <= numYears; y++) {
      const yearRevenue = rev * Math.pow(1 + growth, y - 1);
      cumulativeRevenue += yearRevenue;
      if (y > 0) cumulativeCost += ongoing;
      const netProfit = cumulativeRevenue - cumulativeCost;
      const roi = (netProfit / cumulativeCost) * 100;

      yearData.push({
        year: y,
        revenue: yearRevenue,
        cost: y === 1 ? cost + ongoing : ongoing,
        netProfit,
        cumulativeProfit: netProfit,
        roi,
      });
    }

    const totalRevenue = cumulativeRevenue;
    const netProfit = totalRevenue - totalCost;
    const simpleRoi = (netProfit / totalCost) * 100;
    const annualizedRoi =
      numYears > 1
        ? (Math.pow(totalRevenue / totalCost, 1 / numYears) - 1) * 100
        : simpleRoi;
    const paybackMonths =
      rev > ongoing ? (cost / (rev - ongoing)) * 12 : Infinity;

    return {
      totalCost,
      totalRevenue,
      netProfit,
      simpleRoi,
      annualizedRoi,
      paybackMonths,
      yearData,
    };
  }, [investmentCost, revenue, years, ongoingCost, revenueGrowth]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField
          label="Initial Investment"
          id="investmentCost"
          value={investmentCost}
          onChange={setInvestmentCost}
          prefix="$"
          min={0}
          helpText="Total upfront cost of the investment"
        />
        <InputField
          label="Annual Revenue / Return"
          id="revenue"
          value={revenue}
          onChange={setRevenue}
          prefix="$"
          min={0}
          helpText="Expected annual revenue or gain"
        />
        <InputField
          label="Annual Ongoing Costs"
          id="ongoingCost"
          value={ongoingCost}
          onChange={setOngoingCost}
          prefix="$"
          min={0}
          helpText="Recurring annual expenses"
        />
        <InputField
          label="Time Period"
          id="years"
          value={years}
          onChange={setYears}
          suffix="years"
          min={1}
          max={30}
          step={1}
        />
        <InputField
          label="Annual Revenue Growth"
          id="revenueGrowth"
          value={revenueGrowth}
          onChange={setRevenueGrowth}
          suffix="%"
          min={0}
          max={100}
          step={0.5}
          helpText="Expected annual revenue increase"
        />
      </div>

      {results && (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
              <p className="text-sm font-medium text-brand-700">
                Total ROI
              </p>
              <p className="mt-2 text-xl font-bold text-brand-900">
                {results.simpleRoi.toFixed(1)}%
              </p>
              <p className="mt-1 text-sm text-brand-700">
                Over {years} {parseInt(years) === 1 ? "year" : "years"}
              </p>
            </div>
            <div className="rounded-lg border border-accent-200 bg-accent-50 p-4">
              <p className="text-sm font-medium text-accent-700">Net Profit</p>
              <p
                className={`mt-2 text-xl font-bold ${results.netProfit >= 0 ? "text-accent-900" : "text-red-700"}`}
              >
                {formatCurrency(results.netProfit)}
              </p>
              <p className="mt-1 text-sm text-accent-700">
                Revenue minus all costs
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">
                Annualized ROI
              </p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {results.annualizedRoi.toFixed(1)}%
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Average return per year
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Total Cost</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {formatCurrency(results.totalCost)}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Initial + ongoing costs
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">Total Revenue</p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {formatCurrency(results.totalRevenue)}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Cumulative returns
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4">
              <p className="text-sm font-medium text-ink-600">
                Payback Period
              </p>
              <p className="mt-2 text-xl font-bold text-ink-800">
                {results.paybackMonths < Infinity
                  ? results.paybackMonths <= 12
                    ? `${results.paybackMonths.toFixed(1)} months`
                    : `${(results.paybackMonths / 12).toFixed(1)} years`
                  : "N/A"}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                Time to recover investment
              </p>
            </div>
          </div>

          {results.yearData.length > 1 && (
            <div className="mt-6 overflow-x-auto">
              <h3 className="mb-3 text-sm font-semibold text-ink-700">
                Year-by-Year Breakdown
              </h3>
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-200 text-ink-500">
                    <th className="py-2 pr-4 font-medium">Year</th>
                    <th className="py-2 pr-4 font-medium">Revenue</th>
                    <th className="py-2 pr-4 font-medium">Cost</th>
                    <th className="py-2 pr-4 font-medium">
                      Cumulative Profit
                    </th>
                    <th className="py-2 font-medium">Cumulative ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearData.map((row) => (
                    <tr key={row.year} className="border-b border-ink-100">
                      <td className="py-2 pr-4 text-ink-800">{row.year}</td>
                      <td className="py-2 pr-4 text-green-700">
                        {formatCurrency(row.revenue)}
                      </td>
                      <td className="py-2 pr-4 text-red-700">
                        {formatCurrency(row.cost)}
                      </td>
                      <td
                        className={`py-2 pr-4 ${row.cumulativeProfit >= 0 ? "text-green-700" : "text-red-700"}`}
                      >
                        {formatCurrency(row.cumulativeProfit)}
                      </td>
                      <td className="py-2 text-ink-800">
                        {row.roi.toFixed(1)}%
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
