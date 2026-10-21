import type { CalculatorVariant } from "./types";
import { HSA_LIMITS, usd } from "../tax-data";

const BLS_CPI_SEP_2026 = {
  label: "BLS Consumer Price Index — September 2026 (released Oct. 14, 2026)",
  href: "https://www.bls.gov/news.release/cpi.htm",
};

const FED_INFLATION_TARGET = {
  label: "Federal Reserve — 2% longer-run PCE inflation objective (reaffirmed Jan. 27, 2026)",
  href: "https://www.federalreserve.gov/faqs/economy_14400.htm",
};

const COLLEGE_BOARD_PRICING = {
  label: "College Board Trends in College Pricing 2025 (2025–26 award year)",
  href: "https://research.collegeboard.org/trends/college-pricing/highlights",
};

export const inflationVariants: CalculatorVariant[] = [
  {
    slug: "retirement-30-years",
    lastUpdated: "2026-10-21",
    title: "Inflation Over 30 Years for Retirement Planning",
    description:
      "See how 30 years of inflation affects retirement purchasing power. Model a $50,000 budget at 3% or today's 3.7% CPI pace to set savings targets.",
    defaults: { currentAmount: "50000", inflationRate: "3", years: "30" },
    intro:
      "Thirty years is a common planning horizon for someone in their mid-thirties targeting retirement at 65. Headline CPI-U rose 3.7% for the 12 months ending September 2026 (BLS release October 14, 2026), above the Federal Reserve's 2% longer-run PCE objective — so stress-testing at both 3% and 3.7% matters. At 3% inflation, a $50,000 annual budget requires $121,363 in future dollars to buy the same basket; at 3.7%, that need climbs to about $148,707.",
    tips: [
      "At 3% inflation, $50,000 in today's spending requires $121,363 per year in 30 years — about 2.4 times your current budget.",
      "Using a 4% safe withdrawal rate, sustaining $121,363 per year in future dollars implies a portfolio near $3,034,000 at retirement in those inflated dollars (before adjusting the withdrawal rate for your own risk tolerance).",
      "Medical care services rose 2.5% over the year in the September 2026 CPI report, while the energy index jumped 20.4% — retirees who drive or heat with gas feel different inflation than headline CPI alone.",
      "Social Security COLA follows CPI-W, not CPI-U; small annual gaps between COLA and retiree spending inflation can compound over 25-year retirements.",
      "Running the same $50,000 scenario at 3.7% instead of 3% lifts the 30-year spending need to $148,707 — a $27,344 annual difference that widens every year you delay saving.",
    ],
    keyResults: [
      { label: "Current spending power", value: "$50,000/year" },
      { label: "Required budget in 30 years at 3%", value: "$121,363/year" },
      { label: "Real value loss at 3%", value: "58.8% of today's buying power" },
      { label: "Same need at 3.7% CPI pace", value: "$148,707/year" },
      { label: "10-year milestone at 3%", value: "$67,196/year" },
      { label: "20-year milestone at 3%", value: "$90,306/year" },
    ],
    comparisonNote:
      "At 3% inflation, a $50,000 budget requires $67,196 in 10 years and $90,306 in 20 years before reaching $121,363 at year 30. The final decade alone adds $31,057 in annual spending need — more than the entire increase from year 10 to year 20 — which is why retirement models should not extrapolate from short horizons alone.",
    faq: [
      {
        q: "How does inflation affect retirement planning over 30 years?",
        a: "At 3% annual inflation, each dollar of today's spending needs about $2.43 in 30 years. A $50,000 lifestyle requires roughly $121,000 in future annual withdrawals just to stay even. If inflation averaged 3.7% (the September 2026 CPI-U 12-month change), the same lifestyle needs about $149,000. Underestimating the rate is one of the most common reasons retirees exhaust savings early.",
      },
      {
        q: "Can TIPS bonds protect my retirement savings from inflation?",
        a: "Treasury Inflation-Protected Securities adjust principal with CPI, hedging general inflation. TIPS yields are usually lower than stock returns and do not fully track medical or long-term care costs, which can outpace CPI. Most retirees hold TIPS as one sleeve of a diversified portfolio rather than the entire nest egg.",
      },
      {
        q: "Do Social Security COLA adjustments keep pace with retiree inflation?",
        a: "COLA is based on CPI-W. Retirees often spend more on medical care and housing than the CPI-W basket weights, so personal inflation can run above COLA even when headline CPI is moderate. Planning with a 3% general assumption plus higher healthcare assumptions is safer than relying on COLA alone.",
      },
    ],
    sources: [BLS_CPI_SEP_2026, FED_INFLATION_TARGET],
    sourcesChecked: "October 2026",
  },
  {
    slug: "college-cost-18-years",
    lastUpdated: "2026-10-21",
    title: "College Cost Inflation Over 18 Years",
    description:
      "Project in-state public college costs from the College Board's $30,990 average budget. Model 529 savings at 5% education inflation over 18 years.",
    defaults: { currentAmount: "30990", inflationRate: "5", years: "18" },
    intro:
      "Parents starting at birth face nearly two decades before freshman year. College Board data for 2025–26 puts the average published budget at $30,990 per year for in-state public four-year students (tuition, fees, housing, food, books, and other expenses). The BLS tuition-and-fees index rose 3.4% a year from September 2006 to September 2026 versus 2.6% for all items, and general CPI ran 3.7% in September 2026. Modeling 5% per year is therefore a deliberate stress test, not a measured rate, and it helps avoid underfunding a 529 plan.",
    tips: [
      "At 5% annual inflation, today's $30,990 budget becomes about $74,581 per year in 18 years — roughly $298,000 for four years at that future annual price.",
      "Contributing $200 per month to a 529 earning 7% nominal returns from birth accumulates about $86,000 by age 18 — near 29% of a four-year future cost at the 5% inflation assumption.",
      "Fully funding four years at projected costs requires about $690 per month from birth at 7% returns, or less if grandparents seed a lump sum early.",
      "Private nonprofit sticker prices averaged $60,920 in 2025–26 (College Board); at 5% over 18 years that annual budget approaches $147,000 per year.",
      "Starting at age 5 instead of birth requires roughly 45% higher monthly contributions to reach the same 18-year balance because compounding time shrinks.",
    ],
    keyResults: [
      { label: "Current in-state public budget", value: "$30,990/year" },
      { label: "Projected budget in 18 years at 5%", value: "$74,581/year" },
      { label: "Education inflation assumption", value: "5.0% annually" },
      { label: "Total 4-year cost projection", value: "$298,324" },
      { label: "At general 3% CPI instead", value: "$52,747/year (29% less)" },
      { label: "Private budget at 5% (from $60,920)", value: "~$146,700/year" },
    ],
    comparisonNote:
      "Education inflation at 5% produces a $74,581 annual budget in 18 years from today's $30,990 public in-state average, while general 3% CPI would yield only $52,747 — a $21,834 per-year gap. Over four undergraduate years that gap exceeds $87,000, which is why college savers should not use headline CPI alone.",
    faq: [
      {
        q: "Why does college cost inflation outpace general inflation?",
        a: "Published prices reflect staffing, facilities, financial aid cross-subsidies, and state funding cuts. College Board reported 2.9% nominal tuition growth at public four-year in-state schools for 2025–26 before inflation adjustment — still above the 2.6% all-items pace of the past 20 years. BLS tuition and fees rose 3.4% a year over that period, so a 5% projection builds in a margin for above-CPI growth.",
      },
      {
        q: "What growth rate should I assume for a 529 plan?",
        a: "The measured 20-year pace for tuition and fees is 3.4% a year, so 5% is a conservative cushion; compare it with 3.4% in the calculator. Pair it with a return assumption you are comfortable defending (for example 6–7% nominal for a growth-oriented 529 portfolio, which is an assumption, not a guarantee). If tuition spikes or markets lag, you may need catch-up contributions in the teen years.",
      },
      {
        q: "Do in-state public and private schools inflate at the same rate?",
        a: "Percentage increases can look similar, but private schools start from a higher base ($60,920 average budget vs $30,990 public in-state in 2025–26). At 5% over 18 years, the private annual budget approaches $147,000 while public in-state approaches $75,000 — the dollar gap widens even when percentages match.",
      },
    ],
    sources: [COLLEGE_BOARD_PRICING, BLS_CPI_SEP_2026],
    sourcesChecked: "October 2026",
  },
  {
    slug: "grocery-budget-10-years",
    lastUpdated: "2026-10-21",
    title: "Grocery Budget Inflation Over 10 Years",
    description:
      "Project a $800 monthly grocery budget at 3.5% inflation over 10 years. Compare to BLS food indexes (September 2026 CPI).",
    defaults: { currentAmount: "800", inflationRate: "3.5", years: "10" },
    intro:
      "BLS reported the food index up 2.5% for the 12 months ending September 2026, with food at home up 1.8% and food away from home up 3.5%. A household spending $800 per month on groceries and food at home can still model 3.5% for planning — slightly above the at-home index — to build in buffer for brand upgrades or less substitution. Ten years of compounding turns $800 into about $1,128 per month at that rate.",
    tips: [
      "At 3.5% food inflation, $800 per month becomes about $1,128 per month in 10 years — an extra $328 per month or $3,936 per year.",
      "Summing inflated monthly budgets over 10 years costs about $112,600 versus $96,000 at today's prices — roughly $16,600 in cumulative inflation premium.",
      "If wages grow 2% annually while groceries inflate at 3.5%, food takes a rising share of take-home pay on a $75,000 salary — from about 13% today toward 15% in year 10.",
      "A family spending $1,200 monthly faces about $1,693 per month in 10 years at 3.5% — an extra $5,916 per year.",
      "If inflation matched the September 2026 food-at-home pace (1.8%), the 10-year monthly cost would be about $956 — $172 less per month than the 3.5% stress test.",
    ],
    keyResults: [
      { label: "Current monthly grocery budget", value: "$800/month" },
      { label: "Projected in 10 years at 3.5%", value: "$1,128/month" },
      { label: "Annual increase amount", value: "$3,936/year extra" },
      { label: "Cumulative inflation premium (10 yr)", value: "~$16,600" },
      { label: "BLS food index (12 mo. to Sep. 2026)", value: "+2.5%" },
      { label: "At 4.5% stress scenario", value: "$1,232/month" },
    ],
    comparisonNote:
      "Food at home rose 1.8% in the year through September 2026, while shelter rose 3.2% and energy 20.4%. Groceries hit household cash flow immediately because prices change weekly at checkout, making food inflation one of the most visible budget pressures even when headline CPI moderates.",
    faq: [
      {
        q: "Why are food prices more volatile than other household expenses?",
        a: "Crop yields, fuel, labor, and freight move food prices quickly. The September 2026 CPI showed gasoline up 34.2% over the year, which feeds into grocery logistics even when food at home rose only 1.8%. Volatility is normal even when long-run averages stay near 2–4%.",
      },
      {
        q: "How do substitution effects help manage rising grocery costs?",
        a: "Switching to store brands, frozen produce, or cheaper proteins slows personal food inflation below CPI when you flex shopping habits. Track your actual receipts quarterly — your household rate may differ from BLS averages.",
      },
      {
        q: "Do grocery prices vary significantly by region?",
        a: "Yes. BLS publishes regional CPI breakdowns; coastal metros often run above the national food index. A $800 basket in a low-cost Midwest market might need $920–$1,000 in high-cost cities for the same items.",
      },
    ],
    sources: [BLS_CPI_SEP_2026],
    sourcesChecked: "October 2026",
  },
  {
    slug: "healthcare-cost-20-years",
    lastUpdated: "2026-10-21",
    title: "Healthcare Cost Inflation Over 20 Years",
    description:
      "Project $5,000 in annual out-of-pocket costs at 5.5% medical inflation over 20 years. Plan HSA contributions using 2026 limits.",
    defaults: { currentAmount: "5000", inflationRate: "5.5", years: "20" },
    intro:
      "The BLS medical care index rose 2.9% a year over the 20 years to September 2026, and medical care services rose 2.5% in the year through September 2026. This scenario stress-tests 5.5% instead, because premiums, deductibles, and usage can push a household's own out-of-pocket spending above a price index, especially in retirement. At the measured 2.9% pace, $5,000 would grow to about $8,770 in 20 years; at 5.5% it reaches $14,589.",
    tips: [
      "At 5.5% medical inflation, $5,000 per year grows to $14,589 in 20 years — nearly triple today's level.",
      "Cumulative out-of-pocket spending over 20 years totals about $183,000 at 5.5% inflation versus $100,000 at flat prices — an $83,000 inflation premium.",
      `Maxing a self-only HSA at ${usd(HSA_LIMITS.selfOnly)}/year (2026 limit) invested at 7% returns builds about $193,000 in 20 years — enough to cover many years of inflated out-of-pocket costs if unused.`,
      "Medicare does not cover dental, vision, hearing, or long-term care; Fidelity and similar planners publish six-figure retiree healthcare estimates that continue to rise for pre-Medicare households.",
      "Using 3% general CPI instead of 5.5% for healthcare would project only $9,031 per year in 20 years — understating costs by about $5,558 annually.",
    ],
    keyResults: [
      { label: "Current annual healthcare cost", value: "$5,000/year" },
      { label: "Projected in 20 years at 5.5%", value: "$14,589/year" },
      { label: "Medical inflation assumption", value: "5.5% annually" },
      { label: "Cumulative 20-year spending", value: "~$183,000" },
      { label: "HSA max-out at 7% (20 yr)", value: "~$193,000" },
      { label: "Underestimate at 3% CPI", value: "$9,031/year" },
    ],
    comparisonNote:
      "Healthcare at 5.5% nearly triples $5,000 to $14,589 in 20 years, while 3% general CPI reaches only $9,031 — a $5,558 annual planning error. Medical costs remain the largest wildcard in long-term plans because usage rises with age even when CPI-medical moderates.",
    faq: [
      {
        q: "Why does medical inflation often outpace wage growth?",
        a: "New treatments, specialty drugs, and administrative costs push spending faster than average wages, which often grow 2–4% in nominal terms. Personal out-of-pocket spikes can exceed CPI-medical when deductibles and coinsurance rise.",
      },
      {
        q: "Can an HSA serve as a hedge against healthcare inflation?",
        a: "HSAs offer tax-deductible contributions, tax-free growth, and tax-free qualified withdrawals. Investing HSA balances rather than spending them annually lets the account compound — the 2026 self-only limit is $4,400, which grows materially over 15–20 years at market returns.",
      },
      {
        q: "How should I plan for Medicare costs given rising medical inflation?",
        a: "Budget premiums, Medigap or Advantage cost-sharing, dental, and long-term care separately from general CPI. Pre-Medicare households can stress-test 4–6% on out-of-pocket assumptions (the measured CPI pace is 2.9% a year) rather than relying on the 3.7% headline CPI alone.",
      },
    ],
    sources: [BLS_CPI_SEP_2026, { label: "IRS Rev. Proc. 2025-19 (2026 HSA limits)", href: "https://www.irs.gov/pub/irs-drop/rp-25-19.pdf" }],
    sourcesChecked: "October 2026",
  },
  {
    slug: "100-dollar-purchasing-power",
    lastUpdated: "2026-10-21",
    title: "What Will $100 Be Worth in the Future?",
    description:
      "See how $100 loses purchasing power over 10, 20, and 30 years. Compare 3% planning rates to the 3.7% September 2026 CPI pace.",
    defaults: { currentAmount: "100", inflationRate: "3", years: "20" },
    intro:
      "Cash loses buying power every year inflation runs above zero. At 3% — a common long-run planning assumption — $100 today buys what $55.37 buys in 20 years. The September 2026 CPI-U rose 3.7% over the prior 12 months, faster than the Federal Reserve's 2% PCE target, which is why savers compare both rates when setting emergency fund and investment goals.",
    tips: [
      "At 3% inflation, $100 retains $74.41 of purchasing power in 10 years, $55.37 in 20 years, and $41.20 in 30 years.",
      "To buy what $100 buys today, you will need $134.39 in 10 years, $180.61 in 20 years, and $242.73 in 30 years at 3%.",
      "$10,000 in a zero-interest account for 20 years at 3% inflation loses about $4,463 in purchasing power silently.",
      "A 4.5% APY savings account turns $100 into $124.12 in five years, but at 3% inflation you need $115.93 to break even — about $8 real gain before taxes.",
      "At 3.7% (September 2026 CPI-U 12-month change), $100 retains about $69.50 of power in 10 years and $48.30 in 20 years — faster erosion than a 3% plan assumes.",
    ],
    keyResults: [
      { label: "Value of $100 today", value: "$100.00" },
      { label: "Purchasing power in 10 years at 3%", value: "$74.41" },
      { label: "Purchasing power in 20 years at 3%", value: "$55.37" },
      { label: "Purchasing power in 30 years at 3%", value: "$41.20" },
      { label: "Future cost in 20 years at 3%", value: "$180.61" },
      { label: "Purchasing power in 20 years at 3.7%", value: "$48.30" },
    ],
    comparisonNote:
      "At 2% inflation, $100 retains $82.03 after 10 years; at 3%, $74.41; at 3.7%, about $69.50. A 1.7-point spread between 2% and 3.7% erases an extra $12.53 of purchasing power per $100 over a decade — tens of thousands across a full portfolio.",
    faq: [
      {
        q: "How can I protect my savings from losing purchasing power?",
        a: "Long-run holdings need returns above inflation after taxes. Equities, real estate, and TIPS have historically helped; cash earns little real return when CPI runs near 3.7%. Even high-yield savings near 4.5% APY only slightly beats 3% inflation before taxes.",
      },
      {
        q: "What is the difference between real and nominal returns?",
        a: "Nominal returns are quoted before inflation; real returns subtract inflation. A 7% portfolio return with 3% inflation is about 4% real. Wealth goals should be stated in real (today's) dollars when possible.",
      },
      {
        q: "How is inflation measured, and does the official rate reflect my experience?",
        a: "BLS publishes CPI-U (all urban consumers) monthly. September 2026 CPI-U was 336.940 (1982–84=100), up 3.7% year over year. Households heavy on rent, tuition, or medical care may feel higher personal inflation than the headline index.",
      },
    ],
    sources: [BLS_CPI_SEP_2026, FED_INFLATION_TARGET],
    sourcesChecked: "October 2026",
  },
];
