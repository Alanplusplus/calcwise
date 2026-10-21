"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";
import { RateDefaultNote } from "@/components/RateDefaultNote";
import { DEFAULT_MORTGAGE_RATE } from "@/lib/market-data";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatCurrencyExact(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface Props {
  defaults?: Record<string, string>;
}

export function MortgageCalculator({ defaults }: Props) {
  const [homePrice, setHomePrice] = useState(defaults?.homePrice || "350000");
  const [downPayment, setDownPayment] = useState(defaults?.downPayment || "70000");
  const [loanTerm, setLoanTerm] = useState(defaults?.loanTerm || "30");
  const [interestRate, setInterestRate] = useState(defaults?.interestRate || DEFAULT_MORTGAGE_RATE);
  const [showAmortization, setShowAmortization] = useState(false);

  const results = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const years = parseInt(loanTerm) || 30;
    const rate = parseFloat(interestRate) || 0;

    const principal = price - down;
    if (principal <= 0 || rate <= 0) return null;

    const monthlyRate = rate / 100 / 12;
    const totalPayments = years * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const totalPaid = monthlyPayment * totalPayments;
    const totalInterest = totalPaid - principal;

    const schedule: AmortizationRow[] = [];
    let balance = principal;
    for (let m = 1; m <= totalPayments; m++) {
      const interestPortion = balance * monthlyRate;
      const principalPortion = monthlyPayment - interestPortion;
      balance -= principalPortion;
      schedule.push({
        month: m,
        payment: monthlyPayment,
        principal: principalPortion,
        interest: interestPortion,
        balance: Math.max(0, balance),
      });
    }

    return { monthlyPayment, totalPaid, totalInterest, principal, schedule };
  }, [homePrice, downPayment, loanTerm, interestRate]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InputField
          label="Home Price"
          id="homePrice"
          value={homePrice}
          onChange={setHomePrice}
          prefix="$"
          min={0}
          step={1000}
        />
        <InputField
          label="Down Payment"
          id="downPayment"
          value={downPayment}
          onChange={setDownPayment}
          prefix="$"
          min={0}
          step={1000}
        />
        <InputField
          label="Loan Term"
          id="loanTerm"
          value={loanTerm}
          onChange={setLoanTerm}
          suffix="years"
          min={1}
          max={50}
        />
        <InputField
          label="Interest Rate"
          id="interestRate"
          value={interestRate}
          onChange={setInterestRate}
          suffix="%"
          min={0}
          max={30}
          step={0.1}
        />
      </div>
      <RateDefaultNote rate={interestRate} />

      {results && (
        <div className="mt-8">
          {/* Results Summary */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-brand-50 p-4 text-center">
              <p className="text-sm font-medium text-brand-700">Monthly Payment</p>
              <p className="mt-1 text-2xl font-bold text-brand-900">
                {formatCurrencyExact(results.monthlyPayment)}
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
                {formatCurrency(results.totalPaid)}
              </p>
            </div>
          </div>

          {/* Payment Breakdown Bar */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink-700">Payment Breakdown</p>
            <div className="mt-2 flex h-4 overflow-hidden rounded-full">
              <div
                className="bg-brand-500"
                style={{ width: `${(results.principal / results.totalPaid) * 100}%` }}
                title="Principal"
              />
              <div
                className="bg-warning"
                style={{ width: `${(results.totalInterest / results.totalPaid) * 100}%` }}
                title="Interest"
              />
            </div>
            <div className="mt-1 flex justify-between text-xs text-ink-500">
              <span>
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-brand-500" />
                Principal: {formatCurrency(results.principal)}
              </span>
              <span>
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-warning" />
                Interest: {formatCurrency(results.totalInterest)}
              </span>
            </div>
          </div>

          {/* Amortization Toggle */}
          <div className="mt-6">
            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="text-sm font-medium text-brand-600 hover:text-brand-800"
            >
              {showAmortization ? "Hide" : "Show"} Amortization Schedule
            </button>

            {showAmortization && (
              <div className="mt-4 max-h-96 overflow-auto rounded-lg border border-ink-200">
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
                    {results.schedule.filter((_, i) => i % 12 === 0 || i === results.schedule.length - 1).map((row) => (
                      <tr key={row.month} className="border-t border-ink-100">
                        <td className="px-3 py-2 text-ink-700">{row.month}</td>
                        <td className="px-3 py-2 text-right text-ink-700">{formatCurrencyExact(row.payment)}</td>
                        <td className="px-3 py-2 text-right text-ink-700">{formatCurrencyExact(row.principal)}</td>
                        <td className="px-3 py-2 text-right text-ink-700">{formatCurrencyExact(row.interest)}</td>
                        <td className="px-3 py-2 text-right text-ink-700">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
