import type { CalculatorVariant } from "./types";
export type { CalculatorVariant };

export const mortgageVariants: CalculatorVariant[] = [
  {
    slug: "200000",
    lastUpdated: "2026-10-20",
    title: "$200,000 Mortgage Calculator — Monthly Payment & Total Interest",
    description:
      "Calculate monthly P&I on a $200,000 home with 20% down at the 7.40% Freddie Mac 30-year average. See total interest, 28% income rule, and amortization.",
    defaults: { homePrice: "200000", downPayment: "40000" },
    intro:
      "A $200,000 home remains an attainable entry point in many Midwestern, Southern, and Mountain West markets, even with mortgage rates near multiyear highs. With 20% down ($40,000), you avoid conventional PMI and keep the loan at $160,000. At the Freddie Mac PMMS 30-year average of 7.40% for the week of October 15, 2026, the pre-filled calculator below shows what that balance costs per month before taxes and insurance.",
    tips: [
      "At 7.40% -- the Freddie Mac 30-year average for the week of Oct. 15, 2026 -- a $160,000 loan over 30 years produces about $1,108 in monthly principal and interest with 20% down ($40,000). The 28% housing rule implies roughly $47,500 in gross household income.",
      "If you put 10% down ($20,000) instead, the loan rises to $180,000 and P&I jumps to about $1,247 per month, plus PMI often in the $90 to $130 range until you reach 20% equity.",
      "Switching to a 15-year term on the same $160,000 balance at the 6.71% PMMS 15-year average raises the payment to about $1,412 but cuts total interest by roughly $144,600 versus the 30-year schedule at 7.40%.",
      "Closing costs on a $200,000 purchase typically run $4,000 to $8,000 (about 2% to 4% of the price) on top of your down payment -- reserve that cash separately from your emergency fund.",
      "Adding just $50 per month in extra principal on the $160,000, 7.40% loan pays the note off about four years early and saves on the order of $39,000 in interest over the life of the loan.",
    ],
    keyResults: [
      { label: "Loan Amount (20% down)", value: "$160,000" },
      { label: "Monthly P&I", value: "$1,108" },
      { label: "Total Interest (30 yr)", value: "$238,811" },
      { label: "Total Cost (down + payments)", value: "$438,811" },
      { label: "Required Income (28% rule)", value: "$47,477/yr" },
    ],
    comparisonNote:
      "Compared to the $300,000 tier, a $200,000 home cuts monthly P&I by $554 ($1,108 vs $1,662 at 7.40%) and lowers total 30-year interest by $119,405 ($238,811 vs $358,216). Required income under the 28% rule falls from $71,216 to $47,477. You trade square footage and school-district choice for a payment that fits more single-earner and first-time budgets.",
    faq: [
      {
        q: "What first-time buyer programs work best at the $200,000 price point?",
        a: "State housing finance agencies often target homes below local median prices, which still includes many $200,000 listings in Ohio, Indiana, Alabama, and similar markets. FHA allows 3.5% down ($7,000 on a $200,000 home) with a 2026 floor limit of $541,287 in standard counties. USDA zero-down loans may apply in eligible rural tracts. Check your state HFA for income caps and location rules before you write an offer.",
      },
      {
        q: "Do I need PMI on a $200,000 mortgage?",
        a: "With 20% down ($40,000), a conventional loan avoids PMI. At 10% down ($20,000), expect PMI near $90 to $130 per month on a $180,000 balance until you reach 20% equity through payments or appraisal. FHA loans require upfront and annual mortgage insurance regardless of down payment size, though the down payment can be as low as 3.5%.",
      },
      {
        q: "Which U.S. markets still have quality homes near $200,000?",
        a: "Metros such as Cleveland, Memphis, Birmingham, and Wichita still list move-in-ready single-family homes between $180,000 and $220,000. Smaller cities in the Carolinas and Great Lakes often have newer suburban inventory under $200,000. Major coastal job centers rarely offer detached homes at this price except for condos or major fixer-uppers.",
      },
      {
        q: "Is a 15-year term realistic on a $200,000 home?",
        a: "A 15-year loan on the $160,000 balance at the 6.71% PMMS average runs about $1,412 per month -- roughly $304 more than the $1,108 thirty-year payment at 7.40%. That higher payment needs income near $60,500 under the 28% rule but saves about $144,600 in total interest. It fits buyers with stable W-2 income and limited other debt.",
      },
    ],
  },
  {
    slug: "300000",
    lastUpdated: "2026-10-20",
    title: "$300,000 Mortgage Calculator — Monthly Payment & Amortization",
    description:
      "Run a $300,000 mortgage at the 7.40% PMMS 30-year average with 20% down. Compare terms, total interest, required income, and amortization schedule.",
    defaults: { homePrice: "300000", downPayment: "60000" },
    intro:
      "Three hundred thousand dollars sits below the national median existing-home price ($417,500 in September 2026, per NAR) but matches what many buyers pay in suburban Raleigh, Columbus, San Antonio, and similar metros. Putting 20% down ($60,000) leaves a $240,000 loan with no conventional PMI. The calculator defaults to 7.40%, the Freddie Mac PMMS 30-year average for the week of October 15, 2026, so you can see principal-and-interest costs before taxes and insurance.",
    tips: [
      "A $240,000 loan at 7.40% over 30 years -- the Freddie Mac PMMS average for the week of Oct. 15, 2026 -- yields about $1,662 in monthly P&I. Gross income of at least $71,200 per year keeps that payment near the 28% housing benchmark.",
      "With 10% down ($30,000), the loan becomes $270,000 (about $1,869 per month at 7.40%) and PMI often adds $110 to $160 per month until you have 20% equity.",
      "If rates fall back toward the year-ago PMMS level of 6.27%, refinancing a $240,000 balance from 7.40% to 6.27% would cut P&I by about $181 per month and trim total interest by tens of thousands over a fresh 30-year term -- weigh closing costs before you apply.",
      "Property taxes on a $300,000 home might run $1,800 per year in low-tax Alabama or above $6,000 in parts of Texas, New Jersey, or Illinois; at a 1.2% effective rate, budget about $300 per month.",
      "Gift funds for part of the $60,000 down payment are allowed on most conventional loans, but the donor must sign a gift letter and you must document the transfer -- ask your loan officer before you move money.",
    ],
    keyResults: [
      { label: "Loan Amount (20% down)", value: "$240,000" },
      { label: "Monthly P&I", value: "$1,662" },
      { label: "Total Interest (30 yr)", value: "$358,216" },
      { label: "Total Cost (down + payments)", value: "$658,216" },
      { label: "Required Income (28% rule)", value: "$71,216/yr" },
    ],
    comparisonNote:
      "The $300,000 tier sits between the $200,000 and $400,000 brackets: you pay $554 more per month in P&I than the $200K tier ($1,662 vs $1,108) and $554 less than the $400K tier ($2,216). Total interest of $358,216 is $119,405 above a $200K loan and $119,406 below a $400K loan at the same 7.40% rate. It is a practical middle ground for dual-income households near the U.S. earnings median.",
    faq: [
      {
        q: "Is $300,000 still a typical budget in 2026?",
        a: "The national median existing-home price reached $417,500 in September 2026, so $300,000 buys below the nationwide midpoint but aligns with many secondary metros. Three-bedroom suburban homes in Raleigh, Columbus, and Phoenix outskirts often list between $280,000 and $320,000. In San Francisco or Manhattan, $300,000 usually means a small condo or a long commute.",
      },
      {
        q: "How much should I budget for property taxes on a $300,000 home?",
        a: "Annual taxes might be near $1,800 where effective rates are 0.6% or above $6,000 where rates exceed 2%. A 1.2% effective rate implies about $3,600 per year ($300 per month) on top of P&I. Always review the seller's current tax bill and any homestead exemptions before you close.",
      },
      {
        q: "What down payment strategy makes sense at $300,000?",
        a: "Twenty percent down ($60,000) avoids PMI and minimizes long-term cost on a conventional loan at 7.40%. Ten percent down ($30,000) lowers upfront cash by $30,000 but adds PMI and raises the loan to $270,000. FHA at 3.5% down ($10,500) helps lower credit scores but carries FHA mortgage insurance for most of the loan term when you put less than 10% down.",
      },
      {
        q: "Can a single income support a $300,000 mortgage?",
        a: "At 7.40% with 20% down, the $1,662 P&I alone requires about $71,216 in gross income under the 28% rule. Adding $500 to $700 per month for taxes and insurance pushes all-in housing cost above $2,100, so many lenders prefer income closer to $85,000 to $90,000 for comfortable approval. Dual earners combined near $100,000 often qualify with moderate other debt.",
      },
    ],
  },
  {
    slug: "400000",
    lastUpdated: "2026-10-20",
    title: "Mortgage Calculator for a $400,000 Home",
    description:
      "Model a $400,000 purchase with 20% down at the 7.40% Freddie Mac 30-year average. Compare P&I, lifetime interest, and 15-year term savings.",
    defaults: { homePrice: "400000", downPayment: "80000" },
    intro:
      "At $400,000 you are shopping move-up suburbs in Denver, Nashville, Portland, and similar markets -- often a four-bedroom home with stronger schools than the $300,000 tier. Twenty percent down ($80,000) keeps the loan at $320,000, still well under the 2026 baseline conforming limit of $832,750. The pre-filled rate is 7.40%, the Freddie Mac PMMS 30-year average for the week of October 15, 2026.",
    tips: [
      "Monthly P&I on a $320,000 loan at 7.40% for 30 years is about $2,216. The 28% rule points to gross income near $95,000 per year before taxes and insurance.",
      "Over 30 years at 7.40%, total interest on that $320,000 loan runs about $477,600 -- meaning you repay roughly 1.5 times the original principal in interest alone.",
      "A 15-year payoff on the same $320,000 balance at the 6.71% PMMS 15-year average costs about $2,825 per month but saves on the order of $226,000 in interest versus the 30-year schedule at 7.40%.",
      "Budget $8,000 to $16,000 for closing costs plus $500 to $800 for inspection and appraisal on a $400,000 contract -- about 2% to 4% of the purchase price.",
      "Buying one discount point (1% of the loan, or $3,200) to cut the rate by 0.25% (from 7.40% to 7.15%) saves about $54 per month on P&I and breaks even in roughly five years if you keep the loan.",
    ],
    keyResults: [
      { label: "Loan Amount (20% down)", value: "$320,000" },
      { label: "Monthly P&I", value: "$2,216" },
      { label: "Total Interest (30 yr)", value: "$477,622" },
      { label: "Total Cost (down + payments)", value: "$877,622" },
      { label: "Required Income (28% rule)", value: "$94,955/yr" },
    ],
    comparisonNote:
      "Moving from $300,000 to $400,000 adds $554 per month to P&I ($2,216 vs $1,662 at 7.40%) and $119,406 in total interest over 30 years. Compared with the $500,000 tier, you pay $554 less per month and borrow $80,000 less while staying far below the $832,750 conforming cap. This bracket often unlocks four-bedroom layouts and higher-rated school zones in competitive suburbs.",
    faq: [
      {
        q: "What kind of home does $400,000 buy in move-up markets?",
        a: "In Denver, Nashville, Atlanta suburbs, and Portland, $400,000 often buys a 2,000 to 2,500 square foot single-family home built since the 1990s with a two-car garage. In coastal high-cost metros the same budget may mean a three-bedroom townhouse or a home needing updates. Inventory quality varies block by block, so tour several neighborhoods before you anchor on price alone.",
      },
      {
        q: "How do school district ratings affect a $400,000 purchase?",
        a: "Top-rated districts can command a 10% to 20% premium over adjacent zones. A $400,000 listing in a highly rated district might offer 300 to 500 fewer square feet than a similar home one attendance zone away. Use GreatSchools and local test data, but visit schools in person if education is your primary driver.",
      },
      {
        q: "When does refinancing make sense on a $400,000 mortgage?",
        a: "Refinancing a $320,000 balance usually requires a rate drop of at least 0.75% and a stay of three or more years to recover $8,000 to $12,000 in closing costs. Moving from 7.40% to 6.65% saves about $161 per month in P&I on this balance. Run your break-even month count before you pay for a new appraisal and title work.",
      },
      {
        q: "Is a 15-year mortgage worth the higher payment at $400,000?",
        a: "The 15-year payment near $2,825 at 6.71% is about $609 more than the $2,216 thirty-year payment at 7.40%. That gap implies income near $121,000 under the 28% rule versus $95,000 for the 30-year loan. You save roughly $226,000 in total interest if you can sustain the higher payment without cutting retirement or emergency savings.",
      },
    ],
  },
  {
    slug: "500000",
    lastUpdated: "2026-10-20",
    title: "Mortgage Calculator for a $500,000 Home",
    description:
      "Plan a $500,000 home with 20% down at the 7.40% PMMS benchmark. See monthly P&I, total interest, biweekly savings, and 2026 conforming headroom.",
    defaults: { homePrice: "500000", downPayment: "100000" },
    intro:
      "Half a million dollars buys established neighborhoods in Minneapolis, Charlotte, Sacramento, and comparable metros -- single-family homes with room for a growing household. With 20% down ($100,000), the $400,000 loan sits far below the 2026 baseline conforming limit of $832,750 in most counties. The calculator uses 7.40%, the Freddie Mac PMMS 30-year average for the week of October 15, 2026, as its starting rate.",
    tips: [
      "A $400,000 loan at 7.40% over 30 years produces about $2,770 in monthly P&I. Plan on gross household income near $118,700 per year to satisfy the 28% housing guideline before taxes and insurance.",
      "Total interest over 30 years at 7.40% reaches about $597,000 on a $400,000 loan -- more than the original principal -- which makes extra payments or a shorter term worth modeling.",
      "Paying half the monthly P&I every two weeks (biweekly) adds one full payment per year and can retire the loan about six years early, saving on the order of $148,000 in interest at this balance and rate.",
      "If you are rolling sale proceeds from a prior home into the $100,000 down payment, line up your closing dates so you are not paying bridge interest on a short-term loan.",
      "Homeowners insurance on a $500,000 property often runs $2,500 to $4,500 per year depending on wind, hail, and liability limits -- collect three quotes before you bind coverage at closing.",
    ],
    keyResults: [
      { label: "Loan Amount (20% down)", value: "$400,000" },
      { label: "Monthly P&I", value: "$2,770" },
      { label: "Total Interest (30 yr)", value: "$597,027" },
      { label: "Total Cost (down + payments)", value: "$1,097,027" },
      { label: "Required Income (28% rule)", value: "$118,694/yr" },
    ],
    comparisonNote:
      "The $500,000 tier costs $554 more per month in P&I than a $400,000 home ($2,770 vs $2,216 at 7.40%) but $1,384 less than the $750,000 tier ($4,154). Total interest of $597,027 is $119,405 above the $400K loan and $298,513 below the $600K loan on a $750K purchase. Your $400,000 note remains conforming nationwide, avoiding jumbo pricing unless you put less down on a much higher purchase price.",
    faq: [
      {
        q: "How close is a $500,000 mortgage to the jumbo loan threshold?",
        a: "With 20% down, the $400,000 loan is far below the 2026 baseline conforming limit of $832,750. Even with 10% down ($50,000), the $450,000 loan still qualifies as conforming in standard counties. Jumbo rates typically apply only when the loan exceeds your county limit -- up to $1,249,125 in designated high-cost areas -- which usually means a purchase well above $1 million with 20% down in baseline counties.",
      },
      {
        q: "What premium markets commonly list homes at $500,000?",
        a: "Minneapolis, Charlotte, Sacramento, and Austin suburbs often show detached homes between $475,000 and $525,000 with three to four bedrooms. These metros combine job growth with prices below coastal cores. In the Bay Area or Manhattan, $500,000 generally limits you to smaller condos or properties needing major renovation.",
      },
      {
        q: "How much do biweekly payments save on a $500,000 mortgage?",
        a: "Biweekly half-payments on a $400,000 balance at 7.40% equate to 13 full payments per year. That schedule can shorten a 30-year payoff by about six years and save roughly $148,000 in interest compared with strict monthly payments. Confirm whether your servicer credits biweekly payments immediately or holds them in escrow before you enroll.",
      },
      {
        q: "What closing costs should I expect on a $500,000 purchase?",
        a: "Expect 2% to 3% of the price in closing costs -- $10,000 to $15,000 -- covering lender fees, title, appraisal, recording, and prepaid taxes or insurance. Add $500 to $800 for the inspection and any immediate repairs the seller will not cover. Cash-to-close equals down payment plus those charges minus seller credits.",
      },
    ],
  },
  {
    slug: "750000",
    lastUpdated: "2026-10-20",
    title: "Mortgage Calculator for a $750,000 Home",
    description:
      "Crunch a $750,000 purchase with $150,000 down at 7.40%. See monthly P&I, 2026 conforming limits, jumbo thresholds, and lifetime interest totals.",
    defaults: { homePrice: "750000", downPayment: "150000" },
    intro:
      "A $750,000 purchase targets competitive suburbs around Seattle, Washington D.C., Southern California inland metros, and similar high-demand corridors. With 20% down ($150,000), the $600,000 loan remains below the 2026 baseline conforming cap of $832,750 in most U.S. counties, though high-cost areas allow up to $1,249,125. The default 7.40% rate matches the Freddie Mac PMMS 30-year average for the week of October 15, 2026.",
    tips: [
      "A $600,000 loan at 7.40% over 30 years means about $4,154 in monthly P&I -- gross income above $178,000 per year is needed to keep that near the 28% housing ratio before taxes and insurance.",
      "If your loan amount exceeds the local conforming limit, jumbo rates are often 0.25% to 0.50% higher; a 0.375% premium on $600,000 adds roughly $155 per month versus a conforming 7.40% note.",
      "Total interest on $600,000 at 7.40% for 30 years exceeds $895,000; paying an extra $500 per month toward principal can retire the loan about eight years early and save on the order of $296,000 in interest.",
      "An 80-10-10 piggyback (10% down, 80% first lien, 10% second lien) can keep the first mortgage at $600,000 while avoiding PMI, but compare the second lien's rate to a single loan with mortgage insurance.",
      "Property tax bills on $750,000 homes range from about $4,500 per year in low-tax states to $15,000 or more in New Jersey or Connecticut -- verify the listing's actual tax line, not a portal estimate.",
    ],
    keyResults: [
      { label: "Loan Amount (20% down)", value: "$600,000" },
      { label: "Monthly P&I", value: "$4,154" },
      { label: "Total Interest (30 yr)", value: "$895,540" },
      { label: "Total Cost (down + payments)", value: "$1,645,540" },
      { label: "Required Income (28% rule)", value: "$178,041/yr" },
    ],
    comparisonNote:
      "Compared with the $500,000 tier, a $750,000 home adds $1,384 per month to P&I ($4,154 vs $2,770 at 7.40%) and $298,513 in total interest over 30 years. Required income under the 28% rule jumps from $118,694 to $178,041. With 20% down, the $600,000 loan stays conforming in baseline counties but falls only $232,750 below the $832,750 cap -- less down payment quickly pushes you toward jumbo pricing.",
    faq: [
      {
        q: "Does a $750,000 home with 20% down require a jumbo loan?",
        a: "No in most counties: the $600,000 loan is below the 2026 baseline conforming limit of $832,750. High-cost areas such as San Francisco or New York City use ceilings up to $1,249,125, giving even more headroom. You need a jumbo only when the loan amount exceeds the limit for your specific county.",
      },
      {
        q: "How do jumbo loan rates compare to conforming rates?",
        a: "Jumbo pricing often runs 0.25% to 0.50% above conforming rates for similar credit profiles. On a $600,000 balance, an extra 0.375% adds about $155 per month and tens of thousands in lifetime interest. Jumbo underwriters frequently require 700+ credit scores, lower debt-to-income ratios, and six to twelve months of payment reserves in liquid accounts.",
      },
      {
        q: "What is the 80-10-10 strategy for a $750,000 purchase?",
        a: "You put 10% down ($75,000), borrow 80% ($600,000) on the first mortgage, and cover the remaining 10% ($75,000) with a second lien or HELOC. The first mortgage stays at $600,000 in conforming territory while avoiding PMI. Compare the blended rate and closing costs against one conventional loan with PMI or a full jumbo if you put less than 20% down.",
      },
      {
        q: "Which high-cost areas support $750,000 home purchases?",
        a: "Outer suburbs of Seattle, Boston, and Washington D.C., plus inland Southern California metros such as Riverside, often list single-family homes near $750,000. You typically gain 500 to 800 square feet versus what $500,000 buys in the same region. Job access and commute time still vary widely, so test rush-hour drives before you commit.",
      },
    ],
  },
  {
    slug: "15-year",
    lastUpdated: "2026-10-20",
    title: "15-Year Mortgage Calculator",
    description:
      "Compare 15-year vs 30-year payments on a $350,000 home. Uses PMMS averages 6.71% (15-yr) and 7.40% (30-yr) on a $280,000 loan balance.",
    defaults: {
      homePrice: "350000",
      downPayment: "70000",
      loanTerm: "15",
      interestRate: "6.71",
    },
    intro:
      "A 15-year fixed mortgage trades a higher monthly payment for a lower interest rate and a much shorter path to owning the home outright. This scenario uses a $350,000 purchase with 20% down ($70,000), leaving a $280,000 loan. The pre-filled 15-year rate is 6.71%, the Freddie Mac PMMS average for the week of October 15, 2026; we compare it with a 30-year schedule at 7.40%, the PMMS thirty-year average for the same week.",
    tips: [
      "On the $280,000 balance, 7.40% over 30 years costs about $1,939 per month in P&I, while 6.71% over 15 years costs about $2,472 -- a $533 monthly step-up for the shorter term.",
      "Total interest drops from about $417,900 on the 30-year path to about $164,900 on the 15-year path, a savings of roughly $253,000 over the life of the loan.",
      "After five years, the 15-year loan at 6.71% pays down about $64,400 in principal versus roughly $15,300 on the 30-year loan at 7.40% -- a $49,000 equity gap if you need to sell or refinance.",
      "Before you choose the 15-year payment, confirm you can still fund 401(k) matches and keep three to six months of expenses in cash after closing.",
      "If the $533 payment jump feels tight, take the 30-year loan at 7.40% and add voluntary principal prepayments when bonuses arrive -- you keep flexibility without locking into the higher required payment.",
    ],
    keyResults: [
      { label: "30-Year Monthly P&I (7.40%)", value: "$1,939" },
      { label: "15-Year Monthly P&I (6.71%)", value: "$2,472" },
      { label: "Monthly Payment Difference", value: "$533" },
      { label: "30-Year Total Interest", value: "$417,919" },
      { label: "15-Year Total Interest", value: "$164,877" },
      { label: "Interest Saved (15-year)", value: "$253,041" },
    ],
    comparisonNote:
      "On the $280,000 loan ($350,000 home with 20% down), the 15-year payment at 6.71% costs $533 more per month than the 30-year payment at 7.40% but saves $253,041 in total interest. The rate spread (0.69 percentage points in this PMMS snapshot) reflects the shorter term's lower risk to lenders. After five years, principal paydown on the 15-year note exceeds the 30-year path by about $49,000.",
    faq: [
      {
        q: "When does a 15-year mortgage make financial sense?",
        a: "It works when the $2,472 payment at 6.71% still keeps housing near 28% of gross income -- about $105,900 per year -- and you have stable W-2 earnings with limited car or student debt. The 30-year option at 7.40% needs only about $83,100 in income for the $1,939 P&I. The $253,041 interest savings matter most if you stay at least seven to ten years.",
      },
      {
        q: "How much of a rate discount do 15-year mortgages typically offer?",
        a: "Freddie Mac's PMMS for the week of October 15, 2026 shows 6.71% on 15-year fixed loans versus 7.40% on 30-year fixed -- a 0.69-point spread. Lenders often price 15-year notes 0.50% to 0.75% below 30-year notes because the shorter maturity reduces their duration risk. Compare APRs, not rate alone, because closing costs differ by lender.",
      },
      {
        q: "Can I switch from a 30-year to a 15-year mortgage later?",
        a: "You may refinance into a 15-year loan anytime, but expect closing costs of 2% to 3% on the remaining balance. Refinancing pays off when rates fall or your income rises enough to absorb the higher payment. Keeping a 30-year note and prepaying principal mimics much of the savings while preserving lower mandatory payments during job transitions.",
      },
      {
        q: "How quickly does a 15-year mortgage build equity?",
        a: "After five years on the $280,000 loan, principal paydown near $64,400 at 6.71% over 15 years beats the roughly $15,300 paid down on a 30-year loan at 7.40%. By year ten on the 15-year schedule you own well over half the home outright. That equity cushion helps if you need a HELOC, downsize, or absorb a job move.",
      },
    ],
  },
  {
    slug: "fha-loan",
    lastUpdated: "2026-10-20",
    title: "FHA Loan Calculator (3.5% Down Payment)",
    description:
      "FHA math on a $300,000 home with 3.5% down. P&I at 7.40% on the base loan, plus 1.75% upfront MIP and annual MIP per HUD premium tables.",
    defaults: { homePrice: "300000", downPayment: "10500" },
    intro:
      "FHA loans let qualified borrowers buy with as little as 3.5% down and credit scores starting at 580 for that minimum down payment. On a $300,000 home, 3.5% down is $10,500, leaving a $289,500 base loan before mortgage insurance. The calculator's P&I uses 7.40%, the Freddie Mac PMMS 30-year average for the week of October 15, 2026, on that base balance; FHA also charges upfront and annual mortgage insurance premiums per HUD Handbook 4000.1.",
    tips: [
      "With 3.5% down, the $289,500 base loan at 7.40% over 30 years produces about $2,004 in monthly P&I before FHA mortgage insurance -- the same figure the pre-filled calculator shows because it uses price minus down payment.",
      "HUD charges an upfront MIP of 1.75% on the base loan ($5,066 on $289,500). Most buyers finance it into the note, raising the balance to $294,566 and P&I to about $2,040 per month at 7.40%.",
      "Annual MIP on a 30-year FHA loan with less than 5% down is 0.55% of the base loan amount, adding about $133 per month on $289,500 for the life of the loan unless you refinance out.",
      "FHA forward limits for 2026 range from a $541,287 floor to a $1,249,125 ceiling for one-unit homes, so a $300,000 purchase is eligible in standard counties -- confirm your county on HUD's mortgage limits lookup.",
      "State down payment assistance programs often pair with FHA, covering part or all of the 3.5% ($10,500) requirement through grants or silent second liens with income and purchase-price caps.",
    ],
    keyResults: [
      { label: "Down Payment (3.5%)", value: "$10,500" },
      { label: "Base Loan Amount", value: "$289,500" },
      { label: "Monthly P&I (7.40%)", value: "$2,004" },
      { label: "Monthly MIP (0.55%)", value: "$133" },
      { label: "Total Monthly Payment", value: "$2,137" },
      { label: "Upfront MIP (1.75%)", value: "$5,066" },
    ],
    comparisonNote:
      "FHA lets you buy a $300,000 home with $10,500 down instead of the $60,000 needed for conventional 20% down, keeping $49,500 in cash at closing. The all-in payment of about $2,137 (P&I plus MIP at 7.40%) runs $475 per month above the $1,662 conventional P&I on a $240,000 loan. Over 30 years, annual MIP near $133 per month plus $5,066 upfront adds tens of thousands in insurance cost that a 20% conventional down payment avoids.",
    faq: [
      {
        q: "What are the FHA loan limits for a $300,000 purchase?",
        a: "For case numbers assigned on or after January 1, 2026, FHA's nationwide floor for a one-unit home is $541,287 and the ceiling is $1,249,125 in high-cost counties. A $300,000 price falls comfortably within standard limits. Alaska, Hawaii, Guam, and the U.S. Virgin Islands use higher special exception ceilings published in HUD Mortgagee Letter 2025-23.",
      },
      {
        q: "Can FHA mortgage insurance (MIP) ever be removed?",
        a: "With less than 10% down, annual MIP generally lasts the full 30-year term with no cancellation based on equity alone. Put 10% or more down and MIP may cancel after 11 years on loans with terms over 15 years. Most borrowers with 3.5% down eventually refinance into a conventional loan once they reach 20% equity and can drop FHA insurance entirely.",
      },
      {
        q: "What credit score do I need for an FHA loan on a $300,000 home?",
        a: "FHA requires at least 580 for 3.5% down ($10,500 here). Scores from 500 to 579 need 10% down ($30,000). Many lenders impose overlays near 620 for smoother underwriting even though FHA's minimum is lower. Your rate still tracks market averages such as the 7.40% PMMS benchmark unless you buy discount points.",
      },
      {
        q: "How does the upfront MIP affect my FHA loan balance?",
        a: "Upfront MIP is 1.75% of the $289,500 base, or $5,066. Financed into the loan, the balance becomes $294,566 (rounded per FHA rules) and P&I at 7.40% rises from about $2,004 to about $2,040 per month -- roughly $35 more than the base-loan payment shown in the calculator. Paying UFMIP in cash at closing avoids increasing the amortized balance but raises cash-to-close.",
      },
    ],
  },
];
