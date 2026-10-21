import type { CalculatorVariant } from "./types";

const SP500_LONG_RUN = "about 10% per year (S&P 500 total return, 1928–2025, Damodaran)";

export const roiVariants: CalculatorVariant[] = [
  {
    slug: "marketing-campaign",
    lastUpdated: "2026-10-21",
    title: "Marketing Campaign ROI Calculator — Net Return",
    description:
      "Model a $5,000 campaign with $18,000 first-year revenue and $2,000 ongoing costs. See 157% ROI, payback in under 4 months, and net profit.",
    defaults: {
      investmentCost: "5000",
      revenue: "18000",
      years: "1",
      ongoingCost: "2000",
      revenueGrowth: "0",
    },
    intro:
      "Marketing ROI only matters when you count every dollar spent — creative, media, tools, and management time converted to a single cash flow. The pre-filled scenario uses a $5,000 launch budget, $18,000 in attributable first-year revenue, and $2,000 in ongoing annual costs (retargeting and platform fees). That produces $11,000 net profit on $7,000 total cost and 157% ROI in year one. Compare that to the long-run S&P 500 total return of " +
      SP500_LONG_RUN +
      ", which takes a full decade of compounding to approach the same percentage gain — but with far less execution risk if you use index funds instead of ads.",
    tips: [
      "With the default inputs, net profit is $11,000 on $7,000 total cost (157% ROI). Payback on the $5,000 launch spend is about 3.75 months once monthly net cash flow hits $1,333 ($18,000 − $2,000, divided by 12).",
      "Track ROI at the channel level with UTM tags and CRM attribution so $18,000 in revenue is tied to this campaign, not organic repeat buyers.",
      "Include agency retainers, creative production, and software subscriptions in ongoing costs — omitting them often overstates ROI by 20–40% in small-business books.",
      "Model customer lifetime value separately: a $5,000 campaign that acquires 100 customers with $200 CLV each implies $20,000 of value even if first-year cash is lower.",
      "Seasonal campaigns may show weak month-one ROI while email and retargeting lift revenue in months 2–6 — extend the time period input when payback spans two quarters.",
    ],
    keyResults: [
      { label: "Total cost (year 1)", value: "$7,000" },
      { label: "Revenue generated", value: "$18,000" },
      { label: "Net profit", value: "$11,000" },
      { label: "Total ROI", value: "157.1%" },
      { label: "Payback period", value: "3.8 months" },
      { label: "Revenue-to-spend ratio", value: "2.6x on total cost" },
    ],
    comparisonNote:
      "A 157% first-year marketing ROI beats passive equity compounding on a one-year horizon, but it requires ongoing spend to maintain leads. Rental-property and equipment variants on this site model multi-year cash flows with different risk profiles — marketing sits at the fast-payback, high-uncertainty end of the spectrum.",
    faq: [
      {
        q: "How do I measure marketing ROI accurately?",
        a: "Use (Revenue − Total Marketing Costs) ÷ Total Marketing Costs × 100, including ad spend, creative, platform fees, and management. Tie revenue to the campaign with UTMs, pixels, and CRM source fields so you do not credit organic repeat purchases to paid media.",
      },
      {
        q: "What makes marketing attribution difficult?",
        a: "Buyers often touch several channels before converting, so last-click models over-credit bottom-funnel ads. Multi-touch attribution and post-purchase surveys help, but no model captures every influence perfectly — document your assumptions when reporting ROI to stakeholders.",
      },
      {
        q: "What ROI should I expect from digital ads?",
        a: "Results vary by industry and offer. Use this calculator with your actual spend and attributed revenue rather than published 'average ROAS' figures, which are often surveyed from self-selected winners and are not reliable benchmarks.",
      },
    ],
    sources: [
      {
        label: "SEC investor.gov, compound growth overview",
        href: "https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest",
      },
      {
        label: "Damodaran S&P 500 historical returns (Jan. 2026)",
        href: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html",
      },
    ],
    sourcesChecked: "October 2026",
    sourcesNote: "Marketing ROI ranges by channel are scenario-specific; no single industry average is cited.",
  },
  {
    slug: "rental-property",
    lastUpdated: "2026-10-21",
    title: "Rental Property ROI Calculator — Cash-on-Cash",
    description:
      "Model a $60,000 down payment on a $300,000 rental with $2,000/month rent and $8,000 expenses. See cap rate, NOI, and 5-year ROI.",
    defaults: {
      investmentCost: "60000",
      revenue: "24000",
      years: "5",
      ongoingCost: "8000",
      revenueGrowth: "3",
    },
    intro:
      "Rental ROI starts with cash you put in, not the full property price. The defaults mirror a $300,000 property with a $60,000 down payment (20%), $24,000 annual rent ($2,000 per month), $8,000 in operating expenses, and 3% rent growth. Year-one cash-on-cash return on the down payment is about 26.7% before mortgage service — strong on paper, but leverage, vacancy, and maintenance can erode it quickly. Over five years the calculator shows about 27.4% total ROI (5.0% annualized) on all cash invested, including ongoing expenses.",
    tips: [
      "Year-one net operating income is $16,000 ($24,000 rent − $8,000 expenses). Dividing by your $60,000 down payment gives 26.7% cash-on-cash before debt service; dividing by $300,000 value gives a 5.3% cap rate on NOI (8.0% on gross rent).",
      "At 3% rent growth, year-five rent hits about $27,813, adding $3,813 in annual revenue without new equity — cumulative five-year revenue totals about $127,419 in the calculator.",
      "Budget at least 1% of property value ($3,000 here) for maintenance plus a vacancy reserve — 5–8% of gross rent ($1,200–$1,920) is a common planning range, though local markets differ.",
      "Financing changes the story: this ROI calculator treats revenue as net cash to you after operating costs but does not subtract mortgage principal and interest — add P&I to ongoing costs for levered deals.",
      "Depreciation can improve after-tax cash flow even when pre-tax ROI looks flat; model taxes separately with your CPA.",
    ],
    keyResults: [
      { label: "Down payment", value: "$60,000 (20% of $300,000)" },
      { label: "Year-one NOI", value: "$16,000" },
      { label: "Gross cap rate", value: "8.0% ($24,000 ÷ $300,000)" },
      { label: "NOI cap rate", value: "5.3%" },
      { label: "5-year total ROI", value: "27.4% (5.0% annualized)" },
      { label: "5-year net profit", value: "$27,419" },
    ],
    comparisonNote:
      "Five-year total ROI near 27% trails a hypothetical equity portfolio compounding at the long-run S&P 500 rate of " +
      SP500_LONG_RUN +
      ", but rental income is often less correlated with public markets. You trade liquidity and simplicity for leverage and local market risk.",
    faq: [
      {
        q: "What is the difference between cap rate and ROI?",
        a: "Cap rate is NOI ÷ property value (5.3% here). ROI in this calculator is cumulative net cash return ÷ all cash invested, including the down payment and recurring costs. Leverage raises ROI when NOI exceeds debt service.",
      },
      {
        q: "How does vacancy affect rental property ROI?",
        a: "Each 1% of vacancy on $24,000 rent costs $240 per year. At 6% vacancy ($1,440), year-one NOI drops to $14,560 and cash-on-cash falls by about 2.4 percentage points on a $60,000 down payment.",
      },
      {
        q: "Should I include mortgage payments in this calculator?",
        a: "Yes — add annual principal and interest to ongoing costs if you want levered cash-on-cash ROI. The defaults show unlevered operating cash relative to equity invested, before debt service.",
      },
    ],
    sources: [
      {
        label: "Damodaran S&P 500 historical returns (Jan. 2026)",
        href: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html",
      },
    ],
    sourcesChecked: "October 2026",
    sourcesNote: "Vacancy and maintenance ranges are planning assumptions, not national census figures.",
  },
  {
    slug: "business-equipment",
    lastUpdated: "2026-10-21",
    title: "Business Equipment ROI Calculator — Payback",
    description:
      "Model a $50,000 equipment purchase with $30,000 annual savings and $4,000 maintenance. See 23-month payback and 114% five-year ROI.",
    defaults: {
      investmentCost: "50000",
      revenue: "30000",
      years: "5",
      ongoingCost: "4000",
      revenueGrowth: "0",
    },
    intro:
      "Equipment ROI is often the clearest capital decision because savings show up on payroll and throughput reports. The defaults use a $50,000 purchase, $30,000 per year in labor or material savings, $4,000 annual maintenance, and flat savings for five years. Payback on the upfront cost is about 23 months, and five-year total ROI is 114.3% ($80,000 net profit on $70,000 total cost). Section 179 may allow expensing up to $2,560,000 of qualifying property in 2026 (IRS Rev. Proc. 2025-32), far above this example — talk to your tax preparer before you rely on a first-year deduction.",
    tips: [
      "Net annual benefit is $26,000 ($30,000 savings − $4,000 maintenance). Payback is $50,000 ÷ $26,000 ≈ 1.92 years (about 23 months).",
      "Five-year cumulative revenue is $150,000 against $70,000 total cost, for 114.3% ROI and about 16.5% annualized ROI in the calculator.",
      "Compare leasing at $1,200 per month ($72,000 over five years) versus buying $50,000 outright — leasing preserves cash if alternate uses earn more than 16% ROI.",
      "Add $1,500–$6,000 for operator training (20–40 hours × $25–$50 per hour for three staff) to the initial investment if skills are not already on payroll.",
      "Energy credits or rebates can reduce effective purchase price; subtract verified incentives from initial investment before you run ROI.",
    ],
    keyResults: [
      { label: "Equipment cost", value: "$50,000" },
      { label: "Annual net benefit", value: "$26,000" },
      { label: "Payback period", value: "23 months" },
      { label: "5-year total ROI", value: "114.3%" },
      { label: "5-year net profit", value: "$80,000" },
      { label: "Annualized ROI (5 yr)", value: "16.5%" },
    ],
    comparisonNote:
      "114% ROI over five years beats passive " +
      SP500_LONG_RUN +
      " on a nominal basis, similar to the bakery equipment case in our main ROI article. Unlike equities, the return depends on utilization — idle equipment drags ROI toward zero quickly.",
    faq: [
      {
        q: "How does Section 179 affect equipment ROI?",
        a: "For tax years beginning in 2026, Section 179 may allow deducting up to $2,560,000 of qualifying equipment placed in service, subject to business-income limits and phaseouts above $4,090,000 in additions (Rev. Proc. 2025-32). A $50,000 deduction at a 24% marginal rate saves about $12,000 in taxes, improving first-year cash flow but not changing pre-tax ROI math in this calculator.",
      },
      {
        q: "Should I lease or buy business equipment?",
        a: "Leasing at $1,200 per month costs $72,000 over five years versus a $50,000 purchase plus $20,000 maintenance ($70,000). If redeploying $50,000 elsewhere earns more than the 16.5% annualized ROI shown here, leasing can win on total firm economics.",
      },
      {
        q: "What maintenance budget belongs in ROI?",
        a: "Many shops plan 5–10% of purchase price annually ($2,500–$5,000 on $50,000). The default $4,000 (8%) is mid-range; increase it for harsh operating environments.",
      },
    ],
    sources: [
      {
        label: "IRS Rev. Proc. 2025-32 (2026 Section 179 limits)",
        href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf",
      },
      {
        label: "Damodaran S&P 500 historical returns (Jan. 2026)",
        href: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html",
      },
    ],
    sourcesChecked: "October 2026",
  },
  {
    slug: "stock-portfolio",
    lastUpdated: "2026-10-21",
    title: "Stock Portfolio ROI Calculator — vs S&P 500",
    description:
      "Track $50,000 invested with $22,800 average annual cash return over 3 years and $150 fees. Compare 35.6% ROI to the ~10% equity benchmark.",
    defaults: {
      investmentCost: "50000",
      revenue: "22800",
      years: "3",
      ongoingCost: "150",
      revenueGrowth: "0",
    },
    intro:
      "Stock ROI in this calculator is cash-based: dividends, sales proceeds, and other distributions count as annual revenue; unrealized price gains do not unless you model a sale as cash inflow. The defaults assume $50,000 invested and $22,800 per year in total cash returned for three years (roughly equivalent to selling a portfolio worth about $68,400 after dividends), minus $150 per year in fees. That yields 35.6% total ROI and 10.7% annualized ROI — slightly above the long-run S&P 500 total return of " +
      SP500_LONG_RUN +
      ". Use the same inputs you enter here when comparing to an index fund benchmark.",
    tips: [
      "Total cost is $50,450 ($50,000 + three years of $150 fees). Cumulative cash return is $68,400, for $17,950 net profit and 35.6% ROI.",
      "Annualized ROI is 10.7% — compare that to the Damodaran 1928–2025 S&P 500 compound average near 10%, not to a single hot year like 2025 (+17.7% total return).",
      "A 0.30% fee on $50,000 is $150 per year; on a $200,000 account the same fee ratio costs $600 — scale ongoing costs as assets grow.",
      "Dividends contributed about 31% of long-run S&P 500 total return (S&P Dow Jones Indices); reinvested dividends explain much of the gap between price-only and total-return indexes.",
      "If your cash flows are irregular (lump-sum sale in year 3 only), adjust the revenue and growth fields or use the Investment Return Calculator for start/end value CAGR.",
    ],
    keyResults: [
      { label: "Initial investment", value: "$50,000" },
      { label: "3-year cash returned", value: "$68,400" },
      { label: "Net profit", value: "$17,950" },
      { label: "Total ROI", value: "35.6%" },
      { label: "Annualized ROI", value: "10.7%" },
      { label: "Annual fees", value: "$150 (0.30% of $50,000)" },
    ],
    comparisonNote:
      "10.7% annualized cash ROI over three years is in the same ballpark as passive " +
      SP500_LONG_RUN +
      ", before taxes. Rental and equipment variants on this site often show higher nominal ROI when leverage or operating savings are large — but they require active management.",
    faq: [
      {
        q: "Why does this differ from my brokerage's performance report?",
        a: "Brokerages usually show time-weighted or money-weighted returns including unrealized gains. This ROI tool uses cash in minus cash out. Enter sale proceeds in the revenue fields when you exit positions.",
      },
      {
        q: "How should I compare to the S&P 500?",
        a: "Match your holding period to calendar total returns from S&P Dow Jones Indices (for example −18.1% in 2022 and +26.3% in 2023 including dividends). The 1928–2025 compound average near 10% is the long-run yardstick, not a forecast for the next three years.",
      },
      {
        q: "How much do taxes reduce stock ROI?",
        a: "Taxable accounts often lose 0.5–1.5% per year to dividends and capital gains taxes depending on turnover and income. Hold broad index funds in tax-advantaged accounts when possible; qualified dividend rates follow long-term capital gains brackets for tax year 2026.",
      },
    ],
    sources: [
      {
        label: "S&P DJI U.S. Equities Market Attributes (Dec. 2023 returns)",
        href: "https://www.spglobal.com/spdji/en/documents/commentary/market-attributes-us-equities-202312.pdf",
      },
      {
        label: "Damodaran Data Update 2 for 2026 (2025 S&P 500 return)",
        href: "https://aswathdamodaran.blogspot.com/2026/01/data-update-2-for-2026-equities-get.html",
      },
      {
        label: "S&P DJI dividend contribution research (Feb. 2025 data)",
        href: "https://www.spglobal.com/spdji/en/documents/research/research-sp500-dividend-aristocrats.pdf",
      },
    ],
    sourcesChecked: "October 2026",
  },
  {
    slug: "education-degree",
    lastUpdated: "2026-10-21",
    title: "Education & Degree ROI Calculator — 10-Year Payback",
    description:
      "Compare $80,000 tuition to a $15,000 annual earnings premium with 3% growth. See 115% 10-year ROI and break-even near year 6.",
    defaults: {
      investmentCost: "80000",
      revenue: "15000",
      years: "10",
      ongoingCost: "0",
      revenueGrowth: "3",
    },
    intro:
      "Education ROI here treats tuition as the upfront investment and the salary premium versus a non-degree baseline as annual revenue. Defaults: $80,000 degree cost, $15,000 extra earnings in year one, 3% growth for ten years, no ongoing costs. Cumulative premium totals about $171,958, for 114.9% ROI and break-even near year six when cumulative premiums exceed $80,000. Opportunity cost of foregone wages during school is not in the defaults — add those to investment cost if you want a conservative case.",
    tips: [
      "Cumulative earnings premium over ten years is $171,958 on $80,000 tuition (114.9% ROI, 8.0% annualized ROI in the calculator).",
      "Break-even occurs in year six when cumulative premiums cross $80,000 ($15,000 + growth sums to about $97,026 by end of year six).",
      "Adding four years of foregone wages at $35,000 per year ($140,000) to tuition raises all-in investment to $220,000 and lowers ROI — model that by increasing initial investment.",
      "Community college transfer paths can cut cash tuition by $30,000–$60,000 while preserving the same degree credential on many resumes.",
      "Short certifications with $2,000–$5,000 cost and documented salary bumps can show triple-digit ROI in year one — compare them on the same calculator with shorter time horizons.",
    ],
    keyResults: [
      { label: "Tuition investment", value: "$80,000" },
      { label: "Year-one salary premium", value: "$15,000" },
      { label: "Break-even", value: "Year 6" },
      { label: "10-year cumulative premium", value: "$171,958" },
      { label: "10-year ROI", value: "114.9%" },
      { label: "Annualized ROI (10 yr)", value: "8.0%" },
    ],
    comparisonNote:
      "114.9% ROI over ten years is below rolling three-year equity returns in strong bull markets but in the same order of magnitude as " +
      SP500_LONG_RUN +
      ". Skilled trades and certifications often break even faster because upfront cost and time out of the workforce are lower.",
    faq: [
      {
        q: "How should I account for opportunity cost?",
        a: "Add foregone earnings during school to initial investment. Four years at $35,000 per year adds $140,000, turning $80,000 tuition into a $220,000 economic bet — still often positive over a 40-year career if the premium persists.",
      },
      {
        q: "Does ROI vary by major?",
        a: "Yes. Engineering, nursing, and computer science premiums often exceed liberal arts averages, but any major's ROI depends on school cost, graduation rate, and local labor demand — use your offer letters, not national medians alone.",
      },
      {
        q: "Are graduate degrees worth it on this math?",
        a: "Add incremental tuition to investment and incremental salary to revenue. MBA and nursing master's programs with $30,000–$60,000 cost and $10,000–$20,000 premiums often break even in 3–5 years on tuition alone, before opportunity cost.",
      },
    ],
    sources: [
      {
        label: "Damodaran S&P 500 historical returns (Jan. 2026)",
        href: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html",
      },
    ],
    sourcesChecked: "October 2026",
    sourcesNote: "Salary premium figures are illustrative; use BLS Occupational Outlook or your school's outcome reports for your field.",
  },
];
