import type { CalculatorVariant } from "./types";

const FDIC_SAVINGS_OCT_2026 = {
  label: "FDIC National Rates and Rate Caps (Oct. 19, 2026)",
  href: "https://www.fdic.gov/national-rates-and-rate-caps/national-rates-and-rate-caps-october-2026",
};

const BANKRATE_HYSA_OCT_2026 = {
  label: "Bankrate best high-yield savings (Oct. 21, 2026)",
  href: "https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/",
};

export const savingsGoalVariants: CalculatorVariant[] = [
  {
    slug: "house-down-payment",
    lastUpdated: "2026-10-21",
    title: "Save for a House Down Payment — Monthly Target",
    description:
      "Plan a $60,000 down payment in 4 years from a $5,000 start at 4.25% APY. Calculator shows about $1,036/month with interest covering $5,300.",
    defaults: { goalAmount: "60000", currentSavings: "5000", timeframe: "4" },
    intro:
      "A 20% down payment on a $300,000 home means saving $60,000 — a goal that becomes concrete once you know the monthly transfer and how much compound interest helps. Starting with $5,000 in a high-yield savings account near 4.25% APY (Openbank listed 4.35% on Bankrate, October 21, 2026) keeps the money FDIC-insured while you build toward closing. The pre-filled calculator uses 4.25% annual return, matching typical top HYSA yields rather than the 0.38% FDIC national average for savings.",
    tips: [
      "At 4.25% APY with monthly compounding, saving about $1,036 per month for 4 years turns your $5,000 starting balance into $60,000 — roughly $5,300 of the total comes from interest, not paychecks.",
      "Top high-yield savings accounts in October 2026 advertised 4.20% to 4.35% APY with FDIC insurance — appropriate for down payment timelines under five years because stock volatility could erase 15% to 20% of your balance in a single bad year.",
      "State housing finance agencies sometimes match buyer savings for down payment assistance; income and purchase-price caps vary — check your state HFA before you assume the full $60,000 must come from payroll alone.",
      "Putting 10% down ($30,000 on a $300,000 home) needs about $461 per month over the same 4-year window at 4.25% APY from the same $5,000 start — PMI often adds $100 to $200 per month until you reach 20% equity.",
      "Automate transfers to a separate \"Down Payment\" sub-account on payday so the fund is harder to raid for discretionary spending.",
    ],
    keyResults: [
      { label: "Target amount", value: "$60,000 (20% on $300,000)" },
      { label: "Monthly savings needed", value: "$1,036 over 4 years" },
      { label: "Interest earned (4.25% APY)", value: "~$5,300" },
      { label: "Starting balance", value: "$5,000" },
      { label: "Best account type", value: "HYSA near 4.25% APY" },
      { label: "Alternative: 10% down", value: "$461/month to $30,000" },
    ],
    comparisonNote:
      "Saving $1,036 per month builds $60,000 in equity over four years, while renting a comparable home at $1,800/month ($86,400 total over the same period) builds no ownership stake. Investing the down payment in equities could return more long term but risks a drawdown right when you need cash at closing — a 4.25% HYSA trades upside for certainty on a 4-year horizon.",
    faq: [
      {
        q: "Should I use a high-yield savings account or invest for my down payment?",
        a: "For timelines under five years, keep the fund in a HYSA near 4.20% to 4.35% APY (October 2026 top rates). Equities can fall 20% or more in a year; losing $12,000 on a $60,000 goal could delay your purchase by another year. Invest surplus only after the down payment is fully funded.",
      },
      {
        q: "What first-time buyer programs can accelerate my savings?",
        a: "FHA loans require 3.5% down ($10,500 on a $300,000 home). USDA and VA programs offer zero-down options in eligible areas. Many state HFAs provide grants or second-lien assistance with income limits — pairing a $5,000 grant with your $5,000 starting balance cuts the cash you must raise from wages.",
      },
      {
        q: "Is 20% down necessary?",
        a: "Twenty percent avoids PMI, often saving $100 to $200 per month on a $300,000 home. Ten percent down gets you into the home sooner with about $461 per month to reach $30,000 in four years at 4.25% APY from a $5,000 start, but budget for PMI until you reach 20% equity through payments or appreciation.",
      },
    ],
    sources: [FDIC_SAVINGS_OCT_2026, BANKRATE_HYSA_OCT_2026],
    sourcesChecked: "October 2026",
  },
  {
    slug: "wedding",
    lastUpdated: "2026-10-21",
    title: "Wedding Savings Calculator — Monthly Plan",
    description:
      "Reach a $30,000 wedding fund in 2 years from $2,000 saved at 4.25% APY. About $1,113 per month; interest adds roughly $1,300.",
    defaults: { goalAmount: "30000", currentSavings: "2000", timeframe: "2" },
    intro:
      "Wedding budgets in the $25,000 to $35,000 range are common in vendor and industry planning guides, and most couples save over a 12- to 24-month engagement. With $2,000 already set aside and a two-year runway at 4.25% APY in a high-yield savings account, the calculator shows about $1,113 per month to hit a $30,000 cash-funded wedding without resorting to high-interest wedding loans.",
    tips: [
      "To reach $30,000 in 24 months from $2,000 at 4.25% APY, save approximately $1,113 per month — about $557 per partner if you split evenly.",
      "Venue and catering often consume 40% to 50% of a $30,000 budget ($12,000 to $15,000); locking those contracts early lets you spread remaining categories across more pay periods.",
      "Keep wedding cash in a HYSA, not stocks — a 15% market drop on a $20,000 balance costs $3,000 right when final vendor invoices arrive.",
      "Paying vendors in cash may unlock 5% to 10% prepay discounts on photography or florals, saving $150 to $300 on a $3,000 line item.",
      "Build a 5% contingency ($1,500 on $30,000) into the goal amount so guest-count or travel surprises do not force credit-card debt at 20%+ APR.",
    ],
    keyResults: [
      { label: "Target budget", value: "$30,000" },
      { label: "Monthly savings needed", value: "$1,113 over 24 months" },
      { label: "Interest earned (4.25% APY)", value: "~$1,300" },
      { label: "Venue + catering", value: "$12,000-$15,000 typical" },
      { label: "Per-partner share", value: "~$557/month each" },
      { label: "Starting balance", value: "$2,000" },
    ],
    comparisonNote:
      "Saving $1,113 per month for a wedding over two years requires nearly double the $563 per month needed for a $25,000 car fund over three years at the same 4.25% APY assumption. Wedding timelines are fixed by the event date, so start with venue deposits early and keep the balance in FDIC-insured savings rather than CDs that might mature after your payment deadlines.",
    faq: [
      {
        q: "How should I allocate a $30,000 wedding budget?",
        a: "Allocate 40% to 50% ($12,000 to $15,000) to venue and catering, $2,000 to $3,500 to photography, $1,500 to $3,000 to attire, and $1,500 to $2,500 to flowers and decor. Hold $1,500 in contingency for last-minute guest or travel changes.",
      },
      {
        q: "Is financing a wedding better than saving ahead?",
        a: "Saving avoids personal loans at 8% to 15% APR that can add $2,400 to $4,500 in interest on a $30,000 two-year loan. Cash also simplifies vendor negotiations. If you must borrow, compare credit union personal loan rates before accepting venue financing.",
      },
      {
        q: "How do I balance wedding savings with other goals?",
        a: "Fund a starter emergency reserve ($1,000 to $2,000) and any employer 401(k) match before maximizing wedding transfers. If the wedding competes with a house down payment, trimming the wedding target to $22,000 to $25,000 frees $200 to $400 per month for housing savings at 4.25% APY.",
      },
    ],
    sources: [BANKRATE_HYSA_OCT_2026],
    sourcesChecked: "October 2026",
    sourcesNote: "Wedding budget ranges reflect common planning tiers, not a single government survey.",
  },
  {
    slug: "new-car",
    lastUpdated: "2026-10-21",
    title: "Save for a New Car — Cash Purchase Plan",
    description:
      "Build a $25,000 car fund in 3 years from $3,000 at 4.25% APY. About $563/month — below the $765 average new-car payment (Experian Q2 2026).",
    defaults: { goalAmount: "25000", currentSavings: "3000", timeframe: "3" },
    intro:
      "Paying cash for a vehicle eliminates interest and gives you leverage at the dealership. Experian's Q2 2026 State of the Automotive Finance Market report put the average new-car loan payment at $765 per month on a $43,610 average amount financed — well above the $563 per month this calculator shows to save $25,000 in three years from a $3,000 start at 4.25% APY in a HYSA.",
    tips: [
      "Saving $25,000 in 3 years with $3,000 already banked at 4.25% APY requires about $563 per month — interest contributes roughly $1,700 toward the goal.",
      "Financing $25,000 at 7.0% APR (Edmunds Q3 2026 average for new cars) over 60 months costs about $495 per month and $4,700 in total interest versus paying cash.",
      "Certified pre-owned near $25,000 lets you avoid the steepest new-car depreciation; Experian listed average used payments at $542 per month in Q2 2026 on $27,852 borrowed.",
      "Park the fund in a labeled HYSA sub-account so daily spending does not drain the balance — automation on payday beats manual transfers.",
      "Shopping at month-end or quarter-end can yield $1,500 to $3,000 below sticker on slow inventory, effectively accelerating your savings timeline by two to four months.",
    ],
    keyResults: [
      { label: "Target amount", value: "$25,000 car fund" },
      { label: "Monthly savings needed", value: "$563 over 3 years" },
      { label: "Interest earned (4.25% APY)", value: "~$1,700" },
      { label: "Financing cost avoided", value: "~$4,700 interest at 7% APR" },
      { label: "vs. avg. new payment", value: "$563 save vs. $765 finance" },
      { label: "Starting balance", value: "$3,000" },
    ],
    comparisonNote:
      "A $25,000 cash target sits below Experian's $43,610 average new-car loan amount in Q2 2026, pointing toward late-model used or compact new vehicles. Saving $563 per month builds the fund in three years while practicing a payment discipline lower than the average financed buyer pays — without handing thousands to the lender in interest.",
    faq: [
      {
        q: "What down payment should I target on a car?",
        a: "Paying 100% cash on a $25,000 purchase avoids about $4,700 in interest versus a 60-month loan at 7.0% APR. If you finance, put at least 20% down ($5,000) to reduce negative-equity risk when depreciation outpaces the loan balance in year one.",
      },
      {
        q: "Is saving better than financing?",
        a: "Saving $563 per month for three years and paying cash eliminates lender interest and keeps your monthly obligation at zero after purchase. Cash buyers also avoid loan origination fees and may qualify for dealer discounts tied to non-financed sales.",
      },
      {
        q: "How does depreciation affect my target?",
        a: "New vehicles lose a large share of value in the first years; targeting a 2- to 4-year-old certified pre-owned model near $25,000 lets the first owner absorb that drop while you still get warranty coverage on many brands.",
      },
    ],
    sources: [
      {
        label: "Experian State of the Automotive Finance Market (Q2 2026)",
        href: "https://www.experian.com/blogs/ask-experian/average-car-payment/",
      },
      BANKRATE_HYSA_OCT_2026,
    ],
    sourcesChecked: "October 2026",
  },
  {
    slug: "vacation",
    lastUpdated: "2026-10-21",
    title: "Vacation Savings Calculator — $5,000 Trip Fund",
    description:
      "Save $5,000 in 12 months from $500 at 4.25% APY. About $366/month ($85/week) with ~$108 from interest.",
    defaults: { goalAmount: "5000", currentSavings: "500", timeframe: "1" },
    intro:
      "A $5,000 budget covers a week-long trip for two with room for dining and activities when you save over 12 months instead of charging the card. With $500 already earmarked and 4.25% APY in a travel sinking fund, the calculator shows about $366 per month — roughly $85 per week — to land at $5,000 without paying 20%+ credit card APR on the balance.",
    tips: [
      "With $500 saved and 4.25% APY, set aside about $366 per month for 12 months to reach $5,000 — interest contributes roughly $108 over the year.",
      "Split the $5,000 budget into flights ($800 to $1,200), lodging ($1,000 to $1,500), food ($500 to $800), activities ($400 to $600), and a $500 buffer before you book.",
      "Automatic weekly transfers of $85 are easier to absorb than a single $366 hit on a tight month-end budget.",
      "Booking domestic flights roughly 6 to 8 weeks ahead often beats last-minute fares by $200 to $400 per ticket — adjust the goal down if you snag deals early.",
      "Keep the fund in an FDIC-insured HYSA, not a CD, so you can pay non-refundable deposits as soon as you find fares.",
    ],
    keyResults: [
      { label: "Trip budget", value: "$5,000 all-in" },
      { label: "Monthly savings needed", value: "$366 over 12 months" },
      { label: "Weekly equivalent", value: "$85 per week" },
      { label: "Interest earned (4.25% APY)", value: "~$108" },
      { label: "Starting balance", value: "$500" },
      { label: "Account type", value: "HYSA near 4.25% APY" },
    ],
    comparisonNote:
      "Saving $366 per month for 12 months plus $500 starting cash funds a $5,000 vacation with no interest cost. Charging $5,000 at 22% APR and paying it off over 12 months would cost roughly $560 in finance charges on top of principal — about $560 more than the cash plan — and raises credit utilization in the month you travel.",
    faq: [
      {
        q: "What is a vacation sinking fund?",
        a: "A sinking fund is a dedicated savings balance for one trip. Transferring $366 per month (or $85 weekly) into a labeled HYSA lets you track milestones at 25%, 50%, and 75% funded without mixing travel money with checking-account spending.",
      },
      {
        q: "Can travel rewards cards reduce the cash I need?",
        a: "Cards earning 2% to 3% back on everyday spend can offset $100 to $200 per year toward a $5,000 trip if you pay balances in full. Sign-up bonuses worth $500 to $800 can cover flights, lowering the cash target to $4,000 to $4,500 — still keep base expenses in a HYSA until points post.",
      },
      {
        q: "How can I shrink a $5,000 trip budget?",
        a: "Shoulder-season travel (April to May or September to October) often cuts lodging 20% to 40%. Cooking some meals on a vacation rental versus dining out every night can save $400 to $600 on a week-long trip for two.",
      },
    ],
    sources: [BANKRATE_HYSA_OCT_2026],
    sourcesChecked: "October 2026",
  },
  {
    slug: "college-fund",
    lastUpdated: "2026-10-21",
    title: "College Fund Savings Calculator — 18-Year Plan",
    description:
      "Reach $100,000 in 18 years from $10,000 at 7% annual return. About $151/month with compound growth supplying ~$57,500.",
    defaults: {
      goalAmount: "100000",
      currentSavings: "10000",
      timeframe: "18",
      annualReturn: "7",
    },
    intro:
      "Four years at an in-state public university often totals $100,000 to $120,000 including room and board when you multiply today's $25,000 to $30,000 annual sticker prices by four and add 3% to 4% inflation. Starting with $10,000 in a 529 plan invested for long-term growth — not a 4.25% HYSA — the calculator uses 7% annual return as a conservative equity-heavy planning rate below recent S&P 500 10-year total returns near 15.5% (S&P Dow Jones Indices, September 30, 2026).",
    tips: [
      "With $10,000 already saved and 7% annual return compounded monthly, contributing about $151 per month for 18 years reaches $100,000 — compound earnings supply roughly $57,500 of the total.",
      "529 plans offer federal tax-free growth on qualified education withdrawals; over $50,000 in gains, that shelter can save $7,500 to $11,000 versus a taxable brokerage depending on your state and bracket.",
      "Front-loading helps: $250 per month for the first 10 years then stopping beats $250 per month only in the last 10 years because early dollars compound longer.",
      "Shift toward bonds or stable value funds by age 14 to 17 so a market drop the year before freshman year does not force loans.",
      "If the fund falls short, merit aid, in-state tuition, and community-college transfer paths can cover $30,000 to $40,000 without private loans.",
    ],
    keyResults: [
      { label: "18-year target", value: "$100,000 college fund" },
      { label: "Monthly contribution (7%)", value: "$151 over 18 years" },
      { label: "Compound growth", value: "~$57,500 at 7% return" },
      { label: "Starting balance", value: "$10,000" },
      { label: "In-state public (4 yr)", value: "$100,000-$120,000 total" },
      { label: "529 tax shelter on gains", value: "Varies by state; often $7k-$11k+" },
    ],
    comparisonNote:
      "A 529 at 7% tax-free growth needs only $151 per month after a $10,000 head start, while the same goal in a 4.25% HYSA would require several times the monthly deposit because education inflation outpaces savings yields. Taxable brokerage accounts add capital gains tax on withdrawals — 529s keep qualified tuition withdrawals federal-tax-free.",
    faq: [
      {
        q: "What tax advantages do 529 plans offer?",
        a: "529 plans provide federal tax-free growth and withdrawals for qualified education expenses. Many states also offer income tax deductions on contributions. On large gains, that beats taxable accounts that owe capital gains tax when you sell investments to pay tuition.",
      },
      {
        q: "Does a 529 hurt financial aid?",
        a: "Parent-owned 529 assets count at up to 5.64% of their value on the FAFSA — a $100,000 balance might reduce aid by about $5,640. Student-owned assets count more heavily; grandparent-owned 529 rules changed in recent FAFSA cycles, so confirm current treatment before gifting.",
      },
      {
        q: "What if I start saving late?",
        a: "Starting at age 10 with $10,000 already saved needs about $644 per month to reach $100,000 by 18 at 7% returns — more than four times the $151 needed from birth. Even at age 14, $1,572 per month can still build a meaningful balance, though combining savings with lower-cost transfer paths becomes essential.",
      },
    ],
    sources: [
      {
        label: "S&P 500 fact sheet (10-yr annualized total return, Sep. 30, 2026)",
        href: "https://www.spglobal.com/spdji/en/indices/equity/sp-500/",
      },
    ],
    sourcesChecked: "October 2026",
    sourcesNote:
      "Planning uses 7% annual return — below recent 10-year S&P 500 total returns — not a forecast of future performance.",
  },
];
