import type { CalculatorVariant } from "./types";

// $75K/$100K/$150K income variants removed — content consolidated into /guides/how-much-house-can-i-afford

export const homeAffordabilityVariants: CalculatorVariant[] = [
  {
    slug: "50000-income",
    lastUpdated: "2026-10-20",
    title: "How Much House Can I Afford on $50,000 Salary",
    description:
      "Affordability on a $50,000 salary at the 7.40% Freddie Mac 30-year average: max home price, loan, monthly P&I, taxes, and DTI with $15,000 down.",
    defaults: { annualIncome: "50000", monthlyDebts: "300", downPayment: "15000" },
    intro:
      "A $50,000 gross salary ($4,167 per month) is a common entry point for first-time buyers, especially in smaller metros and rural markets where list prices still sit well below the national median. The calculator below defaults to 7.40%, the Freddie Mac PMMS 30-year fixed average for the week of October 15, 2026, plus the site's usual 1.2% property tax rate and $1,500 annual insurance estimate. With $300 in existing monthly debts and $15,000 saved for a down payment, the 28% front-end rule caps total housing at $1,167 per month and becomes the binding limit before the 36% back-end ceiling ($1,500 total obligations minus $300 in debts leaves $1,200 for housing). At that rate, the math supports a maximum home price of about $144,567 — roughly $13,600 less than the same income would buy at the year-ago PMMS level of 6.27%. FHA loans, state down payment assistance, and the guide How Much House Can I Afford (for $75,000–$150,000 income tiers) are the usual next steps when you need more buying power without raising income.",
    tips: [
      "At 7.40% — the Freddie Mac 30-year average for the week of Oct. 15, 2026 — the pre-filled inputs ($50,000 income, $300 monthly debts, $15,000 down, 1.2% taxes, $1,500 insurance) produce a maximum home price of $144,567, a $129,567 loan, and $897 in monthly principal and interest, with property taxes near $145 and insurance $125 for a $1,167 total housing payment at 28.0% front-end and 35.2% back-end DTI.",
      "If rates fell back to the year-ago PMMS average of 6.27%, the same payment budget would support about $158,186 — an extra $13,619 in price — because lower interest frees room in the payment for principal. That sensitivity is why locking a rate matters once you are under contract.",
      "FHA allows 3.5% down ($5,060 on a $144,567 home) with a 2026 floor limit of $541,287 in standard counties (ceiling $1,249,125 in high-cost areas). Upfront MIP is 1.75% (about $2,441 on the base loan) and annual MIP is 0.55% on most 30-year loans above 95% LTV — roughly $65 per month on top of P&I until you refinance or pay down.",
      "Property tax rates swing affordability: at $145,000, a 0.8% effective rate costs about $97 per month versus $181 at 1.5% — an $84 gap that can matter when you are pinned to the 28% housing line.",
      "State housing finance agencies often offer $5,000–$15,000 in down payment help for buyers under roughly $60,000 in income. Stack that with your $15,000 savings and you may reach 10% down on a home near the calculator's max without waiting another year.",
    ],
    keyResults: [
      { label: "Maximum home price", value: "$144,567" },
      { label: "Maximum loan amount", value: "$129,567" },
      { label: "Total monthly housing", value: "$1,167 (28% rule)" },
      { label: "Principal & interest", value: "$897" },
      { label: "Front-end / back-end DTI", value: "28.0% / 35.2%" },
      { label: "FHA 3.5% down (on max price)", value: "$5,060 down" },
    ],
    comparisonNote:
      "The $50,000 tier tops out near $144,567 at 7.40% with these defaults, while the $200,000 tier reaches about $678,024 — a gap of roughly $533,000 in maximum price, almost entirely from income rather than the larger $120,000 down payment on the higher tier. Middle-income scenarios ($75,000, $100,000, $150,000) live in the guide How Much House Can I Afford rather than separate variant pages. If you earn $50,000 but expect a raise within two years, model the higher salary before stretching to the top of today's DTI limits.",
    faq: [
      {
        q: "Can I buy a home on a $50,000 salary in 2026?",
        a: "Yes, in many markets outside high-cost coastal cities. With $300 in monthly debts and 7.40% on a 30-year loan, standard 28%/36% rules support about $144,567 at the calculator defaults — not a broad range, but enough for condos and smaller homes in the Midwest, South, and Mountain West. A $15,000 down payment covers roughly 10% at that price; FHA at 3.5% down lowers cash needed but adds mortgage insurance.",
      },
      {
        q: "Why is my limit the 28% rule instead of 36%?",
        a: "Monthly gross income of $4,167 makes 28% of housing equal to $1,167, while 36% of income ($1,500) minus $300 in existing debts leaves only $1,200 for housing. The lower number wins, so front-end DTI binds. Paying off or reducing the $300 in monthly obligations would not raise the cap until those debts fall enough that the back-end allowance exceeds $1,167.",
      },
      {
        q: "Should I use FHA or save for a conventional down payment?",
        a: "FHA needs as little as $5,060 down on the $144,567 max price (3.5%) and accepts lower credit scores, but you pay 1.75% upfront MIP plus about 0.55% annual MIP on a 96.5% LTV 30-year loan — near $65 per month in annual MIP alone after financing the upfront premium. Conventional 5%–10% down avoids FHA lifetime MIP but may carry private mortgage insurance until 20% equity. Run both paths in the calculator with your actual credit quote.",
      },
      {
        q: "How much does the 7.40% rate hurt versus a year ago?",
        a: "Freddie Mac's PMMS 30-year average was 6.27% one year before the Oct. 15, 2026 reading. At identical income, debts, and down payment, 6.27% supports about $158,186 — roughly $13,619 more house — because the same $1,167 housing budget buys a larger loan when interest is lower. Waiting for rates to fall is a gamble; improving credit and down payment helps at any rate.",
      },
    ],
  },
  {
    slug: "200000-income",
    lastUpdated: "2026-10-20",
    title: "How Much House Can I Afford on $200,000 Salary",
    description:
      "Buying power on $200,000 income at 7.40% PMMS: max home near $678,000, $558,000 conforming loan, monthly payment breakdown, and jumbo thresholds for 2026.",
    defaults: { annualIncome: "200000", monthlyDebts: "800", downPayment: "120000" },
    intro:
      "A $200,000 annual salary ($16,667 monthly gross) puts you well above the U.S. household median and opens move-up suburbs in most metros — though coastal cores still feel tight. The calculator defaults to 7.40%, the Freddie Mac PMMS 30-year average for the week of October 15, 2026, with $800 in monthly debts and $120,000 saved for a down payment. The 28% front-end rule allows up to $4,667 for housing; with only $800 in other debts, the 36% back-end rule would permit $5,200 total obligations, so the 28% cap still binds. At 7.40% that supports a maximum home price of about $678,024 and a $558,024 loan — comfortably below the 2026 baseline conforming limit of $832,750 (high-cost ceiling $1,249,125). The real decisions at this income are structure, not qualification: whether to put 20% down to drop PMI, how much to keep invested versus in equity, and whether to target a price below the DTI maximum to preserve cash flow.",
    tips: [
      "At 7.40% with $200,000 income, $800 monthly debts, $120,000 down, 1.2% property taxes, and $1,500 insurance, the calculator shows a $678,024 maximum home price, $558,024 loan, $3,864 in monthly P&I, about $678 in taxes and $125 in insurance — $4,667 total housing at 28.0% front-end and 32.8% back-end DTI, limited by the 28% rule.",
      "Your $120,000 down payment is about 17.7% of that max price, so expect conventional PMI near $230–$465 per month on the $558,024 balance until you reach 20% equity ($135,605 down). Putting the extra $15,605 toward 20% down eliminates PMI but ties up cash that might earn 7%–8% in a diversified portfolio.",
      "At the year-ago PMMS 30-year average of 6.27%, the same inputs support roughly $736,674 — about $58,650 more house — illustrating how a 1.13-point rate swing moves buying power even for high earners.",
      "The $558,024 loan stays conforming in baseline counties in 2026 (limit $832,750; ceiling $1,249,125 in designated high-cost areas). You would need a purchase well above your affordability max — or a much smaller down payment on a high list price — before jumbo underwriting and typical 0.25%–0.50% rate premiums apply.",
      "Spending 25% of gross on housing ($4,167 per month) instead of the full 28% ($4,667) frees $500 monthly; invested at 8% over 20 years that grows to about $294,000, a common reason high earners buy below their stated maximum.",
    ],
    keyResults: [
      { label: "Maximum home price", value: "$678,024" },
      { label: "Maximum loan amount", value: "$558,024" },
      { label: "Total monthly housing", value: "$4,667 (28% rule)" },
      { label: "Principal & interest", value: "$3,864" },
      { label: "2026 conforming limit (baseline)", value: "$832,750" },
      { label: "Front-end / back-end DTI", value: "28.0% / 32.8%" },
    ],
    comparisonNote:
      "Against the $50,000-income variant at the same 7.40% PMMS default, a $200,000 salary adds about $533,000 of maximum home price ($678,024 vs $144,567) with proportionally higher P&I and taxes but similar front-end DTI because both hit the 28% housing cap. The $200,000 tier's $120,000 down payment is large in absolute terms yet still under 20% at the computed max, triggering PMI unless you bring more cash. For $75,000–$150,000 income breakpoints, use the guide How Much House Can I Afford rather than expecting a matching variant slug.",
    faq: [
      {
        q: "When would my mortgage become a jumbo loan at $200,000 income?",
        a: "With the calculator's defaults, your affordable $558,024 loan is far below the 2026 baseline conforming cap of $832,750. Jumbo pricing typically starts only when the loan exceeds your county limit (up to $1,249,125 in high-cost areas). You would need to choose a list price above what 28% DTI supports — for example, a $950,000 home with $120,000 down creates a $830,000 loan that is still conforming in most counties but leaves you far above the $678,024 affordability output.",
      },
      {
        q: "What is the optimal down payment at this income level?",
        a: "Twenty percent down on the $678,024 max is $135,605 — $15,605 more than the pre-filled $120,000. That eliminates PMI that might run $230–$465 per month on an 82% LTV conventional loan. Whether that beats investing the $15,605 depends on your portfolio return and how long you keep the loan; many borrowers at $200,000 income put 15%–20% down and accept PMI for a year or two until appreciation and amortization hit 20% equity.",
      },
      {
        q: "Should I max out the $678,000 affordability number?",
        a: "You qualify for about $4,667 in total housing at 28% of gross, but many planners target 25% ($4,167) to keep room for retirement contributions, childcare, and travel. The $500 monthly difference compounds significantly over decades. The calculator shows the ceiling; your budget should reflect goals beyond the minimum DTI a lender will approve.",
      },
      {
        q: "How do 7.40% rates compare to last year for a $200,000 earner?",
        a: "Freddie Mac reported a 6.27% PMMS 30-year average one year before the Oct. 15, 2026 7.40% reading. Identical income, debts, and down payment at 6.27% raise maximum price to about $736,674 — roughly $58,650 more — because less of each payment goes to interest. Refinancing later could recover some of that gap if rates fall, but closing costs and how long you stay in the home determine whether it is worth it.",
      },
    ],
  },
];
