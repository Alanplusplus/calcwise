import type { CalculatorVariant } from "./mortgage";

export const cdVariants: CalculatorVariant[] = [
  {
    slug: "3-month",
    title: "3-Month CD Calculator",
    description:
      "Calculate your earnings on a 3-month certificate of deposit. See how a short-term CD compares to savings accounts and longer terms. Great for parking cash you'll need soon.",
    defaults: { deposit: "10000", apy: "4.50", termMonths: "3", compounding: "daily" },
    intro:
      "A 3-month CD is the shortest standard term available at most banks and credit unions. It is ideal for money you need within a few months — a tax payment due next quarter, a down payment closing in 90 days, or cash between investment decisions. The rate is typically lower than longer terms, but you get your money back quickly and avoid the early-withdrawal penalty risk that comes with locking funds away for a year or more.",
    tips: [
      "At 4.50% APY with daily compounding, a $10,000 deposit earns roughly $112 in three months — more than ten times what most checking accounts would pay.",
      "3-month CDs are a natural first rung in a CD ladder: when this CD matures, reinvest into a 12-month or longer term to capture higher rates while keeping quarterly liquidity.",
      "Compare the 3-month CD rate to your high-yield savings account rate. If the difference is less than 0.25%, the savings account may be more practical due to no lock-up.",
      "Early withdrawal penalties on 3-month CDs typically equal 1–3 months of interest, which could wipe out all your earnings if you break the CD early.",
      "Online banks often offer 3-month CD rates 0.50–1.00% higher than traditional brick-and-mortar banks. Shop around before committing.",
    ],
  },
  {
    slug: "6-month",
    title: "6-Month CD Calculator",
    description:
      "Calculate returns on a 6-month certificate of deposit. A popular short-term option that typically beats savings accounts while keeping your money accessible within half a year.",
    defaults: { deposit: "10000", apy: "4.60", termMonths: "6", compounding: "daily" },
    intro:
      "The 6-month CD sits in the sweet spot between maximum flexibility and competitive rates. It is the most popular short-term CD duration, favored by savers who want to earn more than a high-yield savings account but are not comfortable locking money away for a full year. This term works well for emergency fund reserves beyond your liquid buffer, seasonal savings like holiday budgets, or proceeds from a home sale while you decide on next steps.",
    tips: [
      "At 4.60% APY, a $10,000 deposit grows to approximately $10,228 after six months — earning $228 in interest with zero risk to your principal.",
      "6-month CDs often carry early withdrawal penalties of 3 months of interest. If you think there's even a small chance you'll need the funds, stick with a high-yield savings account.",
      "This term is ideal for the first rung of a CD ladder. Reinvesting each matured 6-month CD into a 5-year term builds a rolling ladder that matures every six months.",
      "In a rising-rate environment, shorter terms like 6 months let you reinvest at higher rates sooner rather than being locked into today's rate for years.",
      "Credit unions frequently match or beat online bank rates on 6-month CDs and may offer more favorable early withdrawal terms.",
    ],
  },
  {
    slug: "1-year",
    title: "1-Year CD Calculator",
    description:
      "Calculate interest earned on a 12-month CD. The most popular CD term, balancing competitive rates with reasonable lock-up. See your total earnings at maturity.",
    defaults: { deposit: "10000", apy: "4.75", termMonths: "12", compounding: "daily" },
    intro:
      "The 1-year CD is the most widely held CD term in the United States. It offers a meaningful rate premium over savings accounts while keeping your commitment to just twelve months. This makes it the go-to choice for savers building an emergency fund surplus, setting aside next year's tax bill, or simply wanting a safe place to grow cash that is already earmarked for a specific purpose. One-year CDs are also the benchmark term that financial publications quote when comparing bank rates.",
    tips: [
      "At 4.75% APY with daily compounding, $10,000 grows to approximately $10,486 after twelve months — earning $486 in guaranteed interest.",
      "The 1-year term is the backbone of most CD ladders. Opening five equal CDs at 1-, 2-, 3-, 4-, and 5-year terms means one matures every year for reinvestment.",
      "Early withdrawal penalties on 12-month CDs typically equal 3–6 months of interest. On $10,000 at 4.75%, that penalty could be $118–$237, eliminating most of your gains.",
      "If rates are expected to fall, locking in a 1-year CD at today's rate protects your return. If rates are rising, consider splitting between 6-month and 1-year terms.",
      "Some banks offer no-penalty CDs at the 1-year term with rates about 0.25–0.50% below standard CDs — worth considering if you value flexibility.",
    ],
  },
  {
    slug: "5-year",
    title: "5-Year CD Calculator",
    description:
      "Calculate the total return on a 5-year certificate of deposit. Lock in today's rate for maximum earnings. See how compounding grows your deposit over 60 months.",
    defaults: { deposit: "10000", apy: "4.25", termMonths: "60", compounding: "daily" },
    intro:
      "A 5-year CD offers the highest rates available on standard CDs and is designed for money you are certain you will not need for the next five years. This term makes sense for long-range savings goals where you want guaranteed growth without market risk — think a child's college fund due in five years, a known future expense like a home renovation, or the top rung of a CD ladder that maximizes yield across your savings.",
    tips: [
      "At 4.25% APY, a $10,000 deposit grows to approximately $12,336 over five years — earning $2,336 in compound interest with FDIC-insured safety.",
      "Over five years, the total interest from a CD at 4.25% roughly equals what a 1-year CD at 4.75% earns when reinvested at declining rates — the 5-year term locks in certainty.",
      "Early withdrawal penalties on 5-year CDs are steep, typically 6–12 months of interest ($212–$425 on $10,000). Only commit money you truly will not need.",
      "If you are building a CD ladder, the 5-year rung captures the highest rate and produces the largest absolute return. As shorter CDs mature, reinvesting into new 5-year terms keeps the ladder at peak yield.",
      "Brokered CDs available through investment accounts sometimes offer higher 5-year rates than direct bank CDs, and they can be sold on the secondary market before maturity (at market price).",
    ],
  },
  {
    slug: "jumbo-cd",
    title: "Jumbo CD Calculator — $100,000+ Deposits",
    description:
      "Calculate returns on a jumbo CD ($100,000+ deposit). See how larger deposits can earn premium rates and maximize your guaranteed interest income.",
    defaults: { deposit: "100000", apy: "4.85", termMonths: "12", compounding: "daily" },
    intro:
      "Jumbo CDs require a minimum deposit of $100,000 and sometimes offer premium rates above standard CDs. They are designed for high-net-worth savers, business cash reserves, or large lump sums from a home sale, inheritance, or bonus. The higher deposit threshold gives the bank more to lend, and in return you may earn 0.10–0.25% more APY than a standard CD of the same term. However, the rate advantage varies by institution and is not always guaranteed.",
    tips: [
      "At 4.85% APY on $100,000 for one year, you earn approximately $4,968 in interest — a meaningful return with zero market risk and full FDIC insurance.",
      "FDIC insurance covers $250,000 per depositor, per institution. If your jumbo CD exceeds this limit, split deposits across multiple banks or use a brokerage that offers multi-bank CD programs.",
      "Not all banks offer jumbo premiums. Compare the jumbo rate to the standard rate at the same institution — if the difference is under 0.10%, you may get a better deal at an online bank with no minimum.",
      "Consider breaking a large deposit across multiple term lengths rather than placing everything in one jumbo CD. A laddered approach provides periodic access and rate diversification.",
      "Business jumbo CDs may offer different terms and rates than personal CDs. Ask your bank about commercial CD options if you are depositing business operating reserves.",
    ],
  },
];
