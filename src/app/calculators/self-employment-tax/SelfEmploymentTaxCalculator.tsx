"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`;
}

const SS_WAGE_BASE_2026 = 168600;
const SS_RATE = 0.124;
const MEDICARE_RATE = 0.029;
const SE_TAX_RATE = SS_RATE + MEDICARE_RATE; // 15.3%
const ADDITIONAL_MEDICARE_RATE = 0.009;
const SE_EARNINGS_FACTOR = 0.9235;

type FilingStatus = "single" | "mfj";

const ADDITIONAL_MEDICARE_THRESHOLDS: Record<FilingStatus, number> = {
  single: 200000,
  mfj: 250000,
};

interface Props {
  defaults?: Record<string, string>;
}

export function SelfEmploymentTaxCalculator({ defaults }: Props) {
  const [grossIncome, setGrossIncome] = useState(defaults?.grossIncome || "100000");
  const [businessExpenses, setBusinessExpenses] = useState(defaults?.businessExpenses || "20000");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(
    (defaults?.filingStatus as FilingStatus) || "single"
  );
  const [otherW2Income, setOtherW2Income] = useState(defaults?.otherW2Income || "0");

  const results = useMemo(() => {
    const gross = parseFloat(grossIncome) || 0;
    const expenses = parseFloat(businessExpenses) || 0;
    const w2 = parseFloat(otherW2Income) || 0;
    const netEarnings = Math.max(0, gross - expenses);

    const taxableEarnings = netEarnings * SE_EARNINGS_FACTOR;

    // Social Security: 12.4% up to wage base, reduced by W-2 wages already subject to SS
    const ssWageRoom = Math.max(0, SS_WAGE_BASE_2026 - w2);
    const ssTaxableEarnings = Math.min(taxableEarnings, ssWageRoom);
    const ssTax = ssTaxableEarnings * SS_RATE;

    // Medicare: 2.9% on all taxable SE earnings
    const medicareTax = taxableEarnings * MEDICARE_RATE;

    // Additional Medicare: 0.9% on combined earnings over threshold
    const threshold = ADDITIONAL_MEDICARE_THRESHOLDS[filingStatus];
    const combinedEarnings = w2 + taxableEarnings;
    const additionalMedicareBase = Math.max(0, combinedEarnings - threshold);
    const sePortion = Math.min(additionalMedicareBase, taxableEarnings);
    const additionalMedicareTax = sePortion * ADDITIONAL_MEDICARE_RATE;

    const totalSETax = ssTax + medicareTax + additionalMedicareTax;

    // Deductible half of SE tax (employer-equivalent portion)
    const deductibleHalf = (ssTax + medicareTax) / 2;

    // Quarterly estimated payments
    const quarterlyPayment = totalSETax / 4;

    // Effective SE tax rate
    const effectiveRate = netEarnings > 0 ? (totalSETax / netEarnings) * 100 : 0;

    return {
      netEarnings,
      taxableEarnings,
      ssTax,
      ssTaxableEarnings,
      medicareTax,
      additionalMedicareTax,
      totalSETax,
      deductibleHalf,
      quarterlyPayment,
      effectiveRate,
      ssWageRoom,
      ssCapped: taxableEarnings > ssWageRoom,
    };
  }, [grossIncome, businessExpenses, filingStatus, otherW2Income]);

  const incomeComparison = useMemo(() => {
    const gross = parseFloat(grossIncome) || 0;
    const expenses = parseFloat(businessExpenses) || 0;
    const netEarnings = Math.max(0, gross - expenses);

    const scenarios = [60000, 80000, 100000, 120000, 150000];
    return scenarios.map((net) => {
      const taxable = net * SE_EARNINGS_FACTOR;
      const ss = Math.min(taxable, SS_WAGE_BASE_2026) * SS_RATE;
      const med = taxable * MEDICARE_RATE;
      const total = ss + med;
      return {
        income: net,
        seTax: total,
        effectiveRate: (total / net) * 100,
        isCurrentBracket: net === Math.round(netEarnings / 10000) * 10000,
      };
    });
  }, [grossIncome, businessExpenses]);

  return (
    <div>
      <p className="mb-4 text-sm text-ink-500">
        Calculate your self-employment tax for 2026 including Social Security, Medicare, and the Additional Medicare Tax.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Gross Self-Employment Income"
          id="grossIncome"
          value={grossIncome}
          onChange={setGrossIncome}
          prefix="$"
          min={0}
          helpText="Total revenue from freelancing, contracting, or business"
        />
        <InputField
          label="Business Expenses"
          id="businessExpenses"
          value={businessExpenses}
          onChange={setBusinessExpenses}
          prefix="$"
          min={0}
          helpText="Deductible business expenses (home office, supplies, etc.)"
        />
        <InputField
          label="Other W-2 Wages"
          id="otherW2Income"
          value={otherW2Income}
          onChange={setOtherW2Income}
          prefix="$"
          min={0}
          helpText="Wages from an employer already subject to FICA (if any)"
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
            <option value="single">Single / Head of Household</option>
            <option value="mfj">Married Filing Jointly</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        {/* Summary cards */}
        <div className="mb-6 rounded-lg border border-ink-200 p-4 text-center">
          <p className="text-sm font-medium text-ink-600">Total Self-Employment Tax</p>
          <p className="mt-1 text-3xl font-bold text-ink-900">
            {formatCurrency(results.totalSETax)}
          </p>
          <p className="mt-1 text-sm text-ink-500">
            Net self-employment earnings: {formatCurrency(results.netEarnings)}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-brand-50 p-4 text-center">
            <p className="text-sm font-medium text-brand-700">Effective SE Tax Rate</p>
            <p className="mt-1 text-2xl font-bold text-brand-900">
              {formatPercent(results.effectiveRate)}
            </p>
          </div>
          <div className="rounded-lg bg-accent-50 p-4 text-center">
            <p className="text-sm font-medium text-accent-700">Deductible Half</p>
            <p className="mt-1 text-2xl font-bold text-accent-900">
              {formatCurrency(results.deductibleHalf)}
            </p>
          </div>
          <div className="rounded-lg bg-ink-100 p-4 text-center">
            <p className="text-sm font-medium text-ink-600">Quarterly Payment</p>
            <p className="mt-1 text-2xl font-bold text-ink-800">
              {formatCurrency(results.quarterlyPayment)}
            </p>
          </div>
        </div>

        {/* Tax breakdown table */}
        <div className="mt-6 overflow-x-auto rounded-lg border border-ink-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50">
                <th className="px-4 py-3 text-left font-medium text-ink-700">Component</th>
                <th className="px-4 py-3 text-right font-medium text-ink-700">Rate</th>
                <th className="px-4 py-3 text-right font-medium text-ink-700">Taxable Amount</th>
                <th className="px-4 py-3 text-right font-medium text-ink-700">Tax</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">92.35% Adjustment</td>
                <td className="px-4 py-3 text-right text-ink-600">x 0.9235</td>
                <td className="px-4 py-3 text-right text-ink-600">
                  {formatCurrency(results.taxableEarnings)}
                </td>
                <td className="px-4 py-3 text-right text-ink-400">--</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">
                  Social Security
                  {results.ssCapped && (
                    <span className="ml-2 text-xs text-ink-400">(wage base cap applied)</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-ink-600">12.4%</td>
                <td className="px-4 py-3 text-right text-ink-600">
                  {formatCurrency(results.ssTaxableEarnings)}
                </td>
                <td className="px-4 py-3 text-right font-medium text-ink-800">
                  {formatCurrency(results.ssTax)}
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Medicare</td>
                <td className="px-4 py-3 text-right text-ink-600">2.9%</td>
                <td className="px-4 py-3 text-right text-ink-600">
                  {formatCurrency(results.taxableEarnings)}
                </td>
                <td className="px-4 py-3 text-right font-medium text-ink-800">
                  {formatCurrency(results.medicareTax)}
                </td>
              </tr>
              {results.additionalMedicareTax > 0 && (
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-3 text-ink-800">Additional Medicare Tax</td>
                  <td className="px-4 py-3 text-right text-ink-600">0.9%</td>
                  <td className="px-4 py-3 text-right text-ink-600">--</td>
                  <td className="px-4 py-3 text-right font-medium text-ink-800">
                    {formatCurrency(results.additionalMedicareTax)}
                  </td>
                </tr>
              )}
              <tr className="bg-ink-50 font-medium">
                <td className="px-4 py-3 text-ink-800">Total SE Tax</td>
                <td className="px-4 py-3 text-right text-ink-600">--</td>
                <td className="px-4 py-3 text-right text-ink-600">--</td>
                <td className="px-4 py-3 text-right text-ink-900">
                  {formatCurrency(results.totalSETax)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Quarterly payment schedule */}
        <div className="mt-6 overflow-x-auto rounded-lg border border-ink-200">
          <h3 className="border-b border-ink-200 bg-ink-50 px-4 py-3 text-sm font-semibold text-ink-700">
            2026 Quarterly Estimated Payment Schedule
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-200">
                <th className="px-4 py-3 text-left font-medium text-ink-700">Quarter</th>
                <th className="px-4 py-3 text-left font-medium text-ink-700">Period</th>
                <th className="px-4 py-3 text-left font-medium text-ink-700">Due Date</th>
                <th className="px-4 py-3 text-right font-medium text-ink-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Q1</td>
                <td className="px-4 py-3 text-ink-600">Jan 1 - Mar 31</td>
                <td className="px-4 py-3 text-ink-600">Apr 15, 2026</td>
                <td className="px-4 py-3 text-right font-medium text-ink-800">
                  {formatCurrency(results.quarterlyPayment)}
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Q2</td>
                <td className="px-4 py-3 text-ink-600">Apr 1 - May 31</td>
                <td className="px-4 py-3 text-ink-600">Jun 15, 2026</td>
                <td className="px-4 py-3 text-right font-medium text-ink-800">
                  {formatCurrency(results.quarterlyPayment)}
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Q3</td>
                <td className="px-4 py-3 text-ink-600">Jun 1 - Aug 31</td>
                <td className="px-4 py-3 text-ink-600">Sep 15, 2026</td>
                <td className="px-4 py-3 text-right font-medium text-ink-800">
                  {formatCurrency(results.quarterlyPayment)}
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-3 text-ink-800">Q4</td>
                <td className="px-4 py-3 text-ink-600">Sep 1 - Dec 31</td>
                <td className="px-4 py-3 text-ink-600">Jan 15, 2027</td>
                <td className="px-4 py-3 text-right font-medium text-ink-800">
                  {formatCurrency(results.quarterlyPayment)}
                </td>
              </tr>
              <tr className="bg-ink-50 font-medium">
                <td className="px-4 py-3 text-ink-800" colSpan={3}>Annual Total</td>
                <td className="px-4 py-3 text-right text-ink-900">
                  {formatCurrency(results.totalSETax)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Income comparison table */}
        <div className="mt-6 overflow-x-auto rounded-lg border border-ink-200">
          <h3 className="border-b border-ink-200 bg-ink-50 px-4 py-3 text-sm font-semibold text-ink-700">
            SE Tax at Different Income Levels
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-200">
                <th className="px-4 py-3 text-left font-medium text-ink-700">Net SE Income</th>
                <th className="px-4 py-3 text-right font-medium text-ink-700">SE Tax</th>
                <th className="px-4 py-3 text-right font-medium text-ink-700">Effective Rate</th>
                <th className="px-4 py-3 text-right font-medium text-ink-700">Quarterly Payment</th>
              </tr>
            </thead>
            <tbody>
              {incomeComparison.map((row) => (
                <tr key={row.income} className="border-b border-ink-100">
                  <td className="px-4 py-3 text-ink-800">{formatCurrency(row.income)}</td>
                  <td className="px-4 py-3 text-right text-ink-600">{formatCurrency(row.seTax)}</td>
                  <td className="px-4 py-3 text-right text-ink-600">{formatPercent(row.effectiveRate)}</td>
                  <td className="px-4 py-3 text-right text-ink-600">{formatCurrency(row.seTax / 4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
