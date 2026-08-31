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

interface Props {
  defaults?: Record<string, string>;
}

export function AutoLoanCalculator({ defaults }: Props) {
  const [vehiclePrice, setVehiclePrice] = useState(defaults?.vehiclePrice || "35000");
  const [downPayment, setDownPayment] = useState(defaults?.downPayment || "5000");
  const [tradeIn, setTradeIn] = useState(defaults?.tradeIn || "0");
  const [annualRate, setAnnualRate] = useState(defaults?.annualRate || "6.5");
  const [termMonths, setTermMonths] = useState(defaults?.termMonths || "60");
  const [salesTax, setSalesTax] = useState(defaults?.salesTax || "7");

  const results = useMemo(() => {
    const price = parseFloat(vehiclePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeIn) || 0;
    const rate = (parseFloat(annualRate) || 0) / 100;
    const term = parseInt(termMonths) || 60;
    const tax = (parseFloat(salesTax) || 0) / 100;

    const taxableAmount = price - trade;
    const taxAmount = taxableAmount > 0 ? taxableAmount * tax : 0;
    const loanAmount = price + taxAmount - down - trade;

    if (loanAmount <= 0) {
      return {
        monthlyPayment: 0,
        loanAmount: 0,
        totalInterest: 0,
        totalCost: 0,
        taxAmount,
        schedule: [] as MonthRow[],
      };
    }

    const monthlyRate = rate / 12;
    let monthlyPayment: number;

    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / term;
    } else {
      monthlyPayment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
        (Math.pow(1 + monthlyRate, term) - 1);
    }

    const schedule: MonthRow[] = [];
    let balance = loanAmount;

    for (let m = 1; m <= term; m++) {
      const interestPortion = balance * monthlyRate;
      const principalPortion = monthlyPayment - interestPortion;
      balance -= principalPortion;
      schedule.push({
        month: m,
        payment: monthlyPayment,
        principal: principalPortion,
        interest: interestPortion,
        balance: Math.max(balance, 0),
      });
    }

    const totalCost = monthlyPayment * term;
    const totalInterest = totalCost - loanAmount;

    return { monthlyPayment, loanAmount, totalInterest, totalCost, taxAmount, schedule };
  }, [vehiclePrice, downPayment, tradeIn, annualRate, termMonths, salesTax]);

  const interestPct = results.totalCost > 0 ? (results.totalInterest / results.totalCost) * 100 : 0;
  const principalPct = 100 - interestPct;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField
          label="Vehicle Price"
          id="vehiclePrice"
          value={vehiclePrice}
          onChange={setVehiclePrice}
          prefix="$"
          min={0}
        />
        <InputField
          label="Down Payment"
          id="downPayment"
          value={downPayment}
          onChange={setDownPayment}
          prefix="$"
          min={0}
        />
        <InputField
          label="Trade-in Value"
          id="tradeIn"
          value={tradeIn}
          onChange={setTradeIn}
          prefix="$"
          min={0}
        />
        <InputField
          label="Interest Rate (APR)"
          id="annualRate"
          value={annualRate}
          onChange={setAnnualRate}
          suffix="%"
          min={0}
          max={30}
          step={0.1}
        />
        <div>
          <label htmlFor="termMonths" className="block text-sm font-medium text-ink-700">
            Loan Term
          </label>
          <select
            id="termMonths"
            value={termMonths}
            onChange={(e) => setTermMonths(e.target.value)}
            className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="24">24 months (2 years)</option>
            <option value="36">36 months (3 years)</option>
            <option value="48">48 months (4 years)</option>
            <option value="60">60 months (5 years)</option>
            <option value="72">72 months (6 years)</option>
            <option value="84">84 months (7 years)</option>
          </select>
        </div>
        <InputField
          label="Sales Tax"
          id="salesTax"
          value={salesTax}
          onChange={setSalesTax}
          suffix="%"
          min={0}
          max={15}
          step={0.1}
        />
      </div>

      {results.loanAmount > 0 && (
        <div className="mt-8">
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-sm font-medium text-accent-700">Monthly Payment</p>
              <p className="mt-1 text-2xl font-bold text-accent-900">
                {formatCurrency(results.monthlyPayment)}
              </p>
            </div>
            <div className="rounded-lg bg-brand-50 p-4 text-center">
              <p className="text-sm font-medium text-brand-700">Loan Amount</p>
              <p className="mt-1 text-2xl font-bold text-brand-900">
                {formatCurrency(results.loanAmount)}
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Total Interest</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">
                {formatCurrency(results.totalInterest)}
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Total Cost</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">
                {formatCurrency(results.totalCost)}
              </p>
            </div>
          </div>

          {/* Cost Breakdown Bar */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink-700">Payment Breakdown</p>
            <div className="mt-2 flex h-6 overflow-hidden rounded-full bg-ink-200">
              <div
                className="bg-brand-500 transition-all"
                style={{ width: `${principalPct}%` }}
              />
              <div
                className="bg-accent-500 transition-all"
                style={{ width: `${interestPct}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-ink-500">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-500" />
                Principal: {principalPct.toFixed(1)}%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-500" />
                Interest: {interestPct.toFixed(1)}%
              </span>
            </div>
          </div>

          {results.taxAmount > 0 && (
            <p className="mt-4 text-sm text-ink-500">
              Estimated sales tax included in loan: {formatCurrency(results.taxAmount)}
            </p>
          )}

          {/* Amortization Schedule */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink-700">Amortization Schedule</p>
            <div className="mt-3 max-h-72 overflow-auto rounded-lg border border-ink-200">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
