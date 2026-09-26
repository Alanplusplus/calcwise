import type { CalculatorVariant } from "./types";

export const cdVariants: CalculatorVariant[] = [
  {
    slug: "3-month",
    lastUpdated: "2026-08-25",
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
    keyResults: [
      { label: "Typical APY Range", value: "4.00% to 4.75%" },
      { label: "Interest on $10,000", value: "$112 to $119" },
      { label: "Interest on $25,000", value: "$280 to $297" },
      { label: "Early Withdrawal Penalty", value: "1 to 3 months of interest" },
      { label: "FDIC Coverage", value: "$250,000 per depositor, per bank" },
      { label: "Minimum Deposit", value: "$500 to $1,000 at most banks" },
    ],
    comparisonNote:
      "A 3-month CD earns less total interest than a 6-month or 1-year CD but returns your principal fastest, making it ideal for cash you need within a quarter. Compared to a high-yield savings account, the rate premium is often only 0.10% to 0.25%, so the lock-up may not be worth it for emergency funds. Use 3-month CDs as the first rung of a CD ladder or to park proceeds from a home sale while you finalize your next move.",
    faq: [
      {
        q: "Is a 3-month CD a good place to park emergency cash?",
        a: "A 3-month CD works for emergency reserves you are certain you will not touch for 90 days, such as a tax payment due next quarter. For a true emergency fund, a high-yield savings account with instant access is safer because early withdrawal penalties of 1 to 3 months of interest can erase most or all of your earnings. Keep at least three to six months of expenses in a liquid savings account before locking any portion into CDs.",
      },
      {
        q: "How does a 3-month CD compare to a high-yield savings account?",
        a: "At current rates, 3-month CDs typically pay 0.10% to 0.25% more APY than the best high-yield savings accounts, translating to roughly $10 to $25 extra on a $10,000 deposit. That modest premium comes with a lock-up period and a penalty if you withdraw early. If you might need the money before maturity, the savings account's flexibility almost always outweighs the small rate difference.",
      },
      {
        q: "What happens when my 3-month CD matures?",
        a: "Most banks automatically renew your CD into a new 3-month term at the current rate unless you instruct them otherwise during the grace period, typically 7 to 10 days after maturity. Use that window to compare rates at other institutions or reinvest into a longer term if you no longer need the cash immediately. Failing to act during the grace period locks you into whatever rate the bank sets, which may be lower than market rates.",
      },
    ],
  },
  {
    slug: "6-month",
    lastUpdated: "2026-08-25",
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
    keyResults: [
      { label: "Typical APY Range", value: "4.25% to 4.85%" },
      { label: "Interest on $10,000", value: "$225 to $243" },
      { label: "Interest on $25,000", value: "$563 to $608" },
      { label: "Early Withdrawal Penalty", value: "3 months of interest" },
      { label: "FDIC Coverage", value: "$250,000 per depositor, per bank" },
      { label: "Minimum Deposit", value: "$500 to $1,000 at most banks" },
    ],
    comparisonNote:
      "The 6-month CD pays roughly $115 more on $10,000 than a 3-month CD while still returning your principal within half a year. It beats most high-yield savings accounts by 0.15% to 0.35% APY but earns about $260 less than a 1-year CD over the same deposit. This term works best when you want a rate boost over savings but expect to need the cash or reinvest within six months.",
    faq: [
      {
        q: "When does a 6-month CD make more sense than a 3-month CD?",
        a: "Choose a 6-month CD when you will not need the money for at least six months and the rate premium over a 3-month CD exceeds 0.15% APY. On $10,000, that extra half-year typically earns $115 more than a 3-month term. If there is any chance you will need the funds within 90 days, the shorter term or a high-yield savings account avoids the early withdrawal penalty risk.",
      },
      {
        q: "Can I use a 6-month CD for seasonal savings like a holiday budget?",
        a: "Yes. A 6-month CD opened in June at 4.60% APY on $5,000 earns roughly $114 by December, providing a small boost to your holiday spending fund. Set a calendar reminder for the maturity date so you can withdraw or reinvest during the grace period. This approach works well for predictable expenses with a known timeline six months out.",
      },
      {
        q: "How does a 6-month CD fit into a CD ladder strategy?",
        a: "A 6-month CD serves as a flexible first rung that matures twice per year, giving you regular opportunities to reinvest at current rates. Some savers open multiple 6-month CDs on a staggered schedule so one matures every month or quarter. When each CD matures, reinvest into a longer term like 12 or 60 months to progressively increase yield while maintaining periodic liquidity.",
      },
    ],
  },
  {
    slug: "1-year",
    lastUpdated: "2026-08-25",
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
    keyResults: [
      { label: "Typical APY Range", value: "4.50% to 5.00%" },
      { label: "Interest on $10,000", value: "$456 to $512" },
      { label: "Interest on $25,000", value: "$1,140 to $1,280" },
      { label: "Early Withdrawal Penalty", value: "3 to 6 months of interest" },
      { label: "FDIC Coverage", value: "$250,000 per depositor, per bank" },
      { label: "Minimum Deposit", value: "$500 to $1,000 at most banks" },
    ],
    comparisonNote:
      "The 1-year CD is the most popular term and typically offers the best rate among short-to-medium durations, paying about $250 more on $10,000 than a 6-month CD. Compared to a 5-year CD, the 1-year term earns less total interest but avoids the risk of being locked into today's rate if yields rise. It also outperforms Treasury bills and most money market accounts at current rates while remaining FDIC insured.",
    faq: [
      {
        q: "Is a 1-year CD better than a Treasury bill for a 12-month hold?",
        a: "At similar yields, both are low-risk options, but 1-year CDs often pay 0.10% to 0.30% more APY than comparable Treasury bills at current rates. Treasury interest is exempt from state and local taxes, which can close the gap for investors in high-tax states like California or New York. CDs offer FDIC insurance up to $250,000, while Treasuries are backed by the full faith and credit of the U.S. government.",
      },
      {
        q: "How do I build a CD ladder starting with 1-year terms?",
        a: "Split your deposit into five equal amounts and open CDs at 1-, 2-, 3-, 4-, and 5-year terms simultaneously. Each year one CD matures, providing cash or the option to reinvest at prevailing rates. When the 1-year CD matures, reinvest into a new 5-year term to maintain the ladder structure and capture the highest available yield on the longest rung.",
      },
      {
        q: "What is the penalty for breaking a 1-year CD before maturity?",
        a: "Most banks charge 3 to 6 months of interest as an early withdrawal penalty on 12-month CDs. On a $10,000 deposit at 4.75% APY, that penalty ranges from $119 to $237. If you withdraw within the first three months, the penalty can exceed your accrued interest and reduce your principal. Consider a no-penalty CD or high-yield savings account if there is any chance you will need the funds early.",
      },
    ],
  },
  {
    slug: "5-year",
    lastUpdated: "2026-08-25",
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
    keyResults: [
      { label: "Typical APY Range", value: "4.00% to 4.50%" },
      { label: "Interest on $10,000", value: "$2,150 to $2,450" },
      { label: "Interest on $25,000", value: "$5,375 to $6,125" },
      { label: "Early Withdrawal Penalty", value: "6 to 12 months of interest" },
      { label: "FDIC Coverage", value: "$250,000 per depositor, per bank" },
      { label: "Minimum Deposit", value: "$500 to $1,000 at most banks" },
    ],
    comparisonNote:
      "A 5-year CD locks in today's rate for maximum total return, earning roughly $1,850 more on $10,000 than rolling four consecutive 1-year CDs at declining rates. The trade-off is reduced flexibility: if rates rise, you miss out on higher yields until maturity. Compared to Treasury notes or brokered CDs, direct bank 5-year CDs offer FDIC insurance and simplicity but cannot be sold before maturity without penalty.",
    faq: [
      {
        q: "What is the rate lock risk with a 5-year CD?",
        a: "Rate lock risk means you are committed to today's APY even if market rates rise significantly over the next five years. If rates increase by 1% within two years, you forgo roughly $500 in additional annual interest on a $10,000 deposit. Mitigate this by building a CD ladder so only a portion of your savings is locked at any one rate, or keep some funds in shorter terms that mature and reinvest at higher rates.",
      },
      {
        q: "How does a 5-year CD fit as the top rung of a CD ladder?",
        a: "The 5-year rung captures the highest APY and produces the largest absolute return in a standard ladder. Open equal amounts in 1-, 2-, 3-, 4-, and 5-year CDs simultaneously, then reinvest each maturing CD into a new 5-year term. Over time, your entire ladder rotates into 5-year rates while one-fifth of your money becomes accessible every year.",
      },
      {
        q: "Should I choose a 5-year CD or invest in bonds for a five-year goal?",
        a: "For a known expense in exactly five years, a 5-year CD provides guaranteed principal and a fixed return with no market risk. Investment-grade bonds may offer slightly higher yields but carry price volatility if you need to sell before maturity. If the timing is flexible or you want inflation protection, a mix of I Bonds and a 5-year CD balances safety with purchasing power preservation.",
      },
    ],
  },
  {
    slug: "jumbo-cd",
    lastUpdated: "2026-08-25",
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
    keyResults: [
      { label: "Typical APY Range", value: "4.75% to 5.25%" },
      { label: "Interest on $100,000 (1 yr)", value: "$4,850 to $5,380" },
      { label: "Interest on $250,000 (1 yr)", value: "$12,125 to $13,450" },
      { label: "Early Withdrawal Penalty", value: "3 to 6 months of interest" },
      { label: "FDIC Coverage", value: "$250,000 per depositor, per bank" },
      { label: "Minimum Deposit", value: "$100,000" },
    ],
    comparisonNote:
      "Jumbo CDs require a $100,000 minimum but may earn only 0.10% to 0.25% more APY than standard CDs at the same bank, adding $100 to $250 per year on a $100,000 deposit. Compared to splitting funds across multiple banks for full FDIC coverage, a single jumbo CD simplifies management but limits insurance on amounts above $250,000. Online banks without jumbo tiers sometimes match or beat jumbo rates with no minimum deposit requirement.",
    faq: [
      {
        q: "Is the jumbo CD rate premium worth the $100,000 minimum?",
        a: "The premium varies by institution and is not always guaranteed. If the jumbo rate is only 0.10% above the standard rate, you earn an extra $100 per year on $100,000 — which may not justify locking up the full amount. Compare jumbo rates at your bank to standard CD rates at top online banks, which often match jumbo yields with minimums as low as $500.",
      },
      {
        q: "How should I handle FDIC insurance on deposits over $250,000?",
        a: "FDIC insurance covers $250,000 per depositor, per insured bank, so a $500,000 jumbo deposit at one institution leaves $250,000 uninsured. Split large deposits across two or more FDIC-member banks, or use a brokerage CD program that spreads funds across multiple banks under one account. Never exceed the insurance limit at a single institution unless you accept the uninsured portion as a risk.",
      },
      {
        q: "Are business jumbo CDs different from personal jumbo CDs?",
        a: "Business jumbo CDs often require the same $100,000 minimum but may offer different rate tiers, terms, or early withdrawal policies than personal accounts. Some banks provide commercial CD products with higher rates for business operating reserves that will not be needed for six to twelve months. Ask your banker about business-specific CD options and confirm that FDIC coverage applies to business accounts under the same $250,000 per institution limit.",
      },
    ],
  },
];
