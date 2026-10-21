"use client";

import { useState, useMemo, useEffect } from "react";
import { InputField } from "@/components/InputField";
import { Sources } from "@/components/Sources";
import {
  ORDINARY_BRACKETS,
  STANDARD_DEDUCTIONS,
  TAX_DATA,
  TAX_SOURCES,
  TOP_ORDINARY_RATE,
  type FilingStatus,
} from "@/lib/tax-data";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`;
}

interface TaxBracket {
  rate: number;
  label: string;
  upTo: number;
}

const TAX_BRACKETS = Object.fromEntries(
  (Object.keys(ORDINARY_BRACKETS) as FilingStatus[]).map((status) => [
    status,
    ORDINARY_BRACKETS[status].map((b) => ({ ...b, label: `${Math.round(b.rate * 100)}%` })),
  ])
) as Record<FilingStatus, TaxBracket[]>;

function calculateProgressiveTax(
  taxableIncome: number,
  brackets: TaxBracket[]
): { tax: number; breakdown: { rate: string; amount: number; tax: number }[]; marginalRate: number } {
  if (taxableIncome <= 0) {
    return { tax: 0, breakdown: [], marginalRate: 0 };
  }

  let tax = 0;
  let prev = 0;
  let marginalRate = 0;
  const breakdown: { rate: string; amount: number; tax: number }[] = [];

  for (const bracket of brackets) {
    if (taxableIncome <= prev) break;

    const amountInBracket = Math.min(taxableIncome, bracket.upTo) - prev;
    if (amountInBracket > 0) {
      const bracketTax = amountInBracket * bracket.rate;
      tax += bracketTax;
      marginalRate = bracket.rate;
      breakdown.push({
        rate: bracket.label,
        amount: amountInBracket,
        tax: bracketTax,
      });
    }
    prev = bracket.upTo;
  }

  if (taxableIncome > brackets[brackets.length - 1].upTo) {
    const amountInBracket = taxableIncome - brackets[brackets.length - 1].upTo;
    const bracketTax = amountInBracket * TOP_ORDINARY_RATE;
    tax += bracketTax;
    marginalRate = TOP_ORDINARY_RATE;
    breakdown.push({
      rate: `${Math.round(TOP_ORDINARY_RATE * 100)}%`,
      amount: amountInBracket,
      tax: bracketTax,
    });
  }

  return { tax, breakdown, marginalRate };
}

interface Props {
  defaults?: Record<string, string>;
}

export function IncomeTaxCalculator({ defaults }: Props) {
  const [grossIncome, setGrossIncome] = useState(defaults?.grossIncome || "75000");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(
    (defaults?.filingStatus as FilingStatus) || "single"
  );
  const [standardDeduction, setStandardDeduction] = useState(
    defaults?.standardDeduction || String(STANDARD_DEDUCTIONS.single)
  );
  const [additionalDeductions, setAdditionalDeductions] = useState(
    defaults?.additionalDeductions || "0"
  );

  useEffect(() => {
    if (!defaults?.standardDeduction) {
      setStandardDeduction(String(STANDARD_DEDUCTIONS[filingStatus]));
    }
  }, [filingStatus, defaults?.standardDeduction]);

  const results = useMemo(() => {
    const gross = parseFloat(grossIncome) || 0;
    const stdDed = parseFloat(standardDeduction) || 0;
    const addDed = parseFloat(additionalDeductions) || 0;
    const taxableIncome = Math.max(0, gross - stdDed - addDed);
    const brackets = TAX_BRACKETS[filingStatus];
    const { tax, breakdown, marginalRate } = calculateProgressiveTax(taxableIncome, brackets);
    const effectiveRate = gross > 0 ? (tax / gross) * 100 : 0;
    const afterTaxIncome = gross - tax;

    return {
      gross,
      taxableIncome,
      tax,
      effectiveRate,
      marginalRate: marginalRate * 100,
      afterTaxIncome,
      breakdown,
    };
  }, [grossIncome, standardDeduction, additionalDeductions, filingStatus]);

  return (
    <div>
      <p className="mb-4 text-sm text-ink-500">
        Estimate your 2026 federal income tax based on filing status, income, and deductions.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Annual Gross Income"
          id="grossIncome"
          value={grossIncome}
          onChange={setGrossIncome}
          prefix="$"
          min={0}
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
        <InputField
          label="Standard Deduction"
          id="standardDeduction"
          value={standardDeduction}
          onChange={setStandardDeduction}
          prefix="$"
          min={0}
          helpText="2026 standard deduction for your filing status (IRS Rev. Proc. 2025-32); replace it if you itemize"
        />
        <InputField
          label="Additional Deductions / 401(k) Contributions"
          id="additionalDeductions"
          value={additionalDeductions}
          onChange={setAdditionalDeductions}
          prefix="$"
          min={0}
          helpText="Pre-tax 401(k), HSA, or other above-the-line deductions"
        />
      </div>

      {results && (
        <div className="mt-8">
          <div className="mb-6 rounded-lg border border-ink-200 p-4 text-center">
            <p className="text-sm font-medium text-ink-600">After-Tax Income</p>
            <p className="mt-1 text-3xl font-bold text-ink-900">
              {formatCurrency(results.afterTaxIncome)}
            </p>
            <p className="mt-1 text-sm text-ink-500">
              Taxable income: {formatCurrency(results.taxableIncome)}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-brand-50 p-4 text-center">
              <p className="text-sm font-medium text-brand-700">Estimated Federal Tax</p>
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
              <p className="text-sm font-medium text-ink-600">Marginal Tax Rate</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">
                {formatPercent(results.marginalRate)}
              </p>
            </div>
          </div>

          {results.breakdown.length > 0 && (
            <div className="mt-6 overflow-x-auto rounded-lg border border-ink-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50">
                    <th className="px-4 py-3 text-left font-medium text-ink-700">Tax Bracket</th>
                    <th className="px-4 py-3 text-right font-medium text-ink-700">Taxable Amount</th>
                    <th className="px-4 py-3 text-right font-medium text-ink-700">Tax Owed</th>
                  </tr>
                </thead>
                <tbody>
                  {results.breakdown.map((row) => (
                    <tr key={row.rate} className="border-b border-ink-100">
                      <td className="px-4 py-3 text-ink-800">{row.rate}</td>
                      <td className="px-4 py-3 text-right text-ink-600">
                        {formatCurrency(row.amount)}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-ink-800">
                        {formatCurrency(row.tax)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-ink-50 font-medium">
                    <td className="px-4 py-3 text-ink-800">Total</td>
                    <td className="px-4 py-3 text-right text-ink-600">
                      {formatCurrency(results.taxableIncome)}
                    </td>
                    <td className="px-4 py-3 text-right text-ink-900">
                      {formatCurrency(results.tax)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <Sources
        className="mt-6"
        items={[TAX_SOURCES.revProc, TAX_SOURCES.federalRates]}
        checked={TAX_DATA.checkedOnLabel}
        note={`Brackets and standard deduction are for tax year ${TAX_DATA.taxYear}. Estimates only; credits, state tax, and itemized deductions are not modeled.`}
      />
    </div>
  );
}
