"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";
import { RateDefaultNote } from "@/components/RateDefaultNote";
import { DEFAULT_MORTGAGE_RATE, MORTGAGE_MARKET } from "@/lib/market-data";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatCurrencyExact(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}

function calcLoan(amount: number, rate: number, years: number) {
  const monthlyRate = rate / 100 / 12;
  const n = years * 12;
  if (monthlyRate === 0) {
    const monthly = amount / n;
    return { monthly, totalPaid: amount, totalInterest: 0 };
  }
  const monthly = (amount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  const totalPaid = monthly * n;
  const totalInterest = totalPaid - amount;
  return { monthly, totalPaid, totalInterest };
}

export function LoanComparisonCalculator() {
  const [amount, setAmount] = useState("250000");
  const [rateA, setRateA] = useState(DEFAULT_MORTGAGE_RATE);
  const [termA, setTermA] = useState("30");
  const [rateB, setRateB] = useState(String(MORTGAGE_MARKET.fifteenYear));
  const [termB, setTermB] = useState("15");

  const results = useMemo(() => {
    const loanAmount = parseFloat(amount) || 0;
    const rA = parseFloat(rateA) || 0;
    const tA = parseInt(termA) || 30;
    const rB = parseFloat(rateB) || 0;
    const tB = parseInt(termB) || 15;

    if (loanAmount <= 0) return null;

    const a = calcLoan(loanAmount, rA, tA);
    const b = calcLoan(loanAmount, rB, tB);
    const interestDiff = Math.abs(a.totalInterest - b.totalInterest);
    const monthlyDiff = Math.abs(a.monthly - b.monthly);

    return { a, b, interestDiff, monthlyDiff, winner: a.totalPaid < b.totalPaid ? "A" : "B" };
  }, [amount, rateA, termA, rateB, termB]);

  return (
    <div>
      <div className="mb-6">
        <InputField
          label="Loan Amount"
          id="amount"
          value={amount}
          onChange={setAmount}
          prefix="$"
          min={0}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Loan A */}
        <div className="rounded-lg border border-brand-200 bg-brand-50/50 p-4">
          <h3 className="font-semibold text-brand-800">Loan A</h3>
          <div className="mt-3 space-y-3">
            <InputField
              label="Interest Rate"
              id="rateA"
              value={rateA}
              onChange={setRateA}
              suffix="%"
              min={0}
              max={30}
              step={0.1}
            />
            <InputField
              label="Term"
              id="termA"
              value={termA}
              onChange={setTermA}
              suffix="years"
              min={1}
              max={50}
            />
          </div>
        </div>

        {/* Loan B */}
        <div className="rounded-lg border border-accent-200 bg-accent-50/50 p-4">
          <h3 className="font-semibold text-accent-800">Loan B</h3>
          <div className="mt-3 space-y-3">
            <InputField
              label="Interest Rate"
              id="rateB"
              value={rateB}
              onChange={setRateB}
              suffix="%"
              min={0}
              max={30}
              step={0.1}
            />
            <InputField
              label="Term"
              id="termB"
              value={termB}
              onChange={setTermB}
              suffix="years"
              min={1}
              max={50}
            />
          </div>
        </div>
      </div>

      <RateDefaultNote rate={[rateA, rateB]} />

      {results && (
        <div className="mt-8">
          {/* Comparison Table */}
          <div className="overflow-hidden rounded-lg border border-ink-200">
            <table className="w-full text-sm">
              <thead className="bg-ink-100">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-ink-600"></th>
                  <th className="px-4 py-3 text-right font-medium text-brand-700">Loan A</th>
                  <th className="px-4 py-3 text-right font-medium text-accent-700">Loan B</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-ink-100">
                  <td className="px-4 py-3 font-medium text-ink-700">Monthly Payment</td>
                  <td className="px-4 py-3 text-right font-semibold text-ink-800">{formatCurrencyExact(results.a.monthly)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-ink-800">{formatCurrencyExact(results.b.monthly)}</td>
                </tr>
                <tr className="border-t border-ink-100">
                  <td className="px-4 py-3 font-medium text-ink-700">Total Interest</td>
                  <td className="px-4 py-3 text-right text-ink-700">{formatCurrency(results.a.totalInterest)}</td>
                  <td className="px-4 py-3 text-right text-ink-700">{formatCurrency(results.b.totalInterest)}</td>
                </tr>
                <tr className="border-t border-ink-100">
                  <td className="px-4 py-3 font-medium text-ink-700">Total Cost</td>
                  <td className="px-4 py-3 text-right font-semibold text-ink-800">{formatCurrency(results.a.totalPaid)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-ink-800">{formatCurrency(results.b.totalPaid)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-lg bg-accent-50 p-4">
            <p className="font-semibold text-accent-800">
              Loan {results.winner} saves you {formatCurrency(results.interestDiff)} in total interest.
            </p>
            <p className="mt-1 text-sm text-accent-700">
              Monthly payment difference: {formatCurrencyExact(results.monthlyDiff)}/month
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
