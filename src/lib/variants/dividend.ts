import type { CalculatorVariant } from "./types";

export const dividendVariants: CalculatorVariant[] = [
  {
    slug: "high-yield-stocks",
    lastUpdated: "2026-09-09",
    title: "High-Yield Dividend Stock Calculator",
    description: "Calculate income from high-yield dividend stocks paying 5%+ yields. See how reinvestment and dividend growth compound a $15,000 portfolio over time.",
    defaults: {
      investmentAmount: "15000",
      sharePrice: "40",
      dividendPerShare: "2.40",
      dividendGrowth: "3",
      sharePriceGrowth: "4",
      years: "15",
      monthlyContribution: "300",
    },
    intro: "High-yield dividend stocks typically pay above-average yields of 4% to 8%, often found in sectors like utilities, REITs, energy MLPs, and telecommunications. While these higher payouts generate more immediate income, they often come with slower share price appreciation and may signal limited reinvestment by the company. Investors seeking reliable income streams in retirement or supplemental cash flow frequently gravitate toward high-yield portfolios.",
    tips: [
      "A $15,000 investment in stocks yielding 6% generates $900 in annual dividends from day one — enough to cover a monthly streaming subscription and cell phone bill combined.",
      "With 3% dividend growth and DRIP reinvestment, your $15,000 portfolio could generate over $3,200 per year in dividends by year 15, more than tripling your initial income.",
      "High-yield stocks above 7% warrant extra scrutiny: check the payout ratio stays below 80% for most sectors and below 90% for REITs to reduce the risk of a dividend cut.",
      "Adding $300/month to a high-yield portfolio accumulates roughly $54,000 in contributions alone over 15 years, but with reinvested dividends, total value could exceed $130,000.",
      "Compare the after-tax yield: qualified dividends from U.S. stocks are taxed at 0-20%, while REIT distributions are typically taxed as ordinary income at your marginal rate.",
    ],
    keyResults: [
      { label: "Typical Yield Range", value: "4% to 8%" },
      { label: "Annual Income on $50K", value: "$2,500 to $4,000" },
      { label: "Annual Income on $100K", value: "$5,000 to $8,000" },
      { label: "Dividend Growth Rate", value: "2% to 4% annually" },
      { label: "Tax Treatment", value: "Qualified dividends at 0%, 15%, or 20%" },
      { label: "Payout Ratio Target", value: "Below 80% (90% for REITs)" },
    ],
    comparisonNote:
      "High-yield stocks deliver 2 to 3 times the starting income of Dividend Aristocrats but with slower dividend growth and higher cut risk. Aristocrats typically yield 2% to 3% with 7% to 10% annual dividend growth, making them better for long-term compounding. High-yield strategies suit investors who need immediate cash flow and can tolerate more volatility in payout sustainability.",
    faq: [
      {
        q: "How do I tell if a high dividend yield is sustainable?",
        a: "Check the payout ratio — dividends paid divided by earnings per share. For most sectors, a ratio above 80% signals limited room for growth and elevated cut risk. Also review free cash flow coverage: the company should generate enough cash to fund dividends without borrowing. A yield above 8% with a rising payout ratio and declining earnings often indicates a dividend trap.",
      },
      {
        q: "What is a dividend trap and how do I avoid one?",
        a: "A dividend trap occurs when a stock's high yield reflects a falling share price rather than genuine income strength, often preceding a dividend cut. Warning signs include a payout ratio above 90%, negative earnings trends, and debt levels that restrict reinvestment. Screen for companies with stable or growing earnings, manageable debt, and at least five years of uninterrupted dividend payments.",
      },
      {
        q: "Should I prioritize yield or dividend growth in a high-yield portfolio?",
        a: "For investors under 55, blending moderate-yield stocks (4% to 5%) with 4% to 6% dividend growth often outperforms chasing maximum yield alone. Pure high-yield positions generate more income today but compound more slowly over 15 to 20 years. Rebalance toward higher-growth dividend payers as your income needs decrease and your portfolio matures.",
      },
    ],
  },
  {
    slug: "dividend-aristocrats",
    lastUpdated: "2026-09-09",
    title: "Dividend Aristocrat Portfolio Calculator",
    description: "Model a Dividend Aristocrat portfolio with 25+ years of consecutive dividend increases. See how steady 7-10% dividend growth compounds over decades.",
    defaults: {
      investmentAmount: "20000",
      sharePrice: "65",
      dividendPerShare: "1.95",
      dividendGrowth: "8",
      sharePriceGrowth: "8",
      years: "25",
      monthlyContribution: "400",
    },
    intro: "Dividend Aristocrats are S&P 500 companies that have increased their dividends for 25 or more consecutive years. These blue-chip stocks — including names like Johnson & Johnson, Coca-Cola, Procter & Gamble, and 3M — offer lower starting yields but deliver powerful compounding through consistent dividend growth. For investors with a 15-to-30-year time horizon, Aristocrat portfolios historically outperform the broader market with lower volatility.",
    tips: [
      "A $20,000 Aristocrat portfolio starting at a 3% yield ($600/year) with 8% annual dividend growth produces over $4,300 in annual dividends by year 25 — without adding a single dollar beyond monthly contributions.",
      "With $400/month contributions and DRIP enabled over 25 years, total portfolio value could exceed $550,000, generating potential annual income above $16,000.",
      "Dividend Aristocrats have outperformed the S&P 500 by an average of 1.2 percentage points annually since 1990, with approximately 20% less volatility during market downturns.",
      "Focus on Aristocrats with payout ratios under 60% and debt-to-equity ratios below 1.5 — these metrics indicate the company has room to continue growing dividends even during recessions.",
      "Consider dollar-cost averaging into 15-20 different Aristocrats across sectors to avoid concentration risk while maintaining the portfolio's growth characteristics.",
    ],
    keyResults: [
      { label: "Typical Yield Range", value: "2% to 3.5%" },
      { label: "Annual Income on $50K", value: "$1,000 to $1,750" },
      { label: "Annual Income on $100K", value: "$2,000 to $3,500" },
      { label: "Dividend Growth Rate", value: "7% to 10% annually" },
      { label: "Tax Treatment", value: "Qualified dividends at 0%, 15%, or 20%" },
      { label: "Consecutive Increases", value: "25+ years required" },
    ],
    comparisonNote:
      "Dividend Aristocrats trade lower starting yields for decades of reliable dividend growth, making them the opposite of a high-yield strategy. Over 25 years, an Aristocrat portfolio at 3% yield with 8% growth can surpass a 6% high-yield portfolio in total annual income. Aristocrats also tend to hold up better during recessions, with lower drawdowns than broad high-yield sectors.",
    faq: [
      {
        q: "How many Dividend Aristocrats should I hold for adequate diversification?",
        a: "A portfolio of 15 to 20 Aristocrats across at least eight sectors provides meaningful diversification without excessive overlap. The S&P 500 Dividend Aristocrats index currently includes roughly 65 companies, so selecting from different industries avoids concentration in consumer staples or industrials. Equal-weight or tiered allocations prevent any single stock from dominating your income stream.",
      },
      {
        q: "Can a company lose its Dividend Aristocrat status?",
        a: "Yes. A single year without a dividend increase removes a company from the Aristocrat list, even if the dividend is not cut. Several former Aristocrats have been dropped after freezing payouts during recessions or industry disruptions. Monitor your holdings for payout freezes, rising payout ratios above 70%, and management commentary about prioritizing debt reduction over dividend growth.",
      },
      {
        q: "Are Dividend Aristocrats better in a taxable or retirement account?",
        a: "Aristocrats work well in both account types because their dividends generally qualify for favorable long-term capital gains rates in taxable accounts. In a Roth IRA, decades of tax-free dividend growth and compounding maximize the strategy's long-term advantage. Traditional IRAs defer taxes until withdrawal, which suits buy-and-hold Aristocrat investors who reinvest dividends for 20 or more years.",
      },
    ],
  },
  {
    slug: "reit-income",
    lastUpdated: "2026-09-09",
    title: "REIT Dividend Income Calculator",
    description: "Estimate monthly income from Real Estate Investment Trusts (REITs) with higher-than-average yields. Model a diversified REIT portfolio with reinvestment.",
    defaults: {
      investmentAmount: "25000",
      sharePrice: "35",
      dividendPerShare: "2.10",
      dividendGrowth: "4",
      sharePriceGrowth: "5",
      years: "20",
      monthlyContribution: "250",
    },
    intro: "REITs are legally required to distribute at least 90% of taxable income as dividends, making them one of the highest-yielding equity asset classes. A diversified REIT portfolio spanning residential, commercial, industrial, and healthcare properties typically yields 4% to 7%. While REIT dividends are generally taxed as ordinary income, holding them in tax-advantaged accounts like IRAs eliminates this disadvantage and maximizes compounding.",
    tips: [
      "A $25,000 REIT portfolio at a 6% yield generates $1,500 annually — or $125/month — in passive income from day one, roughly covering a utility bill.",
      "REIT dividends are often paid monthly or quarterly, making them ideal for investors seeking regular cash flow. With 20 years of reinvestment, this portfolio could grow to over $200,000.",
      "Hold REITs inside a Roth IRA to avoid the ordinary income tax treatment: on a $25,000 REIT investment yielding 6%, you save approximately $300-$500 per year in taxes versus a taxable account.",
      "Industrial and data center REITs have delivered 12-15% total annual returns over the past decade, outperforming traditional retail and office REITs by a significant margin.",
      "Diversify across at least 5 REIT subsectors — a 30% allocation to residential, 25% to industrial, 20% to healthcare, 15% to data centers, and 10% to retail provides balanced exposure.",
    ],
    keyResults: [
      { label: "Typical Yield Range", value: "4% to 7%" },
      { label: "Annual Income on $50K", value: "$2,000 to $3,500" },
      { label: "Annual Income on $100K", value: "$4,000 to $7,000" },
      { label: "Dividend Growth Rate", value: "3% to 5% annually" },
      { label: "Tax Treatment", value: "Ordinary income (non-qualified)" },
      { label: "Distribution Requirement", value: "90% of taxable income" },
    ],
    comparisonNote:
      "REITs offer higher starting yields than Dividend Aristocrats but lack qualified dividend tax treatment, making them best held in tax-advantaged accounts. Compared to high-yield stocks in the same 4% to 7% range, REITs provide real estate exposure and monthly or quarterly income but are more sensitive to interest rate changes. A blended portfolio often allocates 10% to 20% to REITs for income diversification.",
    faq: [
      {
        q: "Why are REIT dividends taxed as ordinary income instead of qualified dividends?",
        a: "REITs pass through rental income and depreciation benefits to shareholders, and the IRS treats most REIT distributions as non-qualified dividends taxed at your marginal rate. A portion of each payment may be classified as return of capital, which reduces your cost basis rather than creating immediate tax liability. Holding REITs in a Roth IRA or traditional IRA eliminates this tax disadvantage entirely.",
      },
      {
        q: "How do rising interest rates affect REIT dividend income?",
        a: "Higher rates increase REIT borrowing costs and make bond yields more competitive with REIT payouts, often pressuring share prices in the short term. Well-managed REITs with long-term leases, low debt ratios, and inflation-linked rent escalators tend to maintain dividends through rate cycles. Focus on sectors with pricing power, such as industrial and data center REITs, rather than rate-sensitive office and retail properties.",
      },
      {
        q: "Should I hold REITs in my Roth IRA or taxable brokerage account?",
        a: "A Roth IRA is generally the optimal location because all REIT dividends and capital gains grow and distribute tax-free. In a taxable account, a $25,000 REIT portfolio yielding 6% creates roughly $1,500 in annually taxable ordinary income, costing $330 to $555 at a 22% to 37% marginal rate. If you must hold REITs in taxable accounts, consider REIT index ETFs for simplicity and consider tax-loss harvesting during downturns.",
      },
    ],
  },
  {
    slug: "retirement-dividend-income",
    lastUpdated: "2026-09-09",
    title: "Retirement Dividend Income Calculator",
    description: "Plan your retirement dividend income stream. Calculate how much to invest today to generate $30,000-$50,000 in annual dividend income by retirement.",
    defaults: {
      investmentAmount: "50000",
      sharePrice: "55",
      dividendPerShare: "1.65",
      dividendGrowth: "6",
      sharePriceGrowth: "7",
      years: "25",
      monthlyContribution: "500",
    },
    intro: "Building a dividend income portfolio for retirement requires decades of disciplined investing and reinvestment. The goal is to accumulate enough shares in quality dividend-paying companies that the annual dividend income alone covers your living expenses — without touching the principal. Starting with $50,000 and contributing $500/month while reinvesting all dividends, an investor in their early 40s can build a substantial income stream by retirement age.",
    tips: [
      "A $50,000 starting portfolio with $500/month contributions and 6% dividend growth, fully reinvested over 25 years, could generate over $35,000 in annual dividend income — potentially replacing a significant portion of pre-retirement earnings.",
      "The 4% rule suggests you need $1 million to safely withdraw $40,000/year. A dividend portfolio generating $40,000/year means you never need to sell shares, preserving your entire principal for heirs.",
      "Social Security provides $22,884/year on average in 2026. A $35,000 dividend income on top of Social Security gives you $57,884/year, covering average retirement expenses of $52,000 comfortably.",
      "Start allocating toward dividend growth stocks 20-25 years before retirement. Every 5 years of delay cuts your projected retirement dividend income by roughly 35-45% due to lost compounding.",
      "Gradually shift from growth-oriented dividend stocks (2-3% yield, 8-10% growth) to income-oriented stocks (4-5% yield, 3-5% growth) as you approach retirement age for higher immediate income.",
    ],
    keyResults: [
      { label: "Typical Yield Range", value: "3% to 5% at retirement" },
      { label: "Annual Income on $50K", value: "$1,500 to $2,500" },
      { label: "Annual Income on $100K", value: "$3,000 to $5,000" },
      { label: "Dividend Growth Rate", value: "5% to 7% annually" },
      { label: "Tax Treatment", value: "Qualified dividends at 0%, 15%, or 20%" },
      { label: "Target Portfolio for $40K/yr", value: "$800K to $1,000,000" },
    ],
    comparisonNote:
      "Retirement dividend planning prioritizes sustainable income over maximum yield, unlike high-yield strategies that chase 6% or more today. Compared to the 4% withdrawal rule on a total-return portfolio, a dividend-only approach preserves principal but requires a larger portfolio to match the same income. Combining dividend income with Social Security and a small bond allocation often provides more stability than relying on dividends alone.",
    faq: [
      {
        q: "How much do I need invested to generate $40,000 in annual dividend income?",
        a: "At a 4% portfolio yield, you need approximately $1,000,000 in dividend-paying stocks to produce $40,000 per year. At a 3% yield with stronger dividend growth, the starting portfolio might be $1,200,000 or more, but rising payouts reduce the gap over time. Factor in Social Security, which averages $22,884 per year in 2026, to lower the portfolio income you must self-fund.",
      },
      {
        q: "When should I stop reinvesting dividends and switch to cash payouts?",
        a: "Most planners recommend switching from DRIP to cash dividends three to five years before you need the income for living expenses. This transition lets you build a cash buffer while still benefiting from compounding during your peak accumulation years. Gradually shift from growth-oriented stocks (2% to 3% yield) to higher-yield holdings (4% to 5%) in the final decade before retirement.",
      },
      {
        q: "Can dividend income alone replace a traditional retirement withdrawal strategy?",
        a: "A dividend-focused strategy can replace the 4% rule if your portfolio generates enough yield to cover expenses without selling shares, preserving principal for heirs. The trade-off is that building a sufficient dividend portfolio takes longer and may require $200,000 to $400,000 more in savings than a balanced index approach at the same income level. Many retirees combine dividend income with periodic bond or fund withdrawals for flexibility during market downturns.",
      },
    ],
  },
  {
    slug: "drip-vs-cash",
    lastUpdated: "2026-09-09",
    title: "DRIP vs Cash Dividends Calculator",
    description: "Compare reinvesting dividends (DRIP) versus taking cash. See how much wealth DRIP builds over 20 years compared to spending your dividend income.",
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
    intro: "The choice between reinvesting dividends (DRIP) and taking cash is one of the most impactful decisions a dividend investor faces. Reinvesting automatically purchases additional shares, which then generate their own dividends — creating a compounding snowball effect. Taking cash provides immediate income but sacrifices long-term growth. The difference over 20 years can be staggering, often amounting to hundreds of thousands of dollars in portfolio value.",
    tips: [
      "A $30,000 portfolio with DRIP enabled and $300/month contributions over 20 years could grow to over $280,000, while the same portfolio taking cash dividends may reach only $190,000 — a $90,000+ difference.",
      "With DRIP, your share count increases every quarter without spending an extra dollar. Starting with 600 shares at $50 each, DRIP could give you over 1,800 shares by year 20 through reinvestment alone.",
      "The optimal strategy for most investors under 50: enable DRIP on all dividend holdings. Switch to cash dividends 3-5 years before you need the income for living expenses.",
      "Even during market downturns, DRIP works in your favor: lower share prices mean each dividend payment buys more shares, accelerating your recovery when prices rebound.",
      "Tax consideration: reinvested dividends are still taxable income in the year received. Set aside approximately 15-20% of your annual dividends in a separate savings account for tax payments if holding in a taxable account.",
    ],
    keyResults: [
      { label: "Typical Yield Range", value: "3% to 5%" },
      { label: "Annual Income on $50K (cash)", value: "$1,500 to $2,500" },
      { label: "Annual Income on $100K (cash)", value: "$3,000 to $5,000" },
      { label: "Dividend Growth Rate", value: "4% to 6% annually" },
      { label: "DRIP Advantage (20 yr)", value: "$70,000 to $100,000+" },
      { label: "Tax Treatment", value: "Taxable in year received, even if reinvested" },
    ],
    comparisonNote:
      "DRIP reinvestment accelerates compounding by purchasing additional shares with every dividend payment, while cash dividends provide spendable income at the cost of slower portfolio growth. Over 20 years, the DRIP advantage on a $30,000 starting portfolio often exceeds $90,000 compared to taking cash. Cash dividends make sense when you need current income for expenses; DRIP is superior during accumulation years when you do not depend on the payouts.",
    faq: [
      {
        q: "How much wealth does DRIP actually add compared to taking cash dividends?",
        a: "On a $30,000 portfolio with $300 monthly contributions, 4% yield, and 5% dividend growth over 20 years, DRIP typically produces a portfolio worth $280,000 or more versus roughly $190,000 when dividends are taken as cash. The $90,000 difference comes from owning more shares that each generate their own dividends. The gap widens further when dividend growth and share price appreciation compound together.",
      },
      {
        q: "When should I switch from DRIP to cash dividend payments?",
        a: "Switch to cash dividends three to five years before you need the income for living expenses, such as retirement or a planned major purchase. This gives you time to adjust your budget to the actual dividend amounts and build a cash reserve. If you are still working and do not need the income, keeping DRIP enabled maximizes long-term compounding regardless of your age.",
      },
      {
        q: "Do I owe taxes on dividends even if I reinvest them through DRIP?",
        a: "Yes. The IRS treats reinvested dividends as taxable income in the year received, even though you never see the cash. On a $30,000 portfolio yielding 4%, expect roughly $1,200 in taxable dividend income annually. Set aside 15% to 20% of your dividend income in a separate account for quarterly estimated tax payments if holding in a taxable brokerage account.",
      },
    ],
  },
];
