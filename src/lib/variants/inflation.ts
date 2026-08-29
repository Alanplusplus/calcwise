export interface CalculatorVariant {
  slug: string;
  title: string;
  description: string;
  defaults: Record<string, string>;
  intro: string;
  tips: string[];
}

export const inflationVariants: CalculatorVariant[] = [
  {
    slug: "retirement-30-years",
    title: "Inflation Over 30 Years for Retirement Planning",
    description:
      "See how 30 years of inflation affects your retirement purchasing power. Model your future cost of living to set the right savings target today.",
    defaults: { currentAmount: "50000", inflationRate: "3", years: "30" },
    intro:
      "Thirty years is the standard planning horizon for someone in their mid-thirties targeting retirement at 65. Over this period, even moderate 3% inflation transforms a $50,000 annual budget into a $121,000 requirement — and that is before accounting for healthcare costs that inflate even faster. Retirees who set savings targets based on today's expenses routinely discover a six-figure shortfall within the first decade of retirement.",
    tips: [
      "At 3% inflation, your $50,000 annual expenses will require $121,363 per year in 30 years — you need roughly 2.4 times your current budget to maintain the same lifestyle.",
      "Using the 4% safe withdrawal rate, you would need approximately $3,034,000 in today's dollars to sustain $121,363 per year in withdrawals at retirement.",
      "Healthcare alone may cost more: if medical expenses inflate at 5.2%, a $5,000 annual healthcare budget today becomes $22,950 in 30 years — nearly five times the current amount.",
      "Social Security COLA adjustments historically lag actual retiree inflation by 0.3-0.5%, creating a gap that widens every year and can cost tens of thousands over a 25-year retirement.",
      "Running this same scenario at 4% inflation instead of 3% raises the 30-year expense to $162,170 — a $40,800 annual difference that underscores why stress-testing matters.",
    ],
  },
  {
    slug: "college-cost-18-years",
    title: "College Cost Inflation Over 18 Years",
    description:
      "Estimate future college costs using historical education inflation rates. Plan a 529 savings strategy based on what tuition will actually cost when your child enrolls.",
    defaults: { currentAmount: "25000", inflationRate: "5", years: "18" },
    intro:
      "Parents of newborns face an 18-year runway during which college tuition has historically inflated at 5-6% per year — roughly double the general CPI. A public university averaging $25,000 per year today could cost $60,000 by the time your child enrolls. Planning with the general 3% inflation rate virtually guarantees you will fall short, which is why education-specific projections are essential for 529 plan contributions.",
    tips: [
      "At 5% annual education inflation, today's $25,000 annual tuition becomes approximately $60,191 in 18 years — meaning a four-year degree could exceed $240,000 in total.",
      "If you start a 529 plan at birth with $200/month earning 7% returns, you will accumulate roughly $86,400 by age 18 — covering about 36% of the projected $240,000 cost.",
      "To fully fund a four-year degree at projected costs, you would need to save approximately $560/month from birth, or $335/month if grandparents contribute a $25,000 lump sum upfront.",
      "Private university tuition averaging $55,000 today could reach $132,000 per year in 18 years at 5% inflation — a total four-year cost exceeding $528,000.",
      "Starting savings even 5 years late (at child age 5) requires roughly $440/month instead of $200/month to reach the same target, costing $31,200 more in total contributions.",
    ],
  },
  {
    slug: "grocery-budget-10-years",
    title: "Grocery Budget Inflation Over 10 Years",
    description:
      "Calculate how your monthly grocery spending will change over the next decade. Adjust your household budget with realistic food inflation projections.",
    defaults: { currentAmount: "800", inflationRate: "3.5", years: "10" },
    intro:
      "The average American household spends roughly $800 per month on groceries and food at home. Food prices have inflated at approximately 3-4% annually over the past decade, with sharp spikes during supply chain disruptions. Understanding how your grocery budget evolves over 10 years helps you adjust savings contributions and avoid the slow squeeze that erodes discretionary spending without any visible lifestyle change.",
    tips: [
      "At 3.5% food inflation, your $800 monthly grocery bill rises to approximately $1,129 per month in 10 years — an extra $329 per month or $3,948 per year in additional spending.",
      "Over the full 10-year period, you will spend roughly $113,770 on groceries instead of today's equivalent of $96,000, paying an extra $17,770 purely due to inflation.",
      "If your income only receives 2% annual raises while groceries inflate at 3.5%, groceries consume a growing share of take-home pay — from 13% to about 15% for a $75,000 salary.",
      "A family of four spending $1,200/month faces an even steeper climb: $1,694 per month in 10 years, requiring an additional $5,928 per year compared to today.",
      "Switching from 3.5% to 4.5% food inflation (as seen during recent supply disruptions) pushes the 10-year grocery bill to $1,232/month — $103 more per month than the 3.5% scenario.",
    ],
  },
  {
    slug: "healthcare-cost-20-years",
    title: "Healthcare Cost Inflation Over 20 Years",
    description:
      "Project healthcare expenses 20 years forward using medical inflation rates. Plan your HSA and insurance strategy around realistic future cost estimates.",
    defaults: { currentAmount: "5000", inflationRate: "5.5", years: "20" },
    intro:
      "Healthcare costs have consistently outpaced general inflation, averaging 5-6% annual increases over the past two decades. A family spending $5,000 per year on out-of-pocket medical expenses today faces dramatically higher costs as they approach retirement age — the period when healthcare needs accelerate. Planning with general 3% inflation severely underestimates medical costs and leaves many retirees choosing between coverage and other essentials.",
    tips: [
      "At 5.5% medical inflation, your $5,000 annual healthcare cost grows to $14,636 per year in 20 years — nearly triple the current amount.",
      "Over 20 years you will pay a cumulative $183,280 in healthcare costs instead of the $100,000 you would spend at today's prices, an $83,280 inflation premium.",
      "Maxing out an HSA at $4,150/year (2026 individual limit) and investing the balance at 7% returns builds approximately $170,000 in 20 years — enough to cover nearly a decade of inflated healthcare costs.",
      "Medicare does not cover everything: the average 65-year-old couple needs approximately $315,000 in savings to cover healthcare costs through retirement, and this figure inflates every year you are younger than 65.",
      "Using a 3% rate instead of 5.5% for healthcare planning would project only $9,031 per year in 20 years — underestimating actual costs by $5,605 annually, or $112,100 over 20 years.",
    ],
  },
  {
    slug: "100-dollar-purchasing-power",
    title: "What Will $100 Be Worth in the Future?",
    description:
      "See how $100 loses purchasing power over 5, 10, 20, and 30 years at different inflation rates. A simple way to understand why saving matters.",
    defaults: { currentAmount: "100", inflationRate: "3", years: "20" },
    intro:
      "A hundred-dollar bill is the most tangible way to understand inflation's invisible tax. At 3% annual inflation, a $100 bill sitting in your drawer buys only $74 worth of goods in 10 years and just $55 worth in 20 years. This scenario is the foundation of every financial planning decision: money must grow faster than inflation or it loses real value with every passing year.",
    tips: [
      "At 3% inflation, $100 today has the purchasing power of just $74.41 in 10 years, $55.37 in 20 years, and $41.20 in 30 years — losing nearly 60% of its value over a career span.",
      "Conversely, something costing $100 today will cost $134.39 in 10 years, $180.61 in 20 years, and $242.73 in 30 years — the price more than doubles in three decades.",
      "If you keep $10,000 in a zero-interest checking account for 20 years at 3% inflation, you effectively lose $4,463 in purchasing power — money silently disappearing without a single transaction.",
      "A high-yield savings account earning 4.5% APY turns $100 into $124.12 in 5 years, but inflation at 3% means you need $115.93 just to break even — your real gain is only $8.19.",
      "At 5% inflation (as experienced during 2021-2023), $100 loses purchasing power much faster: worth $61.39 in 10 years and just $37.69 in 20 years.",
    ],
  },
];
