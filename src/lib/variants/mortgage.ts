export interface CalculatorVariant {
  slug: string;
  title: string;
  description: string;
  defaults: Record<string, string>;
  intro: string;
  tips: string[];
}

export const mortgageVariants: CalculatorVariant[] = [
  {
    slug: "200000",
    title: "$200,000 Mortgage Calculator — Monthly Payment & Total Interest",
    description:
      "Calculate your monthly payment on a $200,000 mortgage. With 20% down at 6.5%, expect ~$1,011/mo. Compare 15- vs 30-year terms, see total interest, and view the full amortization schedule.",
    defaults: { homePrice: "200000", downPayment: "40000" },
    intro:
      "A $200,000 home is an attainable entry point in many mid-size American cities and rural markets. First-time buyers in the Midwest, South, and parts of the Mountain West frequently land in this price range. With a 20% down payment of $40,000, you can avoid PMI entirely and keep your monthly obligation manageable on a single median income.",
    tips: [
      "At 6.5% with 20% down ($40,000), your monthly principal and interest payment would be roughly $1,011 on a 30-year loan -- well within the 28% affordability threshold for a $55,000 household income.",
      "If you can only put 10% down ($20,000), expect to add approximately $75-$135 per month in PMI until you reach 20% equity.",
      "Choosing a 15-year term on a $160,000 loan raises the payment to about $1,394 but saves over $75,000 in total interest compared to a 30-year mortgage.",
      "At this price point, closing costs typically run $4,000 to $8,000 -- budget roughly 2% to 4% of the home price on top of your down payment.",
      "Even an extra $50 per month toward principal on a $160,000 loan at 6.5% shortens the payoff by nearly 4 years and saves about $27,000 in interest.",
    ],
  },
  {
    slug: "300000",
    title: "$300,000 Mortgage Calculator — Monthly Payment & Amortization",
    description:
      "Run the numbers on a $300,000 home loan. With 20% down at 6.5%, your monthly P&I is ~$1,517. Compare loan terms, see total interest costs, and view the full amortization schedule.",
    defaults: { homePrice: "300000", downPayment: "60000" },
    intro:
      "The $300,000 price point sits close to the national median and represents the most common purchase bracket for American homebuyers. Suburban neighborhoods in growing metro areas like Raleigh, Columbus, and San Antonio frequently list homes in this range. A 20% down payment of $60,000 keeps your loan at $240,000 and eliminates the need for private mortgage insurance.",
    tips: [
      "A $240,000 loan at 6.5% over 30 years produces a monthly P&I payment of about $1,517 -- you would need a gross monthly income of at least $5,418 to stay under the 28% housing ratio.",
      "Putting 10% down ($30,000) instead of 20% increases your loan to $270,000 and adds roughly $113-$169 per month in PMI, raising your effective housing cost to around $1,820.",
      "Refinancing from a 6.5% to a 5.5% rate on a $240,000 balance would save approximately $160 per month and about $57,600 over the remaining life of a 30-year loan.",
      "Property taxes vary widely at this price: expect around $2,500 per year in states like Alabama but upwards of $6,000 in Texas or New Jersey.",
      "If you split the $60,000 down payment between savings and a gift from family, confirm with your lender that you have a proper gift letter to avoid underwriting delays.",
    ],
  },
  {
    slug: "400000",
    title: "Mortgage Calculator for a $400,000 Home",
    description:
      "Run the numbers on a $400,000 home purchase. Compare monthly payments, interest costs, and down payment scenarios for this popular price bracket.",
    defaults: { homePrice: "400000", downPayment: "80000" },
    intro:
      "At $400,000 you are shopping in the upper tier of suburban markets and competitive metro neighborhoods across cities like Denver, Nashville, and Portland. This price bracket often delivers move-up homes with extra bedrooms or desirable school districts. A 20% down payment of $80,000 keeps your loan at $320,000 and eliminates PMI, though accumulating that down payment typically requires several years of disciplined saving.",
    tips: [
      "Your monthly P&I on a $320,000 loan at 6.5% for 30 years comes to approximately $2,023 -- the 28% rule suggests you need a household gross income of at least $7,225 per month ($86,700 annually).",
      "Over 30 years at 6.5%, you will pay roughly $408,000 in total interest on top of the $320,000 principal -- nearly doubling the total cost of the home.",
      "Opting for a 15-year term raises the monthly payment to about $2,789 but cuts total interest to approximately $182,000, a savings of over $226,000.",
      "At this price you should budget $8,000-$16,000 for closing costs, plus $1,500-$3,500 for a home inspection and appraisal.",
      "Consider rate buydown points: paying 1% of the loan ($3,200) upfront typically reduces your rate by 0.25%, saving about $55 per month and paying for itself in under 5 years.",
    ],
  },
  {
    slug: "500000",
    title: "Mortgage Calculator for a $500,000 Home",
    description:
      "Plan your budget for a $500,000 home. Calculate monthly payments, total interest, and explore how different loan terms change your costs.",
    defaults: { homePrice: "500000", downPayment: "100000" },
    intro:
      "Half-a-million dollars opens up single-family homes in established metro neighborhoods, newer-construction suburbs near major employment hubs, and premium school districts. This is a common price point in markets like Minneapolis, Charlotte, and Sacramento. A 20% down payment of $100,000 is a substantial commitment, and many buyers at this level draw on a mix of savings, home equity from a previous sale, and investment accounts.",
    tips: [
      "A $400,000 loan at 6.5% over 30 years results in a monthly payment of about $2,528 -- to stay within the 28% guideline you need a gross household income of roughly $108,350 per year.",
      "Total interest over the full 30-year term at 6.5% would exceed $510,000, meaning you pay more in interest than the original loan amount -- a powerful argument for accelerated payments.",
      "Making biweekly payments instead of monthly effectively adds one extra payment per year, shortening your payoff timeline by about 4-5 years and saving approximately $95,000 in interest.",
      "If you are selling a previous home, timing the sale proceeds with your new closing date can eliminate the need to bridge-finance your $100,000 down payment.",
      "Homeowners insurance at this price typically runs $2,500-$4,500 per year depending on location and coverage -- shop at least three carriers before settling.",
    ],
  },
  {
    slug: "750000",
    title: "Mortgage Calculator for a $750,000 Home",
    description:
      "Crunch the numbers on a $750,000 home. See monthly payments, interest totals, and how loan size affects your long-term financial plan.",
    defaults: { homePrice: "750000", downPayment: "150000" },
    intro:
      "A $750,000 purchase places you in competitive coastal and high-growth markets -- think outer suburbs of the Bay Area, parts of Southern California, metro Washington D.C., and the greater Seattle area. At this level, loan amounts approach or exceed the conforming limit ($766,550 in 2024 for most counties), so securing favorable conventional terms with a full 20% down payment of $150,000 is especially important to avoid jumbo loan pricing.",
    tips: [
      "A $600,000 loan at 6.5% over 30 years means a monthly P&I of roughly $3,793 -- you would need a gross household income above $162,500 per year to meet the 28% affordability rule.",
      "If your loan exceeds the conforming limit, jumbo rates are often 0.25%-0.50% higher and lenders typically require larger reserves (6-12 months of payments in liquid assets).",
      "Total interest on a $600,000 loan at 6.5% for 30 years tops $765,000 -- paying an additional $500 per month toward principal saves approximately $192,000 in interest and pays off the loan 7 years early.",
      "At this price point, consider an 80-10-10 piggyback strategy: 80% first mortgage, 10% HELOC, 10% down -- this avoids both PMI and jumbo territory on the primary loan.",
      "Property tax bills for $750,000 homes range from around $3,750 per year in low-tax states to $15,000 or more in high-tax states like New Jersey and Connecticut.",
    ],
  },
  {
    slug: "15-year",
    title: "15-Year Mortgage Calculator",
    description:
      "Compare 15-year vs 30-year mortgage payments. See how a shorter term saves you money on interest while building equity faster.",
    defaults: { homePrice: "350000", downPayment: "70000", loanTerm: "15" },
    intro:
      "A 15-year mortgage is the fastest conventional path to full homeownership. You will pay significantly more each month compared to a 30-year term, but in return you build equity at an accelerated pace, typically secure a lower interest rate, and pay far less in total interest. This option is best suited for buyers with stable high incomes who can absorb the larger payment without sacrificing retirement contributions or emergency reserves.",
    tips: [
      "On a $280,000 loan, a 15-year term at 5.9% (typical 0.5-0.75% discount vs. 30-year rates) produces a monthly payment of roughly $2,364 -- about $598 more per month than a 30-year at 6.5%.",
      "Total interest on the 15-year term would be approximately $145,500 compared to over $357,000 on a 30-year -- a savings of more than $211,000 over the life of the loan.",
      "After just 5 years on a 15-year mortgage, you will have paid down roughly $78,000 in principal versus only about $22,000 on a 30-year -- giving you substantially more equity if you need to sell or refinance.",
      "Before committing to a 15-year term, ensure you still have room to max out 401(k) contributions and maintain 3-6 months of living expenses in an emergency fund.",
      "If the higher payment feels tight, consider taking the 30-year loan but making extra payments equivalent to the 15-year amount -- this preserves flexibility while still accelerating payoff.",
    ],
  },
  {
    slug: "fha-loan",
    title: "FHA Loan Calculator (3.5% Down Payment)",
    description:
      "Calculate FHA loan payments with just 3.5% down. Understand how mortgage insurance premiums affect your monthly cost on an FHA mortgage.",
    defaults: { homePrice: "300000", downPayment: "10500" },
    intro:
      "FHA loans backed by the Federal Housing Administration let buyers enter the market with as little as 3.5% down and more lenient credit requirements (minimum 580 score for 3.5% down). This makes homeownership accessible for first-time buyers, those rebuilding credit, or anyone who hasn't been able to save a traditional 20% down payment. The trade-off is mandatory mortgage insurance -- both an upfront premium and an ongoing annual premium.",
    tips: [
      "With 3.5% down on a $300,000 home, your loan amount is $289,500 -- monthly P&I at 6.5% over 30 years comes to about $1,830, but FHA mortgage insurance adds roughly $160-$190 per month.",
      "FHA requires an upfront mortgage insurance premium (UFMIP) of 1.75% of the loan amount ($5,066 on a $289,500 loan), which is typically rolled into the loan balance.",
      "Unlike conventional PMI, FHA annual mortgage insurance premiums (MIP) cannot be removed for the life of the loan if you put less than 10% down -- the only way to eliminate it is to refinance into a conventional loan once you reach 20% equity.",
      "FHA loan limits vary by county: the floor is $498,257 and the ceiling is $1,149,825 in high-cost areas (2024 figures) -- check your county's specific limit before house-hunting.",
      "Many first-time buyers pair FHA loans with state down payment assistance programs that provide grants or forgivable second mortgages covering part or all of the 3.5% requirement.",
    ],
  },
];
