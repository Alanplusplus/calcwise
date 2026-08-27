"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function formatCurrencyExact(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}

interface MonthRow {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

function calcMonthlyPayment(principal: number, monthlyRate: number, termMonths: number): number {
  if (termMonths <= 0) return 0;
  if (monthlyRate === 0) return principal / termMonths;
  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (principal * monthlyRate * factor) / (factor - 1);
}

function simulatePayoff(
  principal: number,
  monthlyRate: number,
  monthlyPayment: number,
  maxMonths = 600
): { months: number; totalInterest: number; totalCost: number } {
  let balance = principal;
  let months = 0;
  let totalInterest = 0;

  while (balance > 0 && months < maxMonths) {
    const interest = balance * monthlyRate;
    const payment = Math.min(monthlyPayment, balance + interest);
    totalInterest += interest;
    const principalPaid = Math.min(payment - interest, balance);
    balance -= principalPaid;
    months++;
    if (balance < 0.01) balance = 0;
  }

  return {
    months,
    totalInterest,
    totalCost: principal + totalInterest,
  };
}

function buildSchedule(
  principal: number,
  monthlyRate: number,
  monthlyPayment: number,
  maxRows = 12
): MonthRow[] {
  const rows: MonthRow[] = [];
  let balance = principal;

  for (let month = 1; month <= maxRows && balance > 0; month++) {
    const interest = balance * monthlyRate;
    const payment = Math.min(monthlyPayment, balance + interest);
    const principalPaid = Math.min(payment - interest, balance);
    balance -= principalPaid;

    rows.push({
      month,
      payment,
      interest,
      principal: principalPaid,
      balance: Math.max(0, balance),
    });

    if (balance < 0.01) balance = 0;
  }

  return rows;
}

function formatPayoffDate(monthsFromNow: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsFromNow);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

interface Props {
  defaults?: Record<string, string>;
}

export function StudentLoanCalculator({ defaults }: Props) {
  const [balance, setBalance] = useState(defaults?.balance || "35000");
  const [interestRate, setInterestRate] = useState(defaults?.interestRate || "5.5");
  const [termYears, setTermYears] = useState(defaults?.termYears || "10");
  const [extraPayment, setExtraPayment] = useState(defaults?.extraPayment || "0");

  const results = useMemo(() => {
    const principal = parseFloat(balance) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100;
    const years = parseFloat(termYears) || 0;
    const extra = parseFloat(extraPayment) || 0;

    if (principal <= 0) return null;
    if (years <= 0) return { error: "Enter a loan term greater than zero years." };

    const termMonths = Math.round(years * 12);
    const monthlyRate = rate / 12;
    const monthlyPayment = calcMonthlyPayment(principal, monthlyRate, termMonths);

    const standard = simulatePayoff(principal, monthlyRate, monthlyPayment);
    const schedule = buildSchedule(
      principal,
      monthlyRate,
      monthlyPayment + extra
    );

    const payoffDate = formatPayoffDate(standard.months);

    if (extra > 0) {
      const accelerated = simulatePayoff(principal, monthlyRate, monthlyPayment + extra);
      const monthsSaved = standard.months - accelerated.months;
      const interestSaved = standard.totalInterest - accelerated.totalInterest;
      const acceleratedPayoffDate = formatPayoffDate(accelerated.months);

      return {
        monthlyPayment,
        totalInterest: standard.totalInterest,
        totalCost: standard.totalCost,
        payoffDate,
        termMonths,
        schedule,
        extra,
        accelerated: {
          months: accelerated.months,
          totalInterest: accelerated.totalInterest,
          totalCost: accelerated.totalCost,
          payoffDate: acceleratedPayoffDate,
          monthsSaved,
          interestSaved,
        },
      };
    }

    return {
      monthlyPayment,
      totalInterest: standard.totalInterest,
      totalCost: standard.totalCost,
      payoffDate,
      termMonths,
      schedule,
      extra: 0,
    };
  }, [balance, interestRate, termYears, extraPayment]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Loan Balance"
          id="balance"
          value={balance}
          onChange={setBalance}
          prefix="$"
          min={0}
        />
        <InputField
          label="Annual Interest Rate"
          id="interestRate"
          value={interestRate}
          onChange={setInterestRate}
          suffix="%"
          min={0}
          max={30}
          step={0.1}
        />
        <InputField
          label="Loan Term"
          id="termYears"
          value={termYears}
          onChange={setTermYears}
          suffix="years"
          min={1}
          max={30}
          step={1}
        />
        <InputField
          label="Extra Monthly Payment"
          id="extraPayment"
          value={extraPayment}
          onChange={setExtraPayment}
          prefix="$"
          min={0}
          helpText="Additional amount applied to principal each month"
        />
      </div>

      {results && (
        <div className="mt-8">
          {"error" in results ? (
            <div className="rounded-lg bg-red-50 p-4 text-red-800">{results.error}</div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-accent-200 bg-accent-50 p-4">
                  <p className="text-sm font-medium text-accent-700">Monthly Payment</p>
                  <p className="mt-2 text-xl font-bold text-accent-900">
                    {formatCurrency(results.monthlyPayment)}
                  </p>
                  {results.extra > 0 && (
                    <p className="mt-1 text-sm text-accent-700">
                      With extra: {formatCurrency(results.monthlyPayment + results.extra)}
                    </p>
                  )}
                </div>
                <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
                  <p className="text-sm font-medium text-brand-700">Total Interest</p>
                  <p className="mt-2 text-xl font-bold text-brand-900">
                    {formatCurrency(results.totalInterest)}
                  </p>
                </div>
                <div className="rounded-lg bg-ink-100 p-4">
                  <p className="text-sm font-medium text-ink-600">Total Cost</p>
                  <p className="mt-2 text-xl font-bold text-ink-800">
                    {formatCurrency(results.totalCost)}
                  </p>
                </div>
                <div className="rounded-lg bg-ink-100 p-4">
                  <p className="text-sm font-medium text-ink-600">Payoff Date</p>
                  <p className="mt-2 text-xl font-bold text-ink-800">{results.payoffDate}</p>
                  <p className="mt-1 text-sm text-ink-600">
                    {results.termMonths} months
                  </p>
                </div>
              </div>

              {results.extra > 0 && "accelerated" in results && results.accelerated && (
                <div className="mt-4 rounded-lg border border-brand-200 bg-brand-50 p-4">
                  <p className="font-semibold text-brand-800">
                    By adding {formatCurrencyExact(results.extra)} per month, you&apos;d pay off
                    your loan {results.accelerated.monthsSaved} months sooner, save{" "}
                    {formatCurrencyExact(results.accelerated.interestSaved)} in interest, and
                    become debt-free by {results.accelerated.payoffDate}.
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3 text-sm text-brand-700">
                    <div>
                      <span className="font-medium">Accelerated payoff:</span>{" "}
                      {results.accelerated.months} months
                    </div>
                    <div>
                      <span className="font-medium">Accelerated interest:</span>{" "}
                      {formatCurrency(results.accelerated.totalInterest)}
                    </div>
                    <div>
                      <span className="font-medium">Accelerated total cost:</span>{" "}
                      {formatCurrency(results.accelerated.totalCost)}
                    </div>
                  </div>
                </div>
              )}

              {results.schedule.length > 0 && (
                <div className="mt-6 overflow-x-auto">
                  <h3 className="mb-3 text-sm font-semibold text-ink-700">
                    Amortization Schedule (First 12 Months)
                  </h3>
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-ink-200 text-ink-500">
                        <th className="py-2 pr-4 font-medium">Month</th>
                        <th className="py-2 pr-4 font-medium">Payment</th>
                        <th className="py-2 pr-4 font-medium">Interest</th>
                        <th className="py-2 pr-4 font-medium">Principal</th>
                        <th className="py-2 font-medium">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.schedule.map((row) => (
                        <tr key={row.month} className="border-b border-ink-100">
                          <td className="py-2 pr-4 text-ink-800">{row.month}</td>
                          <td className="py-2 pr-4 text-ink-800">{formatCurrencyExact(row.payment)}</td>
                          <td className="py-2 pr-4 text-red-700">{formatCurrencyExact(row.interest)}</td>
                          <td className="py-2 pr-4 text-green-700">{formatCurrencyExact(row.principal)}</td>
                          <td className="py-2 text-ink-800">{formatCurrencyExact(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
