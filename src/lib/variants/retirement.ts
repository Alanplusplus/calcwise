export interface CalculatorVariant {
  slug: string;
  title: string;
  description: string;
  defaults: Record<string, string>;
  intro: string;
  tips: string[];
}

export const retirementVariants: CalculatorVariant[] = [
  {
    slug: "retire-at-40",
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
  },
  {
    slug: "retire-at-50",
    title: "Retire at 50 Calculator",
    description:
      "See what it takes to retire at 50. Calculate your savings target, monthly contributions needed, and whether your current plan gets you to early retirement.",
    defaults: { currentAge: "30", retirementAge: "50", desiredIncome: "60000" },
    intro:
      "Retiring at 50 gives you two full decades of earning power while still leaving 15+ years of freedom before traditional retirement age. This timeline appeals to high-earning professionals in demanding fields like tech, finance, and medicine who want to step away from the grind while they are still healthy and energetic. With 20 years of compounding, the math is more forgiving than extreme early retirement, but it still requires disciplined saving and a clear drawdown strategy for the gap years before Social Security kicks in.",
    tips: [
      "To generate $60,000 per year at a 4% withdrawal rate, you need $1,500,000 by age 50 -- starting at 30 with $50,000 saved and earning 7% annually, that means contributing about $2,950 per month.",
      "You will face a 15-year gap before Medicare at 65 and potentially 12-17 years before Social Security -- model your plan with zero government benefits until those ages to stress-test it.",
      "Maxing out both a 401(k) ($23,500) and a backdoor Roth IRA ($7,000) each year channels $30,500 into tax-advantaged accounts, but you will also need taxable brokerage savings to bridge the gap to 59.5.",
      "At 50 you may qualify for early pension benefits if you spent 20+ years with a government or union employer -- even a partial pension of $1,500 per month dramatically reduces the portfolio you need.",
      "Sequence-of-returns risk is elevated with a 35+ year retirement: holding 3 years of expenses in bonds or cash ($180,000) protects against being forced to sell equities at a loss.",
    ],
  },
  {
    slug: "retire-at-55",
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
  },
  {
    slug: "retire-at-60",
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
  },
  {
    slug: "retire-at-67",
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
  },
];
