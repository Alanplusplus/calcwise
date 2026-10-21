import type { CalculatorVariant } from "./types";
import { RETIREMENT_LIMITS, usd } from "../tax-data";

export const retirementVariants: CalculatorVariant[] = [
  {
    slug: "retire-at-40",
    lastUpdated: "2026-08-22",
    title: "Retire at 40 (FIRE) Calculator",
    description:
      "Plan your path to financial independence and early retirement at 40. Calculate how much you need to save and invest to leave the workforce 25 years early.",
    defaults: { currentAge: "25", retirementAge: "40", desiredIncome: "50000" },
    intro:
      "Retiring at 40 is the hallmark goal of the FIRE (Financial Independence, Retire Early) movement. With only 15 working years to build a nest egg that must last 45+ years, this path demands an aggressive savings rate -- typically 50% to 70% of take-home pay. Most FIRE adherents target a portfolio of 25 to 30 times their annual spending, lean heavily into low-cost index funds, and often supplement early retirement with part-time passion projects or rental income.",
    tips: [
      "At a 4% withdrawal rate, a $50,000 annual income requires a portfolio of $1,250,000 at retirement -- but many early retirees use a 3.5% rate ($1,428,571) to add a safety margin over a 45+ year horizon.",
      "Starting at 25 with $0 saved, you would need to invest roughly $4,800 per month at a 7% return to reach $1,250,000 by age 40 -- that is feasible on a six-figure income but requires extreme frugality.",
      "Healthcare is the biggest wildcard: without employer coverage, budget $400-$800 per month for marketplace insurance until you reach Medicare eligibility at 65, adding $4,800-$9,600 per year to your expenses.",
      "Consider building a 2-year cash buffer ($100,000) outside your investment portfolio to avoid selling equities during a market downturn in the first years of retirement.",
      "Roth conversion ladders let you access retirement account funds before age 59.5 without penalties -- start planning these 5 years before your target retirement date.",
    ],
    keyResults: [
      { label: "Portfolio needed (4% SWR)", value: "$1,250,000" },
      { label: "Monthly savings required", value: "$4,800 at 7% return" },
      { label: "Years to retirement", value: "15 years (age 25 to 40)" },
      { label: "Years of retirement", value: "45+ years (age 40 to 85+)" },
      { label: "Healthcare gap before Medicare", value: "25 years (age 40 to 65)" },
      { label: "Estimated healthcare cost", value: "$120,000-$240,000 over 25 years" },
    ],
    comparisonNote:
      "Retiring at 40 requires roughly $4,800 per month in savings versus about $1,800 per month to retire at 55 on the same $60,000 income goal -- a 10-year delay cuts the required savings rate by more than 60%. The trade-off is 10 fewer years of freedom, but the lower savings burden makes the plan achievable for a much wider range of earners.",
    faq: [
      {
        q: "How does a Roth conversion ladder work for retiring at 40?",
        a: "You convert a portion of your traditional IRA to Roth each year while still working, then wait five years before withdrawing those converted amounts penalty-free. Stagger conversions over your final working years to stay in lower tax brackets and build a pipeline of accessible funds that covers the gap until age 59.5.",
      },
      {
        q: "How do I pay for healthcare before Medicare at 65?",
        a: "Most early retirees purchase ACA marketplace plans, which cost roughly $400-$800 per month depending on age and location. You may qualify for premium tax credits if your retirement income is low enough, but budget at least $6,000-$10,000 per year for premiums and out-of-pocket costs until Medicare begins.",
      },
      {
        q: "How serious is sequence-of-returns risk over a 45-year retirement?",
        a: "A market crash in your first five years of retirement can permanently reduce portfolio longevity because you are selling shares at depressed prices to fund living expenses. Holding two to three years of expenses in cash or bonds and using a 3.5% withdrawal rate instead of 4% significantly reduces the probability of running out of money over a 45+ year horizon.",
      },
      {
        q: "What happens if I earn part-time income after retiring at 40?",
        a: "Even $15,000-$20,000 per year in part-time or freelance income reduces the amount you must withdraw from your portfolio by 30-40%, dramatically extending its lifespan. Many FIRE retirees treat part-time work as optional insurance rather than a requirement, but the income buffer provides meaningful protection against inflation and market downturns.",
      },
    ],
  },
  {
    slug: "retire-at-50",
    lastUpdated: "2026-08-22",
    title: "Retire at 50 Calculator",
    description:
      "See what it takes to retire at 50. Calculate your savings target, monthly contributions needed, and whether your current plan gets you to early retirement.",
    defaults: { currentAge: "30", retirementAge: "50", desiredIncome: "60000" },
    intro:
      "Retiring at 50 gives you two full decades of earning power while still leaving 15+ years of freedom before traditional retirement age. This timeline appeals to high-earning professionals in demanding fields like tech, finance, and medicine who want to step away from the grind while they are still healthy and energetic. With 20 years of compounding, the math is more forgiving than extreme early retirement, but it still requires disciplined saving and a clear drawdown strategy for the gap years before Social Security kicks in.",
    tips: [
      "To generate $60,000 per year at a 4% withdrawal rate, you need $1,500,000 by age 50 -- starting at 30 with $50,000 saved and earning 7% annually, that means contributing about $2,950 per month.",
      "You will face a 15-year gap before Medicare at 65 and potentially 12-17 years before Social Security -- model your plan with zero government benefits until those ages to stress-test it.",
      `Maxing out both a 401(k) (${usd(RETIREMENT_LIMITS.employeeDeferral)}) and a backdoor Roth IRA (${usd(RETIREMENT_LIMITS.ira)}) each year channels ${usd(RETIREMENT_LIMITS.employeeDeferral + RETIREMENT_LIMITS.ira)} into tax-advantaged accounts, but you will also need taxable brokerage savings to bridge the gap to 59.5.`,
      "At 50 you may qualify for early pension benefits if you spent 20+ years with a government or union employer -- even a partial pension of $1,500 per month dramatically reduces the portfolio you need.",
      "Sequence-of-returns risk is elevated with a 35+ year retirement: holding 3 years of expenses in bonds or cash ($180,000) protects against being forced to sell equities at a loss.",
    ],
    keyResults: [
      { label: "Portfolio needed (4% SWR)", value: "$1,500,000" },
      { label: "Monthly savings required", value: "$2,950 at 7% return" },
      { label: "Years to retirement", value: "20 years (age 30 to 50)" },
      { label: "Medicare gap", value: "15 years (age 50 to 65)" },
      { label: "Social Security gap", value: "12-17 years (age 50 to 62-67)" },
      { label: "Estimated healthcare cost", value: "$72,000-$126,000 over 15 years" },
    ],
    comparisonNote:
      "Retiring at 50 sits between the aggressive FIRE-at-40 path and the more conventional retire-at-55 timeline. You save roughly $1,850 per month less than a 40-year-old FIRE target while still gaining five extra years of compounding compared to retiring at 55, making it a practical middle ground for high earners who want early freedom without extreme savings rates.",
    faq: [
      {
        q: "Does the Rule of 55 apply if I retire at 50?",
        a: "No. The Rule of 55 only allows penalty-free 401(k) withdrawals when you leave your employer in or after the calendar year you turn 55. Retiring at 50 means you still face the 10% early withdrawal penalty on tax-deferred accounts until age 59.5, unless you use SEPP (72(t)) distributions or Roth conversion ladders.",
      },
      {
        q: "Why do I need a taxable brokerage account to retire at 50?",
        a: "Tax-advantaged accounts like 401(k)s and IRAs carry early withdrawal penalties before age 59.5, and the Rule of 55 does not help at 50. A taxable brokerage account provides penalty-free access to funds for living expenses during the 10-15 year bridge before you can tap retirement accounts without penalties.",
      },
      {
        q: "How should I bridge the gap before Social Security and Medicare?",
        a: "Plan for zero Social Security income until at least age 62 and no Medicare until 65, using your portfolio and taxable savings to cover all expenses during the gap. Budget $400-$700 per month for marketplace health insurance and consider COBRA for the first 18 months if your employer plan is more affordable.",
      },
      {
        q: "Can an early pension reduce how much I need to save?",
        a: "Yes. A partial pension of $1,500 per month ($18,000 per year) effectively replaces $450,000 of portfolio value at a 4% withdrawal rate. Government and union employees with 20+ years of service are the most likely to qualify for meaningful early pension benefits at age 50.",
      },
    ],
  },
  {
    slug: "retire-at-55",
    lastUpdated: "2026-08-22",
    title: "Retire at 55 Calculator",
    description:
      "Calculate your retirement readiness for age 55. Find out how much to save monthly and what portfolio size you need to retire comfortably a decade early.",
    defaults: { currentAge: "30", retirementAge: "55", desiredIncome: "60000" },
    intro:
      "Age 55 is a strategic retirement target because it unlocks the Rule of 55, which lets you withdraw from your current employer's 401(k) without the 10% early withdrawal penalty. This five-year head start over the standard 59.5 threshold gives you penalty-free access to a significant portion of your retirement savings. With 25 years to save starting at 30, you have meaningful time for compound growth while still escaping the workforce well before the traditional retirement age.",
    tips: [
      "A $60,000 annual income at a 4% withdrawal rate requires $1,500,000 -- with 25 years and a 7% return, starting from $50,000 and contributing roughly $1,800 per month gets you there.",
      "The Rule of 55 only applies to the 401(k) at the employer you leave at age 55 or later -- roll old 401(k) balances into your current plan before separating to maximize penalty-free access.",
      "You will need to cover healthcare for 10 years before Medicare: COBRA lasts only 18 months, so plan for marketplace insurance at $400-$700 per month ($48,000-$84,000 over the decade).",
      "If your employer offers a deferred compensation plan or stock options that vest at separation, factor in the tax impact -- a lump-sum payout at 55 could push you into the 32% or 35% bracket.",
      "Social Security benefits increase roughly 7% for each year you delay claiming beyond 62, up to age 70 -- retiring at 55 but waiting until 67-70 to claim can boost your monthly benefit by 24% to 77%.",
    ],
    keyResults: [
      { label: "Portfolio needed (4% SWR)", value: "$1,500,000" },
      { label: "Monthly savings required", value: "$1,800 at 7% return" },
      { label: "Years to retirement", value: "25 years (age 30 to 55)" },
      { label: "Rule of 55 access", value: "Penalty-free 401(k) withdrawals at separation" },
      { label: "Healthcare gap before Medicare", value: "10 years (age 55 to 65)" },
      { label: "Estimated healthcare cost", value: "$48,000-$84,000 over 10 years" },
    ],
    comparisonNote:
      "Retiring at 55 instead of 50 saves you roughly $1,150 per month in required contributions while unlocking the Rule of 55 for penalty-free 401(k) access. Compared to retiring at 60, you gain five extra years of freedom but must cover a longer healthcare gap and forgo five years of peak-earning catch-up contributions.",
    faq: [
      {
        q: "How does the Rule of 55 work in practice?",
        a: "If you leave your employer in or after the year you turn 55, you can withdraw from that employer's 401(k) without the 10% early withdrawal penalty. The rule applies only to the plan of the employer you separate from -- not to IRAs or old 401(k) balances held at previous employers.",
      },
      {
        q: "Should I roll old 401(k) balances into my current plan before retiring at 55?",
        a: "Yes, if you want penalty-free access to those funds under the Rule of 55. Balances left in former employers' 401(k) plans remain subject to the 10% penalty until age 59.5. Consolidating into your current employer's plan before separation is a common strategy to maximize accessible retirement assets.",
      },
      {
        q: "How do I handle deferred compensation when I leave at 55?",
        a: "Deferred compensation and stock option payouts are typically taxed as ordinary income in the year they are distributed. A large lump-sum payout at separation can push you into the 32% or 35% tax bracket, so negotiate installment distributions over two to three years if your employer allows it.",
      },
      {
        q: "When should I claim Social Security if I retire at 55?",
        a: "Waiting until full retirement age (67 for those born in 1960 or later) increases your benefit by roughly 24% compared to claiming at 62. With a 12-year gap between retirement and eligibility, your portfolio must cover all expenses until then -- but delaying Social Security can add $400-$600 per month to your lifetime benefit.",
      },
    ],
  },
  {
    slug: "retire-at-60",
    lastUpdated: "2026-08-22",
    title: "Retire at 60 Calculator",
    description:
      "Plan for retirement at 60 with this calculator. Estimate your savings needs, projected portfolio growth, and monthly income in retirement five years early.",
    defaults: { currentAge: "35", retirementAge: "60", desiredIncome: "70000" },
    intro:
      "Retiring at 60 is one of the most achievable early retirement targets, offering a balance between accumulating a solid nest egg and gaining meaningful extra years of freedom. At this age you are only 2 years from early Social Security eligibility and 5 years from Medicare, which dramatically reduces the bridging costs that younger retirees face. Many workers at 60 have reached peak earning years, paid off their mortgages, and finished funding their children's education -- freeing up significant cash flow for last-mile saving.",
    tips: [
      "To support $70,000 per year at a 4% withdrawal rate, you need $1,750,000 -- starting at 35 with $50,000 and a 7% return, contributing about $1,850 per month reaches this target over 25 years.",
      "If you claim Social Security at 62 (the earliest age), your benefit will be permanently reduced by about 30% compared to your full retirement age benefit -- for a $2,500 full benefit, that is only $1,750 per month.",
      "Bridge the 5-year Medicare gap with a combination of COBRA (18 months), marketplace insurance, and health-share plans -- budget $500-$900 per month ($30,000-$54,000 total).",
      "Catch-up contributions kick in at 50: you can add an extra $7,500 per year to your 401(k) beyond the standard limit, funneling an additional $75,000 into your portfolio over the final decade.",
      "At 60 you are close enough to required minimum distribution age (73) that tax-efficient withdrawal sequencing matters -- draw from taxable accounts first, then tax-deferred, to let Roth assets grow longest.",
    ],
    keyResults: [
      { label: "Portfolio needed (4% SWR)", value: "$1,750,000" },
      { label: "Monthly savings required", value: "$1,850 at 7% return" },
      { label: "Years to retirement", value: "25 years (age 35 to 60)" },
      { label: "Years to Social Security", value: "2 years to early eligibility at 62" },
      { label: "Medicare gap", value: "5 years (age 60 to 65)" },
      { label: "Catch-up contribution boost", value: "+$7,500/year to 401(k) from age 50" },
    ],
    comparisonNote:
      "Retiring at 60 requires only five years of healthcare bridging compared to 10 years at 55 and 15 years at 50, significantly reducing one of the biggest early-retirement costs. You give up five years of freedom versus retiring at 55, but the shorter gap to Social Security and Medicare makes the drawdown plan far less stressful.",
    faq: [
      {
        q: "Should I claim Social Security at 62 or wait until full retirement age?",
        a: "Claiming at 62 permanently reduces your benefit by about 30% compared to your full retirement age amount. If your full benefit is $2,500 per month, early claiming yields roughly $1,750 -- a $750 monthly reduction that compounds over a 25+ year retirement. Waiting until 67 is generally better if your portfolio can cover the two-year gap.",
      },
      {
        q: "How much do catch-up contributions help in my final decade of work?",
        a: `Starting at 50, you can contribute an extra ${usd(RETIREMENT_LIMITS.catchUp50)} per year to your 401(k) beyond the standard ${usd(RETIREMENT_LIMITS.employeeDeferral)} limit. Over 10 years, that adds ${usd(RETIREMENT_LIMITS.catchUp50 * 10)} in contributions plus compounded growth, potentially increasing your portfolio by roughly $105,000-$116,000 at 6% to 8% annual returns.`,
      },
      {
        q: "What is the best strategy for bridging the five-year Medicare gap?",
        a: "Use COBRA from your employer plan for the first 18 months, then transition to an ACA marketplace plan for the remaining 3.5 years. Budget $500-$900 per month ($30,000-$54,000 total) and explore health-share ministries or spousal employer coverage as lower-cost alternatives.",
      },
      {
        q: "How should I sequence withdrawals between 60 and 73?",
        a: "Draw from taxable brokerage accounts first to let tax-deferred assets continue compounding, then tap traditional IRA and 401(k) funds after age 59.5 without penalty. Use the years between 60 and 73 for Roth conversions in low-income years to reduce future required minimum distributions.",
      },
    ],
  },
  {
    slug: "retire-at-67",
    lastUpdated: "2026-08-22",
    title: "Retire at 67 (Full SS Age) Calculator",
    description:
      "Calculate retirement savings for the standard retirement age of 67. See how Social Security, savings, and investment returns combine to fund your retirement.",
    defaults: { currentAge: "35", retirementAge: "67", desiredIncome: "75000" },
    intro:
      "Age 67 is the full retirement age for Social Security for anyone born in 1960 or later, making it the default planning target for most American workers. Retiring at this age means you receive your full unreduced Social Security benefit, qualify for Medicare at 65, and have over three decades of potential compounding on early career savings. This timeline is the most forgiving for late starters and provides a strong foundation for a comfortable 20 to 25 year retirement.",
    tips: [
      "At a 4% withdrawal rate, $75,000 per year requires $1,875,000 in savings -- but Social Security replaces roughly 35-40% of pre-retirement income for median earners, potentially reducing your needed portfolio to around $1,200,000.",
      "Starting at 35 with $50,000 saved, reaching $1,875,000 by 67 at a 7% return requires approximately $1,250 per month -- a manageable goal for dual-income households earning the median wage.",
      "The average Social Security benefit at full retirement age is approximately $1,900 per month ($22,800 per year) -- a married couple both claiming at 67 might receive $3,400-$4,000 per month combined.",
      "At 67 you have been Medicare-eligible for 2 years already, but you still need a Medigap or Medicare Advantage plan plus Part D drug coverage -- budget $200-$400 per month per person for supplemental premiums.",
      "Required minimum distributions from traditional IRAs and 401(k)s start at age 73 -- use the 6 years between 67 and 73 for strategic Roth conversions that can reduce your future tax burden significantly.",
    ],
    keyResults: [
      { label: "Portfolio needed (4% SWR)", value: "$1,875,000 (or ~$1,200,000 with SS)" },
      { label: "Monthly savings required", value: "$1,250 at 7% return" },
      { label: "Years to retirement", value: "32 years (age 35 to 67)" },
      { label: "Estimated Social Security benefit", value: "~$1,900/month at full retirement age" },
      { label: "Medicare status at retirement", value: "Already eligible (since age 65)" },
      { label: "Roth conversion window", value: "6 years before RMDs at age 73" },
    ],
    comparisonNote:
      "Retiring at 67 is the most forgiving timeline: Social Security replaces 35-40% of income, Medicare is already active, and the required monthly savings of $1,250 is less than half what FIRE-at-40 demands. You trade 27 years of potential early freedom for a plan that works on median household incomes without extreme frugality.",
    faq: [
      {
        q: "How do I maximize my Social Security benefit at 67?",
        a: "Your benefit is based on your highest 35 years of earnings, so working until 67 ensures you replace any zero or low-earning years in that calculation. Delaying beyond 67 increases your benefit by roughly 8% per year until age 70, adding up to 24% to your monthly check.",
      },
      {
        q: "When do required minimum distributions start and how should I prepare?",
        a: "RMDs from traditional IRAs and 401(k)s begin at age 73, forcing you to withdraw a percentage of your balance each year regardless of need. Use the six-year window between 67 and 73 to execute Roth conversions in lower-income years, reducing the balance subject to future RMDs and lowering your overall tax burden.",
      },
      {
        q: "What is the optimal Roth conversion strategy after retiring at 67?",
        a: "Convert enough each year to fill lower tax brackets (typically the 12% or 22% bracket) without pushing yourself into a higher one. With Social Security and portfolio withdrawals as your primary income, you can often convert $30,000-$50,000 per year at favorable rates during the gap before RMDs force larger taxable distributions.",
      },
      {
        q: "How do spousal Social Security benefits work at full retirement age?",
        a: "A lower-earning spouse can claim up to 50% of the higher earner's full retirement age benefit, whichever is greater between that spousal amount and their own earned benefit. For a couple where one spouse receives $2,500 and the other $900, the spousal benefit could increase the lower earner's check to $1,250 per month.",
      },
    ],
  },
];
