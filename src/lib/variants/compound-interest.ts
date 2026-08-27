export interface CalculatorVariant {
  slug: string;
  title: string;
  description: string;
  defaults: Record<string, string>;
  intro: string;
  tips: string[];
}

export const compoundInterestVariants: CalculatorVariant[] = [
  {
    slug: "1000-start",
    title: "Compound Interest on $1,000",
    description:
      "See how $1,000 grows with monthly contributions over 30 years at 7%. Ideal for beginners building their first long-term savings or investment plan.",
    defaults: { principal: "1000", monthlyContribution: "100", annualRate: "7", years: "30" },
    intro:
      "Starting with just $1,000 is how most Americans begin their investing journey — whether it is a first Roth IRA contribution, a high-yield savings rollover, or seed money from a tax refund. At $100 per month, you are building the habit that matters far more than the initial balance. Over a 30-year horizon, time becomes your greatest asset: even modest returns compound into a six-figure portfolio.",
    tips: [
      "With $1,000 starting capital and $100/month at 7% over 30 years, your account grows to roughly $130,114 — of which $93,114 is pure compound interest on just $37,000 in total contributions.",
      "If you invested only the $1,000 with no monthly additions, it would reach about $8,116 in 30 years — regular $100 contributions account for over 99% of your final balance.",
      "By year 10 you would already have around $19,318 saved, giving you a meaningful emergency buffer while compounding continues in the background.",
      "Boosting your monthly contribution by just $50 (to $150/month) raises your final balance to approximately $191,112 — an extra $60,999 earned for a modest lifestyle adjustment.",
      "Increasing your annual return from 7% to 8% lifts the 30-year total to about $159,972, illustrating why low-cost index funds often outperform savings accounts over long horizons.",
    ],
  },
  {
    slug: "5000-start",
    title: "Compound Interest on $5,000",
    description:
      "Project growth on a $5,000 initial investment with $200 monthly contributions at 7% over 20 years. Perfect for mid-career savers ramping up contributions.",
    defaults: { principal: "5000", monthlyContribution: "200", annualRate: "7", years: "20" },
    intro:
      "A $5,000 starting balance often reflects a year or two of disciplined saving — perhaps from a work bonus, a matured CD, or consolidating scattered brokerage accounts. At $200 per month, you are in the range where employer 401(k) matches and IRA contributions start to meaningfully accelerate wealth building. This scenario suits professionals in their late twenties or early thirties who have cleared high-interest debt and are ready to prioritize long-term growth.",
    tips: [
      "Starting with $5,000 and adding $200/month at 7% for 20 years yields approximately $124,379 — your $53,000 in contributions generate about $71,379 in compound interest.",
      "After just five years your balance reaches roughly $21,407, more than quadrupling your initial $5,000 even before the heaviest compounding years arrive.",
      "By year 10 the account grows to around $44,665, crossing a threshold where annual interest earnings begin to rival your monthly contribution amount.",
      "Without any monthly contributions, $5,000 alone at 7% would only grow to about $20,194 over 20 years — consistent $200 deposits more than double your outcome.",
      "Adding an extra $50 per month ($250 total) pushes your final balance to approximately $150,425, capturing an additional $26,046 in compound growth.",
    ],
  },
  {
    slug: "10000-start",
    title: "Compound Interest on $10,000",
    description:
      "Calculate how $10,000 compounds with $500 monthly additions at 7% over 20 years. A common benchmark for established savers and dual-income households.",
    defaults: { principal: "10000", monthlyContribution: "500", annualRate: "7", years: "20" },
    intro:
      "Ten thousand dollars is a widely cited milestone — the point where many financial advisors suggest you have enough invested for compounding to visibly accelerate. Combined with $500 monthly contributions, this scenario mirrors a household maxing out one spouse's 401(k) plus IRA, or an aggressive saver directing half their take-home pay toward index funds. Over 20 years, the math shifts from slow accumulation to exponential growth as interest begins earning interest on a substantial base.",
    tips: [
      "A $10,000 start with $500/month at 7% over 20 years grows to roughly $300,851 — you contribute $130,000 total while compound interest adds approximately $170,851.",
      "At the five-year mark your balance hits about $49,973, meaning your portfolio nearly quintuples from the starting principal within the first quarter of your timeline.",
      "By year 10 you accumulate around $106,639, at which point annual interest earnings of roughly $7,400 exceed a single month's $500 contribution.",
      "If you left the $10,000 invested without monthly additions, it would reach only about $40,387 in 20 years — your recurring deposits contribute over 75% of the final value.",
      "A one-percentage-point rate increase to 8% boosts your final balance to approximately $343,778, a $42,927 difference that highlights the impact of fee minimization and asset allocation.",
    ],
  },
  {
    slug: "100000-start",
    title: "Compound Interest on $100,000",
    description:
      "Model growth on a $100,000 lump sum with $1,000 monthly at 7% over 20 years. For inheritances, home-sale proceeds, or late-career nest eggs.",
    defaults: { principal: "100000", monthlyContribution: "1000", annualRate: "7", years: "20" },
    intro:
      "A $100,000 starting balance typically arrives from a life event — an inheritance, proceeds from a home sale, a deferred-compensation payout, or decades of accumulated 401(k) rollovers. At this level, asset allocation and tax efficiency matter as much as contribution rate. Adding $1,000 per month positions you among the top tier of American savers and creates a portfolio where compound interest does the heavy lifting, potentially generating more annual growth than many median household incomes.",
    tips: [
      "With $100,000 upfront and $1,000/month at 7% for 20 years, your portfolio reaches approximately $924,801 — compound interest alone contributes about $584,801 on $340,000 in total deposits.",
      "After five years your balance grows to roughly $213,355, already more than doubling your initial lump sum while monthly contributions continue building momentum.",
      "By year 10 the account hits around $374,051, generating annual interest of approximately $26,000 — comparable to a part-time salary earned passively.",
      "Investing the $100,000 alone with zero monthly additions would yield about $403,874 in 20 years — your $1,000 monthly contributions add over $520,000 to the final outcome.",
      "An extra $50 per month increases your final balance to roughly $950,847, and bumping the rate to 8% pushes the total past $1,081,000 — crossing the seven-figure mark through compounding alone.",
    ],
  },
  {
    slug: "10-percent",
    title: "Compound Interest at 10% Annual Return",
    description:
      "Explore 10% annual growth on $10,000 with $500 monthly over 20 years. Reflects long-term S&P 500 returns for diversified equity investors.",
    defaults: { principal: "10000", monthlyContribution: "500", annualRate: "10", years: "20" },
    intro:
      "A 10% annual return aligns with the historical long-term average of the S&P 500, though actual year-to-year results vary widely with market cycles. This scenario suits investors with a 20-year horizon who can tolerate volatility — typically those holding broad index funds in tax-advantaged accounts. The difference between 7% and 10% may seem modest, but over two decades it transforms a comfortable nest egg into generational wealth, making asset selection and staying invested through downturns critical.",
    tips: [
      "At 10% annual return with $10,000 starting capital and $500/month over 20 years, your balance grows to approximately $452,965 — compound interest contributes $322,965 on $130,000 in total contributions.",
      "Compared to the same inputs at 7% ($300,851 final balance), the extra 3 percentage points of return adds roughly $152,114 — more than your entire starting principal.",
      "By year five your portfolio reaches about $55,172, growing faster than the 7% scenario's $49,973 despite identical contribution amounts, showing how rate differences amplify early.",
      "The $10,000 principal alone at 10% compounds to approximately $73,281 in 20 years — nearly double the $40,387 it would earn at 7%, before counting any monthly deposits.",
      "Adding $50 more per month at 10% pushes your final total to about $490,934, and sustaining an 11% return would reach roughly $522,169 — underscoring why minimizing fees and maintaining discipline through bear markets pays off.",
    ],
  },
];
