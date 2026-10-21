import type { CalculatorVariant } from "./types";

const G19_SOURCES = [
  {
    label: "Federal Reserve G.19 Consumer Credit (Aug. 2026, released Oct. 7, 2026)",
    href: "https://www.federalreserve.gov/releases/g19/current/",
  },
  {
    label: "Experian — Auto Loan Rates and Financing (Q2 2026)",
    href: "https://www.experian.com/blogs/ask-experian/auto-loan-rates-financing/",
  },
  {
    label: "Edmunds — Q3 2026 new- and used-car finance averages (Oct. 1, 2026)",
    href: "https://www.edmunds.com/press/new-car-financing-records-pile-up-in-q3-as-buyers-borrow-more-and-stretch-loans-longer-according-to-edmunds.html",
  },
];

export const autoLoanVariants: CalculatorVariant[] = [
  {
    slug: "15000-car",
    lastUpdated: "2026-10-21",
    title: "Auto Loan Calculator for a $15,000 Car",
    description:
      "Estimate payments on a $15,000 used car with $3,000 down at Edmunds' Q3 2026 used APR average (10.6%). See interest, 48-month cost, and equity tips.",
    defaults: {
      vehiclePrice: "15000",
      downPayment: "3000",
      termMonths: "48",
      annualRate: "10.6",
    },
    intro:
      "Fifteen thousand dollars remains a practical target for reliable used compact sedans and small crossovers — well below Kelley Blue Book's $50,562 industry average new-vehicle transaction price in September 2026. With $3,000 down (20%) and a 48-month loan at 10.6% APR — Edmunds' Q3 2026 average on financed used purchases — you finance about $13,050 after 7% sales tax in the pre-filled scenario below. Used borrowers face higher coupons than new-car buyers: Experian's Q2 2026 market average used APR was 11.19%, while prime used rates averaged 8.81%.",
    tips: [
      "Financing $13,050 at 10.6% over 48 months produces about $335 per month and $3,018 in total interest — roughly 23% of the principal in finance charges.",
      "Improving your APR from 10.6% to 9.0% on the same $13,050 balance saves about $480 in interest over 48 months ($322/month vs $335). Credit unions often beat dealer markup on used paper.",
      "A 36-month term at 10.6% raises the payment to about $425 but cuts total interest to $2,242 — saving $776 versus 48 months if the higher payment fits your 10% gross-income car budget.",
      "At $15,000 you are far below the Experian Q2 2026 average used loan amount ($27,852), which keeps payments manageable but still justifies a pre-purchase inspection ($150–$200) on private-party buys.",
      "Budget insurance separately: national full-coverage averages often run $150–$225 per month depending on age and state, on top of the loan payment.",
    ],
    keyResults: [
      { label: "Monthly Payment", value: "$335" },
      { label: "Total Interest (48 mo)", value: "$3,018" },
      { label: "Total Loan Cost", value: "$16,068" },
      { label: "Loan-to-Value at Purchase", value: "80%" },
      { label: "Estimated Value After 12 Months", value: "$12,750" },
      { label: "First-Year Depreciation", value: "15%" },
    ],
    comparisonNote:
      "Compared with the $25,000 tier, a $15,000 used purchase cuts the monthly payment by about $101 ($335 vs $436 at October 2026 rate benchmarks) and lowers total 48-month interest by roughly $1,400 on a smaller balance. You give up new-car warranty coverage but avoid the steepest first-year depreciation that hits $27,977 compact cars (Kelley Blue Book, September 2026).",
    faq: [
      {
        q: "Is a $15,000 car better to buy used or certified pre-owned?",
        a: "Certified pre-owned Hondas, Toyotas, and Mazdas near $15,000 often include a factory-backed warranty extension and have passed a dealer inspection. Private-party sellers may save $1,000–$2,000 on the sticker but leave you without warranty coverage — budget $150–$200 for an independent inspection and set aside $500 for early maintenance items such as tires or brakes.",
      },
      {
        q: "Do I need GAP insurance on a $15,000 car loan?",
        a: "With 20% down ($3,000), GAP is usually optional because the loan balance tracks used-car depreciation more slowly than on a new $35,000 crossover. If you finance sales tax or put less than 15% down, consider GAP for the first 12–18 months when total-loss risk is highest relative to market value.",
      },
      {
        q: "What credit score do I need for a good rate on a $15,000 used car loan?",
        a: "Experian's Q2 2026 averages show super-prime used borrowers (781+) near 6.29% APR, prime near 8.81%, and near-prime near 13.93%. Moving from a 10.6% quote toward 9.0% saves about $480 in interest on this $13,050 balance over 48 months — worth checking your credit report before you apply.",
      },
    ],
    sources: G19_SOURCES,
    sourcesChecked: "October 2026",
    sourcesNote: "Used APR default follows Edmunds Q3 2026 financed used average (10.6%).",
  },
  {
    slug: "25000-car",
    lastUpdated: "2026-10-21",
    title: "Auto Loan Calculator for a $25,000 Car",
    description:
      "Model a $25,000 car loan with $5,000 down at the Fed G.19 60-month bank average (7.54%, Aug 2026). Compare 48- vs 60-month interest and payment.",
    defaults: {
      vehiclePrice: "25000",
      downPayment: "5000",
      termMonths: "60",
      annualRate: "7.54",
    },
    intro:
      "Twenty-five thousand dollars sits near Kelley Blue Book's September 2026 compact-car average transaction price ($27,977) and below the $37,614 compact-SUV average — a common budget for a well-equipped Corolla, Civic, or base trim crossover. With $5,000 down and a 60-month loan at 7.54% APR (Federal Reserve G.19 commercial-bank average for August 2026), you finance about $21,750 after tax in the calculator below. Experian's Q2 2026 data show new borrowers averaging $765 per month on $43,610 borrowed, so this scenario is deliberately more conservative than the national mean.",
    tips: [
      "Financing $21,750 at 7.54% over 60 months yields about $436 per month and $4,424 in total interest.",
      "The 20/4/10 rule — 20% down, 48-month maximum term, total car costs under 10% of gross income — implies at least $52,000 gross income when you add roughly $300/month for insurance and fuel to this $436 payment.",
      "Switching to 48 months at 7.54% raises the payment to about $526 but cuts total interest to $3,512, saving $912 over the life of the loan versus 60 months.",
      "Edmunds reports 25.5% of new-car buyers chose 84-month terms in Q3 2026; staying at 60 months or less limits negative-equity risk on a depreciating asset.",
      "Manufacturer incentives may offer below-market APRs, but Edmunds' Q3 average new APR held at 7.0% even as average amount financed climbed to a record $44,664 — compare cash-back versus low-rate offers with our loan comparison tools.",
    ],
    keyResults: [
      { label: "Monthly Payment", value: "$436" },
      { label: "Total Interest (60 mo)", value: "$4,424" },
      { label: "Total Loan Cost", value: "$26,174" },
      { label: "Loan-to-Value at Purchase", value: "80%" },
      { label: "Estimated Value After 12 Months", value: "$19,500" },
      { label: "First-Year Depreciation", value: "22%" },
    ],
    comparisonNote:
      "The $25,000 tier adds about $101 per month versus the $15,000 used scenario ($436 vs $335) but remains $175 below the $35,000 tier's $611 payment at the same 7.54% benchmark. Stretching from 48 to 60 months on this balance costs an extra $912 in interest — the practical ceiling for many buyers who still want a new-car warranty.",
    faq: [
      {
        q: "Should I buy new or certified pre-owned at the $25,000 price point?",
        a: "A new vehicle near $25,000 includes full factory warranty and the latest safety tech but loses value quickly — Edmunds notes three-year-old vehicles retained just 66% of MSRP on average in Q1 2026. A 2-year-old certified model near the same payment often absorbs that first depreciation hit while extending warranty coverage.",
      },
      {
        q: "How does 0% manufacturer financing compare to a cash rebate at $25,000?",
        a: "Zero-percent financing saves interest only if you forgo a large rebate. If a $2,500 rebate drops your financed balance enough, a credit-union loan at 6.35% (Experian Q2 new average) can beat 0% on the higher sticker. Run both scenarios with the same out-the-door price before you sign.",
      },
      {
        q: "What income do I need to afford a $25,000 car comfortably?",
        a: "Using a 10% gross-income cap with $300/month for insurance and fuel, the $436 loan payment needs about $7,360 gross monthly income ($88,300 per year). Households near $90,000 with moderate other debt usually pass lender DTI screens while leaving room for emergency savings.",
      },
    ],
    sources: G19_SOURCES,
    sourcesChecked: "October 2026",
  },
  {
    slug: "35000-car",
    lastUpdated: "2026-10-21",
    title: "Auto Loan Calculator for a $35,000 Car",
    description:
      "Calculate payments on a $35,000 vehicle with $7,000 down at 7.54% (G.19 Aug 2026). See 60-month interest, income needs, and GAP considerations.",
    defaults: {
      vehiclePrice: "35000",
      downPayment: "7000",
      termMonths: "60",
      annualRate: "7.54",
    },
    intro:
      "Thirty-five thousand dollars aligns with Kelley Blue Book's September 2026 compact-SUV average transaction price ($37,614) and matches the default vehicle price in this site's main auto loan calculator. Twenty percent down ($7,000) plus 7% sales tax on the purchase price leaves a $30,450 loan in the pre-filled run at 7.54% APR — the G.19 commercial-bank 60-month average for August 2026. Edmunds' Q3 2026 record average monthly payment ($787) reflects larger loans and longer terms than this 60-month, $35,000 example.",
    tips: [
      "A $30,450 loan at 7.54% over 60 months means about $611 per month and $6,194 in total interest.",
      "Negotiating $2,000 off the purchase price (to $33,000) drops the financed balance by $2,000 plus tax, saving about $40 per month and $130 in interest over 60 months at 7.54%.",
      "At 7.54%, month-one interest on a $30,450 balance is about $191; by month 30, interest falls to roughly $120 per payment as principal dominates — extra payments early save the most.",
      "GAP insurance is worth evaluating for the first 18–24 months on new crossovers: Edmunds' Q1 2026 data show faster depreciation on 3-year-old trade-ins (66% of MSRP retained, a five-year low).",
      "Experian Q2 2026 super-prime new borrowers averaged 4.41% APR — if your score qualifies, shaving 3 points off 7.54% saves about $2,500 in interest on this balance over 60 months.",
    ],
    keyResults: [
      { label: "Monthly Payment", value: "$611" },
      { label: "Total Interest (60 mo)", value: "$6,194" },
      { label: "Total Loan Cost", value: "$36,644" },
      { label: "Loan-to-Value at Purchase", value: "80%" },
      { label: "Estimated Value After 12 Months", value: "$27,300" },
      { label: "First-Year Depreciation", value: "22%" },
    ],
    comparisonNote:
      "Moving from $25,000 to $35,000 adds about $175 per month ($611 vs $436 at 7.54%) and $1,770 in total interest over 60 months. Compared with the $50,000 tier's 72-month structure, this bracket keeps the term at five years and total interest near $6,200 instead of exceeding $10,000 on a larger luxury balance.",
    faq: [
      {
        q: "Is GAP insurance worth it on a $35,000 vehicle purchase?",
        a: "If you put 20% down and choose 60 months, GAP is optional but still useful on models with steep first-year depreciation. With less than 15% down or negative equity rolled in from a trade, GAP for the first two years can cover a $3,000–$5,000 total-loss shortfall when market value drops faster than the amortization schedule.",
      },
      {
        q: "How much does negotiating $2,000 off the purchase price save on financing?",
        a: "On this scenario, $2,000 off the price reduces the loan by $2,140 including 7% tax, lowering the payment by about $40 and total interest by $130 at 7.54% over 60 months — plus the full $2,000 principal reduction for $2,130 in all-in savings.",
      },
      {
        q: "Should I choose a 48-month or 60-month term on a $35,000 loan?",
        a: "48 months at 7.54% costs about $737 per month but only $4,917 in total interest — $1,277 less than 60 months. Choose 60 only if the $126 monthly difference would breach your 10% gross-income car budget, and consider occasional extra principal payments.",
      },
    ],
    sources: G19_SOURCES,
    sourcesChecked: "October 2026",
  },
  {
    slug: "50000-car",
    lastUpdated: "2026-10-21",
    title: "Auto Loan Calculator for a $50,000 Car",
    description:
      "Finance a $50,000 vehicle with $10,000 down at the G.19 72-month bank average (7.17%, Aug 2026). Compare interest, payment, and luxury depreciation.",
    defaults: {
      vehiclePrice: "50000",
      downPayment: "10000",
      termMonths: "72",
      annualRate: "7.17",
    },
    intro:
      "Fifty thousand dollars is close to Kelley Blue Book's September 2026 industry average new-vehicle transaction price ($50,562) and typical for well-optioned midsize SUVs, full-size trucks, and entry luxury sedans. With $10,000 down and a 72-month loan at 7.17% APR — the Federal Reserve G.19 commercial-bank average for 72-month new-car loans in August 2026 — you finance about $43,500 after tax. Edmunds' Q3 2026 data show average new buyers financing $44,664 at $787 per month with record total interest near $9,938, so this scenario mirrors national borrowing scale even with a shorter quoted rate on the longest common term.",
    tips: [
      "Financing $43,500 at 7.17% over 72 months produces about $745 per month and $10,154 in total interest.",
      "The same balance at 7.54% over 60 months (G.19 60-month bank average) raises the payment to about $872 but cuts total interest to $8,849 — saving roughly $1,305 if you can afford the higher payment.",
      "Edmunds reports 25.5% of financed new purchases used 84-month terms in Q3 2026; a 72-month schedule already extends well past typical bumper-to-bumper warranty limits.",
      "Budget $200–$300 per month for insurance on premium trims in many states, plus the $745 loan payment, before applying the 10% gross-income rule.",
      "Leasing can compete on payment size for brands with strong residuals (Edmunds cites 45–60% of MSRP on 36-month leases; about 53% is a common planning assumption), but buying wins on total cost if you keep the vehicle past year five.",
    ],
    keyResults: [
      { label: "Monthly Payment", value: "$745" },
      { label: "Total Interest (72 mo)", value: "$10,154" },
      { label: "Total Loan Cost", value: "$53,654" },
      { label: "Loan-to-Value at Purchase", value: "80%" },
      { label: "Estimated Value After 24 Months", value: "$33,500" },
      { label: "Two-Year Depreciation", value: "33%" },
    ],
    comparisonNote:
      "At $50,000 with 72-month financing, you pay about $134 more per month than the $35,000 tier's 60-month plan ($745 vs $611) and nearly $4,000 more in total interest. The payment sits just below Edmunds' Q3 record average ($787) because this example assumes $10,000 down on a $50,000 sticker rather than the Edmunds average down payment of $5,554.",
    faq: [
      {
        q: "Is buying or leasing better for a $50,000 premium vehicle?",
        a: "If you keep vehicles six or more years, buying with 20% down usually minimizes total out-of-pocket cost despite higher monthly payments. Leasing at roughly 1.1% of MSRP per month ($550 on $50,000) can undercut the $745 loan payment but leaves no equity — compare five-year net cost in the lease-vs-buy calculator with your mileage.",
      },
      {
        q: "How steep is the depreciation curve on a $50,000 vehicle?",
        a: "Edmunds' Q1 2026 used-market analysis shows three-year-old vehicles retaining about 66% of MSRP on average — implying heavy loss in years one and two on many new models. With 72-month financing, plan for several years where loan balance and market value are close before you build comfortable equity.",
      },
      {
        q: "What is the true monthly cost of owning a $50,000 vehicle?",
        a: "Beyond the $745 payment, budget $250 for insurance, $150–$200 for fuel, and $50 for maintenance in early years — roughly $1,200–$1,250 all-in before registration. That requires about $145,000 gross household income to stay near the 10% total-car-cost guideline.",
      },
    ],
    sources: G19_SOURCES,
    sourcesChecked: "October 2026",
    sourcesNote: "72-month APR default is the G.19 commercial-bank 72-month new-car average (7.17%, August 2026).",
  },
  {
    slug: "72-month",
    lastUpdated: "2026-10-21",
    title: "72-Month Auto Loan Calculator",
    description:
      "See the cost of a 72-month auto loan vs 48 months on a $30,000 car. Uses G.19 Aug 2026 bank rates (7.17% / 7.54%) with $5,000 down.",
    defaults: {
      vehiclePrice: "30000",
      downPayment: "5000",
      termMonths: "72",
      annualRate: "7.17",
    },
    intro:
      "Seventy-two-month loans keep payments lower but extend interest and negative-equity risk. Edmunds reports 25.5% of financed new purchases in Q3 2026 used 84-month terms or longer, and Experian's Q2 2026 data show average new loan terms near 69.5 months — evidence that many buyers prioritize the monthly line item over total finance cost. On a $30,000 vehicle with $5,000 down, the pre-filled 72-month run uses 7.17% APR (Federal Reserve G.19 commercial-bank average for August 2026) and finances about $27,100 after tax.",
    tips: [
      "A $27,100 loan at 7.17% for 72 months costs about $464 per month and $6,326 in total interest. The same balance at 7.54% over 48 months costs about $656 per month but only $4,376 in interest — the 72-month schedule adds roughly $1,950 in finance charges for a lower payment.",
      "After 24 months on this loan, the balance is still near $20,000 while many new models have lost 20%+ of value — gap coverage is worth quoting if you put less than 20% down.",
      "If 72 months is the only way to afford the payment, consider a $24,000–$25,000 vehicle on 48-month financing instead: payment near $526 at 7.54% beats stretching $30,000 over 72 months on total interest.",
      "Factory powertrain warranties often expire near year 5–6 while the loan still has 12–24 payments left — set aside $50–$75 per month for repairs after the warranty ends.",
      "One extra $464 payment per year toward principal on the 72-month schedule saves several months of payments and hundreds in interest without changing the contract rate.",
    ],
    keyResults: [
      { label: "Monthly Payment (72 mo)", value: "$464" },
      { label: "Total Interest (72 mo)", value: "$6,326" },
      { label: "Total Loan Cost", value: "$33,426" },
      { label: "Monthly Payment (48 mo alt.)", value: "$656" },
      { label: "Interest Savings (48 vs 72 mo)", value: "$1,950" },
      { label: "Negative Equity Risk (24 mo)", value: "Moderate" },
    ],
    comparisonNote:
      "A 72-month term on this $30,000 purchase lowers the payment by about $192 versus 48 months at 7.54% ($464 vs $656) but costs $1,950 more in interest on the same tax-inclusive balance. If the $656 payment fails the 10% gross-income test, dropping to a lower MSRP on 48 months usually beats extending the term on a $30,000 sticker.",
    faq: [
      {
        q: "When does a 72-month auto loan actually make sense?",
        a: "A 72-month loan is easier to defend when you qualify for a rate at or below the G.19 72-month bank average (7.17% in August 2026), put at least 20% down, and plan to keep the car for the full term. Low-depreciation trucks and hybrids that hold value can also keep the equity gap manageable.",
      },
      {
        q: "How long will I owe more than my car is worth on a 72-month loan?",
        a: "With $5,000 down on a $30,000 new vehicle, negative equity often persists through years two and three depending on mileage and model depreciation. Edmunds' Q1 2026 residual data (66% of MSRP at age three) suggest building meaningful equity only after year four unless you accelerate principal.",
      },
      {
        q: "Can extra payments offset the cost of a 72-month auto loan?",
        a: "Yes. One additional $464 payment each year applied to principal can shave several months off the term and save hundreds in interest. Biweekly half-payments add one full payment annually with a similar effect — confirm your lender applies extras to principal without fees.",
      },
    ],
    sources: G19_SOURCES,
    sourcesChecked: "October 2026",
    sourcesNote: "48-month comparison uses the G.19 60-month commercial-bank average (7.54%, August 2026) on the same balance.",
  },
];
