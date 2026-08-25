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
        functions.
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
        period key enters a decimal point.
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
        to plan monthly contributions toward a target amount.
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
    </>
  );
}
