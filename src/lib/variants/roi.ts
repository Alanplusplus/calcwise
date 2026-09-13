import type { CalculatorVariant } from "./types";

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
    keyResults: [
      { label: "Campaign cost", value: "$5,000 initial spend" },
      { label: "Revenue generated", value: "$18,000 first-year revenue" },
      { label: "Net ROI", value: "157% after $2,000 ongoing costs" },
      { label: "Break-even timeline", value: "2-4 months for paid search campaigns" },
      { label: "Revenue-to-spend ratio", value: "3.6x (360% gross return)" },
      { label: "Net profit", value: "$11,000 on a $5,000 investment" },
    ],
    comparisonNote:
      "A well-executed marketing campaign delivering 157% ROI in year one significantly outpaces rental property cash-on-cash returns of 20-25% and the S&P 500's historical 10.3% annual average. Unlike real estate or stocks, marketing ROI can be realized within months rather than years, though returns are less predictable and require ongoing spend to maintain momentum.",
    faq: [
      {
        q: "How do I measure marketing ROI accurately?",
        a: "Calculate ROI as (Revenue Generated - Total Marketing Costs) / Total Marketing Costs x 100, including ad spend, creative production, platform fees, and management costs. Track revenue through UTM parameters, conversion pixels, and CRM attribution so you tie sales back to specific campaigns rather than counting all revenue as marketing-driven.",
      },
      {
        q: "What makes marketing attribution so challenging?",
        a: "Customers often interact with multiple touchpoints before converting, so last-click attribution over-credits final ads while undervaluing awareness channels like social media or email. Multi-touch attribution models and customer surveys help distribute credit more accurately, though no single model captures the full customer journey perfectly.",
      },
      {
        q: "What are typical marketing ROI benchmarks by channel?",
        a: "Google Search ads typically deliver 200-800% ROI for high-intent keywords, while email marketing averages 3600% ROI due to near-zero marginal cost per send. Social media ads range from 100-400% depending on targeting precision, and content marketing often shows lower first-year ROI but compounds through SEO over 12-24 months.",
      },
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
    keyResults: [
      { label: "Down payment", value: "$60,000 (20% of $300,000 purchase)" },
      { label: "Annual rental income", value: "$24,000 ($2,000/month)" },
      { label: "Cap rate", value: "8.0% ($24,000 / $300,000)" },
      { label: "Cash-on-cash return", value: "23.5% before mortgage payments" },
      { label: "Operating expenses", value: "$8,000/year (taxes, insurance, maintenance)" },
      { label: "Net operating income", value: "$16,000/year after expenses" },
    ],
    comparisonNote:
      "Rental property cash-on-cash returns of 20-25% typically exceed the S&P 500's 10.3% historical average, but require active management, illiquid capital, and tolerance for vacancy risk. Stock market investing offers instant liquidity and zero maintenance, while rental properties provide leverage, tax advantages through depreciation, and inflation hedging through rising rents.",
    faq: [
      {
        q: "What is the difference between cap rate and ROI?",
        a: "Cap rate measures net operating income divided by property value ($16,000 / $300,000 = 5.3% after expenses, or 8.0% on gross rent), independent of financing. ROI measures your actual return on the cash you invested ($16,000 / $60,000 = 26.7%), so leverage amplifies ROI above the cap rate when you use a mortgage.",
      },
      {
        q: "How does vacancy rate impact rental property ROI?",
        a: "A 5-8% national average vacancy rate reduces $24,000 annual rent by $1,200-$1,920 per year, directly lowering cash-on-cash returns by 2-3 percentage points. Budget for at least one month of vacancy annually and factor turnover costs like cleaning and advertising into your ongoing expense projections.",
      },
      {
        q: "How does leverage affect rental property returns?",
        a: "With a $60,000 down payment on a $300,000 property, a 5% annual appreciation adds $15,000 in equity while you only invested $60,000 — a 25% return on equity from appreciation alone. Combined with rental income, leveraged returns can reach 30-40% annually, though mortgage interest and maintenance costs reduce net gains.",
      },
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
    keyResults: [
      { label: "Equipment cost", value: "$50,000 purchase price" },
      { label: "Annual productivity gain", value: "$30,000 in labor and material savings" },
      { label: "Payback period", value: "23 months (under 2 years)" },
      { label: "5-year total ROI", value: "114.3% net of $4,000/year maintenance" },
      { label: "Annual maintenance", value: "$4,000 (8% of purchase price)" },
      { label: "Net annual benefit", value: "$26,000 after maintenance costs" },
    ],
    comparisonNote:
      "A $50,000 equipment purchase delivering 114.3% ROI over five years typically outperforms hiring an additional full-time employee at $45,000-$55,000/year plus benefits, which costs $250,000+ over the same period. Equipment generates predictable savings without payroll taxes, benefits, or turnover costs, though it lacks the flexibility of human labor for varied tasks.",
    faq: [
      {
        q: "How does depreciation affect equipment ROI calculations?",
        a: "Depreciation spreads the $50,000 purchase cost over the equipment's useful life (typically 5-7 years for tax purposes), creating annual deductions that reduce taxable income without reducing cash flow. Section 179 allows deducting the full $50,000 in year one, potentially saving $11,000-$16,000 in taxes and boosting first-year ROI by 22-32%.",
      },
      {
        q: "Should I lease or buy business equipment?",
        a: "Leasing at $1,200/month costs $72,000 over five years versus a $50,000 purchase, but preserves capital for other investments. If your business earns 15%+ ROI on alternative uses of that $50,000, leasing may produce higher overall returns despite the higher total cost.",
      },
      {
        q: "What is the Section 179 deduction and how does it help?",
        a: "Section 179 allows businesses to deduct the full purchase price of qualifying equipment up to $1,220,000 (2026 limit) in the year of purchase rather than depreciating over multiple years. On a $50,000 purchase, this immediate deduction can save $11,000-$16,000 in taxes for businesses in the 22-32% bracket, dramatically improving first-year cash flow and ROI.",
      },
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
    keyResults: [
      { label: "Initial investment", value: "$50,000 portfolio value" },
      { label: "Annualized return", value: "11.5% net of $150 annual fees" },
      { label: "3-year total gain", value: "$18,632 (assuming 8% growth)" },
      { label: "vs. inflation (3%)", value: "8.5% real return above inflation" },
      { label: "vs. S&P 500 benchmark", value: "+1.2% above 10.3% historical average" },
      { label: "Annual fees impact", value: "$150/year (0.3% expense ratio)" },
    ],
    comparisonNote:
      "An 11.5% annualized stock portfolio return exceeds rental property cash-on-cash returns when measured on a fully passive basis, and far outpaces high-yield savings accounts at 4.5-5.0% APY. However, stocks carry greater short-term volatility — a 20-30% drawdown is possible in any given year — while savings accounts guarantee principal but lose purchasing power to inflation over time.",
    faq: [
      {
        q: "What is the difference between time-weighted and money-weighted returns?",
        a: "Time-weighted returns measure portfolio performance independent of when you add or withdraw money, making it the standard for comparing against benchmarks like the S&P 500. Money-weighted returns account for the timing and size of your contributions, so adding $20,000 right before a market crash will show a lower money-weighted return even if the portfolio strategy itself performed well.",
      },
      {
        q: "How should I compare my portfolio to a benchmark?",
        a: "Match your portfolio's asset allocation to an appropriate index — compare a 70/30 stock-bond mix to a blended benchmark, not the pure S&P 500. Over a 3-year period, outperforming the S&P 500 by 1-2% annually is meaningful; consistently underperforming by 2%+ suggests switching to low-cost index funds.",
      },
      {
        q: "How much does tax drag reduce stock portfolio returns?",
        a: "Taxable accounts lose 0.5-1.5% annually to taxes on dividends and capital gains, reducing a 10% pre-tax return to 8.5-9.5% after taxes for investors in the 22-24% bracket. Holding investments in tax-advantaged accounts (401k, IRA) or using tax-loss harvesting can recover most of this drag and improve after-tax ROI by 15-20% over a decade.",
      },
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
    keyResults: [
      { label: "Total degree cost", value: "$80,000 over 4 years" },
      { label: "Annual salary premium", value: "$15,000 above high school diploma" },
      { label: "Break-even year", value: "Year 6 of career" },
      { label: "10-year cumulative return", value: "$171,958 in additional earnings" },
      { label: "10-year ROI", value: "115% on tuition investment" },
      { label: "Lifetime earnings boost", value: "$600,000-$900,000 over 40-year career" },
    ],
    comparisonNote:
      "A bachelor's degree with 115% ROI over 10 years compares favorably to entering the workforce directly at $35,000/year, which totals $350,000 in earnings over the same period versus $515,000 with a degree ($165,000 premium minus $80,000 tuition). However, skilled trades and certifications often deliver faster break-even timelines of 1-3 years compared to 5-7 years for a traditional four-year degree.",
    faq: [
      {
        q: "How should I account for opportunity cost in education ROI?",
        a: "Opportunity cost includes four years of foregone earnings at $35,000/year ($140,000 total), which raises the true investment from $80,000 tuition to $220,000. When fully accounted for, 10-year ROI drops from 115% to approximately 35%, though lifetime ROI remains strongly positive due to decades of compounded salary premiums.",
      },
      {
        q: "Does ROI vary significantly by field of study?",
        a: "STEM degrees deliver the highest ROI, with computer science graduates earning a $40,000 annual premium over liberal arts majors and achieving 200%+ 10-year ROI even at top-tier tuition. Healthcare, engineering, and business degrees typically break even within 4-6 years, while humanities and social science degrees may take 10-15 years to recoup costs.",
      },
      {
        q: "Do graduate degrees show diminishing returns on ROI?",
        a: "Master's degrees costing an additional $30,000-$60,000 typically add $10,000-$20,000 in annual salary premium, breaking even in 3-5 years for MBA and engineering programs. However, many PhD programs have negative short-term ROI due to 5-7 years of reduced earnings during study, though they can pay off over a 30-year academic or research career.",
      },
    ],
  },
];
