"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function calcMonthlyPayment(principal: number, annualRate: number, termMonths: number): number {
  if (principal <= 0 || termMonths <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / termMonths;
  return (principal * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
}

interface Props {
  defaults?: Record<string, string>;
}

export function LeaseVsBuyCarCalculator({ defaults }: Props) {
  const [vehiclePrice, setVehiclePrice] = useState(defaults?.vehiclePrice || "35000");
  const [downPayment, setDownPayment] = useState(defaults?.downPayment || "5000");
  const [tradeIn, setTradeIn] = useState(defaults?.tradeIn || "0");
  const [salesTaxRate, setSalesTaxRate] = useState(defaults?.salesTaxRate || "7");
  const [buyRate, setBuyRate] = useState(defaults?.buyRate || "6.5");
  const [buyTerm, setBuyTerm] = useState(defaults?.buyTerm || "60");
  const [leaseMonthlyPayment, setLeaseMonthlyPayment] = useState(defaults?.leaseMonthlyPayment || "350");
  const [leaseDownPayment, setLeaseDownPayment] = useState(defaults?.leaseDownPayment || "2000");
  const [leaseTerm, setLeaseTerm] = useState(defaults?.leaseTerm || "36");
  const [residualPct, setResidualPct] = useState(defaults?.residualPct || "55");
  const [annualDepreciation, setAnnualDepreciation] = useState(defaults?.annualDepreciation || "15");
  const [annualInsuranceBuy, setAnnualInsuranceBuy] = useState(defaults?.annualInsuranceBuy || "1800");
  const [annualInsuranceLease, setAnnualInsuranceLease] = useState(defaults?.annualInsuranceLease || "2100");
  const [annualMaintenance, setAnnualMaintenance] = useState(defaults?.annualMaintenance || "600");
  const [yearsToCompare, setYearsToCompare] = useState(defaults?.yearsToCompare || "5");

  const results = useMemo(() => {
    const price = parseFloat(vehiclePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeIn) || 0;
    const taxRate = (parseFloat(salesTaxRate) || 0) / 100;
    const bRate = parseFloat(buyRate) || 0;
    const bTerm = parseInt(buyTerm) || 60;
    const leasePayment = parseFloat(leaseMonthlyPayment) || 0;
    const leaseDown = parseFloat(leaseDownPayment) || 0;
    const lTerm = parseInt(leaseTerm) || 36;
    const residual = (parseFloat(residualPct) || 0) / 100;
    const deprecRate = (parseFloat(annualDepreciation) || 0) / 100;
    const insLease = parseFloat(annualInsuranceLease) || 0;
    const insBuy = parseFloat(annualInsuranceBuy) || 0;
    const maint = parseFloat(annualMaintenance) || 0;
    const years = parseInt(yearsToCompare) || 5;

    if (price <= 0) return null;

    const salesTax = price * taxRate;
    const loanAmount = price + salesTax - down - trade;
    const monthlyBuyPayment = calcMonthlyPayment(Math.max(0, loanAmount), bRate, bTerm);
    const totalBuyPayments = monthlyBuyPayment * bTerm;
    const totalBuyInterest = totalBuyPayments - Math.max(0, loanAmount);

    const comparisonMonths = years * 12;
    const leaseRounds = Math.ceil(comparisonMonths / lTerm);
    const totalLeasePayments = leasePayment * comparisonMonths;
    const totalLeaseDown = leaseDown * leaseRounds;
    const totalLeaseSalesTax = leasePayment * taxRate * comparisonMonths;

    const totalLeaseInsurance = (insLease / 12) * comparisonMonths;
    const totalBuyInsurance = (insBuy / 12) * comparisonMonths;
    const totalMaintenance = (maint / 12) * comparisonMonths;

    const carValueAtEnd = price * Math.pow(1 - deprecRate, years);
    const residualValue = price * residual;

    const totalLeaseCost =
      totalLeaseDown + totalLeasePayments + totalLeaseSalesTax + totalLeaseInsurance + totalMaintenance;

    const buyMonthsOfPayments = Math.min(comparisonMonths, bTerm);
    const totalBuyLoanPayments = monthlyBuyPayment * buyMonthsOfPayments;
    const totalBuyCost =
      down + trade + salesTax + totalBuyLoanPayments + totalBuyInsurance + totalMaintenance - carValueAtEnd;

    const netBuyCost = totalBuyCost;
    const netLeaseCost = totalLeaseCost;
    const savings = Math.abs(netBuyCost - netLeaseCost);
    const winner = netBuyCost < netLeaseCost ? "buy" : netLeaseCost < netBuyCost ? "lease" : "tie";

    const yearByYear: {
      year: number;
      buyRunning: number;
      leaseRunning: number;
      equity: number;
    }[] = [];

    for (let y = 1; y <= years; y++) {
      const months = y * 12;
      const buyPaymentsToDate = monthlyBuyPayment * Math.min(months, bTerm);
      const buyInsToDate = (insBuy / 12) * months;
      const buyMaintToDate = (maint / 12) * months;
      const carVal = price * Math.pow(1 - deprecRate, y);
      const buyEquity = carVal;
      const buyTotal = down + trade + salesTax + buyPaymentsToDate + buyInsToDate + buyMaintToDate - buyEquity;

      const leaseRoundsToDate = Math.ceil(months / lTerm);
      const leaseDownToDate = leaseDown * leaseRoundsToDate;
      const leasePayToDate = leasePayment * months;
      const leaseTaxToDate = leasePayment * taxRate * months;
      const leaseInsToDate = (insLease / 12) * months;
      const leaseMaintToDate = (maint / 12) * months;
      const leaseTotal = leaseDownToDate + leasePayToDate + leaseTaxToDate + leaseInsToDate + leaseMaintToDate;

      yearByYear.push({
        year: y,
        buyRunning: buyTotal,
        leaseRunning: leaseTotal,
        equity: buyEquity,
      });
    }

    return {
      monthlyBuyPayment,
      totalBuyInterest,
      totalBuyPayments: totalBuyLoanPayments,
      leasePayment,
      totalLeasePayments,
      totalLeaseDown,
      totalLeaseSalesTax,
      totalLeaseInsurance,
      totalBuyInsurance,
      totalMaintenance,
      carValueAtEnd,
      residualValue,
      netBuyCost,
      netLeaseCost,
      savings,
      winner,
      years,
      loanAmount: Math.max(0, loanAmount),
      salesTax,
      down,
      trade,
      yearByYear,
      leaseRounds,
      lTerm,
      bTerm,
    };
  }, [
    vehiclePrice, downPayment, tradeIn, salesTaxRate, buyRate, buyTerm,
    leaseMonthlyPayment, leaseDownPayment, leaseTerm, residualPct,
    annualDepreciation, annualInsuranceBuy, annualInsuranceLease,
    annualMaintenance, yearsToCompare,
  ]);

  return (
    <div>
      {/* Buy Inputs */}
      <p className="text-sm font-semibold text-ink-700">Purchase Details</p>
      <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField label="Vehicle Price (MSRP)" id="vehiclePrice" value={vehiclePrice} onChange={setVehiclePrice} prefix="$" min={0} step={1000} />
        <InputField label="Down Payment (Buy)" id="downPayment" value={downPayment} onChange={setDownPayment} prefix="$" min={0} step={500} />
        <InputField label="Trade-in Value" id="tradeIn" value={tradeIn} onChange={setTradeIn} prefix="$" min={0} step={500} />
        <InputField label="Sales Tax Rate" id="salesTaxRate" value={salesTaxRate} onChange={setSalesTaxRate} suffix="%" min={0} max={15} step={0.25} />
        <InputField label="Loan Interest Rate (APR)" id="buyRate" value={buyRate} onChange={setBuyRate} suffix="%" min={0} max={25} step={0.1} />
        <div>
          <label htmlFor="buyTerm" className="block text-sm font-medium text-ink-700">Loan Term</label>
          <select id="buyTerm" value={buyTerm} onChange={(e) => setBuyTerm(e.target.value)} className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
            <option value="36">36 months (3 years)</option>
            <option value="48">48 months (4 years)</option>
            <option value="60">60 months (5 years)</option>
            <option value="72">72 months (6 years)</option>
          </select>
        </div>
      </div>

      {/* Lease Inputs */}
      <p className="mt-6 text-sm font-semibold text-ink-700">Lease Details</p>
      <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField label="Monthly Lease Payment" id="leaseMonthlyPayment" value={leaseMonthlyPayment} onChange={setLeaseMonthlyPayment} prefix="$" min={0} step={25} />
        <InputField label="Lease Due at Signing" id="leaseDownPayment" value={leaseDownPayment} onChange={setLeaseDownPayment} prefix="$" min={0} step={500} helpText="First payment + fees + security deposit" />
        <div>
          <label htmlFor="leaseTerm" className="block text-sm font-medium text-ink-700">Lease Term</label>
          <select id="leaseTerm" value={leaseTerm} onChange={(e) => setLeaseTerm(e.target.value)} className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
            <option value="24">24 months (2 years)</option>
            <option value="36">36 months (3 years)</option>
            <option value="39">39 months</option>
            <option value="48">48 months (4 years)</option>
          </select>
        </div>
        <InputField label="Residual Value" id="residualPct" value={residualPct} onChange={setResidualPct} suffix="%" min={20} max={80} step={1} helpText="Percentage of MSRP at lease end" />
      </div>

      {/* Shared Inputs */}
      <p className="mt-6 text-sm font-semibold text-ink-700">Ownership Costs & Comparison Period</p>
      <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InputField label="Annual Depreciation Rate" id="annualDepreciation" value={annualDepreciation} onChange={setAnnualDepreciation} suffix="%" min={0} max={40} step={1} helpText="Average ~15% per year" />
        <InputField label="Annual Insurance (Buy)" id="annualInsuranceBuy" value={annualInsuranceBuy} onChange={setAnnualInsuranceBuy} prefix="$" min={0} step={100} />
        <InputField label="Annual Insurance (Lease)" id="annualInsuranceLease" value={annualInsuranceLease} onChange={setAnnualInsuranceLease} prefix="$" min={0} step={100} helpText="Lease often requires more coverage" />
        <InputField label="Annual Maintenance" id="annualMaintenance" value={annualMaintenance} onChange={setAnnualMaintenance} prefix="$" min={0} step={100} />
        <div>
          <label htmlFor="yearsToCompare" className="block text-sm font-medium text-ink-700">Comparison Period</label>
          <select id="yearsToCompare" value={yearsToCompare} onChange={(e) => setYearsToCompare(e.target.value)} className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2.5 text-ink-900 shadow-input focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
            <option value="3">3 years</option>
            <option value="4">4 years</option>
            <option value="5">5 years</option>
            <option value="6">6 years</option>
            <option value="7">7 years</option>
          </select>
        </div>
      </div>

      {results ? (
        <div className="mt-8">
          {/* Verdict */}
          <div className={`rounded-lg p-6 text-center ${results.winner === "buy" ? "bg-brand-50" : results.winner === "lease" ? "bg-accent-50" : "bg-ink-100"}`}>
            <p className={`text-sm font-medium ${results.winner === "buy" ? "text-brand-700" : results.winner === "lease" ? "text-accent-700" : "text-ink-600"}`}>
              {results.winner === "tie" ? "It's a Tie" : `${results.winner === "buy" ? "Buying" : "Leasing"} Saves You More`}
            </p>
            <p className={`mt-1 text-3xl font-bold ${results.winner === "buy" ? "text-brand-900" : results.winner === "lease" ? "text-accent-900" : "text-ink-800"}`}>
              {results.winner === "tie" ? "Equal Cost" : `${formatCurrency(results.savings)} savings`}
            </p>
            <p className={`mt-2 text-sm ${results.winner === "buy" ? "text-brand-600" : results.winner === "lease" ? "text-accent-600" : "text-ink-500"}`}>
              Over {results.years} years of vehicle ownership
            </p>
          </div>

          {/* Side-by-Side Summary */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-brand-50 p-5">
              <p className="text-sm font-semibold text-brand-700">Buy Total Cost</p>
              <p className="mt-1 text-2xl font-bold text-brand-900">{formatCurrency(results.netBuyCost)}</p>
              <div className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-brand-600">Monthly Payment</span><span className="font-medium text-brand-800">{formatCurrency(results.monthlyBuyPayment)}/mo</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Down + Trade-in</span><span className="font-medium text-brand-800">{formatCurrency(results.down + results.trade)}</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Sales Tax</span><span className="font-medium text-brand-800">{formatCurrency(results.salesTax)}</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Total Loan Payments</span><span className="font-medium text-brand-800">{formatCurrency(results.totalBuyPayments)}</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Interest Paid</span><span className="font-medium text-brand-800">{formatCurrency(results.totalBuyInterest)}</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Insurance ({results.years} yr)</span><span className="font-medium text-brand-800">{formatCurrency(results.totalBuyInsurance)}</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Maintenance ({results.years} yr)</span><span className="font-medium text-brand-800">{formatCurrency(results.totalMaintenance)}</span></div>
                <div className="border-t border-brand-200 pt-1.5 flex justify-between"><span className="text-brand-700 font-medium">Vehicle Value at End</span><span className="font-bold text-green-700">-{formatCurrency(results.carValueAtEnd)}</span></div>
              </div>
            </div>
            <div className="rounded-lg bg-accent-50 p-5">
              <p className="text-sm font-semibold text-accent-700">Lease Total Cost</p>
              <p className="mt-1 text-2xl font-bold text-accent-900">{formatCurrency(results.netLeaseCost)}</p>
              <div className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-accent-600">Monthly Payment</span><span className="font-medium text-accent-800">{formatCurrency(results.leasePayment)}/mo</span></div>
                <div className="flex justify-between"><span className="text-accent-600">Due at Signing (x{results.leaseRounds})</span><span className="font-medium text-accent-800">{formatCurrency(results.totalLeaseDown)}</span></div>
                <div className="flex justify-between"><span className="text-accent-600">Total Lease Payments</span><span className="font-medium text-accent-800">{formatCurrency(results.totalLeasePayments)}</span></div>
                <div className="flex justify-between"><span className="text-accent-600">Sales Tax on Payments</span><span className="font-medium text-accent-800">{formatCurrency(results.totalLeaseSalesTax)}</span></div>
                <div className="flex justify-between"><span className="text-accent-600">Insurance ({results.years} yr)</span><span className="font-medium text-accent-800">{formatCurrency(results.totalLeaseInsurance)}</span></div>
                <div className="flex justify-between"><span className="text-accent-600">Maintenance ({results.years} yr)</span><span className="font-medium text-accent-800">{formatCurrency(results.totalMaintenance)}</span></div>
                <div className="border-t border-accent-200 pt-1.5 flex justify-between"><span className="text-accent-700 font-medium">Equity at End</span><span className="font-bold text-ink-500">$0</span></div>
              </div>
            </div>
          </div>

          {/* Year-by-Year Comparison */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink-700">Year-by-Year Cumulative Net Cost</p>
            <div className="mt-2 overflow-auto rounded-lg border border-ink-200">
              <table className="w-full text-sm">
                <thead className="bg-ink-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-ink-600">Year</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Buy Net Cost</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Lease Net Cost</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Buy Equity</th>
                    <th className="px-3 py-2 text-center font-medium text-ink-600">Better Option</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearByYear.map((row) => {
                    const better = row.buyRunning < row.leaseRunning ? "Buy" : row.leaseRunning < row.buyRunning ? "Lease" : "Tie";
                    return (
                      <tr key={row.year} className="border-t border-ink-100">
                        <td className="px-3 py-2 font-medium text-ink-800">Year {row.year}</td>
                        <td className="px-3 py-2 text-right text-ink-700">{formatCurrency(row.buyRunning)}</td>
                        <td className="px-3 py-2 text-right text-ink-700">{formatCurrency(row.leaseRunning)}</td>
                        <td className="px-3 py-2 text-right text-green-700">{formatCurrency(row.equity)}</td>
                        <td className="px-3 py-2 text-center">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${better === "Buy" ? "bg-brand-100 text-brand-700" : better === "Lease" ? "bg-accent-100 text-accent-700" : "bg-ink-200 text-ink-600"}`}>
                            {better}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-xs font-medium text-ink-500">Vehicle Value at Year {results.years}</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.carValueAtEnd)}</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-xs font-medium text-ink-500">Residual Value (Lease)</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.residualValue)}</p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-xs font-medium text-ink-500">Total Interest (Buy)</p>
              <p className="mt-1 text-lg font-bold text-ink-800">{formatCurrency(results.totalBuyInterest)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-lg bg-amber-50 p-4 text-center text-sm text-amber-800">
          Enter a valid vehicle price to compare leasing vs buying.
        </div>
      )}
    </div>
  );
}
