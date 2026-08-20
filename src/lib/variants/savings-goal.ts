export interface CalculatorVariant {
  slug: string;
  title: string;
  description: string;
  defaults: Record<string, string>;
  intro: string;
  tips: string[];
}

export const savingsGoalVariants: CalculatorVariant[] = [
  {
    slug: "house-down-payment",
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
  },
  {
    slug: "wedding",
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
  },
  {
    slug: "new-car",
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
  },
  {
    slug: "vacation",
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
  },
  {
    slug: "college-fund",
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
  },
];
