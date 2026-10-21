"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";
import { Sources } from "@/components/Sources";
import { G19_CREDIT_CARD_APR } from "@/lib/market-data";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
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

interface PayoffResult {
  months: number;
  totalInterest: number;
  totalCost: number;
  capped?: boolean;
  remainingBalance?: number;
}

function simulatePayoff(
  startingBalance: number,
  monthlyRate: number,
  getPayment: (balance: number) => number,
  maxMonths = 600
): PayoffResult | { error: string } {
  let balance = startingBalance;
  let months = 0;
  let totalInterest = 0;

  while (balance > 0 && months < maxMonths) {
    const interest = balance * monthlyRate;
    const payment = getPayment(balance);

    if (payment <= interest) {
      return { error: "Payment is too low to cover monthly interest. Increase your payment amount." };
    }

    totalInterest += interest;
    const principal = Math.min(payment - interest, balance);
    balance -= principal;
    months++;

    if (balance < 0.01) balance = 0;
  }

  if (balance > 0) {
    return {
      months,
      totalInterest,
      totalCost: startingBalance + totalInterest,
      capped: true,
      remainingBalance: balance,
    };
  }

  return {
    months,
    totalInterest,
    totalCost: startingBalance + totalInterest,
  };
}

function buildSchedule(
  startingBalance: number,
  monthlyRate: number,
  fixedPayment: number,
  maxRows = 12
): MonthRow[] {
  const rows: MonthRow[] = [];
  let balance = startingBalance;

  for (let month = 1; month <= maxRows && balance > 0; month++) {
    const interest = balance * monthlyRate;
    const payment = Math.min(fixedPayment, balance + interest);
    const principal = Math.min(payment - interest, balance);
    balance -= principal;

    rows.push({
      month,
      payment,
      interest,
      principal,
      balance: Math.max(0, balance),
    });

    if (balance < 0.01) balance = 0;
  }

  return rows;
}

interface Props {
  defaults?: Record<string, string>;
}

export function CreditCardPayoffCalculator({ defaults }: Props) {
  const [balance, setBalance] = useState(defaults?.balance || "8000");
  const [interestRate, setInterestRate] = useState(
    defaults?.interestRate || String(G19_CREDIT_CARD_APR.assessedInterest)
  );
  const [minPercent, setMinPercent] = useState(defaults?.minPercent || "2");
  const [fixedPayment, setFixedPayment] = useState(defaults?.fixedPayment || "250");

  const results = useMemo(() => {
    const bal = parseFloat(balance) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100;
    const minPct = parseFloat(minPercent) || 0;
    const fixed = parseFloat(fixedPayment) || 0;

    if (bal <= 0) return null;

    const monthlyRate = rate / 12;

    const minimumResult = simulatePayoff(bal, monthlyRate, (currentBalance) =>
      Math.max(currentBalance * (minPct / 100), 25)
    );

    if ("error" in minimumResult) {
      return { error: minimumResult.error };
    }

    if (fixed <= 0) {
      return { error: "Enter a fixed monthly payment greater than zero." };
    }

    const fixedResult = simulatePayoff(bal, monthlyRate, () => fixed);

    if ("error" in fixedResult) {
      return { error: fixedResult.error };
    }

    const interestSavings = minimumResult.totalInterest - fixedResult.totalInterest;
    const monthsSaved = minimumResult.months - fixedResult.months;
    const schedule = buildSchedule(bal, monthlyRate, fixed);

    return {
      minimum: minimumResult,
      fixed: fixedResult,
      interestSavings,
      monthsSaved,
      schedule,
    };
  }, [balance, interestRate, minPercent, fixedPayment]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Credit Card Balance"
          id="balance"
          value={balance}
          onChange={setBalance}
          prefix="$"
          min={0}
        />
        <InputField
          label="Annual Interest Rate (APR)"
          id="interestRate"
          value={interestRate}
          onChange={setInterestRate}
          suffix="%"
          min={0}
          max={40}
          step={0.1}
        />
        <InputField
          label="Minimum Payment Percentage"
          id="minPercent"
          value={minPercent}
          onChange={setMinPercent}
          suffix="%"
          min={0}
          max={10}
          step={0.1}
          helpText="Typical issuer formula: 2% of balance or $25 floor, whichever is greater (this calculator uses that model)"
        />
        <InputField
          label="Fixed Monthly Payment"
          id="fixedPayment"
          value={fixedPayment}
          onChange={setFixedPayment}
          prefix="$"
          min={0}
          helpText="The amount you plan to pay each month"
        />
      </div>

      {results && (
        <div className="mt-8">
          {"error" in results ? (
            <div className="rounded-lg bg-red-50 p-4 text-red-800">{results.error}</div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
                  <p className="text-sm font-medium text-brand-700">Fixed Payment Payoff</p>
                  <p className="mt-2 text-xl font-bold text-brand-800">
                    {results.fixed.months} months
                  </p>
                  <p className="mt-1 text-sm text-brand-700">
                    Total interest: {formatCurrency(results.fixed.totalInterest)}
                  </p>
                  <p className="text-sm text-brand-700">
                    Total cost: {formatCurrency(results.fixed.totalCost)}
                  </p>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-700">Minimum Payment Payoff</p>
                  <p className="mt-2 text-xl font-bold text-red-800">
                    {results.minimum.capped
                      ? `${results.minimum.months}+ months`
                      : `${results.minimum.months} months`}
                  </p>
                  {results.minimum.capped && results.minimum.remainingBalance != null && (
                    <p className="mt-1 text-sm text-red-700">
                      Still owes {formatCurrency(results.minimum.remainingBalance)} after 50 years at this
                      payment level
                    </p>
                  )}
                  <p className="mt-1 text-sm text-red-700">
                    Interest in that period: {formatCurrency(results.minimum.totalInterest)}
                  </p>
                  <p className="text-sm text-red-700">
                    Payments + remaining balance: {formatCurrency(results.minimum.totalCost +
                      (results.minimum.remainingBalance ?? 0))}
                  </p>
                </div>
              </div>

              <Sources
                items={[...G19_CREDIT_CARD_APR.sources]}
                checked={G19_CREDIT_CARD_APR.checkedLabel}
                note={`Default APR is the G.19 “accounts assessed interest” series (${G19_CREDIT_CARD_APR.assessedInterest}%), not the ${G19_CREDIT_CARD_APR.allAccounts}% average across all accounts (${G19_CREDIT_CARD_APR.asOfLabel}). Minimum payments follow 2% of balance or $25, whichever is greater.`}
              />

              <div className="mt-4 rounded-lg bg-green-50 p-4">
                <p className="font-semibold text-green-800">
                  By paying {formatCurrencyExact(parseFloat(fixedPayment) || 0)} instead of
                  minimum payments, you'd save {formatCurrencyExact(results.interestSavings)}{" "}
                  in interest and be debt-free {results.monthsSaved} months sooner.
                </p>
              </div>

              {results.schedule.length > 0 && (
                <div className="mt-6 overflow-x-auto">
                  <h3 className="mb-3 text-sm font-semibold text-ink-700">
                    Fixed Payment Breakdown (First 12 Months)
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
