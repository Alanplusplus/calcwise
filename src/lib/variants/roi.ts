export interface CalculatorVariant {
  slug: string;
  title: string;
  description: string;
  defaults: Record<string, string>;
  intro: string;
  tips: string[];
}

export const roiVariants: CalculatorVariant[] = [
  {
    slug: "marketing-campaign",
    title: "Marketing Campaign ROI Calculator",
    description:
      "Calculate the return on investment for your marketing campaigns. Compare ad spend to revenue generated and find your true marketing ROI.",
    defaults: {
      investmentCost: "5000",
      revenue: "18000",
      years: "1",
      ongoingCost: "2000",
      revenueGrowth: "0",
    },
    intro:
      "Marketing campaigns are among the highest-ROI investments available to small and mid-sized businesses, but only when measured rigorously. The average digital marketing campaign costs $5,000-$15,000 to launch and can generate $18,000 or more in first-year revenue when targeting the right audience. However, many businesses fail to account for ongoing costs like ad management, creative production, and platform fees that reduce true ROI by 20-40% compared to naive calculations.",
    tips: [
      "A $5,000 campaign generating $18,000 in revenue with $2,000 in ongoing costs delivers a net profit of $11,000 and an ROI of 157% — well above the 500% revenue-to-spend ratio benchmark for paid advertising.",
      "Track ROI at the channel level: Google Ads typically delivers 200-800% ROI for search campaigns, while social media ads range from 100-400% depending on the industry and targeting precision.",
      "Include attribution costs in your calculation. Multi-touch attribution tools cost $200-$500/month but can increase effective ROI by 15-30% through better budget allocation across channels.",
      "Factor in customer lifetime value (CLV) rather than first-purchase revenue. A $50 customer acquisition cost with a $200 CLV delivers 300% ROI, versus only 40% if you count just the first $70 purchase.",
      "Seasonal campaigns may show negative ROI in the short term. A $10,000 Q4 holiday campaign might generate $8,000 in immediate sales but drive $25,000 over the following 6 months through retargeting and email follow-ups.",
    ],
  },
  {
    slug: "rental-property",
    title: "Rental Property ROI Calculator",
    description:
      "Calculate the ROI on a rental property investment including purchase price, rental income, and operating expenses. Compare against alternative investments.",
    defaults: {
      investmentCost: "60000",
      revenue: "24000",
      years: "5",
      ongoingCost: "8000",
      revenueGrowth: "3",
    },
    intro:
      "Rental property investors typically put down 20-25% of the purchase price as their initial investment. For a $300,000 property with a $60,000 down payment, rental income of $2,000/month, and annual operating expenses around $8,000 (property taxes, insurance, maintenance, and management fees), the cash-on-cash ROI calculation reveals whether the property generates adequate returns relative to the capital deployed and the hands-on effort required.",
    tips: [
      "With a $60,000 down payment, $24,000 annual rent, and $8,000 in operating costs, your first-year cash-on-cash ROI is approximately 23.5% before mortgage payments — strong compared to most passive investments.",
      "At 3% annual rent growth, your $24,000/year rental income rises to $27,812 by year 5 — adding $3,812 in annual revenue without any additional investment, which significantly improves cumulative ROI.",
      "Budget 1% of property value annually for maintenance and repairs ($3,000 on a $300,000 property). Underfunding maintenance reduces long-term ROI through deferred costs and lower resale value.",
      "Vacancy rates average 5-8% nationally. On $24,000 annual rent, expect to lose $1,200-$1,920 per year to vacancy. Factor this into your ongoing costs for a realistic ROI projection.",
      "Depreciation deductions (approximately $10,900/year on a $300,000 residential property) reduce taxable income without reducing cash flow, boosting after-tax ROI by 15-25% for investors in the 22-32% tax bracket.",
    ],
  },
  {
    slug: "business-equipment",
    title: "Business Equipment ROI Calculator",
    description:
      "Calculate the ROI on equipment purchases for your business. Factor in productivity gains, cost savings, and maintenance to determine if the investment pays off.",
    defaults: {
      investmentCost: "50000",
      revenue: "30000",
      years: "5",
      ongoingCost: "4000",
      revenueGrowth: "0",
    },
    intro:
      "Business equipment purchases represent some of the most predictable ROI calculations because the cost savings and productivity gains are directly measurable. A $50,000 equipment investment that saves $30,000 per year in labor and materials costs — with $4,000 in annual maintenance — typically pays for itself within the first two years and generates substantial returns over a 5-7 year useful life. The key is accurately projecting both the savings and the true total cost of ownership.",
    tips: [
      "A $50,000 equipment purchase generating $30,000/year in savings with $4,000 annual maintenance delivers a 5-year total ROI of 114.3%, with the equipment fully paid back in approximately 23 months.",
      "Section 179 tax deduction allows you to deduct the full $50,000 purchase price in the year of purchase (up to the 2026 limit), potentially saving $11,000-$16,000 in taxes and dramatically improving first-year ROI.",
      "Compare leasing versus purchasing. A $50,000 piece of equipment leased at $1,200/month for 5 years costs $72,000 total but preserves capital. If your business earns 15%+ ROI on other uses of that $50,000, leasing may produce higher overall returns.",
      "Energy-efficient equipment often qualifies for additional tax credits of 10-30%, further reducing effective cost. A $50,000 unit with a 10% energy credit has an effective cost of $45,000, boosting ROI by 11%.",
      "Factor in training costs. New equipment typically requires 20-40 hours of employee training per operator at $25-$50/hour. For 3 operators, that adds $1,500-$6,000 to the true investment cost.",
    ],
  },
  {
    slug: "stock-portfolio",
    title: "Stock Portfolio ROI Calculator",
    description:
      "Calculate the total and annualized ROI of your stock portfolio. Compare performance against market benchmarks like the S&P 500.",
    defaults: {
      investmentCost: "50000",
      revenue: "56000",
      years: "3",
      ongoingCost: "150",
      revenueGrowth: "8",
    },
    intro:
      "Tracking stock portfolio ROI requires accounting for the initial investment, dividends received, ongoing costs like management fees and commissions, and unrealized capital gains. A $50,000 portfolio that grows to $56,000 in year one with $150 in annual fees and 8% expected growth provides a framework for projecting multi-year returns. The critical benchmark is whether your portfolio outperforms a simple S&P 500 index fund, which has averaged 10.3% annually over the past 30 years.",
    tips: [
      "A $50,000 portfolio earning $56,000 in first-year returns with $150 in fees delivers a net ROI of 11.5% — slightly above the S&P 500 historical average of 10.3%, suggesting the strategy may be worth continuing.",
      "Fund expense ratios matter enormously over time. A 1% fee on $50,000 costs $500/year initially, but on a $200,000 portfolio after 15 years of growth, that same 1% costs $2,000/year — choose low-cost index funds at 0.03-0.10%.",
      "Dividend reinvestment (DRIP) historically accounts for 40% of total S&P 500 returns. On a $50,000 portfolio yielding 2%, reinvesting the $1,000 annual dividend adds approximately $34,000 in additional value over 20 years at 10% growth.",
      "Tax-loss harvesting can improve after-tax ROI by 0.5-1.5% annually. Selling losing positions to offset gains saves 15-20% of realized losses in tax, which can be reinvested for compounding benefit.",
      "Compare your 3-year total ROI against the S&P 500 for the same period. If the index returned more with zero effort, consider switching to passive index investing and redirecting your research time to higher-ROI activities.",
    ],
  },
  {
    slug: "education-degree",
    title: "Education & Degree ROI Calculator",
    description:
      "Calculate the ROI of a college degree or certification. Compare the cost of education against the lifetime earnings increase it provides.",
    defaults: {
      investmentCost: "80000",
      revenue: "15000",
      years: "10",
      ongoingCost: "0",
      revenueGrowth: "3",
    },
    intro:
      "Education ROI measures the financial return on tuition, fees, and opportunity costs against the lifetime earnings premium a degree provides. A bachelor's degree costing $80,000 over 4 years that increases annual earnings by $15,000 (the median premium over a high school diploma) generates returns that compound over a 30-40 year career. The 10-year analysis window shows whether the investment breaks even within a reasonable timeframe, while the true lifetime ROI is substantially higher.",
    tips: [
      "An $80,000 degree generating $15,000/year in additional earnings with 3% annual salary growth produces a 10-year cumulative return of $171,958 and an ROI of 115% — with the break-even point around year 6.",
      "Opportunity cost is the hidden expense. Four years of foregone earnings at $35,000/year adds $140,000 to the true investment cost, reducing 10-year ROI from 115% to approximately 35% when fully accounted for.",
      "STEM degrees deliver the highest ROI: computer science graduates earn a median $85,000 starting salary versus $45,000 for liberal arts, creating a $40,000 annual premium that generates 200%+ 10-year ROI even at top-tier tuition.",
      "Community college for the first two years reduces total cost by $30,000-$60,000 while the salary premium remains identical. This single strategy can double or triple the ROI of a bachelor's degree.",
      "Professional certifications (CPA, PMP, AWS) averaging $2,000-$5,000 in cost often deliver 10-20% salary increases, producing ROI of 200-500% within the first year — far exceeding the per-dollar return of most degree programs.",
    ],
  },
];
