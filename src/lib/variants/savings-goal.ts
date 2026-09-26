import type { CalculatorVariant } from "./types";

export const savingsGoalVariants: CalculatorVariant[] = [
  {
    slug: "house-down-payment",
    lastUpdated: "2026-08-20",
    title: "Save for a House Down Payment",
    description:
      "Calculate how much to save each month to build your house down payment fund. Plan a $60,000 down payment with a realistic timeline and return rate.",
    defaults: { goalAmount: "60000", currentSavings: "5000", timeframe: "4" },
    intro:
      "A 20% down payment on a $300,000 home means saving $60,000 -- a goal that feels daunting but becomes manageable with a clear monthly target and consistent deposits into a high-yield savings account. Most first-time buyers spend 3 to 5 years building their down payment fund, often starting with as little as a few thousand dollars. Starting with $5,000 already saved gives you momentum and reduces the monthly contribution needed to hit your target within four years.",
    tips: [
      "At a 5% annual return, saving roughly $1,060 per month over 4 years turns your $5,000 starting balance into the full $60,000 down payment -- about $5,900 of that comes from earned interest.",
      "High-yield savings accounts currently offer 4.5% to 5.0% APY with FDIC insurance -- a reliable home for down payment funds since you cannot afford market volatility on money you need within 5 years.",
      "Many state housing agencies offer down payment assistance programs that match your savings dollar-for-dollar up to $5,000-$10,000, effectively cutting months off your timeline.",
      "If you are stretching to reach 20% down, remember that putting just 10% down ($30,000) is also viable -- you will pay PMI of $100-$200 per month, but you can start building equity years earlier.",
      "Automate your savings with a separate account dedicated solely to the down payment -- treating it like a non-negotiable bill prevents the fund from being raided for other expenses.",
    ],
    keyResults: [
      { label: "Target amount", value: "$60,000 (20% down on $300,000 home)" },
      { label: "Monthly savings needed", value: "$1,060 over 4 years" },
      { label: "Timeline", value: "4 years from $5,000 starting balance" },
      { label: "Best account type", value: "High-yield savings at 4.5-5.0% APY" },
      { label: "Interest earned", value: "~$5,900 over the savings period" },
      { label: "Alternative: 10% down", value: "$30,000 target with $530/month" },
    ],
    comparisonNote:
      "Saving $1,060 per month for a down payment builds $60,000 in equity over four years, while renting a comparable home at $1,800/month ($86,400 total) builds zero equity. Investing the down payment savings in the stock market could yield higher returns but risks a 20-30% loss right when you need the funds, making a high-yield savings account the safer choice for a 3-5 year timeline.",
    faq: [
      {
        q: "Should I use a high-yield savings account or invest for my down payment?",
        a: "For timelines under five years, a high-yield savings account at 4.5-5.0% APY is the recommended choice because stock market volatility could erase 20-30% of your balance in a downturn. Investing makes sense only if your timeline exceeds seven years and you can tolerate delaying your home purchase if markets decline significantly.",
      },
      {
        q: "What first-time buyer programs can accelerate my savings?",
        a: "Many state housing agencies offer down payment assistance matching your savings dollar-for-dollar up to $5,000-$10,000, effectively cutting months off your timeline. FHA loans require only 3.5% down ($10,500 on a $300,000 home), and USDA and VA loans offer zero-down options for eligible buyers in qualifying areas.",
      },
      {
        q: "Is 20% down payment necessary or should I save less?",
        a: "A 20% down payment eliminates private mortgage insurance (PMI), saving $100-$200 per month on a $300,000 home. However, putting 10% down ($30,000) gets you into a home years sooner and lets you start building equity and benefiting from appreciation while continuing to save toward removing PMI later.",
      },
    ],
  },
  {
    slug: "wedding",
    lastUpdated: "2026-08-20",
    title: "Wedding Savings Calculator",
    description:
      "Plan your wedding budget by calculating how much to save each month. Reach a $30,000 wedding fund in 2 years with a structured savings plan.",
    defaults: { goalAmount: "30000", currentSavings: "2000", timeframe: "2" },
    intro:
      "The average American wedding costs between $28,000 and $35,000, and most couples finance it through a combination of savings, family contributions, and careful budgeting over an engagement period of 12 to 24 months. With $2,000 already set aside and a two-year runway, you can build a $30,000 fund through disciplined monthly transfers without taking on debt or raiding retirement accounts.",
    tips: [
      "To reach $30,000 in 24 months starting from $2,000 at a 5% return, you need to save approximately $1,120 per month -- splitting this between two partners brings it down to about $560 each.",
      "Venue and catering typically consume 40-50% of a wedding budget ($12,000-$15,000), so locking in those contracts early with deposits of $2,000-$5,000 lets you spread the remaining costs over more months.",
      "Consider a tiered savings approach: deposit $800 per month in the first year while researching vendors, then increase to $1,400 per month in year two when deposits and final payments come due.",
      "Keep wedding funds in a high-yield savings account rather than investments -- market downturns in your two-year window could force you to cut your guest list or downgrade vendors at the worst time.",
      "Track spending against specific budget categories (venue, photography, attire, flowers) rather than one lump sum -- couples who itemize their wedding budget overspend by 12% less on average.",
    ],
    keyResults: [
      { label: "Average wedding cost", value: "$30,000 target budget" },
      { label: "Monthly savings needed", value: "$1,120 over 24 months" },
      { label: "Timeline", value: "2 years from $2,000 starting balance" },
      { label: "Venue and catering", value: "$12,000-$15,000 (40-50% of budget)" },
      { label: "Photography and attire", value: "$4,000-$6,000 combined" },
      { label: "Per-partner share", value: "~$560/month each" },
    ],
    comparisonNote:
      "Saving $1,120 per month for a wedding over two years requires roughly double the monthly commitment of a $25,000 car fund ($588/month over three years) or a $5,000 vacation ($372/month over one year). Wedding savings timelines are typically shorter and less flexible than other goals because the date is fixed, making early vendor deposits and disciplined monthly transfers essential to avoid last-minute debt.",
    faq: [
      {
        q: "How should I allocate my wedding budget across categories?",
        a: "Venue and catering should consume 40-50% of your budget ($12,000-$15,000 on a $30,000 wedding), followed by photography ($2,000-$3,500), attire ($1,500-$3,000), and flowers/decor ($1,500-$2,500). Reserve 5-10% ($1,500-$3,000) as a contingency buffer for unexpected costs like guest count changes or vendor price increases.",
      },
      {
        q: "Is it better to finance a wedding or save in advance?",
        a: "Saving in advance avoids wedding loans that charge 8-15% interest, which would add $2,400-$4,500 in interest on a $30,000 two-year loan. Paying cash also gives you stronger negotiating power with vendors for upfront-payment discounts of 5-10%, saving an additional $1,500-$3,000.",
      },
      {
        q: "How do I balance wedding savings against other financial goals?",
        a: "Prioritize emergency fund (3-6 months expenses) and retirement contributions before accelerating wedding savings, since a wedding is a one-time event while retirement lasts decades. If wedding savings compete with a house down payment, consider scaling the wedding to $20,000-$25,000 to keep both goals on track without sacrificing long-term financial security.",
      },
    ],
  },
  {
    slug: "new-car",
    lastUpdated: "2026-08-20",
    title: "Save for a New Car",
    description:
      "Figure out your monthly savings target to buy a new car without financing. Build a $25,000 car fund in 3 years with a clear savings plan.",
    defaults: { goalAmount: "25000", currentSavings: "3000", timeframe: "3" },
    intro:
      "Paying cash for a vehicle eliminates monthly car payments, saves thousands in interest charges, and gives you stronger negotiating power at the dealership. With the average new car transaction price hovering around $48,000 and used cars averaging $27,000, targeting $25,000 puts you in reach of a reliable certified pre-owned vehicle or a well-equipped new compact. Starting with $3,000 and a three-year timeline makes the monthly savings target realistic for most dual-income households.",
    tips: [
      "Saving $25,000 in 3 years with $3,000 already banked and a 5% return requires approximately $588 per month -- that is less than the average new car payment of $726 per month, meaning you are already practicing the discipline needed.",
      "Financing a $25,000 car at 7.5% over 60 months costs roughly $5,050 in total interest -- by saving up and paying cash, you keep that money working for you instead of the lender.",
      "If your current car is still running, every extra month you drive it shifts money from depreciation into your savings fund -- cars lose an average of 20% of their value in the first year alone.",
      "Set up a dedicated auto sinking fund in a high-yield savings account and name it after your target vehicle -- behavioral finance research shows that labeled savings goals have 30% higher completion rates.",
      "Time your purchase for the end of a model year (October through December) or the end of a quarter when dealerships are motivated to clear inventory -- buyers routinely save $1,500-$3,000 below MSRP during these windows.",
    ],
    keyResults: [
      { label: "Target amount", value: "$25,000 car fund" },
      { label: "Monthly savings needed", value: "$588 over 3 years" },
      { label: "Recommended down payment", value: "100% cash (avoid financing)" },
      { label: "Financing cost avoided", value: "$5,050 in interest on a 60-month loan" },
      { label: "vs. average car payment", value: "$588/month savings vs. $726/month payment" },
      { label: "Timeline", value: "3 years from $3,000 starting balance" },
    ],
    comparisonNote:
      "Saving $25,000 for a certified pre-owned vehicle over three years targets a price point well below the $48,000 average new car transaction while avoiding $5,050 in financing interest. A used car fund of $15,000-$18,000 over two years is an alternative that further reduces monthly savings to $400-$500 but may require accepting higher mileage or fewer features.",
    faq: [
      {
        q: "What is the optimal down payment percentage for a car?",
        a: "Financial advisors recommend 20% down on a new car or paying 100% cash to avoid interest charges entirely. On a $25,000 vehicle, a 20% down payment ($5,000) with financing leaves $20,000 at 7.5% interest costing $4,040 in interest over 60 months — still significant compared to saving the full amount.",
      },
      {
        q: "Is saving for a car better than financing?",
        a: "Saving $588 per month for three years and paying cash eliminates $5,050 in interest on a $25,000 loan at 7.5% over 60 months. Cash buyers also negotiate $1,500-$3,000 below MSRP more effectively since dealers prefer immediate payment over financing paperwork and lender commissions.",
      },
      {
        q: "How does depreciation affect my car savings target?",
        a: "New cars lose an average of 20% of their value in the first year and 60% over five years, so a $48,000 new car is worth roughly $38,400 after 12 months. Targeting a 2-3 year old certified pre-owned vehicle at $25,000 lets someone else absorb the steepest depreciation while you still get a reliable car with warranty coverage.",
      },
    ],
  },
  {
    slug: "vacation",
    lastUpdated: "2026-08-20",
    title: "Vacation Savings Calculator",
    description:
      "Plan and save for your dream vacation. Calculate the monthly savings needed to build a $5,000 travel fund within one year.",
    defaults: { goalAmount: "5000", currentSavings: "500", timeframe: "1" },
    intro:
      "A $5,000 budget covers a week-long international trip for two, a luxury domestic getaway, or a family road trip with plenty of room for dining and activities. With 12 months to save and $500 already earmarked, you can fund the entire vacation through modest monthly contributions without relying on credit cards that charge 20%+ interest. The key is starting early enough that each month's contribution feels manageable rather than scrambling to fund the trip two weeks before departure.",
    tips: [
      "With $500 already saved and a 5% return, you need to set aside roughly $372 per month for 12 months to reach $5,000 -- that works out to about $86 per week or $12 per day.",
      "Break your $5,000 budget into categories before you start saving: flights ($800-$1,200), accommodation ($1,000-$1,500), food ($500-$800), activities ($400-$600), and a $500 buffer for unexpected expenses.",
      "Book flights 6-8 weeks before departure for domestic trips and 2-3 months ahead for international -- studies show these windows typically offer the lowest fares, saving $200-$400 per ticket.",
      "Use a travel-specific high-yield savings account or a no-fee savings bucket -- even at 4.5% APY, your $5,000 goal earns about $120 in interest over the year, enough to cover a nice dinner at your destination.",
      "Consider setting up automatic weekly transfers of $86 instead of monthly deposits -- smaller, more frequent contributions are easier to absorb and reduce the temptation to skip a month.",
    ],
    keyResults: [
      { label: "Trip budget", value: "$5,000 all-in for two travelers" },
      { label: "Monthly savings needed", value: "$372 over 12 months" },
      { label: "Timeline", value: "1 year from $500 starting balance" },
      { label: "Weekly equivalent", value: "$86 per week" },
      { label: "Sinking fund approach", value: "Dedicated travel account at 4.5% APY" },
      { label: "Interest earned", value: "~$120 over the savings year" },
    ],
    comparisonNote:
      "Saving $372 per month for 12 months costs $4,464 in contributions plus $500 starting balance to fund a $5,000 vacation with zero interest. Charging the same trip to a credit card at 22% APR and paying it off over 12 months would cost approximately $5,620 total — $620 more than the cash approach — and could damage your credit utilization ratio.",
    faq: [
      {
        q: "What is a vacation sinking fund and how does it work?",
        a: "A vacation sinking fund is a dedicated savings account where you deposit a fixed amount ($372/month or $86/week) toward a specific trip goal. Keeping vacation money separate from your checking account prevents accidental spending and lets you track progress toward your $5,000 target with clear milestones at 25%, 50%, and 75% funded.",
      },
      {
        q: "Can travel rewards credit cards offset my vacation savings goal?",
        a: "Travel rewards cards earning 2-3% back on everyday spending can contribute $600-$900 per year toward a $5,000 trip if you charge $2,000-$3,000 monthly and pay balances in full. Sign-up bonuses of 50,000-80,000 points (worth $500-$800) can cover flights entirely, reducing your cash savings target to $3,500-$4,000.",
      },
      {
        q: "What budget travel tips can reduce my savings target?",
        a: "Booking flights 6-8 weeks ahead for domestic trips saves $200-$400 per ticket, and traveling during shoulder seasons (April-May or September-October) cuts accommodation costs by 20-40%. Choosing Airbnb or vacation rentals over hotels for groups, and preparing some meals instead of dining out for every meal, can reduce a $5,000 budget to $3,500-$4,000 without sacrificing experience quality.",
      },
    ],
  },
  {
    slug: "college-fund",
    lastUpdated: "2026-08-20",
    title: "College Fund Savings Calculator",
    description:
      "Start building your child's college fund today. Calculate how much to save monthly to reach $100,000 over 18 years with compound growth.",
    defaults: { goalAmount: "100000", currentSavings: "10000", timeframe: "18" },
    intro:
      "The total cost of a four-year public university currently averages $25,000-$30,000 per year including room and board, and education costs have historically risen 3-5% annually. Starting a $100,000 college fund when your child is born gives you the maximum benefit of compound growth over 18 years, and beginning with a $10,000 initial deposit -- perhaps from grandparent gifts or birth savings bonds -- provides a strong foundation that reduces the monthly savings burden significantly.",
    tips: [
      "With $10,000 already invested and an average 7% annual return (typical for a diversified index fund), you need to contribute only about $245 per month over 18 years to reach $100,000 -- compound interest contributes roughly $47,000 of the total.",
      "A 529 college savings plan offers state tax deductions in over 30 states and federal tax-free growth -- on $100,000 in gains, that tax shelter saves approximately $15,000-$22,000 compared to a taxable brokerage account.",
      "Front-loading contributions matters enormously: investing $300 per month for the first 10 years then stopping produces more than investing $300 per month only in the last 10 years, thanks to a decade of extra compounding.",
      "If $100,000 does not cover the full cost by the time your child enrolls, remember that merit scholarships, work-study programs, and community college transfer paths can bridge the gap without student loans.",
      "Reassess your asset allocation as college approaches -- shift from 80% stocks to 60% bonds by age 14 and mostly bonds or stable value funds by age 17 to protect against a market downturn in the year before tuition bills arrive.",
    ],
    keyResults: [
      { label: "18-year target", value: "$100,000 college fund" },
      { label: "Monthly contribution", value: "$245 over 18 years" },
      { label: "529 plan growth", value: "~$47,000 from compound interest at 7%" },
      { label: "In-state public cost", value: "$100,000-$120,000 total (4 years)" },
      { label: "Private university cost", value: "$200,000-$280,000 total (4 years)" },
      { label: "Tax savings (529)", value: "$15,000-$22,000 on gains" },
    ],
    comparisonNote:
      "A 529 plan saving $245/month over 18 years with 7% tax-free growth reaches $100,000 while saving approximately $15,000-$22,000 in taxes compared to a taxable brokerage account. A regular investment account offers more flexibility if your child skips college, but lacks state tax deductions and requires paying capital gains taxes on withdrawals used for education.",
    faq: [
      {
        q: "What tax advantages do 529 plans offer?",
        a: "529 plans provide federal tax-free growth and withdrawals when used for qualified education expenses, and over 30 states offer additional state income tax deductions on contributions. On $100,000 in gains, this tax shelter saves approximately $15,000-$22,000 compared to a taxable brokerage account, plus contributions may reduce your state tax bill by $500-$2,000 annually.",
      },
      {
        q: "Does a 529 plan hurt my child's financial aid eligibility?",
        a: "529 plans owned by a parent are assessed at 5.64% of their value on the FAFSA, meaning a $100,000 balance reduces aid eligibility by approximately $5,640 — far less impactful than student-owned assets assessed at 20%. Grandparent-owned 529s no longer count against aid starting with the 2024-2025 FAFSA, making them an effective gifting strategy.",
      },
      {
        q: "What if I start saving late for college?",
        a: "Starting at age 10 instead of birth requires roughly $520 per month to reach $100,000 by age 18 at 7% returns — more than double the $245 needed with a full 18-year runway. Even starting at age 14, contributing $900-$1,000 per month can still build a meaningful $50,000-$60,000 fund, and community college transfer paths can reduce total costs by $30,000-$40,000.",
      },
    ],
  },
];
