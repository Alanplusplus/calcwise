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

export function HomeAffordabilityCalculator({ defaults }: Props) {
  const [annualIncome, setAnnualIncome] = useState(defaults?.annualIncome || "75000");
  const [monthlyDebts, setMonthlyDebts] = useState(defaults?.monthlyDebts || "500");
  const [downPayment, setDownPayment] = useState(defaults?.downPayment || "40000");
  const [interestRate, setInterestRate] = useState(defaults?.interestRate || "6.75");
  const [loanTerm, setLoanTerm] = useState(defaults?.loanTerm || "30");
  const [propertyTaxRate, setPropertyTaxRate] = useState(defaults?.propertyTaxRate || "1.2");
  const [homeownersInsurance, setHomeownersInsurance] = useState(defaults?.homeownersInsurance || "1500");

  const results = useMemo(() => {
    const income = parseFloat(annualIncome) || 0;
    const debts = parseFloat(monthlyDebts) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseInt(loanTerm) || 30;
    const taxRate = parseFloat(propertyTaxRate) || 0;
    const insuranceAnnual = parseFloat(homeownersInsurance) || 0;

    if (income <= 0 || rate <= 0) return null;

    const monthlyGross = income / 12;
    const maxHousing28 = monthlyGross * 0.28;
    const maxTotalDebt36 = monthlyGross * 0.36;
    const availableFrom36 = maxTotalDebt36 - debts;
    const maxHousing = Math.min(maxHousing28, availableFrom36);

    if (maxHousing <= 0) return null;

    const monthlyRate = rate / 100 / 12;
    const n = years * 12;
    const monthlyInsurance = insuranceAnnual / 12;
    const taxRateMonthly = taxRate / 100 / 12;

    const factor =
      (Math.pow(1 + monthlyRate, n) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, n));

    const maxHomePrice =
      (maxHousing + down / factor - monthlyInsurance) / (1 / factor + taxRateMonthly);
    const maxLoan = Math.max(0, maxHomePrice - down);

    const monthlyTax = maxHomePrice * taxRateMonthly;
    const monthlyPI =
      maxLoan > 0
        ? (maxLoan * monthlyRate * Math.pow(1 + monthlyRate, n)) /
          (Math.pow(1 + monthlyRate, n) - 1)
        : 0;

    const totalMonthlyHousing = monthlyPI + monthlyTax + monthlyInsurance;
    const frontEndDTI = (totalMonthlyHousing / monthlyGross) * 100;
    const backEndDTI = ((totalMonthlyHousing + debts) / monthlyGross) * 100;

    return {
      maxHomePrice,
      maxLoan,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      totalMonthlyHousing,
      frontEndDTI,
      backEndDTI,
      maxHousing28,
      availableFrom36,
      constrainingRule: maxHousing28 <= availableFrom36 ? "28% rule" : "36% rule",
    };
  }, [
    annualIncome,
    monthlyDebts,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxRate,
    homeownersInsurance,
  ]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField
          label="Annual Gross Income"
          id="annualIncome"
          value={annualIncome}
          onChange={setAnnualIncome}
          prefix="$"
          min={0}
          step={1000}
        />
        <InputField
          label="Monthly Debt Payments"
          id="monthlyDebts"
          value={monthlyDebts}
          onChange={setMonthlyDebts}
          prefix="$"
          min={0}
          step={50}
          helpText="Car loans, student loans, credit cards, etc."
        />
        <InputField
          label="Down Payment Saved"
          id="downPayment"
          value={downPayment}
          onChange={setDownPayment}
          prefix="$"
          min={0}
          step={1000}
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
          label="Property Tax Rate"
          id="propertyTaxRate"
          value={propertyTaxRate}
          onChange={setPropertyTaxRate}
          suffix="%"
          min={0}
          max={10}
          step={0.1}
          helpText="Annual rate as a percentage of home value"
        />
        <InputField
          label="Homeowners Insurance"
          id="homeownersInsurance"
          value={homeownersInsurance}
          onChange={setHomeownersInsurance}
          prefix="$"
          min={0}
          step={100}
          helpText="Estimated annual premium"
        />
      </div>

      {results ? (
        <div className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-brand-50 p-6 text-center">
              <p className="text-sm font-medium text-brand-700">Maximum Home Price</p>
              <p className="mt-1 text-3xl font-bold text-brand-900">
                {formatCurrency(results.maxHomePrice)}
              </p>
              <p className="mt-2 text-xs text-brand-600">
                Limited by the {results.constrainingRule}
              </p>
            </div>
            <div className="rounded-lg bg-accent-50 p-6 text-center">
              <p className="text-sm font-medium text-accent-700">Maximum Loan Amount</p>
              <p className="mt-1 text-3xl font-bold text-accent-900">
                {formatCurrency(results.maxLoan)}
              </p>
              <p className="mt-2 text-xs text-accent-600">
                After your {formatCurrency(parseFloat(downPayment) || 0)} down payment
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-ink-200 p-5">
            <p className="text-sm font-medium text-ink-700">Estimated Monthly Payment Breakdown</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-600">Principal &amp; Interest</span>
                <span className="font-medium text-ink-900">{formatCurrencyExact(results.monthlyPI)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-600">Property Taxes</span>
                <span className="font-medium text-ink-900">{formatCurrencyExact(results.monthlyTax)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-600">Homeowners Insurance</span>
                <span className="font-medium text-ink-900">{formatCurrencyExact(results.monthlyInsurance)}</span>
              </div>
              <div className="border-t border-ink-200 pt-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink-700">Total Housing Payment</span>
                <span className="font-bold text-ink-900">{formatCurrencyExact(results.totalMonthlyHousing)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Front-End DTI</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">
                {results.frontEndDTI.toFixed(1)}%
              </p>
              <p className="mt-1 text-xs text-ink-500">Housing costs / gross income</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Back-End DTI</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">
                {results.backEndDTI.toFixed(1)}%
              </p>
              <p className="mt-1 text-xs text-ink-500">All debts / gross income</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-lg bg-amber-50 p-4 text-center text-sm text-amber-800">
          Enter valid income and interest rate values. If your existing debts exceed 36% of gross
          income, you may not qualify for additional housing debt under standard guidelines.
        </div>
      )}
    </div>
  );
}
