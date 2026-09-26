import type { CalculatorVariant } from "./types";
export type { CalculatorVariant };

export const mortgageVariants: CalculatorVariant[] = [
  {
    slug: "200000",
    lastUpdated: "2026-08-19",
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
    keyResults: [
      { label: "Loan Amount (20% down)", value: "$160,000" },
      { label: "Monthly P&I", value: "$1,011" },
      { label: "Total Interest (30 yr)", value: "$204,071" },
      { label: "Total Cost (down + payments)", value: "$404,071" },
      { label: "Required Income (28% rule)", value: "$43,342/yr" },
    ],
    comparisonNote:
      "Compared to a $300,000 home, the $200,000 tier cuts your monthly P&I by $506 ($1,011 vs $1,517) and saves $102,036 in total interest over 30 years. You give up roughly one bedroom and limited school-district options, but the required income drops from $65,013 to $43,342 under the 28% rule.",
    faq: [
      {
        q: "What first-time buyer programs work best at the $200,000 price point?",
        a: "Many state housing finance agencies offer down payment assistance and below-market rates for homes under local median price limits, which often includes $200,000 properties in Midwest and Southern markets. FHA loans with 3.5% down require just $7,000 upfront on a $200,000 home, and USDA zero-down loans are available in eligible rural areas at this price. Check your state's HFA website for income limits and property location requirements.",
      },
      {
        q: "Do I need PMI on a $200,000 mortgage?",
        a: "With 20% down ($40,000), you avoid PMI entirely on a conventional loan. If you put down 10% ($20,000), expect PMI of roughly $75 to $135 per month until you reach 20% equity through payments or appreciation. FHA loans always require mortgage insurance regardless of down payment amount.",
      },
      {
        q: "Which U.S. markets still have quality homes near $200,000?",
        a: "Cities like Cleveland, Memphis, Birmingham, and Wichita regularly list move-in-ready single-family homes in the $180,000 to $220,000 range. Smaller metros in Ohio, Indiana, and the Carolinas also offer newer construction under $200,000 in suburban areas. Coastal and major West Coast markets rarely have inventory at this price outside of condos or fixer-uppers.",
      },
      {
        q: "Is a 15-year term realistic on a $200,000 home?",
        a: "A 15-year loan on the $160,000 balance at 5.9% runs about $1,342 per month, roughly $331 more than the 30-year payment. That higher payment requires a household income near $57,500 under the 28% rule but saves over $122,000 in total interest. It is a strong option if you have stable income and limited other debt obligations.",
      },
    ],
  },
  {
    slug: "300000",
    lastUpdated: "2026-08-19",
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
    keyResults: [
      { label: "Loan Amount (20% down)", value: "$240,000" },
      { label: "Monthly P&I", value: "$1,517" },
      { label: "Total Interest (30 yr)", value: "$306,107" },
      { label: "Total Cost (down + payments)", value: "$606,107" },
      { label: "Required Income (28% rule)", value: "$65,013/yr" },
    ],
    comparisonNote:
      "The $300,000 tier sits between the $200,000 and $400,000 brackets: you pay $506 more per month than the $200K tier but $506 less than the $400K tier. Total interest over 30 years is $306,107, which is $102,036 more than a $200K loan but $102,035 less than a $400K loan. This price point aligns closely with the national median and represents the most common purchase range for American buyers.",
    faq: [
      {
        q: "Is $300,000 still considered a median-price home in 2024?",
        a: "Yes. The national median existing-home sale price has hovered near $400,000 recently, but $300,000 remains the practical median for many suburban and secondary metro markets. Cities like Raleigh, Columbus, San Antonio, and Phoenix suburbs frequently list three-bedroom homes in the $280,000 to $320,000 range. In high-cost coastal markets, $300,000 typically buys a condo or requires a longer commute.",
      },
      {
        q: "How much should I budget for property taxes on a $300,000 home?",
        a: "Annual property taxes on a $300,000 home range from about $1,800 in Alabama (0.6% effective rate) to $6,000 or more in Texas, New Jersey, or Illinois (2%+ effective rates). At a typical 1.2% effective rate, expect roughly $3,600 per year or $300 per month added to your housing cost. Always verify the current tax bill on a specific property before making an offer.",
      },
      {
        q: "What down payment strategy makes sense at $300,000?",
        a: "Putting 20% down ($60,000) eliminates PMI and gives you the lowest long-term cost on a conventional loan. A 10% down payment ($30,000) gets you in sooner but adds roughly $113 to $169 per month in PMI until you reach 20% equity. FHA at 3.5% down ($10,500) works for lower credit scores but carries lifetime mortgage insurance on most loans.",
      },
      {
        q: "Can a single income support a $300,000 mortgage?",
        a: "At 6.5% with 20% down, the $1,517 monthly P&I requires a gross income of at least $65,013 under the 28% housing rule. Adding estimated taxes and insurance of $500 to $700 per month pushes the all-in housing cost above $2,000, suggesting an income closer to $85,000 for comfortable affordability. Dual-income households near the U.S. median of $75,000 can often qualify with manageable debt ratios.",
      },
    ],
  },
  {
    slug: "400000",
    lastUpdated: "2026-08-19",
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
    keyResults: [
      { label: "Loan Amount (20% down)", value: "$320,000" },
      { label: "Monthly P&I", value: "$2,023" },
      { label: "Total Interest (30 yr)", value: "$408,142" },
      { label: "Total Cost (down + payments)", value: "$808,142" },
      { label: "Required Income (28% rule)", value: "$86,684/yr" },
    ],
    comparisonNote:
      "Moving from $300,000 to $400,000 adds $506 per month to your P&I ($2,023 vs $1,517) and $102,035 in total interest over 30 years. Compared to the $500,000 tier, you save $505 per month and keep your loan well under the conforming limit. The $400,000 bracket typically unlocks four-bedroom homes and stronger school districts in competitive suburban markets.",
    faq: [
      {
        q: "What kind of home does $400,000 buy in move-up markets?",
        a: "In cities like Denver, Nashville, Portland, and Atlanta suburbs, $400,000 typically gets you a four-bedroom single-family home built within the last 20 years. You can expect 2,000 to 2,500 square feet, a two-car garage, and access to well-rated public schools. In high-cost metros, this price may only reach a three-bedroom townhouse or a home requiring significant updates.",
      },
      {
        q: "How do school district ratings affect a $400,000 purchase?",
        a: "Homes zoned to top-rated school districts in the $400,000 range often command a 10% to 20% premium over similar homes in adjacent districts. A $400,000 home in a highly rated district may offer 300 to 500 fewer square feet than a comparable property in a lower-rated zone. Research GreatSchools ratings and visit schools in person before prioritizing district boundaries in your search.",
      },
      {
        q: "When does refinancing make sense on a $400,000 mortgage?",
        a: "Refinancing a $320,000 balance typically pays off when you can reduce your rate by at least 0.75% and plan to stay in the home for three or more years. Dropping from 6.5% to 5.5% saves about $206 per month and roughly $74,000 over the remaining loan term. Factor in closing costs of $8,000 to $12,000 at this loan size when calculating your break-even timeline.",
      },
      {
        q: "Is a 15-year mortgage worth the higher payment at $400,000?",
        a: "A 15-year term on the $320,000 balance at 5.9% costs about $2,683 per month, roughly $660 more than the 30-year option. That higher payment requires income near $115,000 under the 28% rule but saves over $245,000 in total interest. It suits buyers with strong cash flow who want to be mortgage-free before retirement.",
      },
    ],
  },
  {
    slug: "500000",
    lastUpdated: "2026-08-19",
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
    keyResults: [
      { label: "Loan Amount (20% down)", value: "$400,000" },
      { label: "Monthly P&I", value: "$2,528" },
      { label: "Total Interest (30 yr)", value: "$510,178" },
      { label: "Total Cost (down + payments)", value: "$1,010,178" },
      { label: "Required Income (28% rule)", value: "$108,355/yr" },
    ],
    comparisonNote:
      "The $500,000 tier costs $505 more per month than a $400,000 home ($2,528 vs $2,023) but remains $1,264 below the $750,000 tier ($3,792). Your $400,000 loan stays within conforming limits in most counties, avoiding jumbo rate premiums. Total interest of $510,178 exceeds the original loan amount, making extra principal payments especially valuable at this level.",
    faq: [
      {
        q: "How close is a $500,000 mortgage to the jumbo loan threshold?",
        a: "With 20% down, your $400,000 loan sits comfortably below the 2024 conforming limit of $766,550 in most U.S. counties. Even with only 10% down ($50,000), the resulting $450,000 loan still qualifies as conforming. Jumbo pricing typically kicks in only if you buy above roughly $957,000 with 20% down in standard-limit counties.",
      },
      {
        q: "What premium markets commonly list homes at $500,000?",
        a: "Minneapolis, Charlotte, Sacramento, and Austin suburbs regularly feature single-family homes in the $475,000 to $525,000 range. These markets offer established neighborhoods, strong employment bases, and quality school districts at a step below coastal premium pricing. In the Bay Area or Manhattan, $500,000 typically limits you to condos or homes requiring substantial renovation.",
      },
      {
        q: "How much do biweekly payments save on a $500,000 mortgage?",
        a: "Switching from monthly to biweekly payments on a $400,000 loan at 6.5% adds one full extra payment per year. This approach pays off the loan roughly 4 to 5 years early and saves approximately $95,000 in total interest. Most lenders offer a formal biweekly program, or you can manually pay half your monthly amount every two weeks.",
      },
      {
        q: "What closing costs should I expect on a $500,000 purchase?",
        a: "Closing costs on a $500,000 home typically run 2% to 3% of the purchase price, or $10,000 to $15,000. This includes lender fees, title insurance, appraisal, recording charges, and prepaid property taxes or insurance. Budget separately for a home inspection ($500 to $800) and any immediate repairs identified during the inspection period.",
      },
    ],
  },
  {
    slug: "750000",
    lastUpdated: "2026-08-19",
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
    keyResults: [
      { label: "Loan Amount (20% down)", value: "$600,000" },
      { label: "Monthly P&I", value: "$3,792" },
      { label: "Total Interest (30 yr)", value: "$765,267" },
      { label: "Total Cost (down + payments)", value: "$1,515,267" },
      { label: "Required Income (28% rule)", value: "$162,532/yr" },
    ],
    comparisonNote:
      "Compared to the $500,000 tier, a $750,000 home adds $1,264 per month to your P&I ($3,792 vs $2,528) and $255,089 in total interest over 30 years. With 20% down, the $600,000 loan remains just below the $766,550 conforming limit in most counties, but dropping below 20% down quickly pushes you into jumbo territory. Required income jumps from $108,355 to $162,532 under the 28% rule.",
    faq: [
      {
        q: "Does a $750,000 home with 20% down require a jumbo loan?",
        a: "No. With $150,000 down, your $600,000 loan falls below the 2024 conforming limit of $766,550 in most U.S. counties. High-cost areas like San Francisco, New York, and Washington D.C. have elevated limits up to $1,149,825, providing additional headroom. Jumbo loans become necessary only if your loan amount exceeds the conforming limit for your specific county.",
      },
      {
        q: "How do jumbo loan rates compare to conforming rates?",
        a: "Jumbo mortgage rates typically run 0.25% to 0.50% higher than conforming rates for the same borrower profile. On a $600,000 loan, a 0.375% rate premium adds roughly $140 per month and $50,000 in total interest over 30 years. Jumbo lenders also require stronger credit scores (typically 700+), lower debt-to-income ratios, and 6 to 12 months of payment reserves.",
      },
      {
        q: "What is the 80-10-10 strategy for a $750,000 purchase?",
        a: "An 80-10-10 piggyback loan puts 10% down ($75,000), takes an 80% first mortgage ($600,000), and covers the remaining 10% with a second mortgage or HELOC ($75,000). This structure keeps the primary loan at $600,000 in conforming territory while avoiding PMI. The second lien typically carries a higher rate, so compare the combined cost against a single jumbo or conventional loan with PMI.",
      },
      {
        q: "Which high-cost areas support $750,000 home purchases?",
        a: "Outer suburbs of San Francisco, Seattle, Boston, and Washington D.C. regularly list single-family homes near $750,000. Southern California inland metros like Riverside and San Bernardino also offer inventory at this price. These markets combine strong job growth with housing stock that exceeds what $500,000 buys in the same regions by 500 to 800 square feet.",
      },
    ],
  },
  {
    slug: "15-year",
    lastUpdated: "2026-08-19",
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
    keyResults: [
      { label: "30-Year Monthly P&I (6.5%)", value: "$1,770" },
      { label: "15-Year Monthly P&I (5.9%)", value: "$2,348" },
      { label: "Monthly Payment Difference", value: "$578" },
      { label: "30-Year Total Interest", value: "$357,125" },
      { label: "15-Year Total Interest", value: "$142,586" },
      { label: "Interest Saved (15-year)", value: "$214,539" },
    ],
    comparisonNote:
      "On a $280,000 loan ($350,000 home with 20% down), the 15-year term costs $578 more per month but saves $214,539 in total interest over the life of the loan. You also benefit from a typical 0.5% to 0.75% rate discount on 15-year mortgages (5.9% vs 6.5% shown here). After five years, a 15-year borrower has paid down roughly $78,000 in principal versus only $22,000 on a 30-year loan.",
    faq: [
      {
        q: "When does a 15-year mortgage make financial sense?",
        a: "A 15-year term works best when your housing payment stays under 28% of gross income even at the higher monthly amount, and you have stable employment with limited other debt. On a $280,000 loan, you need roughly $100,616 in annual income for the $2,348 payment versus $75,848 for the 30-year option. The $214,539 in interest savings is most valuable if you plan to stay in the home for at least seven to ten years.",
      },
      {
        q: "How much of a rate discount do 15-year mortgages typically offer?",
        a: "Lenders commonly price 15-year fixed rates 0.50% to 0.75% below comparable 30-year rates because the shorter term presents less risk. In this scenario, 5.9% on a 15-year versus 6.5% on a 30-year reflects a typical 0.60% spread. Always compare the annual percentage rate (APR) across lenders, as closing costs can offset a seemingly lower interest rate.",
      },
      {
        q: "Can I switch from a 30-year to a 15-year mortgage later?",
        a: "You can refinance from a 30-year to a 15-year loan at any time, but you will pay closing costs of 2% to 3% of the remaining balance. Refinancing makes sense when rates have dropped or your income has increased enough to absorb the higher payment. Alternatively, keeping the 30-year loan and making extra principal payments gives you similar savings with more flexibility if your finances change.",
      },
      {
        q: "How quickly does a 15-year mortgage build equity?",
        a: "After five years on a $280,000 loan at 5.9%, you will have paid down approximately $78,000 in principal compared to roughly $22,000 on a 30-year loan at 6.5%. That $56,000 equity gap gives you significantly more financial flexibility if you need to sell, refinance, or tap a home equity line. By year ten on the 15-year term, you will own more than half the home outright.",
      },
    ],
  },
  {
    slug: "fha-loan",
    lastUpdated: "2026-08-19",
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
    keyResults: [
      { label: "Down Payment (3.5%)", value: "$10,500" },
      { label: "Base Loan Amount", value: "$289,500" },
      { label: "Monthly P&I (6.5%)", value: "$1,830" },
      { label: "Monthly MIP (0.55%)", value: "$133" },
      { label: "Total Monthly Payment", value: "$1,963" },
      { label: "Upfront MIP (1.75%)", value: "$5,066" },
    ],
    comparisonNote:
      "FHA lets you buy a $300,000 home with $10,500 down instead of the $60,000 required for conventional 20% down, saving $49,500 in upfront cash. However, the total monthly cost of $1,963 (including MIP) exceeds the conventional $1,517 P&I by $446 per month. Over 30 years, FHA mortgage insurance adds roughly $47,880 in MIP premiums plus $5,066 upfront, largely offsetting the lower down payment advantage.",
    faq: [
      {
        q: "What are the FHA loan limits for a $300,000 purchase?",
        a: "The 2024 FHA floor limit is $498,257 in most U.S. counties, so a $300,000 purchase falls well within eligibility in standard markets. High-cost counties have ceilings up to $1,149,825 in areas like San Francisco, New York, and Honolulu. Check the FHA mortgage limits page for your specific county before making an offer, as limits are updated annually.",
      },
      {
        q: "Can FHA mortgage insurance (MIP) ever be removed?",
        a: "If you put down less than 10%, FHA MIP remains for the entire 30-year loan term with no option to cancel based on equity. Putting down 10% or more allows MIP cancellation after 11 years. The most common exit strategy is refinancing into a conventional loan once you reach 20% equity through payments and appreciation, which eliminates MIP entirely.",
      },
      {
        q: "What credit score do I need for an FHA loan on a $300,000 home?",
        a: "FHA requires a minimum credit score of 580 to qualify for the 3.5% down payment option on a $300,000 purchase. Scores between 500 and 579 require at least 10% down ($30,000). Most FHA lenders impose overlays requiring scores of 620 or higher for the best rates and smoothest underwriting, even though the FHA minimum is lower.",
      },
      {
        q: "How does the upfront MIP affect my FHA loan balance?",
        a: "FHA charges an upfront mortgage insurance premium of 1.75% of the base loan amount, which is $5,066 on a $289,500 loan. Most borrowers roll this into the loan balance rather than paying it at closing, bringing the total financed amount to $294,566. Rolling in the UFMIP increases your monthly P&I by about $32 and adds roughly $6,460 in additional interest over 30 years.",
      },
    ],
  },
];
