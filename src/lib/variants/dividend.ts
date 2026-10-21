import type { CalculatorVariant } from "./types";

export const dividendVariants: CalculatorVariant[] = [
  {
    slug: "high-yield-stocks",
    lastUpdated: "2026-10-21",
    title: "High-Yield Dividend Calculator — 6% Yield Model",
    description:
      "Model a $15,000 high-yield portfolio at 6% with DRIP and $300/month added. See $178,430 value and $9,261 annual income after 15 years.",
    defaults: {
      investmentAmount: "15000",
      sharePrice: "40",
      dividendPerShare: "2.40",
      dividendGrowth: "3",
      sharePriceGrowth: "4",
      years: "15",
      monthlyContribution: "300",
    },
    intro:
      "High-yield equity strategies target cash flow well above the S&P 500 index yield of about 1.05% (Multpl, October 2026). The defaults use a hypothetical 6.00% starting yield ($2.40 dividend on a $40 share), 3% dividend growth, 4% price growth, $300 monthly contributions, and DRIP. After 15 years the calculator shows about $178,430 in portfolio value, $9,261 in annual dividend income, and $65,259 in cumulative dividends on $69,000 contributed — useful for stress-testing income plans, not a forecast of any single sector fund.",
    tips: [
      "Starting yield is 6.00% ($2.40 ÷ $40). Year-one dividends on $15,000 are about $900 before contributions and reinvestment.",
      "With DRIP and $300/month, year-15 portfolio value is about $178,430 and annual dividends about $9,261 — verify payout ratios before you chase yields above 6%.",
      "Yields above 7% deserve extra scrutiny: check payout ratio and free cash flow coverage; REITs often use different metrics than industrial stocks.",
      "Contributions alone total $54,000 over 15 years ($300 × 180 months) plus $15,000 upfront; growth above that comes from reinvested dividends and price appreciation in the model.",
      "Qualified dividend tax rates (0%, 15%, or 20% for tax year 2026) beat ordinary income rates on many REIT distributions — location in tax-advantaged accounts still matters.",
    ],
    keyResults: [
      { label: "Starting yield", value: "6.00%" },
      { label: "Portfolio value (year 15)", value: "$178,430" },
      { label: "Annual dividend income (year 15)", value: "$9,261" },
      { label: "Total invested", value: "$69,000" },
      { label: "Cumulative dividends", value: "$65,259" },
      { label: "S&P 500 index yield (Oct. 2026)", value: "~1.05%" },
    ],
    comparisonNote:
      "This 6% starting yield generates far more day-one income than the broad market's ~1.05% index yield, but the S&P 500's long-run total return near 10% per year (1928–2025, Damodaran) came mostly from price gains, not yield. High-yield portfolios trade higher current income for slower dividend growth and higher cut risk than Dividend Aristocrats.",
    faq: [
      {
        q: "How do I tell if a high dividend yield is sustainable?",
        a: "Compare dividends to earnings and free cash flow. Payout ratios above 80% (non-REIT) or rising debt-funded payouts often precede cuts. A yield spike from a falling share price — not higher dividends — is a common warning sign.",
      },
      {
        q: "What is a dividend trap?",
        a: "A trap is a high quoted yield that reflects price collapse before a cut. Screen for stable earnings, manageable debt, and a history of payments through at least one downturn.",
      },
      {
        q: "Should I prioritize yield or dividend growth?",
        a: "Under age 55, blending 4–5% yield with 4–6% dividend growth often compounds faster than maximizing yield alone. Use this calculator twice — high yield vs Aristocrat-style growth — to see the crossover in your time horizon.",
      },
    ],
    sources: [
      {
        label: "Multpl S&P 500 dividend yield (Oct. 20, 2026)",
        href: "https://www.multpl.com/s-p-500-dividend-yield",
      },
      {
        label: "Damodaran S&P 500 historical returns (Jan. 2026)",
        href: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html",
      },
    ],
    sourcesChecked: "October 2026",
  },
  {
    slug: "dividend-aristocrats",
    lastUpdated: "2026-10-21",
    title: "Dividend Aristocrat Calculator — 25+ Year Raisers",
    description:
      "Model a $20,000 Aristocrat-style portfolio at 3% yield with 8% dividend growth. DRIP and $400/month for 25 years → $873,518 value.",
    defaults: {
      investmentAmount: "20000",
      sharePrice: "65",
      dividendPerShare: "1.95",
      dividendGrowth: "8",
      sharePriceGrowth: "8",
      years: "25",
      monthlyContribution: "400",
    },
    intro:
      "S&P 500 Dividend Aristocrats are index members that raised dividends at least 25 consecutive years. The index held 69 constituents after the January 2026 reconstitution (S&P Dow Jones Indices / ProShares index data). The defaults model a 3.00% yield ($1.95 on a $65 share), 8% dividend and price growth, $400 monthly contributions, and DRIP — not any single stock. After 25 years the calculator shows about $873,518 in value and $26,206 in annual dividends on $140,000 total contributions.",
    tips: [
      "Starting yield is 3.00%. Year-one dividends on $20,000 are about $600 before additions — lower than high-yield tiers, but 8% modeled growth compounds income faster over decades.",
      "The S&P 500 Dividend Aristocrats index dividend yield was about 2.60% as of September 30, 2026 (ProShares NOBL index facts) — above the broad S&P 500 index yield near 1.05%.",
      "Hold 15–20 names across sectors for diversification; the official index includes 69 companies but equal-weighting in the index prevents one mega-cap from dominating.",
      "A freeze ends Aristocrat status even without a cut — watch payout ratio trends and management guidance during recessions.",
      "Aristocrat dividends generally qualify for favorable long-term rates in taxable accounts; Roth IRAs eliminate annual dividend tax drag entirely.",
    ],
    keyResults: [
      { label: "Starting yield", value: "3.00%" },
      { label: "Portfolio value (year 25)", value: "$873,518" },
      { label: "Annual dividend income (year 25)", value: "$26,206" },
      { label: "Total invested", value: "$140,000" },
      { label: "Cumulative dividends", value: "$214,003" },
      { label: "Aristocrats index members (2026)", value: "69 companies" },
    ],
    comparisonNote:
      "Aristocrat-style compounding emphasizes dividend growth over starting yield. Versus the high-yield variant on this site, you sacrifice early income for faster long-run dividend growth in the model. S&P DJI research notes Dividend Aristocrats have often delivered competitive total returns with lower volatility than the broad S&P 500 over long windows — past index rules do not guarantee future membership or returns.",
    faq: [
      {
        q: "How many Dividend Aristocrats should I hold?",
        a: "Fifteen to twenty names across at least eight sectors reduces single-stock risk. You can also use an ETF that tracks the S&P 500 Dividend Aristocrats index if you prefer one-ticket diversification.",
      },
      {
        q: "Can a company lose Aristocrat status?",
        a: "Yes. One year without a dividend increase removes the stock from the index, even if the dividend is maintained. Several former members froze payouts after industry shocks.",
      },
      {
        q: "Taxable account or IRA for Aristocrats?",
        a: "Either works. Taxable accounts benefit from qualified dividend rates; Roth IRAs eliminate tax on decades of DRIP growth. Traditional IRAs defer tax until withdrawal.",
      },
    ],
    sources: [
      {
        label: "S&P DJI Dividend Aristocrats research (2025 constituents)",
        href: "https://www.spglobal.com/spdji/en/documents/research/research-sp500-dividend-aristocrats.pdf",
      },
      {
        label: "ProShares NOBL index facts (Sept. 30, 2026)",
        href: "https://www.proshares.com/our-etfs/strategic/nobl",
      },
    ],
    sourcesChecked: "October 2026",
  },
  {
    slug: "reit-income",
    lastUpdated: "2026-10-21",
    title: "REIT Dividend Income Calculator — 6% Yield",
    description:
      "Model a $25,000 REIT portfolio at 6% yield with DRIP. See $384,636 after 20 years and $19,058 annual income with $250/month added.",
    defaults: {
      investmentAmount: "25000",
      sharePrice: "35",
      dividendPerShare: "2.10",
      dividendGrowth: "4",
      sharePriceGrowth: "5",
      years: "20",
      monthlyContribution: "250",
    },
    intro:
      "REITs must distribute at least 90% of taxable income to shareholders, which supports yields above the S&P 500 index average near 1.05%. The defaults use a 6.00% modeled yield ($2.10 on a $35 share), 4% dividend growth, 5% price growth, $250 monthly contributions, and DRIP. After 20 years the calculator shows $384,636 in portfolio value and $19,058 in annual dividends. Most REIT distributions are taxed as ordinary income in taxable accounts — IRAs avoid that drag.",
    tips: [
      "Day-one income on $25,000 at 6% is $1,500 per year ($125 per month) in the model before growth and contributions.",
      "Hold REITs in a Roth IRA when possible: ordinary-income taxation on distributions can cost hundreds of dollars per year on a taxable $25,000 balance.",
      "Industrial and data-center REITs outperformed many office and retail REITs in the 2010s and early 2020s — sector mix matters more than the label 'REIT.'",
      "Rising Treasury yields (10-year near 5.15% in October 2026) can pressure REIT prices even when dividends hold; stress-test with lower sharePriceGrowth inputs.",
      "Diversify across property types rather than one mortgage REIT or single-tenant office name.",
    ],
    keyResults: [
      { label: "Starting yield", value: "6.00%" },
      { label: "Portfolio value (year 20)", value: "$384,636" },
      { label: "Annual dividend income (year 20)", value: "$19,058" },
      { label: "Total invested", value: "$85,000" },
      { label: "Cumulative dividends", value: "$158,499" },
      { label: "REIT payout requirement", value: "≥90% of taxable income" },
    ],
    comparisonNote:
      "REITs in this model start near 6% yield versus ~3% for Dividend Aristocrat defaults and ~1% for the broad index. Tax treatment is worse in taxable accounts than qualified dividends from C-corps. Blend REITs as a slice of income portfolios rather than the entire equity allocation.",
    faq: [
      {
        q: "Why are REIT dividends mostly ordinary income?",
        a: "REIT pass-through income retains character as non-qualified dividends for most investors. A portion may be return of capital, lowering basis. IRAs sidestep annual taxation.",
      },
      {
        q: "How do rate hikes affect REITs?",
        a: "Higher rates raise borrowing costs and compete with yield-oriented stocks. REITs with inflation-linked leases and moderate leverage historically weathered cycles better than highly levered office portfolios.",
      },
      {
        q: "Roth IRA or taxable for REITs?",
        a: "Roth is usually optimal. Taxable $25,000 at 6% generates about $1,500 in annually taxable ordinary income — at a 22% marginal rate that is about $330 per year in federal tax before state tax.",
      },
    ],
    sources: [
      {
        label: "Multpl S&P 500 dividend yield (Oct. 20, 2026)",
        href: "https://www.multpl.com/s-p-500-dividend-yield",
      },
      {
        label: "Federal Reserve H.15 (10-year yield, Oct. 2026)",
        href: "https://www.federalreserve.gov/releases/h15/",
      },
    ],
    sourcesChecked: "October 2026",
    sourcesNote: "REIT tax rules are general; consult IRS Pub. 550 and your preparer for your forms.",
  },
  {
    slug: "retirement-dividend-income",
    lastUpdated: "2026-10-21",
    title: "Retirement Dividend Income Calculator — 25 Years",
    description:
      "Build from $50,000 with $500/month at 3% yield and 6% dividend growth. Model $1.1M portfolio and $26,303 annual dividends in 25 years.",
    defaults: {
      investmentAmount: "50000",
      sharePrice: "55",
      dividendPerShare: "1.65",
      dividendGrowth: "6",
      sharePriceGrowth: "7",
      years: "25",
      monthlyContribution: "500",
    },
    intro:
      "Retirement dividend planning pairs accumulation (DRIP and contributions) with a later switch to cash payouts. Defaults: $50,000 start, 3.00% yield, 6% dividend growth, 7% price growth, $500 per month, 25 years, DRIP on. The calculator shows about $1,108,762 in portfolio value and $26,303 in annual dividends at year 25 on $200,000 contributed. Average Social Security for retired workers was $2,088.79 per month in September 2026 (about $25,066 per year) — dividend income stacks on top, it rarely replaces Social Security entirely.",
    tips: [
      "Year-25 annual dividends of about $26,303 plus average Social Security near $25,066 imply about $51,369 in combined cash before tax — adjust for your actual benefit estimate at ssa.gov.",
      "The 4% withdrawal rule on $1 million targets $40,000 per year from total portfolio value; this dividend model generates similar income at year 25 without selling shares in the projection — real portfolios still need cash buffers.",
      "Start shifting from pure growth to higher-yield holdings in the last decade before retirement if you plan to live off cash dividends.",
      "Every five years of delayed saving at $500/month materially lowers year-25 income — rerun the calculator with five fewer years to see the gap.",
      "Qualified dividend rates for tax year 2026 follow long-term capital gains brackets; IRAs simplify tax during accumulation.",
    ],
    keyResults: [
      { label: "Starting yield", value: "3.00%" },
      { label: "Portfolio value (year 25)", value: "$1,108,762" },
      { label: "Annual dividend income (year 25)", value: "$26,303" },
      { label: "Total invested", value: "$200,000" },
      { label: "Avg Social Security (retired worker, Sep. 2026)", value: "$2,089/mo" },
      { label: "Income for $40K/yr at 4% rule", value: "~$1,000,000 portfolio" },
    ],
    comparisonNote:
      "This path builds dividend income gradually unlike a high-yield strategy that maximizes checks in year one. A total-return approach with periodic sales and the 4% rule may reach the same spending with fewer dollars if yields stay near 1% on the broad market — many retirees blend dividends, bond coupons, and selective sales.",
    faq: [
      {
        q: "How much do I need for $40,000 in annual dividend income?",
        a: "At a 4% portfolio yield you need $1,000,000 in dividend payers. At 3% yield you need about $1,333,333 unless dividend growth closes the gap over time. Subtract expected Social Security from the income you must fund from portfolios.",
      },
      {
        q: "When should I stop reinvesting dividends?",
        a: "Many planners switch from DRIP to cash three to five years before relying on the income, building a buffer for lumpy expenses while compounding continues until then.",
      },
      {
        q: "Can dividends alone fund retirement?",
        a: "Possible for large portfolios, but most households combine dividends, Social Security, and periodic bond or fund withdrawals for flexibility in down markets.",
      },
    ],
    sources: [
      {
        label: "SSA Monthly Statistical Snapshot (Sep. 2026)",
        href: "https://www.ssa.gov/policy/docs/quickfacts/stat_snapshot/",
      },
      {
        label: "Multpl S&P 500 dividend yield (Oct. 2026)",
        href: "https://www.multpl.com/s-p-500-dividend-yield",
      },
    ],
    sourcesChecked: "October 2026",
  },
  {
    slug: "drip-vs-cash",
    lastUpdated: "2026-10-21",
    title: "DRIP vs Cash Dividends Calculator — 20 Years",
    description:
      "Compare DRIP vs cash on $30,000 at 4% yield with $300/month added. DRIP reaches $444,460 vs $263,674 cash over 20 years.",
    defaults: {
      investmentAmount: "30000",
      sharePrice: "50",
      dividendPerShare: "2.00",
      dividendGrowth: "5",
      sharePriceGrowth: "7",
      years: "20",
      monthlyContribution: "300",
      reinvest: "yes",
    },
    intro:
      "DRIP reinvestment buys additional shares with each dividend, accelerating compounding. The defaults ($30,000 start, 4% yield, 5% dividend growth, 7% price growth, $300 monthly, 20 years) produce about $444,460 with DRIP versus about $263,674 if the same dividends were taken as cash — a $180,786 gap on identical contributions. Reinvested dividends are still taxable in the year received in taxable accounts even when you never touch the cash.",
    tips: [
      "Toggle DRIP off in the calculator to reproduce the cash-dividend path ($263,674 ending value with the same inputs).",
      "Starting share count is 600 at $50; DRIP and contributions grow that to thousands of shares by year 20 in the model.",
      "Investors under 50 usually maximize DRIP during accumulation; switch to cash a few years before spending the income.",
      "Market dips let each dividend buy more shares — DRIP is mechanically favorable when prices fall temporarily.",
      "Set aside cash in taxable accounts for dividend tax — qualified rates are 0%, 15%, or 20% for tax year 2026 depending on income.",
    ],
    keyResults: [
      { label: "Starting yield", value: "4.00%" },
      { label: "Portfolio with DRIP (year 20)", value: "$444,460" },
      { label: "Portfolio taking cash (year 20)", value: "$263,674" },
      { label: "DRIP advantage", value: "$180,786" },
      { label: "Annual income with DRIP (year 20)", value: "$12,190" },
      { label: "Total invested", value: "$102,000" },
    ],
    comparisonNote:
      "Cash dividends fund living expenses today; DRIP trades spendable income for long-run value. The $180,786 spread on identical $102,000 contributions shows why accumulation portfolios reinvest until income is needed. High-yield and Aristocrat variants on this site use the same engine with different yield and growth assumptions.",
    faq: [
      {
        q: "How much wealth does DRIP add versus cash?",
        a: "With the default inputs, DRIP ends near $444,460 versus $263,674 cash after 20 years — about $180,786 more. The gap widens if dividend growth and price growth stay positive.",
      },
      {
        q: "When should I switch from DRIP to cash?",
        a: "Three to five years before you need the income for living expenses is a common window — long enough to build a cash buffer, short enough to keep compounding during peak earning years.",
      },
      {
        q: "Are reinvested dividends taxable?",
        a: "Yes in taxable accounts. Budget for qualified dividend rates or ordinary rates on REIT income. IRAs and 401(k)s defer or eliminate that annual drag.",
      },
    ],
    sources: [
      {
        label: "S&P DJI dividend reinvestment illustration (Feb. 2025 data)",
        href: "https://www.spglobal.com/spdji/en/documents/research/research-sp500-dividend-aristocrats.pdf",
      },
      {
        label: "IRS Topic 409, capital gains and dividends",
        href: "https://www.irs.gov/taxtopics/tc409",
      },
    ],
    sourcesChecked: "October 2026",
  },
];
