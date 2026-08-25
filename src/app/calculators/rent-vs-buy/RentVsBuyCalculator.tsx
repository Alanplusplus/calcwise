"use client";

import { useState, useMemo } from "react";
import { InputField } from "@/components/InputField";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

interface YearRow {
  year: number;
  buyNetCost: number;
  rentNetCost: number;
  buyNetWealth: number;
  rentNetWealth: number;
  monthlyBuyCost: number;
  monthlyRent: number;
}

interface Props {
  defaults?: Record<string, string>;
}

export function RentVsBuyCalculator({ defaults }: Props) {
  const [homePrice, setHomePrice] = useState(defaults?.homePrice || "350000");
  const [downPayment, setDownPayment] = useState(defaults?.downPayment || "70000");
  const [mortgageRate, setMortgageRate] = useState(defaults?.mortgageRate || "6.75");
  const [loanTerm, setLoanTerm] = useState(defaults?.loanTerm || "30");
  const [monthlyRent, setMonthlyRent] = useState(defaults?.monthlyRent || "2000");
  const [rentIncrease, setRentIncrease] = useState(defaults?.rentIncrease || "3");
  const [homeAppreciation, setHomeAppreciation] = useState(defaults?.homeAppreciation || "3");
  const [propertyTaxRate, setPropertyTaxRate] = useState(defaults?.propertyTaxRate || "1.2");
  const [maintenanceRate, setMaintenanceRate] = useState(defaults?.maintenanceRate || "1");
  const [investmentReturn, setInvestmentReturn] = useState(defaults?.investmentReturn || "7");
  const [timeHorizon, setTimeHorizon] = useState(defaults?.timeHorizon || "7");

  const results = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = parseFloat(mortgageRate) || 0;
    const years = parseInt(loanTerm) || 30;
    const rent = parseFloat(monthlyRent) || 0;
    const rentInc = (parseFloat(rentIncrease) || 0) / 100;
    const appreciation = (parseFloat(homeAppreciation) || 0) / 100;
    const taxRate = (parseFloat(propertyTaxRate) || 0) / 100;
    const maintRate = (parseFloat(maintenanceRate) || 0) / 100;
    const invReturn = (parseFloat(investmentReturn) || 0) / 100;
    const horizon = parseInt(timeHorizon) || 7;

    const principal = price - down;
    if (price <= 0 || principal <= 0 || rate <= 0 || horizon <= 0) return null;

    const closingCosts = price * 0.03;
    const insuranceRate = 0.0035;

    const monthlyRate = rate / 100 / 12;
    const totalPayments = years * 12;
    const monthlyMortgage =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    let loanBalance = principal;
    let homeValue = price;
    let investment = down;
    let currentRent = rent;
    let buyTotalOutflow = down + closingCosts;
    let rentTotalOutflow = 0;
    let breakEvenYear: number | null = null;

    const yearlyData: YearRow[] = [];

    for (let y = 1; y <= horizon; y++) {
      let yearBuyCosts = 0;
      let yearRentCosts = 0;
      const yearStartRent = currentRent;

      for (let m = 0; m < 12; m++) {
        const monthIndex = (y - 1) * 12 + m + 1;
        if (monthIndex <= totalPayments) {
          const interestPortion = loanBalance * monthlyRate;
          const principalPortion = monthlyMortgage - interestPortion;
          loanBalance = Math.max(0, loanBalance - principalPortion);
        }

        const monthlyTax = (homeValue * taxRate) / 12;
        const monthlyInsurance = (homeValue * insuranceRate) / 12;
        const monthlyMaintenance = (homeValue * maintRate) / 12;
        const monthlyBuyCost = monthlyMortgage + monthlyTax + monthlyInsurance + monthlyMaintenance;

        yearBuyCosts += monthlyBuyCost;
        yearRentCosts += currentRent;

        const monthlySavings = monthlyBuyCost - currentRent;
        investment = investment * (1 + invReturn / 12) + Math.max(0, monthlySavings);
      }

      buyTotalOutflow += yearBuyCosts;
      rentTotalOutflow += yearRentCosts;

      homeValue *= 1 + appreciation;
      currentRent *= 1 + rentInc;

      const buyEquity = homeValue - loanBalance;
      const buyNetWealth = buyEquity;
      const rentNetWealth = investment;
      const buyNetCost = buyTotalOutflow - buyEquity;
      const rentNetCost = rentTotalOutflow - investment;

      if (breakEvenYear === null && buyNetWealth >= rentNetWealth) {
        breakEvenYear = y;
      }

      const monthlyTaxFinal = (homeValue * taxRate) / 12;
      const monthlyInsuranceFinal = (homeValue * insuranceRate) / 12;
      const monthlyMaintenanceFinal = (homeValue * maintRate) / 12;

      yearlyData.push({
        year: y,
        buyNetCost,
        rentNetCost,
        buyNetWealth,
        rentNetWealth,
        monthlyBuyCost: monthlyMortgage + monthlyTaxFinal + monthlyInsuranceFinal + monthlyMaintenanceFinal,
        monthlyRent: yearStartRent,
      });
    }

    const finalYear = yearlyData[yearlyData.length - 1];
    const buyWins = finalYear.buyNetWealth > finalYear.rentNetWealth;
    const wealthDiff = Math.abs(finalYear.buyNetWealth - finalYear.rentNetWealth);

    return {
      buyTotalCost: finalYear.buyNetCost,
      rentTotalCost: finalYear.rentNetCost,
      buyNetWealth: finalYear.buyNetWealth,
      rentNetWealth: finalYear.rentNetWealth,
      breakEvenYear,
      buyWins,
      wealthDiff,
      yearlyData,
      horizon,
    };
  }, [
    homePrice,
    downPayment,
    mortgageRate,
    loanTerm,
    monthlyRent,
    rentIncrease,
    homeAppreciation,
    propertyTaxRate,
    maintenanceRate,
    investmentReturn,
    timeHorizon,
  ]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          label="Mortgage Rate"
          id="mortgageRate"
          value={mortgageRate}
          onChange={setMortgageRate}
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
          label="Monthly Rent"
          id="monthlyRent"
          value={monthlyRent}
          onChange={setMonthlyRent}
          prefix="$"
          min={0}
          step={50}
        />
        <InputField
          label="Annual Rent Increase"
          id="rentIncrease"
          value={rentIncrease}
          onChange={setRentIncrease}
          suffix="%"
          min={0}
          max={20}
          step={0.5}
        />
        <InputField
          label="Annual Home Appreciation"
          id="homeAppreciation"
          value={homeAppreciation}
          onChange={setHomeAppreciation}
          suffix="%"
          min={-10}
          max={20}
          step={0.5}
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
          label="Maintenance Rate"
          id="maintenanceRate"
          value={maintenanceRate}
          onChange={setMaintenanceRate}
          suffix="%"
          min={0}
          max={10}
          step={0.1}
          helpText="Annual maintenance as a percentage of home value"
        />
        <InputField
          label="Investment Return on Savings"
          id="investmentReturn"
          value={investmentReturn}
          onChange={setInvestmentReturn}
          suffix="%"
          min={0}
          max={20}
          step={0.5}
          helpText="What the renter earns on the down payment and savings"
        />
        <InputField
          label="Time Horizon"
          id="timeHorizon"
          value={timeHorizon}
          onChange={setTimeHorizon}
          suffix="years"
          min={1}
          max={30}
        />
      </div>

      {results && (
        <div className="mt-8">
          <div
            className={`rounded-lg p-4 text-center ${
              results.buyWins ? "bg-brand-50" : "bg-accent-50"
            }`}
          >
            <p
              className={`text-lg font-semibold ${
                results.buyWins ? "text-brand-800" : "text-accent-800"
              }`}
            >
              {results.buyWins ? "Buying wins" : "Renting wins"} over {results.horizon} years
            </p>
            <p className="mt-1 text-sm text-ink-600">
              {results.buyWins ? "Buyer" : "Renter"} ends with{" "}
              <strong>{formatCurrency(results.wealthDiff)}</strong> more net wealth
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-brand-50 p-4 text-center">
              <p className="text-sm font-medium text-brand-700">Total Cost of Buying</p>
              <p className="mt-1 text-2xl font-bold text-brand-900">
                {formatCurrency(results.buyTotalCost)}
              </p>
              <p className="mt-1 text-xs text-brand-600">
                Net of equity: {formatCurrency(results.buyNetWealth)} in home equity
              </p>
            </div>
            <div className="rounded-lg bg-accent-50 p-4 text-center">
              <p className="text-sm font-medium text-accent-700">Total Cost of Renting</p>
              <p className="mt-1 text-2xl font-bold text-accent-900">
                {formatCurrency(results.rentTotalCost)}
              </p>
              <p className="mt-1 text-xs text-accent-600">
                Net of investments: {formatCurrency(results.rentNetWealth)} portfolio
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Break-Even Year</p>
              <p className="mt-1 text-2xl font-bold text-ink-800">
                {results.breakEvenYear ? `Year ${results.breakEvenYear}` : "Not within horizon"}
              </p>
              <p className="mt-1 text-xs text-ink-500">
                When buying builds more wealth than renting
              </p>
            </div>
            <div className="rounded-lg bg-ink-100 p-4 text-center">
              <p className="text-sm font-medium text-ink-600">Net Wealth Comparison</p>
              <p className="mt-1 text-sm text-ink-700">
                <span className="font-semibold text-brand-800">Buy:</span>{" "}
                {formatCurrency(results.buyNetWealth)}
              </p>
              <p className="mt-1 text-sm text-ink-700">
                <span className="font-semibold text-accent-800">Rent:</span>{" "}
                {formatCurrency(results.rentNetWealth)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-ink-700">Year-by-Year Comparison (First 10 Years)</p>
            <div className="mt-3 max-h-96 overflow-auto rounded-lg border border-ink-200">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-ink-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-ink-600">Year</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Buy Net Cost</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Rent Net Cost</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Buy Wealth</th>
                    <th className="px-3 py-2 text-right font-medium text-ink-600">Rent Wealth</th>
                    <th className="px-3 py-2 text-center font-medium text-ink-600">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyData.slice(0, 10).map((row) => (
                    <tr key={row.year} className="border-t border-ink-100">
                      <td className="px-3 py-2 text-ink-700">{row.year}</td>
                      <td className="px-3 py-2 text-right text-ink-700">
                        {formatCurrency(row.buyNetCost)}
                      </td>
                      <td className="px-3 py-2 text-right text-ink-700">
                        {formatCurrency(row.rentNetCost)}
                      </td>
                      <td className="px-3 py-2 text-right text-brand-700">
                        {formatCurrency(row.buyNetWealth)}
                      </td>
                      <td className="px-3 py-2 text-right text-accent-700">
                        {formatCurrency(row.rentNetWealth)}
                      </td>
                      <td className="px-3 py-2 text-center text-ink-700">
                        {row.buyNetWealth >= row.rentNetWealth ? "Buy" : "Rent"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-xs text-ink-400">
            Includes estimated closing costs (3% of home price), property taxes, insurance (0.35%
            of value), and maintenance. Assumes the renter invests the down payment and any monthly
            savings when renting is cheaper than owning.
          </p>
        </div>
      )}
    </div>
  );
}
