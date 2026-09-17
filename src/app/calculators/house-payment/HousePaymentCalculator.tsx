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

export function HousePaymentCalculator({ defaults }: Props) {
  const [homePrice, setHomePrice] = useState(defaults?.homePrice || "350000");
  const [downPayment, setDownPayment] = useState(defaults?.downPayment || "70000");
  const [loanTerm, setLoanTerm] = useState(defaults?.loanTerm || "30");
  const [interestRate, setInterestRate] = useState(defaults?.interestRate || "6.5");
  const [propertyTaxRate, setPropertyTaxRate] = useState(defaults?.propertyTaxRate || "1.1");
  const [homeInsurance, setHomeInsurance] = useState(defaults?.homeInsurance || "1800");
  const [pmiRate, setPmiRate] = useState(defaults?.pmiRate || "0.5");
  const [hoaFees, setHoaFees] = useState(defaults?.hoaFees || "0");

  const results = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const years = parseInt(loanTerm) || 30;
    const rate = parseFloat(interestRate) || 0;
    const taxRate = parseFloat(propertyTaxRate) || 0;
    const insurance = parseFloat(homeInsurance) || 0;
    const pmi = parseFloat(pmiRate) || 0;
    const hoa = parseFloat(hoaFees) || 0;

    const loanAmount = price - down;
    if (loanAmount <= 0 || rate <= 0) return null;

    const monthlyRate = rate / 100 / 12;
    const totalPayments = years * 12;

    const monthlyPI =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const monthlyTax = (price * (taxRate / 100)) / 12;
    const monthlyInsurance = insurance / 12;
    const downPercent = (down / price) * 100;
    const monthlyPMI = downPercent < 20 ? (loanAmount * (pmi / 100)) / 12 : 0;
    const monthlyHOA = hoa;

    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI + monthlyHOA;
    const totalPaid = totalMonthly * totalPayments;
    const totalInterest = monthlyPI * totalPayments - loanAmount;

    const yearlyBreakdown = [];
    let balance = loanAmount;
    for (let y = 1; y <= years; y++) {
      let yearInterest = 0;
      let yearPrincipal = 0;
      for (let m = 0; m < 12; m++) {
        const interestPortion = balance * monthlyRate;
        const principalPortion = monthlyPI - interestPortion;
        yearInterest += interestPortion;
        yearPrincipal += principalPortion;
        balance -= principalPortion;
      }
      yearlyBreakdown.push({
        year: y,
        principal: yearPrincipal,
        interest: yearInterest,
        tax: monthlyTax * 12,
        insurance: monthlyInsurance * 12,
        pmi: monthlyPMI * 12,
        hoa: monthlyHOA * 12,
        balance: Math.max(0, balance),
      });
    }

    return {
      loanAmount,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyPMI,
      monthlyHOA,
      totalMonthly,
      totalPaid,
      totalInterest,
      downPercent,
      yearlyBreakdown,
    };
  }, [homePrice, downPayment, loanTerm, interestRate, propertyTaxRate, homeInsurance, pmiRate, hoaFees]);

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

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InputField
          label="Property Tax Rate"
          id="propertyTaxRate"
          value={propertyTaxRate}
          onChange={setPropertyTaxRate}
          suffix="% / yr"
          min={0}
          max={10}
          step={0.1}
          helpText="Annual rate as % of home value"
        />
        <InputField
          label="Home Insurance"
          id="homeInsurance"
          value={homeInsurance}
          onChange={setHomeInsurance}
          prefix="$"
          suffix="/ yr"
          min={0}
          step={100}
          helpText="Annual homeowners insurance"
        />
        <InputField
          label="PMI Rate"
          id="pmiRate"
          value={pmiRate}
          onChange={setPmiRate}
          suffix="% / yr"
          min={0}
          max={5}
          step={0.1}
          helpText="Required if down payment < 20%"
        />
        <InputField
          label="HOA Fees"
          id="hoaFees"
          value={hoaFees}
          onChange={setHoaFees}
          prefix="$"
          suffix="/ mo"
          min={0}
          step={25}
          helpText="Monthly HOA dues (if any)"
        />
      </div>

      {results && (
        <div className="mt-8">
          {/* Total Monthly Payment */}
          <div className="rounded-lg bg-brand-50 p-5 text-center">
            <p className="text-sm font-medium text-brand-700">Total Monthly House Payment</p>
            <p className="mt-1 text-3xl font-bold text-brand-900">
              {formatCurrencyExact(results.totalMonthly)}
            </p>
          </div>

          {/* Payment Breakdown */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">Principal & Interest</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrencyExact(results.monthlyPI)}</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">Property Tax</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrencyExact(results.monthlyTax)}</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">Insurance</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrencyExact(results.monthlyInsurance)}</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">PMI</p>
              <p className="mt-1 text-lg font-bold text-ink-800">
                {results.monthlyPMI > 0 ? formatCurrencyExact(results.monthlyPMI) : "N/A"}
              </p>
              {results.downPercent >= 20 && (
                <p className="mt-0.5 text-xs text-green-600">No PMI needed</p>
              )}
            </div>
            <div className="rounded-lg bg-ink-100 p-3 text-center">
              <p className="text-xs font-medium text-ink-500">HOA</p>
              <p className="mt-1 text-lg font-bold text-ink-800">
                {results.monthlyHOA > 0 ? formatCurrencyExact(results.monthlyHOA) : "N/A"}
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-sm font-medium text-accent-700">Loan Amount</p>
              <p className="mt-1 text-xl font-bold text-accent-900">{formatCurrency(results.loanAmount)}</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Total Interest</p>
              <p className="mt-1 text-xl font-bold text-ink-800">{formatCurrency(results.totalInterest)}</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Total Cost Over Loan Life</p>
              <p className="mt-1 text-xl font-bold text-ink-800">{formatCurrency(results.totalPaid)}</p>
            </div>
          </div>

          {/* Payment Breakdown Bar */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink-700">Monthly Payment Breakdown</p>
            <div className="mt-2 flex h-5 overflow-hidden rounded-full">
              <div
                className="bg-brand-500"
                style={{ width: `${(results.monthlyPI / results.totalMonthly) * 100}%` }}
                title="Principal & Interest"
              />
              <div
                className="bg-amber-400"
                style={{ width: `${(results.monthlyTax / results.totalMonthly) * 100}%` }}
                title="Property Tax"
              />
              <div
                className="bg-emerald-400"
                style={{ width: `${(results.monthlyInsurance / results.totalMonthly) * 100}%` }}
                title="Insurance"
              />
              {results.monthlyPMI > 0 && (
                <div
                  className="bg-rose-400"
                  style={{ width: `${(results.monthlyPMI / results.totalMonthly) * 100}%` }}
                  title="PMI"
                />
              )}
              {results.monthlyHOA > 0 && (
                <div
                  className="bg-purple-400"
                  style={{ width: `${(results.monthlyHOA / results.totalMonthly) * 100}%` }}
                  title="HOA"
                />
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-500">
              <span>
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-brand-500" />
                P&I: {formatCurrencyExact(results.monthlyPI)}
              </span>
              <span>
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-400" />
                Tax: {formatCurrencyExact(results.monthlyTax)}
              </span>
              <span>
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                Insurance: {formatCurrencyExact(results.monthlyInsurance)}
              </span>
              {results.monthlyPMI > 0 && (
                <span>
                  <span className="mr-1 inline-block h-2 w-2 rounded-full bg-rose-400" />
                  PMI: {formatCurrencyExact(results.monthlyPMI)}
                </span>
              )}
              {results.monthlyHOA > 0 && (
                <span>
                  <span className="mr-1 inline-block h-2 w-2 rounded-full bg-purple-400" />
                  HOA: {formatCurrencyExact(results.monthlyHOA)}
                </span>
              )}
            </div>
          </div>

          {/* Yearly Breakdown Table */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink-700">Annual Cost Breakdown</p>
            <div className="mt-2 max-h-96 overflow-auto rounded-lg border border-ink-200">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-ink-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-ink-600">Year</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Principal</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Interest</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Tax</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Insurance</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="border-t border-ink-100">
                      <td className="px-3 py-2 text-ink-700">{row.year}</td>
                      <td className="px-3 py-2 text-right text-ink-700">{formatCurrency(row.principal)}</td>
                      <td className="px-3 py-2 text-right text-ink-700">{formatCurrency(row.interest)}</td>
                      <td className="px-3 py-2 text-right text-ink-700">{formatCurrency(row.tax)}</td>
                      <td className="px-3 py-2 text-right text-ink-700">{formatCurrency(row.insurance)}</td>
                      <td className="px-3 py-2 text-right text-ink-700">{formatCurrency(row.balance)}</td>
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
