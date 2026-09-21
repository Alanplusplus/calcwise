"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function formatPercent(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";
}

interface Props {
  defaults?: Record<string, string>;
}

export function ProfitMarginCalculator({ defaults }: Props) {
  const [revenue, setRevenue] = useState(defaults?.revenue || "100000");
  const [cogs, setCogs] = useState(defaults?.cogs || "40000");
  const [operatingExpenses, setOperatingExpenses] = useState(defaults?.operatingExpenses || "25000");
  const [otherExpenses, setOtherExpenses] = useState(defaults?.otherExpenses || "5000");
  const [taxes, setTaxes] = useState(defaults?.taxes || "6000");

  const results = useMemo(() => {
    const rev = parseFloat(revenue) || 0;
    const cost = parseFloat(cogs) || 0;
    const opex = parseFloat(operatingExpenses) || 0;
    const other = parseFloat(otherExpenses) || 0;
    const tax = parseFloat(taxes) || 0;

    const grossProfit = rev - cost;
    const grossMargin = rev > 0 ? (grossProfit / rev) * 100 : 0;

    const operatingProfit = grossProfit - opex;
    const operatingMargin = rev > 0 ? (operatingProfit / rev) * 100 : 0;

    const netProfit = operatingProfit - other - tax;
    const netMargin = rev > 0 ? (netProfit / rev) * 100 : 0;

    const markup = cost > 0 ? (grossProfit / cost) * 100 : 0;

    const isValid = rev > 0;

    const revenueScenarios = [0.75, 0.9, 1.0, 1.1, 1.25].map((m) => {
      const scenarioRev = rev * m;
      const scenarioGross = scenarioRev - cost;
      const scenarioOp = scenarioGross - opex;
      const scenarioNet = scenarioOp - other - tax;
      return {
        label: m === 1.0 ? "Current" : `${m > 1 ? "+" : ""}${((m - 1) * 100).toFixed(0)}%`,
        revenue: scenarioRev,
        grossMargin: scenarioRev > 0 ? (scenarioGross / scenarioRev) * 100 : 0,
        operatingMargin: scenarioRev > 0 ? (scenarioOp / scenarioRev) * 100 : 0,
        netMargin: scenarioRev > 0 ? (scenarioNet / scenarioRev) * 100 : 0,
        netProfit: scenarioNet,
      };
    });

    const cogsScenarios = [0.8, 0.9, 1.0, 1.1, 1.2].map((m) => {
      const scenarioCogs = cost * m;
      const scenarioGross = rev - scenarioCogs;
      const scenarioOp = scenarioGross - opex;
      const scenarioNet = scenarioOp - other - tax;
      return {
        label: m === 1.0 ? "Current" : `${m > 1 ? "+" : ""}${((m - 1) * 100).toFixed(0)}%`,
        cogs: scenarioCogs,
        grossMargin: rev > 0 ? (scenarioGross / rev) * 100 : 0,
        netProfit: scenarioNet,
      };
    });

    return {
      grossProfit,
      grossMargin,
      operatingProfit,
      operatingMargin,
      netProfit,
      netMargin,
      markup,
      isValid,
      revenueScenarios,
      cogsScenarios,
    };
  }, [revenue, cogs, operatingExpenses, otherExpenses, taxes]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField
          label="Revenue (Sales)"
          id="revenue"
          value={revenue}
          onChange={setRevenue}
          prefix="$"
          min={0}
          step={1000}
          helpText="Total revenue or sales for the period"
        />
        <InputField
          label="Cost of Goods Sold (COGS)"
          id="cogs"
          value={cogs}
          onChange={setCogs}
          prefix="$"
          min={0}
          step={1000}
          helpText="Direct costs: materials, labor, manufacturing"
        />
        <InputField
          label="Operating Expenses"
          id="operatingExpenses"
          value={operatingExpenses}
          onChange={setOperatingExpenses}
          prefix="$"
          min={0}
          step={1000}
          helpText="Rent, salaries, marketing, utilities, etc."
        />
        <InputField
          label="Other Expenses"
          id="otherExpenses"
          value={otherExpenses}
          onChange={setOtherExpenses}
          prefix="$"
          min={0}
          step={100}
          helpText="Interest, depreciation, one-time costs"
        />
        <InputField
          label="Taxes"
          id="taxes"
          value={taxes}
          onChange={setTaxes}
          prefix="$"
          min={0}
          step={100}
          helpText="Estimated income taxes for the period"
        />
      </div>

      <div className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
            <p className="text-sm font-medium text-brand-700">Gross Profit Margin</p>
            <p className="mt-2 text-xl font-bold text-brand-900">
              {results.isValid ? formatPercent(results.grossMargin) : "--"}
            </p>
            <p className="mt-1 text-sm text-brand-700">
              {results.isValid ? formatCurrency(results.grossProfit) : "--"} profit
            </p>
          </div>
          <div className="rounded-lg border border-accent-200 bg-accent-50 p-4">
            <p className="text-sm font-medium text-accent-700">Operating Profit Margin</p>
            <p className="mt-2 text-xl font-bold text-accent-900">
              {results.isValid ? formatPercent(results.operatingMargin) : "--"}
            </p>
            <p className="mt-1 text-sm text-accent-700">
              {results.isValid ? formatCurrency(results.operatingProfit) : "--"} profit
            </p>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-medium text-green-700">Net Profit Margin</p>
            <p className="mt-2 text-xl font-bold text-green-900">
              {results.isValid ? formatPercent(results.netMargin) : "--"}
            </p>
            <p className="mt-1 text-sm text-green-700">
              {results.isValid ? formatCurrency(results.netProfit) : "--"} profit
            </p>
          </div>
          <div className="rounded-lg bg-ink-100 p-4">
            <p className="text-sm font-medium text-ink-600">Markup Percentage</p>
            <p className="mt-2 text-xl font-bold text-ink-800">
              {results.isValid ? formatPercent(results.markup) : "--"}
            </p>
            <p className="mt-1 text-sm text-ink-600">on cost of goods sold</p>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <h3 className="mb-3 text-sm font-semibold text-ink-700">
            Revenue Sensitivity Analysis
          </h3>
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-ink-500">
                <th className="py-2 pr-4 font-medium">Scenario</th>
                <th className="py-2 pr-4 font-medium">Revenue</th>
                <th className="py-2 pr-4 font-medium">Gross Margin</th>
                <th className="py-2 pr-4 font-medium">Operating Margin</th>
                <th className="py-2 pr-4 font-medium">Net Margin</th>
                <th className="py-2 font-medium">Net Profit</th>
              </tr>
            </thead>
            <tbody>
              {results.revenueScenarios.map((row) => (
                <tr
                  key={row.label}
                  className={`border-b border-ink-100 ${row.label === "Current" ? "bg-brand-50/50 font-medium" : ""}`}
                >
                  <td className="py-2 pr-4 text-ink-800">{row.label}</td>
                  <td className="py-2 pr-4 text-ink-800">{formatCurrency(row.revenue)}</td>
                  <td className="py-2 pr-4 text-brand-700">{formatPercent(row.grossMargin)}</td>
                  <td className="py-2 pr-4 text-accent-700">{formatPercent(row.operatingMargin)}</td>
                  <td className="py-2 pr-4 text-green-700">{formatPercent(row.netMargin)}</td>
                  <td className={`py-2 ${row.netProfit >= 0 ? "text-green-700" : "text-red-600"}`}>
                    {formatCurrency(row.netProfit)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 overflow-x-auto">
          <h3 className="mb-3 text-sm font-semibold text-ink-700">
            COGS Sensitivity Analysis
          </h3>
          <table className="w-full min-w-[440px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-ink-500">
                <th className="py-2 pr-4 font-medium">COGS Change</th>
                <th className="py-2 pr-4 font-medium">COGS Amount</th>
                <th className="py-2 pr-4 font-medium">Gross Margin</th>
                <th className="py-2 font-medium">Net Profit</th>
              </tr>
            </thead>
            <tbody>
              {results.cogsScenarios.map((row) => (
                <tr
                  key={row.label}
                  className={`border-b border-ink-100 ${row.label === "Current" ? "bg-brand-50/50 font-medium" : ""}`}
                >
                  <td className="py-2 pr-4 text-ink-800">{row.label}</td>
                  <td className="py-2 pr-4 text-ink-800">{formatCurrency(row.cogs)}</td>
                  <td className="py-2 pr-4 text-brand-700">{formatPercent(row.grossMargin)}</td>
                  <td className={`py-2 ${row.netProfit >= 0 ? "text-green-700" : "text-red-600"}`}>
                    {formatCurrency(row.netProfit)}
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
