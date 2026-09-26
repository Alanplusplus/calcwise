import Link from "next/link";

export function BasicArticle() {
  return (
    <>
      <h2>Why Use an Online Calculator?</h2>
      <p>
        While every phone and computer has a built-in calculator, an online
        calculator offers a distraction-free interface right in your browser.
        There&apos;s no app to open, no notifications to pull your attention away
        — just a clean tool ready for quick math whenever you need it.
      </p>

      <h2>How This Calculator Works</h2>
      <p>
        This basic calculator supports standard arithmetic operations:
        addition (+), subtraction (−), multiplication (×), and division (÷).
        It also includes percentage (%), sign toggle (±), and square root (√)
        functions. Every calculation runs in your browser — nothing is sent to a
        server — so you can enter salaries, rent splits, or invoice totals
        without storing them anywhere outside your session.
      </p>
      <p>
        Operations follow standard mathematical precedence when chained — each
        operation is evaluated left to right as you enter it, similar to how a
        traditional handheld calculator works. The history panel keeps track
        of your recent calculations for easy reference.
      </p>

      <h2>Keyboard Shortcuts</h2>
      <p>
        For power users, you can interact with this calculator using your
        keyboard. Number keys enter digits, the standard operator keys (+, -, *,
        /) perform operations, Enter or = evaluates, Escape clears, and the
        period key enters a decimal point. On a laptop without a numeric keypad,
        the top-row number keys work the same way — typing 1250 * 0.08 Enter
        gives $100.00 in one motion when you are estimating sales tax on a
        $1,250 laptop purchase.
      </p>

      <h2>Common Uses</h2>
      <ul>
        <li>
          <strong>Tip calculations:</strong> Multiply your bill by 0.15, 0.18,
          or 0.20 to calculate a 15%, 18%, or 20% tip.
        </li>
        <li>
          <strong>Splitting costs:</strong> Divide a total by the number of
          people to find each person&apos;s share.
        </li>
        <li>
          <strong>Quick conversions:</strong> Multiply by conversion factors —
          for example, multiply miles by 1.609 to get kilometers.
        </li>
        <li>
          <strong>Discount shopping:</strong> Use the percentage function to
          quickly figure out sale prices. If an item is 30% off, multiply the
          price by 0.70 to get the discounted amount.
        </li>
        <li>
          <strong>Cooking adjustments:</strong> Scale recipe ingredients up or
          down by multiplying each amount by your scaling factor.
        </li>
      </ul>
      <p>
        For savings and financial planning beyond quick arithmetic, try our{" "}
        <Link
          href="/calculators/savings-goal"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Savings Goal Calculator
        </Link>{" "}
        to plan monthly contributions toward a target amount, or the{" "}
        <Link
          href="/calculators/investment-return"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Investment Return Calculator
        </Link>{" "}
        when you need annualized performance instead of a one-off total.
      </p>

      <h2>Worked Example: Dinner Bill, Tip, and Split</h2>
      <p>
        Four colleagues share a $186.40 pre-tax dinner tab in Austin. They want
        an 18% tip and to split everything evenly. Step 1: multiply $186.40 ×
        0.18 = $33.55 tip (round to $33.55 on the calculator display). Step 2:
        add $186.40 + $33.55 = $219.95 total. Step 3: divide $219.95 ÷ 4 =
        $54.99 per person. If one person pays on a card and others Venmo back,
        each transfer is $54.99 — not $46.60 (which would ignore the tip).
      </p>
      <p>
        For a retail discount on the same device: a jacket listed at $89.99
        with varying sale percentages produces different checkout amounts. Use
        multiply-by-decimal (price × (1 − discount)) rather than subtracting a
        rounded dollar amount twice.
      </p>

      <h2>Discount Comparison on a $89.99 Item</h2>
      <p>
        Sale tags often show the percentage off, not the final price. These
        figures use exact arithmetic on $89.99; your store may round to the
        nearest cent at checkout.
      </p>
      <table>
        <thead>
          <tr>
            <th>Discount</th>
            <th>Amount off</th>
            <th>Sale price</th>
            <th>Shortcut (×)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>15% off</td>
            <td>$13.50</td>
            <td>$76.49</td>
            <td>89.99 × 0.85</td>
          </tr>
          <tr>
            <td>20% off</td>
            <td>$18.00</td>
            <td>$71.99</td>
            <td>89.99 × 0.80</td>
          </tr>
          <tr>
            <td>25% off</td>
            <td>$22.50</td>
            <td>$67.49</td>
            <td>89.99 × 0.75</td>
          </tr>
        </tbody>
      </table>
      <p>
        Stacking coupons is not always valid: if a store allows 20% off then an
        extra 10% off the reduced price, multiply 0.80 × 0.90 = 0.72, not 0.70.
        On $89.99 that is $64.79, which is $3.30 less than a single 30% markdown.
        Black Friday ads often mix &quot;up to 40% off select styles&quot; with
        doorbuster SKUs — run each line item separately instead of averaging
        discounts in your head.
      </p>

      <h2>Percentage and Rounding Pitfalls</h2>
      <p>
        Sales tax adds after discounts in most US states. On a $71.99 item at
        8.25% tax, multiply 71.99 × 1.0825 ≈ $77.93 out the door — useful when
        comparing against a $75 free-shipping threshold. UK VAT-inclusive shelf
        prices work the opposite way: to find the pre-VAT portion of a £120
        total at 20% VAT, divide 120 ÷ 1.20 = £100 net, not 120 × 0.80.
      </p>
      <p>
        Long multi-step totals (mortgage escrows, invoice line items) accumulate
        tiny floating-point differences. For multi-year{" "}
        <Link
          href="/calculators/compound-interest"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          compound growth
        </Link>
        , switch to the dedicated tool so monthly compounding and contributions
        stay consistent to the penny.
      </p>

      <h2>Tips for Accurate Calculations</h2>
      <ul>
        <li>
          <strong>Double-check your input:</strong> Glance at the display before
          hitting = to make sure you haven&apos;t mistyped a digit.
        </li>
        <li>
          <strong>Use the history:</strong> If you need to reference a previous
          result, scroll through the history rather than trying to remember it.
        </li>
        <li>
          <strong>Chain operations carefully:</strong> This calculator evaluates
          left to right. If you need specific order of operations (like
          multiplication before addition), calculate those parts separately.
        </li>
        <li>
          <strong>Clear when starting fresh:</strong> Press C before a new
          calculation to avoid accidentally continuing from a previous result.
        </li>
        <li>
          <strong>Write down intermediate results for budgets:</strong> When
          planning a $2,400 monthly budget, calculate needs (50% = $1,200),
          wants (30% = $720), and savings (20% = $480) as three separate
          operations rather than one long chain — fewer chances to apply the
          wrong percentage to a running total.
        </li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>Why does the calculator show &quot;Error&quot;?</h3>
      <p>
        The calculator displays &quot;Error&quot; when you attempt an impossible
        operation, such as dividing by zero or taking the square root of a
        negative number. Press C to clear and start over.
      </p>

      <h3>How precise is this calculator?</h3>
      <p>
        This calculator uses JavaScript&apos;s native floating-point arithmetic
        (IEEE 754 double-precision), which provides approximately 15-17
        significant decimal digits of precision. For everyday math, this is
        more than sufficient. For scientific or financial calculations requiring
        exact decimal precision, consider using our specialized calculators —
        such as the{" "}
        <Link
          href="/calculators/compound-interest"
          className="text-brand-600 hover:text-brand-800 font-medium"
        >
          Compound Interest Calculator
        </Link>{" "}
        for long-term growth projections.
      </p>

      <h3>Can I use this on mobile?</h3>
      <p>
        Yes! The calculator is fully responsive and works great on phones and
        tablets. The large buttons are designed for easy touch interaction on
        smaller screens.
      </p>

      <h3>How do I calculate a percentage increase or decrease?</h3>
      <p>
        For a increase from $50,000 to $62,500, subtract to get $12,500 change,
        then divide by the original: 12,500 ÷ 50,000 = 0.25, or 25% growth. For
        a decrease from $240 to $192, the change is $48; 48 ÷ 240 = 0.20, so
        that is a 20% drop. Percentage buttons on basic calculators apply the
        rate to the current display value — enter the base amount first, then
        the % key, to avoid applying 15% to the wrong number.
      </p>

      <h3>When should I use a financial calculator instead?</h3>
      <p>
        Use this page for grocery math, tips, and unit conversions. Reach for
        specialized tools when the problem has a time dimension: saving $500 per
        month for 18 years at 5.5%, or measuring CAGR on a brokerage account.
        Those scenarios need compounding formulas, not chained +/−/×/÷ steps.
        If your question includes words like &quot;annualized,&quot;
        &quot;monthly contribution,&quot; or &quot;payoff date,&quot; open the
        matching CalcWise tool from the related links on this page first.
      </p>
    </>
  );
}
