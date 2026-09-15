"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`;
}

type FilingStatus = "single" | "mfj" | "hoh";

const LONG_TERM_BRACKETS: Record<FilingStatus, { rate: number; upTo: number }[]> = {
  single: [
    { rate: 0.0, upTo: 48350 },
    { rate: 0.15, upTo: 533400 },
  ],
  mfj: [
    { rate: 0.0, upTo: 96700 },
    { rate: 0.15, upTo: 600050 },
  ],
  hoh: [
    { rate: 0.0, upTo: 64750 },
    { rate: 0.15, upTo: 566700 },
  ],
};

const NIIT_THRESHOLDS: Record<FilingStatus, number> = {
  single: 200000,
  mfj: 250000,
  hoh: 200000,
};

const SHORT_TERM_BRACKETS: Record<FilingStatus, { rate: number; upTo: number }[]> = {
  single: [
    { rate: 0.10, upTo: 11600 },
    { rate: 0.12, upTo: 47150 },
    { rate: 0.22, upTo: 100525 },
    { rate: 0.24, upTo: 191950 },
    { rate: 0.32, upTo: 243725 },
    { rate: 0.35, upTo: 609350 },
  ],
  mfj: [
    { rate: 0.10, upTo: 23200 },
    { rate: 0.12, upTo: 94300 },
    { rate: 0.22, upTo: 201050 },
    { rate: 0.24, upTo: 383900 },
    { rate: 0.32, upTo: 487450 },
    { rate: 0.35, upTo: 1218700 },
  ],
  hoh: [
    { rate: 0.10, upTo: 17400 },
    { rate: 0.12, upTo: 65700 },
    { rate: 0.22, upTo: 150788 },
    { rate: 0.24, upTo: 287925 },
    { rate: 0.32, upTo: 365587 },
    { rate: 0.35, upTo: 914025 },
  ],
};

function computeLongTermTax(
  gain: number,
  otherIncome: number,
  brackets: { rate: number; upTo: number }[]
): { tax: number; effectiveRate: number; breakdown: { rate: string; amount: number; tax: number }[] } {
  if (gain <= 0) return { tax: 0, effectiveRate: 0, breakdown: [] };

  let tax = 0;
  let remaining = gain;
  const breakdown: { rate: string; amount: number; tax: number }[] = [];

  for (const bracket of brackets) {
    if (remaining <= 0) break;
    const bracketStart = bracket === brackets[0] ? 0 : brackets[brackets.indexOf(bracket) - 1].upTo;
    const spaceInBracket = Math.max(0, bracket.upTo - Math.max(otherIncome, bracketStart));
    if (spaceInBracket <= 0) continue;

    const taxable = Math.min(remaining, spaceInBracket);
    const bracketTax = taxable * bracket.rate;
    tax += bracketTax;
    remaining -= taxable;
    if (taxable > 0) {
      breakdown.push({
        rate: `${(bracket.rate * 100).toFixed(0)}%`,
        amount: taxable,
        tax: bracketTax,
      });
    }
  }

  if (remaining > 0) {
    const topRate = 0.20;
    const bracketTax = remaining * topRate;
    tax += bracketTax;
    breakdown.push({ rate: "20%", amount: remaining, tax: bracketTax });
  }

  return { tax, effectiveRate: gain > 0 ? (tax / gain) * 100 : 0, breakdown };
}

function computeShortTermTax(
  gain: number,
  otherIncome: number,
  brackets: { rate: number; upTo: number }[]
): { tax: number; effectiveRate: number; breakdown: { rate: string; amount: number; tax: number }[] } {
  if (gain <= 0) return { tax: 0, effectiveRate: 0, breakdown: [] };

  const totalIncome = otherIncome + gain;
  let tax = 0;
  let prev = 0;
  const breakdown: { rate: string; amount: number; tax: number }[] = [];

  for (const bracket of brackets) {
    if (totalIncome <= prev) break;
    const rangeEnd = Math.min(totalIncome, bracket.upTo);
    const rangeStart = Math.max(prev, otherIncome);
    if (rangeEnd > rangeStart) {
      const taxable = rangeEnd - rangeStart;
      const bracketTax = taxable * bracket.rate;
      tax += bracketTax;
      breakdown.push({
        rate: `${(bracket.rate * 100).toFixed(0)}%`,
        amount: taxable,
        tax: bracketTax,
      });
    }
    prev = bracket.upTo;
  }

  if (totalIncome > brackets[brackets.length - 1].upTo) {
    const taxable = totalIncome - Math.max(brackets[brackets.length - 1].upTo, otherIncome);
    if (taxable > 0) {
      const bracketTax = taxable * 0.37;
      tax += bracketTax;
      breakdown.push({ rate: "37%", amount: taxable, tax: bracketTax });
    }
  }

  return { tax, effectiveRate: gain > 0 ? (tax / gain) * 100 : 0, breakdown };
}

interface Props {
  defaults?: Record<string, string>;
}

export function CapitalGainsTaxCalculator({ defaults }: Props) {
  const [salePrice, setSalePrice] = useState(defaults?.salePrice || "50000");
  const [costBasis, setCostBasis] = useState(defaults?.costBasis || "30000");
  const [holdingPeriod, setHoldingPeriod] = useState<"short" | "long">(
    (defaults?.holdingPeriod as "short" | "long") || "long"
  );
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(
    (defaults?.filingStatus as FilingStatus) || "single"
  );
  const [annualIncome, setAnnualIncome] = useState(defaults?.annualIncome || "85000");

  const results = useMemo(() => {
    const sale = parseFloat(salePrice) || 0;
    const basis = parseFloat(costBasis) || 0;
    const income = parseFloat(annualIncome) || 0;
    const gain = sale - basis;

    if (gain <= 0) {
      const loss = Math.abs(gain);
      const deductible = Math.min(loss, 3000);
      return {
        gain,
        isLoss: true,
        loss,
        deductible,
        carryForward: loss - deductible,
        tax: 0,
        effectiveRate: 0,
        niit: 0,
        totalTax: 0,
        netProfit: gain,
        breakdown: [] as { rate: string; amount: number; tax: number }[],
      };
    }

    let taxResult: { tax: number; effectiveRate: number; breakdown: { rate: string; amount: number; tax: number }[] };

    if (holdingPeriod === "long") {
      taxResult = computeLongTermTax(gain, income, LONG_TERM_BRACKETS[filingStatus]);
    } else {
      taxResult = computeShortTermTax(gain, income, SHORT_TERM_BRACKETS[filingStatus]);
    }

    const niitThreshold = NIIT_THRESHOLDS[filingStatus];
    const magi = income + gain;
    const niitIncome = Math.max(0, magi - niitThreshold);
    const niit = Math.min(gain, niitIncome) * 0.038;

    const totalTax = taxResult.tax + niit;

    return {
      gain,
      isLoss: false,
      loss: 0,
      deductible: 0,
      carryForward: 0,
      tax: taxResult.tax,
      effectiveRate: gain > 0 ? (totalTax / gain) * 100 : 0,
      niit,
      totalTax,
      netProfit: gain - totalTax,
      breakdown: taxResult.breakdown,
    };
  }, [salePrice, costBasis, holdingPeriod, filingStatus, annualIncome]);

  const holdingComparison = useMemo(() => {
    const sale = parseFloat(salePrice) || 0;
    const basis = parseFloat(costBasis) || 0;
    const income = parseFloat(annualIncome) || 0;
    const gain = sale - basis;
    if (gain <= 0) return null;

    const niitThreshold = NIIT_THRESHOLDS[filingStatus];
    const magi = income + gain;
    const niitIncome = Math.max(0, magi - niitThreshold);
    const niit = Math.min(gain, niitIncome) * 0.038;

    const longResult = computeLongTermTax(gain, income, LONG_TERM_BRACKETS[filingStatus]);
    const shortResult = computeShortTermTax(gain, income, SHORT_TERM_BRACKETS[filingStatus]);

    return {
      longTax: longResult.tax + niit,
      shortTax: shortResult.tax + niit,
      savings: shortResult.tax - longResult.tax,
    };
  }, [salePrice, costBasis, filingStatus, annualIncome]);

  return (
    <div>
      <p className="mb-4 text-sm text-ink-500">
        Estimate your capital gains tax on stocks, real estate, crypto, or other investments for 2026.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Sale Price"
          id="salePrice"
          value={salePrice}
          onChange={setSalePrice}
          prefix="$"
          min={0}
          helpText="Total amount you sold the asset for"
        />
        <InputField
          label="Cost Basis"
          id="costBasis"
          value={costBasis}
          onChange={setCostBasis}
          prefix="$"
          min={0}
          helpText="Original purchase price plus fees and improvements"
        />
        <InputField
          label="Annual Taxable Income"
          id="annualIncome"
          value={annualIncome}
          onChange={setAnnualIncome}
          prefix="$"
          min={0}
          helpText="Your other taxable income (wages, salary, etc.)"
        />
        <div>
          <label htmlFor="filingStatus" className="block text-sm font-medium text-ink-700">
            Filing Status
          </label>
          <select
            id="filingStatus"
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
            className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="single">Single</option>
            <option value="mfj">Married Filing Jointly</option>
            <option value="hoh">Head of Household</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-ink-700 mb-2">Holding Period</label>
        <div className="flex gap-3">
          <button
            onClick={() => setHoldingPeriod("long")}
            className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              holdingPeriod === "long"
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-ink-300 bg-white text-ink-600 hover:bg-ink-50"
            }`}
          >
            Long-Term (over 1 year)
          </button>
          <button
            onClick={() => setHoldingPeriod("short")}
            className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              holdingPeriod === "short"
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-ink-300 bg-white text-ink-600 hover:bg-ink-50"
            }`}
          >
            Short-Term (1 year or less)
          </button>
        </div>
      </div>

      <div className="mt-8">
        {results.isLoss ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <p className="text-sm font-medium text-red-700">Capital Loss</p>
            <p className="mt-1 text-3xl font-bold text-red-900">{formatCurrency(results.loss)}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-3">
                <p className="text-xs font-medium text-ink-500">Deductible This Year</p>
                <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.deductible)}</p>
                <p className="text-xs text-ink-400">Up to $3,000 against ordinary income</p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-xs font-medium text-ink-500">Carry Forward to Future Years</p>
                <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.carryForward)}</p>
                <p className="text-xs text-ink-400">Offsets future capital gains</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 rounded-lg border border-ink-200 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Net Profit After Tax</p>
              <p className="mt-1 text-3xl font-bold text-ink-900">
                {formatCurrency(results.netProfit)}
              </p>
              <p className="mt-1 text-sm text-ink-500">
                Capital gain: {formatCurrency(results.gain)}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-brand-50 p-4 text-center">
                <p className="text-sm font-medium text-brand-700">Capital Gains Tax</p>
                <p className="mt-1 text-2xl font-bold text-brand-900">
                  {formatCurrency(results.tax)}
                </p>
              </div>
              <div className="rounded-lg bg-accent-50 p-4 text-center">
                <p className="text-sm font-medium text-accent-700">Effective Tax Rate</p>
                <p className="mt-1 text-2xl font-bold text-accent-900">
                  {formatPercent(results.effectiveRate)}
                </p>
              </div>
              <div className="rounded-lg bg-ink-100 p-4 text-center">
                <p className="text-sm font-medium text-ink-600">NIIT (3.8%)</p>
                <p className="mt-1 text-2xl font-bold text-ink-800">
                  {formatCurrency(results.niit)}
                </p>
              </div>
            </div>

            {results.breakdown.length > 0 && (
              <div className="mt-6 overflow-x-auto rounded-lg border border-ink-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-ink-200 bg-ink-50">
                      <th className="px-4 py-3 text-left font-medium text-ink-700">Tax Rate</th>
                      <th className="px-4 py-3 text-right font-medium text-ink-700">Taxable Amount</th>
                      <th className="px-4 py-3 text-right font-medium text-ink-700">Tax Owed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.breakdown.map((row, i) => (
                      <tr key={i} className="border-b border-ink-100">
                        <td className="px-4 py-3 text-ink-800">{row.rate}</td>
                        <td className="px-4 py-3 text-right text-ink-600">
                          {formatCurrency(row.amount)}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-ink-800">
                          {formatCurrency(row.tax)}
                        </td>
                      </tr>
                    ))}
                    {results.niit > 0 && (
                      <tr className="border-b border-ink-100">
                        <td className="px-4 py-3 text-ink-800">3.8% NIIT</td>
                        <td className="px-4 py-3 text-right text-ink-600">--</td>
                        <td className="px-4 py-3 text-right font-medium text-ink-800">
                          {formatCurrency(results.niit)}
                        </td>
                      </tr>
                    )}
                    <tr className="bg-ink-50 font-medium">
                      <td className="px-4 py-3 text-ink-800">Total</td>
                      <td className="px-4 py-3 text-right text-ink-600">
                        {formatCurrency(results.gain)}
                      </td>
                      <td className="px-4 py-3 text-right text-ink-900">
                        {formatCurrency(results.totalTax)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {holdingComparison && holdingComparison.savings > 0 && (
              <div className="mt-6 overflow-x-auto rounded-lg border border-ink-200">
                <h3 className="border-b border-ink-200 bg-ink-50 px-4 py-3 text-sm font-semibold text-ink-700">
                  Short-Term vs Long-Term Comparison
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-ink-200">
                      <th className="px-4 py-3 text-left font-medium text-ink-700">Holding Period</th>
                      <th className="px-4 py-3 text-right font-medium text-ink-700">Total Tax</th>
                      <th className="px-4 py-3 text-right font-medium text-ink-700">Net Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-ink-100">
                      <td className="px-4 py-3 text-ink-800">Short-Term (1 year or less)</td>
                      <td className="px-4 py-3 text-right text-red-600">
                        {formatCurrency(holdingComparison.shortTax)}
                      </td>
                      <td className="px-4 py-3 text-right text-ink-600">
                        {formatCurrency(results.gain - holdingComparison.shortTax)}
                      </td>
                    </tr>
                    <tr className="border-b border-ink-100 bg-green-50/50">
                      <td className="px-4 py-3 text-ink-800 font-medium">Long-Term (over 1 year)</td>
                      <td className="px-4 py-3 text-right text-green-700 font-medium">
                        {formatCurrency(holdingComparison.longTax)}
                      </td>
                      <td className="px-4 py-3 text-right text-green-700 font-medium">
                        {formatCurrency(results.gain - holdingComparison.longTax)}
                      </td>
                    </tr>
                    <tr className="bg-ink-50 font-medium">
                      <td className="px-4 py-3 text-ink-800">Tax Savings by Holding Longer</td>
                      <td className="px-4 py-3 text-right text-green-700" colSpan={2}>
                        {formatCurrency(holdingComparison.savings)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
