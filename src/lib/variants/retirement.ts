import type { CalculatorVariant } from "./types";
import { RETIREMENT_LIMITS, usd } from "../tax-data";

const SSA_COLA_2027 = {
  label: "SSA, 2027 COLA fact sheet (Oct. 2026)",
  href: "https://www.ssa.gov/news/en/cola/factsheets/2027.html",
};
const SSA_SNAPSHOT = {
  label: "SSA Monthly Statistical Snapshot, September 2026",
  href: "https://www.ssa.gov/policy/docs/quickfacts/stat_snapshot/",
};
const MORNINGSTAR_SWR = {
  label: "Morningstar, safe withdrawal rate research (Feb. 18, 2026)",
  href: "https://www.morningstar.com/retirement/morningstars-retirement-income-research-finding-your-safe-withdrawal-rate",
};
const FIDELITY_BENCHMARKS = {
  label: "Fidelity Viewpoints, How much do I need to retire? (Sept. 25, 2026)",
  href: "https://www.fidelity.com/viewpoints/retirement/how-much-do-i-need-to-retire",
};
const IRS_RETIREMENT_LIMITS = {
  label: "IRS IR-2025-111, 2026 retirement plan limits (Nov. 13, 2025)",
  href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
};

export const retirementVariants: CalculatorVariant[] = [
  {
    slug: "retire-at-40",
    lastUpdated: "2026-10-21",
    title: "Retire at 40 (FIRE) Calculator — Savings & FIRE Number",
    description:
      "Plan financial independence at 40. See portfolio size, monthly savings at 7% returns, and how a 4% withdrawal rate maps to $50,000 annual spending.",
    defaults: { currentAge: "25", retirementAge: "40", desiredIncome: "50000", currentSavings: "0", monthlyContribution: "0" },
    intro:
      "Retiring at 40 is a core FIRE (Financial Independence, Retire Early) goal: you need a portfolio that can fund 45+ years of spending, often with little or no Social Security for the first two decades. Most planners use 25 to 30 times annual spending (a 3.3% to 4% withdrawal rate). Morningstar's 2026 research puts a 30-year, inflation-adjusted starting rate near 3.9% for new retirees with a balanced portfolio — many early retirees use 3.5% or lower to stretch a 40-year horizon.",
    tips: [
      "At a 4% withdrawal rate, $50,000 per year implies a $1,250,000 portfolio ($50,000 ÷ 0.04). At 3.5%, the target rises to about $1,429,000.",
      "Starting at 25 with $0 saved, 7% average returns, and no extra monthly contributions, you would need about $3,944 per month for 15 years to reach $1,250,000 by 40 — the figure the pre-filled calculator shows for this variant.",
      "Healthcare before Medicare at 65 is often the largest non-investment cost; budget marketplace premiums and out-of-pocket costs explicitly (exact amounts vary widely by state and age).",
      "A cash buffer of one to two years of spending ($50,000 to $100,000 on a $50,000 budget) outside equities can reduce sequence-of-returns risk in the first years after you stop working.",
      "Roth conversion ladders can unlock traditional IRA/401(k) dollars before 59½ without the 10% penalty, but each conversion needs a five-year seasoning period — start years before your target exit date.",
    ],
    keyResults: [
      { label: "Portfolio needed (4% SWR)", value: "$1,250,000" },
      { label: "Monthly savings required", value: "$3,944 at 7% return" },
      { label: "Years to retirement", value: "15 years (age 25 to 40)" },
      { label: "Years of retirement", value: "45+ years (age 40 to 85+)" },
      { label: "Healthcare gap before Medicare", value: "25 years (age 40 to 65)" },
      { label: "Portfolio at 3.5% SWR", value: "$1,429,000 target" },
    ],
    comparisonNote:
      "Compared with retiring at 55 on the same $60,000 income goal (age 30 to 55, $50,000 already saved), the monthly savings required drops from about $3,944 at 40 to about $1,498 at 55 — roughly $2,450 less per month because of 10 extra years of compounding and a shorter retirement to fund. You trade those years of freedom for a savings rate that fits more households.",
    faq: [
      {
        q: "How does a Roth conversion ladder work for retiring at 40?",
        a: "You convert a slice of traditional IRA or 401(k) money to Roth while you still have wage income, pay tax in that year, then wait five tax years before withdrawing the converted principal penalty-free. Stagger conversions to stay in lower brackets and build a pipeline of accessible cash until age 59½.",
      },
      {
        q: "How do I pay for healthcare before Medicare at 65?",
        a: "Most early retirees buy ACA marketplace coverage or extend employer COBRA briefly. Premiums depend on age, state, and household size; subsidies depend on modified adjusted gross income. Model at least $6,000 to $12,000 per year for premiums alone until you have a quote for your county.",
      },
      {
        q: "How serious is sequence-of-returns risk over a 45-year retirement?",
        a: "Selling stocks in a bear market during the first five to ten years of retirement can permanently lower how long money lasts. Holding one to three years of expenses in cash or short-term bonds and using a sub-4% withdrawal rate (Morningstar's 2026 base case is 3.9% for a 30-year horizon) reduces that risk for long retirements.",
      },
      {
        q: "What happens if I earn part-time income after retiring at 40?",
        a: "Every $10,000 of part-time income is $10,000 less pulled from the portfolio that year. At a 4% rule, $20,000 of side income is roughly equivalent to having an extra $500,000 invested — useful insurance, not a requirement, for many FIRE households.",
      },
    ],
    sources: [MORNINGSTAR_SWR, SSA_COLA_2027],
    sourcesChecked: "October 2026",
    sourcesNote: "Monthly savings figures match this site's retirement calculator at 7% returns and 4% withdrawal rate.",
  },
  {
    slug: "retire-at-50",
    lastUpdated: "2026-10-21",
    title: "Retire at 50 Calculator — Savings Target & Timeline",
    description:
      "Model retirement at 50 with $60,000 desired income, 7% returns, and 4% withdrawals. See monthly savings needed from age 30 with $50,000 already saved.",
    defaults: { currentAge: "30", retirementAge: "50", desiredIncome: "60000", currentSavings: "50000", monthlyContribution: "0" },
    intro:
      "Retiring at 50 leaves two decades to compound while still requiring a long bridge before Medicare at 65 and full Social Security at 67 (for workers born in 1960 or later). The pre-filled scenario targets $60,000 per year from investments using a 4% withdrawal rate ($1,500,000), starting at 30 with $50,000 saved and 7% expected returns — a demanding but reachable plan for high savers.",
    tips: [
      "A $60,000 annual budget at 4% implies $1,500,000 at age 50. With $50,000 today and 7% returns over 20 years, the calculator shows about $2,492 per month of new savings to close the gap.",
      "Plan at least 15 years without Medicare and up to 17 years before full Social Security if you were born in 1960 or later — stress-test with zero benefit until 67.",
      `Tax-advantaged limits for 2026: up to ${usd(RETIREMENT_LIMITS.employeeDeferral)} in a 401(k) and ${usd(RETIREMENT_LIMITS.ira)} in an IRA (${usd(RETIREMENT_LIMITS.employeeDeferral + RETIREMENT_LIMITS.ira)} combined), plus catch-up deferrals after 50 — but taxable brokerage assets still fund the gap before 59½.`,
      "The Rule of 55 does not help at 50 — it applies only when you separate from service in or after the calendar year you turn 55.",
      "Three years of spending in bonds or cash ($180,000 on a $60,000 budget) is a common buffer against early-retirement sequence risk.",
    ],
    keyResults: [
      { label: "Portfolio needed (4% SWR)", value: "$1,500,000" },
      { label: "Monthly savings required", value: "$2,492 at 7% return" },
      { label: "Years to retirement", value: "20 years (age 30 to 50)" },
      { label: "Medicare gap", value: "15 years (age 50 to 65)" },
      { label: "Full Social Security gap", value: "Up to 17 years (to age 67)" },
      { label: "Estimated SS at FRA (individual)", value: "~$2,170/mo (Jan. 2027 est.)" },
    ],
    comparisonNote:
      "Versus retiring at 55 on the same $60,000 goal from age 30 with $50,000 saved, required monthly savings fall from about $2,492 to about $1,498 — roughly $994 less per month for five additional working years. Versus FIRE at 40 on $50,000 spending from age 25, the 50-year-old path needs far less monthly savings but five fewer years of freedom.",
    faq: [
      {
        q: "Does the Rule of 55 apply if I retire at 50?",
        a: "No. Penalty-free 401(k) withdrawals under the Rule of 55 require separation from the employer in or after the year you turn 55. At 50 you generally need taxable assets, Roth conversion ladders, or SEPP (72(t)) plans to access tax-deferred money before 59½.",
      },
      {
        q: "Why do I need a taxable brokerage account to retire at 50?",
        a: "401(k) and IRA withdrawals before 59½ usually trigger a 10% penalty on top of income tax unless an exception applies. A taxable brokerage account provides penalty-free liquidity for living expenses during the bridge years.",
      },
      {
        q: "How should I bridge the gap before Social Security and Medicare?",
        a: "Use portfolio withdrawals and taxable savings for all costs until 65 for Medicare and until at least 62 for early Social Security (with a permanent benefit reduction). SSA's estimate for the average retired worker benefit in January 2027 is $2,170 per month after the 3.6% COLA — verify your own estimate at ssa.gov.",
      },
      {
        q: "Can an early pension reduce how much I need to save?",
        a: "Yes. Pension income of $1,500 per month ($18,000 per year) replaces about $450,000 of portfolio at a 4% withdrawal rate. Public-sector and union careers with 20+ years of service are the most common source of meaningful pensions before 62.",
      },
    ],
    sources: [SSA_COLA_2027, MORNINGSTAR_SWR, FIDELITY_BENCHMARKS],
    sourcesChecked: "October 2026",
    sourcesNote: "Monthly savings match the retirement calculator with this variant's defaults merged over site defaults (7% return, 4% withdrawal).",
  },
  {
    slug: "retire-at-55",
    lastUpdated: "2026-10-21",
    title: "Retire at 55 Calculator — Rule of 55 & Savings Plan",
    description:
      "Calculate savings to retire at 55 with $60,000 annual income, Rule of 55 401(k) access, and 25 years of compounding from age 30.",
    defaults: { currentAge: "30", retirementAge: "55", desiredIncome: "60000", currentSavings: "50000", monthlyContribution: "0" },
    intro:
      "Age 55 matters for retirement planning because the Rule of 55 can allow penalty-free withdrawals from your current employer's 401(k) if you leave in or after the year you turn 55 — five years before the usual 59½ threshold. With 25 years to save from age 30, the math is more forgiving than FIRE at 40 while still leaving a decade before Medicare at 65.",
    tips: [
      "$60,000 per year at a 4% withdrawal rate requires $1,500,000. From $50,000 at age 30 with 7% returns over 25 years, the calculator shows about $1,498 per month of savings to hit the target.",
      "Roll old 401(k) balances into your current employer's plan before you separate if you want those dollars eligible for the Rule of 55 — IRAs and former employers' plans do not qualify.",
      "Budget roughly 10 years of health coverage before Medicare at 65; COBRA typically lasts 18 months, then marketplace plans take over.",
      "Deferred compensation or stock paid at separation is ordinary income in the payout year — spreading distributions over two to three years can avoid jumping into the 35% bracket on a single large lump sum.",
      "Delaying Social Security from 62 to 67 increases the monthly benefit by roughly 24% for workers with full retirement age 67; your portfolio must cover the gap until you claim.",
    ],
    keyResults: [
      { label: "Portfolio needed (4% SWR)", value: "$1,500,000" },
      { label: "Monthly savings required", value: "$1,498 at 7% return" },
      { label: "Years to retirement", value: "25 years (age 30 to 55)" },
      { label: "Rule of 55 access", value: "Penalty-free 401(k) at separation" },
      { label: "Healthcare gap before Medicare", value: "10 years (age 55 to 65)" },
      { label: "SSA avg. benefit (Jan. 2027 est.)", value: "$2,170/mo retired worker" },
    ],
    comparisonNote:
      "Retiring at 55 instead of 50 on the same $60,000 goal saves about $994 per month in required savings ($1,498 vs $2,492) while unlocking Rule of 55 access to the active 401(k). Compared with retiring at 60 on $70,000 spending from age 35, you gain five years of freedom but give up five years of peak earnings and catch-up contributions.",
    faq: [
      {
        q: "How does the Rule of 55 work in practice?",
        a: "If you leave the employer sponsoring your 401(k) in or after the calendar year you turn 55, you can withdraw from that plan without the 10% early withdrawal penalty. The rule does not apply to IRAs or 401(k)s still held at prior employers unless you rolled them into the plan you are leaving.",
      },
      {
        q: "Should I roll old 401(k) balances into my current plan before retiring at 55?",
        a: "If penalty-free access at 55 is a priority, consolidating into the current employer's plan before separation is a common strategy. Leaving money in an old plan keeps it subject to the 10% penalty until 59½ unless another exception applies.",
      },
      {
        q: "How do I handle deferred compensation when I leave at 55?",
        a: "Nonqualified deferred compensation is typically taxed when paid. A $200,000 lump sum in one year can push a former executive from the 24% bracket into 35%. Installment payouts over two or three years, when permitted, spread the tax hit.",
      },
      {
        q: "When should I claim Social Security if I retire at 55?",
        a: "Earliest eligibility is 62 with a permanent reduction versus waiting until 67 for full benefits (for birth year 1960+). SSA estimates the average retired-worker benefit at $2,170 per month in January 2027 after the 3.6% COLA — the estimate in your my Social Security account is the authoritative number for you.",
      },
    ],
    sources: [SSA_COLA_2027, MORNINGSTAR_SWR],
    sourcesChecked: "October 2026",
  },
  {
    slug: "retire-at-60",
    lastUpdated: "2026-10-21",
    title: "Retire at 60 Calculator — Nest Egg & Catch-Up Savings",
    description:
      "Plan retirement at 60 with $70,000 desired income, 7% returns, and 401(k) catch-up limits. Five-year Medicare bridge and Social Security at 62.",
    defaults: { currentAge: "35", retirementAge: "60", desiredIncome: "70000", currentSavings: "50000", monthlyContribution: "0" },
    intro:
      "Retiring at 60 shortens the pre-Medicare gap to five years and puts early Social Security at 62 within reach — though claiming at 62 permanently reduces benefits versus waiting until 67. With 25 years from age 35 and $50,000 already invested, a $70,000 spending target at 4% ($1,750,000) requires about $1,807 per month at 7% returns in the pre-filled calculator.",
    tips: [
      "$70,000 per year at 4% equals a $1,750,000 portfolio. The variant defaults show about $1,807 per month of savings from age 35 with $50,000 starting balance and 7% returns.",
      "Claiming Social Security at 62 cuts the monthly check by about 30% versus full retirement age 67 for workers born in 1960 or later — on a $2,500 primary insurance amount, that is roughly $1,750 versus $2,500 per month.",
      "Bridge health coverage: COBRA for up to 18 months, then ACA marketplace plans until Medicare at 65 — build a line item in the budget, not a rough guess.",
      `From age 50, 401(k) catch-up deferrals add ${usd(RETIREMENT_LIMITS.catchUp50)} per year on top of the ${usd(RETIREMENT_LIMITS.employeeDeferral)} employee limit (${usd(RETIREMENT_LIMITS.catchUp50 * 10)} over 10 years before growth).`,
      "Required minimum distributions from traditional accounts begin at age 73 (age 75 for those born in 1960 or later, effective 2033). Draw taxable accounts first in your 50s and 60s when possible.",
    ],
    keyResults: [
      { label: "Portfolio needed (4% SWR)", value: "$1,750,000" },
      { label: "Monthly savings required", value: "$1,807 at 7% return" },
      { label: "Years to retirement", value: "25 years (age 35 to 60)" },
      { label: "Years to early Social Security", value: "2 years (age 62)" },
      { label: "Medicare gap", value: "5 years (age 60 to 65)" },
      { label: "401(k) catch-up (age 50+, 2026)", value: `+${usd(RETIREMENT_LIMITS.catchUp50)}/year` },
    ],
    comparisonNote:
      "Retiring at 60 leaves a five-year Medicare gap versus ten years at 55 and fifteen at 50, which lowers modeled healthcare spending by a wide margin. On this calculator's defaults, the $70,000 goal from age 35 requires about $1,807 per month — about $309 more than the $60,000-at-55 scenario ($1,498) because of the higher spending target, not because of the later date alone.",
    faq: [
      {
        q: "Should I claim Social Security at 62 or wait until full retirement age?",
        a: "Claiming at 62 with full retirement age 67 reduces benefits by about 30%. If your portfolio can fund two extra years of full expenses, waiting until 67 adds roughly $750 per month on a $2,500 full benefit — a meaningful increase over a 25-year retirement.",
      },
      {
        q: "How much do catch-up contributions help in my final decade of work?",
        a: `An extra ${usd(RETIREMENT_LIMITS.catchUp50)} per year from 50 to 59, invested at 7%, grows to about $118,000 before counting employer match — on top of standard deferrals.`,
      },
      {
        q: "What is the best strategy for bridging the five-year Medicare gap?",
        a: "Sequence COBRA while it is subsidized relative to alternatives, then shop ACA plans for the remaining years until 65. Include dental and vision separately — Original Medicare does not cover them.",
      },
      {
        q: "How should I sequence withdrawals between 60 and 73?",
        a: "Spend taxable brokerage dollars first, then tax-deferred after 59½, and let Roth assets compound longest. Low-income years before RMDs at 73 are prime years for partial Roth conversions.",
      },
    ],
    sources: [SSA_COLA_2027, IRS_RETIREMENT_LIMITS],
    sourcesChecked: "October 2026",
    sourcesNote: "Catch-up and deferral limits from IRS 2026 retirement plan limits.",
  },
  {
    slug: "retire-at-67",
    lastUpdated: "2026-10-21",
    title: "Retire at 67 Calculator — Full Social Security & Medicare",
    description:
      "Model retirement at full Social Security age 67 with $75,000 income goal, Medicare already active, and 32 years to save from age 35.",
    defaults: { currentAge: "35", retirementAge: "67", desiredIncome: "75000", currentSavings: "50000", monthlyContribution: "0" },
    intro:
      "Age 67 is full retirement age for Social Security for anyone born in 1960 or later — the baseline for many employer plans and Fidelity's 10x-salary savings benchmarks. Medicare begins at 65, so at 67 you have been on Medicare for two years; the main portfolio question is how much spending Social Security does not cover. SSA estimates the average retired-worker benefit at $2,170 per month in January 2027 after the 3.6% COLA.",
    tips: [
      "At 4%, $75,000 per year from investments alone requires $1,875,000. With $50,000 at 35 and 7% returns over 32 years, the calculator shows about $986 per month of savings to reach that target.",
      "If Social Security covers about $26,000 per year ($2,170 × 12), you might need roughly $49,000 from the portfolio — a $1,225,000 nest egg at 4%, not the full $1,875,000.",
      "Fidelity's age-based milestones (1× salary by 30, 3× by 40, 6× by 50, 8× by 60, 10× by 67) assume 15% annual savings from 25, retirement at 67, and no pension — use them as checkpoints, not law.",
      "Budget Medigap or Medicare Advantage plus Part D — supplemental premiums often run $200 to $400 per person per month on top of Part B.",
      "RMDs start at 73 (75 for birth year 1960+ beginning 2033). The six-plus years after 67 are useful for Roth conversions before forced taxable distributions.",
    ],
    keyResults: [
      { label: "Portfolio needed (4% SWR, no SS)", value: "$1,875,000" },
      { label: "Monthly savings required", value: "$986 at 7% return" },
      { label: "Years to retirement", value: "32 years (age 35 to 67)" },
      { label: "SSA avg. benefit (Jan. 2027 est.)", value: "$2,170/mo retired worker" },
      { label: "Medicare status at 67", value: "Eligible since age 65" },
      { label: "Portfolio if SS covers ~$26k/yr", value: "~$1,225,000 at 4%" },
    ],
    comparisonNote:
      "Retiring at 67 is the most forgiving timeline in this set: required monthly savings of about $986 on this variant's defaults is less than half the $3,944 needed for FIRE at 40. Social Security and Medicare shrink the income gap relative to early retirement, at the cost of decades more in the workforce.",
    faq: [
      {
        q: "How do I maximize my Social Security benefit at 67?",
        a: "Benefits are based on your highest 35 years of earnings indexed to national averages. Working through 67 replaces zero or low-earning years. Delaying past 67 adds about 8% per year until 70 — up to 24% above the full retirement age amount.",
      },
      {
        q: "When do required minimum distributions start and how should I prepare?",
        a: "SECURE 2.0 set RMDs at 73 for those who reach 72 after 2022, rising to 75 for those born in 1960 or later starting in 2033. Roth conversions in the years before RMDs reduce future forced withdrawals.",
      },
      {
        q: "What is the optimal Roth conversion strategy after retiring at 67?",
        a: "Convert enough each year to fill the 12% or 22% federal bracket without triggering IRMAA Medicare surcharges. With Social Security and portfolio income, many retirees convert $30,000 to $50,000 annually in the RMD window.",
      },
      {
        q: "How do spousal Social Security benefits work at full retirement age?",
        a: "A lower-earning spouse can receive up to 50% of the higher earner's full retirement age benefit if that exceeds their own earned benefit. SSA's January 2027 estimate for an aged couple both receiving benefits is $3,355 per month combined after the 3.6% COLA.",
      },
    ],
    sources: [SSA_COLA_2027, SSA_SNAPSHOT, FIDELITY_BENCHMARKS, MORNINGSTAR_SWR],
    sourcesChecked: "October 2026",
  },
];
