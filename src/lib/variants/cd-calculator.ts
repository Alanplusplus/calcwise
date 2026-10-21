import type { CalculatorVariant } from "./types";

const FDIC_OCT_2026 = {
  label: "FDIC National Rates and Rate Caps (Oct. 19, 2026)",
  href: "https://www.fdic.gov/national-rates-and-rate-caps/national-rates-and-rate-caps-october-2026",
};

const NERDWALLET_CD_OCT_2026 = {
  label: "NerdWallet best CD rates (Oct. 20, 2026)",
  href: "https://www.nerdwallet.com/banking/best/cd-rates",
};

export const cdVariants: CalculatorVariant[] = [
  {
    slug: "3-month",
    lastUpdated: "2026-10-21",
    title: "3-Month CD Calculator — Short-Term APY & Earnings",
    description:
      "Calculate 3-month CD interest on $10,000 at 4.25% APY (top online rate, Oct. 2026). Compare to the 1.14% FDIC national average and HYSA yields.",
    defaults: { deposit: "10000", apy: "4.25", termMonths: "3", compounding: "daily" },
    intro:
      "A 3-month CD locks cash for one quarter while paying more than most brick-and-mortar savings accounts. The FDIC national average for 3-month CDs was 1.14% as of October 19, 2026, while top online banks listed 4.25% to 4.30% APY that same week — a gap of more than three percentage points on the same $10,000 deposit. Use this page when you have a known cash need in 90 days (a tax installment, earnest money, or proceeds parked between trades) and want to see exact maturity value with daily compounding.",
    tips: [
      "At 4.25% APY with daily compounding, $10,000 earns about $107 in three months — roughly $95 more than the $12 you would collect at the 1.14% FDIC national average for the same term.",
      "Top 3-month offers in October 2026 (Ivy Bank at 4.25% APY, Popular Direct at 4.30% with a $10,000 minimum) sit only 0.10% to 0.15% above leading high-yield savings accounts near 4.20% to 4.35% APY, so the lock-up premium is modest.",
      "Build a ladder by reinvesting each maturing 3-month rung into a 12-month or 5-year CD when you no longer need quarterly liquidity — Popular Direct listed 5.00% APY on 5-year CDs as of October 20, 2026.",
      "Early withdrawal penalties on 3-month CDs often equal 1 to 3 months of interest; breaking the CD in month two can erase most of the $107 you would have earned at 4.25% APY.",
      "Stay at or below $250,000 per depositor, per FDIC-insured bank so the full principal plus interest remains covered if the institution fails.",
    ],
    keyResults: [
      { label: "Pre-filled APY (top online)", value: "4.25%" },
      { label: "Interest on $10,000 (3 mo)", value: "$107" },
      { label: "Maturity value", value: "$10,107" },
      { label: "FDIC national avg. (3 mo)", value: "1.14%" },
      { label: "Top online APY range", value: "4.25% to 4.30%" },
      { label: "FDIC insurance limit", value: "$250,000 per bank" },
    ],
    comparisonNote:
      "At top online rates near 4.25% APY, a 3-month CD adds only about $10 to $25 more interest on $10,000 than a 4.20% high-yield savings account over the same quarter — but you give up same-day access. Compared with a 4.55% 1-year CD (about $465 on $10,000), the 3-month rung trades $358 of annual yield for returning your principal every 90 days. Use 3-month CDs as liquidity rungs, not as your primary emergency reserve.",
    faq: [
      {
        q: "Is a 3-month CD worth it when HYSA rates are almost as high?",
        a: "In October 2026 the spread between a 4.25% 3-month CD and a 4.35% HYSA was often under 0.15% APY — about $15 per year on $10,000. That small premium only makes sense when you are certain you will not touch the cash for 90 days. Keep true emergency money in a HYSA; use 3-month CDs for dated obligations like quarterly estimated taxes.",
      },
      {
        q: "How does the FDIC national average compare to what I can actually earn?",
        a: "The FDIC weighted average for 3-month CDs was 1.14% in October 2026, reflecting rates at thousands of branch banks. Online issuers publishing 4.25% to 4.30% APY pay nearly 3.1 percentage points more on the same balance. Always confirm the APY, minimum deposit, and early-withdrawal penalty on the bank's disclosure before you fund the account.",
      },
      {
        q: "What happens at maturity on a 3-month CD?",
        a: "Most banks auto-renew into a new 3-month term at the then-current rate unless you act during the grace period, typically 7 to 10 days after maturity. Rate shop during that window — October 2026 top 1-year CDs reached 4.55% to 4.60% APY, which may fit better if you no longer need the cash in 90 days.",
      },
    ],
    sources: [FDIC_OCT_2026, NERDWALLET_CD_OCT_2026],
    sourcesChecked: "October 2026",
    sourcesNote:
      "Top APY figures are October 2026 observations from NerdWallet; FDIC rows are deposit-weighted national averages, not offers from any single bank.",
  },
  {
    slug: "6-month",
    lastUpdated: "2026-10-21",
    title: "6-Month CD Calculator — APY & Maturity Value",
    description:
      "Model 6-month CD returns at 4.35% APY on $10,000. FDIC national average 1.39% (Oct. 2026) vs top online rates near 4.35% to 4.40%.",
    defaults: { deposit: "10000", apy: "4.35", termMonths: "6", compounding: "daily" },
    intro:
      "Six-month CDs bridge short commitments and midyear goals — holiday budgets, insurance premiums due in the fall, or the first rung of a CD ladder. The FDIC national average for 6-month CDs was 1.39% on October 19, 2026, while NerdWallet's October 20 table listed Popular Direct at 4.35% APY and Quorum Federal Credit Union at 4.40% APY on 6-month terms. The calculator below pre-fills 4.35% with daily compounding so you can see maturity value before you commit.",
    tips: [
      "At 4.35% APY, $10,000 grows to about $10,220 in six months — $220 in interest with daily compounding, versus roughly $70 at the 1.39% FDIC national average.",
      "Six-month CDs commonly charge an early-withdrawal penalty of three months of interest. On $10,000 at 4.35%, that penalty is near $109, which can wipe out half a year's earnings if you break the CD early.",
      "After the Federal Reserve's September 2026 rate hike, short CD tenors often pay almost as much as 5-year CDs at top online banks — shop both before you assume longer always means higher.",
      "Credit unions such as Quorum posted 4.40% APY on 6-month share certificates in October 2026 with $100 minimums — compare NCUA insurance limits the same way you would FDIC coverage.",
      "When this CD matures, roll into a 12-month or 5-year rung if rates stay elevated; Popular Direct listed 5.00% APY on 5-year CDs the same week.",
    ],
    keyResults: [
      { label: "Pre-filled APY", value: "4.35%" },
      { label: "Interest on $10,000 (6 mo)", value: "$220" },
      { label: "Maturity value", value: "$10,220" },
      { label: "FDIC national avg. (6 mo)", value: "1.39%" },
      { label: "Top online APY range", value: "4.35% to 4.40%" },
      { label: "Typical early penalty", value: "3 months of interest" },
    ],
    comparisonNote:
      "A 6-month CD at 4.35% APY earns about $113 more on $10,000 than a 3-month CD at 4.25% while still returning principal within half a year. Against a 4.55% 1-year CD ($465 interest on $10,000), you give up roughly $245 of yield for the flexibility to reinvest or spend six months sooner. Pair a 6-month rung with a HYSA buffer so penalties never touch money you might need for job-loss expenses.",
    faq: [
      {
        q: "When does a 6-month CD beat a high-yield savings account?",
        a: "Choose the CD when the APY beats your HYSA by at least 0.20% and you will not need the cash for six full months. In October 2026, a 4.35% CD versus a 4.20% HYSA added about $15 in interest on $10,000 over six months — meaningful only on larger balances or when you ladder multiple rungs.",
      },
      {
        q: "Can I use a 6-month CD for seasonal savings?",
        a: "Yes. Opening a 6-month CD in June at 4.35% APY on $5,000 earns about $110 by December — a small boost to a holiday fund. Set a maturity alert so you withdraw or reinvest during the grace period instead of auto-renewing at a lower branch-bank rate.",
      },
      {
        q: "How does a 6-month CD start a ladder?",
        a: "Open equal amounts in 6-month, 12-month, and longer rungs on staggered dates so one certificate matures every six months. Each time a rung matures, compare October 2026-style top rates (4.55% on 1-year, 5.00% on 5-year) and reinvest the longest slot to capture peak yield while keeping periodic access.",
      },
    ],
    sources: [FDIC_OCT_2026, NERDWALLET_CD_OCT_2026],
    sourcesChecked: "October 2026",
  },
  {
    slug: "1-year",
    lastUpdated: "2026-10-21",
    title: "1-Year CD Calculator — 12-Month APY & Total Interest",
    description:
      "Calculate 12-month CD earnings at 4.55% APY on $10,000. FDIC national 1-year average 1.76% (Oct. 2026); top online CDs near 4.55% to 4.60%.",
    defaults: { deposit: "10000", apy: "4.55", termMonths: "12", compounding: "daily" },
    intro:
      "The 12-month CD remains the benchmark term banks and publishers quote when comparing rates. FDIC data for October 19, 2026 put the national average 1-year CD at 1.76%, while NerdWallet's October 20 roundup listed E*TRADE at 4.55% APY with no minimum and Popular Direct at 4.60% APY with a $10,000 minimum. The pre-filled calculator uses 4.55% and daily compounding — a realistic top-tier rate observation, not the branch-bank average most savers see on auto-renewal notices.",
    tips: [
      "At 4.55% APY with daily compounding, $10,000 matures at about $10,465 — $465 in guaranteed interest over 12 months.",
      "That $465 is roughly $289 more than you would earn at the 1.76% FDIC national average on the same deposit, which is why rate shopping before each maturity matters.",
      "Early withdrawal penalties on 12-month CDs often run 3 to 6 months of interest — on $10,000 at 4.55%, that is about $114 to $228, enough to erase most of your first-year yield.",
      "Treasury bills near 4.5% yields in October 2026 compete with top CDs; Treasuries are state-tax-free while CD interest is ordinary income — run the after-tax math if you are in a high-tax state.",
      "No-penalty 12-month CDs sometimes pay 0.25% to 0.50% less than standard CDs; weigh that spread against the cost of breaking a locked rate early.",
    ],
    keyResults: [
      { label: "Pre-filled APY", value: "4.55%" },
      { label: "Interest on $10,000 (12 mo)", value: "$465" },
      { label: "Maturity value", value: "$10,465" },
      { label: "FDIC national avg. (12 mo)", value: "1.76%" },
      { label: "Top online APY range", value: "4.55% to 4.60%" },
      { label: "Typical early penalty", value: "3 to 6 months of interest" },
    ],
    comparisonNote:
      "A 1-year CD at 4.55% APY earns about $245 more on $10,000 than a 6-month CD at 4.35% while keeping the commitment to a single calendar year. Versus a 5-year CD at 5.00% APY ($2,840 interest on $10,000), the 1-year term gives up roughly $2,375 of total yield but lets you reinvest if rates rise after the September 2026 Fed hike. Match the term to a dated expense — next year's tuition invoice, not your primary emergency buffer.",
    faq: [
      {
        q: "Is a 1-year CD better than a Treasury bill for a 12-month hold?",
        a: "Top 1-year CDs near 4.55% to 4.60% APY in October 2026 were comparable to 1-year Treasury yields near 4.5%. CDs carry FDIC insurance up to $250,000 per bank; Treasuries are backed by the U.S. government and may avoid state income tax. Compare after-tax yield and how quickly you can access cash without a penalty.",
      },
      {
        q: "How do I build a CD ladder starting with 1-year terms?",
        a: "Split savings into five equal tranches and open 1-, 2-, 3-, 4-, and 5-year CDs simultaneously. When the 1-year rung matures, reinvest into a new 5-year certificate at the prevailing top rate — 5.00% APY at Popular Direct in October 2026 — so one fifth of your ladder refreshes every year at peak yield.",
      },
      {
        q: "What penalty applies if I break a 1-year CD early?",
        a: "Many banks charge 3 to 6 months of interest. On $10,000 at 4.55% APY, that is roughly $114 to $228. If you withdraw in the first three months, the penalty can exceed accrued interest and reduce principal. Use a HYSA or no-penalty CD when access within 12 months is possible.",
      },
    ],
    sources: [FDIC_OCT_2026, NERDWALLET_CD_OCT_2026],
    sourcesChecked: "October 2026",
  },
  {
    slug: "5-year",
    lastUpdated: "2026-10-21",
    title: "5-Year CD Calculator — 60-Month APY & Compound Growth",
    description:
      "Project 5-year CD returns at 5.00% APY on $10,000. FDIC 60-month national average 1.41% (Oct. 2026); top online 5-year CDs up to 5.00%.",
    defaults: { deposit: "10000", apy: "5.00", termMonths: "60", compounding: "daily" },
    intro:
      "Five-year CDs lock today's yield for 60 months — useful for money you will not need until a child starts college, a renovation date, or the top rung of a ladder. The FDIC national average for 60-month CDs was 1.41% on October 19, 2026, while NerdWallet listed Popular Direct at 5.00% APY on 5-year CDs on October 20, 2026. After mid-2026 Fed tightening, top short and long CD rates often sit within 0.50% of each other, so compare 1-year and 5-year top offers before assuming longer always pays more at your bank.",
    tips: [
      "At 5.00% APY with daily compounding, $10,000 grows to about $12,840 over five years — $2,840 in interest with FDIC insurance on balances up to $250,000 per bank.",
      "That is roughly $2,130 more than rolling five consecutive 1-year CDs at the 1.41% FDIC national average would produce, illustrating the value of locking a top online rate when you have a five-year horizon.",
      "Early withdrawal penalties on 5-year CDs commonly run 6 to 12 months of interest — about $500 to $1,000 on $10,000 at 5.00% APY — so only fund with cash you truly will not need.",
      "Brokered CDs may offer higher yields or secondary-market liquidity, but selling before maturity can mean a price loss if rates rise; direct bank CDs are simpler if you plan to hold to maturity.",
      "Ladder savers reinvest each maturing shorter rung into a new 5-year CD so the portfolio gradually earns the highest listed tier while one fifth matures every year.",
    ],
    keyResults: [
      { label: "Pre-filled APY", value: "5.00%" },
      { label: "Interest on $10,000 (60 mo)", value: "$2,840" },
      { label: "Maturity value", value: "$12,840" },
      { label: "FDIC national avg. (60 mo)", value: "1.41%" },
      { label: "Top online APY (Oct. 2026)", value: "5.00%" },
      { label: "Typical early penalty", value: "6 to 12 months of interest" },
    ],
    comparisonNote:
      "At 5.00% APY, a 5-year CD earns about $2,375 more total interest on $10,000 than a 4.55% 1-year CD held once ($465). The trade-off is rate lock: if online 1-year CDs jump another 0.50% while you are locked at 5.00%, you miss higher reinvestment yields until maturity. Split between 1-year and 5-year rungs when you want both yield and flexibility.",
    faq: [
      {
        q: "What is rate-lock risk on a 5-year CD?",
        a: "Rate-lock risk means you keep 5.00% APY even if market rates rise. A 1% increase on $10,000 costs about $100 per year in foregone interest until maturity. Mitigate by laddering: only part of savings sits in 5-year CDs while other rungs mature annually and reinvest at new rates.",
      },
      {
        q: "Why do top 5-year CDs pay almost as much as 1-year CDs in 2026?",
        a: "After the September 2026 Federal Reserve hike, the yield curve flattened — NerdWallet listed 4.55% on 1-year and 5.00% on 5-year CDs at Popular Direct on October 20, 2026, a spread of just 0.45%. That makes 5-year locks less punitive than in inverted-curve periods when short rates exceeded long rates.",
      },
      {
        q: "Should I choose a 5-year CD or bonds for a five-year goal?",
        a: "For a known expense in exactly five years, a 5-year CD at 5.00% APY guarantees principal at maturity with no market price risk. Investment-grade bonds may offer similar yields but fluctuate if sold early. Mix both only if you accept volatility on the bond sleeve.",
      },
    ],
    sources: [FDIC_OCT_2026, NERDWALLET_CD_OCT_2026],
    sourcesChecked: "October 2026",
  },
  {
    slug: "jumbo-cd",
    lastUpdated: "2026-10-21",
    title: "Jumbo CD Calculator — $100,000+ Deposits & APY",
    description:
      "Calculate jumbo CD interest on $100,000 at 4.60% APY (12 mo, Oct. 2026). FDIC insurance $250,000 per bank; split larger balances.",
    defaults: { deposit: "100000", apy: "4.60", termMonths: "12", compounding: "daily" },
    intro:
      "Jumbo CDs typically require $100,000 or more. Some banks add a small rate premium, but October 2026 top 1-year jumbo offers often matched standard online CDs — Popular Direct listed 4.60% APY with a $10,000 minimum, not a separate jumbo tier. Business reserves, home-sale proceeds, and inheritance payouts belong here only after you confirm FDIC coverage and compare the jumbo rate to no-minimum offers from online banks.",
    tips: [
      "At 4.60% APY with daily compounding, $100,000 earns about $4,707 in 12 months — the figure the pre-filled calculator shows for this variant.",
      "FDIC insurance covers $250,000 per depositor, per insured bank. A $400,000 jumbo leaves $150,000 uninsured unless you split across two institutions or use a multi-bank CD program.",
      "Compare the jumbo quote to the bank's standard 12-month CD — if the premium is under 0.10% APY, you earn only $100 extra per year on $100,000, which may not justify locking the entire balance at one bank.",
      "Ladder large deposits across 6-month, 12-month, and 5-year rungs instead of one jumbo ticket — October 2026 top rates ranged from 4.35% (6-month) to 5.00% (5-year) at Popular Direct.",
      "Business jumbo CDs may use different disclosure packages; confirm FDIC pass-through insurance and whether the entity is the insured depositor.",
    ],
    keyResults: [
      { label: "Pre-filled deposit", value: "$100,000" },
      { label: "Pre-filled APY (12 mo)", value: "4.60%" },
      { label: "Interest earned (12 mo)", value: "$4,707" },
      { label: "Maturity value", value: "$104,707" },
      { label: "FDIC insurance limit", value: "$250,000 per bank" },
      { label: "Minimum (jumbo tier)", value: "$100,000 typical" },
    ],
    comparisonNote:
      "On $100,000, a 0.10% jumbo premium adds $100 per year versus a standard CD at the same bank — often less than the benefit of splitting across two banks for full FDIC coverage. Online banks with $500 minimums frequently matched jumbo yields in October 2026, so shop standard CD tables before accepting a $100,000 floor.",
    faq: [
      {
        q: "Is a jumbo CD rate premium worth $100,000 minimum?",
        a: "Often no. If the jumbo APY beats the standard 12-month CD by only 0.10%, you gain $100 per year on $100,000. Compare that to opening two $100,000 CDs at different FDIC banks at 4.55% to 4.60% APY with lower minimums — full insurance may outweigh a token premium.",
      },
      {
        q: "How do I insure deposits above $250,000?",
        a: "Split balances across separate FDIC-member banks, titling accounts so each depositor stays under $250,000 including accrued interest. Brokerage CD networks allocate funds across multiple banks under one login. Never leave uninsured balances at a single institution unless you accept that risk.",
      },
      {
        q: "Are business jumbo CDs insured the same way?",
        a: "FDIC insurance applies to business accounts up to $250,000 per depositor, per bank, when ownership and titling meet FDIC rules. Commercial CD rates and penalties may differ from consumer products — verify coverage and APY on the business account agreement before transferring operating reserves.",
      },
    ],
    sources: [FDIC_OCT_2026, NERDWALLET_CD_OCT_2026],
    sourcesChecked: "October 2026",
    sourcesNote:
      "Jumbo pre-fill uses Popular Direct's 4.60% 1-year APY (Oct. 20, 2026 NerdWallet table), which required $10,000 — illustrative of top 12-month yields, not a jumbo-only tier.",
  },
];
