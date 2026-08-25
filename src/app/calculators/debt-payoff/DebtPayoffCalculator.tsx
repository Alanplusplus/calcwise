"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatCurrencyExact(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}

interface Props {
  defaults?: Record<string, string>;
}

export function DebtPayoffCalculator({ defaults }: Props) {
  const [balance, setBalance] = useState(defaults?.balance || "15000");
  const [interestRate, setInterestRate] = useState(defaults?.interestRate || "18.9");
  const [monthlyPayment, setMonthlyPayment] = useState(defaults?.monthlyPayment || "400");
  const [extraPayment, setExtraPayment] = useState(defaults?.extraPayment || "100");

  const results = useMemo(() => {
    const bal = parseFloat(balance) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100;
    const payment = parseFloat(monthlyPayment) || 0;
    const extra = parseFloat(extraPayment) || 0;

    if (bal <= 0 || payment <= 0) return null;

    const monthlyRate = rate / 12;
    const minPaymentRequired = bal * monthlyRate;

    if (payment <= minPaymentRequired) {
      return { error: "Payment is too low to cover monthly interest. Increase your payment amount." };
    }

    // Without extra payment
    let balanceStd = bal;
    let monthsStd = 0;
    let totalInterestStd = 0;
    while (balanceStd > 0 && monthsStd < 600) {
      const interest = balanceStd * monthlyRate;
      totalInterestStd += interest;
      const principalPaid = Math.min(payment - interest, balanceStd);
      balanceStd -= principalPaid;
      monthsStd++;
      if (balanceStd < 0.01) balanceStd = 0;
    }

    // With extra payment
    let balanceExtra = bal;
    let monthsExtra = 0;
    let totalInterestExtra = 0;
    const totalPayment = payment + extra;
    while (balanceExtra > 0 && monthsExtra < 600) {
      const interest = balanceExtra * monthlyRate;
      totalInterestExtra += interest;
      const principalPaid = Math.min(totalPayment - interest, balanceExtra);
      balanceExtra -= principalPaid;
      monthsExtra++;
      if (balanceExtra < 0.01) balanceExtra = 0;
    }

    const savedInterest = totalInterestStd - totalInterestExtra;
    const savedMonths = monthsStd - monthsExtra;

    return {
      monthsStd,
      monthsExtra,
      totalInterestStd,
      totalInterestExtra,
      savedInterest,
      savedMonths,
      totalCostStd: bal + totalInterestStd,
      totalCostExtra: bal + totalInterestExtra,
      payoffDateStd: formatPayoffDate(monthsStd),
      payoffDateExtra: formatPayoffDate(monthsExtra),
    };
  }, [balance, interestRate, monthlyPayment, extraPayment]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Current Balance"
          id="balance"
          value={balance}
          onChange={setBalance}
          prefix="$"
          min={0}
        />
        <InputField
          label="Interest Rate (APR)"
          id="interestRate"
          value={interestRate}
          onChange={setInterestRate}
          suffix="%"
          min={0}
          max={40}
          step={0.1}
        />
        <InputField
          label="Monthly Payment"
          id="monthlyPayment"
          value={monthlyPayment}
          onChange={setMonthlyPayment}
          prefix="$"
          min={0}
          helpText="Your current monthly payment"
        />
        <InputField
          label="Extra Monthly Payment"
          id="extraPayment"
          value={extraPayment}
          onChange={setExtraPayment}
          prefix="$"
          min={0}
          helpText="Additional amount you could pay"
        />
      </div>

      {results && (
        <div className="mt-8">
          {"error" in results ? (
            <div className="rounded-lg bg-red-50 p-4 text-red-800">
              {results.error}
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-ink-200 p-4">
                  <p className="text-sm font-medium text-ink-500">Current Plan</p>
                  <p className="mt-2 text-xl font-bold text-ink-800">
                    {results.monthsStd} months
                  </p>
                  <p className="text-sm text-ink-500">
                    Debt-free by {results.payoffDateStd}
                  </p>
                  <p className="mt-2 text-sm text-ink-600">
                    Total interest: {formatCurrency(results.totalInterestStd)}
                  </p>
                </div>
                <div className="rounded-lg border-2 border-accent-500 bg-accent-50 p-4">
                  <p className="text-sm font-medium text-accent-700">With Extra Payment</p>
                  <p className="mt-2 text-xl font-bold text-accent-800">
                    {results.monthsExtra} months
                  </p>
                  <p className="text-sm text-accent-700">
                    Debt-free by {results.payoffDateExtra}
                  </p>
                  <p className="mt-2 text-sm text-accent-700">
                    Total interest: {formatCurrency(results.totalInterestExtra)}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-accent-50 p-4">
                <p className="font-semibold text-accent-800">
                  You&apos;d save {formatCurrencyExact(results.savedInterest)} in
                  interest and be debt-free {results.savedMonths} months sooner!
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function formatPayoffDate(months: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
