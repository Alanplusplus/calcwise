import type { CalculatorVariant } from "./types";
import { HSA_LIMITS, usd } from "../tax-data";

export const inflationVariants: CalculatorVariant[] = [
  {
    slug: "retirement-30-years",
    lastUpdated: "2026-08-29",
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
    keyResults: [
      { label: "Current spending power", value: "$50,000/year" },
      { label: "Purchasing power in 30 years at 3%", value: "$121,363/year required" },
      { label: "Real value loss", value: "58.8% of today's buying power" },
      { label: "Inflation-adjusted target", value: "$121,363 annual budget" },
      { label: "10-year comparison at 3%", value: "$67,196/year (34% less)" },
      { label: "20-year comparison at 3%", value: "$90,306/year (26% less)" },
    ],
    comparisonNote:
      "At 3% inflation, a $50,000 annual budget requires $67,196 in 10 years and $90,306 in 20 years — but jumps to $121,363 at the 30-year mark. The final decade alone adds $31,057 in annual spending need, more than the entire increase from year 10 to year 20. This compounding curve is why retirement planners stress-test longer horizons rather than extrapolating from shorter projections.",
    faq: [
      {
        q: "How does inflation affect retirement planning over 30 years?",
        a: "At 3% annual inflation, every dollar you spend today requires $2.43 in 30 years to buy the same goods and services. A retiree planning on $50,000 per year must target roughly $121,000 in future annual withdrawals just to maintain their current lifestyle. Failing to account for this compounding effect is one of the most common reasons retirees exhaust savings earlier than expected.",
      },
      {
        q: "Can TIPS bonds protect my retirement savings from inflation?",
        a: "Treasury Inflation-Protected Securities adjust their principal value with CPI changes, providing a direct hedge against general inflation. However, TIPS yields are typically lower than stocks and do not protect against healthcare inflation, which often runs 2-3 percentage points above CPI. Most retirement portfolios combine TIPS with equities and other assets rather than relying on them exclusively.",
      },
      {
        q: "Do Social Security COLA adjustments keep pace with retiree inflation?",
        a: "Social Security cost-of-living adjustments are tied to the CPI-W index, which historically lags actual retiree spending inflation by 0.3-0.5% per year. Because retirees spend disproportionately on healthcare and housing — categories that inflate faster than the general basket — the COLA gap widens every year. Over a 25-year retirement, this shortfall can cost tens of thousands in lost purchasing power.",
      },
    ],
  },
  {
    slug: "college-cost-18-years",
    lastUpdated: "2026-08-29",
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
    keyResults: [
      { label: "Current average tuition", value: "$25,000/year" },
      { label: "Projected tuition in 18 years at 5%", value: "$60,191/year" },
      { label: "Education-specific inflation rate", value: "5.0% annually" },
      { label: "Total 4-year cost projection", value: "$240,764" },
      { label: "General inflation equivalent at 3%", value: "$42,546/year (29% less)" },
      { label: "Private school projection at 5%", value: "$132,000/year from $55,000 today" },
    ],
    comparisonNote:
      "Education inflation at 5% per year produces a $60,191 annual tuition in 18 years, while general CPI at 3% would yield only $42,546 — a $17,645 per-year gap. Over four years of college, that difference totals more than $70,000. Parents who plan using the general 3% rate will systematically underfund 529 accounts and face a significant savings shortfall when tuition bills arrive.",
    faq: [
      {
        q: "Why does college cost inflation outpace general inflation?",
        a: "Higher education costs rise faster than CPI due to administrative growth, facility upgrades, reduced state funding for public universities, and competition for faculty and amenities. Historical data shows tuition inflating at 5-6% annually versus roughly 3% for the general economy. This gap has persisted for decades and shows no sign of narrowing, making education-specific projections essential for accurate planning.",
      },
      {
        q: "What growth rate should I assume for a 529 plan?",
        a: "Most financial advisors recommend projecting 5-6% annual tuition inflation when setting 529 contribution targets, while assuming 6-7% investment returns inside the account. The spread between these two rates determines whether your savings keep pace. If your 529 earns 7% but tuition inflates at 5%, you gain ground; if returns lag or tuition spikes higher, you may still face a gap at enrollment.",
      },
      {
        q: "Do in-state public and private schools inflate at the same rate?",
        a: "Both categories have historically inflated at roughly 5% annually, but private institutions start from a higher base — $55,000 today versus $25,000 for public in-state tuition. At 5% over 18 years, private tuition reaches $132,000 per year while public in-state reaches $60,191. The percentage increase is similar, but the absolute dollar gap widens dramatically, making school choice a major factor in total savings required.",
      },
    ],
  },
  {
    slug: "grocery-budget-10-years",
    lastUpdated: "2026-08-29",
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
    keyResults: [
      { label: "Current monthly grocery budget", value: "$800/month" },
      { label: "Projected in 10 years at 3.5%", value: "$1,129/month" },
      { label: "Annual increase amount", value: "$3,948/year extra" },
      { label: "Cumulative extra cost over 10 years", value: "$17,770 total inflation premium" },
      { label: "Share of $75,000 salary", value: "13% today → 15% in 10 years" },
      { label: "At 4.5% food inflation scenario", value: "$1,232/month (+$103 vs baseline)" },
    ],
    comparisonNote:
      "Food inflation at 3.5% adds $329 per month to an $800 grocery budget over 10 years, while housing typically inflates at 3-4% and healthcare at 5-7%. Grocery costs feel the impact sooner because food is purchased weekly and price changes are immediately visible at checkout. Healthcare inflation is higher in percentage terms but affects fewer households before retirement age, making groceries the most universally felt inflation category in household budgets.",
    faq: [
      {
        q: "Why are food prices more volatile than other household expenses?",
        a: "Grocery prices react quickly to weather events, supply chain disruptions, fuel costs, and commodity market swings because food has a short production cycle. A drought or shipping bottleneck can raise produce prices within weeks, while housing and insurance costs adjust more slowly through annual renewals. This volatility makes food inflation harder to predict year-to-year even though its long-term average stays near 3-4%.",
      },
      {
        q: "How do substitution effects help manage rising grocery costs?",
        a: "When specific items spike in price, households often switch to cheaper alternatives — chicken instead of beef, store brands instead of name brands, or frozen instead of fresh produce. The CPI food basket accounts for some substitution, but your personal grocery bill may rise slower than headline food inflation if you adapt buying habits. Tracking your actual monthly spend rather than CPI averages gives a more accurate picture of inflation's impact on your budget.",
      },
      {
        q: "Do grocery prices vary significantly by region?",
        a: "Yes. Urban coastal areas typically pay 10-20% more for groceries than rural Midwest regions due to higher rent, labor costs, and transportation expenses. A $800 monthly budget in Kansas City might require $920-$960 in San Francisco or New York for the same basket of goods. Regional differences also affect which categories inflate fastest — fresh produce costs more in landlocked states, while seafood prices spike more in inland areas.",
      },
    ],
  },
  {
    slug: "healthcare-cost-20-years",
    lastUpdated: "2026-08-29",
    title: "Healthcare Cost Inflation Over 20 Years",
    description:
      "Project healthcare expenses 20 years forward using medical inflation rates. Plan your HSA and insurance strategy around realistic future cost estimates.",
    defaults: { currentAmount: "5000", inflationRate: "5.5", years: "20" },
    intro:
      "Healthcare costs have consistently outpaced general inflation, averaging 5-6% annual increases over the past two decades. A family spending $5,000 per year on out-of-pocket medical expenses today faces dramatically higher costs as they approach retirement age — the period when healthcare needs accelerate. Planning with general 3% inflation severely underestimates medical costs and leaves many retirees choosing between coverage and other essentials.",
    tips: [
      "At 5.5% medical inflation, your $5,000 annual healthcare cost grows to $14,636 per year in 20 years — nearly triple the current amount.",
      "Over 20 years you will pay a cumulative $183,280 in healthcare costs instead of the $100,000 you would spend at today's prices, an $83,280 inflation premium.",
      `Maxing out an HSA at ${usd(HSA_LIMITS.selfOnly)}/year (2026 self-only limit) and investing the balance at 7% returns builds approximately $180,000 in 20 years — enough to cover nearly a decade of inflated healthcare costs.`,
      "Medicare does not cover everything: the average 65-year-old couple needs approximately $315,000 in savings to cover healthcare costs through retirement, and this figure inflates every year you are younger than 65.",
      "Using a 3% rate instead of 5.5% for healthcare planning would project only $9,031 per year in 20 years — underestimating actual costs by $5,605 annually, or $112,100 over 20 years.",
    ],
    keyResults: [
      { label: "Current annual healthcare cost", value: "$5,000/year" },
      { label: "Projected in 20 years at 5.5%", value: "$14,636/year" },
      { label: "Medical inflation rate", value: "5.5% annually" },
      { label: "Cumulative impact over 20 years", value: "$183,280 total ($83,280 inflation premium)" },
      { label: "HSA max-out projection at 7% returns", value: "$170,000 balance in 20 years" },
      { label: "Underestimate at 3% CPI rate", value: "$9,031/year ($5,605/year too low)" },
    ],
    comparisonNote:
      "Healthcare inflation at 5.5% nearly triples a $5,000 annual cost to $14,636 in 20 years, while general CPI at 3% would produce only $9,031 — a $5,605 per-year underestimation. Over two decades, using the wrong rate costs $112,100 in planning errors. Medical costs consistently outpace wages, housing, and general inflation, making healthcare the single largest wildcard in long-term financial planning.",
    faq: [
      {
        q: "Why does medical inflation consistently outpace wage growth?",
        a: "Healthcare costs rise due to expensive new treatments, pharmaceutical pricing, administrative overhead, and an aging population requiring more care. Wages typically grow at 2-3% annually while medical costs increase at 5-7%, creating a widening gap that forces families to allocate an ever-larger share of income to healthcare. This trend has persisted for over two decades regardless of economic cycles or policy changes.",
      },
      {
        q: "Can an HSA serve as a hedge against healthcare inflation?",
        a: "Health Savings Accounts offer triple tax advantages — tax-deductible contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses — making them one of the most effective tools for combating medical inflation. Investing HSA balances rather than spending them annually allows the account to compound at market returns, potentially building a six-figure reserve that keeps pace with or exceeds healthcare cost growth over 15-20 years.",
      },
      {
        q: "How should I plan for Medicare costs given rising medical inflation?",
        a: "Medicare covers hospitalization and basic services but not dental, vision, hearing, or long-term care — gaps that retirees must fund out of pocket. The average 65-year-old couple needs approximately $315,000 in savings for healthcare through retirement, and this figure increases every year for those currently younger than 65. Planning with medical inflation rates of 5-6% rather than general CPI is critical to avoid exhausting savings in the first decade of retirement.",
      },
    ],
  },
  {
    slug: "100-dollar-purchasing-power",
    lastUpdated: "2026-08-29",
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
    keyResults: [
      { label: "Value of $100 today", value: "$100.00 (full purchasing power)" },
      { label: "Value in 10 years at 3%", value: "$74.41" },
      { label: "Value in 20 years at 3%", value: "$55.37" },
      { label: "Value in 30 years at 3%", value: "$41.20" },
      { label: "Purchasing power needed in 20 years", value: "$180.61 to buy what $100 buys today" },
      { label: "Historical comparison at 5% inflation", value: "$61.39 in 10 years, $37.69 in 20 years" },
    ],
    comparisonNote:
      "At 2% inflation, $100 retains $82.03 of purchasing power after 10 years; at 3%, it retains $74.41; at 4%, only $67.56. That 2-percentage-point spread between moderate and elevated inflation erases an additional $14.47 per $100 over a decade. Over 30 years, the difference between 2% and 4% inflation is $24.27 versus $30.83 in remaining value — a gap that compounds into tens of thousands across a full portfolio.",
    faq: [
      {
        q: "How can I protect my savings from losing purchasing power?",
        a: "Investments must earn more than the inflation rate to preserve real value — stocks, real estate, and Treasury Inflation-Protected Securities have historically outpaced inflation over long periods. Cash in a zero-interest account guaranteed loses purchasing power every year. Even a high-yield savings account at 4.5% only barely beats 3% inflation, leaving minimal real gains after taxes.",
      },
      {
        q: "What is the difference between real and nominal returns?",
        a: "Nominal returns are the raw percentage your investment earns before accounting for inflation, while real returns subtract inflation to show actual purchasing power gained. A 7% nominal stock return with 3% inflation yields a 4% real return. Focusing on nominal gains without adjusting for inflation can create an illusion of wealth growth while your money buys less over time.",
      },
      {
        q: "How is inflation measured, and does the official rate reflect my experience?",
        a: "The Bureau of Labor Statistics tracks inflation through the Consumer Price Index, measuring price changes across a fixed basket of goods and services. CPI may understate inflation for individual households that spend heavily on categories like healthcare, education, or housing in high-cost areas. Personal inflation rate depends on your specific spending patterns, which is why tracking your own cost increases often reveals higher effective inflation than the headline number.",
      },
    ],
  },
];
