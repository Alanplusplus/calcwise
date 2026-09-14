"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

interface Props {
  defaults?: Record<string, string>;
}

export function BreakEvenCalculator({ defaults }: Props) {
  const [fixedCosts, setFixedCosts] = useState(defaults?.fixedCosts || "10000");
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(defaults?.variableCostPerUnit || "25");
  const [pricePerUnit, setPricePerUnit] = useState(defaults?.pricePerUnit || "50");
  const [targetProfit, setTargetProfit] = useState(defaults?.targetProfit || "0");

  const results = useMemo(() => {
    const fc = parseFloat(fixedCosts) || 0;
    const vc = parseFloat(variableCostPerUnit) || 0;
    const price = parseFloat(pricePerUnit) || 0;
    const profit = parseFloat(targetProfit) || 0;

    const contributionMargin = price - vc;
    const contributionMarginRatio = price > 0 ? contributionMargin / price : 0;

    const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fc / contributionMargin) : 0;
    const breakEvenRevenue = contributionMargin > 0 ? fc / contributionMarginRatio : 0;

    const unitsForProfit = contributionMargin > 0 ? Math.ceil((fc + profit) / contributionMargin) : 0;
    const revenueForProfit = contributionMargin > 0 ? (fc + profit) / contributionMarginRatio : 0;

    const isValid = price > vc && fc > 0;

    const scenarioMultipliers = [0.8, 0.9, 1.0, 1.1, 1.2];
    const priceScenarios = scenarioMultipliers.map((m) => {
      const scenarioPrice = price * m;
      const scenarioCm = scenarioPrice - vc;
      const scenarioUnits = scenarioCm > 0 ? Math.ceil(fc / scenarioCm) : 0;
      const scenarioRevenue = scenarioCm > 0 ? scenarioUnits * scenarioPrice : 0;
      return {
        label: m === 1.0 ? "Current" : `${m > 1 ? "+" : ""}${((m - 1) * 100).toFixed(0)}%`,
        price: scenarioPrice,
        units: scenarioUnits,
        revenue: scenarioRevenue,
        margin: scenarioCm,
      };
    });

    const volumeBreakdown = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((m) => {
      const units = Math.round(breakEvenUnits * m);
      const totalRevenue = units * price;
      const totalCost = fc + units * vc;
      const netProfit = totalRevenue - totalCost;
      return { multiplier: m, units, revenue: totalRevenue, totalCost, profit: netProfit };
    });

    return {
      contributionMargin,
      contributionMarginRatio,
      breakEvenUnits,
      breakEvenRevenue,
      unitsForProfit,
      revenueForProfit,
      isValid,
      priceScenarios,
      volumeBreakdown,
    };
  }, [fixedCosts, variableCostPerUnit, pricePerUnit, targetProfit]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InputField
          label="Fixed Costs"
          id="fixedCosts"
          value={fixedCosts}
          onChange={setFixedCosts}
          prefix="$"
          min={0}
          step={100}
          helpText="Total fixed costs (rent, salaries, insurance, etc.)"
        />
        <InputField
          label="Variable Cost per Unit"
          id="variableCostPerUnit"
          value={variableCostPerUnit}
          onChange={setVariableCostPerUnit}
          prefix="$"
          min={0}
          step={0.01}
          helpText="Cost to produce or acquire one unit"
        />
        <InputField
          label="Price per Unit"
          id="pricePerUnit"
          value={pricePerUnit}
          onChange={setPricePerUnit}
          prefix="$"
          min={0}
          step={0.01}
          helpText="Selling price per unit"
        />
        <InputField
          label="Target Profit"
          id="targetProfit"
          value={targetProfit}
          onChange={setTargetProfit}
          prefix="$"
          min={0}
          step={100}
          helpText="Optional: desired profit above break-even"
        />
      </div>

      {!results.isValid && (parseFloat(pricePerUnit) || 0) > 0 && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Price per unit must be greater than variable cost per unit to reach a break-even point.
        </div>
      )}

      <div className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
            <p className="text-sm font-medium text-brand-700">Break-Even Units</p>
            <p className="mt-2 text-xl font-bold text-brand-900">
              {results.isValid ? formatNumber(results.breakEvenUnits) : "--"}
            </p>
            <p className="mt-1 text-sm text-brand-700">units to sell</p>
          </div>
          <div className="rounded-lg border border-accent-200 bg-accent-50 p-4">
            <p className="text-sm font-medium text-accent-700">Break-Even Revenue</p>
            <p className="mt-2 text-xl font-bold text-accent-900">
              {results.isValid ? formatCurrency(results.breakEvenRevenue) : "--"}
            </p>
            <p className="mt-1 text-sm text-accent-700">in total sales</p>
          </div>
          <div className="rounded-lg bg-ink-100 p-4">
            <p className="text-sm font-medium text-ink-600">Contribution Margin</p>
            <p className="mt-2 text-xl font-bold text-ink-800">
              {formatCurrency(results.contributionMargin)}
            </p>
            <p className="mt-1 text-sm text-ink-600">
              {(results.contributionMarginRatio * 100).toFixed(1)}% margin ratio
            </p>
          </div>
          {(parseFloat(targetProfit) || 0) > 0 && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-medium text-green-700">Units for Target Profit</p>
              <p className="mt-2 text-xl font-bold text-green-900">
                {results.isValid ? formatNumber(results.unitsForProfit) : "--"}
              </p>
              <p className="mt-1 text-sm text-green-700">
                {results.isValid ? formatCurrency(results.revenueForProfit) : "--"} revenue
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 overflow-x-auto">
          <h3 className="mb-3 text-sm font-semibold text-ink-700">
            Price Sensitivity Analysis
          </h3>
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-ink-500">
                <th className="py-2 pr-4 font-medium">Scenario</th>
                <th className="py-2 pr-4 font-medium">Price</th>
                <th className="py-2 pr-4 font-medium">Margin</th>
                <th className="py-2 pr-4 font-medium">Units</th>
                <th className="py-2 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {results.priceScenarios.map((row) => (
                <tr
                  key={row.label}
                  className={`border-b border-ink-100 ${row.label === "Current" ? "bg-brand-50/50 font-medium" : ""}`}
                >
                  <td className="py-2 pr-4 text-ink-800">{row.label}</td>
                  <td className="py-2 pr-4 text-ink-800">{formatCurrency(row.price)}</td>
                  <td className="py-2 pr-4 text-brand-700">{formatCurrency(row.margin)}</td>
                  <td className="py-2 pr-4 text-ink-800">{row.units > 0 ? formatNumber(row.units) : "--"}</td>
                  <td className="py-2 text-ink-800">{row.revenue > 0 ? formatCurrency(row.revenue) : "--"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 overflow-x-auto">
          <h3 className="mb-3 text-sm font-semibold text-ink-700">
            Profit at Different Sales Volumes
          </h3>
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-ink-500">
                <th className="py-2 pr-4 font-medium">Units Sold</th>
                <th className="py-2 pr-4 font-medium">Revenue</th>
                <th className="py-2 pr-4 font-medium">Total Cost</th>
                <th className="py-2 font-medium">Net Profit</th>
              </tr>
            </thead>
            <tbody>
              {results.volumeBreakdown.map((row) => (
                <tr
                  key={row.multiplier}
                  className={`border-b border-ink-100 ${row.multiplier === 1.0 ? "bg-brand-50/50 font-medium" : ""}`}
                >
                  <td className="py-2 pr-4 text-ink-800">{formatNumber(row.units)}</td>
                  <td className="py-2 pr-4 text-ink-800">{formatCurrency(row.revenue)}</td>
                  <td className="py-2 pr-4 text-ink-800">{formatCurrency(row.totalCost)}</td>
                  <td className={`py-2 ${row.profit >= 0 ? "text-green-700" : "text-red-600"}`}>
                    {formatCurrency(row.profit)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
