export interface CalculatorVariant {
  slug: string;
  title: string;
  description: string;
  defaults: Record<string, string>;
  intro: string;
  tips: string[];
}

export const dividendVariants: CalculatorVariant[] = [
  {
    slug: "high-yield-stocks",
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
  },
  {
    slug: "dividend-aristocrats",
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
  },
  {
    slug: "reit-income",
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
  },
  {
    slug: "retirement-dividend-income",
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
  },
  {
    slug: "drip-vs-cash",
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
  },
];
